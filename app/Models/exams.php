<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class exams extends Model
{

    protected $table = 'exams';

    use SoftDeletes;

    public function comment()
    {
        return $this->hasMany('App\Models\comment', 'post_id', 'id')
            ->where('place', 'exams')
            ->join('users as user', 'comment.uid', '=', 'user.id')
            ->select('comment.*', 'user.id as userid', 'user.name as name', 'user.last_name as last_name', 'user.avatar as avatar');
    }

    public function user()
    {
        return $this->hasOne('App\Models\virtualclass', 'id', 'virtualclass_id')
            ->join('users as user', 'virtualclass.instructor', '=', 'user.id')
            ->select();
    }

}
