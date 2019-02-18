<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\SoftDeletes;

class Event extends Model
{
    use SoftDeletes;

    protected $appends = ['month_year', 'day', 'kids', 'adults'];

    protected $hidden = ['assistant', 'items', 'categories'];

    protected $casts = [
        'date' => 'datetime:Y-m-d H:i:s',
        'duration' => 'datetime:Y-m-d H:i:s'
    ];

    protected $dates = ['deleted_at'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function assistant()
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
        return Carbon::parse($this->date)->day;
    }

    public function getMonthYearAttribute()
    {
        return Carbon::parse($this->date)->shortEnglishMonth . ' ' . Carbon::parse($this->date)->year;
    }

    public function getKidsAttribute()
    {
        return $this->assistant->where('rsvp', '=', true)->reduce(function ($carry, $assistant) {
            return $carry + $assistant->kids;
        }, 0);
    }

    public function getAdultsAttribute()
    {
        return $this->assistant->where('rsvp', '=', true)->reduce(function ($carry, $assistant) {
            return $carry + $assistant->adults;
        }, 0);
    }

    public function getTotalAssistantsAttribute()
    {
        return $this->adults + $this->kids;
    }

    public function getDurationAttribute($value)
    {
        return Carbon::parse($value)->diffInHours($this->date);
    }
}
