<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class MigrationUniversity extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		
			//Create table
		if (!(Schema::hasTable('university'))) 
        {
   //      	Schema::create('university', function(Blueprint $table)
			// {
			// 	$table->increments('id')->unsigned();
			// 	$table->string('mthr_name')->index();
			// 	$table->string('eng_name')->nullable();
			// 	$table->string('presidant')->nullable();
			// 	$table->string('pobox')->nullable();
			// 	$table->string('telephone')->nullable();
			// 	$table->string('email')->nullable();
			// 	$table->string('fax')->nullable();
			// 	$table->string('costavg')->nullable();
			// 	$table->integer('studentscount')->nullable();
			// 	$table->integer('instructorcount')->nullable();
			// 	$table->timestamps();
			// 	$table->date('DOB')->nullable();
			// 	$table->text('mthr_place');
			// 	$table->text('eng_place')->nullable();
			// 	$table->integer('status')->nullable();
			// 	$table->integer('type')->nullable();
			// 	$table->text('URL')->nullable();
			// 	$table->text('mthr_Description')->nullable();
			// 	$table->text('eng_Description')->nullable();
			// 	$table->integer('rating')->nullable();
			// 	$table->integer('rating_count')->nullable();
			// 	$table->integer('globalrating')->nullable();
			// 	$table->integer('globalrating_count')->nullable();
			// 	$table->string('longitude')->nullable();
			// 	$table->string('latittude')->nullable();
			// 	$table->string('place_lat')->nullable();
			// 	$table->string('place_long')->nullable();
			// 	$table->string('avatar');
			// 	$table->string('showcase');
			// 	$table->integer('country_id')->unsigned();
			// 	$table->softDeletes();
			// 	$table->foreign('country_id')->references('id')->on('country');
			// });
		}
	}
	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('university');
	}

}
