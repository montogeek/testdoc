<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\SoftDeletes;

class Event extends Model
{
    use SoftDeletes;

    protected $appends = ['month_year', 'day', 'kids', 'adults', 'duration'];

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
}
