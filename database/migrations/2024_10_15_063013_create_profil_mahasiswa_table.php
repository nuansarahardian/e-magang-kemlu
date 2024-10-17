<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('profil_mahasiswa', function (Blueprint $table) {
            $table->string('NIM', 50)->primary();
            $table->unsignedBigInteger('user_id');
            $table->date('tanggal_lahir');
            $table->enum('jenis_kelamin', ['Laki-laki', 'Perempuan']);
            $table->string('universitas', 75);
            $table->string('fakultas', 75);
            $table->string('jurusan', 50);
            $table->string('IPK', 5);
            $table->string('no_telepon', 20);
            $table->string('semester', 2);
            $table->string('KTM', 255);
            $table->string('pas_foto', 255);
            $table->string('surat_permohonan', 255);
            $table->string('transkrip_nilai', 255);
            $table->enum('status_data', ['data_belum_lengkap', 'data_lengkap']);
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('profil_mahasiswa');
    }
};