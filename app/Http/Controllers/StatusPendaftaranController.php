<?php

namespace App\Http\Controllers;

use App\Models\PendaftaranMagang;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class StatusPendaftaranController extends Controller
{
    public function index()
    {
        // Mengambil user yang sedang login
        $user = Auth::user();
        
        // Mengambil NIM pengguna melalui relasi profilMahasiswa
        $nim = $user->profilMahasiswa->NIM ?? null;

        // Mendapatkan histori pendaftaran berdasarkan NIM pengguna yang sedang login
        $historiPendaftaran = [];
        if ($nim) {
            $historiPendaftaran = PendaftaranMagang::with(['posisiMagangPerBatch.posisiMagang', 'posisiMagangPerBatch.batch'])
                ->where('NIM', $nim)
                ->get()
                ->map(function ($pendaftaran) {
                    return [
                        'id' => $pendaftaran->id ?? 'Tidak tersedia',
                        'posisi' => $pendaftaran->posisiMagangPerBatch->posisiMagang->nama_posisi ?? 'Tidak tersedia',
                        'batch' => $pendaftaran->posisiMagangPerBatch->batch->nama_batch ?? 'Tidak tersedia',
                        'status' => $pendaftaran->status,
                        'tanggal_pendaftaran' => date('d M Y', strtotime($pendaftaran->tanggal_pendaftaran)),

                    ];
                }); 
        }
// dd($historiPendaftaran);
        // Kirim data ke view Inertia
        return $historiPendaftaran;
    }
}
