<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
class Seeder_College extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
   	    //Model::unguard();
     	  factory('App\Models\college', 500)->create();
  	    //Model::reguard();
    }
}
