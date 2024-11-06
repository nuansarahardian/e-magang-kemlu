<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\ProfilMahasiswa;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class InformasiPribadiController extends Controller
{
    public function show()
    {
        $user = auth()->user();
        $profilMahasiswa = $user ? $user->load('profilMahasiswa')->profilMahasiswa : null;

        $data = [
            'nama' => $user->name,
            'email' => $user->email,
            'NIM' => $profilMahasiswa->NIM ?? '',
            'tanggal_lahir' => $profilMahasiswa->tanggal_lahir ?? '',
            'jenis_kelamin' => $profilMahasiswa->jenis_kelamin ?? '',
            'alamat_KTP' => $profilMahasiswa->alamat_KTP ?? '',
            'alamat_domisili' => $profilMahasiswa->alamat_domisili ?? '',
            'no_telepon' => $profilMahasiswa->no_telepon ?? '',
            'no_asuransi' => $profilMahasiswa->no_asuransi ?? '',
            'kontak_darurat' => $profilMahasiswa->kontak_darurat ?? '',
            'foto' => $profilMahasiswa && !empty($profilMahasiswa->pas_foto)
                ? asset('storage/' . $profilMahasiswa->pas_foto)
                : asset('storage/pas_foto/default-profile.png'),
        ];

        return response()->json(['profilMahasiswa' => $data]);
    }

    public function edit()
    {
        $user = auth()->user();
        $profilMahasiswa = $user ? $user->load('profilMahasiswa')->profilMahasiswa : null;

        $data = $profilMahasiswa ? [
            'namaLengkap' => $user->name,
            'tanggalLahir' => $profilMahasiswa->tanggal_lahir,
            'jenisKelamin' => $profilMahasiswa->jenis_kelamin,
            'alamatKTP' => $profilMahasiswa->alamat_KTP,
            'alamatDomisili' => $profilMahasiswa->alamat_domisili,
            'noHp' => $profilMahasiswa->no_telepon,
            'kontakDarurat' => $profilMahasiswa->kontak_darurat,
            'noAsuransi' => $profilMahasiswa->no_asuransi,
            'pasFoto' => $profilMahasiswa->pas_foto,
        ] : null;

        return Inertia::render('Dashboard', ['profilMahasiswa' => $data]);
    }

    public function update(Request $request)
    {
        $validatedData = $request->validate([
            'NIM' => 'required|string|max:15|unique:profil_mahasiswa,NIM,' . $request->NIM . ',NIM',
            'namaLengkap' => 'required|string|max:255',
            'tanggalLahir' => 'required|date',
            'jenisKelamin' => 'required|string',
            'alamatKTP' => 'required|string|max:255',
            'alamatDomisili' => 'nullable|string|max:255',
            'noHp' => 'required|string|max:15',
            'kontakDarurat' => 'nullable|string|max:15',
            'noAsuransi' => 'nullable|string|max:15',
            'uploadFoto' => 'nullable|image|max:2048',
        ]);
    
        try {
            $user = auth()->user();
            $profilMahasiswa = $user->profilMahasiswa;
    
            $user->name = $request->namaLengkap;
            $user->save();
    
            if (!$profilMahasiswa) {
                $profilMahasiswa = new ProfilMahasiswa();
                $profilMahasiswa->user_id = $user->id;
            }
    
            $profilMahasiswa->NIM = $request->NIM;
            $profilMahasiswa->tanggal_lahir = $request->tanggalLahir;
            $profilMahasiswa->jenis_kelamin = $request->jenisKelamin;
            $profilMahasiswa->alamat_KTP = $request->alamatKTP;
            $profilMahasiswa->alamat_domisili = $request->alamatDomisili;
            $profilMahasiswa->no_telepon = $request->noHp;
            $profilMahasiswa->no_asuransi = $request->noAsuransi;
            $profilMahasiswa->kontak_darurat = $request->kontakDarurat;
    
            if ($request->hasFile('uploadFoto')) {
                if ($profilMahasiswa->pas_foto) {
                    Storage::delete('public/' . $profilMahasiswa->pas_foto);
                }
                $path = $request->file('uploadFoto')->store('pas_foto', 'public');
                $profilMahasiswa->pas_foto = $path;
            }
    
            $profilMahasiswa->save();
    
            return redirect()->route('dashboard')->with('success', 'Profil berhasil diperbarui.');
    
        } catch (\Illuminate\Database\QueryException $e) {
            if ($e->getCode() == '23000') {
                return back()->withErrors(['NIM' => 'NIM sudah terdaftar untuk mahasiswa lain.']);
            }
            return back()->withErrors(['error' => 'Terjadi kesalahan saat memperbarui profil.']);
        }
    }
    

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'NIM' => 'required|string|max:15|unique:profil_mahasiswa,NIM',
            'namaLengkap' => 'required|string|max:255',
            'tanggalLahir' => 'required|date',
            'jenisKelamin' => 'required|string',
            'alamatKTP' => 'required|string|max:255',
            'alamatDomisili' => 'nullable|string|max:255',
            'noHp' => 'required|string|max:15',
            'kontakDarurat' => 'nullable|string|max:15',
            'noAsuransi' => 'nullable|string|max:15',
            'uploadFoto' => 'nullable|image|max:2048',
        ]);
    
        try {
            $user = auth()->user();
            $profilMahasiswa = new ProfilMahasiswa();
    
            $profilMahasiswa->user_id = $user->id;
            $profilMahasiswa->NIM = $validatedData['NIM'];
            $profilMahasiswa->tanggal_lahir = $validatedData['tanggalLahir'];
            $profilMahasiswa->jenis_kelamin = $validatedData['jenisKelamin'];
            $profilMahasiswa->alamat_KTP = $validatedData['alamatKTP'];
            $profilMahasiswa->alamat_domisili = $validatedData['alamatDomisili'];
            $profilMahasiswa->no_telepon = $validatedData['noHp'];
            $profilMahasiswa->no_asuransi = $validatedData['noAsuransi'];
            $profilMahasiswa->kontak_darurat = $validatedData['kontakDarurat'];
    
            if ($request->hasFile('uploadFoto')) {
                $path = $request->file('uploadFoto')->store('pas_foto', 'public');
                $profilMahasiswa->pas_foto = $path;
            }
    
            $profilMahasiswa->save();
    
            return redirect()->route('dashboard')->with('success', 'Profil berhasil diatur.');
    
        } catch (\Illuminate\Database\QueryException $e) {
            if ($e->getCode() == '23000') {
                return back()->withErrors(['NIM' => 'NIM sudah terdaftar untuk mahasiswa lain.']);
            }
            return back()->withErrors(['error' => 'Terjadi kesalahan saat menyimpan profil.']);
        }
    }
    

    public function destroy($id)
    {
        $profilMahasiswa = ProfilMahasiswa::findOrFail($id);

        if ($profilMahasiswa->pas_foto) {
            Storage::delete('public/' . $profilMahasiswa->pas_foto);
        }

        $profilMahasiswa->delete();

        return redirect()->route('dashboard')->with('success', 'Profil berhasil dihapus.');
    }
}
