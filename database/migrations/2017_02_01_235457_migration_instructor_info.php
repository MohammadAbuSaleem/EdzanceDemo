<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class MigrationInstructorInfo extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
            //Create table
        Schema::create('instructor_info', function(Blueprint $table)
        {
            $table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->string('cv');
            $table->enum('status',['confirmed','declined','waiting','onAction']);
            $table->timestamp('avilablefrom');
            $table->timestamp('avilableto');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('NO ACTION');
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
        Schema::dropIfExists('instructor_info');
    }
}
