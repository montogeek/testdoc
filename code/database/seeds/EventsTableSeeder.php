<?php

use Illuminate\Database\Seeder;

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
            'duration' => date('H:i', strtotime('16:00')),
            'location' => 'Casa de la tía Rosa',
            'user_id' => 1
        ]);
    }
}
