<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PendaftaranMagang extends Model
{
    use HasFactory;

    protected $table = 'pendaftaran_magang';
    protected $fillable = [
        'unique_id',
        'NIM',
        'posisi_magang_per_batch_id',
        'status',
        'tanggal_pendaftaran',
    ];

    // Relasi ke profil mahasiswa
    public function user()
    {
        return $this->hasOneThrough(User::class, ProfilMahasiswa::class, 'NIM', 'id', 'NIM', 'user_id');
    }

    // Relasi ke posisi magang
    public function posisiMagangPerBatch()
    {
        return $this->belongsTo(PosisiMagangPerBatch::class, 'posisi_magang_per_batch_id');
    }

    protected static function boot()
    {
        parent::boot();

        // Listener untuk mengurangi jumlah pendaftar ketika data pendaftaran dihapus
        static::deleting(function ($pendaftaran) {
            $posisiMagangPerBatch = $pendaftaran->posisiMagangPerBatch;

            // Cek apakah posisi magang masih memiliki jumlah pendaftar yang bisa dikurangi
            if ($posisiMagangPerBatch && $posisiMagangPerBatch->jumlah_pendaftar > 0) {
                $posisiMagangPerBatch->decrement('jumlah_pendaftar');
                
                // Set `is_full` menjadi false jika jumlah pendaftar berkurang di bawah kuota
                if ($posisiMagangPerBatch->jumlah_pendaftar < $posisiMagangPerBatch->kuota) {
                    $posisiMagangPerBatch->is_full = false;
                    $posisiMagangPerBatch->save();
                }
            }
        });
    }
}
