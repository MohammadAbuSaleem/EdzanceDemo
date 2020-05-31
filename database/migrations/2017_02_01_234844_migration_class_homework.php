<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class MigrationClassHomework extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
            //Create table
        Schema::create('homework', function(Blueprint $table)
        {
            $table->increments('id');
            $table->string('title');
            $table->integer('virtualclass_id')->unsigned();
            $table->integer('status');
            $table->string('mark');
            $table->text('body');
            $table->enum('type', ['research', 'report','project','homework','presentation']);
            $table->string('file');
            $table->integer('views');
            $table->text('viewers');
            $table->timestamps();
            $table->softDeletes();
            $table->timestamp('handover');
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
        Schema::dropIfExists('homework');
    }
}
