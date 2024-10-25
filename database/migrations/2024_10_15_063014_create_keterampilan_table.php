<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateKeterampilanTable extends Migration
{
    public function up()
    {
        Schema::create('keterampilan', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('NIM', 50);
            $table->string('nama_keterampilan');
            $table->enum('level', ['pemula', 'menengah', 'mahir']);
            $table->timestamps();

            $table->foreign('NIM')->references('NIM')->on('profil_mahasiswa')->onDelete('cascade')     ->onUpdate('cascade');;
        });
    }

    public function down()
    {
        Schema::dropIfExists('keterampilan');
    }
}
