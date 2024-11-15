<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class DaftarBerhasil extends Notification
{
    use Queueable;

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
            ->subject('Pendaftaran Program Magang BSKLN Kementerian Luar Negeri Berhasil.')
            ->greeting('Halo, ' . $notifiable->name)
            ->line('Terima kasih Anda telah mendaftar pada program magang di Badan Strategi Kebijakan Luar Negeri (BSKLN), Kementerian Luar Negeri RI.')
            ->line('Pendaftaran Anda telah berhasil kami terima. Kami akan segera meninjau aplikasi Anda.')
            ->line('Untuk melihat status dan detail pendaftaran, silakan login ke akun Anda.')
            ->action('Lihat Detail Pendaftaran', url('/login'))
            ->line('Terima kasih atas minat Anda dalam program ini. Kami nantikan kehadiran Anda!');
    }
}
