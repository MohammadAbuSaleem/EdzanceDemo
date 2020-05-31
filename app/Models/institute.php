<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class institute extends Model
{
    protected $table = 'institutes';
    public function taxonomies()
    {
        return $this->morphToMany(__NAMESPACE__ . '\taxonomy', 'taggable');
    }
    public function roles()
    {
        return $this->hasManyThrough(
            __NAMESPACE__ . '\Rolefeature', __NAMESPACE__ . '\insitituteFeature', 'feature_id',
            'feature_id', 'feature_id');
    }
    public function admins()
    {
        return $this->hasMany(
            __NAMESPACE__ . '\instituter',
            'institute_id', 'id'
        );
    }
    public function variables()
    {
        return $this->hasManyThrough(
            __NAMESPACE__ . '\variable', //post
            __NAMESPACE__ . '\variable_block', //user
            'institute_id', // Foreign key on users table...
            'block_id', // Foreign key on posts table...
            'id', // Local key on countries table...
            'id' // Local key on users table...
        );
    }
}
