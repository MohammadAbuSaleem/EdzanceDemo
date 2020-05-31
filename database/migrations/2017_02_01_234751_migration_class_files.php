<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class MigrationClassFiles extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
            //Create table
        Schema::create('class_files', function(Blueprint $table)
        {
            $table->increments('id');
            $table->string('name');
            $table->string('extension',10);
            $table->string('url');
            $table->text('description');
            $table->integer('class_id')->unsigned();
            $table->integer('status');
            // $table->integer('class_id')->unsigned();
            $table->string('viewers');
            $table->integer('views');
            $table->foreign('class_id')->references('id')->on('virtualclass')->onDelete('NO ACTION');
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
        Schema::dropIfExists('class_files');
    }
}
