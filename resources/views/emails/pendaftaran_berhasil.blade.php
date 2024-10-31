@component('mail::message')

<!-- Logo di bagian atas email -->
<img src="{{ asset('storage/images/logo-kemlu.png') }}" alt="Logo Kemlu" style="width: 100px; height: auto; display: block; margin: auto;">

# Selamat anda lolos!

Halo, {{ $userName }}

Anda telah diterima pada posisi **{{ $posisiMagang->posisiMagang->nama_posisi ?? 'Posisi Tidak Diketahui' }}**. magang di

**Batch**: {{ $posisiMagang->batch->nama_batch ?? 'Batch Tidak Diketahui' }}  
**Durasi**: {{ $posisiMagang->batch->tanggal_mulai }} hingga {{ $posisiMagang->batch->tanggal_berakhir }}

@component('mail::button', ['url' => url('/login')])
Lihat Detail Pendaftaran
@endcomponent

Terima kasih telah mendaftar!

@endcomponent
