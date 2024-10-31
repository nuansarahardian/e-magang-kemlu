<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use PDF;

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
        // Generate PDF Surat Penerimaan
        $pdfData = [
            'nama' => $notifiable->name,
            'nim' => $notifiable->profilMahasiswa->NIM ?? 'N/A',
            'universitas' => $notifiable->profilMahasiswa->universitas ?? 'N/A',
            'jurusan' => $notifiable->profilMahasiswa->jurusan ?? 'N/A',
            'fakultas' => $notifiable->profilMahasiswa->fakultas ?? 'N/A',
            'posisi' => $this->posisiMagang->posisiMagang->nama_posisi ?? 'Posisi Tidak Diketahui',
            'batch' => $this->posisiMagang->batch->nama_batch ?? 'Batch Tidak Diketahui',
            'tanggal_mulai' => $this->posisiMagang->batch->tanggal_mulai,
            'tanggal_berakhir' => $this->posisiMagang->batch->tanggal_berakhir,
        ];

        $pdf = PDF::loadView('pdf.surat_penerimaan', $pdfData)->setPaper('a4');

        // Logo URL
   

        return (new MailMessage)
            ->subject('Penerimaan Program Magang di BSKLN Kementerian Luar Negeri')
            ->greeting('Halo, ' . $notifiable->name)
            
            ->line('Selamat! Anda telah diterima untuk mengikuti program magang di Badan Strategi Kebijakan Luar Negeri (BSKLN), Kementerian Luar Negeri RI.')
            ->line('**Detail Magang:**')
            ->line('Nama: ' . $notifiable->name)
            ->line('Universitas: ' . ($notifiable->profilMahasiswa->universitas ?? 'Tidak Diketahui'))
            ->line('Posisi: ' . $this->posisiMagang->posisiMagang->nama_posisi ?? 'Posisi Tidak Diketahui')
            ->line('Periode: ' . $this->posisiMagang->batch->tanggal_mulai . ' - ' . $this->posisiMagang->batch->tanggal_berakhir)
            ->line('Lokasi: Kementerian Luar Negeri, Jakarta')
            ->line('Harap menghubungi nomor admin di bawah ini atau membalas email ini. Informasi lebih lanjut mengenai orientasi dan penugasan akan dikirimkan setelahnya.')
            ->line('Selamat bergabung dengan BSKLN, dan kami nantikan kontribusi terbaik Anda!')
            ->line('')
            ->line('Salam,')
            ->line('BSKLN - Kementerian Luar Negeri RI')
            ->action('Lihat Detail Pendaftaran', url('/login'))
            ->attachData($pdf->output(), 'Surat_Penerimaan.pdf', [
                'mime' => 'application/pdf',
            ]);
    }
}
