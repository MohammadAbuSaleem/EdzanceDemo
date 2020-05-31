<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class JoinClassRequest extends Model
{
    
    protected $table = 'join_class_request';
    protected $primary = 'id';
    use SoftDeletes;
    //
    
    
    public function joinedUsers()
    {
        return $this->hasOne('App\Models\User','id', 'user_id')
                    ->leftjoin('university as uni',  'uni.id', '=','users.university_id')
                    ->where('acctype','1')
                    ->leftjoin('specialition as spi',  'spi.id', '=','users.specialition_id')
                    ->select(
                             'uni.mthr_name as university',
                             'uni.id as uni_id',
                             'users.university_id',
                             'users.id as user_id',
                             'users.name as first_name',
                             'users.specialition_id',
                             'users.last_name as last_name',
                             'users.avatar as avatar', 
                             'spi.id as spi_id',
                             'spi.mthr_name as specialition')
                    ;
    }
}
