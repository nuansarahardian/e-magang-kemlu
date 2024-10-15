<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Beranda', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// New routes for PosisiMagang and SeringDitanyakan
Route::get('/posisi-magang', function () {
    return Inertia::render('PosisiMagang');
})->name('posisi-magang');

Route::get('/sering-ditanyakan', function () {
    return Inertia::render('SeringDitanyakan'); // Route for FAQ
})->name('sering-ditanyakan');

// Route for DetailPosisi with a dynamic parameter
Route::get('/detail-posisi/{role}', function ($role) {
    return Inertia::render('DetailPosisi', ['role' => $role]); // Pass role to the component
})->name('detail-posisi');

require __DIR__.'/auth.php';
