<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Item extends Model
{
    use SoftDeletes;

    protected $dates = ['deleted_at'];

    public function category() {
        return $this->belongsTo(Category::class);
    }

    public function event() {
        return  $this->belongsTo(Event::class);
    }

//    public function getTotalFoodAdultsAttribute()
//    {
//        $data = $this->where('category_id', '=', 1)->get()->values()->map(function ($item) {
//            $shareTotal = $item->shareKid * $this->event->kids + $item->shareAdult * $this->event->adults;
//
//            // Racion * (Coste total / Total de raciones)
//            $adults = round($item->shareAdult * ($item->cost / max($shareTotal, 1)), 2);
//
//            return $adults;
//        });
//        dd($data);
//        return $data;
////        dd($this);
////        return $this->attributes['totalFoodAdults'] = $this->
//    }
}
