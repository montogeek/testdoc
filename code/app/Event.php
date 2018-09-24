<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\SoftDeletes;

class Event extends Model
{
    use SoftDeletes;

    protected $appends = ['month_year', 'day', 'kids', 'adults'];

    protected $hidden = ['assistant', 'item'];

    protected $casts = [
        'date' => 'datetime:Y-m-d H:i:s',
        'duration' => 'datetime:Y-m-d H:i:s'
    ];

    protected $dates = ['deleted_at'];

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function assistant() {
        return $this->hasMany('App\Assistant');
    }

    public function item() {
        return $this->hasMany('App\Item');
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
        return $this->assistant->where('rsvp', '=', true)->reduce(function($carry, $assistant) {
            return $carry + $assistant->kids;
        }, 0);
    }

    public function getAdultsAttribute() {
        return $this->assistant->where('rsvp', '=', true)->reduce(function($carry, $assistant) {
            return $carry + $assistant->adults;
        }, 0);
    }

    public function getTotalAssistantsAttribute() {
        return $this->adults + $this->kids;
    }

    public function getDurationAttribute($value)
    {
        return Carbon::parse($value)->diffInHours($this->date);
    }
}
