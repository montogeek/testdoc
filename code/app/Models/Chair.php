<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Chair extends Model
{
    use SoftDeletes;

    protected $dates = ['deleted_at'];

    protected $casts = [
        'layout' => 'json',
    ];

    protected $fillable = ['layout'];

    public function event() {
        return  $this->belongsTo(Event::class);
    }
}
