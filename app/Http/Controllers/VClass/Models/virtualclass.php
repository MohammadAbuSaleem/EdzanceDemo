<?php

namespace App\Http\Controllers\VClass\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class virtualclass extends Model
{
    protected $table = 'virtualclass';
    //
    use SoftDeletes;
    public function instructor()
    {
        return $this->belongsTo('App\Models\User', 'instructor', 'id');
    }
    public function homework()
    {
        return $this->hasMany(__NAMESPACE__ . '\homework', 'virtualclass_id', 'id');
    }
    public function exam()
    {
        return $this->hasMany(__NAMESPACE__ . '\exam', 'virtualclass_id', 'id');
    }
    public function files()
    {
        return $this->hasMany(__NAMESPACE__ . '\class_files', 'class_id', 'id');
    }
    public function homeworkCount()
    {
        return $this->hasMany(__NAMESPACE__ . '\homework', 'virtualclass_id', 'id')->count();
    }
    public function examCount()
    {
        return $this->hasMany(__NAMESPACE__ . '\exam', 'virtualclass_id', 'id')->count();
    }
    public function filesCount()
    {
        return $this->hasMany(__NAMESPACE__ . '\class_files', 'class_id', 'id')->count();
    }
    public function post()
    {
        return $this->hasMany(__NAMESPACE__ . '\classpost', 'class_id', 'id');
    }
    public function user()
    {
        return $this->hasMany(__NAMESPACE__ . '\classusers', 'class_id', 'id');
    }
    public function vcpost()
    {
        return $this->hasMany(__NAMESPACE__ . '\classpost', 'users_id', 'id')
            ->leftjoin('virtualclass as virtualclass', 'virtualclass.id', '=', 'classpost.class_id')
            ->select('classpost.*', 'virtualclass.id as classid')
            ->with('comment')->orderBy('created_at', 'desc')->take(20);
    }
    public function vcuser()
    {

        return $this->hasMany(__NAMESPACE__ . '\classusers', 'class_id')
            ->leftjoin('users as User', 'User.id', '=', 'classusers.uid')
            ->leftjoin('virtualclass', 'virtualclass.id', '=', 'classusers.class_id')
            ->select('classusers.id as id',
                'classusers.uid as uid',
                'classusers.class_id',
                'User.university_id',
                'User.id as user_id',
                'User.name as first_name',
                'User.specialition_id',
                'User.last_name as last_name',
                'User.avatar as avatar')
            ->orderBy('classusers.created_at', 'desc')
        ;

    }
    public function scopeVcusers($query, $take = 0)
    {
        $a = $query->hasMany(__NAMESPACE__ . '\classusers', 'class_id')
            ->leftjoin('classusers as classusers', 'virtualclass.id', '=', 'classusers.uid')
            ->leftjoin('users as User', 'User.id', '=', 'classusers.uid')
            ->leftjoin('university as uni', 'uni.id', '=', 'User.university_id')
            ->where('user.acctype', '1')
            ->leftjoin('specialition as spi', 'spi.id', '=', 'User.specialition_id')
            ->select('classusers.uid as uid',
                'classusers.class_id',
                'uni.mthr_name as university',
                'uni.id as uni_id',
                'User.university_id',
                'User.id as user_id',
                'User.name as first_name',
                'User.specialition_id',
                'User.last_name as last_name',
                'User.avatar as avatar',
                'spi.id as spi_id',
                'spi.mthr_name as specialition')
            ->orderBy('classusers.created_at', 'desc')
        ;
        if ($take != 0) {
            return $a->take($take);
        } else {
            return $a;
        }

    }
    public function comment()
    {
        return $this->hasMany('App\Models\comment', 'post_id', 'id')
            ->where('place', 'virtualclass')
            ->leftjoin('users as user', 'comment.uid', '=', 'user.id')
            ->select('comment.*', 'user.id as userid', 'user.name as name', 'user.last_name as last_name', 'user.avatar as avatar');
    }

    public function joinRequests()
    {
        return $this->hasMany(__NAMESPACE__ . '\join_class_request', 'class_id', 'id')
            ->join("users", "users.id", "=", "join_class_request.user_id")
            ->where('join_class_request.accept_status', "waiting")
            ->select("users.id", "users.avatar", "users.name", "users.mid_name", "users.last_name", "join_class_request.created_at");
    }

    public static function deleteVcNode($user, $place, $id, $classId)
    {

        if ($user->acctype == 2) {
            $valid = true;
        } else {
            // get class to check if user has permission
            $class = virtualclass::where('id', $classId)
                ->leftjoin('class_moderator', function ($join) use ($user) {
                    $join->on('class_moderator.class_id', '=', "virtualclass.id")
                        ->whereNull('class_moderator.deleted_at')
                        ->where('class_moderator.user_id', '=', $user->id);
                })
                ->first();
            // validate user request
            if (!empty($class->class_moderator) && in_array($place, ['comment', 'homework', 'class_files', 'classpost'])) {
                $valid = true;
            } else {
                $valid = false;
            }
        }

        if (!$valid) {
            return false;
        }
        switch ($place) {
            case 'classpost':
                $classPost = classpost::where('id', $id)->first();
                if ($user->acctype == 2 || ($classPost->users_id != $class->instructor)) {
                    // delete the class post
                    $delete = classpost::where('id', $id)->delete();
                } else {
                    return false;
                }
                break;
            case 'class_files':
                if ($user->acctype == 2) {
                    $delete = class_files::where('id', $id)->delete();
                }
                break;
            case 'exams':
                if ($user->acctype == 2) {
                    $delete = exam::where('id', $id)->delete();
                }
                break;
            case 'comment':
                // get the comment
                $comment = comment::where('id', $id)->with('post')->first();
                if ($user->acctype == 2 || ($comment->uid != $class->instructor)) {
                    $delete = comment::where('id', $id)->delete();
                }
                break;
        }
        // dd($delete);
        if ($delete) {
            return true;
        } else {
            return false;
        }
    }

    public function getClassUsersTokens($classId, $userId)
    {
        $tokens = $this::select("user_token.token", "classusers.uid as user_id")
            ->join("classusers", "classusers.class_id", "=", "virtualclass.id")
            ->leftJoin("user_token", "user_token.user_id", "=", "classusers.uid")
            ->where("virtualclass.id", "=", $classId)
            ->where("classusers.uid", "!=", $userId)
            ->whereNull('user_token.deleted_at')->get()
        ;
        if ($tokens->count()) {
            $tokens = $tokens->toArray();
        } else {
            $tokens = [];
        }

//        //get instructor id
        //        $instToken = $this::select("user_token.token", "users.id as user_id")
        //                ->join("users", "users.id", "=", "virtualclass.instructor")
        //                ->leftJoin("user_token", "user_token.user_id", "=", "users.id")
        //                ->where("virtualclass.instructor", "!=", $userId)
        //                ->whereNull('user_token.deleted_at')->first();
        //
        //
        //             if ($instToken->token) {
        //                $instToken = $instToken->toArray();
        //                $tokens[] = $instToken;
        //            }

        return $tokens;
    }
    public function getClassTeacherToken($vcId, $userId)
    {
        $tokens = $this::select("user_token.token", "virtualclass.instructor as user_id")
            ->leftJoin("user_token", "user_token.user_id", "=", "virtualclass.instructor")
            ->where("virtualclass.instructor", "!=", $userId)
            ->where("virtualclass.id", "=", $vcId)->get()->toArray();
        return $tokens;
    }
}
