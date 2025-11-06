<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\AuthLoginController;
use App\Http\Controllers\AuthRegisterController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// check health
Route::get('/ping', function () {
    return response()->json([
        'status' => 'success',
        'message' => 'API is running smoothly',
        'timestamp' => now()->toDateTimeString(),
    ]);
});

// Public routes authentication
Route::apiResource('register', AuthRegisterController::class);
Route::apiResource('login', AuthLoginController::class);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
//     Route::get('/user', function (Request $request) {
//         return $request->user();
//     });
    
//     // User resource routes
//     Route::apiResource('users', UserController::class);
    Route::apiResource('posts', PostController::class);
});