<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class MigrationStudentInfo extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
            //Create table
        Schema::create('student_info', function(Blueprint $table)
        {
            $table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->string('country');
            $table->string('university_id',20);
            $table->date('university_start');
            $table->date('university_end');
            $table->string('school');
            $table->string('school_town');
            $table->date('school_end');
            $table->text('specialition_desc');
            $table->text('skills');
            $table->text('concerns');
            $table->text('hobbies');
            $table->text('languages');
            $table->integer('status');
            $table->timestamps();
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
        Schema::dropIfExists('student_info');
    }
}
