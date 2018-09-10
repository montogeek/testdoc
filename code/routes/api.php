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
    return $request->user();
});

Route::middleware('auth:api')->get('/events/{event}', function (App\Event $event) {
    return $event->attributesToArray();
});

Route::middleware('auth:api')->post('/events', function (App\Event $event) {
    return $event->all();
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
//    var_dump(get_class_methods($request));
//    dd($request->user()->tokens->count());
    return response()->json($request->user());
});
