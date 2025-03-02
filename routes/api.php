<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::post('/register',[AuthController::class,'Register'])->name('Auth.register');
Route::post('/login',[AuthController::class,'Login'])->name('Auth.login');
Route::post('/logout',[AuthController::class,'logout'])->name('Auth.logout')->middleware('auth:sanctum');
Route::post('/email/verify/{id}/{hash}',[AuthController::class,'emailVerify'])->name('verification.verify');
Route::post('/email/verify/resent',[AuthController::class,'ResendEmailVerification'])->middleware('auth:sanctum');
Route::post('/forgot-password',[AuthController::class,'ForgotPassword'])->name('password.email');
Route::post('/reset-password',[AuthController::class,'ResetPassword'])->name("password.reset");


