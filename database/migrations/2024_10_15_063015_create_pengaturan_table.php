<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePengaturanTable extends Migration
{
    public function up()
    {
        Schema::create('pengaturan', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->enum('sistem_penerimaan',['Manual', 'Otomatis']);
            
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('pengaturan');
    }
}
