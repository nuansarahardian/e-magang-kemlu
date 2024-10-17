<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePengalamanTable extends Migration
{
    public function up()
    {
        Schema::create('pengalaman', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('NIM', 50);
            $table->string('posisi');
            $table->text('deskripsi');
            $table->dateTime('tanggal_mulai');
            $table->dateTime('tanggal_berakhir');
            $table->string('instansi');
            $table->timestamps();

            $table->foreign('NIM')->references('NIM')->on('profil_mahasiswa')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('pengalaman');
    }
}
