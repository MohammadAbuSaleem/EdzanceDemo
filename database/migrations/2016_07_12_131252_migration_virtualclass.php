<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class MigrationVirtualclass extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //Create table
        Schema::create('virtualclass', function (Blueprint $table) {
            $table->increments('id')->unsigned();
            $table->string('name');
            $table->string('class_code');
            $table->timestamps();
            $table->integer('instructor')->unsigned();
            $table->text('Description');
            $table->timestamp('from');
            $table->timestamp('to');
            $table->enum('days', ['الاحد', 'الاثنين', 'الثلاثاء', 'الاربعاء', 'الخميس', 'السبت']);
            $table->string('viewers');
            $table->integer('views');
            $table->enum('season', ['first', 'second', 'summer']);
            $table->enum('Hours', [1, 2, 3, 4, 5, 6]);
            $table->enum('Privacy', ['private', 'public', 'custom']);
            $table->enum('Permission', ['Yes', 'No']);
            $table->text('Books');
            $table->text('syllabus');
            $table->string('class_number');
            $table->string('class_hall');
            $table->softDeletes();
            $table->integer('specialization_id')->unsigned();
            $table->foreign('instructor')->references('id')->on('users')->onDelete('no action');
            $table->foreign('specialization_id')->references('id')->on('specialition')->onDelete('no action');
        });
        DB::statement("ALTER TABLE `virtualclass` CHANGE `days` `days` SET('الاحد','الاثنين','الثلاثاء','الاربعاء','الخميس','السبت');");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('virtualclass');
    }
}
