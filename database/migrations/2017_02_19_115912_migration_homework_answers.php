<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class MigrationHomeworkAnswers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('homework_answers', function (Blueprint $table) {
            $table->increments('id');
            $table->text('body')->nullable();
            $table->timestamps();
            $table->integer('homework_id')->unsigned()->index();
            $table->integer('user_id')->unsigned()->index();
            $table->text('file')->nullable();
            $table->softDeletes();
            $table->integer('mark');
            $table->string('viewers');
            $table->foreign('homework_id')->references('id')->on('homework')->onDelete('NO ACTION');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('NO ACTION');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('homework_answers');
    }
}
