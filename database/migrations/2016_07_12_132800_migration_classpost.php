<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class MigrationClasspost extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        //Create table
        Schema::create('classpost', function (Blueprint $table) {
            $table->increments('id')->unsigned();
            $table->string('title');
            $table->timestamps();
            $table->integer('users_id')->unsigned();
            $table->integer('class_id')->unsigned();
            $table->integer('status');
            $table->string('tag')->nullable();
            $table->text('body');
            $table->string('media');
            $table->string('mediadesc');
            $table->string('mediatitle');
            $table->string('mediaimage');
            $table->enum('type', ['text', 'image', 'video', 'quotes', 'url', 'ads']);
            $table->text('place')->nullable();
            $table->text('happy')->nullable();
            $table->text('normal')->nullable();
            $table->text('sad')->nullable();
            $table->integer('happyCount');
            $table->integer('normalCount');
            $table->integer('sadCount');
            $table->string('viewers');
            $table->integer('views');
            $table->foreign('users_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('class_id')->references('id')->on('virtualclass')->onDelete('cascade');
            $table->softDeletes();
            $table->index('title');
            $table->index('type');
            $table->index('users_id');
            $table->index('class_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('classpost');
    }
}
