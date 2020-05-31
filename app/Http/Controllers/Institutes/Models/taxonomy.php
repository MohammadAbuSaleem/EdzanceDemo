<?php

namespace App\Http\Controllers\Institutes\Models;

use Illuminate\Database\Eloquent\Model;

class taxonomy extends Model
{
    // protected $table = 'taxonomies';

    public function institutes()
    {
        return $this->morphedByMany(__NAMESPACE__ . '\institute', 'taggable');
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
