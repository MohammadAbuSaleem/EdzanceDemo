<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class grouppost extends Model
{
       use SoftDeletes;
//protected $table = 'grouppost';

    public function group()
    {
        return $this->belongsTo('App\Models\group', 'group_id', 'id');
    }
    public function User()
    {
        return $this->belongsTo('App\Models\users', 'users_id', 'id');
    }
        public function comment()
    {
        return $this->hasMany('App\Models\comment','post_id', 'id')
                    ->where('place','groupposts')
                    ->join('users as user',  'comment.uid', '=','user.id')
                    ->select('comment.*', 'user.id as userid', 'user.name as name', 'user.last_name as last_name','user.avatar as avatar');
    }
  public function scopeHappy($query)
    {
        $happy=  explode(",",$query->happy);

    }
      public function PostTag()
    {
        return $this->hasManyThrough(
            'App\grouppost', 'App\tags',
            'tag', 'tags', 'tags'
        );
    }
}
