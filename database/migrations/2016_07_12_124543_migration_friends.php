<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class MigrationFriends extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
            //Create table
        Schema::create('friends', function(Blueprint $table)
        {
            $table->increments('iid');
            $table->timestamps();
            $table->integer('id')->unsigned();
            $table->integer('friend_id')->unsigned();
            $table->enum('status', ['follower', 'blocked','deleted']);
            $table->foreign('id')->references('id')->on('users')->onDelete('NO ACTION');
            $table->foreign('friend_id')->references('id')->on('users')->onDelete('NO ACTION');
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
        Schema::dropIfExists('friends');
    }
}
