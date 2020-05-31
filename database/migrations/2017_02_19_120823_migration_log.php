<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class MigrationLog extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('log', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->enum('place',['post','profile','account','virtualclass','unipage','collegepage','search','friends','main'])->index();
            $table->integer('place_id')->nullable()->index();
            $table->enum('action',['addpost','editpost','joinclass','addclass','follow','follow','editaccount','addinformation','friends','main'])->index();
            $table->integer('action_id')->nullable()->index();
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
        Schema::dropIfExists('log');
    }
}
