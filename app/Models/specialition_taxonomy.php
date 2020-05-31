<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
// use Illuminate\Database\Eloquent\SoftDeletes;
class specialition_taxonomy extends Model
{
	   // use SoftDeletes;
    protected $table = 'specialition_taxonomy';
     public function group()
    {
        return $this->belongsTo('App\Models\taxonomy', 'taxonomy_id', 'id');
    }
     public function groups()
    {
           return $this->hasMany('App\Models\taxonomy','taxonomy_id', 'id');
    }
    public function User()
    {
        return $this->belongsTo('App\Models\specialition', 'specialition_id', 'id');
    }
     public function Users()
    {
        return $this->hasMany('App\Models\specialition', 'specialition_id', 'id');
    }


}
