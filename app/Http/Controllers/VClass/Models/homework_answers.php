<?php

namespace App\Http\Controllers\VClass\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class HomeworkAnswers extends Model
{
    use SoftDeletes;
    protected $table = 'homework_answers';
    //
    public function HomeWork()
    {
        return $this->belongsTo('App\Models\homework', 'hoework_id', 'id');
    }
    public function comment()
    {
        return $this->hasMany('App\Models\comment', 'post_id', 'id')
            ->where('place', 'homework_answers')
            ->join('users as user', 'comment.uid', '=', 'user.id')
            ->select('comment.*', 'user.id as userid', 'user.name as name', 'user.last_name as last_name', 'user.avatar as avatar');
    }
}
