<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class Seeder_users extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $instructor = factory('App\Models\users', 5000)->create(['acctype' => 2]);
    	$student = factory('App\Models\users', 95000)->create(['acctype' => 1]);
   
    }
}
