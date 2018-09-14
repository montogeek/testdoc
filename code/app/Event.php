<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Event extends Model
{
    protected $appends = ['month_year', 'day', 'kids', 'adults'];

    protected $hidden = ['assistant'];

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function assistant() {
        return $this->hasMany('App\Assistant');
    }

    public function getDayAttribute()
    {
        return Carbon::parse($this->date)->day;
    }

    public function getMonthYearAttribute()
    {
        return Carbon::parse($this->date)->shortEnglishMonth.' '.Carbon::parse($this->date)->year;
    }

    public function getKidsAttribute() {
        return $this->assistant->reduce(function($carry, $assistant) {
            return $carry + $assistant->kids;
        }, 0);
    }

    public function getAdultsAttribute() {
        return $this->assistant->reduce(function($carry, $assistant) {
            return $carry + $assistant->adults;
        }, 0);
    }

    public function getDurationAttribute($value)
    {
        return Carbon::parse($value)->diffInHours($this->date);
    }
}
