<?php

namespace App\Http\Controllers;

use App\Models\ProfilMahasiswa;
use Illuminate\Http\Request;
use PDF; // Pastikan alias sudah terdaftar
use Carbon\Carbon;

class CvMahasiswaController extends Controller
{
    public function download($id)
    {
        Carbon::setLocale('id');
        // Ambil data mahasiswa berdasarkan NIM
        $mahasiswa = ProfilMahasiswa::with(['user', 'keterampilan', 'pengalaman'])->findOrFail($id);
// dd($mahasiswa);
        // Load view PDF dengan data mahasiswa
        $pdf = PDF::loadView('pdf.cv_mahasiswa', compact('mahasiswa'));

        // Kembalikan file PDF untuk diunduh
        return $pdf->download('CV_Mahasiswa_' . $mahasiswa->user->name . '.pdf');
    }
}
