<?php

namespace App\Models;

use Auth;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class classpost extends Model
{
    use SoftDeletes;
    protected $table = 'classpost';

    public function Classes()
    {
        return $this->belongsTo('App\Models\virtualclass', 'class_id', 'id');
    }
    public function User()
    {
        return $this->belongsTo('App\Models\users', 'user_id', 'id');
    }
    public function comment()
    {
        return $this->hasMany('App\Models\comment', 'post_id', 'id')
            ->where('place', 'classpost')
            ->join('users as user', 'comment.user_id', '=', 'user.id')
            ->select('comment.*', 'user.id as userid', 'user.name as name', 'user.last_name as last_name', 'user.avatar as avatar');
    }
    public function scopeHappy($query)
    {
        $happy = explode(",", $query->happy);

    }
    public function PostTag()
    {
        return $this->hasManyThrough(
            'App\classpost', 'App\tags',
            'tag', 'tags', 'tags'
        );
    }

    public function scopeIsfriend($query)
    {
        $query->ahmad = true;
        return $query->leftjoin('friends', function ($join) {
            $user = Auth::user();
            $join->on('friends.friend_id', '=', 'classpost.user_id')
                ->where('friends.id', '=', $user->id)
                ->where('friends.status', '=', 'follower')
            ;
        })->select('classpost.*', 'friends.friend_id as fr_id', 'friends.created_at as isfriend');
    }

    public function getPostOwnerToken($vcPostId, $userId)
    {

        $tokens = $this::select("user_token.token", "classpost.user_id as user_id")
            ->leftJoin("user_token", "user_token.user_id", "=", "classpost.user_id")
            ->where("classpost.id", "=", $vcPostId)
            ->where("classpost.user_id", "!=", $userId)
            ->whereNull('user_token.deleted_at')
            ->get()->toArray();
        return $tokens;
    }

    /**
     *
     * @param type $postId
     */
    public function getPostInfo($postId)
    {
        $post = $this::where("classpost.id", $postId)
            ->isfriend()
            ->with('comment')
            ->join('users', 'users.id', '=', 'classpost.user_id')
            ->select('users.avatar as avatar', 'users.name as name', 'users.last_name as last_name', 'classpost.*', 'users.id as userid')
            ->get();
        return $post;
    }

}
