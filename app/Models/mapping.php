<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class mapping extends Model
{
    protected $connection = 'live_new';

    public function set($node)
    {
        $this->past_id = isset($node['past_id']) ? $node['past_id'] : null;
        $this->new_id  = isset($node['new_id']) ? $node['new_id'] : null;
        $this->name    = isset($node['name']) ? $node['name'] : null;
        $this->type    = isset($node['type']) ? $node['type'] : null;
        $this->save();
        return $this;
    }
    public function error($id, $type)
    {
        $past  = \DB::connection('live')->table($type)->where('id', $id)->first();
        $data  = (is_null($past)) ? ['name' => 'no name', 'old_id' => $id, 'type' => $type] : ['name' => $past->mthr_name, 'old_id' => $id, 'type' => $type];
        $error = \DB::connection('live_new')->table('map_error')->insert($data);
        return $this;
    }
    public function get($id, $type)
    {
        $map  = $this->find($id);
        $past = \DB::connection('live')->table($type)->where('id', $map->past_id)->first();
        $new  = \DB::connection('live_new')->table($type)->where('id', $map->new_id)->first();
        $last = [
            'name'    => $map->name,
            'new_id'  => $map->new_id,
            'past_id' => $map->past_id,
            'past'    => $past,
            'new'     => $new,
        ];

        return $last;
    }

}
