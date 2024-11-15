<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\{
    ProfileController,
    BatchPosisiController,
    BerandaController,
    InformasiPribadiController,
    InformasiAkademikController,
    PengalamanKeterampilanController,
    DokumenController,
    PendaftaranController,
    StatusPendaftaranController,
    SuratPenerimaanController,
    DashboardController,
    CvMahasiswaController,
 SertifikatController,

};

Route::get('/clear-cache', function() {
  Artisan::call('view:clear');
  Artisan::call('config:clear');
  Artisan::call('cache:clear');  
  Artisan::call('queue:work');
  return 'Cache cleared';
});
// Halaman utama
Route::get('/', [BerandaController::class, 'index'])->name('home');

// Dashboard
Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

// Route Pendaftaran
Route::prefix('pendaftaran')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/create/{id}', [PendaftaranController::class, 'create'])->name('pendaftaran.create');
    Route::post('/store', [PendaftaranController::class, 'store'])->name('pendaftaran.store');
});

// Route Dokumen
Route::prefix('dokumen')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/view/{type}', [DokumenController::class, 'show'])->name('dokumen.view');
    Route::post('/upload/{type}', [DokumenController::class, 'upload'])->name('dokumen.upload');
    Route::post('/update/{type}', [DokumenController::class, 'update'])->name('dokumen.update');
    Route::delete('/delete/{type}', [DokumenController::class, 'delete'])->name('dokumen.destroy');
});

// Route Pengalaman dan Keterampilan
Route::prefix('pengalaman-keterampilan')->middleware(['auth', 'verified'])->group(function () {
    Route::post('/save', [PengalamanKeterampilanController::class, 'storeOrUpdate'])->name('pengalaman-keterampilan.save');
    Route::delete('/keterampilan/destroy/{id}', [PengalamanKeterampilanController::class, 'destroyKeterampilan'])->name('keterampilan.destroy');
    Route::delete('/pengalaman/destroy/{id}', [PengalamanKeterampilanController::class, 'destroyPengalaman'])->name('pengalaman.destroy');
});

// Route Profil Mahasiswa
Route::prefix('profil-mahasiswa')->middleware(['auth', 'verified'])->group(function () {
    Route::post('/update', [InformasiPribadiController::class, 'update'])->name('profil-mahasiswa.update');
    Route::post('/store', [InformasiPribadiController::class, 'store'])->name('profil-mahasiswa.store');
});

// Route Profil Akademik
Route::prefix('profil-akademik')->middleware(['auth', 'verified'])->group(function () {
    Route::post('/store', [InformasiAkademikController::class, 'store'])->name('profil-akademik.store');
    Route::post('/update', [InformasiAkademikController::class, 'update'])->name('profil-akademik.update');
});

// Route untuk Profile User (edit, update, delete)
Route::middleware('auth')->prefix('profile')->group(function () {
    Route::get('/', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Route untuk Posisi Magang
Route::get('/posisi-magang', [BatchPosisiController::class, 'index'])->name('posisi-magang');

// Route untuk halaman statis
Route::get('/sering-ditanyakan', fn() => Inertia::render('SeringDitanyakan'))->name('sering-ditanyakan');
Route::get('/daftar-magang', fn() => Inertia::render('DaftarMagang'))->name('daftar.magang');

// Route untuk Detail Posisi dengan parameter dinamis
Route::get('/detail-posisi/{role}', fn($role) => Inertia::render('DetailPosisi', ['role' => $role]))->name('detail-posisi');

// Route untuk Download CV Mahasiswa
Route::get('/mahasiswa/{id}/download-cv', [CvMahasiswaController::class, 'download'])->name('mahasiswa.download_cv');

Route::get('/mahasiswa/{id}/download-sertifikat', [SertifikatController::class, 'download'])->name('mahasiswa.download_sertifikat');

Route::get('/surat-penerimaan/{id}/download', [SuratPenerimaanController::class, 'downloadSurat'])
    ->middleware(['auth', 'verified'])
    ->name('surat.penerimaan.download');



// Route Auth (login, register, dll.)
require __DIR__ . '/auth.php';
