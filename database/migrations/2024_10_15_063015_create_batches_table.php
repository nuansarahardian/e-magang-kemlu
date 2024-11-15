<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBatchesTable extends Migration
{
    public function up()
    {
        Schema::create('batches', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nama_batch');
            $table->datetime('tanggal_pendaftaran');
            $table->datetime('tanggal_mulai');
            $table->datetime('tanggal_berakhir');
            $table->boolean('is_open')->default(true);
            $table->boolean('is_active')->default(false);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('batches');
    }
};
