<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class MigrationClassusers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
            //Create table
        Schema::create('classusers', function(Blueprint $table)
        {
            $table->increments('id');
            $table->timestamps();
            $table->integer('uid')->unsigned();
            $table->integer('class_id')->unsigned();
            $table->foreign('uid')->references('id')->on('users')->onDelete('NO ACTION');
            $table->foreign('class_id')->references('id')->on('virtualclass')->onDelete('NO ACTION');
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
        Schema::dropIfExists('classusers');
    }
}
