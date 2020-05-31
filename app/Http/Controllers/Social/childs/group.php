<?php

namespace App\Http\Controllers\Social\childs;

use App\Http\Controllers\Social\parents\PostFather;

/* To Manage Post In Group */
class group extends PostFather
{
    public function __construct($id = false, $place = 'group', $placeId = null, $type = 'post')
    {
        parent::__construct($placeId, $type);
        $this->placeId     = $placeId;
        $this->placeIdName = 'place_id';
        $this->place       = ($place == null) ? 'group' : $place;
        $this->myModel     = 'post';
        $this->forgien     = 'user_id';
        if ($id) {
            $this->Node = \App\Models\post::find($id);
            if (!$this->Node) {
                $this->Node = \App\Models\post::where($this->placeIdName, $placeId);
            }

        } else {
            if ($placeId) {
                $this->Node = \App\Models\post::where($this->placeIdName, $placeId)->where($this->myModel . '.place', $this->place);
            } else {
                $this->Node = \App\Models\post::where($this->myModel . '.deleted_at', null);
            }

        }
        return $this->Node;

    }
}
