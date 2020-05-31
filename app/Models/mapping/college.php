<?php

namespace App\Models\mapping;

use Illuminate\Database\Eloquent\Model;

class college extends Model
{
    protected $table      = 'college';
    protected $connection = 'live';
    public function university()
    {
        return $this->belongsTo('App\Models\university', 'university_id', 'id');
    }
    public function specialize()
    {
        return $this->hasMany('App\Models\specialition', 'college_id', 'id');
    }

    public function students()
    {
        return $this->hasManyThrough(
            'App\users', 'App\specialition',
            'college_id', 'specialition_id', 'id'
        )->where('acctype', 1);
    }
    public function instructor()
    {
        return $this->hasManyThrough(
            'App\users', 'App\specialition',
            'college_id', 'specialition_id', 'id'
        )->where('acctype', 2);
    }
}
