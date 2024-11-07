<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\ProfilMahasiswa;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;
use Exception;

class InformasiAkademikController extends Controller
{
    public function show()
    {
        try {
            // Ambil data user yang sedang login dan muat profil mahasiswa terkait
            $user = auth()->user();
            $user = $user ? $user->load('profilMahasiswa') : null;
            $profilMahasiswa = $user ? $user->profilMahasiswa : null;

            // Ambil data dari model ProfilMahasiswa
            $data = [
                'universitas' => $profilMahasiswa->universitas ?? '',
                'fakultas' => $profilMahasiswa->fakultas ?? '',
                'jurusan' => $profilMahasiswa->jurusan ?? '',
                'IPK' => $profilMahasiswa->IPK ?? '',
                'semester' => $profilMahasiswa->semester ?? '',
            ];

            // Kirim data ke tampilan React menggunakan Inertia
            return response()->json([
                'profilAkademik' => $data,
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Profil mahasiswa tidak ditemukan.'], 404);
        } catch (Exception $e) {
            return response()->json(['error' => 'Terjadi kesalahan saat mengambil data.'], 500);
        }
    }

    public function edit()
    {
        try {
            // Ambil data user yang sedang login dan muat profil mahasiswa terkait
            $user = auth()->user();
            $user = $user ? $user->load('profilMahasiswa') : null;
            $profilMahasiswa = $user ? $user->profilMahasiswa : null;

            $data = $profilMahasiswa ? [
                'universitas' => $profilMahasiswa->universitas,
                'fakultas' => $profilMahasiswa->fakultas,
                'jurusan' => $profilMahasiswa->jurusan,
                'IPK' => $profilMahasiswa->IPK,
                'semester' => $profilMahasiswa->semester,
            ] : null;

            return Inertia::render('EditInformasiAkademik', [
                'profilAkademik' => $data
            ]);
        } catch (ModelNotFoundException $e) {
            return redirect()->route('dashboard')->withErrors(['error' => 'Profil mahasiswa tidak ditemukan.']);
        } catch (Exception $e) {
            return redirect()->route('dashboard')->withErrors(['error' => 'Terjadi kesalahan saat mengambil data.']);
        }
    }

    public function update(Request $request)
    {
        try {
            $request->validate([
                'universitas' => 'required|string|max:255',
                'fakultas' => 'required|string|max:255',
                'jurusan' => 'required|string|max:255',
                'IPK' => 'required|numeric',
                'semester' => 'required|string|max:2',
            ]);

            $user = auth()->user();
            $profilMahasiswa = $user->profilMahasiswa ?? new ProfilMahasiswa(); // Cek jika ada atau buat baru

            // Update data pada model ProfilMahasiswa
            $profilMahasiswa->universitas = $request->universitas;
            $profilMahasiswa->fakultas = $request->fakultas;
            $profilMahasiswa->jurusan = $request->jurusan;
            $profilMahasiswa->IPK = $request->IPK;
            $profilMahasiswa->semester = $request->semester;

            // Simpan profil mahasiswa
            $profilMahasiswa->save();

            return redirect()->route('dashboard')->with('success', 'Informasi akademik berhasil diperbarui.');
        } catch (ValidationException $e) {
            return redirect()->back()->withErrors($e->validator->errors());
        } catch (Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Terjadi kesalahan saat memperbarui data.']);
        }
    }

    public function store(Request $request)
    {
        try {
            // Validasi data inputan
            $validatedData = $request->validate([
                'universitas' => 'required|string|max:255',
                'fakultas' => 'required|string|max:255',
                'jurusan' => 'required|string|max:255',
                'IPK' => 'required|numeric',
                'semester' => 'required|string|max:2',
            ]);

            $user = auth()->user();

            // Buat atau update entri profil mahasiswa
            $profilMahasiswa = ProfilMahasiswa::firstOrNew(['user_id' => $user->id]);

            // Isi data profil mahasiswa dengan validated data
            $profilMahasiswa->universitas = $validatedData['universitas'];
            $profilMahasiswa->fakultas = $validatedData['fakultas'];
            $profilMahasiswa->jurusan = $validatedData['jurusan'];
            $profilMahasiswa->IPK = $validatedData['IPK'];
            $profilMahasiswa->semester = $validatedData['semester'];

            // Simpan data
            $profilMahasiswa->save();

            return redirect()->route('dashboard')->with('success', 'Profil akademik berhasil diatur.');
        } catch (ValidationException $e) {
            return redirect()->back()->withErrors($e->validator->errors());
        } catch (Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Isi terlebih dahulu NIM dan data pribadi anda!']);
        }
    }

    public function destroy($id)
    {
        try {
            $profilMahasiswa = ProfilMahasiswa::findOrFail($id);
            $profilMahasiswa->delete();

            return redirect()->route('dashboard')->with('success', 'Profil akademik berhasil dihapus.');
        } catch (ModelNotFoundException $e) {
            return redirect()->route('dashboard')->withErrors(['error' => 'Profil mahasiswa tidak ditemukan.']);
        } catch (Exception $e) {
            return redirect()->route('dashboard')->withErrors(['error' => 'Terjadi kesalahan saat menghapus data.']);
        }
    }
}
