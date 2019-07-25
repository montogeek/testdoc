<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\SoftDeletes;

class Event extends Model
{
    use SoftDeletes;

    protected $appends = ['month_year', 'day', 'kids', 'adults', 'duration', 'menu'];

    protected $hidden = ['assistant', 'items', 'categories'];

    protected $casts = [
        'startDate' => 'datetime:Y-m-d H:i:s',
        'endDate' => 'datetime:Y-m-d H:i:s'
    ];

    protected $dates = ['deleted_at'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function assistants()
    {
        return $this->hasMany(Assistant::class);
    }

    public function items()
    {
        return $this->hasMany(Item::class);
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'budgets')->using(Budget::class)->as('budget')->withPivot('budget', 'extras')->withTimestamps();
    }

    public function chairs()
    {
        return $this->hasOne(Chair::class);
    }

    public function getDayAttribute()
    {
        return Carbon::parse($this->startDate)->day;
    }

    public function getMonthYearAttribute()
    {
        return Carbon::parse($this->startDate)->shortEnglishMonth . ' ' . Carbon::parse($this->startDate)->year;
    }

    public function getKidsAttribute()
    {
        return $this->assistants->where('rsvp', '=', true)->reduce(function ($carry, $assistant) {
            return $carry + $assistant->kids;
        }, 0);
    }

    public function getAdultsAttribute()
    {
        return $this->assistants->where('rsvp', '=', true)->reduce(function ($carry, $assistant) {
            return $carry + $assistant->adults;
        }, 0);
    }

    public function getTotalAssistantsAttribute()
    {
        return $this->adults + $this->kids;
    }

    public function getDurationAttribute()
    {
        return Carbon::parse($this->endDate)->diffInHours($this->startDate);
    }

    public function getTotalFoodAttribute()
    {
        $calculateShare = function ($item, $event) {
            // Puede ser 0
            $shareTotal = $item->shareKid * $event->kids + $item->shareAdult * $event->adults;

            // Racion * (Coste total / Total de raciones)
            $adults = round($item->shareAdult * ($item->cost / max($shareTotal, 1)), 2);
            $kids = round(number_format($item->shareKid * ($item->cost / max($shareTotal, 1)), 2), 2);


            return [
                'adults' => $adults,
                'kids' => $kids
            ];
        };

        $sumTotal = function ($carry, $item) {
            return [
                'adults' => $carry['adults'] + $item['adults'],
                'kids' => $carry['kids'] + $item['kids']
            ];
        };


        $data = $this->items()->where('category_id', '=', 1)->get()->values()->map(function ($item) use ($calculateShare) {
            return $calculateShare($item, $this);
        })->reduce($sumTotal, ['adults' => 0, 'kids' => 0]);

        return $data;
    }

    public function getTotalOtherAttribute()
    {
        $totalOther = $this->items()->where('category_id', '!=', 1)->sum('cost');

        return [
            'totalOther' => $totalOther,
            'totalAssistants' => $this->totalAssistants,
            'value' => $totalOther / max($this->totalAssistants, 1)
        ];
    }

    public function getMenuAttribute()
    {
        return $this->categories->values()->map(function ($category) {
            return [
                'id' => $category->id,
                'name' => $category->name,
                'budget' => $category->budget->budget,
                'items' => $category->items()->where("event_id", "=", $this->id)->get(),
            ];
        });
    }
}
