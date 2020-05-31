<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class MigrationComment extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		
			//Create table
		Schema::create('comment', function(Blueprint $table)
		{
			$table->increments('id')->unsigned();
			$table->timestamps();
			$table->text('body');
			$table->integer('uid');
			$table->integer('post_id')->unsigned()->index();
			$table->integer('status');
			$table->text('intrested');
			$table->text('notintrested');
			$table->foreign('post_id')->references('id')->on('post')->onDelete('cascade');
			$table->softDeletes();
            $table->enum('place', ['classpost', 'class_files','exams','homework','post','virtualclass','university','specialition','homework_answers']);
            // $table->index('post_id');

		});
	}
	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('comment');//
	}
}
