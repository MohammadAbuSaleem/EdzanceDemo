<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class classusers extends Model
{

    use SoftDeletes;

    protected $table = 'classusers';

    public function classes()
    {
        return $this->belongsTo('App\Models\virtualclass', 'class_id', 'id');
    }
    public static function clas($class_id)
    {
        return static::where('classusers.class_id', $class_id)
            ->leftjoin('users as User', 'User.id', '=', 'classusers.uid')
            ->addSelect('classusers.id as id',
                'classusers.uid as uid',
                // 'classusers.class_id',
                // 'User.id as user_id',
                \DB::raw('CONCAT(User.name," ",User.last_name ) AS name')
                // 'User.avatar as avatar'
            );
    }
    public static function classs($class_id)
    {
        return static::where('classusers.class_id', $class_id)
            ->leftjoin('users as User', 'User.id', '=', 'classusers.uid');
    }

    public function user()
    {
        return $this->belongsTo('App\Models\User', 'users_id', 'id');
    }

    public function mark()
    {
        return $this->hasMany('App\Models\Mark', 'classuser_id')
            ->leftjoin('assessments', 'assessments.id', '=', 'marks.assessment_id')
            ->addSelect('marks.mark',
                'marks.classuser_id',
                'marks.assessment_id',
                'assessments.exam_name'
            );
    }
    public function attendance()
    {
        return $this->hasMany('App\Models\Attendance', 'user_id', 'uid')
            ->leftjoin('users', 'users.id', '=', 'classusers.uid');
    }
    public static function findOrCreate($id, $class)
    {
        $obj = static::where('uid', '=', $id)
            ->where('class_id', '=', $class)->withTrashed()->first();
        if ($obj) {
            return $obj;
        } else {
            return new static;
        }

    }
}
