<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
class Seeder_tags extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    
   		   //Model::unguard();
      $instructor = factory('App\Models\tags', 1000000)->create();
       //Model::reguard();
     }
}
