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
  return response()->json($request->user()->events);
});

Route::middleware('auth:api')->get('/events/{event}', function (App\Event $event) {
    return $event->attributesToArray();
});
