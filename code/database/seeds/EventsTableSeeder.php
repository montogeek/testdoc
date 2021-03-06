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

        DB::table('events')->insert([
            'name' => 'El cumpleaños de 75 años de la abuela',
            'startDate' => '2019-06-14 12:00:00',
            'endDate' => '2019-06-14 14:00:00',
            'location' => 'Casa de la tía Rosa',
            'user_id' => 1
        ]);

        for ($i = 2; $i <= 20; $i++) {
            $date = Carbon::parse($faker->dateTimeBetween(date("Y-m-d H:i"), date("Y-m-d H:i", strtotime('+1 year')))->format('Y-m-d H:i'));
            $duration = Carbon::parse($date)->addHours(rand(2, 8));

            DB::table('events')->insert([
                'name' => $faker->sentence(6),
                'startDate' => $date,
                'endDate' => $duration,
                'location' => $faker->streetAddress,
                'user_id' => 1
            ]);
        }

    }
}
