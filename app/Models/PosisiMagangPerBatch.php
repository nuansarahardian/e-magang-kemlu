<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PosisiMagangPerBatch extends Model
{
    use HasFactory;
    protected $table = 'posisi_magang_per_batch';
    protected $fillable = [
        'batch_id',
        'posisi_magang_id',
        'kuota',
        'jumlah_pendaftar',
        'is_full',
    ];

    // Metode boot untuk menambahkan logika validasi sebelum menyimpan data
    protected static function boot()
    {
        parent::boot();

        static::saving(function ($model) {
            // Validasi kombinasi batch_id dan posisi_magang_id
            $exists = PosisiMagangPerBatch::where('batch_id', $model->batch_id)
                                          ->where('posisi_magang_id', $model->posisi_magang_id)
                                          ->exists();

            if ($exists) {
                throw new \Exception('Kombinasi Batch dan Posisi Magang sudah ada.');
            }
        });
    }

    // Relasi ke tabel Batch
    public function batch()
    {
        return $this->belongsTo(Batch::class, 'batch_id');
    }

    // Relasi ke tabel PosisiMagang
    public function posisiMagang()
    {
        return $this->belongsTo(PosisiMagang::class, 'posisi_magang_id');
    }
}
