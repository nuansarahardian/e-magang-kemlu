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
            $table->date('tanggal_lahir')->nullable();
            $table->enum('jenis_kelamin', ['Laki-laki', 'Perempuan'])->nullable();
            $table->string('universitas', 75)->nullable(); // Jadikan nullable
            $table->string('fakultas', 75)->nullable(); // Jadikan nullable
            $table->string('jurusan', 50)->nullable(); // Jadikan nullable
            $table->string('alamat_KTP', 255)->nullable(); // Jadikan nullable
            $table->string('alamat_domisili', 255)->nullable(); // Jadikan nullable
            $table->string('IPK', 5)->nullable(); // Jadikan nullable
            $table->string('no_telepon', 20)->nullable(); // Jadikan nullable
            $table->string('semester', 2)->nullable(); // Jadikan nullable
            $table->string('KTM', 255)->nullable(); // Jadikan nullable
            $table->string('pas_foto', 255)->nullable(); // Jadikan nullable
            $table->string('kontak_darurat', 25)->nullable(); // Jadikan nullable
            $table->string('no_asuransi', 25)->nullable(); // Jadikan nullable
            $table->string('surat_permohonan', 255)->nullable(); // Jadikan nullable
            $table->string('transkrip_nilai', 255)->nullable(); // Jadikan nullable
            $table->enum('status_data', ['data_belum_lengkap', 'data_lengkap'])->nullable(); // Jadikan nullable
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade')     ->onUpdate('cascade');;
        });
    }

    public function down()
    {
        Schema::dropIfExists('profil_mahasiswa');
    }
};
