<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class specialition extends Model
{
    use SoftDeletes;
    protected $table      = 'specialition';
    protected $connection = 'live';
    public function taxonomies()
    {
        return $this->morphToMany('App\Models\taxonomy', 'taggable');
    }
    public function college()
    {
        return $this->hasOne('App\Models\college', 'id', 'college_id');
    }
    public function students()
    {
        return $this->hasMany('App\Models\users', 'specialition_id', 'id')->where('acctype', 1);
    }
    public function instructor()
    {
        return $this->hasMany('App\Models\users', 'specialition_id', 'id')->where('acctype', 2);
    }
    public function comment()
    {
        return $this->hasMany('App\Models\comment', 'post_id', 'id')
            ->where('place', 'specialition')
            ->join('users as user', 'comment.uid', '=', 'user.id')
            ->select('comment.*', 'user.id as userid', 'user.name as name', 'user.last_name as last_name', 'user.avatar as avatar');
    }
}
