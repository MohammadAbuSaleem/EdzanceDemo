<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class InstructorEducation extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('instructor_educations', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned()->index();
            $table->enum('grade', ['bachelors','master','doctorate','assistant-professor','co-professor','professor']);
            $table->string('specialization',30);
            $table->string('university_name',50);
            $table->integer('country_id')->unsigned()->index();
            $table->string('start_year',4);
            $table->string('end_year',4);
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
        Schema::drop('instructor_educations');
    }
}
