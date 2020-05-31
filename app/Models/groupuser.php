<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
// use Illuminate\Database\Eloquent\SoftDeletes;
class groupuser extends Model
{
	   // use SoftDeletes;
    protected $table = 'users_groups';
    protected $primaryKey = 'iid';
    protected $primary = 'iid';
     public function group()
    {
        return $this->belongsTo('App\Models\group', 'id', 'id');
    }
     public function groups()
    {
           return $this->hasMany('App\Models\group','id', 'id');
    }
    public function User()
    {
        return $this->belongsTo('App\Models\User', 'user_id', 'id');
    }
     public function Users()
    {
        return $this->hasMany('App\Models\User', 'id', 'user_id');
    }

public static function findOrCreate($id,$group)
{
    $obj = static::where('user_id','=',$id)
    			 ->where('id','=',$group);
    			 if($obj)
    			 	return $obj;
    			 else
                    return new $this;
}

}
