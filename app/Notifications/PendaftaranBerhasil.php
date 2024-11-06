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
        if (!$pendaftaranMagang || $pendaftaranMagang->status !== 'diterima') {
            abort(403, 'Surat penerimaan hanya dapat diunduh untuk pendaftar yang diterima.');
        }

        // Format the dates
        $tanggalMulai = Carbon::parse($pendaftaranMagang->posisiMagangPerBatch->batch->tanggal_mulai)->translatedFormat('d F Y');
        $tanggalBerakhir = Carbon::parse($pendaftaranMagang->posisiMagangPerBatch->batch->tanggal_berakhir)->translatedFormat('d F Y');

        // Prepare PDF data
        $data = [
            'nama' => $notifiable->name,
            'nim' => $notifiable->profilMahasiswa->NIM,
            'unique_id' => $pendaftaranMagang->unique_id,
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
            ->line('Selamat! Anda telah diterima untuk mengikuti program magang di Badan Strategi Kebijakan Luar Negeri (BSKLN), Kementerian Luar Negeri RI.')
            ->line('**Detail Magang:**')
            ->line('Nama: ' . $notifiable->name)
            ->line('Universitas: ' . $notifiable->profilMahasiswa->universitas)
            ->line('Posisi: ' . $this->posisiMagang->posisiMagang->nama_posisi ?? 'Posisi Tidak Diketahui')
            ->line('Periode: ' . $tanggalMulai . ' - ' . $tanggalBerakhir)
            ->line('Lokasi: Kementerian Luar Negeri, Jakarta')
            ->line('Harap menghubungi nomor admin di bawah ini atau membalas email ini untuk informasi lebih lanjut.')
            ->line('Selamat bergabung dengan BSKLN!')
            ->line('')
            ->line('Salam,')
            ->line('BSKLN - Kementerian Luar Negeri RI')
            ->action('Lihat Detail Pendaftaran', url('/login'))
            ->attachData($pdf->output(), 'Surat_Penerimaan.pdf', [
                'mime' => 'application/pdf',
            ]);
    }
}
