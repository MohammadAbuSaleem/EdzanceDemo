<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class MigrationMessages extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
           
            //Create table
        Schema::create('messages', function(Blueprint $table)
        {
            $table->increments('id');
            $table->timestamps();
            $table->integer('sender_id')->unsigned();
            $table->integer('reciever_id')->unsigned();
            $table->string('title');
            $table->text('body');
            $table->integer('seen');
            $table->foreign('sender_id')->references('id')->on('users')->onDelete('NO ACTION');
            $table->foreign('reciever_id')->references('id')->on('users')->onDelete('NO ACTION');
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
        Schema::dropIfExists('messages');
    }
}
