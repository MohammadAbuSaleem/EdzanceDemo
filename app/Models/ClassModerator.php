<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ClassModerator extends Model
{
    protected $table = 'class_moderator';
    protected $primary = 'id';
    use SoftDeletes;
    //
}
