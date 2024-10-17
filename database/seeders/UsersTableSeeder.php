<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UsersTableSeeder extends Seeder
{
    public function run()
    {
        // Membuat 10 user secara acak menggunakan factory
        User::factory(10)->create();
    }
}
