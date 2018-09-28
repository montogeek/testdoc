<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    public function items()
    {
        return $this->hasMany(Item::class);
    }

    public function events()
    {
        return $this->belongsToMany(Event::class, 'budgets')->using(Budget::class)->as('budget')->withPivot('budget', 'extras')->withTimestamps();
    }
}
