<?php

namespace App\Http\Controllers\Social\childs;

use App\Http\Controllers\Social\parents\PostFather;

class home extends PostFather
{
    public function __construct($id = false, $place = 'post', $placeId = null, $type)
    {
        parent::__construct($placeId, $type);
        $this->myModel = 'post';
        $this->place   = 'post';
        if ($id) {
            $this->Node = \App\Models\post::find($id);
        } else {
            $this->Node = \App\Models\post::where('place', 'post')
                ->where(function ($query) {
                    $query->whereIn('post.user_id', function ($query) {
                        $query->select('friend_id')
                            ->from('friends')
                            ->where('friends.id', $this->me->id);
                    })->orWhere('post.user_id', $this->me->id);
                });
        }
        return $this->Node;
    }
    public function deleting($request)
    {
        $post = $this->Node->where('id', $request->id)->first();
        if ($post->user_id == $this->me->id) {
            if ($post->delete()) {
                return ['result' => 'deleted', 'sucess' => true];
            } else {
                return ['result' => 'error', 'sucess' => false];
            }
        } else {
            return ['result' => 'unautharized', 'sucess' => false];
        }
    }
}
