<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    public function item()
    {
        return $this->hasMany(Item::class);
    }


    public function events()
    {
        return $this->belongsToMany(Event::class, 'budgets')->using(Budget::class);
    }
}
