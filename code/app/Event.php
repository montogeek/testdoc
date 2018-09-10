<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Event extends Model
{
    protected $appends = ['month_year', 'day'];

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function getDayAttribute()
    {
        return Carbon::parse($this->date)->day;
    }

    public function getMonthYearAttribute()
    {
        return Carbon::parse($this->date)->shortEnglishMonth.' '.Carbon::parse($this->date)->year;
    }

    public function getDurationAttribute($value)
    {
        return Carbon::parse($value)->diffInHours($this->date);
    }
}
