<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class Budget extends Pivot
{

    protected $casts = [
        'extras' => 'json'
    ];

    protected $attributes = [
        'extras' => '{}'
    ];
}
