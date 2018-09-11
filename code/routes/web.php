<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
  return view('welcome');
});

// Public
Route::post('/login', 'LoginController@login')->name('login');
Route::post('/login/refresh', 'LoginController@refresh')->name('refresh');

// Protected
Route::post('/logout', 'LoginController@logout')->name('logout');


