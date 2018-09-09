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
//Route::get('/redirect', function (Request $request) {
////    $query = http_build_query($request->toArray());
////
////    return redirect('http://localhost/oauth/authorize?'.$query);
////});

// Route::get('/redirect', function () {
//     $query = http_build_query([
//         'client_id'     => '2',
//         'redirect_uri'  => 'http://localhost/oauth/callback',
//         'response_type' => 'token',
//         'scope'         => '',
//     ]);

//     return redirect('http://localhost/oauth/authorize?' . $query);
// });

// Route::get('/oauth/callback', function () {

//     $http = new GuzzleHttp\Client;

//     if (request('token')) {
//         $response = $http->post('http://localhost/oauth/token', [
//             'form_params' => [
//                 'grant_type'    => 'authorization_code',
//                 'client_id'     => '2',
//                 'client_secret' => 'VbDNUl4c9XLxVPQiW6hZM5XQ654AG6YgUtmXx0j5',
//                 'redirect_uri'  => 'http://localhost/oauth/callback',
//                 'code'          => request('token'),
//             ],
//         ]);

//         return json_decode((string)$response->getBody(), TRUE);
//     } else {
//         return response()->json(['error' => request('error')]);
//     }
// });

//Route::get('/', function () {
//    return view('welcome');
//});
//
//Auth::routes();
//
//Route::get('/dashboard', 'HomeController@index')->name('home');
//Route::resource('/dashboard/events', 'EventController');

Route::view('/{path?}', 'welcome')
   ->where('path', '.*')
   ->name('react');

//Route::get('/redirect', function () {
//    $query = http_build_query([
//        'client_id' => '3',
//        'redirect_uri' => 'http://localhost/auth/callback',
//        'response_type' => 'code',
//        'scope' => '',
//    ]);
//
//    return redirect('http://localhost/oauth/authorize?'.$query);
//});

// Public
Route::post('/login', 'LoginController@login')->name('login');
Route::post('/login/refresh', 'LoginController@refresh')->name('refresh');

// Protected
Route::post('/logout', 'LoginController@logout')->name('logout');
