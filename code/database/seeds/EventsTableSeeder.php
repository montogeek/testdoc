<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class EventsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker\Factory::create();
        for ($i = 1; $i <= 20; $i++) {
            $date = Carbon::parse($faker->dateTimeBetween(date("Y-m-d H:i"), date("Y-m-d H:i", strtotime('+1 year')))->format('Y-m-d H:i'));
            $duration = Carbon::parse($date)->addHours(rand(2, 8));

            DB::table('events')->insert([
                'name' => $faker->sentence(6),
                'date' => $date,
                'duration' => $duration,
                'location' => $faker->streetAddress,
                'user_id' => 1
            ]);
        }

    }
}
