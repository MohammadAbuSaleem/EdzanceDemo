<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class MigrationClassExams extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
            //Create table
        Schema::create('exams', function(Blueprint $table)
        {
            $table->increments('id');
            $table->enum('type', ['first', 'second','final','quiz','mackup','other']);
            $table->integer('status');
            $table->string('hall');
            $table->timestamp('exam_date');
            $table->timestamps();
            $table->softDeletes();
            $table->integer('views');
            $table->string('viewers');
            $table->integer('virtualclass_id')->unsigned();
            $table->foreign('virtualclass_id')->references('id')->on('virtualclass')->onDelete('NO ACTION');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('exams');
    }
}
