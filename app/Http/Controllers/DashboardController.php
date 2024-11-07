<?php

namespace App\Http\Controllers;

use App\Http\Controllers\InformasiPribadiController;
use App\Http\Controllers\InformasiAkademikController;
use App\Http\Controllers\PengalamanKeterampilanController;
use App\Http\Controllers\DokumenController;
use App\Http\Controllers\StatusPendaftaranController;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        // Retrieve data from other controllers
        $profilPribadiController = new InformasiPribadiController();
        $profilPribadiData = $profilPribadiController->show();
        $profilPribadiArray = json_decode($profilPribadiData->getContent(), true);

        $profilAkademikController = new InformasiAkademikController();
        $profilAkademikData = $profilAkademikController->show();
        $profilAkademikArray = json_decode($profilAkademikData->getContent(), true);

        $pengalamanKeterampilanController = new PengalamanKeterampilanController();
        $pengalamanKeterampilanData = $pengalamanKeterampilanController->show();
        $pengalamanKeterampilanArray = json_decode($pengalamanKeterampilanData->getContent(), true);

        $dokumenController = new DokumenController();
        $dokumenData = $dokumenController->showAllDocuments();
        $dokumenArray = json_decode($dokumenData->getContent(), true);

        // Retrieve application history data
        $statusPendaftaranController = new StatusPendaftaranController();
        $historiPendaftaran = $statusPendaftaranController->index();

        // Merge all data
        $data = array_merge(
            $profilPribadiArray['profilMahasiswa'] ?? [],
            $profilAkademikArray['profilAkademik'] ?? [],
            $pengalamanKeterampilanArray['pengalamanKeterampilan'] ?? [],
            $dokumenArray['dokumen'] ?? []
        );

        // Calculate progress
        $progress = $this->calculateProgress($profilPribadiArray, $profilAkademikArray, $dokumenArray);

        // Pass data to the view using Inertia
        return Inertia::render('Dashboard', [
            'profilData' => $data,
            'progress' => $progress,
            'historiPendaftaran' => $historiPendaftaran,
        ]);
    }

    private function calculateProgress($profilPribadiArray, $profilAkademikArray, $dokumenArray)
    {
        $totalParams = 15;
        $filledParams = 0;

        // Check each filled parameter
        $filledParams += !empty($profilPribadiArray['profilMahasiswa']['nama']) ? 1 : 0;
        $filledParams += !empty($profilPribadiArray['profilMahasiswa']['NIM']) ? 1 : 0;
        $filledParams += !empty($profilPribadiArray['profilMahasiswa']['tanggal_lahir']) ? 1 : 0;
        $filledParams += !empty($profilPribadiArray['profilMahasiswa']['jenis_kelamin']) ? 1 : 0;
        $filledParams += !empty($profilPribadiArray['profilMahasiswa']['alamat_KTP']) ? 1 : 0;
        $filledParams += !empty($profilPribadiArray['profilMahasiswa']['no_telepon']) ? 1 : 0;
        $filledParams += !empty($profilPribadiArray['profilMahasiswa']['foto']) ? 1 : 0;
        $filledParams += !empty($profilAkademikArray['profilAkademik']['universitas']) ? 1 : 0;
        $filledParams += !empty($profilAkademikArray['profilAkademik']['fakultas']) ? 1 : 0;
        $filledParams += !empty($profilAkademikArray['profilAkademik']['jurusan']) ? 1 : 0;
        $filledParams += !empty($profilAkademikArray['profilAkademik']['IPK']) ? 1 : 0;
        $filledParams += !empty($profilAkademikArray['profilAkademik']['semester']) ? 1 : 0;
        $filledParams += !empty($dokumenArray['dokumen']['KTM']) ? 1 : 0;
        $filledParams += !empty($dokumenArray['dokumen']['surat_permohonan']) ? 1 : 0;
        $filledParams += !empty($dokumenArray['dokumen']['transkrip_nilai']) ? 1 : 0;

        // Calculate the percentage of progress
        return ($filledParams / $totalParams) * 100;
    }
}
