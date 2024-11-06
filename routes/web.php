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

Route::get('/', [BerandaController::class, 'index'])
  ->name('home');

Route::get('/dashboard', function () {
  $user = auth()->user();

  // Ambil data dari beberapa controller
  $profilPribadiController = new InformasiPribadiController();
  $profilPribadiData = $profilPribadiController->show();
  $profilPribadiArray = json_decode($profilPribadiData->getContent(), true);

  $profilAkademikController = new InformasiAkademikController();
  $profilAkademikData = $profilAkademikController->show();
  $profilAkademikArray = json_decode($profilAkademikData->getContent(), true);

  $pengalamanKeterampilanController = new PengalamanKeterampilanController();
  $pengalamanKeterampilanData = $pengalamanKeterampilanController->show();
  $pengalamanKeterampilanArray = json_decode($pengalamanKeterampilanData->getContent(), true);

  $dokumenController = new DokumenController();
  $dokumenData = $dokumenController->showAllDocuments();
  $dokumenArray = json_decode($dokumenData->getContent(), true);

  // Mengambil data histori pendaftaran dari StatusPendaftaranController
  $statusPendaftaranController = new StatusPendaftaranController();
  $historiPendaftaran = $statusPendaftaranController->index();

  // Gabungkan semua data
  $data = array_merge(
    $profilPribadiArray['profilMahasiswa'] ?? [],
    $profilAkademikArray['profilAkademik'] ?? [],
    $pengalamanKeterampilanArray['pengalamanKeterampilan'] ?? [],
    $dokumenArray['dokumen'] ?? []
  );

  // Menghitung progress (logika pengisian)
  $totalParams = 15;
  $filledParams = 0;

  // Cek setiap parameter yang terisi
  $filledParams += !empty($profilPribadiArray['profilMahasiswa']['nama']) ? 1 : 0;
  $filledParams += !empty($profilPribadiArray['profilMahasiswa']['NIM']) ? 1 : 0;
  $filledParams += !empty($profilPribadiArray['profilMahasiswa']['tanggal_lahir']) ? 1 : 0;
  $filledParams += !empty($profilPribadiArray['profilMahasiswa']['jenis_kelamin']) ? 1 : 0;
  $filledParams += !empty($profilPribadiArray['profilMahasiswa']['alamat_KTP']) ? 1 : 0;
  $filledParams += !empty($profilPribadiArray['profilMahasiswa']['no_telepon']) ? 1 : 0;
  $filledParams += !empty($profilPribadiArray['profilMahasiswa']['foto']) ? 1 : 0;
  $filledParams += !empty($profilAkademikArray['profilAkademik']['universitas']) ? 1 : 0;
  $filledParams += !empty($profilAkademikArray['profilAkademik']['fakultas']) ? 1 : 0;
  $filledParams += !empty($profilAkademikArray['profilAkademik']['jurusan']) ? 1 : 0;
  $filledParams += !empty($profilAkademikArray['profilAkademik']['IPK']) ? 1 : 0;
  $filledParams += !empty($profilAkademikArray['profilAkademik']['semester']) ? 1 : 0;
  $filledParams += !empty($dokumenArray['dokumen']['KTM']) ? 1 : 0;
  $filledParams += !empty($dokumenArray['dokumen']['surat_permohonan']) ? 1 : 0;
  $filledParams += !empty($dokumenArray['dokumen']['transkrip_nilai']) ? 1 : 0;

  // Menghitung persentase progress
  $progress = ($filledParams / $totalParams) * 100;

  // Mengirim data ke view menggunakan Inertia
  return Inertia::render('Dashboard', [
    'profilData' => $data,
    'progress' => $progress,
    'historiPendaftaran' => $historiPendaftaran,
  ]);
})->middleware(['auth', 'verified'])->name('dashboard');



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
