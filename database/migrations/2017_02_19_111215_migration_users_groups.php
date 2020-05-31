<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class MigrationUsersGroups extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users_groups', function (Blueprint $table) {
            $table->integer('group_id')->unsigned()->index();
            $table->integer('user_id')->unsigned()->index();
            $table->primary(['user_id', 'group_id']);
            $table->timestamps();
            $table->foreign('group_id')->references('id')->on('groups')->onDelete('no action');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users_groups');
    }
}
