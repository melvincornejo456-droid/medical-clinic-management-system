<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PatientController;

Route::get('/', function () {
    return Inertia::render('Dashboard');
})->name('dashboard');

// PATIENT MANAGEMENT
Route::get('/patients', [PatientController::class, 'index'])
    ->name('patients.index');

Route::post('/patients', [PatientController::class, 'store'])
    ->name('patients.store');