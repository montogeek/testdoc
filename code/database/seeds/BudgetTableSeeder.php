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
        $event = \App\Models\Event::find(1);

        $event->categories()->sync([
            1 => [
                'category_id' => 1,
                'budget' => 500,
            ],
            2 => [
                'category_id' => 2,
                'budget' => 400,
            ],
            3 => [
                'category_id' => 3,
                'budget' => 150,
            ],
            4 => [
                'category_id' => 4,
                'budget' => 300,
            ]
        ], false);

        $events = \App\Models\Event::whereNotIn('id', array(1))->get();
        $categories = \App\Models\Category::all()->pluck('id')->toArray();

        foreach ($events as $event) {
            $categories_map = array_combine($categories,
                factory(\App\Models\Budget::class, sizeof($categories))->make()->toArray()
            );
            $event->categories()->sync($categories_map, false);
        }
    }
}
