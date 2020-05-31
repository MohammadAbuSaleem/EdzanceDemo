<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class MigrationCountry extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        
            //Create table
        Schema::create('country', function(Blueprint $table)
        {
            $table->increments('id')->unsigned();
            $table->string('country_arabic')->nullable();
            $table->string('country_english')->nullable();
            $table->string('iso2',2)->nullable();
            $table->string('iso3',3)->nullable();
            $table->integer('country_code')->nullable();
            $table->softDeletes();
                        
        });
    }
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('country');//
    }
}
