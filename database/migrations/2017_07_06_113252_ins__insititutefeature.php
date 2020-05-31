<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class InsInsititutefeature extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('insititute_feature', function (Blueprint $table) {
            $table->increments('id');
            $table->string('feature_id');
            $table->string('insititute_id');
            $table->string('user_id');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('ins__insititutefeature');
    }
}
