<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AbsensiMahasiswa extends Model
{
    use HasFactory;

    protected $fillable = [
        'NIM',
        'tanggal_absensi',
        'status_absensi',
        'bukti_absensi',
    ];

    // Relasi ke profil mahasiswa
    public function profilMahasiswa()
    {
        return $this->belongsTo(ProfilMahasiswa::class, 'NIM', 'NIM');
    }
}
