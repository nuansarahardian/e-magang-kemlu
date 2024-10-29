<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

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
        return (new MailMessage)
            ->subject('Pendaftaran Berhasil')
            ->greeting('Halo, ' . $notifiable->name)
            ->line('Anda telah berhasil mendaftar pada posisi magang: ' . $this->posisiMagang->posisiMagang->nama_posisi ?? 'Posisi Tidak Diketahui')
            ->line('Batch: ' . $this->posisiMagang->batch->nama_batch ?? 'Batch Tidak Diketahui')
            ->line('Durasi: ' . $this->posisiMagang->batch->tanggal_mulai . ' hingga ' . $this->posisiMagang->batch->tanggal_berakhir)
            ->action('Lihat Detail Pendaftaran', url('/posisi-magang'))
            ->line('Terima kasih telah mendaftar!');
    }
    
}
