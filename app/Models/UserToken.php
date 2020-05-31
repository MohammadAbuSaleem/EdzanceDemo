<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class UserToken extends Model
{
      use SoftDeletes; 
      protected $table = 'user_token';
    //
    public function getUserTokens($userId){
        $tokens = User::select("user_token.token as token", "users.id as user_id")
                ->leftJoin("user_token", "user_token.user_id", "=", "users.id")
                ->where("users.id", "=", $userId)
                ->whereNull('user_token.deleted_at')->get()->toArray();

            return $tokens;
        
    }
}
