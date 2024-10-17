<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Keterampilan extends Model
{
    use HasFactory;

    protected $table = 'keterampilan';
    protected $fillable = [
        'NIM',
        'nama_keterampilan',
        'level',
    ];

    // Relasi ke profil mahasiswa
    public function profilMahasiswa()
    {
        return $this->belongsTo(ProfilMahasiswa::class, 'NIM', 'NIM');
    }
}
