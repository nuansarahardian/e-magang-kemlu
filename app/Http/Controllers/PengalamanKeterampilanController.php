<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Keterampilan;
use App\Models\Pengalaman;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Inertia\Inertia;

class PengalamanKeterampilanController extends Controller
{
    public function show()
    {
        $user = auth()->user();

        // Check if user is authenticated
        if (!$user) {
            return response()->json(['error' => 'User not authenticated.'], 401);
        }

        $NIM = $user->profilMahasiswa->NIM ?? null;

        // Handle case where NIM is not found
        if (!$NIM) {
            return response()->json(['error' => 'NIM not found.'], 404);
        }

        $pengalaman = Pengalaman::where('NIM', $NIM)->get();
        $keterampilan = Keterampilan::where('NIM', $NIM)->get();

        return response()->json([
            'pengalamanKeterampilan' => [
                'pengalaman' => $pengalaman,
                'keterampilan' => $keterampilan,
            ],
        ]);
    }

    public function storeOrUpdate(Request $request)
    {
        $user = auth()->user();

        // Check if user is authenticated
        if (!$user) {
            return redirect()->route('login')->withErrors('User not authenticated.');
        }

        $NIM = $user->profilMahasiswa->NIM ?? null;

        // Handle case where NIM is not found
        if (!$NIM) {
            return redirect()->route('dashboard')->withErrors('NIM tidak ditemukan.');
        }

        // 1. Proses Keterampilan
        $skills = $request->input('skills', []);
        foreach ($skills as $skill) {
            if (isset($skill['id']) && $skill['id']) {
                // Update jika ada ID
                $existingSkill = Keterampilan::find($skill['id']);
                if ($existingSkill) {
                    $existingSkill->update([
                        'nama_keterampilan' => $skill['nama_keterampilan'],
                        'level' => $skill['level'],
                    ]);
                }
            } else {
                // Create jika tidak ada ID
                Keterampilan::create([
                    'NIM' => $NIM,
                    'nama_keterampilan' => $skill['nama_keterampilan'],
                    'level' => $skill['level'],
                ]);
            }
        }

        // 2. Proses Pengalaman
        $experiences = $request->input('experiences', []);
        foreach ($experiences as $experience) {
            if (isset($experience['id']) && $experience['id']) {
                // Update jika ada ID
                $existingExperience = Pengalaman::find($experience['id']);
                if ($existingExperience) {
                    $existingExperience->update([
                        'posisi' => $experience['posisi'],
                        'deskripsi' => $experience['deskripsi'],
                        'tanggal_mulai' => $experience['tanggal_mulai'],
                        'tanggal_berakhir' => $experience['tanggal_berakhir'],
                        'instansi' => $experience['instansi'],
                    ]);
                }
            } else {
                // Create jika tidak ada ID
                Pengalaman::create([
                    'NIM' => $NIM,
                    'posisi' => $experience['posisi'],
                    'deskripsi' => $experience['deskripsi'],
                    'tanggal_mulai' => $experience['tanggal_mulai'],
                    'tanggal_berakhir' => $experience['tanggal_berakhir'],
                    'instansi' => $experience['instansi'],
                ]);
            }
        }

        return redirect()->route('dashboard')->with('success', 'Data Berhasil Disimpan');
    }

    public function destroyKeterampilan($id)
    {
        try {
            $keterampilan = Keterampilan::findOrFail($id);
            $keterampilan->delete();
            return redirect()->route('dashboard')->with('success', 'Data Berhasil Dihapus');
        } catch (ModelNotFoundException $e) {
            return redirect()->route('dashboard')->withErrors('Data keterampilan tidak ditemukan.');
        }
    }

    public function destroyPengalaman($id)
    {
        try {
            $pengalaman = Pengalaman::findOrFail($id);
            $pengalaman->delete();
            return redirect()->route('dashboard')->with('success', 'Data Berhasil Dihapus');
        } catch (ModelNotFoundException $e) {
            return redirect()->route('dashboard')->withErrors('Data pengalaman tidak ditemukan.');
        }
    }
}
