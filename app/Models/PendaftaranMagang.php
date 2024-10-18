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
        'posisi_magang_per_batch_id',

        'status',
 
        'tanggal_pendaftaran',
    ];

    // Relasi ke profil mahasiswa
    public function profilMahasiswa()
    {
        return $this->belongsTo(ProfilMahasiswa::class, 'NIM', 'NIM');
    }

    // Relasi ke posisi magang
    public function posisiMagangPerBatch()
    {
        return $this->belongsTo(PosisiMagangPerBatch::class, 'posisi_magang_per_batch_id');
    }

 
}
