<?php

use Illuminate\Database\Seeder;

class BudgetsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $events = \App\Event::all();
        $categories = \App\Category::all()->pluck('id')->toArray();

        foreach ($events as $event) {
            $categories_map = array_combine($categories,
                factory(\App\Models\Budget::class, sizeof($categories))->make()->toArray()
            );
            $event->budgets()->sync($categories_map, false);
        }
    }
}
