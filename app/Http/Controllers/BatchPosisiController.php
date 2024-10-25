<?php

namespace App\Http\Controllers;

use App\Models\PosisiMagangPerBatch;
use Inertia\Inertia;
use Illuminate\Http\Request;

class BatchPosisiController extends Controller
{
    /**
     * Menampilkan semua data posisi magang per batch di halaman React menggunakan Inertia.
     */
    public function index()
    {
        // Mengambil data posisi magang per batch dari database beserta relasi
        $positions = PosisiMagangPerBatch::with(['batch', 'posisiMagang', 'pengaturan'])->get()
            ->map(function ($position) {
                return [
                    'id' => $position->id,
                    'nama_posisi' => $position->posisiMagang->nama_posisi ?? 'Tidak Diketahui',
                    'nama_batch' => $position->batch->nama_batch ?? 'Tidak Diketahui',
                    'tanggal_mulai' => $position->batch->tanggal_mulai ?? 'Tidak Diketahui',
                    'tanggal_berakhir' => $position->batch->tanggal_berakhir ?? 'Tidak Diketahui',
                    'kuota' => $position->kuota ?? 0,
                    'jumlah_pendaftar' => $position->jumlah_pendaftar ?? 0,
                    'deskripsi' => $position->PosisiMagang->deskripsi,
                ];
            });

            // dd($positions);
        // Mengirim data ke komponen React menggunakan Inertia
        return Inertia::render('PosisiMagang', [
            'positions' => $positions
        ]);
    }

    /**
     * Menampilkan data detail posisi magang per batch berdasarkan ID di halaman React menggunakan Inertia.
     *
     * @param int $id
     */
    public function show($id)
    {
        // Ambil data posisi magang per batch berdasarkan ID dengan relasi
        $posisiMagangPerBatch = PosisiMagangPerBatch::with(['batch', 'posisiMagang', 'pengaturan'])->find($id);

        if (!$posisiMagangPerBatch) {
            return redirect()->back()->with('error', 'Data tidak ditemukan');
        }

        // Kirim data ke komponen React menggunakan Inertia
        return Inertia::render('BatchPosisi/Show', [
            'data' => $posisiMagangPerBatch
        ]);
    }
}
