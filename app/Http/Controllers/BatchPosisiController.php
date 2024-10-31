<?php

namespace App\Http\Controllers;

use App\Models\PendaftaranMagang;
use App\Models\PosisiMagangPerBatch;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BatchPosisiController extends Controller
{
    /**
     * Menampilkan semua data posisi magang per batch di halaman React menggunakan Inertia.
     */
    public function index()
    {
        $user = Auth::user(); // Mendapatkan data user
        $isLoggedIn = Auth::check();
        $userNIM = $isLoggedIn && $user->profilMahasiswa ? $user->profilMahasiswa->NIM : null;

        // Mengecek apakah pengguna sudah login dan sudah mengisi NIM
        if ($isLoggedIn && (is_null($user->profilMahasiswa) || is_null($user->profilMahasiswa->NIM))) {
            return redirect()->route('dashboard')
                ->with('error', 'Silakan lengkapi profil Anda dengan mengisi NIM terlebih dahulu.');
        }

        // Cek apakah pengguna sudah memiliki status "diterima" di salah satu pendaftaran
        $hasAcceptedStatus = PendaftaranMagang::where('NIM', $userNIM)
            ->where('status', 'diterima')
            ->exists();

        // Ambil semua posisi magang per batch diurutkan berdasarkan `batch_id`, dan kelompokkan berdasarkan `posisi_magang_id`
        $positions = PosisiMagangPerBatch::with(['batch', 'posisiMagang', 'pengaturan'])
            ->orderBy('batch_id')
            ->get()
            ->groupBy('posisi_magang_id')
            ->map(function ($batchPositions) use ($userNIM) {
                $displayedBatches = [];

                foreach ($batchPositions as $index => $position) {
                    $isFull = $position->jumlah_pendaftar >= $position->kuota;

                    // Selalu tampilkan batch pertama, dan tampilkan batch selanjutnya hanya jika batch sebelumnya sudah penuh
                    if ($index == 0 || $displayedBatches[$index - 1]['isFull']) {
                        $isRegistered = PendaftaranMagang::where('NIM', $userNIM)
                            ->where('posisi_magang_per_batch_id', $position->id)
                            ->exists();

                        $displayedBatches[] = [
                            'id' => $position->id,
                            'nama_posisi' => $position->posisiMagang->nama_posisi ?? 'Tidak Diketahui',
                            'nama_batch' => $position->batch->nama_batch ?? 'Tidak Diketahui',
                            'tanggal_mulai' => $position->batch->tanggal_mulai ?? 'Tidak Diketahui',
                            'tanggal_berakhir' => $position->batch->tanggal_berakhir ?? 'Tidak Diketahui',
                            'kuota' => $position->kuota ?? 0,
                            'jumlah_pendaftar' => $position->jumlah_pendaftar ?? 0,
                            'deskripsi' => $position->posisiMagang->deskripsi ?? '',
                            'isRegistered' => $isRegistered,
                            'isFull' => $isFull,
                        ];
                    }

                    // Jika batch saat ini tidak penuh, berhenti menambahkan batch selanjutnya
                    if (!$isFull) {
                        break;
                    }
                }

                return $displayedBatches;
            })
            ->flatten(1)
            ->values();
            // dd($hasAcceptedStatus);
        return Inertia::render('PosisiMagang', [
            'positions' => $positions,
            'isLoggedIn' => $isLoggedIn,
            'hasAcceptedStatus' => $hasAcceptedStatus, // Kirimkan status "diterima" ke view
        ]);
    }

    /**
     * Menampilkan data detail posisi magang per batch berdasarkan ID di halaman React menggunakan Inertia.
     *
     * @param int $id
     */
    public function show($id)
    {
        $posisiMagangPerBatch = PosisiMagangPerBatch::with(['batch', 'posisiMagang', 'pengaturan'])->find($id);

        if (!$posisiMagangPerBatch) {
            return redirect()->back()->with('error', 'Data tidak ditemukan');
        }

        return Inertia::render('BatchPosisi/Show', [
            'data' => $posisiMagangPerBatch,
        ]);
    }
}
