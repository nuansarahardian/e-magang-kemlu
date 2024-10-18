<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePosisiMagangPerBatchTable extends Migration
{
    public function up()
    {
        Schema::create('posisi_magang_per_batch', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('batch_id');
            $table->unsignedBigInteger('posisi_magang_id');
            $table->unsignedBigInteger('pengaturan_id');
            $table->integer('kuota');
            $table->integer('jumlah_pendaftar')->default(0);
            $table->boolean('is_full')->default(false);
            $table->enum('sistem_penerimaan',['Manual', 'Otomatis']);
            $table->timestamps();

            $table->foreign('batch_id')->references('id')->on('batches')->onDelete('cascade');
            $table->foreign('posisi_magang_id')->references('id')->on('posisi_magang')->onDelete('cascade');
            $table->foreign('pengaturan_id')->references('id')->on('pengaturan')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('posisi_magang_per_batch');
    }
}
