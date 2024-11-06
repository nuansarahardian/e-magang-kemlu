<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePosisiMagangTable extends Migration
{
    public function up()
    {
        Schema::create('posisi_magang', function (Blueprint $table) {
            $table->string('kode_posisi')->unique(); // Kode posisi unik dan opsional
            $table->bigIncrements('id');
            $table->string('nama_posisi');
            $table->text('deskripsi');
            $table->string('gambar')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('posisi_magang');
    }
}
