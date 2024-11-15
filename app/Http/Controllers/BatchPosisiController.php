<?php

namespace App\Http\Controllers;

use App\Models\PendaftaranMagang;
use App\Models\PosisiMagangPerBatch;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class BatchPosisiController extends Controller
{
    public function index()
    {
        Carbon::setLocale('id');
        $user = Auth::user();
        $isLoggedIn = Auth::check();
        $userNIM = $isLoggedIn && $user->profilMahasiswa ? $user->profilMahasiswa->NIM : null;

        // Mengecek apakah pengguna sudah login dan sudah mengisi NIM
        if ($isLoggedIn && (is_null($user->profilMahasiswa) || is_null($user->profilMahasiswa->NIM))) {
            return redirect()->route('dashboard')
                ->with('error', 'Silakan lengkapi profil Anda dengan mengisi NIM terlebih dahulu.');
        }

        // Cek apakah pengguna sudah memiliki status "diterima" di salah satu pendaftaran
        $hasAcceptedStatus = PendaftaranMagang::where('NIM', $userNIM)
        ->whereIn('status', ['diterima', 'aktif', 'tidak lulus'])
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
                    $isOpen = $position->batch->is_open; // Pengecekan is_open untuk kontrol admin

                    // Lanjutkan ke batch berikutnya jika is_open bernilai false
                    if (!$isOpen) {
                        continue;
                    }

                    // Logika untuk menentukan `nextBatchDate` dan `sameRegistrationDate`
                    $nextBatchDate = null;
                    $sameRegistrationDate = false;

                    // Periksa apakah batch berikutnya memiliki tanggal pendaftaran yang sama
                    if (isset($batchPositions[$index + 1])) {
                        $nextBatch = $batchPositions[$index + 1];

                        // Pastikan kedua tanggal hanya mempertimbangkan tanggal saja tanpa jam
                        $currentDate = Carbon::parse($position->batch->tanggal_pendaftaran)->toDateString();
                        $nextDate = Carbon::parse($nextBatch->batch->tanggal_pendaftaran)->toDateString();

                        // Set `sameRegistrationDate` ke true jika kedua tanggal sama
                        $sameRegistrationDate = ($currentDate === $nextDate);

                        // Set `nextBatchDate` jika tanggal berikutnya berbeda
                        if (!$sameRegistrationDate) {
                            $nextBatchDate = Carbon::parse($nextBatch->batch->tanggal_pendaftaran)->translatedFormat('d F Y');
                        }
                    }

                    // Periksa apakah ada elemen sebelumnya di displayedBatches sebelum mengaksesnya
                    $previousBatchIsFull = isset($displayedBatches[$index - 1]) && $displayedBatches[$index - 1]['isFull'];
                    $previousBatchClosed = isset($displayedBatches[$index - 1]) && !$displayedBatches[$index - 1]['is_open'];

                    // Tampilkan batch jika:
                    // - Batch saat ini memiliki `is_open` = true, atau
                    // - Batch sebelumnya penuh atau ditutup dan memiliki tanggal pendaftaran yang sama
                    if ($isOpen || $previousBatchIsFull || ($previousBatchClosed && $sameRegistrationDate)) {
                        $isRegistered = PendaftaranMagang::where('NIM', $userNIM)
                            ->where('posisi_magang_per_batch_id', $position->id)
                            ->exists();


                               // Check if user is specifically accepted in this position
                $isAcceptedInPosition = PendaftaranMagang::where('NIM', $userNIM)
                ->where('posisi_magang_per_batch_id', $position->id)
                ->whereIn('status', ['diterima', 'aktif', 'lulus', 'tidak lulus'])
                ->exists();
                        $displayedBatches[] = [
                            'id' => $position->id,
                            'nama_posisi' => $position->posisiMagang->nama_posisi ?? 'Tidak Diketahui',
                            'nama_batch' => $position->batch->nama_batch ?? 'Tidak Diketahui',
                            'tanggal_pendaftaran' => $position->batch->tanggal_pendaftaran 
                                ? Carbon::parse($position->batch->tanggal_pendaftaran)->translatedFormat('d F Y') 
                                : 'Tidak Diketahui',
                            'tanggal_mulai' => $position->batch->tanggal_mulai 
                                ? Carbon::parse($position->batch->tanggal_mulai)->translatedFormat('d F Y') 
                                : 'Tidak Diketahui',
                            'tanggal_berakhir' => $position->batch->tanggal_berakhir 
                                ? Carbon::parse($position->batch->tanggal_berakhir)->translatedFormat('d F Y') 
                                : 'Tidak Diketahui',
                            'kuota' => $position->kuota ?? 0,
                            'jumlah_pendaftar' => $position->jumlah_pendaftar ?? 0,
                            'deskripsi' => $position->posisiMagang->deskripsi ?? '',
                            'kode' => $position->posisiMagang->kode_posisi ?? '',
                            'isRegistered' => $isRegistered,
                            'sistem_penerimaan' => $position->sistem_penerimaan ?? '',
                            'isFull' => $isFull,
                            'is_open' => $isOpen,
                            'gambar' => $position->posisiMagang->gambar 
                                ? asset('storage/' . $position->posisiMagang->gambar) 
                                : asset('images/default.jpg'),
                            'nextBatchDate' => $nextBatchDate, // Tanggal pendaftaran batch berikutnya jika berbeda
                            'sameRegistrationDate' => $sameRegistrationDate,
                            'isAcceptedInPosition' => $isAcceptedInPosition,  // Apakah tanggal pendaftaran batch berikutnya sama
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

        return Inertia::render('PosisiMagang', [
            'positions' => $positions,
            'isLoggedIn' => $isLoggedIn,
            'hasAcceptedStatus' => $hasAcceptedStatus,
        ]);
    }

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
