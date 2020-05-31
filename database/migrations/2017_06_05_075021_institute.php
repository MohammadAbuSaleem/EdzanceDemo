<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Institute extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::create('institutes', function (Blueprint $table) {
            $table->increments('id');
            $table->string('mthr_name');    
            $table->integer('category_id')->unsigned();   
            $table->integer('is_main')->unsigned()->nullable();   
            $table->string('eng_name');    
            $table->integer('owner')->unsigned()->nullable();
            $table->enum('status',['enabled', 'disabled']);
            $table->string('avatar');    
            $table->integer('countrey_id')->unsigned()->default(14);
            $table->enum('study_program',['governate', 'foriegn','international','global','internal']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('ins__institutes');
    }
}
