<?php

use App\Http\Controllers\Incubator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->scopeBindings()->group(function () {
    Route::get('/incubators', Incubator::class . '@incubators');
    Route::get('/incubators/{incubator}/sensors', Incubator::class . '@sensors');
    Route::get('/incubators/{incubator}/sensors/{sensor}', Incubator::class . '@sensor');
});
