<?php
namespace App\Http\Controllers;

use App\Models\PendaftaranMagang;
use Illuminate\Http\Request;
use Carbon\Carbon;
use PDF;

class SuratPenerimaanController extends Controller
{
    public function downloadSurat($id)
    {
        $pendaftaran = PendaftaranMagang::with('user.profilMahasiswa', 'posisiMagangPerBatch.posisiMagang', 'posisiMagangPerBatch.batch')
            ->findOrFail($id);

        // if ($pendaftaran->status !== 'diteri) {
        //     return abort(403, 'Surat penerimaan hanya dapat diunduh untuk pendaftar yang diterima.');
        // }

        $tanggalMulai = Carbon::parse($pendaftaran->posisiMagangPerBatch->batch->tanggal_mulai)->translatedFormat('d F Y');
        $tanggalBerakhir = Carbon::parse($pendaftaran->posisiMagangPerBatch->batch->tanggal_berakhir)->translatedFormat('d F Y');

        $data = [
         
            'nama' => $pendaftaran->user->name,
            'nim' => $pendaftaran->user->profilMahasiswa->NIM,
            'nomor_registrasi' => $pendaftaran->unique_id,
            'universitas' => $pendaftaran->user->profilMahasiswa->universitas,
            'jurusan' => $pendaftaran->user->profilMahasiswa->jurusan,
            'fakultas' => $pendaftaran->user->profilMahasiswa->fakultas,
            'posisi' => $pendaftaran->posisiMagangPerBatch->posisiMagang->nama_posisi,
            'batch' => $pendaftaran->posisiMagangPerBatch->batch->nama_batch,
            'tanggal_mulai' => $tanggalMulai,
            'tanggal_berakhir' => $tanggalBerakhir,
            'tanggal_sekarang' => Carbon::now()->translatedFormat('d F Y'),
        ];

        $pdf = PDF::loadView('pdf.surat_penerimaan', $data)->setPaper('a4');
        return $pdf->download("Surat_Penerimaan_{$data['nama']}.pdf");
    }
}
