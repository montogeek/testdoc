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
        factory(App\Assistant::class, 30)->create();
    }
}
