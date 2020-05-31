<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class variable_block extends Model
{
    //
    public function variables()
    {
        return $this->hasMany(__NAMESPACE__ . '\variable', 'block_id', 'id');
    }

}
