<?php

namespace App\Http\Controllers;

use App\Models\PendaftaranMagang;
use App\Models\PosisiMagangPerBatch;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Notifications\PendaftaranBerhasil;

class PendaftaranController extends Controller
{
    /**
     * Menampilkan halaman formulir pendaftaran.
     */
    public function create(Request $request, $id)
    {
        $posisiMagang = PosisiMagangPerBatch::with(['batch', 'posisiMagang'])->findOrFail($id);
        $NIM = Auth::user()->profilMahasiswa->NIM;
        $isRegistered = PendaftaranMagang::where('NIM', $NIM)
            ->where('posisi_magang_per_batch_id', $id)
            ->exists();

        return Inertia::render('PendaftaranMagang', [
            'posisiMagang' => $posisiMagang,
            'isRegistered' => $isRegistered,
        ]);
    }

    /**
     * Menyimpan data pendaftaran baru.
     */
    public function store(Request $request)
    {
        $request->validate([
            'posisi_magang_per_batch_id' => 'required|exists:posisi_magang_per_batch,id',
            'status' => 'required|string',
            'tanggal_pendaftaran' => 'required|date',
        ]);
    
        $user = Auth::user();
        $NIM = $user->profilMahasiswa->NIM;
    
        // Cek apakah pengguna sudah mendaftar pada posisi magang per batch ini
        $existingPendaftaran = PendaftaranMagang::where('NIM', $NIM)
            ->where('posisi_magang_per_batch_id', $request->posisi_magang_per_batch_id)
            ->exists();
    
        if ($existingPendaftaran) {
            return redirect()->route('posisi-magang')->with('error', 'Anda sudah terdaftar di posisi magang ini.');
        }
    
        // Buat pendaftaran baru
        $pendaftaran = PendaftaranMagang::create([
            'NIM' => $NIM,
            'posisi_magang_per_batch_id' => $request->posisi_magang_per_batch_id,
            'status' => 'mendaftar',
            'tanggal_pendaftaran' => $request->tanggal_pendaftaran,
        ]);
    
        $posisiMagang = PosisiMagangPerBatch::find($request->posisi_magang_per_batch_id);

        // Tambahkan jumlah pendaftar
        $posisiMagang->increment('jumlah_pendaftar');

        // Cek apakah jumlah pendaftar sudah memenuhi kuota
        if ($posisiMagang->jumlah_pendaftar >= $posisiMagang->kuota) {
            $posisiMagang->is_full = true;
            $posisiMagang->save();
        }
        // Kirim notifikasi email
        $user->notify(new PendaftaranBerhasil($posisiMagang));
    
        return redirect()->route('posisi-magang')->with('success', 'Pendaftaran berhasil!');
    }
    
}
