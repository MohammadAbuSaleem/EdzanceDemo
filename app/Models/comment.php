<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class comment extends Model
{
   use SoftDeletes;	
protected $table = 'comment';
     public function post()
    {
        return $this->belongsTo('App\Models\post', 'post_id', 'id')->orderBy('created_at', 'desc');
    }

     

}
