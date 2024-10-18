<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\ProfilMahasiswa;
use App\Models\Pengaturan;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Create roles
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $mahasiswaRole = Role::firstOrCreate(['name' => 'mahasiswa']);

        // Create admin user and assign role
        $adminUser = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin User',
                'password' => Hash::make('password'),
            ]
        );
        $adminUser->syncRoles(['admin']); // Menggunakan nama role

        // Create mahasiswa users and related profil_mahasiswa
        $mahasiswaUsers = [
            [
                'name' => 'Mahasiswa One',
                'email' => 'mahasiswa1@example.com',
                'password' => Hash::make('password'),
                'NIM' => 'H1D021083',
                'tanggal_lahir' => '2002-10-12',
                'jenis_kelamin' => 'Laki-laki',
                'universitas' => 'Universitas Jenderal Soedirman',
                'fakultas' => 'Teknik',
                'jurusan' => 'Informatika',
                'IPK' => 3.5,
                'no_telepon' => '081234567890',
                'semester' => 5,
                'KTM' => 'ktm_1.jpg',
                'pas_foto' => 'foto_1.jpg',
                'surat_permohonan' => 'surat_1.pdf',
                'transkrip_nilai' => 'transkrip_1.pdf',
                'status_data' => 'data_belum_lengkap',
            ],
            [
                'name' => 'Mahasiswa Two',
                'email' => 'mahasiswa2@example.com',
                'password' => Hash::make('password'),
                'NIM' => 'H1D021084',
                'tanggal_lahir' => '2001-07-15',
                'jenis_kelamin' => 'Perempuan',
                'universitas' => 'Universitas Jenderal Soedirman',
                'fakultas' => 'Ekonomi',
                'jurusan' => 'Manajemen',
                'IPK' => 3.8,
                'no_telepon' => '081234567891',
                'semester' => 6,
                'KTM' => 'ktm_2.jpg',
                'pas_foto' => 'foto_2.jpg',
                'surat_permohonan' => 'surat_2.pdf',
                'transkrip_nilai' => 'transkrip_2.pdf',
                'status_data' => 'data_belum_lengkap',
            ],
        ];

        foreach ($mahasiswaUsers as $userData) {
            // Menggunakan firstOrCreate untuk menghindari duplikasi email
            $user = User::firstOrCreate(
                ['email' => $userData['email']],
                [
                    'name' => $userData['name'],
                    'password' => $userData['password'],
                ]
            );
            $user->syncRoles(['mahasiswa']); // Menggunakan nama role

            // Create profil mahasiswa
            ProfilMahasiswa::create([
                'NIM' => $userData['NIM'],
                'user_id' => $user->id,
                'tanggal_lahir' => $userData['tanggal_lahir'],
                'jenis_kelamin' => $userData['jenis_kelamin'],
                'universitas' => $userData['universitas'],
                'fakultas' => $userData['fakultas'],
                'jurusan' => $userData['jurusan'],
                'IPK' => $userData['IPK'],
                'no_telepon' => $userData['no_telepon'],
                'semester' => $userData['semester'],
                'KTM' => $userData['KTM'],
                'pas_foto' => $userData['pas_foto'],
                'surat_permohonan' => $userData['surat_permohonan'],
                'transkrip_nilai' => $userData['transkrip_nilai'],
                'status_data' => $userData['status_data'],
            ]);
        }
    }
}

