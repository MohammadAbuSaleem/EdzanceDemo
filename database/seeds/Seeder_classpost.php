<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class Seeder_classpost extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
   
   	   //Model::unguard();
     	$instructor = factory(App\Models\classpost::class, 3000000)->create();
       //Model::reguard();
     }
}
