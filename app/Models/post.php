<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class post extends Model
{
    use SoftDeletes;
    protected $dates = ['deleted_at'];
    protected $table = 'post';
    public function comment()
    {
        return $this->hasMany('App\Models\comment', 'post_id', 'id')
            ->leftjoin('users as user', 'comment.user_id', '=', 'user.id')
            ->select('comment.*', 'user.id as userid','comment.user_id as uid', 'user.name as name', 'user.last_name as last_name', 'user.avatar as avatar')->orderBy('created_at', 'desc');
    }
    public function scopeHappy($query)
    {
        $happy = explode(",", $query->happy);

    }

    public function addAvatarPost($image, $userId)
    {
        $post           = new post;
        $post->media    = $image;
        $post->body     = " ";
        $post->tag      = '';
        $post->place    = 'post';
        $post->type     = 'avatar_image';
        $post->users_id = $userId;
        $post->save();
    }

    public function addCoverPost($image, $userId)
    {
        $post           = new post;
        $post->media    = $image;
        $post->body     = " ";
        $post->tag      = '';
        $post->place    = 'post';
        $post->type     = 'cover_image';
        $post->users_id = $userId;
        $post->save();
    }
    /**
     *
     * @param type $postId
     * @return type
     * @author Ahmad Hajeer
     */
    public function getPostOunerToken($postId, $userId)
    {
        $users = $this::select("user_token.token", "post.user_id as user_id")
            ->leftJoin("user_token", "user_token.user_id", "=", "post.user_id")
            ->where("post.id", "=", $postId)
            ->where("post.user_id", "!=", $userId)
            ->whereNull('user_token.deleted_at')
            ->get()
            ->toArray();
        return $users;
    }
    /**
     *
     * @param type $postId
     */
    public function getPostInfo($postId)
    {
        $post = $this::where("post.id", $postId)
            ->where('place', 'post')
            ->join('users as user', 'post.users_id', '=', 'user.id')
            ->join('university as univ', 'user.university_id', '=', 'univ.id')
            ->join('specialition as spi', 'spi.id', '=', 'user.specialition_id')
            ->select('post.*', 'user.id as userid', 'user.name as name', 'user.last_name as last_name', 'user.avatar as avatar', 'user.showcase as cover', 'univ.mthr_name as university', 'spi.mthr_name as specialition')
            ->with('comment')->orderBy('created_at', 'desc')->get()->toArray();
        return $post;
    }

    public function getUserPosts($userId, $postType, $skip, $take)
    {
        $posts = $this::where('place', 'post')->where('post.users_id', $userId)->where('post.type', $postType)
            ->leftjoin('users as user', 'post.user_id', '=', 'user.id')
            ->leftjoin('university as univ', 'user.university_id', '=', 'univ.id')
            ->leftjoin('specialition as spi', 'spi.id', '=', 'user.specialition_id')
            ->select('post.*', 'user.id as userid', 'user.name as name', 'user.last_name as last_name', 'user.avatar as avatar', 'user.showcase as cover', 'univ.mthr_name as university', 'spi.mthr_name as specialition')
            ->with('comment')
            ->orderBy('created_at', 'desc')
            ->skip($skip)
            ->take($take)->get();
        return $posts;
    }

    public static function translateExprission($lang, $exprission)
    {
        $translations = ['ar' => [
            'happy'  => 'مناسب',
            'normal' => 'عادي',
            'sad'    => 'غير مناسب',
        ]];

        return $translations[$lang][$exprission];
    }

    public static function addFollowPost($userId, $friendId, $friendName, $friendAvatar)
    {
        $postTtpe = 'follow_post';
        // check if posted before

        $oldPost = post::where("redirect_id", $friendId)->where("type", $postTtpe)->first();

        if (empty($oldPost)) {
            $post              = new post;
            $post->media       = $friendAvatar;
            $post->mediadesc   = $friendName;
            $post->tag         = '';
            $post->place       = 'post';
            $post->type        = $postTtpe;
            $post->user_id     = $userId;
            $post->redirect_id = $friendId;
            $post->save();
        }
    }

    public static function addNewClassPost($userId, $classId, $className, $avatar)
    {
        $postTtpe = 'new_class_post';
        // check if posted before
        $oldPost = post::where("redirect_id", $classId)->where("type", $postTtpe)->first();
        if (empty($oldPost)) {
            $post              = new post;
            $post->media       = $avatar;
            $post->mediadesc   = $className;
            $post->tag         = '';
            $post->place       = 'post';
            $post->type        = $postTtpe;
            $post->user_id     = $userId;
            $post->redirect_id = $classId;
            $post->save();
        }
    }
}
