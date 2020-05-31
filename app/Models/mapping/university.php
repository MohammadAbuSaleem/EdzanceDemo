<?php

namespace App\Models\mapping;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class university extends Model
{
    protected $table      = 'university';
    protected $connection = 'live';
    use SoftDeletes;
    public function college()
    {
        return $this->hasMany('App\Models\college', 'university_id', 'id');
    }
    public function Country()
    {
        return $this->belongsTo('App\Models\Country', 'Country', 'id');
    }

    public function specialition()
    {
        return $this->hasManyThrough('App\Models\specialition', 'App\college')->select('specialition.name', 'specialition.Description');
    }
    public function comment()
    {
        return $this->hasMany('App\Models\comment', 'post_id', 'id')
            ->where('place', 'university')
            ->join('users as user', 'comment.uid', '=', 'user.id')
            ->select('comment.*', 'user.id as userid', 'user.name as name', 'user.last_name as last_name', 'user.avatar as avatar');
    }
}
