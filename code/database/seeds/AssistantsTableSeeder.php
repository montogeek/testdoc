<?php

use Illuminate\Database\Seeder;

class AssistantsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(\App\Models\Assistant::class, 500)->create();
    }
}
