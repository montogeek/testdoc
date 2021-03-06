<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $migrated = \DB::table("users")->get();

        var_dump($migrated);

        if ($migrated->isEmpty()) {
            $this->call([
              UsersTableSeeder::class,
              EventsTableSeeder::class,
              AssistantsTableSeeder::class,
              CategoriesTableSeeder::class,
              ItemsTableSeeder::class,
              BudgetTableSeeder::class
            ]);
        } else {
          echo "Already seeded";
        }
    }
}
