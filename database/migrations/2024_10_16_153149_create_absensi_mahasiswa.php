<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('absensi_mahasiswa', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('NIM', 50);
            $table->date('tanggal_absensi');
            $table->enum('status_absensi', ['hadir', 'izin', 'tidak_hadir']);
            $table->string('bukti_absensi')->nullable();
            $table->timestamps();

            $table->foreign('NIM')->references('NIM')->on('profil_mahasiswa')->onDelete('cascade')     ->onUpdate('cascade');;
        });
    }

    public function down()
    {
        Schema::dropIfExists('absensi_mahasiswa');
    }
};
