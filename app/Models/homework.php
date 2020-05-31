<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class homework extends Model
{
    use SoftDeletes;
    protected $table = 'homework';
    //
    public function Classes()
    {
        return $this->belongsTo('App\Models\virtualclass', 'virtualclass_id', 'id');
    }
    public function answers()
    {
        return $this->hasMany('App\Models\homework_answers', 'homework_id', 'id');
    }
    public function comment()
    {
        return $this->hasMany('App\Models\comment', 'post_id', 'id')
            ->where('place', 'homework')
            ->join('users as user', 'comment.user_id', '=', 'user.id')
            ->select('comment.*', 'user.id as userid', 'user.name as name', 'user.last_name as last_name', 'user.avatar as avatar');
    }

    public function user()
    {
        return $this->hasOne('App\Models\virtualclass', 'id', 'virtualclass_id')
            ->join('users as user', 'virtualclass.instructor', '=', 'user.id')
            ->select();
    }
}
