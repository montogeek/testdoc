<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*
 * Events
 * Assistants
 * Items
 */
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return response()->json($request->user());
});


Route::middleware('auth:api')->get('/events', function (Request $request) {

    $calculateShare = function ($item, $event) {
        // Puede ser 0
        $shareTotal = $item->shareKid * $event->kids + $item->shareAdult * $event->adults;

        // Racion * (Coste total / Total de raciones)
        $adults = round($item->shareAdult * ($item->cost / max($shareTotal, 1)), 2);
        $kids = number_format($item->shareKid * ($item->cost / max($shareTotal, 1)), 2);

        return [
            'adults' => $adults,
            'kids' => $kids
        ];
    };

    $sumTotal = function ($carry, $item) {
        return [
            'adults' => $carry['adults'] + $item['adults'],
            'kids' => $carry['kids'] + $item['kids']
        ];
    };

    $data = $request->user()->events->sortBy('date')->values()->map(function ($event) use ($sumTotal, $calculateShare) {
        $foodShare = $event->item->where('category_id', '=', 1)->values()->map(function ($item) use ($calculateShare, $event) {
            return $calculateShare($item, $event);
        })->reduce($sumTotal, ['adults' => 0, 'kids' => 0]);

        $otherShare = $event->item->where('category_id', '!=', 1)->groupBy('category_id')->values()->map(function ($items) {
            return $items->sum('cost');
        })->sum();

        $budget = $event->item->groupBy('category_id')->values()->map(function ($items) {
            $budget = $items[0]->category->budget;
            $cost = $items->sum('cost');
            $diff = $budget - $cost;

            return [
                'name' => $items[0]->category->name,
                'count' => $items->count(),
                'budget' => $budget,
                'cost' => $cost,
                'diff' => $diff,
                'balance' => $diff !== 0 ? $diff > 0 ? true : false : null
            ];
        });

        $budgetTotal = $budget->values()->reduce(function ($carry, $item) {
            $diff = ($carry['budget'] + $item['budget']) - ($carry['cost'] + $item['cost']);

            return [
                'name' => 'Total',
                'count' => $carry['count'] + $item['count'],
                'budget' => $carry['budget'] + $item['budget'],
                'cost' => $carry['cost'] + $item['cost'],
                'diff' => $carry['diff'] + $item['diff'],
                'balance' => $diff !== 0 ? $diff > 0 ? true : false : null
            ];
        }, [
            'count' => 0,
            'budget' => 0,
            'cost' => 0,
            'diff' => 0
        ]);

        $otherTotal = round($otherShare / max($event->adults + $event->kids, 1), 2);

        $adults = [
            'name' => 'Adultos',
            'count' => $event->adults,
            'food' => (string)$foodShare['adults'],
            'other' => $otherTotal,
            'total' => round(($foodShare['adults'] + $otherTotal) * $event->adults, 2)
        ];

        $kids = [
            'name' => 'Niños',
            'count' => $event->kids,
            'food' => (string)$foodShare['kids'],
            'other' => $otherTotal,
            'total' => round(($foodShare['kids'] + $otherTotal) * $event->kids, 2)
        ];

        $total = [
            'name' => 'Total',
            'count' => $event->totalAssistants,
            'food' => round(($foodShare['adults'] + $foodShare['kids']) / 2, 2),
            'other' => round(($otherTotal + $otherTotal) / 2, 2),
            'total' => round(($adults['total'] + $kids['total']) / 2, 2)
        ];

        $event['summary'] = [
            'assistants' => [$adults, $kids, $total],
            'budget' => $budget->push($budgetTotal)
        ];
        return $event;
    });

//    return $data->toJson(JSON_PRESERVE_ZERO_FRACTION);


    return response()->json($data);
});

Route::middleware('auth:api')->get('/events/{event}', function (App\Event $event) {
    return $event->attributesToArray();
});

Route::middleware('auth:api')->post('/events', 'EventController@store');
Route::middleware('auth:api')->put('/events/{id}', 'EventController@update');

Route::middleware('auth:api')->post('/logout', 'LoginController@logout')->name('logout');

