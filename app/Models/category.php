<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class category extends Model
{
    protected $table = 'categories';
    public function taxonomies()
    {
        return $this->morphToMany(__NAMESPACE__ . '\taxonomy', 'taggable')->select('taxonomies.id', 'taxonomies.body');
    }
    public function childs()
    {
        return $this->child()->with('childs');

        $query->where($this->table . '.main', 1);

    }
    public function child()
    {
        $q = $this->hasMany(__NAMESPACE__ . '\category', 'parent', 'id')
            ->leftjoin($this->table . ' as cat', $this->table . '.parent', '=', 'cat.id')
            ->addSelect($this->table . '.*', 'cat.name as father');
        return $q;
    }
    public function parent()
    {
        return $this->belongsTo(__NAMESPACE__ . '\category', 'parent', 'id')
            ->leftjoin($this->table . ' as cat', $this->table . '.parent', '=', 'cat.id')->select($this->table . '.id',
            $this->table . '.name as cat_name',
            $this->table . '.parent as cat_father',
            $this->table . '.level as cat_level',
            $this->table . '.main as isMain',
            'cat.name as father'
        );
    }
    public function parents()
    {
        return $this->parent()->with('parents')->select($this->table . '.id', $this->table . '.name', $this->table . '.level', $this->table . '.parent', 'cat.name as father');
    }
    public function fellow($take)
    {

        return $this->hasManyThrough(__NAMESPACE__ . '\taxonomy', 'App\Models\group_taxonomy', 'group_id', 'taxonomy_id', 'id')->join('groups as tags', 'group_id', '=', 'tags.id')->select('groupposts.*', 'groups.id as groupid')->take($take);
    }

}
