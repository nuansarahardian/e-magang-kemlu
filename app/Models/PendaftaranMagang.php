<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PendaftaranMagang extends Model
{
    use HasFactory;
    protected $table = 'pendaftaran_magang';
    protected $fillable = [
        'NIM',
        'posisi_magang_id',
        'batch_id',
        'status',
        'is_auto_accept',
        'tanggal_pendaftaran',
    ];

    // Relasi ke profil mahasiswa
    public function profilMahasiswa()
    {
        return $this->belongsTo(ProfilMahasiswa::class, 'NIM', 'NIM');
    }

    // Relasi ke posisi magang
    public function posisiMagang()
    {
        return $this->belongsTo(PosisiMagang::class, 'posisi_magang_id');
    }

    // Relasi ke batch
    public function batch()
    {
        return $this->belongsTo(Batch::class, 'batch_id');
    }
}
