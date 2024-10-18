<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ProfilMahasiswa;

class ProfilMahasiswaTableSeeder extends Seeder
{
    public function run()
    {
        // Membuat 10 profil mahasiswa dengan relasi ke user
        ProfilMahasiswa::factory(10)->create();
    }
}
