<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class MigrationCollege extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		//Create table
		if (!(Schema::hasTable('college'))) 
        {	
    //     	Schema::create('college', function(Blueprint $table)
				// {
				// 	$table->increments('id')->unsigned();
				// 	$table->string('mthr_name')->nullable()->index();
				// 	$table->string('eng_name')->nullable();
				// 	$table->string('presidant')->nullable();
				// 	$table->timestamps();
				// 	$table->date('DOB')->nullable();
				// 	$table->integer('status')->nullable();
				// 	$table->string('mthr_address')->nullable();
				// 	$table->text('eng_address')->nullable();
				// 	$table->text('mthr_Description')->nullable();
				// 	$table->text('eng_Description')->nullable();
				// 	$table->string('avatar')->nullable();
				// 	$table->string('showcase')->nullable();
				// 	$table->integer('university_id')->unsigned();
				// 	$table->foreign('university_id')->references('id')->on('university');	            
				// 	$table->softDeletes();
		  //           $table->index('university_id');
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
		Schema::dropIfExists('college');//
	}

}
