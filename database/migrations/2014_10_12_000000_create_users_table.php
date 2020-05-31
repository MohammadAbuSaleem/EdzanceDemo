<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('mid_name');
            $table->string('last_name');
            $table->string('oauth_provider');
            $table->string('oauth_provider_id');
            $table->string('telephone');
            $table->string('email');
            $table->string('password');
            $table->date('DOB');
            $table->string('address');
            $table->boolean('logged');
            $table->string('permissions');
            $table->boolean('email_verified');
            $table->string('email_verification_code');
            $table->boolean('active_verification_code');
            $table->boolean('autologged');
            $table->timestamp('activated_at');
            $table->timestamp('last_login');
            $table->string('persist_code');
            $table->string('reset_password_code');
            $table->rememberToken();
            // $table->string('remember_token');
            $table->timestamps();
            $table->string('avatar');
            $table->string('showcase');
            $table->string('viewers');
            $table->integer('views');
            $table->integer('acctype');
            $table->integer('university_id')->unsigned();
            $table->integer('college_id')->unsigned();
            $table->string('facebook');
            $table->string('google');
            $table->string('linkedin');
            $table->string('twitter');
            $table->string('skype');
            $table->string('url');
            $table->enum('status',['s_studying','s_graduated','d_confirmed','d_unconfirmed']);
            $table->enum('sex',['male','female']);
            $table->integer('rating');
            $table->integer('specialition_id')->unsigned();
            $table->softDeletes();
            $table->integer('country_id')->unsigned();
            $table->foreign('specialition_id')->references('id')->on('specialition')->onDelete('NO ACTION');
            $table->foreign('country_id')->references('id')->on('country')->onDelete('NO ACTION');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
