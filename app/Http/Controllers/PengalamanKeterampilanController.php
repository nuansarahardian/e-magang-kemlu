<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Keterampilan;
use App\Models\Pengalaman;

class PengalamanKeterampilanController extends Controller
{
    public function show()
    {
        $user = auth()->user();
        $NIM = $user->profilMahasiswa->NIM ?? null;

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
        $NIM = $user->profilMahasiswa->NIM;

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
        $keterampilan = Keterampilan::findOrFail($id);
        $keterampilan->delete();

        return redirect()->route('dashboard')->with('success', 'Data Berhasil Dihapus');
    
    }

    public function destroyPengalaman($id)
    {
        $pengalaman = Pengalaman::findOrFail($id);
        $pengalaman->delete();
        return redirect()->route('dashboard')->with('success', 'Data Berhasil Dihapus');
    
    }
}
