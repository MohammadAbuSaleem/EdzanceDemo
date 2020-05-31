<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class InstituteVariables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('variables', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');    
            $table->string('title');    
            $table->string('value'); 
            $table->enum('status', ['enabled', 'disabled']);
            $table->enum('type', ['text', 'upload','date','video','map','image','url','time']);
            $table->integer('var_type')->unsigned()->nullable();
            $table->integer('institute_id')->unsigned()->nullable();
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
        Schema::drop('ins__variables');
    }
}
