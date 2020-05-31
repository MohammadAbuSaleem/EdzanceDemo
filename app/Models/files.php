<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class files extends Model
{
      use SoftDeletes;   
       public function comment()
    {
        return $this->hasMany('App\Models\comment','post_id', 'id')
                    ->where('place','files')
                    ->join('users as user',  'comment.uid', '=','user.id')
                    ->select('comment.*', 'user.id as userid', 'user.name as name', 'user.last_name as last_name','user.avatar as avatar');
    }
}
