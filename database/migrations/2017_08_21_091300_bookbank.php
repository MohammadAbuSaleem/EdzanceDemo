<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Bookbank extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bookbank', function (Blueprint $table) {
            $table->increments('id');
            $table->string('book_name');
            $table->string('book_image');
            $table->integer('phone_number');
            $table->integer('user_id');
            $table->string('book_description');
            $table->string('type');
            $table->integer('price');
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
        Schema::drop('bookbank');
    }
}
