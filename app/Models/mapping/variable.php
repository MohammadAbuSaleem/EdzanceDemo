<?php

namespace App\Models\mapping;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class variable extends Model
{
    use SoftDeletes;

    protected $table      = 'variables';
    protected $connection = 'live_new';
    //
}
