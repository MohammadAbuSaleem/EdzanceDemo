<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class language extends Model
{
    protected $table = 'language';
//
     public function vocabulary()
    {
        return $this->hasMany('App\Models\translate');
    }
}
