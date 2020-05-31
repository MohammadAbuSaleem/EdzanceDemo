<?php

use Illuminate\Database\Seeder;

class Seeder_chat extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //Model::unguard();
        $instructor = factory('App\Models\chat', 50)->create();
        //Model::reguard();
    }
}
