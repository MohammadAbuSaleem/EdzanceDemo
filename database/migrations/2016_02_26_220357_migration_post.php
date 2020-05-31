<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class MigrationPost extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		
			//Create table
		Schema::create('post', function(Blueprint $table)
		{
			$table->increments('id')->unsigned();
			$table->string('title')->nullable();
			$table->timestamps();
			$table->integer('users_id')->unsigned();
			$table->integer('status')->nullable();
			$table->string('tag')->nullable();
			$table->text('body');
			$table->string('media')->nullable();
			$table->string('mediadesc')->nullable();
			$table->string('mediatitle')->nullable();
			$table->string('mediaimage')->nullable();
			$table->enum('type', ['text', 'image','video','quotes','url','ads']);
            // $table->integer('type');
			$table->text('place')->nullable();
			$table->text('happy')->nullable();
			$table->text('normal')->nullable();
			$table->text('sad')->nullable();
            $table->integer('happyCount')->default(0);
			$table->integer('normalCount')->default(0);
			$table->integer('sadCount')->default(0);
			$table->string('viewers')->default('0');
            $table->integer('views')->default(0);
			$table->foreign('users_id')->references('id')->on('users')->onDelete('cascade');
			$table->softDeletes();
            $table->index('title');
            $table->index('type');
            // $table->index('tag');
            $table->index('users_id');
		});
	}
	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('post');//
	}

}
