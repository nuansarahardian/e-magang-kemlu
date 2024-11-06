<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PosisiMagang extends Model
{
    use HasFactory;
    protected $table = 'posisi_magang';
    protected $fillable = [
        'nama_posisi',
        'kode_posisi',
        'deskripsi',
        'gambar',
    ];

    // Relasi ke posisi magang per batch
    public function posisiMagangPerBatch()
    {
        return $this->hasMany(PosisiMagangPerBatch::class, 'posisi_magang_id');
    }
}
