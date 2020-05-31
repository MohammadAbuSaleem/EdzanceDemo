<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class users extends Model
{
 protected $table = 'users';
   //
  public function post()
    {
        return $this->hasMany('App\Models\Post','users_id', 'id')->with('comment')->orderBy('created_at', 'desc')->take(10);
    }
  public function comments()
    {
               return $this->hasManyThrough(
            'App\comment', 'App\post',
            'users_id', 'post_id', 'id'
        );
    }
        public function classes()
    {
        return $this->belongsToMany('App\Models\virtualclass');
    }
  public function class_post()
    {
        return $this->hasMany('App\Models\classpost');
    }
     public function friends()
    {   
return $this->hasMany('App\Models\Comment', 'foreign_key', 'local_key');
    }
    public function specialition()
    {
        return $this->hasOne('App\Models\specialition', 'id', 'specialition_id');
    }
     
}
