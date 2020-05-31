<?php

// use Illuminate\Foundation\Auth\User as Authenticatable;

namespace App\Models\mapping;

use Auth;
use Bican\Roles\Contracts\HasRoleAndPermission as HasRoleAndPermissionContract;
use Bican\Roles\Traits\HasRoleAndPermission;
use DB;
use Illuminate\Auth\Authenticatable;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Model implements AuthenticatableContract, CanResetPasswordContract, HasRoleAndPermissionContract
{

    use Authenticatable,
    CanResetPassword,
        HasRoleAndPermission;
    use SoftDeletes;

    protected $table      = 'users';
    protected $primary    = 'id';
    protected $connection = 'live_new';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'email', 'password', 'avatar',
    ];

    public function group()
    {
        return $this->hasMany('App\Models\group', 'creator', 'id')->with('user');
    }
    public function scopegroupIn($query)
    {
        return $this->hasManyThrough('App\Models\group', 'App\users_groups', 'user_id', 'group_id', $user->id);
    }

    public function studentInfo()
    {
        return $this->hasOne('App\Models\student_info', 'user_id', 'id');
    }
    public function instructorInfo()
    {
        return $this->hasOne('App\Models\instructor_info', 'user_id', 'id');
    }
    public function info()
    {
        //return $this->with('video');
        if ($this[0]['acctype'] == 2) {
            return $this->hasOne('App\Models\instructor_info', 'user_id', 'id');
        } elseif ($this[0]['acctype'] == 1) {
            return $this->hasOne('App\Models\student_info', 'user_id', 'id');
        }
    }
    public function video()
    {
        return $this->hasMany('App\Models\post', 'user_id', 'id')
            ->leftjoin('users as user', 'post.user_id', '=', 'user.id')
            ->select('post.*', 'user.id as userid', 'user.name as name', 'user.last_name as last_name', 'user.avatar as avatar')
            ->with('comment')->orderBy('created_at', 'desc')->where('post.type', 'video')->take(20);
    }
    public function image()
    {
        return $this->hasMany('App\Models\post', 'user_id', 'id')
            ->leftjoin('users as user', 'post.user_id', '=', 'user.id')
            ->select('post.*', 'user.id as userid', 'user.name as name', 'user.last_name as last_name', 'user.avatar as avatar')
            ->with('comment')->orderBy('created_at', 'desc')->where('post.type', 'image')->take(20);
    }
    public function vcpost()
    {
        return $this->hasMany('App\Models\classpost', 'user_id', 'id')
            ->leftjoin('users as user', 'classpost.user_id', '=', 'user.id')
            ->select('classpost.*', 'user.id as userid', 'user.name as name', 'user.last_name as last_name', 'user.avatar as avatar')
            ->with('comment')->orderBy('created_at', 'desc')->take(20);
    }
    public function usercomment()
    {
        return $this->hasManyThrough(
            'App\comment', 'App\post',
            'user_id', 'post_id', 'id'

        );
    }
    public function post()
    {
        return $this->hasMany('App\Models\post', 'user_id', 'id')
            ->where('place', 'post')
            ->leftjoin('users as user', 'post.user_id', '=', 'user.id')
            ->leftjoin('university as univ', 'user.university_id', '=', 'univ.id')
            ->leftjoin('specialition as spi', 'spi.id', '=', 'user.specialition_id')
            ->select('post.id',
                'post.body',
                'post.created_at',
                'post.happy',
                'post.normal',
                'post.sad',
                'post.type',
                'post.media',
                'post.mediadesc',
                'post.mediaimage',
                'post.mediatitle',
                'user.id as userid',
                'post.happyCount',
                'post.normalCount',
                'post.sadCount',
                'user.name as name',
                'user.last_name as last_name',
                'user.avatar as avatar',
                'user.showcase as cover',
                'user.FB_UID',
                'univ.mthr_name as university',
                'post.redirect_id',
                'post.user_id',
                'spi.mthr_name as specialition')
            ->with('comment')
            ->orderBy('post.created_at', 'desc');
    }

    public function followPost()
    {
        // return $this->join('friends',  $this->id, '=','friends.main_user_id')->select('post.*','friends.main_user_id') ->with('comment');
        return $this->hasManyThrough(
            'App\post', 'App\friends', 'id', 'userss_id', 'id'
        )->with('comment');
    }

    public function classPost()
    {
        return $this->hasMany('App\Models\classpost');
    }

    public function myclass()
    {
        return $this->hasMany('App\Models\classusers', 'uid', 'id')
            ->leftjoin('virtualclass as vc', 'classusers.class_id', '=', 'vc.id')->leftjoin('users as ins', 'ins.id', '=', 'vc.instructor')
            ->select('vc.id',
                'vc.name',
                DB::raw("concat(ins.name, ' ', ins.last_name) as u_name"),
                'classusers.id',
                'classusers.uid',
                'classusers.class_id', 'ins.id', 'ins.avatar' /*, 'ins.name as u_name'*/)
        ;
    }

    public function myclasses()
    {
        return $this->hasMany('App\Models\classusers', 'uid', 'id')
            ->leftjoin('virtualclass as vc', 'classusers.class_id', '=', 'vc.id')->leftjoin('users as ins', 'ins.id', '=', 'vc.instructor')
            ->select('vc.*', 'ins.name as ins_name', 'ins.avatar', 'ins.id as instructor', 'vc.instructor')
        ;
        // select `virtualclass`.*, `ins`.`name` as `ins_name`, `ins`.`avatar`, `classusers`.`uid` from `virtualclass` inner join `classusers` on `classusers`.`uid` = `virtualclass`.`id` inner join `users` as `ins` on `ins`.`id` = `virtualclass`.`instructor` where `classusers`.`id` in (100030)
        //$id = Crypt::encrypt('crypt:'.$users->id);;
    }

    public function friends()
    {
        return $this->hasMany('App\Models\friends', 'id', 'id')
            ->leftjoin('users', 'friends.friend_id', '=', 'users.id')
            ->leftjoin('university as univ', 'users.university_id', '=', 'univ.id')
            ->select('users.id', 'users.university_id', 'users.avatar', 'users.name', 'users.email', 'users.mid_name', 'users.mid_name', 'users.last_name', 'users.id', 'friends.id', 'friends.friend_id', 'friends.status', 'univ.id as university_id', 'univ.mthr_name as university')->where('friends.status', 'follower');
        // ->select('users.*','friends.friend_id','friends.id','friends.status')->where('friends.status','follower')->with('post');
    }
    public function friends2()
    {
        return $this->hasMany('App\Models\friends', 'id', 'id')->addSelect('friends.id');
    }
    public function followers()
    {
        return $this->hasMany('App\Models\friends', 'friend_id', 'id')
            ->leftjoin('users', 'friends.id', '=', 'users.id')
            ->leftjoin('university as univ', 'users.university_id', '=', 'univ.id')
            ->select('users.*', 'friends.friend_id', 'friends.id', 'friends.status', 'univ.id as university_id', 'univ.mthr_name as university')->where('friends.status', 'follower');
        // ->select('users.*','friends.friend_id','friends.id','friends.status')->where('friends.status','follower')->with('post');
    }
    public function followers2()
    {
        return $this->hasMany('App\Models\friends', 'friend_id', 'id')->addSelect('friends.id');
    }

    public function SuggestedFriends()
    {
        return $this->hasManyThrough(
            'App\User', 'App\friends', 'main_user_id', 'id', 'friend_id'
        );
    }

    public function specialition()
    {
        return $this->belongsTo('App\Models\specialition', 'specialition_id', 'id');
    }

    public function institute()
    {

        return $this->belongsTo('App\Models\category', 13, 'id');

    }

    public function scopeIsfriend($query)
    {
        $newquery = $query->leftjoin('friends', function ($join) {
            $user = Auth::user();

            $join->on('friends.friend_id', '=', 'users.id')
                ->where('friends.id', '=', $user->id)
                ->where('friends.status', '=', 'follower');
        })->select('users.*', 'friends.friend_id as fr_id', 'friends.created_at as isfriend');
        // dd($newquery->toSql());
        // DB::table('users')->get();
        return $newquery;
    }

    protected function hasTooManyLoginAttempts(Request $request)
    {
        $maxLoginAttempts = 3;

        $lockoutTime = 1; // In minutes

        return $this->limiter()->tooManyAttempts(
            $this->throttleKey($request), $maxLoginAttempts, $lockoutTime
        );
    }

    public function profileFollowers()
    {
        return $this->hasMany('App\Models\friends', 'friend_id', 'id')
            ->leftjoin('users', 'friends.id', '=', 'users.id')
            ->select('friends.friend_id', 'friends.id', 'friends.status', DB::raw("concat(users.name, ' ', users.last_name) as name"), 'users.avatar')
            ->where('friends.status', 'follower')
            ->limit(9);
    }

    public function profileFriends()
    {
        return $this->hasMany('App\Models\friends', 'id', 'id')
            ->leftjoin('users', 'friends.friend_id', '=', 'users.id')
            ->select('friends.friend_id', 'friends.id', 'friends.status', DB::raw("concat(users.name, ' ', users.last_name) as name"), 'users.avatar')
            ->where('friends.status', 'follower')
            ->limit(9);
    }

    public function profilePostsImages()
    {
        return $this->hasMany('App\Models\post', 'user_id', 'id')
            ->select(["post.user_id", "post.media", "post.id"])->where('post.type', 'image')->limit(6);
    }

    public function profilePostsVideos()
    {
        return $this->hasMany('App\Models\post', 'user_id', 'id')
            ->select(["post.user_id", "post.media", "post.mediaimage", "post.id"])->where('post.type', 'video')->limit(6);
    }

    public function profileFollowersCount()
    {
        return $this->hasMany('App\Models\friends', 'friend_id', 'id')
            ->leftjoin('users', 'friends.id', '=', 'users.id')
            ->select(["friends.friend_id", DB::raw("count(friends.friend_id) as count")])
            ->where('friends.status', 'follower')
            ->groupBy('friends.friend_id')
            ->limit(9);
    }

    public function profileFriendsCount()
    {
        return $this->hasMany('App\Models\friends', 'id', 'id')
            ->leftjoin('users', 'friends.friend_id', '=', 'users.id')
            ->select(["friends.id", DB::raw("count(friends.id) as count")])
            ->where('friends.status', 'follower')
            ->limit(9);
    }

    public function instructorEducation()
    {
        return $this->hasMany('App\Models\InstructorEducation', 'user_id', 'id')
            ->leftjoin('country', "country.id", "=", "instructor_education.country_id")
            ->select("instructor_education.id", "instructor_education.user_id", "instructor_education.grade", "instructor_education.specialization", "instructor_education.start_year", "instructor_education.end_year");
    }
    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'remember_token', 'oauth_provider_id', 'oauth_provider',
    ];
}
