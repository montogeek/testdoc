<?php

use Faker\Generator as Faker;

$factory->define(App\Models\Budget::class, function (Faker $faker) {
    return [
        'budget' => random_int(0, 10000),
    ];
});
