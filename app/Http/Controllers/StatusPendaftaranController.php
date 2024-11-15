<?php
namespace App\Http\Controllers;
use Carbon\Carbon;
use App\Models\PendaftaranMagang;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;


class StatusPendaftaranController extends Controller
{
    public function index()
    {
        Carbon::setLocale('id');
        // Mengambil user yang sedang login
        $user = Auth::user();
        
        // Mengambil NIM pengguna melalui relasi profilMahasiswa
        $nim = $user->profilMahasiswa->NIM ?? null;
    
        // Mendapatkan histori pendaftaran berdasarkan NIM pengguna yang sedang login
        $historiPendaftaran = [];
        if ($nim) {
            $historiPendaftaran = PendaftaranMagang::with([
                'posisiMagangPerBatch.posisiMagang',
                'posisiMagangPerBatch.batch',
                'user.profilMahasiswa' // Relasi ke profil mahasiswa
            ])
            ->where('NIM', $nim)
            ->get()
            ->map(function ($pendaftaran) {
                return [
                    'nomor_registrasi' => $pendaftaran->unique_id ?? 'Tidak tersedia',
                    'id' => $pendaftaran->id ?? 'Tidak tersedia',
                    'posisi' => $pendaftaran->posisiMagangPerBatch->posisiMagang->nama_posisi ?? 'Tidak tersedia',
                    'nama_batch' => $pendaftaran->posisiMagangPerBatch->batch->nama_batch ?? 'Tidak tersedia',
                    'batch' => $pendaftaran->posisiMagangPerBatch->batch->is_active ?? 'Tidak tersedia',
                    'status' => $pendaftaran->status,
                    'tanggal_pendaftaran' => date('d M Y', strtotime($pendaftaran->tanggal_pendaftaran)),
                    'gambar' => $pendaftaran->posisiMagangPerBatch->posisiMagang->gambar 
                                ? asset('storage/' . $pendaftaran->posisiMagangPerBatch->posisiMagang->gambar) 
                                : asset('images/default.jpg'),
                                
                    'pas_foto' => $pendaftaran->user->profilMahasiswa->pas_foto 
                                ? asset('storage/' .$pendaftaran->user->profilMahasiswa->pas_foto) 
                                : asset('images/default.jpg'),

                    'nama' => $pendaftaran->user->name ?? 'Tidak tersedia', // Nama user
                    'nim' => $pendaftaran->user->profilMahasiswa->NIM ?? 'Tidak tersedia', // NIM
                    'jurusan' => $pendaftaran->user->profilMahasiswa->jurusan ?? 'Tidak tersedia', // Jurusan
                    'fakultas' => $pendaftaran->user->profilMahasiswa->fakultas ?? 'Tidak tersedia', // Fakultas
                    'universitas' => $pendaftaran->user->profilMahasiswa->universitas ?? 'Tidak tersedia', // Universitas
                    'posisi_magang' => $pendaftaran->posisiMagangPerBatch->posisiMagang->nama_posisi ?? 'Tidak tersedia', // Posisi Magang
                    'tanggal_mulai' => Carbon::parse($pendaftaran->posisiMagangPerBatch->batch->tanggal_mulai)->translatedFormat('d F Y') ?? 'Tidak tersedia', // Tanggal Mulai
        'tanggal_berakhir' => Carbon::parse($pendaftaran->posisiMagangPerBatch->batch->tanggal_berakhir)->translatedFormat('d F Y') ?? 'Tidak tersedia', // Tanggal Berakhir
                ];
            });
        }
    // dd($historiPendaftaran);
        // Convert to array before passing to Inertia
        return $historiPendaftaran;
    }
}    