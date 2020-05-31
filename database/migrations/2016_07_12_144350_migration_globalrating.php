<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class MigrationGlobalrating extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //Create table
        Schema::create('globalrating', function( $table)
        {
            $table->increments('id');
            $table->integer('university_id')->unsigned();
            $table->integer('global_rating');
            $table->integer('international_rating');
            $table->integer('area_rating');
            $table->timestamps();
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
        Schema::dropIfExists('globalrating');
    }
}
