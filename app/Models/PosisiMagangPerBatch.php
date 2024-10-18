<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Filament\Notifications\Notification;


class PosisiMagangPerBatch extends Model
{
    use HasFactory;
    protected $table = 'posisi_magang_per_batch';
    protected $primaryKey = 'id';
    protected $fillable = [
        'batch_id',
        'posisi_magang_id',
        'pengaturan_id',
        'kuota',
        'jumlah_pendaftar',
        'is_full',
        'sistem_penerimaan',
    ];

    // Metode boot untuk menambahkan logika validasi sebelum menyimpan data
    protected static function boot()
    {
        parent::boot();
    
        
        static::saving(function ($model) {
            $pengaturanGlobal = Pengaturan::first(); // Ambil pengaturan global

            if ($pengaturanGlobal->sistem_penerimaan === 'Otomatis') {
                $model->sistem_penerimaan = 'Otomatis'; // Pastikan sistem_penerimaan otomatis
            }
            // Cek apakah operasi adalah update (jika model sudah memiliki ID)
            if ($model->exists) {
                // Jika update, pastikan batch_id dan posisi_magang_id tidak bentrok dengan entri lain
                $exists = PosisiMagangPerBatch::where('batch_id', $model->batch_id)
                                              ->where('posisi_magang_id', $model->posisi_magang_id)
                                              ->where('id', '!=', $model->id) // Abaikan record yang sedang diupdate
                                              ->exists();
            } else {
                // Jika insert, lakukan pengecekan normal
                $exists = PosisiMagangPerBatch::where('batch_id', $model->batch_id)
                                              ->where('posisi_magang_id', $model->posisi_magang_id)
                                              ->exists();
            }
    
            if ($exists) {
                // Tampilkan notifikasi dengan Filament
                Notification::make()
                    ->title('Error')
                    ->danger()
                    ->body('Kombinasi Batch dan Posisi Magang sudah ada.')
                    ->send();

                // Hentikan penyimpanan tanpa error page
                abort(403, 'Kombinasi Batch dan Posisi Magang sudah ada.');
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
    public function pengaturan()
    {
        return $this->belongsTo(Pengaturan::class, 'pengaturan_id');
    }
}
