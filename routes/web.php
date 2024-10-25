<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\BatchPosisiController;    
use App\Http\Controllers\InformasiPribadiController;    
use App\Http\Controllers\InformasiAkademikController;
use App\Http\Controllers\PengalamanKeterampilanController;
use App\Http\Controllers\DokumenController; // Tambahkan ini

Route::get('/', function () {
    return Inertia::render('Beranda', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    $user = auth()->user();

    // Get data from InformasiPribadiController
    $profilPribadiController = new InformasiPribadiController();
    $profilPribadiData = $profilPribadiController->show();
    $profilPribadiArray = json_decode($profilPribadiData->getContent(), true); // Convert to array

    // Get data from InformasiAkademikController
    $profilAkademikController = new InformasiAkademikController();
    $profilAkademikData = $profilAkademikController->show();
    $profilAkademikArray = json_decode($profilAkademikData->getContent(), true); // Convert to array

    // Get data from PengalamanKeterampilanController
    $pengalamanKeterampilanController = new PengalamanKeterampilanController();
    $pengalamanKeterampilanData = $pengalamanKeterampilanController->show();
    $pengalamanKeterampilanArray = json_decode($pengalamanKeterampilanData->getContent(), true); // Convert to array

    // Get data from DokumenController
    $dokumenController = new DokumenController();
    $dokumenData = $dokumenController->showAllDocuments();
    $dokumenArray = json_decode($dokumenData->getContent(), true); // Convert to array

    // Combine all data (Tambahkan Kode ini)
    $data = array_merge(
        $profilPribadiArray['profilMahasiswa'] ?? [],
        $profilAkademikArray['profilAkademik'] ?? [],
        $pengalamanKeterampilanArray['pengalamanKeterampilan'] ?? [],
        $dokumenArray['dokumen'] ?? []
    );

    // Send data to React view using Inertia
    return Inertia::render('Dashboard', [
        'profilData' => $data
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');


Route::get('/dokumen/view/{type}', [DokumenController::class, 'show'])
    ->middleware(['auth', 'verified'])
    ->name('dokumen.view');

// Route untuk Dokumen
Route::post('/dokumen/upload/{type}', [DokumenController::class, 'upload'])
    ->middleware(['auth', 'verified'])
    ->name('dokumen.upload');

Route::post('/dokumen/update/{type}', [DokumenController::class, 'update'])
    ->middleware(['auth', 'verified'])
    ->name('dokumen.update');

    Route::delete('/dokumen/delete/{type}', [DokumenController::class, 'delete'])
    ->middleware(['auth', 'verified'])
    ->name('dokumen.destroy');


// Route lainnya (Pengalaman, Keterampilan, Profil, dan Posisi Magang) tetap seperti sebelumnya


Route::post('/pengalaman-keterampilan/save', [PengalamanKeterampilanController::class, 'storeOrUpdate'])
    ->middleware(['auth', 'verified'])
    ->name('pengalaman-keterampilan.save');

Route::delete('/keterampilan/destroy/{id}', [PengalamanKeterampilanController::class, 'destroyKeterampilan'])
    ->middleware(['auth', 'verified'])
    ->name('keterampilan.destroy');

Route::delete('/pengalaman/destroy/{id}', [PengalamanKeterampilanController::class, 'destroyPengalaman'])
    ->middleware(['auth', 'verified'])
    ->name('pengalaman.destroy');

Route::post('/profil-mahasiswa/update', [InformasiPribadiController::class, 'update'])
    ->middleware(['auth', 'verified'])
    ->name('profil-mahasiswa.update');

Route::post('/profil-mahasiswa/store', [InformasiPribadiController::class, 'store'])
    ->middleware(['auth', 'verified'])
    ->name('profil-mahasiswa.store');

    Route::post('/profil-akademik/store', [InformasiAkademikController::class, 'store'])
    ->middleware(['auth', 'verified'])
    ->name('profil-akademik.store');

Route::post('/profil-akademik/update', [InformasiAkademikController::class, 'update'])
    ->middleware(['auth', 'verified'])
    ->name('profil-akademik.update');





Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Route untuk menampilkan semua posisi magang per batch
Route::get('/posisi-magang', [BatchPosisiController::class, 'index'])->name('posisi-magang');


Route::get('/sering-ditanyakan', function () {
    return Inertia::render('SeringDitanyakan'); // Route for FAQ
})->name('sering-ditanyakan');

// Route for DetailPosisi with a dynamic parameter
Route::get('/detail-posisi/{role}', function ($role) {
    return Inertia::render('DetailPosisi', ['role' => $role]); // Pass role to the component
})->name('detail-posisi');

require __DIR__.'/auth.php';
