<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class InstructorFreeHour extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('instructor_free_hours', function (Blueprint $table) {
            $table->increments('id');
            $table->bigInteger('group_id')->unsigned()->index();
            $table->integer('user_id')->unsigned()->index();
            $table->enum('day', ['saturday','sunday','monday','tuesday','wednesday','thursday','friday']);
            $table->timestamp('from_hour');
            $table->timestamp('to_hour');
            $table->timestamps();
            $table->softDeletes();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('NO ACTION'); 
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('instructor_free_hours');
    }
}
