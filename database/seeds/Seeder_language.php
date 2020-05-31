<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class Seeder_language extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
   
   	   //Model::unguard();
     	$instructor = factory('App\Models\language', 1)->create();
       //Model::reguard();
     }
}
