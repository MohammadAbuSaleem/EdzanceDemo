<?php

namespace App\Models\mapping;

use Illuminate\Database\Eloquent\Model;

class taxonomy extends Model
{
    // protected $table = 'taxonomies';
    protected $connection = 'live_new';

    public function specialitions()
    {
        return $this->morphedByMany('App\Models\specialition', 'taggable');
    }
    /**
     * Get all of the videos that are assigned this tag.
     */
    public function groups()
    {
        return $this->morphedByMany('App\Models\group', 'taggable');
    }
    //
}
