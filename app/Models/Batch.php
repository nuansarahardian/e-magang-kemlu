<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Batch extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama_batch',
        'tanggal_mulai',
        'tanggal_berakhir',
        'is_open',
        'is_active',
    ];

    // Relasi ke posisi magang per batch
    public function posisiMagangPerBatch()
    {
        return $this->hasMany(PosisiMagangPerBatch::class, 'batch_id');
    }

    // Relasi ke pendaftaran magang
    public function pendaftaranMagang()
    {
        return $this->hasMany(PendaftaranMagang::class, 'batch_id');
    }
}
