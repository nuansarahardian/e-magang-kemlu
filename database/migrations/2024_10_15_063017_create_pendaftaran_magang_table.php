<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePendaftaranMagangTable extends Migration
{
    public function up()
    {
        Schema::create('pendaftaran_magang', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('unique_id')->unique(); // Tambahkan kolom unique_id
            $table->string('NIM', 50);
            $table->unsignedBigInteger('posisi_magang_per_batch_id');
            $table->enum('status', ['mendaftar', 'proses', 'diterima', 'ditolak']);
            $table->dateTime('tanggal_pendaftaran');
            $table->timestamps();

            $table->foreign('NIM')->references('NIM')->on('profil_mahasiswa')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('posisi_magang_per_batch_id')->references('id')->on('posisi_magang_per_batch')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('pendaftaran_magang');
    }
}
