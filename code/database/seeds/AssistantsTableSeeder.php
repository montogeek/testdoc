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

        DB::table('assistants')->insert([
            [
                'name' => 'Familia 1',
                'address' => 'Dirección 1',
                'city' => 'Ciudad 1',
                'state' => 'Provincia o estado 1',
                'zip' => 'Código postal 1',
                'phonenumber' => 'Teléfono 1',
                'email' => 'Dirección de correo electrónico1',
                'rsvp' => false,
                'kids' => 2,
                'adults' => 2,
                'event_id' => 1
            ],
            [
                'name' => 'Familia 2',
                'address' => 'Dirección 1',
                'city' => 'Ciudad 1',
                'state' => 'Provincia o estado 1',
                'zip' => 'Código postal 1',
                'phonenumber' => 'Teléfono 1',
                'email' => 'Dirección de correo electrónico1',
                'rsvp' => true,
                'kids' => 1,
                'adults' => 1,
                'event_id' => 1
            ],
            [
                'name' => 'Familia 3',
                'address' => 'Dirección 1',
                'city' => 'Ciudad 1',
                'state' => 'Provincia o estado 1',
                'zip' => 'Código postal 1',
                'phonenumber' => 'Teléfono 1',
                'email' => 'Dirección de correo electrónico1',
                'rsvp' => true,
                'kids' => 3,
                'adults' => 3,
                'event_id' => 1
            ],
            [
                'name' => 'Familia 4',
                'address' => 'Dirección 1',
                'city' => 'Ciudad 1',
                'state' => 'Provincia o estado 1',
                'zip' => 'Código postal 1',
                'phonenumber' => 'Teléfono 1',
                'email' => 'Dirección de correo electrónico1',
                'rsvp' => NULL,
                'kids' => 0,
                'adults' => 2,
                'event_id' => 1
            ],
            [
                'name' => 'Familia 5',
                'address' => 'Dirección 1',
                'city' => 'Ciudad 1',
                'state' => 'Provincia o estado 1',
                'zip' => 'Código postal 1',
                'phonenumber' => 'Teléfono 1',
                'email' => 'Dirección de correo electrónico1',
                'rsvp' => true,
                'kids' => 4,
                'adults' => 3,
                'event_id' => 1
            ],
            [
                'name' => 'Familia 6',
                'address' => 'Dirección 1',
                'city' => 'Ciudad 1',
                'state' => 'Provincia o estado 1',
                'zip' => 'Código postal 1',
                'phonenumber' => 'Teléfono 1',
                'email' => 'Dirección de correo electrónico1',
                'rsvp' => true,
                'kids' => 2,
                'adults' => 2,
                'event_id' => 1
            ],
            [
                'name' => 'Familia 7',
                'address' => 'Dirección 1',
                'city' => 'Ciudad 1',
                'state' => 'Provincia o estado 1',
                'zip' => 'Código postal 1',
                'phonenumber' => 'Teléfono 1',
                'email' => 'Dirección de correo electrónico1',
                'rsvp' => true,
                'kids' => 1,
                'adults' => 4,
                'event_id' => 1
            ],
            [
                'name' => 'Familia 8',
                'address' => 'Dirección 1',
                'city' => 'Ciudad 1',
                'state' => 'Provincia o estado 1',
                'zip' => 'Código postal 1',
                'phonenumber' => 'Teléfono 1',
                'email' => 'Dirección de correo electrónico1',
                'rsvp' => false,
                'kids' => 5,
                'adults' => 3,
                'event_id' => 1
            ],
            [
                'name' => 'Familia 9',
                'address' => 'Dirección 1',
                'city' => 'Ciudad 1',
                'state' => 'Provincia o estado 1',
                'zip' => 'Código postal 1',
                'phonenumber' => 'Teléfono 1',
                'email' => 'Dirección de correo electrónico1',
                'rsvp' => true,
                'kids' => 3,
                'adults' => 2,
                'event_id' => 1
            ],
            [
                'name' => 'Familia 10',
                'address' => 'Dirección 1',
                'city' => 'Ciudad 1',
                'state' => 'Provincia o estado 1',
                'zip' => 'Código postal 1',
                'phonenumber' => 'Teléfono 1',
                'email' => 'Dirección de correo electrónico1',
                'rsvp' => true,
                'kids' => 0,
                'adults' => 4,
                'event_id' => 1
            ],
            [
                'name' => 'Familia 11',
                'address' => 'Dirección 1',
                'city' => 'Ciudad 1',
                'state' => 'Provincia o estado 1',
                'zip' => 'Código postal 1',
                'phonenumber' => 'Teléfono 1',
                'email' => 'Dirección de correo electrónico1',
                'rsvp' => true,
                'kids' => 3,
                'adults' => 5,
                'event_id' => 1
            ],
            [
                'name' => 'Familia 12',
                'address' => 'Dirección 1',
                'city' => 'Ciudad 1',
                'state' => 'Provincia o estado 1',
                'zip' => 'Código postal 1',
                'phonenumber' => 'Teléfono 1',
                'email' => 'Dirección de correo electrónico1',
                'rsvp' => false,
                'kids' => 2,
                'adults' => 3,
                'event_id' => 1
            ],
            [
                'name' => 'Familia 13',
                'address' => 'Dirección 1',
                'city' => 'Ciudad 1',
                'state' => 'Provincia o estado 1',
                'zip' => 'Código postal 1',
                'phonenumber' => 'Teléfono 1',
                'email' => 'Dirección de correo electrónico1',
                'rsvp' => true,
                'kids' => 3,
                'adults' => 2,
                'event_id' => 1
            ],
            [
                'name' => 'Familia 14',
                'address' => 'Dirección 1',
                'city' => 'Ciudad 1',
                'state' => 'Provincia o estado 1',
                'zip' => 'Código postal 1',
                'phonenumber' => 'Teléfono 1',
                'email' => 'Dirección de correo electrónico1',
                'rsvp' => false,
                'kids' => 0,
                'adults' => 1,
                'event_id' => 1
            ],
            [
                'name' => 'Familia 15',
                'address' => 'Dirección 1',
                'city' => 'Ciudad 1',
                'state' => 'Provincia o estado 1',
                'zip' => 'Código postal 1',
                'phonenumber' => 'Teléfono 1',
                'email' => 'Dirección de correo electrónico1',
                'rsvp' => NULL,
                'kids' => 0,
                'adults' => 2,
                'event_id' => 1
            ]
        ]);
    }
}
