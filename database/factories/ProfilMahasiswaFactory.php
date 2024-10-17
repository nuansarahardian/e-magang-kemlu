<?php
namespace Database\Factories;

use App\Models\ProfilMahasiswa;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProfilMahasiswaFactory extends Factory
{
    protected $model = ProfilMahasiswa::class;

    public function definition()
    {
        return [
            'NIM' => $this->faker->unique()->numerify('NIM####'), // Menghasilkan NIM acak dengan format NIM####
            'user_id' => User::factory(), // Menghubungkan dengan factory User
            'tanggal_lahir' => $this->faker->date(),
            'jenis_kelamin' => $this->faker->randomElement(['Laki-laki', 'Perempuan']), // Laki-laki atau Perempuan
            'universitas' => $this->faker->company, // Menggunakan nama perusahaan sebagai universitas
            'fakultas' => $this->faker->word,
            'jurusan' => $this->faker->word,
            'IPK' => $this->faker->randomFloat(2, 2.5, 4), // IPK antara 2.5 sampai 4
            'no_telepon' => $this->faker->phoneNumber,
            'semester' => $this->faker->numberBetween(1, 8), // Semester 1-8
            'KTM' => $this->faker->imageUrl(), // URL dummy untuk KTM
            'pas_foto' => $this->faker->imageUrl(), // URL dummy untuk pas foto
            'surat_permohonan' => $this->faker->imageUrl(), // URL dummy untuk surat permohonan
            'transkrip_nilai' => $this->faker->imageUrl(), // URL dummy untuk transkrip nilai
            'status_data' => $this->faker->randomElement(['data_belum_lengkap', 'data_lengkap']),
        ];
    }
}
