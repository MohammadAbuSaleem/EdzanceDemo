<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class Seeder_classusers extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
   
   	   //Model::unguard();
     	$instructor = factory(App\Models\classusers::class, 350000)->create();
       //Model::reguard();
     }
}
