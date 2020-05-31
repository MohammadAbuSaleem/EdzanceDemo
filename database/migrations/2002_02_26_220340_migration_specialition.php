<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class MigrationSpecialition extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		
		if (!(Schema::hasTable('specialition'))) 
        {
        	//Create table
			// Schema::create('specialition', function(Blueprint $table)
			// {
			// 	$table->increments('id')->unsigned();
			// 	$table->string('mthr_name');
			// 	$table->string('eng_name')->nullable();
			// 	$table->timestamps();
			// 	$table->date('DOB')->nullable();
			// 	$table->integer('status')->nullable();
			// 	$table->text('mthr_Description')->nullable();
			// 	$table->text('eng_Description')->nullable();
			// 	$table->integer('college_id')->unsigned();
			// 	$table->foreign('college_id')->references('id')->on('college')->onDelete('cascade');
			// 	$table->softDeletes();
	  //           $table->index('college_id');
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
		
		Schema::dropIfExists('specialition');
	}

}
