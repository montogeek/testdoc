<?php

use Faker\Generator as Faker;

$factory->define(App\Item::class, function (Faker $faker) {
    $faker->addProvider(new \FakerRestaurant\Provider\en_US\Restaurant($faker));

    return [
        'name' => rand(0,1) ? $faker->foodName() : $faker->beverageName(),
        'cost' => random_int(15, 75),
        'shareKid' => mt_rand(0, 5) / 10,
        'shareAdult' => mt_rand(0, 10) / 10,
        'bought' => (bool)random_int(0, 1),
        'notes' => $faker->realText(30),
        'event_id' => 1,
        'categories_id' => rand(1, 4)
    ];
});