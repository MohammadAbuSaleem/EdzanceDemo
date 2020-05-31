<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
class Seeder_virtualclass extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      //Model::unguard();
   		$instructor = factory('App\Models\virtualclass', 15000)->create();     
	 //Model::reguard();
        }
}
