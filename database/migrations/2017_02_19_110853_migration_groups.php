<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class MigrationGroups extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('groups', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->uuid('uid')->nullable();
            $table->enum('privacy',['public','closed','same_university','same_specialization','same_specialization_all_world']);
            // $table->enum('type',['first','second','summer']);
            $table->timestamps();
            $table->integer('creator')->unsigned();
            $table->text('description')->nullable();
            $table->boolean('authorized')->nullable();
            $table->string('viewers')->nullable();
            $table->integer('views')->nullable();
            $table->softDeletes();
            $table->integer('specialization_id')->unsigned();
            $table->integer('university_id')->unsigned();
            $table->string('cover')->nullable();
            $table->string('avatar')->nullable();
            $table->string('Fire_Base_Chat_Room_name')->nullable();
            $table->foreign('creator')->references('id')->on('users')->onDelete('no action');
        });
        // DB::statement("ALTER TABLE `groups` CHANGE `privacy` `privacy` SET('public','closed','same_university','same_specialization','same_specialization_all_world');");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('groups');
    }
}
