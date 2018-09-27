<?php

use Illuminate\Database\Seeder;

class BudgetTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $events = \App\Models\Event::all();
        $categories = \App\Models\Category::all()->pluck('id')->toArray();

        foreach ($events as $event) {
            $categories_map = array_combine($categories,
                factory(\App\Models\Budget::class, sizeof($categories))->make()->toArray()
            );
            $event->categories()->sync($categories_map, false);
        }
    }
}
