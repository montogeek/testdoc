<?php

use Illuminate\Database\Seeder;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = [
            'Comida y bebidas',
            'Equipamiento y provisiones',
            'Decoración',
            'Otros'
        ];

        array_walk($categories, function($category) {
            DB::table('categories')->insert([
                'name' => $category,
                'budget'=> random_int(500, 2000)
             ]);
        });
    }
}
