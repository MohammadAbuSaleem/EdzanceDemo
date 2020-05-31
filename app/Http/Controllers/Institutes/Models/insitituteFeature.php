<?php

namespace App\Http\Controllers\Institutes\Models;

use Illuminate\Database\Eloquent\Model;

class insitituteFeature extends Model
{
    protected $table = 'ins__insititute_feature';
    public function roles()
    {
        return $this->hasMany(__NAMESPACE__ . '\Rolefeature', 'feature_id', 'feature_id');
    }
}
