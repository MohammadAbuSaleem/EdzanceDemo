<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class Seeder_translate extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    
   	   //Model::unguard();
     	$instructor = factory('App\Models\translate', 10000)->create();
   	   //Model::reguard();
     	//$instructor = factory(App\Models\translate::class, 10000)->make();
   }
}
