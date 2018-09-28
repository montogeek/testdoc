<?php

use Faker\Generator as Faker;

$factory->define(App\Models\Item::class, function (Faker $faker) {
    $faker->addProvider(new \FakerRestaurant\Provider\en_US\Restaurant($faker));

    return [
        'name' => rand(0,1) ? $faker->foodName() : $faker->beverageName(),
        'cost' => random_int(50, 200),
        'shareKid' => mt_rand(0, 5),
        'shareAdult' => mt_rand(0, 10),
        'bought' => (bool)random_int(0, 1),
        'notes' => $faker->realText(30),
        'event_id' => random_int(1, 20),
        'category_id' => rand(1, 4)
    ];
});
