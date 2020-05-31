<?php

namespace App\Models\mapping;

use Illuminate\Database\Eloquent\Model;

class category extends Model
{
    protected $table      = 'categories';
    protected $connection = 'live_new';

    public function taxonomies()
    {
        return $this->morphToMany('App\Models\taxonomy', 'taggable');
    }
    public function childs()
    {
        return $this->child()->with('childs');

        $query->where('categories.main', 1);

    }
    public function child()
    {
        $q = $this->hasMany('App\Models\category', 'parent', 'id')
            ->leftjoin('categories as cat', 'categories.parent', '=', 'cat.id')
            ->addSelect('categories.*', 'cat.name as father');
        return $q;
    }
    public function parent()
    {
        return $this->belongsTo('App\Models\category', 'parent', 'id')
            ->leftjoin('categories as cat', 'categories.parent', '=', 'cat.id')->select('categories.id',
            'categories.name as cat_name',
            'categories.parent as cat_father',
            'categories.level as cat_level',
            'categories.main as isMain',
            'cat.name as father'
        );
    }
    public function parents()
    {
        return $this->parent()->with('parents')->select('categories.id', 'categories.name', 'categories.level', 'categories.parent', 'cat.name as father');
    }
    public function fellow($take)
    {

        return $this->hasManyThrough('App\Models\taxonomy', 'App\Models\group_taxonomy', 'group_id', 'taxonomy_id', 'id')->join('groups as tags', 'group_id', '=', 'tags.id')->select('groupposts.*', 'groups.id as groupid')->take($take);
    }
    public function fathers()
    {
        return $this->belongsTo('App\Models\institute');
    }
    //
}
