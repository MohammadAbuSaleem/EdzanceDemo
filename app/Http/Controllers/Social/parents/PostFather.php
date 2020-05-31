<?php
namespace App\Http\Controllers\Social\parents;

use App\Http\Controllers\Controller;
use \App\library\FileUpload as FileUpload;

class PostFather extends Controller
{
    public $name;
    public $me;
    public $type;
    public $place;
    public $placeId;
    public $exp;
    public $Node;
    public $child;
    public $process;
    public $myModel;
    public $placeIdName = null;
    public $forgien     = 'user_id';

    public function __construct($placeId = null, $type = null)
    {
        $this->me          = \Auth::user();
        $this->type        = ($type == null) ? '' : $type;
        $this->placeIdName = ($this->placeIdName == null) ? 'place_id' : $this->placeIdName;
        $this->placeId     = $placeId;
    }
    /* to call all function that make adding */
    public function adding($r)
    {
        $func = $this->type . 'Add';
        return $this->$func($r);
    }
    /* to call all function that make reading */
    public function reading($skip = 0, $take = 10)
    {
        $func       = $this->type . 'Read';
        $this->Node = $this->Node->skip($skip)->take($take);
        return $this->$func();
    }
    /* to get posts with Expretions */
    public function withExp()
    {
        $this->Node = $this->Node->get();
        foreach ($post as $key => $v) {
            $this->Node['present']    = $this->exp['present'];
            $this->Node['all']        = $this->exp['all'];
            $this->Node['exprission'] = $this->exp['exprission'];
            return $this->Node;
        }
    }
    /* to call all function that make selecting */
    public function selecting($skip = 0, $take = 10)
    {
        if ($this->me->allowed('social.post.read', $this->Node->first(), true, $this->forgien)) {
            echo ('authorized');
        } else {
            echo ('not authorized');
        }
        return $this->get($skip, $take);
    }
    /* to add comment to post */
    public function addComment($request)
    {
        $user = $this->me;
        $this->validate($request, [
            'body' => 'required',
        ]);
        $mainPlace        = ($request->place == "file") ? "class_files" : $request->place;
        $comment          = new \App\Models\comment;
        $comment->status  = $request->status;
        $comment->place   = $mainPlace;
        $comment->post_id = $request->post_id;
        $comment->body    = $request->body;
        $comment->user_id = $user->id;
        $comment->save();
        $place   = "\\App\\Models\\" . $mainPlace;
        $comment = \App\Models\comment::where('comment.id', $comment->id)
            ->join('users as user', 'comment.user_id', '=', 'user.id')
            ->select('comment.*', 'user.id as userid', 'user.name as name', 'user.last_name as last_name', 'user.avatar as avatar')->first();
        $type = ["classpost" => 6, "class_files" => 8, "homework" => 10, "exams" => 12, "post" => 2];
        switch ($mainPlace) {
            case "file":
            case "classpost":
            case "class_files":
            case "homework":
            case "exams":
                $classObj = $place::select("virtualclass.name", "virtualclass.id")
                    ->join("virtualclass", "virtualclass.id", "=", $mainPlace . "." . (($mainPlace == 'classpost' || $mainPlace == 'class_files') ? 'class_id' : 'virtualclass_id'))
                    ->where($mainPlace . ".id", $request->post_id)
                    ->first();
                break;
            case "post":
                $classObj = $place::where("id", $request->post_id)
                    ->first();
                break;
        }
        $notificationParams = [
            'class_name'       => $classObj->name,
            'class_id'         => $classObj->id,
            'user_id'          => $user->id,
            'post_id'          => $request->post_id,
            'user_name'        => $user->name . " " . $user->mid_name . " " . $user->last_name,
            'icon'             => $user->avatar,
            $mainPlace . '_id' => $classObj->id,
        ];
        $typeId = (isset($type[$mainPlace])) ? $type[$mainPlace] : 2;
        \App\library\notifications\Notifications::getInstance()->notifyUsers($typeId, $notificationParams);
        return compact('comment');
    }
    /* to call al comment function */
    public function commenting($id, $skip = 0, $take = 10)
    {
        return $this->commentRead($id, $skip, $take);
    }
    public function save($r)
    {
        $a            = "App\\Models\\" . $this->myModel;
        $post         = new $a;
        $r->body      = $r->textpost;
        $post->place  = $this->place;
        $temp1        = $this->placeIdName;
        $post->$temp1 = $this->placeId;
        unset($r->textpost);
        $post->body       = $r->body;
        $post->tag        = $r->tag;
        $post->media      = $r->media;
        $post->status     = 1;
        $post->mediadesc  = $r->mediadesc;
        $post->mediatitle = $r->mediatitle;
        $post->mediaimage = $r->mediaimage;
        $post->type       = $r->type;
        $forgien          = $this->forgien;
        $post->$forgien   = $this->me->id;
        $post->save();
        $this->notify($post, 1);
        return $this->one($post->id);
    }
    /* notification on post */
    public function notify($post, $type, $params = [])
    {
        $user  = $this->me;
        $param = [
            'user_id'   => $user->id,
            'post_id'   => $post->id,
            'user_name' => "$user->name $user->mid_name $user->last_name",
            'icon'      => $user->avatar,
            'post_body' => $post->body,
        ];
        foreach ($params as $key => $value) {
            $param[$key] = $value;
        }
        \App\library\notifications\Notifications::getInstance()->notifyUsers($type, $param);
    }
    /* to change exp */
    public function changeExp($id, $exp)
    {
        $notificationType  = 4;
        $notify            = [];
        $notify['emotion'] = \App\Models\post::translateExprission('ar', $exp);
        $namespace         = '\\App\\Models\\' . $this->myModel;
        $post              = $namespace::find($id);
        // $post              = $this->Node->first();
        $liker = [
            'happy'  => explode(" ", $post['happy']),
            'normal' => explode(" ", $post['normal']),
            'sad'    => explode(" ", $post['sad']),
        ];
        $user    = $this->me;
        $present = 0;
        switch ($user->id) {
            case in_array($user->id, $liker['happy']):
                $present = 'happy';
                break;
            case in_array($user->id, $liker['normal']):
                $present = 'normal';
                break;
            case in_array($user->id, $liker['sad']):
                $present = 'sad';
                break;
            default:
                break;
        }
        if ($present !== 0) {
            if ($present == $exp) {
                unset($liker[$exp][array_search($user->id, $liker[$exp])]);
                $last       = implode(" ", $liker[$exp]);
                $post[$exp] = $last;
                $post[$exp . "Count"] -= 1;
                $post->save();
                $post['present']    = $exp;
                $post['all']        = $post["happyCount"] + $post["normalCount"] + $post["sadCount"];
                $post['exprission'] = $liker;
                return $post;
            }
            unset($liker[$present][array_search($user->id, $liker[$present])]);
            $last           = implode(" ", $liker[$present]);
            $post[$present] = $last;
            $post[$present . "Count"] -= 1;
            array_push($liker[$exp], $user->id);
            $last       = implode(" ", $liker[$exp]);
            $post[$exp] = $last;
            $post[$exp . "Count"] += 1;
            $post->save();
            $post['present']    = $exp;
            $post['all']        = $post["happyCount"] + $post["normalCount"] + $post["sadCount"];
            $post['exprission'] = $liker;
            $this->notify($post, $notificationType, $notify);
        } else {
            array_push($liker[$exp], $user->id);
            $last       = implode(" ", $liker[$exp]);
            $post[$exp] = $last;
            $post[$exp . "Count"] += 1;
            $post->save();
            $post['present']    = $exp;
            $post['all']        = $post["happyCount"] + $post["normalCount"] + $post["sadCount"];
            $post['exprission'] = $liker;
            $this->notify($post, $notificationType, $notify);
        }
        return $post;
    }
    /* to add new exp */
    public function expressor($id, $exp)
    {
        $user      = $this->me;
        $namespace = '\\App\\Models\\' . $this->myModel;
        $v         = $namespace::find($id);
        $liker     = [
            'happy'  => explode(" ", $v['happy']),
            'normal' => explode(" ", $v['normal']),
            'sad'    => explode(" ", $v['sad']),
        ];
        $sad = \App\Models\User::whereIn('users.id', $liker['sad'])
            ->select('users.id', \DB::raw('CONCAT(users.name," ",users.mid_name," ",users.last_name ) AS full_name'), 'users.avatar')->get();
        $normal = \App\Models\User::whereIn('users.id', $liker['normal'])
            ->select('users.id', \DB::raw('CONCAT(users.name," ",users.mid_name," ",users.last_name ) AS full_name'), 'users.avatar')->get();
        $happy = \App\Models\User::whereIn('users.id', $liker['happy'])
            ->select('users.id', \DB::raw('CONCAT(users.name," ",users.mid_name," ",users.last_name ) AS full_name'), 'users.avatar')->get();
        foreach ($happy as $key => $value) {
            $value->isfriend = $this->isFriend($value->id);
        }
        foreach ($normal as $key => $value) {
            $value->isfriend = $this->isFriend($value->id);
        }
        foreach ($sad as $key => $value) {
            $value->isfriend = $this->isFriend($value->id);
        }
        return compact('sad', 'normal', 'happy');
    }
    /* to edit post */
    public function update($request)
    {
        $a          = "App\\Models\\" . $this->myModel;
        $post       = $a::find($request->id);
        $post->body = $request->data;
        $post->save();
        return $post;
    }
    public function textRead()
    {
        $this->Node = $this->Node->where('type', 'text');
        return $this;
    }
    public function imageRead()
    {
        $this->Node = $this->Node->where('type', 'image');
        return $this;
    }
    public function videoRead()
    {
        $this->Node = $this->Node->where('type', 'video');
        return $this;
    }
    public function urlRead()
    {
        $this->Node = $this->Node->where('type', 'url');
        return $this;
    }
    public function Read()
    {
        return $this;
    }
    public function Add($r)
    {
        return $this->save($r);
    }
    public function textAdd($r)
    {
        return $this->save($r);
    }
    public function imageAdd($request)
    {
        $type = $request->type;
        $post = $this->UploadFile('wall_post_image', $request);
        if ($post['sucess'] == true) {
            $request->media = $post['file_name'];
            $request->type  = 'image';
            return $this->save($request);
        } else {
            return ['result' => 'error', 'sucess' => false, 'message' => 'upload failed'];
        }
    }
    /* to upload file with post */
    public function UploadFile($type, $request)
    {
        $user = $this->me;
        if (!empty($user)) {
            try {
                $request->type = $type;
                $upload        = FileUpload::getInstance()->uploadFile($request);
            } catch (Exception $e) {
                return ['result' => 'error', 'sucess' => false, 'message' => 'failed to upload image'];
            }
            if ($upload['success']) {
                switch ($request->type) {
                    case 'profile_avatar':
                    case 'profile_avatar_file':
                        $user->avatar = $upload['file_path'] . $upload['file_name'];
                        $user->save();
                        // add post
                        $post = new post();
                        $post->addAvatarPost($upload['file_name'], $user->id);
                        break;
                    case 'profile_cover':
                    case 'profile_cover_file':
                        $user->showcase = $upload['file_path'] . $upload['file_name'];
                        $user->save();
                        // add post

                        $post = new post();
                        $post->addCoverPost($upload['file_name'], $user->id);
                        break;
                    case 'group_cover':
                        $group        = \App\group::where('id', $request->input('id'))->first();
                        $group->cover = $upload['file_path'] . $upload['file_name'];
                        $group->save();
                        break;
                }
                return ['file_name' => $upload['file_name'], 'file_path' => $upload['file_path'], 'file_extension' => $upload['file_extension'], 'sucess' => true];
            } else {
                return ['result' => 'error', 'sucess' => false, 'message' => $upload['message']];
            }
        }
    }
    public function videoAdd($r)
    {
        return $this->save($r);
    }
    public function urlAdd($r)
    {
        return $this->save($r);
    }
    public function newClassPostadd($r)
    {
        return $this->save($r);
    }
    public function followPostadd($r)
    {
        return $this->save($r);
    }
    public function avatarImageadd($r)
    {
        return $this->save($r);
    }
    public function coverImageadd($r)
    {
        return $this->save($r);
    }
    public function commentEdit($id, Request $r)
    {
        return $this->save($r);
    }
    public function commentDelete($request)
    {
        // die(var_dump($request->id));
        $comment = \App\Models\comment::where('id', $request->id)->delete();
        if ($comment) {
            return [
                'result' => 'deleted',
                'sucess' => true];
        } else {
            return [
                'result' => 'error',
                'sucess' => false];
        }
    }
    public function commentRead($id, $skip = 0, $take = 10)
    {

        $this->Node = $this->Node->where('id', $id)
            ->with(['comment' => function ($query) use ($skip, $take) {
                $query->skip($skip)->take($take);
            }])->first();

        if ($this->Node) {
            return $this->Node->comment;
        } else {
            return 'no post';
        }
    }
    public function get()
    {
        $args = func_get_args();
        $this->select();
        $present = "no exp";
        switch (func_num_args()) {
            case 1:
                $this->Node = $this->Node->take($args[0]);
                break;
            case 2:
                $this->Node = $this->Node->skip($args[0])->take($args[1]);
                break;
        }
        $this->Node = $this->Node->orderBy('created_at', 'desc')->get();
        foreach ($this->Node as $k => $v) {
            $liker = ['happy' => [], 'normal' => [], 'sad' => []];
            foreach ($liker as $key => $value) {
                $liker[$key] = explode(" ", $v[$key]);
                if (in_array($this->me->id, $liker[$key])) {
                    $v['present'] = $key;
                }
                if ($liker[$key][0] == "") {
                    unset($liker[$key][0]);
                }
            }
            $v['all'] = count($liker['happy']) + count($liker['normal']) + count($liker['sad']);
            unset($v['happy'],
                $v['normal'],
                $v['sad']);
            $v['exprission']             = $liker;
            $this->exp[$k]['exprission'] = $liker;
            if ($v['type'] == 'image') {
                $v['media'] = \App\library\FileUpload::getInstance()->getImageFullPath($v['media'], 'wall_post_image');
            }
            $temp1       = $this->forgien;
            $v->isfriend = $this->isFriend($v->$temp1);
        }
        if (count($this->Node) == 0) {
            return 'no post';
        }
        return $this->Node;
    }
    public function first()
    {
        $this->select();
        $this->Node = $this->Node->leftjoin('users as user', $this->myModel . '.' . $this->forgien, '=', 'user.id')->with('comment')->first();
        $liker      = ['happy' => [], 'normal' => [], 'sad' => []];
        foreach ($liker as $key => $value) {
            $liker[$key] = explode(" ", $this->Node[$key]);
            if (in_array($this->me->id, $liker[$key])) {
                $this->Node['present'] = $key;
            }

        }
        unset($this->Node['happy'],
            $this->Node['happyCount'],
            $this->Node['normal'],
            $this->Node['normalCount'],
            $this->Node['sad'],
            $this->Node['sadCount']);
        $this->Node['all']        = $this->Node["happyCount"] + $this->Node["normalCount"] + $this->Node["sadCount"];
        $this->Node['exprission'] = $liker;
        if ($this->Node['type'] == 'image') {
            $this->Node['media'] = \App\library\FileUpload::getInstance()->getImageFullPath($this->Node['media'], 'wall_post_image');
        }

        $temp1                = $this->forgien;
        $this->Node->isfriend = $this->isFriend($this->Node->$temp1);
        return $this->Node;
    }
    public function one($id)
    {
        $a          = "App\\Models\\" . $this->myModel;
        $this->Node = $a::where($this->myModel . '.id', $id)
        // ->leftjoin('users as user', $this->myModel . '.' . $this->forgien, '=', 'user.id')
            ->with('comment');
        $this->select($this->placeIdName, 'place');
        $this->Node = $this->Node->first();
        $liker      = ['happy' => [], 'normal' => [], 'sad' => []];
        foreach ($liker as $key => $value) {
            $liker[$key] = explode(" ", $this->Node[$key]);
            if (in_array($this->me->id, $liker[$key])) {
                $this->Node['present'] = $key;
            }
        }
        unset($this->Node['happy'],
            $this->Node['happyCount'],
            $this->Node['normal'],
            $this->Node['normalCount'],
            $this->Node['sad'],
            $this->Node['sadCount']);
        $this->Node['all']        = $this->Node["happyCount"] + $this->Node["normalCount"] + $this->Node["sadCount"];
        $this->Node['exprission'] = $liker;
        $temp1                    = $this->forgien;
        $this->Node->isfriend     = $this->isFriend($this->Node->$temp1);
        $image                    = FileUpload::getInstance()->getImageFullPath($this->Node->media, 'wall_post_image');
        $this->Node->media        = ($this->Node->type == 'image') ? $image : $this->Node->media;
        return $this->Node;
    }
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
            $this->myModel . '.redirect_id',
            $this->myModel . '.' . $this->forgien);
        $this->Node = $this->Node->leftjoin('users as user', $this->myModel . '.' . $this->forgien, '=', 'user.id')->with('comment')->select($args);
        return $this;
    }
    public function isFriend($id)
    {
        $IsFriend = false;
        if (!$user = \Auth::user()) {
            return false;
        }
        if ($friend = \App\Models\friends::where('id', $user->id)->where('friend_id', $id)->where('status', 'follower')->first()) {
            $IsFriend = true;
        }
        return $IsFriend;
    }
    public function arrayOrderby()
    {
        $args = func_get_args();
        $data = array_shift($args);
        foreach ($args as $n => $field) {
            if (is_string($field)) {
                $tmp = array();
                foreach ($data as $key => $row) {
                    $tmp[$key] = $row[$field];
                }
                $args[$n] = $tmp;
            }
        }
        $args[] = &$data;
        call_user_func_array('array_multisort', $args);
        return array_pop($args);
    }
    /* to call all deleting function */
    public function deleting($request)
    {
        if ($this->place == 'vc') {
            $u     = $this->me->id;
            $post  = \App\Models\classpost::where('id', $request->id);
            $posts = $post->first();
            $class = \App\Models\virtualclass::where('id', $posts->class_id)->first()->instructor;
            if ($u == $posts->user_id || $u == $class) {
                $deleted = $post->delete();
            } else {
                $deleted = false;
            }
        } else {
            // $post = $this->Node->where('id', $request->id)->delete();
            $deleted = $this->Node->where('id', $request->id)->delete();
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
