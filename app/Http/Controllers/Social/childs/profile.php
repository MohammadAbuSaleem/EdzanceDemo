<?php

namespace App\Http\Controllers\Social\childs;

use App\Http\Controllers\Social\parents\PostFather;

class profile extends PostFather
{
    public function __construct($id = false, $place = 'post', $placeId = null, $type = '')
    {
        parent::__construct($placeId, $type);
        $this->place   = ($place == null) ? 'post' : $place;
        $this->place   = 'post';
        $this->myModel = 'post';
        $this->me      = \App\Models\User::find($placeId);
        if ($id) {
            $this->Node = \App\Models\post::where('user_id', $id)->where('place', 'post');
        } else {
            if ($placeId) {
                $this->Node = \App\Models\post::where('user_id', $placeId)->where('place', 'post')->where($this->myModel . '.deleted_at', null);
            } else {
                $this->Node = \App\Models\post::where('place', 'post');
            }
        }

        return $this->Node;
    }
}
