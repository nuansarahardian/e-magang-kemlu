<?php

namespace App\Http\Controllers;

use App\Models\PendaftaranMagang;
use App\Models\PosisiMagangPerBatch;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use App\Notifications\PendaftaranBerhasil;
use Illuminate\Support\Facades\Validator;

class PendaftaranController extends Controller
{
    /**
     * Menampilkan halaman formulir pendaftaran.
     */
    public function create(Request $request, $id)
    {
        $posisiMagang = PosisiMagangPerBatch::with(['batch', 'posisiMagang'])->findOrFail($id);
        $user = Auth::user();
        $NIM = $user->profilMahasiswa->NIM;

        $isRegistered = PendaftaranMagang::where('NIM', $NIM)
            ->where('posisi_magang_per_batch_id', $id)
            ->exists();

        // Ambil data profil mahasiswa sebagai profilMahasiswa
        $profilMahasiswa = [
            'NIM' => $user->profilMahasiswa->NIM ?? 'Tidak ada NIM',
            'name' => $user->name,
            'email' => $user->email,
            'profileImage' => $user->profilMahasiswa->pas_foto && !empty($user->profilMahasiswa->pas_foto)
                    ? asset('storage/' . $user->profilMahasiswa->pas_foto)
                    : asset('storage/pas_foto/default-profile.png')
        ];

        $documents = [
            [
                'title' => 'KTM',
                'items' => [
                    [
                        'name' => 'KTM',
                        'fileName' => $user->profilMahasiswa->KTM ?? 'File tidak tersedia',
                        'date' => $user->profilMahasiswa->created_at->format('d M Y H:i:s'),
                        'url'=> $user->profilMahasiswa->KTM ? asset('storage/' .  $user->profilMahasiswa->KTM) : null,
                    ],
                ],
            ],
            [
                'title' => 'Surat Permohonan',
                'items' => [
                    [
                        'name' => 'Surat Permohonan',
                        'fileName' => $user->profilMahasiswa->surat_permohonan ?? 'File tidak tersedia',
                        'date' => $user->profilMahasiswa->created_at->format('d M Y H:i:s'),
                        'url'=> $user->profilMahasiswa->surat_permohonan ? asset('storage/' .  $user->profilMahasiswa->surat_permohonan) : null,
                    ],
                ],
            ],
            [
                'title' => 'Transkrip Nilai',
                'items' => [
                    [
                        'name' => 'Transkrip Nilai',
                        'fileName' => $user->profilMahasiswa->transkrip_nilai ?? 'File tidak tersedia',
                        'date' => $user->profilMahasiswa->created_at->format('d M Y H:i:s'),
                        'url'=> $user->profilMahasiswa->transkrip_nilai ? asset('storage/' .  $user->profilMahasiswa->transkrip_nilai) : null,
                    ],
                ],
            ],
        ];

        return Inertia::render('PendaftaranMagang', [
            'posisiMagang' => $posisiMagang,
            'isRegistered' => $isRegistered,
            'profilMahasiswa' => $profilMahasiswa, // Pastikan profilMahasiswa dikirim
            'documents' => $documents,
        ]);
    }

    public function show($type)
    {
        $user = auth()->user();
        $profil = $user->profilMahasiswa;

        if (!$profil) {
            return redirect()->route('dashboard')->with('error', 'Profil mahasiswa tidak ditemukan.');
        }

        $filePath = null;
        if ($type === 'KTM') {
            $filePath = $profil->KTM;
        } elseif ($type === 'surat_permohonan') {
            $filePath = $profil->surat_permohonan;
        } elseif ($type === 'transkrip_nilai') {
            $filePath = $profil->transkrip_nilai;
        }

        if (!$filePath || !Storage::disk('public')->exists($filePath)) {
            return redirect()->route('dashboard')->with('error', 'File tidak ditemukan.');
        }

        return response()->redirectTo(asset('storage/' . $filePath));
    }

    public function upload(Request $request, $type)
    {
        $validator = Validator::make($request->all(), [
            'file' => 'required|file|mimes:pdf,doc,docx,jpg,png|max:5120', // 5MB
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $user = auth()->user();
        $profil = $user->profilMahasiswa;

        if (!$profil) {
            return back()->with('error', 'Profil mahasiswa tidak ditemukan.');
        }

        try {
            $file = $request->file('file');
            $fileSizeMB = round($file->getSize() / 1024 / 1024, 2);
            $originalName = $file->getClientOriginalName();
            $path = $file->storeAs('dokumen', $originalName, 'public');

            if ($type === 'KTM') {
                if ($profil->KTM) {
                    Storage::disk('public')->delete($profil->KTM);
                }
                $profil->KTM = $path;
            } elseif ($type === 'surat_permohonan') {
                if ($profil->surat_permohonan) {
                    Storage::disk('public')->delete($profil->surat_permohonan);
                }
                $profil->surat_permohonan = $path;
            } elseif ($type === 'transkrip_nilai') {
                if ($profil->transkrip_nilai) {
                    Storage::disk('public')->delete($profil->transkrip_nilai);
                }
                $profil->transkrip_nilai = $path;
            }

            $profil->save();
            return back()->with('success', 'File berhasil diunggah (' . $fileSizeMB . ' MB).');
        } catch (\Exception $e) {
            \Log::error("Error saat mengunggah file: " . $e->getMessage());
            \Log::info('Menerima file upload untuk tipe: ' . $type);
            \Log::info('Nama file asli: ' . $request->file('file')->getClientOriginalName());
            return back()->with('error', 'Gagal mengunggah file.');
        }
    }

    public function store(Request $request)
    {
        $request->validate([
            'posisi_magang_per_batch_id' => 'required|exists:posisi_magang_per_batch,id',
            'status' => 'required|string',
            'tanggal_pendaftaran' => 'required|date_format:d-m-Y H:i:s',
        ]);
    
        $user = Auth::user();
        $NIM = $user->profilMahasiswa->NIM;
    
        $existingPendaftaran = PendaftaranMagang::where('NIM', $NIM)
            ->where('posisi_magang_per_batch_id', $request->posisi_magang_per_batch_id)
            ->exists();
    
        if ($existingPendaftaran) {
            return redirect()->route('posisi-magang')->with('error', 'Anda sudah terdaftar di posisi magang ini.');
        }
    
        $tanggalPendaftaran = \Carbon\Carbon::createFromFormat('d-m-Y H:i:s', $request->tanggal_pendaftaran)->format('Y-m-d H:i:s');
        $posisiMagang = PosisiMagangPerBatch::find($request->posisi_magang_per_batch_id);
        $sistemPenerimaan = $posisiMagang->sistem_penerimaan;
    
        if ($sistemPenerimaan === 'Otomatis') {
            if ($posisiMagang->jumlah_pendaftar < $posisiMagang->kuota) {
                $pendaftaran = PendaftaranMagang::create([
                    'NIM' => $NIM,
                    'posisi_magang_per_batch_id' => $request->posisi_magang_per_batch_id,
                    'status' => 'diterima',
                    'tanggal_pendaftaran' => $tanggalPendaftaran,
                ]);
    
                $posisiMagang->increment('jumlah_pendaftar');
                if ($posisiMagang->jumlah_pendaftar >= $posisiMagang->kuota) {
                    $posisiMagang->is_full = true;
                    $posisiMagang->save();
                }
    
                // Kirim notifikasi hanya jika sistem penerimaan otomatis
                $user->notify(new PendaftaranBerhasil($posisiMagang));
                return redirect()->route('posisi-magang')->with('success', 'Pendaftaran berhasil!');
            } else {
                return redirect()->route('posisi-magang')->with('error', 'Kuota untuk posisi ini sudah penuh.');
            }
        } else {
            // Untuk pengaturan manual, simpan pendaftaran tanpa notifikasi
            PendaftaranMagang::create([
                'NIM' => $NIM,
                'posisi_magang_per_batch_id' => $request->posisi_magang_per_batch_id,
                'status' => 'mendaftar',
                'tanggal_pendaftaran' => $tanggalPendaftaran,
            ]);
    
            return redirect()->route('posisi-magang')->with('success', 'Pendaftaran berhasil, menunggu seleksi admin.');
        }
    }
    
    public function update(Request $request, $type)
    {
        return $this->upload($request, $type);
    }

    public function delete($type)
    {
        $user = auth()->user();
        $profil = $user->profilMahasiswa;

        if (!$profil) {
            return back()->with('error', 'Profil mahasiswa tidak ditemukan.');
        }

        try {
            if ($type === 'KTM' && $profil->KTM && Storage::disk('public')->exists($profil->KTM)) {
                Storage::disk('public')->delete($profil->KTM);
                $profil->KTM = null;
            } elseif ($type === 'surat_permohonan' && $profil->surat_permohonan && Storage::disk('public')->exists($profil->surat_permohonan)) {
                Storage::disk('public')->delete($profil->surat_permohonan);
                $profil->surat_permohonan = null;
            } elseif ($type === 'transkrip_nilai' && $profil->transkrip_nilai && Storage::disk('public')->exists($profil->transkrip_nilai)) {
                Storage::disk('public')->delete($profil->transkrip_nilai);
                $profil->transkrip_nilai = null;
            } else {
                return back()->with('error', 'File tidak ditemukan atau sudah dihapus.');
            }

            $profil->save();
            return redirect()->back()->with('success', 'File berhasil dihapus.');
        } catch (\Exception $e) {
            \Log::error("Error saat menghapus file: " . $e->getMessage());
            return redirect()->back()->with('error', 'Gagal menghapus file.');
        }
    }
}