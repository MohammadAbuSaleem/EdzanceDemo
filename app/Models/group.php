<?php

namespace App\Models;

use Auth;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class group extends Model
{
    //
    use SoftDeletes;
    public function taxonomies()
    {
        return $this->morphToMany('App\Models\taxonomy', 'taggable');
    }

    public function fellow($take)
    {

        return $this->hasManyThrough('App\Models\taxonomy', 'App\group_taxonomy', 'group_id', 'taxonomy_id', 'id')->join('groups as tags', 'group_id', '=', 'tags.id')->select('groupposts.*', 'groups.id as groupid')->take($take);
    }
    public function my_group()
    {

        return $this->hasManyThrough('App\Models\group', 'App\users_groups', 'user_id', 'group_id', $user->id);
    }
    public function my_own_group()
    {
        $user = Auth::user();
        return $this->hasMany('App\Models\group', 'creator', $user->id);
    }
    public function grpost()
    {
        return $this->hasMany('App\Models\post', 'place_id', 'id')
            ->where('post.place', 'group')
            ->with('comment')->orderBy('created_at', 'desc');
    }
    public function user()
    {
        return $this->hasMany('App\Models\groupuser', 'id', 'id')
            ->WhereIn('users_groups.type', ['in' /*,'owner'*/])
        // ->orWhere('users_groups.type', 'modirator')
            ->leftjoin('users', 'users.id', '=', 'users_groups.user_id')
            ->leftjoin('categories as spec', 'users.institute_id', '=', 'spec.id')
            ->leftjoin('categories as uni', 'spec.main_parent', '=', 'uni.id')
            ->select(
                'users_groups.id',
                'users.id as user_id',
                'users.name as name',
                'users.last_name as last_name',
                'spec.name as specialition',
                'uni.name as university',
                'users.avatar as avatar'
            );
    }
    public function userWithoutModirator()
    {
        return $this->hasMany('App\Models\groupuser', 'id', 'id')
            ->Where('users_groups.type', 'in')
            ->join('users', 'users.id', '=', 'users_groups.user_id')
            ->leftjoin('university as uni', 'users.university_id', '=', 'uni.id')
            ->leftjoin('specialition as spec', 'users.specialition_id', '=', 'spec.id')
            ->select('users_groups.user_id',
                'users_groups.id',
                'users.id as user_id',
                'users.name as name',
                'users.last_name as last_name',
                'users.avatar as avatar',
                'uni.mthr_name as university',
                'spec.mthr_name as specialition');
    }
    public function comment()
    {
        return $this->hasMany('App\Models\comment', 'post_id', 'id')
            ->where('place', 'groupposts')
            ->join('users as user', 'comment.uid', '=', 'user.id')
            ->select('comment.*', 'user.id as userid', 'user.name as name', 'user.last_name as last_name', 'user.avatar as avatar');
    }
}
