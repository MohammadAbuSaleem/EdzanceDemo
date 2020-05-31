<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();
        //$instructor = factory('App\chat', 50)->create();
         //$this->call(Seeder_language::class);
         //$this->call(Seeder_translate::class);
         //$this->call(Seeder_University::class);
         //$this->call(Seeder_College::class);
         //$this->call(Seeder_specialition::class);
         $this->call(Seeder_users::class);
         $this->call(Seeder_friends::class);
         //$this->call(Seeder_post::class);
         //$this->call(Seeder_tags::class);
         //$this->call(Seeder_comment::class);
         //$this->call(Seeder_virtualclass::class);
         //$this->call(Seeder_classusers::class);
         //$this->call(Seeder_classpost::class);
         //$this->call(Seeder_messages::class);
         //$this->call(Seeder_chat::class);
         Model::reguard();
    }
}
