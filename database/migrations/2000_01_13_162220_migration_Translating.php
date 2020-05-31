<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class MigrationTranslating extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!(Schema::hasTable('translate'))) 
        {
          Schema::create('translate', function (Blueprint $table) {
                $table->increments('iid')->unsigned();
                $table->integer('id')->unsigned();
                $table->integer('lang_id')->unsigned()->default(0);
                $table->string('vocabulary');
                $table->timestamps();
                
            });
        }
      
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
       Schema::dropIfExists('translate');
    }
}
