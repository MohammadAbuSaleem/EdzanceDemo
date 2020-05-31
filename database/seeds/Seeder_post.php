<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class Seeder_post extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    
         for ($i=0; $i <100 ; $i++)
        { 
           factory(App\Models\post::class, 10000)->create();
        }
      }
}
