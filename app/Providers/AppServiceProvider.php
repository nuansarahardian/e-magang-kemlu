<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Database\Eloquent\Model;
use Filament\Support\Colors\Color;
use Filament\Support\Facades\FilamentColor;
use Inertia\Inertia;
use App\Http\Controllers\InformasiPribadiController;
use App\Http\Controllers\InformasiAkademikController;
use App\Http\Controllers\DokumenController;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Register Filament colors
        FilamentColor::register([
            'danger' => Color::Red,
            'gray' => Color::Zinc,
            'info' => Color::Blue,
            'primary' => Color::Blue,
            'success' => Color::Green,
            'warning' => Color::Amber,
        ]);

        // Unguard all models
        Model::unguard();

        // Share data globally with Inertia
        Inertia::share([
            // Share authentication data
            'auth.user' => function () {
                $user = auth()->user();
                return $user ? [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                ] : null;
            },

            'progressData' => function () {
                $user = auth()->user();
                
                if (!$user) {
                    return [
                        'progress' => 0,
                        'missingFields' => [],
                    ];
                }
            
                // Ambil data dari masing-masing controller
                $profilPribadiController = new InformasiPribadiController();
                $profilPribadiData = json_decode($profilPribadiController->show()->getContent(), true);
            
                $profilAkademikController = new InformasiAkademikController();
                $profilAkademikData = json_decode($profilAkademikController->show()->getContent(), true);
            
                $dokumenController = new DokumenController();
                $dokumenData = json_decode($dokumenController->showAllDocuments()->getContent(), true);
            
                // Logika penghitungan progress dan penentuan field yang belum diisi
                $filledParams = 0;
                $totalParams = 15;
                $missingFields = []; // Untuk menyimpan nama field yang belum diisi
            
                // Periksa setiap parameter, tambahkan nama ke $missingFields jika kosong
                if (empty($profilPribadiData['profilMahasiswa']['nama'])) $missingFields[] = 'Nama';
                else $filledParams++;
            
                if (empty($profilPribadiData['profilMahasiswa']['NIM'])) $missingFields[] = 'NIM';
                else $filledParams++;
            
                if (empty($profilPribadiData['profilMahasiswa']['tanggal_lahir'])) $missingFields[] = 'Tanggal Lahir';
                else $filledParams++;
            
                if (empty($profilPribadiData['profilMahasiswa']['jenis_kelamin'])) $missingFields[] = 'Jenis Kelamin';
                else $filledParams++;
            
                if (empty($profilPribadiData['profilMahasiswa']['alamat_KTP'])) $missingFields[] = 'Alamat KTP';
                else $filledParams++;
            
                if (empty($profilPribadiData['profilMahasiswa']['no_telepon'])) $missingFields[] = 'No Telepon';
                else $filledParams++;
            
                if (empty($profilPribadiData['profilMahasiswa']['foto'])) $missingFields[] = 'Foto';
                else $filledParams++;
            
                if (empty($profilAkademikData['profilAkademik']['universitas'])) $missingFields[] = 'Universitas';
                else $filledParams++;
            
                if (empty($profilAkademikData['profilAkademik']['fakultas'])) $missingFields[] = 'Fakultas';
                else $filledParams++;
            
                if (empty($profilAkademikData['profilAkademik']['jurusan'])) $missingFields[] = 'Jurusan';
                else $filledParams++;
            
                if (empty($profilAkademikData['profilAkademik']['IPK'])) $missingFields[] = 'IPK';
                else $filledParams++;
            
                if (empty($profilAkademikData['profilAkademik']['semester'])) $missingFields[] = 'Semester';
                else $filledParams++;
            
                if (empty($dokumenData['dokumen']['KTM'])) $missingFields[] = 'KTM';
                else $filledParams++;
            
                if (empty($dokumenData['dokumen']['surat_permohonan'])) $missingFields[] = 'Surat Permohonan';
                else $filledParams++;
            
                if (empty($dokumenData['dokumen']['transkrip_nilai'])) $missingFields[] = 'Transkrip Nilai';
                else $filledParams++;
            
                // Hitung persentase progress
                $progress = ($filledParams / $totalParams) * 100;
            
                return [
                    'progress' => $progress,
                    'missingFields' => $missingFields, // Kirim daftar field yang belum diisi
                ];
            },
            
            'versions' => [
                'laravel' => app()->version(),
                'php' => PHP_VERSION,
            ],
        ]);
    }
}
