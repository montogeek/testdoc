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
        DB::table('events')->insert([
            'name' => 'El cumpleaños de 75 años de la abuela',
            'date' => date('Y-m-d H:i', strtotime('2011-06-14 14:00')),
            'duration' => date('Y-m-d H:i', strtotime('2011-06-14 16:00')),
            'location' => 'Casa de la tía Rosa',
            'user_id' => 1
        ]);

        $faker = Faker\Factory::create();

        for ($i = 1; $i <= 20; $i++) {
            $date = Carbon::parse($faker->dateTime()->format('Y-m-d H:i'));
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
