<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\ProfilMahasiswa;

class DokumenController extends Controller
{
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
        
        // Mengirimkan URL publik untuk akses file
        return response()->redirectTo(asset('storage/' . $filePath));
    }
    
    public function showAllDocuments()
    {
        $user = auth()->user();
        $profil = $user->profilMahasiswa;
    
        if (!$profil) {
            return response()->json(['error' => 'Profil mahasiswa tidak ditemukan.'], 404);
        }
    
        // Pastikan setiap dokumen memiliki nilai default (null)
        return response()->json([
            'dokumen' => [
                'KTM' => $profil->KTM ?? null,
                'surat_permohonan' => $profil->surat_permohonan ?? null,
                'transkrip_nilai' => $profil->transkrip_nilai ?? null,
            ]
        ]);
    }
    
    
    public function upload(Request $request, $type)
    {
        $request->validate([
            'file' => 'required|file|mimes:pdf,doc,docx,jpg,png|max:2048',
        ]);
    
        $user = auth()->user();
        $profil = $user->profilMahasiswa;
    
        if (!$profil) {
            return back()->with('error', 'Profil mahasiswa tidak ditemukan.');
        }
    
        try {
            // Simpan file ke 'dokumen' dalam disk 'public'
            $path = $request->file('file')->store('dokumen', 'public');
    
            // Update field berdasarkan tipe dokumen
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
    
            return back()->with('success', 'File berhasil diunggah.');
        } catch (\Exception $e) {
            \Log::error("Error saat mengunggah file: " . $e->getMessage());
            return back()->with('error', 'Gagal mengunggah file.');
        }
    }
    

    // Fungsi untuk memperbarui file
    public function update(Request $request, $type)
    {
        return $this->upload($request, $type); // Gunakan logika unggah yang sama untuk memperbarui
    }

    public function delete($type)
    {
        $user = auth()->user();
        $profil = $user->profilMahasiswa;
    
        if (!$profil) {
            return back()->with('error', 'Profil mahasiswa tidak ditemukan.');
        }
    
        try {
            // Cek dan hapus file berdasarkan tipe dokumen
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
       // Redirect ke halaman yang sama dengan pesan sukses
       return redirect()->back()->with('success', 'File berhasil dihapus.');
    } catch (\Exception $e) {
        \Log::error("Error saat menghapus file: " . $e->getMessage());
        return redirect()->back()->with('error', 'Gagal menghapus file.');
    }
    }
    
    
}
