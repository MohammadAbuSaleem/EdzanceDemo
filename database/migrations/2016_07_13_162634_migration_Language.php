<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class MigrationLanguage extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!(Schema::hasTable('language'))) 
        {
             Schema::create('language', function (Blueprint $table) {
                $table->increments('id');
                $table->string('name');
                $table->string('shortname');
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
        Schema::dropIfExists('language');
    }
}
