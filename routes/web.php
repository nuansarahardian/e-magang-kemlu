<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\BatchPosisiController;
use App\Http\Controllers\BerandaController;
use App\Http\Controllers\InformasiPribadiController;
use App\Http\Controllers\InformasiAkademikController;
use App\Http\Controllers\PengalamanKeterampilanController;
use App\Http\Controllers\DokumenController;
use App\Http\Controllers\PendaftaranController;
use App\Http\Controllers\StatusPendaftaranController;
use App\Http\Controllers\SuratPenerimaanController;
use App\Http\Controllers\DashboardController;

Route::get('/', [BerandaController::class, 'index'])
  ->name('home');

  Route::get('/dashboard', [DashboardController::class, 'index'])
  ->middleware(['auth', 'verified'])
  ->name('dashboard');



Route::get('/pendaftaran/create/{id}', [PendaftaranController::class, 'create'])
  ->middleware(['auth', 'verified'])
  ->name('pendaftaran.create');

Route::post('/pendaftaran/store', [PendaftaranController::class, 'store'])
  ->middleware(['auth', 'verified'])
  ->name('pendaftaran.store');


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


Route::get('/dokumen/view/{type}', [PendaftaranController::class, 'show'])
  ->middleware(['auth', 'verified'])
  ->name('dokumen.view');


// Route untuk Dokumen
Route::post('/dokumen/upload/{type}', [PendaftaranController::class, 'upload'])
  ->middleware(['auth', 'verified'])
  ->name('dokumen.upload');

Route::post('/dokumen/update/{type}', [PendaftaranController::class, 'update'])
  ->middleware(['auth', 'verified'])
  ->name('dokumen.update');

Route::delete('/dokumen/delete/{type}', [PendaftaranController::class, 'delete'])
  ->middleware(['auth', 'verified'])
  ->name('dokumen.destroy');

// Route lainnya (Pengalaman, Keterampilan, Profil, dan Posisi Magang)
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
  return Inertia::render('SeringDitanyakan');
})->name('sering-ditanyakan');

Route::get('/daftar-magang', function () {
  return Inertia::render('DaftarMagang');
})->name('daftar.magang');

// Route for DetailPosisi with a dynamic parameter
Route::get('/detail-posisi/{role}', function ($role) {
  return Inertia::render('DetailPosisi', ['role' => $role]);
})->name('detail-posisi');
// routes/web.php
// routes/web.php
use App\Http\Controllers\CvMahasiswaController;

Route::get('/mahasiswa/{id}/download-cv', [CvMahasiswaController::class, 'download'])->name('mahasiswa.download_cv');




Route::get('/surat-penerimaan/{id}/download', [SuratPenerimaanController::class, 'downloadSurat'])
  ->middleware(['auth', 'verified'])
  ->name('surat.penerimaan.download');


require __DIR__ . '/auth.php';
