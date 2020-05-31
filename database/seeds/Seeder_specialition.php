<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class Seeder_specialition extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
     factory('App\Models\specialition', 3000)->create();
   }
}
