<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class InstituteRequests extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ins__requests', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('requester_id')->unsigned();
            $table->integer('requested_id')->unsigned();
            $table->enum('type', ['enter', 'exit','assign','transfer','promotion','add_institute','block',]);

            $table->enum('status', ['open_unseen', 'refused','blocked','delayed','open_seen']);
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
        Schema::drop('ins__requests');
    }
}
