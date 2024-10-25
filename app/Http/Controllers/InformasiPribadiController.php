<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\ProfilMahasiswa;
use Illuminate\Support\Facades\Storage;

class InformasiPribadiController extends Controller
{
    public function show()
    {
        // Ambil data user yang sedang login dan muat profil mahasiswa terkait
        $user = auth()->user();

        // Pastikan user terkait ada dan memuat relasi profil mahasiswa
        $user = $user ? $user->load('profilMahasiswa') : null;
        $profilMahasiswa = $user ? $user->profilMahasiswa : null;

        // Ambil data dari model User dan gabungkan dengan data dari model ProfilMahasiswa
        $data = [
            'nama' => $user->name, // Data dari model User
            'email' => $user->email, // Data dari model User
            'NIM' => $profilMahasiswa->NIM ?? '',
            'tanggal_lahir' => $profilMahasiswa->tanggal_lahir ?? '',
            'jenis_kelamin' => $profilMahasiswa->jenis_kelamin ?? '',


            'alamat_KTP' => $profilMahasiswa->alamat_KTP ?? '',
            'alamat_domisili' => $profilMahasiswa->alamat_domisili ?? '',
   
            'no_telepon' => $profilMahasiswa->no_telepon ?? '',
         
            'foto' => $profilMahasiswa && !empty($profilMahasiswa->pas_foto)
            ? asset('storage/' . $profilMahasiswa->pas_foto)
            : asset('storage/pas_foto/default-profile.png'),
        

        ];
        // dd($profilMahasiswa);
        
        return response()->json([
        'profilMahasiswa' => $data,
    ]);
    }

    public function edit()
    {
        $user = auth()->user();
        $user = $user ? $user->load('profilMahasiswa') : null;
        $profilMahasiswa = $user ? $user->profilMahasiswa : null;

        $data = $profilMahasiswa ? [
            'namaLengkap' => $user->name,
            'tanggalLahir' => $profilMahasiswa->tanggal_lahir,
            'jenisKelamin' => $profilMahasiswa->jenis_kelamin,
            'alamatKTP' => $profilMahasiswa->alamat_KTP,
            'alamatDomisili' => $profilMahasiswa->alamat_domisili,
            'noHp' => $profilMahasiswa->no_telepon,
            'pasFoto' => $profilMahasiswa->pas_foto,
        ] : null;


        return Inertia::render('Dashboard', [
            'profilMahasiswa' => $data
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'namaLengkap' => 'required|string|max:255',
            'tanggalLahir' => 'required|date_format:d-m-Y',
            'jenisKelamin' => 'required|string',
            'alamatKTP' => 'required|string|max:255',
            'NIM' => 'required|string|max:20', // Validasi NIM
            'alamatDomisili' => 'required|string|max:255',
            'noHp' => 'required|string|max:15',
            'uploadFoto' => 'nullable|image|max:2048',
        ]);
    
        $user = auth()->user();
        $profilMahasiswa = $user->profilMahasiswa;
    
        // Update nama pada model User
        $user->name = $request->namaLengkap;
        $user->save();
    
        // Jika profil mahasiswa tidak ada, buat profil baru
        if (!$profilMahasiswa) {
            $profilMahasiswa = new ProfilMahasiswa();
            $profilMahasiswa->user_id = $user->id; // Relasi dengan user_id
        }
    
        // Update data pada model ProfilMahasiswa
        $profilMahasiswa->NIM = $request->NIM; // Pastikan NIM diperbarui
        $profilMahasiswa->tanggal_lahir = $request->tanggalLahir;
        $profilMahasiswa->jenis_kelamin = $request->jenisKelamin;
        $profilMahasiswa->alamat_KTP = $request->alamatKTP;
        $profilMahasiswa->alamat_domisili = $request->alamatDomisili;
        $profilMahasiswa->no_telepon = $request->noHp;
    
        // Update foto jika ada
        if ($request->hasFile('uploadFoto')) {
            if ($profilMahasiswa->pas_foto) {
                Storage::delete('public/' . $profilMahasiswa->pas_foto);
            }
    
            $path = $request->file('uploadFoto')->store('pas_foto', 'public');
            $profilMahasiswa->pas_foto = $path;
        }
    
        // Simpan profil mahasiswa
        $profilMahasiswa->save();
        
        return redirect()->route('dashboard')->with('success', 'Informasi berhasil diperbarui.');
    }
    

    public function store(Request $request)
    {
        // Validasi data inputan
        $validatedData = $request->validate([
            'NIM' => 'required|string|max:15|unique:profil_mahasiswa,NIM',
            'namaLengkap' => 'required|string|max:255',
            'tanggalLahir' => 'required|date',
            'jenisKelamin' => 'required|string',
            'alamatKTP' => 'required|string|max:255',
            'alamatDomisili' => 'required|string|max:255',
            'noHp' => 'required|string|max:15',
            'uploadFoto' => 'nullable|image|max:2048',
        ]);
    
        $user = auth()->user();
    
        // Buat atau update entri profil mahasiswa
        $profilMahasiswa = ProfilMahasiswa::firstOrNew(['user_id' => $user->id]);
    
        // Mengisi data
        $profilMahasiswa->fill([
            'NIM' => $validatedData['NIM'],
            'tanggal_lahir' => $validatedData['tanggalLahir'],
            'jenis_kelamin' => $validatedData['jenisKelamin'],
            'alamat_KTP' => $validatedData['alamatKTP'],
            'alamat_domisili' => $validatedData['alamatDomisili'],
            'no_telepon' => $validatedData['noHp'],
        ]);
    
        // Jika ada file, simpan foto
        if ($request->hasFile('uploadFoto')) {
            $path = $request->file('uploadFoto')->store('pas_foto', 'public');
            $profilMahasiswa->pas_foto = $path;
        }
    
        // Simpan data
        $profilMahasiswa->save();
    
        return redirect()->route('dashboard')->with('success', 'Profil berhasil diatur.');
    }
    
    public function destroy($id)
    {
        $profilMahasiswa = ProfilMahasiswa::findOrFail($id);

        // Hapus foto jika ada
        if ($profilMahasiswa->pas_foto) {
            Storage::delete('public/' . $profilMahasiswa->pas_foto);
        }

        $profilMahasiswa->delete();

        return redirect()->route('dashboard')->with('success', 'Profil berhasil dihapus.');
    }
}

