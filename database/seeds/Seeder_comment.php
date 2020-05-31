<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class Seeder_comment extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
   
      //Model::unguard();
     		$instructor = factory(App\Models\comment::class, 6000000)->create();
      //Model::reguard();
      }
}
