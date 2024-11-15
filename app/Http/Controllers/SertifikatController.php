<?php

namespace App\Http\Controllers;

use App\Models\ProfilMahasiswa;
use App\Models\PendaftaranMagang;
use Illuminate\Http\Request;
use PDF; // Ensure PDF alias is configured in config/app.php
use Carbon\Carbon;

class SertifikatController extends Controller
{
    public function download($id)
    {
        Carbon::setLocale('id');

        // Retrieve the student profile and associated data using the provided ID
        $mahasiswa = ProfilMahasiswa::with([
                'user',
                'keterampilan',
                'pengalaman',
                'pendaftaranMagang.posisiMagangPerBatch.posisiMagang',
                'pendaftaranMagang.posisiMagangPerBatch.batch',
            ])
            ->findOrFail($id);

        // Assuming the latest registration record is needed for the certificate
        $pendaftaran = $mahasiswa->pendaftaranMagang->last();

        // Prepare the data structure for the certificate view
        $certificateData = [
            'nomor_registrasi' => $pendaftaran->unique_id ?? 'Tidak tersedia',
            'id' => $pendaftaran->id ?? 'Tidak tersedia',
            'posisi' => $pendaftaran->posisiMagangPerBatch->posisiMagang->nama_posisi ?? 'Tidak tersedia',
            'batch' => $pendaftaran->posisiMagangPerBatch->batch->nama_batch ?? 'Tidak tersedia',
            'status' => $pendaftaran->status,
            'tanggal_pendaftaran' => Carbon::parse($pendaftaran->tanggal_pendaftaran)->translatedFormat('d M Y'),
            'gambar' => $pendaftaran->posisiMagangPerBatch->posisiMagang->gambar 
                        ? asset('storage/' . $pendaftaran->posisiMagangPerBatch->posisiMagang->gambar) 
                        : asset('images/default.jpg'),
            'pas_foto' => $mahasiswa->pas_foto 
                        ? storage_path('app/public/'  . $mahasiswa->pas_foto) 
                        
                        : asset('images/default.jpg'),
                       
            'nama' => $mahasiswa->user->name ?? 'Tidak tersedia',
            'nim' => $mahasiswa->NIM ?? 'Tidak tersedia',
            'jurusan' => $mahasiswa->jurusan ?? 'Tidak tersedia',
            'fakultas' => $mahasiswa->fakultas ?? 'Tidak tersedia',
            'universitas' => $mahasiswa->universitas ?? 'Tidak tersedia',
            'posisi_magang' => $pendaftaran->posisiMagangPerBatch->posisiMagang->nama_posisi ?? 'Tidak tersedia',
            'tanggal_mulai' => Carbon::parse($pendaftaran->posisiMagangPerBatch->batch->tanggal_mulai)->translatedFormat('d F Y') ?? 'Tidak tersedia',
            'tanggal_berakhir' => Carbon::parse($pendaftaran->posisiMagangPerBatch->batch->tanggal_berakhir)->translatedFormat('d F Y') ?? 'Tidak tersedia',
        ];

        // Generate the PDF view for the certificate with the data
        $pdf = PDF::loadView('pdf.sertifikat_mahasiswa', ['certificateData' => $certificateData]);

        // Return the PDF for download
        return $pdf->download('Sertifikat_Mahasiswa_' . $certificateData['nama'] . '.pdf');
    }
}
