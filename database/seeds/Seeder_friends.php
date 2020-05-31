<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class Seeder_friends extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    
      //Model::unguard();
        for ($i=0; $i <50 ; $i++)
        { 
           factory(App\Models\friends::class, 10000)->create();
        }
     }
}
