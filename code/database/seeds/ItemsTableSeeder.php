<?php

use Illuminate\Database\Seeder;

class ItemsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Models\Item::class, 1000)->create();

        DB::table('items')->insert([
            [
                'name' => 'Refrescos',
                'cost' => 15,
                'shareKid' => 0.5,
                'shareAdult' => 2,
                'bought' => NULL,
                'notes' => 'Botellas de 2 litros',
                'event_id' => 1,
                'category_id' => 1
            ],
            [
                'name' => 'Paquetes de zumo',
                'cost' => 15,
                'shareKid' => 2,
                'shareAdult' => 0,
                'bought' => NULL,
                'notes' => 'Manzana y uva blanca',
                'event_id' => 1,
                'category_id' => 1
            ],
            [
                'name' => 'Vino',
                'cost' => 50,
                'shareKid' => 0,
                'shareAdult' => 2,
                'bought' => NULL,
                'notes' => '',
                'event_id' => 1,
                'category_id' => 1
            ],
            [
                'name' => 'Pastel',
                'cost' => 75,
                'shareKid' => 1,
                'shareAdult' => 1,
                'bought' => NULL,
                'notes' => 'Encargar en la panadería local',
                'event_id' => 1,
                'category_id' => 1
            ],
            [
                'name' => 'Helado',
                'cost' => 20,
                'shareKid' => 1,
                'shareAdult' => 1.5,
                'bought' => NULL,
                'notes' => '',
                'event_id' => 1,
                'category_id' => 1
            ],
            [
                'name' => 'Tazas de pudding',
                'cost' => 15,
                'shareKid' => 1,
                'shareAdult' => 0,
                'bought' => NULL,
                'notes' => 'Comprar paquetes de vainilla y chocolate',
                'event_id' => 1,
                'category_id' => 1
            ],
            [
                'name' => 'Setas rellenas',
                'cost' => 32,
                'shareKid' => 1,
                'shareAdult' => 2,
                'bought' => NULL,
                'notes' => 'Setas rellenas de queso cremoso y salchicha',
                'event_id' => 1,
                'category_id' => 1
            ],
            [
                'name' => 'Bruschetta',
                'cost' => 22,
                'shareKid' => 0,
                'shareAdult' => 3,
                'bought' => NULL,
                'notes' => 'Tomate y albahaca ',
                'event_id' => 1,
                'category_id' => 1
            ],
            [
                'name' => 'Salmón ahumado',
                'cost' => 50,
                'shareKid' => 1,
                'shareAdult' => 2,
                'bought' => NULL,
                'notes' => '',
                'event_id' => 1,
                'category_id' => 1
            ],
            [
                'name' => 'Panecillos',
                'cost' => 20,
                'shareKid' => 1,
                'shareAdult' => 2,
                'bought' => NULL,
                'notes' => '4 bolsas: surtido',
                'event_id' => 1,
                'category_id' => 1
            ],
            [
                'name' => 'Queso cremoso',
                'cost' => 10,
                'shareKid' => 1,
                'shareAdult' => 2,
                'bought' => NULL,
                'notes' => '2 tubos grandes',
                'event_id' => 1,
                'category_id' => 1
            ],
            [
                'name' => 'Alcaparras',
                'cost' => 12,
                'shareKid' => 1,
                'shareAdult' => 2,
                'bought' => NULL,
                'notes' => '3 botes',
                'event_id' => 1,
                'category_id' => 1
            ],
            [
                'name' => 'Alitas de pollo',
                'cost' => 45,
                'shareKid' => 2,
                'shareAdult' => 4,
                'bought' => NULL,
                'notes' => 'Comprado en la pollería local',
                'event_id' => 1,
                'category_id' => 1
            ],
            [
                'name' => 'Humus',
                'cost' => 10,
                'shareKid' => 4,
                'shareAdult' => 6,
                'bought' => NULL,
                'notes' => 'Prepararlo la noche anterior',
                'event_id' => 1,
                'category_id' => 1
            ],
            [
                'name' => 'Patatas pita con parmesano',
                'cost' => 14,
                'shareKid' => 4,
                'shareAdult' => 6,
                'bought' => NULL,
                'notes' => 'Prepararlo la noche anterior',
                'event_id' => 1,
                'category_id' => 1
            ],
            [
                'name' => 'Surtido de verduras',
                'cost' => 30,
                'shareKid' => 4,
                'shareAdult' => 10,
                'bought' => NULL,
                'notes' => 'Zanahoria, apio, brócoli, coliflor, pimientos verdes y rojos',
                'event_id' => 1,
                'category_id' => 1
            ],
            [
                'name' => 'Bola de queso',
                'cost' => 15,
                'shareKid' => 5,
                'shareAdult' => 10,
                'bought' => NULL,
                'notes' => 'Surtido: queso cremoso, queso curado con nueces',
                'event_id' => 1,
                'category_id' => 1
            ],
            [
                'name' => 'Galletas saladas',
                'cost' => 25,
                'shareKid' => 5,
                'shareAdult' => 10,
                'bought' => NULL,
                'notes' => 'Surtido',
                'event_id' => 1,
                'category_id' => 1
            ]
        ]);

        DB::table('items')->insert([
            [
                'name' => 'Alquiler de sala/recepción',
                'cost' => 250,
                'bought' => true,
                'notes' => '',
                'event_id' => 1,
                'category_id' => 2
            ],
            [
                'name' => 'Mantelería',
                'cost' => 30,
                'bought' => true,
                'notes' => 'Alquiler',
                'event_id' => 1,
                'category_id' => 2
            ],
            [
                'name' => 'Mesas y sillas',
                'cost' => 0,
                'bought' => NULL,
                'notes' => 'Incluido en el alquiler del local',
                'event_id' => 1,
                'category_id' => 2
            ],
            [
                'name' => 'Servilletas para el aperitivo',
                'cost' => 25,
                'bought' => NULL,
                'notes' => '',
                'event_id' => 1,
                'category_id' => 2
            ],
            [
                'name' => 'Servilletas para la cena',
                'cost' => 20,
                'bought' => NULL,
                'notes' => 'Alquiler',
                'event_id' => 1,
                'category_id' => 2
            ],
            [
                'name' => 'Servicio de camareros',
                'cost' => 50,
                'bought' => NULL,
                'notes' => 'Alquiler',
                'event_id' => 1,
                'category_id' => 2
            ],
            [
                'name' => 'Cristalería',
                'cost' => 25,
                'bought' => NULL,
                'notes' => 'Alquiler',
                'event_id' => 1,
                'category_id' => 2
            ]
        ]);

        DB::table('items')->insert([
            [
                'name' => 'Globos',
                'cost' => 25,
                'bought' => true,
                'notes' => '',
                'event_id' => 1,
                'category_id' => 3
            ],
            [
                'name' => 'Bombona de helio',
                'cost' => 50,
                'bought' => true,
                'notes' => 'Alquiler',
                'event_id' => 1,
                'category_id' => 3
            ],
            [
                'name' => 'Centros de mesa',
                'cost' => 100,
                'bought' => true,
                'notes' => '10 total',
                'event_id' => 1,
                'category_id' => 3
            ],
            [
                'name' => 'Floreros de cristal',
                'cost' => 0,
                'bought' => NULL,
                'notes' => 'Prestado de Laura',
                'event_id' => 1,
                'category_id' => 3
            ]
        ]);

        DB::table('items')->insert([
            [
                'name' => 'Invitaciones',
                'cost' => 50,
                'bought' => true,
                'notes' => '',
                'event_id' => 1,
                'category_id' => 4
            ],
            [
                'name' => 'Franqueo',
                'cost' => 60,
                'bought' => true,
                'notes' => '',
                'event_id' => 1,
                'category_id' => 4
            ],
            [
                'name' => 'Fotógrafo',
                'cost' => 125,
                'bought' => true,
                'notes' => '2 horas (de 14h a 16h)',
                'event_id' => 1,
                'category_id' => 4
            ],
            [
                'name' => 'Cotillón',
                'cost' => 50,
                'bought' => NULL,
                'notes' => '',
                'event_id' => 1,
                'category_id' => 4
            ]
        ]);
    }
}
