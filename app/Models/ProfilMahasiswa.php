<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProfilMahasiswa extends Model
{
    use HasFactory;

    protected $table = 'profil_mahasiswa';
    protected $primaryKey = 'NIM';
    public $incrementing = false; // NIM bukan auto-increment

    protected $fillable = [
        'NIM',
        'user_id',
        'tanggal_lahir',
        'jenis_kelamin',
        'universitas',
        'fakultas',
        'alamat_KTP',
        'alamat_domisili',
        'jurusan',
        'IPK',
        'no_telepon',
        'semester',
        'KTM',
        'pas_foto',
        'surat_permohonan',
        'transkrip_nilai',
        'status_data',
    ];
    protected $casts = [
        'tanggal_lahir' => 'date',
    ];
    // Relasi ke tabel User
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id'); // Pastikan ini sudah benar
    }

    // Relasi ke pendaftaran magang
    public function pendaftaranMagang()
    {
        return $this->hasMany(PendaftaranMagang::class, 'NIM');
    }

    // Relasi ke absensi mahasiswa
    public function absensiMahasiswa()
    {
        return $this->hasMany(AbsensiMahasiswa::class, 'NIM');
    }

    // Relasi ke keterampilan
    public function keterampilan()
    {
        return $this->hasMany(Keterampilan::class, 'NIM');
    }

    // Relasi ke pengalaman
    public function pengalaman()
    {
        return $this->hasMany(Pengalaman::class, 'NIM');
    }
}
