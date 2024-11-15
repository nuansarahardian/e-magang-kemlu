<?php
namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use PDF;
use Carbon\Carbon;

class PendaftaranBerhasil extends Notification
{
    use Queueable;

    protected $posisiMagang;

    /**
     * Buat instance notifikasi baru.
     *
     * @param $posisiMagang
     */
    public function __construct($posisiMagang)
    {
        $this->posisiMagang = $posisiMagang;
    }

    /**
     * Tentukan saluran pengiriman notifikasi.
     *
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Buat pesan email yang akan dikirim.
     *
     * @param mixed $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        // Access the first PendaftaranMagang related to ProfilMahasiswa
        $pendaftaranMagang = $notifiable->profilMahasiswa->pendaftaranMagang->first();

        // Ensure the pendaftaranMagang exists and is accepted
        if (!$pendaftaranMagang ) {
            abort(403, 'Surat penerimaan hanya dapat diunduh untuk pendaftar yang diterima.');
        }

        // Format the dates
        $tanggalMulai = Carbon::parse($pendaftaranMagang->posisiMagangPerBatch->batch->tanggal_mulai)->translatedFormat('d F Y');
        $tanggalBerakhir = Carbon::parse($pendaftaranMagang->posisiMagangPerBatch->batch->tanggal_berakhir)->translatedFormat('d F Y');

        // Prepare PDF data
        $data = [
            'nama' => $notifiable->name,
            'nim' => $notifiable->profilMahasiswa->NIM,
            'nomor_registrasi' => $pendaftaranMagang->unique_id,
            'universitas' => $notifiable->profilMahasiswa->universitas,
            'jurusan' => $notifiable->profilMahasiswa->jurusan,
            'fakultas' => $notifiable->profilMahasiswa->fakultas,
            'posisi' => $this->posisiMagang->posisiMagang->nama_posisi ?? 'Posisi Tidak Diketahui',
            'batch' => $this->posisiMagang->batch->nama_batch ?? 'Batch Tidak Diketahui',
            'tanggal_mulai' => $tanggalMulai,
            'tanggal_berakhir' => $tanggalBerakhir,
            'tanggal_sekarang' => Carbon::now()->translatedFormat('d F Y'),
        ];

        // Generate PDF
        $pdf = PDF::loadView('pdf.surat_penerimaan', $data)->setPaper('a4');

        // Send email with attached PDF
        return (new MailMessage)
            ->subject('Penerimaan Program Magang di BSKLN Kementerian Luar Negeri')
            ->greeting('Halo, ' . $notifiable->name)
            ->line('Terima kasih Anda telah mendaftar pada program magang di Badan Strategi Kebijakan Luar Negeri (BSKLN), Kementerian Luar Negeri. ')
            ->line('Selamat Anda telah diterima sebagai peserta magang di BSKLN, Kementerian Luar Negeri RI. ')
            ->line('**Dengan rincian data sebagai berikut:**')
            ->line('No. Registrasi: ' . $pendaftaranMagang->unique_id)
            ->line('Nama: ' . $notifiable->name)
            ->line('NIM: ' . $notifiable->profilMahasiswa->NIM)

            ->line('Universitas: ' . $notifiable->profilMahasiswa->universitas)
            ->line('Fakultas: ' . $notifiable->profilMahasiswa->fakultas)

            ->line('**Penempatan Magang:** ' . $this->posisiMagang->posisiMagang->nama_posisi ?? 'Posisi Tidak Diketahui')
            ->line('Periode: ' . $tanggalMulai . ' - ' . $tanggalBerakhir)
            ->line('Alamat Magang: BSKLN, Kementerian Luar Negeri, Gedung Roeslan Abdul Gani (RAG), Jalan Taman Pejambon No.6 Jakarta Pusat')
            ->line('**Catatan:**')
            ->line('Entry magang akan dilaksanakan pada' .  $tanggalMulai . ' secara daring.')
          
            ->line('Kegiatan magang dilaksanakan dengan kehadiran fisik di BSKLN.
            Peserta diharapkan hadir di BSKLN satu hari setelah tanggal'.  $tanggalMulai . ' pada pukul 08.00 WIB (lobi Gedung RAG)')
            ->line('Untuk konfirmasi lebih lanjut dapat menghubungi email: sekretariat.bppk@kemlu.go.id atau hotline +62 852-8375-1123')

       
            ->action('Lihat Detail Pendaftaran', url('/login'))
            ->attachData($pdf->output(), 'Surat_Penerimaan.pdf', [
                'mime' => 'application/pdf',
            ]);
    }
}
