<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('posisi_magang_per_batch', function (Blueprint $table) {
            $table->unique(['batch_id', 'posisi_magang_id']);
        });
    }
    
    public function down()
    {
        Schema::table('posisi_magang_per_batch', function (Blueprint $table) {
            $table->dropUnique(['batch_id', 'posisi_magang_id']);
        });
    }
    
};
