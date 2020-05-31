<?php

namespace App\Models\mapping;

use Illuminate\Database\Eloquent\Model;

class institute extends Model
{
    // protected $table = 'institutes';

    protected $connection = 'live_new';
    public function roles()
    {
        return $this->hasManyThrough(
            'App\Models\Rolefeature', 'App\Models\insitituteFeature', 'feature_id',
            'feature_id', 'feature_id');
    }
    public function admins()
    {
        return $this->hasMany(
            'App\Models\institute_admin',
            'institute_id', 'id'
        );
    }
}
