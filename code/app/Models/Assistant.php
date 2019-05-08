<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Assistant extends Model
{
    use SoftDeletes;
    
    protected $dates = ['deleted_at'];
    protected $appends = ['total'];
    protected $fillable = ['name', 'address', 'city', 'state', 'zip', 'phonenumber', 'email', 'rsvp', 'kids', 'adults'];

    public function getTotalAttribute()
    {
        return $this->attributes['total'] = $this->adults + $this->kids;
    }
}
