<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pengalaman extends Model
{
    use HasFactory;
    protected $table = 'pengalaman';
    protected $fillable = [
        'NIM',
        'posisi',
        'deskripsi',
        'tanggal_mulai',
        'tanggal_berakhir',
        'instansi',
    ];

    // Relasi ke profil mahasiswa
    public function profilMahasiswa()
    {
        return $this->belongsTo(ProfilMahasiswa::class, 'NIM', 'NIM');
    }
}
