<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class MigrationNotification extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //Create table
        Schema::create('notification', function (Blueprint $table) {
            $table->increments('id');
            $table->boolean('seen');
            $table->timestamps();
            $table->integer('sender_id')->unsigned();
            $table->integer('reciever_id')->unsigned();
            $table->string('body');
            $table->foreign('reciever_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {

        Schema::dropIfExists('notification');
    }
}
