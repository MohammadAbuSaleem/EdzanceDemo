<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class friends extends Model
{
     use SoftDeletes; 
   protected  $primaryKey = 'iid';
 protected $table = 'friends';
public function mainusers()
    {
          return $this->hasOne('App\Models\users', 'id', 'main_users_id');
    }
    public function friend()
    {
        return $this->hasOne('App\Models\users', 'id', 'friend_id');
    }
        public function scopeMutual($query)
    {
        $friendship = $query->first();
        $main_users = self::where('',$friendship->main_users_id)->commonFriend();
        $friend = self::find($friendship->friend_id)->commonFriend() ->union($main_users);
        return $friend;
    }

     public function post()
    {
    return $this->hasMany('App\Models\post', 'users_id', 'friend_id');
}
     
       public function commonFriend()
    {
        return $this->hasManyThrough(
            'App\friends', 'App\friends',
            'main_users_id', 'friend_id','main_users_id'
        );
    }
    /**
     * 
     * @param type $userId
     * @return type
     * @author Ahmad Hajeer
     */
    public function getFollowersTokens($userId) {
        $tokens = $this::select("user_token.token", "friends.id as user_id")
                ->leftJoin("user_token", "friends.id", "=", "user_token.user_id")
                ->where("friends.friend_id", "=", $userId)
                ->where("friends.status", "like", "follower")
                ->whereNull('user_token.deleted_at')
                ->get();
        try{
            $tokens = $tokens->toArray();
        } catch (Exception $ex) {
            $tokens = [];
        }
        return $tokens;
    }

}
