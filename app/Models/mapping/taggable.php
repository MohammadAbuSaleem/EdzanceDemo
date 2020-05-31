<?php

namespace App\Models\mapping;

use Illuminate\Database\Eloquent\Model;

class taggable extends Model
{
    protected $table      = 'taggables';
    protected $connection = 'live_new';
    public $timestamps    = false;
    //
}
