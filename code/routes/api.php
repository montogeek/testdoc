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
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return response()->json($request->user());
});


Route::middleware('auth:api')->post('/events', function (Request $request) {

    $calculateShare = function ($item, $event) {
        // Puede ser 0
        $shareTotal = $item->shareKid * $event->kids + $item->shareAdult * $event->adults;

        // Racion * (Coste total / Total de raciones)
        $adults = $item->shareAdult * ($item->cost / max($shareTotal, 1));
        $kids = $item->shareKid * ($item->cost / max($shareTotal, 1));

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

        $event['summary'] = [
            'assistants' => [
                'food' => $foodShare,
                'other' => $otherShare / ($event->adults + $event->kids)
            ],
            'budget' => [
                ''
            ]
        ];

        return $event;
    });

    return response()->json($data);
});

Route::middleware('auth:api')->get('/events/{event}', function (App\Event $event) {
    return $event->attributesToArray();
});


Route::middleware('auth:api')->post('/logout', 'LoginController@logout')->name('logout');

