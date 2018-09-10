<?php

use Faker\Generator as Faker;

$factory->define(App\Assistant::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'address' => $faker->address,
        'city' => $faker->city,
        'state' => $faker->state,
        'zip' => $faker->postcode,
        'phonenumber' => $faker->phoneNumber,
        'email' => $faker->safeEmail,
        'rsvp' => (bool)random_int(0, 1),
        'kids' => random_int(0, 5),
        'adults' => random_int(0, 5),
        'event_id' => 1
    ];
});