<?php

namespace App\Http\Controllers\Social\childs;

use App\Http\Controllers\Social\parents\PostFather;
use App\Http\Controllers\Social\parents\PostInterface;

class institute extends PostFather implements PostInterface
{
    public function __construct($id = false, $place = 'institute', $type = 'post', $placeId = null)
    {
        parent::__construct($placeId, $type);

        $this->placeIdName = 'place_id';
        $this->placeId     = $placeId;
        $this->id          = $id;
        $this->place       = ($place == null) ? 'institute' : $place;
        $this->myModel     = 'post';
        $this->forgien     = 'user_id';
        if ($id) {
            $this->Node = \App\Models\post::find($id);
            if (!$this->Node) {
                $this->Node = \App\Models\post::where($this->myModel . '.deleted_at', null)
                    ->where($this->placeIdName, $id)
                    ->where($this->myModel . '.place', $this->place)
                ;

            }
        } else {
            if ($placeId) {
                $this->Node = \App\Models\post::where($this->placeIdName, $placeId)->where($this->myModel . '.place', '\'$this->place\'');
            } else {
                $this->Node = \App\Models\post::where($this->myModel . '.deleted_at', null);
            }

        }
        return $this->Node;
    }

    /* To Save Vc Post */
    public function save($r)
    {
        $a            = "App\\Models\\" . $this->myModel;
        $post         = new $a;
        $r->body      = $r->textpost;
        $post->place  = $this->place;
        $temp1        = $this->placeIdName;
        $post->$temp1 = $this->id;
        unset($r->textpost);
        $post->body       = $r->body;
        $post->tag        = $r->tag;
        $post->media      = $r->media;
        $post->status     = 1;
        $post->mediadesc  = $r->mediadesc;
        $post->mediatitle = $r->mediatitle;
        $post->mediaimage = $r->mediaimage;
        $post->type       = $r->type;
        $temp2            = $this->forgien;
        $post->$temp2     = $this->me->id;
        $this->notify($post, 1);
        $post->save();
        return $this->one($post->id);
    }
    /* Add Vc Post */
    public function add($r)
    {
        return $this->save($r);
    }
    /* To Select Vc Post (Get) */
    public function select()
    {
        $args = func_get_args();
        array_push($args, $this->myModel . '.id',
            $this->myModel . '.body',
            $this->myModel . '.created_at',
            $this->myModel . '.happy',
            $this->myModel . '.normal',
            $this->myModel . '.sad',
            $this->myModel . '.type',
            $this->myModel . '.media',
            $this->myModel . '.mediadesc',
            $this->myModel . '.mediaimage',
            $this->myModel . '.mediatitle',
            'user.id as userid',
            $this->myModel . '.happyCount',
            $this->myModel . '.normalCount',
            $this->myModel . '.sadCount',
            'user.name as name',
            'user.last_name as last_name',
            'user.avatar as avatar',
            'user.showcase as cover',
            'user.FB_UID',
            $this->myModel . '.' . $this->forgien);
        $this->Node = $this->Node->leftjoin('users as user', $this->myModel . '.' . $this->forgien, '=', 'user.id')->with('comment')->select($args);
        return $this;
    }
    /* To Edit Vc Post */
    public function edit($r)
    {
        return $this->update($r);
    }
}
