<?php

namespace App\Http\Controllers\Social\childs;

use App\Http\Controllers\Social\parents\PostFather;

class vc extends PostFather {
    public function __construct($id = false, $place = 'VC', $placeId = null, $type = 'post') {
        parent::__construct($placeId, $type);

        $this->placeIdName = 'class_id';
        $this->placeId     = $placeId;
        $this->id          = $id;
        $this->place       = ($place == null) ? 'VC' : $place;
        $this->myModel     = 'classpost';
        $this->forgien     = 'user_id';
        if (!is_null($id)) {
            $this->Node = \App\Models\classpost::where($this->placeIdName, $id);
        } else {

            if ($placeId) {
                $this->Node = \App\Models\classpost::where($this->myModel . '.id', $placeId);
            } else {
                $this->Node = \App\Models\classpost::where($this->placeIdName, $placeId);
            }

        }
        return $this->Node;
    }
    /* To Save Vc Post */
    public function save($r) {
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
    public function add($r) {
        return $this->save($r);
    }
    /* To Select Vc Post (Get) */
    public function select() {
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
    public function edit($r) {
        return $this->update($r);
    }
    public function commentDelete($request) {
        switch ($request->place) {
        case 'file_comment':
            $class_id = 'class_id';
            $place    = 'class_files';
            break;
        case 'post_comment':
            $class_id = 'class_id';
            $place    = 'classpost';
            break;
        case 'homework_comment':
            $class_id = 'virtualclass_id';
            $place    = 'homework';
            break;
        case 'exam_comment':
            $class_id = 'virtualclass_id';
            $place    = 'exams';
            break;
        default:
            $class_id = 'class_id';
            $place    = 'classpost';
            break;
        }
        $u       = $this->me->id;
        $comment = \App\Models\comment::where('comment.id', $request->id)
            ->leftJoin($place, "$place.id", '=', 'comment.post_id')
            ->leftJoin('virtualclass', 'virtualclass.id', '=', "$place.$class_id")
            ->select(
                "$place.user_id as post_owner",
                "$place.updated_at as uu",
                'virtualclass.updated_at as vu',
                'virtualclass.instructor as instructor',
                'virtualclass.id as class_id');
        /*return*/$comments = $comment->first();
        // return (($comments));
        // die(var_dump($comments));
        $class = \App\Models\virtualclass::where('id', $comments->class_id)->first()->instructor;
        if ($u == $comments->user_id || $u == $class || $comments->post_owner == $u) {
            $deleted = \App\Models\comment::where('comment.id', $request->id)->delete();
        } else {
            $deleted = false;
        }
        if ($deleted) {
            return [
                'result' => 'deleted',
                'sucess' => true];
        } else {
            return [
                'result' => 'error',
                'sucess' => false];
        }
    }

}
