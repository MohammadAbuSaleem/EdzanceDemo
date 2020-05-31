<?php

namespace App\Http\Controllers;

use App\classpost;
use App\class_files;
use App\comment;
use App\ContactUs;
use App\country;
use App\exam;
use App\friends;
use App\group;
use App\homework;
use App\homework_answers;
use App\messages;
use App\post;
use App\specialition;
use App\student_info;
use App\university;
use App\User;
use App\virtualclass;
use Auth;
use DB;
use Illuminate\Http\Request;
use Mail;
use Validator;
use \App\library\FileUpload as FileUpload;

class meController extends Controller
{
    public function getMe()
    {
        if (!$user = Auth::user()) {
            die('not logged in');
        }
        $user  = Auth::user();
        $users = User::where('id', $user->id)
            ->with('student_info')->with('instructor_info')
            ->with('post')->take(10)->get();
        return response()->success($users);
    }

    public function getComment($id, $place)
    {
        switch ($place) {
            case 'classpost':
                $comment = classpost::findOrFail($id)->comment;
                break;
            case 'class_files':
                $comment = class_files::findOrFail($id)->comment;
                break;
            case 'exams':
                $comment = exam::findOrFail($id)->comment;
                break;
            case 'homework':
                $comment = homework::findOrFail($id)->comment;
                break;
            case 'post':
                $comment = post::findOrFail($id)->comment;
                break;
            case 'virtualclass':
                $comment = virtualclass::findOrFail($id)->comment;
                break;
            case 'university':
                $comment = university::findOrFail($id)->comment;
                break;
            case 'specialition':
                $comment = specialition::findOrFail($id)->comment;
                break;
            case 'homework_answers':
                $comment = homework_answers::findOrFail($id)->comment;
                break;

            default:
                break;
        }

        if (!$user = Auth::user()) {
            die('not logged in');
        }
        $user = Auth::user();
        if ($comment == 'No query results for model [App\post].') {
            return response()->success('no comment');
        }
        return response()->success($comment);
    }

    public function getUniversity()
    {
        $friends = [];
        $user    = Auth::user();
        if ($user->acctype == 1) {
            $acctype = [1];
        } else {
            $acctype = [1, 2];
        }
        array_push($friends, $user->id);
        $university = university::where('id', '=', $user->university_id)->first();
        $mypost     = User::find($user->id)->friends()->select('friend_id')->get();
        foreach ($mypost as $key => $value) {
            array_push($friends, $value->friend_id);
        }
        $suggested = User::where('users.university_id', '=', $university->id)
            ->whereIn('users.acctype', $acctype)
            ->whereNotIn('users.id', $friends)
            ->join('university as univ', 'users.university_id', '=', 'univ.id')
            ->select('users.id',
                DB::raw('CONCAT(users.name," ",users.last_name ) AS name'),
                'univ.mthr_name as university',
                'users.avatar')
            ->take(10)->get();
        return response()->success($suggested);
    }

    public function getSuggested($skip = 0, $take = 10)
    {
        $friends = [];
        $user    = Auth::user();
        if ($user->acctype == 1) {
            $acctype = [1];
        } else {
            $acctype = [1, 2];
        }
        array_push($friends, $user->id);
        $university = university::where('id', '=', $user->university_id)->first();
        $mypost     = User::find($user->id)->friends()->select('friend_id')->get();
        foreach ($mypost as $key => $value) {
            array_push($friends, $value->friend_id);
        }
        $suggested = User::where('users.university_id', '=', $university->id)
            ->whereIn('users.acctype', $acctype)
            ->whereNotIn('users.id', $friends)
            ->join('university as univ', 'users.university_id', '=', 'univ.id')
            ->join('specialition as spec', 'users.specialition_id', '=', 'spec.id')
            ->select('users.id', 'univ.mthr_name as university', DB::raw('CONCAT(users.name," ",users.last_name ) AS name', 'users.acctype'), 'users.avatar as avatar', 'spec.mthr_name as specialition')
            ->take($take)->skip($skip)->get();
        foreach ($suggested as $key => $value) {
            $value->isfriend = $this->isFriend($value->id);
        }
        if (count($suggested) == 0) {
            return response()->success('no post');
        }
        return response()->success($suggested);
    }

    public function getSearch($val, $skip = 0, $take = 5)
    {
        if (!(Auth::user())) {
            $user = [];
        } else {
            $user = [Auth::user()->id];
        }
        $u = [];
        $u = User::select('users.id', 'univ.mthr_name as university', DB::raw('CONCAT(users.name," ",users.last_name ) AS name', 'users.acctype'), 'users.avatar as avatar')

            ->where('users.acctype', '=', 1)
            ->join('university as univ', 'users.university_id', '=', 'univ.id')
            ->whereRaw("(CONCAT(users.name,' ',users.mid_name,' ',users.last_name ) like '$val%')")
            ->whereNotIn('users.id', $user)
            ->take($take)->skip($skip)->get();
        foreach ($u as $key => $value) {
            $value->isfriend = $this->isFriend($value->id);
        }
        if (count($u) == 0) {
            return response()->success('no post');
        }
        return response()->success($u);
    }

    public function getPost($skip = 0, $take = 5)
    {
        if (!$user = Auth::user()) {
            die('not logged in');
        }

        $friend = [];
        $post   = [];
        $last   = [];
        $liker  = [];
        $user   = Auth::user();
        $mypost = User::find($user->id)->post()->get();
        try {
            $followpost = User::find($user->id)->friends()->get();
            foreach ($followpost as $key => $value) {
                $friend = User::find($value->friend_id)->post()->get();
                array_push($post, $friend);
                foreach ($friend as $k => $v) {
                    $present = "no exp";
                    if (strpos($v['happy'], (string) $user->id) !== false) {
                        $present = 'happy';
                    }
                    if (strpos($v['normal'], (string) $user->id) !== false) {
                        $present = 'normal';
                    }
                    if (strpos($v['sad'], (string) $user->id) !== false) {
                        $present = 'sad';
                    }
                    $v['present'] = $present;
                    $v['all']     = $v["happyCount"] + $v["normalCount"] + $v["sadCount"];
                    if ($v['type'] == 'image') {
                        $v['media'] = \App\library\FileUpload::getInstance()->getImageFullPath($v['media'], 'wall_post_image');
                    } elseif ($v['type'] == 'avatar_image') {
                        $v['media'] = \App\library\FileUpload::getInstance()->getImageFullPath($v['media'], 'profile_avatar_file');
                    } elseif ($v['type'] == 'cover_image') {
                        $v['media'] = \App\library\FileUpload::getInstance()->getImageFullPath($v['media'], 'profile_cover_file');
                    }
                    unset($v['happy'], $v['happyCount'], $v['normal'], $v['normalCount'], $v['sad'], $v['sadCount']);
                    array_push($last, $v);
                }

            }
            if (!count($followpost) == 0) {
                foreach ($mypost as $k => $v) {
                    $present = "no exp";
                    if (strpos($v['happy'], (string) $user->id) !== false) {
                        $present = 'happy';
                    }
                    if (strpos($v['normal'], (string) $user->id) !== false) {
                        $present = 'normal';
                    }
                    if (strpos($v['sad'], (string) $user->id) !== false) {
                        $present = 'sad';
                    }
                    $v['present'] = $present;
                    $v['all']     = $v["happyCount"] + $v["normalCount"] + $v["sadCount"];
                    if ($v['type'] == 'image') {
                        $v['media'] = \App\library\FileUpload::getInstance()->getImageFullPath($v['media'], 'wall_post_image');
                    } elseif ($v['type'] == 'avatar_image') {
                        $v['media'] = \App\library\FileUpload::getInstance()->getImageFullPath($v['media'], 'profile_avatar_file');
                    } elseif ($v['type'] == 'cover_image') {
                        $v['media'] = \App\library\FileUpload::getInstance()->getImageFullPath($v['media'], 'profile_cover_file');
                    }
                    unset($v['happy'], $v['happyCount'], $v['normal'], $v['normalCount'], $v['sad'], $v['sadCount']);
                    array_push($last, $v);
                }

            }
        } catch (Exception $e) {

        }

        $last = $this->arrayOrderby($last, 'created_at', SORT_DESC);
        $last = array_slice($last, $skip, $take);
        $last = $this->arrayOrderby($last, 'created_at', SORT_ASC);
        if (count($last) == 0) {
            return response()->success('no post');
        }
        return response()->success($last);
    }

    public function arrayOrderby()
    {
        if (!$user = Auth::user()) {
            die('not logged in');
        }
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

    public function getSPost($skip = 0, $take = 10)
    {
        if (!$user = Auth::user()) {
            die('not logged in');
        }
        $friend     = [];
        $post       = [];
        $user       = Auth::user();
        $followpost = friends::find($user->id)->friend();
        foreach ($followpost as $key => $value) {
            $fr     = $friend;
            $friend = User::find($key->id)->post()->orderBy('created_at', 'desc')->get();
            array_push($post, $friend);
        }
        $mypost = User::find($user->id)->post()->orderBy('created_at', 'desc')->get();
        array_push($post, $mypost);
        return response()->success($post[0]);
    }

    public function getProfile($id, $skip = 0, $take = 10)
    {
        if (!$user = Auth::user()) {
            die('not logged in');
        }
        $users       = [];
        $users['id'] = 0;
        $user        = Auth::user();
        if (!($student_info = student_info::where('user_id', $id)->first())) {
            $student_info          = new student_info;
            $student_info->user_id = $id;
            $student_info->save();
        }
        $users = User::where('users.id', $id)->isfriend()->with('post')
            ->with('student_info')->with('instructor_info')
            ->with('myclass')->with('friends')->with('followers')
            ->with('video')->with('image')
            ->leftjoin('university as univ', 'users.university_id', '=', 'univ.id')
            ->leftjoin('specialition as spec', 'users.specialition_id', '=', 'spec.id')
            ->leftjoin('college as clg', 'users.college_id', '=', 'clg.id')
            ->select('users.*', 'univ.mthr_name as university', 'spec.mthr_Description as specialition_desc', 'univ.mthr_place as university_town', 'univ.mthr_Country as university_Country', 'clg.mthr_name as college', 'spec.mthr_name as specialition')
            ->first();
        $users->isfriend = $this->isFriend($id);
        $users['itsme']  = false;
        if ($user->id == $id) {
            $users['itsme'] = true;
        }
        $users->post = User::find($id)->post()->take($take)->skip($skip)->get();

        return response()->success($users);
    }

    public function getProfilePost($id, $skip = 0, $take = 10)
    {
        if (!$user = Auth::user()) {
            die('not logged in');
        }
        $friend = [];
        $post   = [];
        $last   = [];
        $liker  = [];
        $user   = Auth::user();
        $mypost = User::find($id)->post()->get();
        array_push($post, $mypost);
        try {
            foreach ($post as $key => $value) {
                foreach ($value as $k => $v) {
                    $happy           = explode(" ", $v['happy']);
                    $sad             = explode(" ", $v['sad']);
                    $normal          = explode(" ", $v['normal']);
                    $liker['happy']  = $happy;
                    $liker['normal'] = $normal;
                    $liker['sad']    = $sad;
                    $present         = "no exp";
                    if (in_array($user->id, explode(" ", $v['happy']))) {
                        $present = 'happy';
                    }
                    if (in_array($user->id, explode(" ", $v['normal']))) {
                        $present = 'normal';
                    }
                    if (in_array($user->id, explode(" ", $v['sad']))) {
                        $present = 'sad';
                    }
                    $v['present']    = $present;
                    $v['all']        = $v["happyCount"] + $v["normalCount"] + $v["sadCount"];
                    $v['exprission'] = $liker;
                    if ($v['type'] == 'image') {
                        $v['media'] = \App\library\FileUpload::getInstance()->getImageFullPath($v['media'], 'wall_post_image');
                    } elseif ($v['type'] == 'avatar_image') {
                        $v['media'] = \App\library\FileUpload::getInstance()->getImageFullPath($v['media'], 'profile_avatar_file');
                    } elseif ($v['type'] == 'cover_image') {
                        $v['media'] = \App\library\FileUpload::getInstance()->getImageFullPath($v['media'], 'profile_cover_file');
                    }
                    array_push($last, $v);
                }
            }
        } catch (Exception $e) {
        }
        $last = $this->arrayOrderby($last, 'created_at', SORT_DESC);
        $last = array_slice($last, $skip, $take);
        $last = $this->arrayOrderby($last, 'created_at', SORT_ASC);
        if (count($last) == 0) {
            return response()->success('no post');
        }
        return response()->success($last);
    }

    public function getIsFriend($id)
    {
        $IsFriend = false;
        if (!$user = Auth::user()) {
            die('not logged in');
        }
        $user = Auth::user();
        if ($friend = friends::where('id', $user->id)->where('friend_id', $id)->where('status', 'follower')->get()) {
            $IsFriend = true;
        }
        return response()->success($IsFriend);
    }

    public function isFriend($id)
    {
        $IsFriend = false;
        if (!$user = Auth::user()) {
            die('not logged in');
        }
        if ($friend = friends::where('id', $user->id)->where('friend_id', $id)->where('status', 'follower')->first()) {
            $IsFriend = true;
        }
        return $IsFriend;
    }

    public function postTestUser(Request $request)
    {
        if (!$user = Auth::user()) {
            die('not logged in');
        }
        $sad = User::whereIn('users.id', $request->sad)->isfriend()->get();
        return response()->success(compact('sad'));
    }

    public function postExpUser(Request $request)
    {
        if (!$user = Auth::user()) {
            die('not logged in');
        }
        $v               = post::find($request->id);
        $liker['happy']  = explode(" ", $v['happy']);
        $liker['normal'] = explode(" ", $v['normal']);
        $liker['sad']    = explode(" ", $v['sad']);
        $sad             = User::whereIn('users.id', $liker['sad'])
            ->select('users.id', DB::raw('CONCAT(users.name," ",users.mid_name," ",users.last_name ) AS full_name'), 'users.avatar')->get();
        $normal = User::whereIn('users.id', $liker['normal'])
            ->select('users.id', DB::raw('CONCAT(users.name," ",users.mid_name," ",users.last_name ) AS full_name'), 'users.avatar')->get();
        $happy = User::whereIn('users.id', $liker['happy'])
            ->select('users.id', DB::raw('CONCAT(users.name," ",users.mid_name," ",users.last_name ) AS full_name'), 'users.avatar')->get();
        foreach ($happy as $key => $value) {
            $value->isfriend = $this->isFriend($value->id);
        }
        foreach ($normal as $key => $value) {
            $value->isfriend = $this->isFriend($value->id);
        }
        foreach ($sad as $key => $value) {
            $value->isfriend = $this->isFriend($value->id);
        }
        return response()->success(compact('sad', 'normal', 'happy'));
    }

    public function postPost(Request $request)
    {
        if (!$user = Auth::user()) {
            die('not logged in');
        }

        $this->validate($request, []);
        $post_words = explode(" ", $request->input('textpost'));
        $post       = new post;
        if (isset($post_words[1])) {
            $title = $post_words[0] . " " . $post_words[1];
        } else {
            $title = $post_words[0];
        }
        if (isset($post_words[2])) {
            $title = $post_words[0] . " " . $post_words[1] . " " . $post_words[2];
        } else {
        }
        $post->title      = $title;
        $post->type       = 1;
        $post->place      = 'post';
        $post->status     = 1;
        $post->body       = $request->input('textpost');
        $post->tag        = $request->input('tag');
        $post->media      = $request->input('media');
        $post->mediadesc  = $request->input('mediadesc');
        $post->mediatitle = $request->input('mediatitle');
        $post->mediaimage = $request->input('mediaimage');
        $post->type       = $request->input('type');
        $user             = Auth::user();
        $post->user_id    = $user->id;
        $post->save();
        $pst             = User::find($user->id)->post()->where('post.id', $post->id)->first();
        $happy           = explode(" ", $pst['happy']);
        $sad             = explode(" ", $pst['sad']);
        $normal          = explode(" ", $pst['normal']);
        $liker['happy']  = $happy;
        $liker['normal'] = $normal;
        $liker['sad']    = $sad;
        $present         = "no exp";
        if (in_array($user->id, explode(" ", $pst['happy']))) {
            $present = 'happy';
        }
        if (in_array($user->id, explode(" ", $pst['normal']))) {
            $present = 'normal';
        }
        if (in_array($user->id, explode(" ", $pst['sad']))) {
            $present = 'sad';
        }
        $pst['present']    = $present;
        $pst['all']        = $pst["happyCount"] + $pst["normalCount"] + $pst["sadCount"];
        $pst['exprission'] = $liker;
        if ($pst['type'] == 'image') {
            $pst['media'] = \App\library\FileUpload::getInstance()->getImageFullPath($pst['media'], 'wall_post_image');
        }

        $post = $pst;

        $notificationParams['user_id']   = $user->id;
        $notificationParams['post_id']   = $pst["id"];
        $notificationParams['user_name'] = $user->name . " " . $user->mid_name . " " . $user->last_name;
        $notificationParams['icon']      = $user->avatar;
        $notificationParams['post_body'] = $post->body;
        \App\library\notifications\Notifications::getInstance()->notifyUsers(1, $notificationParams);
        return response()->success(compact('post'));
    }

    public function postImage(Request $request)
    {
        if (!$user = Auth::user()) {
            die('not logged in');
        }
        $this->validate($request, [
            'textpost' => 'required',
        ]);
        $post           = new post;
        $post->media    = $request->input('file');
        $post->body     = $request->input('textpost');
        $post->tag      = '';
        $post->place    = 'post';
        $post->type     = 'image';
        $post->users_id = $user->id;
        $post->save();
        $pst = User::find($user->id)->post()->where('post.id', $post->id)->first();

        $post        = $pst;
        $post->media = \App\library\FileUpload::getInstance()->getImageFullPath($post['media'], 'wall_post_image');

        $notificationParams['user_id']   = $user->id;
        $notificationParams['title']     = 'منشور جديد';
        $notificationParams['post_id']   = $post->id;
        $notificationParams['user_name'] = $user->name . " " . $user->mid_name . " " . $user->last_name;
        $notificationParams['icon']      = $user->avatar;
        $notificationParams['post_body'] = $post->body;
        \App\library\notifications\Notifications::getInstance()->notifyUsers(1, $notificationParams);

        return response()->success(compact('post'));
    }

    public function postAddExprission($post, $exp, $place)
    {
        if (!$user = Auth::user()) {
            die('not logged in');
        }
        $notificationType = 4;
        $liker            = [];
        $user             = Auth::user();
        switch ($place) {
            case 'group':
            case 'post':
                $post             = post::where('id', $post)->first();
                $notificationType = 4;
                break;
            case 'classpost':
                $post             = classpost::where('id', $post)->first();
                $notificationType = 13;
                break;

            default:
                return 'no place';
                break;
        }
        $happy           = explode(" ", $post['happy']);
        $sad             = explode(" ", $post['sad']);
        $normal          = explode(" ", $post['normal']);
        $liker['happy']  = $happy;
        $liker['normal'] = $normal;
        $liker['sad']    = $sad;
        $present         = 0;
        if (in_array($user->id, $liker['happy'])) {
            $present = 'happy';
        }
        if (in_array($user->id, $liker['normal'])) {
            $present = 'normal';
        }
        if (in_array($user->id, $liker['sad'])) {
            $present = 'sad';
        }
        if ($present == ('sad' || 'normal' || 'happy')) {
            if ($present == $exp) {
                unset($liker[$exp][array_search($user->id, $liker[$exp])]);
                $last       = implode(" ", $liker[$exp]);
                $post[$exp] = $last;
                $post[$exp . "Count"] -= 1;
                $post->save();
                $post['present']    = $exp;
                $post['all']        = $post["happyCount"] + $post["normalCount"] + $post["sadCount"];
                $post['exprission'] = $liker;
                return response()->success($post);
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

            /* Notification */
            $notificationParams['user_id']   = $user->id;
            $notificationParams['post_id']   = $post['id'];
            $notificationParams['emotion']   = post::translateExprission('ar', $exp);
            $notificationParams['user_name'] = $user->name . " " . $user->mid_name . " " . $user->last_name;
            $notificationParams['icon']      = $user->avatar;
            \App\library\notifications\Notifications::getInstance()->notifyUsers($notificationType, $notificationParams);
            return response()->success($post);
        } else {
            array_push($liker[$exp], $user->id);
            $last       = implode(" ", $liker[$exp]);
            $post[$exp] = $last;
            $post[$exp . "Count"] += 1;
            $post->save();
            $post['present']    = $exp;
            $post['all']        = $post["happyCount"] + $post["normalCount"] + $post["sadCount"];
            $post['exprission'] = $liker;

            $notificationParams['user_id']   = $user->id;
            $notificationParams['post_id']   = $post['id'];
            $notificationParams['emotion']   = post::translateExprission('ar', $exp);
            $notificationParams['user_name'] = $user->name . " " . $user->mid_name . " " . $user->last_name;
            $notificationParams['icon']      = $user->avatar;
            \App\library\notifications\Notifications::getInstance()->notifyUsers($notificationType, $notificationParams);

            return response()->success($post);
        }
    }

    public function postComment(Request $request)
    {
        $typeId = 2;
        if (!$user = Auth::user()) {
            die('not logged in');
        }
        $this->validate($request, [
            'body' => 'required',
        ]);

        $comment          = new comment;
        $comment->status  = $request->input('status');
        $comment->place   = $request->input('place');
        $comment->post_id = $request->input('post_id');
        $comment->body    = $request->input('body');
        $user             = Auth::user();
        $comment->uid     = $user->id;
        $comment->save();
        $comment = comment::where('comment.id', $comment->id)
            ->join('users as user', 'comment.uid', '=', 'user.id')
            ->select('comment.*', 'user.id as userid', 'user.name as name', 'user.last_name as last_name', 'user.avatar as avatar')->first();

        switch ($request->input('place')) {
            case "classpost":
                // get class by post id
                $classObj = classpost::select("virtualclass.name", "virtualclass.id")
                    ->join("virtualclass", "virtualclass.id", "=", "classpost.class_id")
                    ->where("classpost.id", $request->input('post_id'))
                    ->first();
                $notificationParams['class_name'] = $classObj['name'];
                $notificationParams['class_id']   = $classObj['id'];
                $typeId                           = 6;
                break;
            case "class_files":
                $classObj = class_files::select("virtualclass.name", "virtualclass.id")
                    ->join("virtualclass", "virtualclass.id", "=", "class_files.class_id")
                    ->where("class_files.id", $request->input('post_id'))
                    ->first();
                $notificationParams['class_name'] = $classObj['name'];
                $notificationParams['class_id']   = $classObj['id'];
                $typeId                           = 8;
                break;
            case "homework":
                $classObj = homework::select("virtualclass.name", "virtualclass.id")
                    ->join("virtualclass", "virtualclass.id", "=", "homework.virtualclass_id")
                    ->where("homework.id", $request->input('post_id'))
                    ->first();
                $notificationParams['class_name'] = $classObj['name'];
                $notificationParams['class_id']   = $classObj['id'];
                $typeId                           = 10;
                break;
            case "exams":
                $classObj = exam::select("virtualclass.name", "virtualclass.id")
                    ->join("virtualclass", "virtualclass.id", "=", "exams.virtualclass_id")
                    ->where("exams.id", $request->input('post_id'))
                    ->first();
                $notificationParams['class_name'] = $classObj['name'];
                $notificationParams['class_id']   = $classObj['id'];
                $typeId                           = 12;
                break;
        }

        $notificationParams['user_id']   = $user->id;
        $notificationParams['post_id']   = $request->input('post_id');
        $notificationParams['user_name'] = $user->name . " " . $user->mid_name . " " . $user->last_name;
        $notificationParams['icon']      = $user->avatar;

        \App\library\notifications\Notifications::getInstance()->notifyUsers($typeId, $notificationParams);
        return response()->success(compact('comment'));
    }

    public function postCreateorupdatefollow($friend, $update = 'follower')
    {
        if (!$userAuth = Auth::user()) {
            die('not logged in');
        }
        $user = Auth::user();
        if ($friendy = friends::where('id', $user->id)->where('friend_id', $friend)->first()) {

            if ($friendy->status == 'follower' && $update == 'follower') {
                return response()->success('You are already follwing that person :)');
            }

            $friendy->status = $update;
            $friendy->save();
            $fUser = User::where('id', $friendy->friend_id)->first();

            if ($update == "follower") {
                $notificationParams['user_id']          = $userAuth->id;
                $notificationParams['user_name']        = $userAuth->name . " " . $userAuth->mid_name . " " . $userAuth->last_name;
                $notificationParams['icon']             = $userAuth->avatar;
                $notificationParams['followed_user_id'] = $friend;
                \App\library\notifications\Notifications::getInstance()->notifyUsers(3, $notificationParams);

            }
            $friendName = $fUser->name . " " . $fUser->mid_name . " " . $fUser->last_name;
            post::addFollowPost($user->id, $friend, $friendName, $fUser->avatar);
            return response()->success($fUser);
        }

        $friendy            = new friends;
        $friendy->id        = $user->id;
        $friendy->friend_id = $friend;
        $friendy->status    = $update;
        $friendy->save();
        $fUser = User::where('id', $friendy->friend_id)->first();

        $notificationParams['user_id']          = $userAuth->id;
        $notificationParams['user_name']        = $userAuth->name . " " . $userAuth->mid_name . " " . $userAuth->last_name;
        $notificationParams['icon']             = $userAuth->avatar;
        $notificationParams['followed_user_id'] = $friend;
        \App\library\notifications\Notifications::getInstance()->notifyUsers(3, $notificationParams);

        $friendName = $fUser->name . " " . $fUser->mid_name . " " . $fUser->last_name;
        post::addFollowPost($user->id, $friend, $friendName, $fUser->avatar);
        return response()->success($fUser);
    }

    public function postCreateorupdatefollower($friend, $update = 'follower')
    {
        if (!$user = Auth::user()) {
            die('not logged in');
        }
        $user = Auth::user();
        if ($friendy = friends::where('friend_id', $user->id)->where('id', $friend)->first()) {
            if ($friendy->status == 'follower' && $update == 'follower') {
                return response()->success('You are already follwing that person :)');
            }

            $friendy->status = $update;
            $friendy->save();
            $user = User::where('id', $friendy->id)->first();

            return response()->success($user);
        }

        $friendy            = new friends;
        $friendy->id        = $user->id;
        $friendy->friend_id = $friend;
        $friendy->status    = $update;
        $friendy->save();
        $user = User::where('id', $friendy->friend_id)->first();

        return response()->success($user);
    }

    public function putMe(Request $request)
    {
        if (!$user = Auth::user()) {
            die('not logged in');
        }
        $user = Auth::user();

        $this->validate($request, [
            'data.name'  => 'required|min:3',
            'data.email' => 'required|email|unique:users,email,' . $user->id,
        ]);

        $userForm = app('request')
            ->only(
                'data.current_password', 'data.new_password', 'data.new_password_confirmation', 'data.name', 'data.email'
            );

        $userForm    = $userForm['data'];
        $user->name  = $userForm['name'];
        $user->email = $userForm['email'];

        if ($request->has('data.current_password')) {
            Validator::extend('hashmatch', function ($attribute, $value, $parameters) {
                return Hash::check($value, Auth::user()->password);
            });

            $rules = [
                'data.current_password'          => 'required|hashmatch:data.current_password',
                'data.new_password'              => 'required|min:8|confirmed',
                'data.new_password_confirmation' => 'required|min:8',
            ];

            $payload = app('request')->only('data.current_password', 'data.new_password', 'data.new_password_confirmation');

            $messages = [
                'hashmatch' => 'Invalid Password',
            ];

            $validator = app('validator')->make($payload, $rules, $messages);

            if ($validator->fails()) {
                return response()->error($validator->errors());
            } else {
                $user->password = Hash::make($userForm['new_password']);
            }
        }

        $user->save();

        return response()->success('success');
    }

    public function postPostUpdate(Request $request)
    {
        if (!$user = Auth::user()) {
            die('not logged in');
        }
        $post = post::where('id', $request->input('id'))->first();
        if (!($post->users_id == $user->id)) {
            die('not authorized');
        }
        $post->body = $request->input('data');
        $post->save();
        return response()->success($post);
    }

    public function postDelPost(Request $request)
    {
        if (!$user = Auth::user()) {
            die('not logged in');
        }
        $user = Auth::user();
        $post = post::where('id', $request->input('id'))->first();
        if (!($post->users_id == $user->id)) {
            die('not authorized');
        }
        $deletedRows = post::where('id', $request->input('id'))->delete();
        return response()->success('success');
    }

    public function getMessages($friend)
    {
        return response()->success(Auth::check());
        return $user = Auth::user();
        $messages    = messages::where('sender_id', $user->id)
            ->orWhere('sender_id', $friend)
            ->orWhere('reciever_id', $friend)
            ->orWhere('reciever_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get();
        return response()->success($messages);
    }

    public function postDelNode(Request $request)
    {
        if (!$user = Auth::user()) {
            die('not logged in');
        }
        $user = Auth::user();

        $comment = false;
        switch ($request->place) {
            case 'comment':

                break;
            case 'class_files':
                $comment = class_files::where('id', $request->input('id'))->first();
                if (!($user->acctype == 2)) {
                    die('not authorized');
                }
                $comment = class_files::where('id', $request->input('id'))->delete();

                break;
            case 'exam':
                $comment = exam::where('id', $request->input('id'))->first();
                if (!($user->acctype == 2)) {
                    die('not authorized');
                }
                $comment = exam::where('id', $request->input('id'))->delete();

                break;
            case 'homework':
                $comment = homework::where('id', $request->input('id'))->first();
                if (!($user->acctype == 2)) {
                    die('not authorized');
                }

                $comment = homework::where('id', $request->input('id'))->delete();

                break;
            case 'group':
            case 'post':
                $comment = post::where('id', $request->input('id'))->first();

                if (!($comment->users_id == $user->id)) {
                    die('not authorized');
                }

                $comment = post::where('id', $request->input('id'))->delete();

                break;
            case 'virtualclass':
                $comment = virtualclass::where('id', $request->input('id'))->first();
                if (!($comment->users_id == $user->id)) {
                    die('not authorized');
                }

                $comment = comment::where('id', $request->input('id'))->delete();

                break;
            case 'university':
                $comment = university::where('id', $request->input('id'))->first();
                if (!($comment->users_id == $user->id)) {
                    die('not authorized');
                }

                $comment = comment::where('id', $request->input('id'))->delete();

                break;
            case 'specialition':
                $comment = specialition::where('id', $request->input('id'))->first();
                if (!($comment->users_id == $user->id)) {
                    die('not authorized');
                }

                $comment = comment::where('id', $request->input('id'))->delete();

                break;
            case 'homework_answers':
                $comment = homework_answers::where('id', $request->input('id'))->first();
                if (!($comment->users_id == $user->id)) {
                    die('not authorized');
                }

                $comment = comment::where('id', $request->input('id'))->delete();

                break;

            default:
                return response()->success([
                    'result' => 'error',
                    'sucess' => false]);
                break;
        }
        if ($comment) {
            return response()->success([
                'result' => 'deleted',
                'sucess' => true]);
        } else {
            return response()->success([
                'result' => 'error',
                'sucess' => false]);
        }
    }

    public function getRemail()
    {
        try {
            if (!$user = Auth::user()) {
                die('not logged in');
            }
            $verificationCode               = str_random(40);
            $user->email_verification_code  = $verificationCode;
            $user->active_verification_code = 1;

            $user->save();
            Mail::send('emails.userverification', [
                'verificationCode' => $user->email_verification_code,
                'user'             => $user->name . ' ' . $user->last_name,
                'email'            => $user->email,
            ], function ($message) use ($user) {
                $message->from('noreplay@ed-zance.com', 'ادزانس');
                $message->to($user->email, 'القادم الجديد')->subject('تفعيل حسابك في ادزانس');
            });
            return response()->success(['result' => 'تم ارسال الايميل بنجاح', 'sucess' => true]);
        } catch (Exception $e) {
            return response()->success(['result' => 'حدث خطأ الرجاء اعادة المحاولة', 'sucess' => false]);
        }
    }

    public function postCheckMail(Request $request)
    {
        if (!$user = Auth::user()) {
            die('not logged in');
        }
        $this->validate($request, [
            'email' => 'required|email|unique:users',
        ]);
        return response()->success(['result' => 'هذا الايميل متوفر', 'sucess' => true]);
    }

    public function ChangeCover(Request $request)
    {

        $path = 'upload/profile/cover/' . md5(time()) . $request->input('id') . '.jpg';
        if (!$user = Auth::user()) {
            die('not logged in');
        }

        $ii             = Image::make($request->file('file'))->save($path);
        $user->showcase = $path;
        $user->save();
        return response()->success($path);
    }

    public function postChangeAvatar(Request $request)
    {
        $path = 'upload/profile/avatar/' . md5(time()) . $request->input('id') . '.jpg';

        if (!$user = Auth::user()) {
            die('not logged in');
        }

        $ii = Image::make($request->input('cropped'))->encode('jpg')->save($path);

        $user->avatar = $path;
        $user->save();
        return response()->success($request->input('cropped'));

    }

    public function postChangeMail(Request $request)
    {
        try {
            if (!$user = Auth::user()) {
                die('not logged in');
            }
            $this->validate($request, [
                'email' => 'required|email|unique:users',
            ]);
            $user->email      = $request->email;
            $user->updated_at = date('Y-m-d H:i:s');
            $user->save();
            Mail::send('emails.userverification', [
                'verificationCode' => $user->email_verification_code,
                'user'             => $user->name . ' ' . $user->last_name,
                'email'            => $user->email,
            ], function ($message) use ($user) {
                $message->from('noreplay@ed-zance.com', 'ادزانس');
                $message->to($user->email, 'القادم الجديد')->subject('تفعيل حسابك في ادزانس');
            });
            return response()->success([
                'result' => 'تم تغيير البريد الالكتروني بنجاح   قم بفحص بريدك الالكتروني لاتمام عملية تفعيل حسابك',
                'sucess' => true]);
        } catch (Exception $e) {
            return response()->success([
                'result' => 'حدث خطأ الرجاء اعادة المحاولة',
                'sucess' => false]);
        }
    }

    /**
     *
     * @param Request $request
     * @return type
     * @author Ahmad Hajeer
     */
    public function ContactUs(Request $request)
    {
        $user = Auth::user();
        $this->validate($request, [
            'title'       => 'required',
            'description' => 'required',
        ]);
        $contactUs              = new ContactUs();
        $contactUs->user_id     = $user->id;
        $contactUs->title       = $request->title;
        $contactUs->description = $request->description;
        $contactUs->created_at  = date("Y-m-d H:i:s");
        if (isset($request->upload[0])) {
            $contactUs->file = $request->upload[0];
        }
        $contactUs->save();
        return response()->success($contactUs);
    }

    /**
     *
     * @return type
     * @author Ahmad Hajeer
     */
    public function getContactUsMessages($skip, $take)
    {
        $user            = Auth::user();
        $contactMessages = ContactUs::select("title", "description", "comment", "created_at", "file", "comment_date")->where('user_id', $user->id)->take($take)->skip($skip)->get();
        if (count($contactMessages) == 0) {
            return response()->success('no post');
        }
        return response()->success($contactMessages);
    }

    public function postReportFile(Request $request)
    {
        $filename    = $_FILES['file']['name'];
        $meta        = 'upload/contact_us/';
        $destination = $meta . $filename;
        $filename    = $_FILES['file']['name'];
        $ext         = pathinfo($filename, PATHINFO_EXTENSION);
        $pdf         = $_FILES['file']['tmp_name'];
        move_uploaded_file($pdf, $destination);
        $return = [$destination, $ext];
        return response()->success($return);
    }
    /**
     *
     * @param type $skip
     * @param type $take
     * @return type
     * @author Ahmad Hajeer
     */
    public function getUserNotifications($skip, $take)
    {
        $user = Auth::user();
        if (!empty($user)) {
            $notifications = \App\Models\notification::select("seen", "body", "title", "type_id", "redirect_type", "redirect_id", "created_at", "link", "icon")->where('receiver_id', "=", $user->id)->orderBy("id", "desc")->take($take)->skip($skip)->get();
            $notifications = $notifications->toArray();
            if (!empty($notifications)) {
                return response()->success($notifications);
            } else {
                return response()->success('no post');
            }
        }
    }

    public function postSeenNotifications(Request $request)
    {
        $user       = Auth::user();
        $updateSeen = \App\Models\notification::where("receiver_id", "=", $user->id)->where('seen', "=", 0)->update(['seen' => 1]);
        return response()->success([]);
    }

    public function postResetNotificationsToken(Request $request)
    {

        $user = Auth::user();
        if (!empty($user)) {
            // get session id
            $sessionId = $request->cookie('notifications_key');
            $token     = \App\library\notifications\Models\Notifications::getInstance()->updateUserToken($user->id, $request->token, "update", $request->platform, $sessionId);
            return response()->success([$token]);
        }
        return response()->failed($token);
    }

    public function getPostPage($postId)
    {

        $user = Auth::user();
        if (!empty($user)) {
            // get post by id
            $postClass = new \App\post();
            $post      = $postClass->getPostInfo($postId);
            if (!empty($post)) {

                $happy           = explode(" ", $post[0]['happy']);
                $sad             = explode(" ", $post[0]['sad']);
                $normal          = explode(" ", $post[0]['normal']);
                $liker['happy']  = $happy;
                $liker['normal'] = $normal;
                $liker['sad']    = $sad;
                $present         = "no exp";
                if (in_array($user->id, explode(" ", $post[0]['happy']))) {
                    $present = 'happy';
                }

                if (in_array($user->id, explode(" ", $post[0]['normal']))) {
                    $present = 'normal';
                }

                if (in_array($user->id, explode(" ", $post[0]['sad']))) {
                    $present = 'sad';
                }

                $post[0]['present']    = $present;
                $post[0]['all']        = $post[0]["happyCount"] + $post[0]["normalCount"] + $post[0]["sadCount"];
                $post[0]['exprission'] = $liker;
                if ($post[0]['type'] == 'image') {
                    $post[0]['media'] = \App\library\FileUpload::getInstance()->getImageFullPath($post[0]['media'], 'wall_post_image');
                } elseif ($post[0]['type'] == 'cover_image') {
                    $post[0]['media'] = \App\library\FileUpload::getInstance()->getImageFullPath($post[0]['media'], 'profile_cover_file');
                } elseif ($post[0]['type'] == 'avatar_image') {
                    $post[0]['media'] = \App\library\FileUpload::getInstance()->getImageFullPath($post[0]['media'], 'profile_avatar_file');
                }

                return response()->success($post);
            } else {
                return response()->failed(["no post"]);
            }
        }
    }

    public function postUploadFile($type, Request $request)
    {
        $user = Auth::user();
        if (!empty($user)) {
            try {
                $request->type = $type;
                $upload        = FileUpload::getInstance()->uploadFile($request, $user->acctype, $user->id);
            } catch (Exception $e) {
                return response()->failed(['result' => 'error', 'sucess' => false, 'message' => 'failed to upload image']);
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
                        $post = new post();
                        $post->addCoverPost($upload['file_name'], $user->id);
                        break;
                    case 'group_cover':
                        $group        = \App\group::where('id', $request->input('id'))->first();
                        $group->cover = $upload['file_path'] . $upload['file_name'];
                        $group->save();
                        break;
                }
                return response()->success(['file_name' => $upload['file_name'], 'file_path' => $upload['file_path'], 'file_extension' => $upload['file_extension']]);
            } else {
                return response()->failed(['result' => 'error', 'sucess' => false, 'message' => $upload['message']]);
            }
        }
    }

    public function getProfileWall($id)
    {
        $users = User::select(["users.id", "users.DOB as birthdate", "users.sex", "student_info.country", DB::raw("concat(specialition.mthr_name, ' في ', university.mthr_name, ' - ', university.mthr_place) as specialization"), DB::raw("concat(users.name, ' ', users.mid_name, ' ', users.last_name) as name")])
            ->leftjoin("specialition", "users.specialition_id", "=", "specialition.id")
            ->leftjoin("university", "users.university_id", "=", "university.id")
            ->leftjoin("student_info", "users.id", "=", "student_info.user_id")
            ->where('users.id', $id)
            ->with("profileFollowers")
            ->with("profileFriends")
            ->with("profilePostsImages")
            ->with("profilePostsVideos")
            ->with("profileFollowersCount")
            ->with("profileFriendsCount")
            ->first();
        $users                            = $users->toArray();
        $users['profile_followers_count'] = isset($users['profile_followers_count'][0]['count']) ? $users['profile_followers_count'][0]['count'] : 0;
        $users['profile_friends_count']   = isset($users['profile_friends_count'][0]['count']) ? $users['profile_friends_count'][0]['count'] : 0;
        return response()->success($users);
    }

    // public function getProfileCv($id){
    //     $user = Auth::user();
    //     $selectParams = array(
    //     //            DB::raw("concat(users.name, ' ', users.mid_name, ' ', users.last_name) as name"),
    //         'users.name',
    //         'users.mid_name',
    //         'users.last_name',
    //         'users.sex',
    //         'users.DOB',
    //         'users.email',
    //         'users.telephone',
    //         'users.facebook',
    //         'users.twitter',
    //         'users.skype',
    //         'users.linkedin',
    //         'university.mthr_name as university_name',
    //         'college.mthr_name as college_name',
    //         'specialition.mthr_name as specialition_name',
    //         'country.country_arabic as university_country',
    //         'student_info.skills',
    //         'student_info.concerns',
    //         'student_info.country as student_country',
    //         'student_info.hobbies',
    //         'student_info.languages',
    //         'student_info.university_id',
    //         'student_info.specialition_desc',
    //         'student_info.university_start',
    //         'student_info.university_end',
    //         'student_info.school',
    //         'student_info.school_town',
    //         'student_info.school_end',
    //         'users.acctype',
    //         'instructor_info.avilablefrom as available_from',
    //         'instructor_info.avilableto as available_to',

    //     );
    //     $users = User::select($selectParams)
    //             ->where('users.id', $id)
    //             ->leftjoin("university", "users.university_id", "=", "university.id")
    //             ->leftjoin("college", "users.college_id", "=", "college.id")
    //             ->leftjoin("specialition", "users.specialition_id", "=", "specialition.id")
    //             ->leftjoin("student_info", "users.id", "=", "student_info.user_id")
    //             ->leftjoin("country", "university.country_id", "=", "country.id")
    //             ->leftjoin("instructor_info", "instructor_info.ins_id", "=", "users.id")
    //             ->first();

    //     $users = $users->toArray();
    //     $users['instructor_education'] = \App\InstructorEducation::select("instructor_education.*", "country.country_arabic as country_name")->where("user_id", $id)
    //             ->leftjoin("country", "instructor_education.country_id", "=", "country.id")
    //             ->get();

    //     // $users = $users->toArray();

    //     // get doctor free hours
    //     if($user->acctype == 2 && !empty($users)){
    //         $freeHours = \App\InstructorFreeHours::where("user_id", $user->id)->get();
    //         $objects = array();
    //         $formattedArray = array();
    //         foreach ($freeHours as $freeHour){
    //             $key = $freeHour['from_hour'].$freeHour["to_hour"];
    //             $objects[$key]['days'][] = $freeHour['day'];
    //             $objects[$key]['from_hour'] = $freeHour['from_hour'];
    //             $objects[$key]['to_hour'] = $freeHour['to_hour'];
    //             $objects[$key]['id'] = $freeHour['group_id'];

    //         }
    //         foreach ($objects as $object){
    //          $formattedArray[] = $object;
    //         }

    //         $users['free_hours'] = $formattedArray;
    //     }
    //     return response()->success($users);
    // }

    public function getProfileHeader($id)
    {
        $user  = Auth::user();
        $users = User::select([DB::raw("concat(users.name, ' ', users.mid_name, ' ', users.last_name) as name"), "users.id", "users.FB_UID", "users.avatar", "users.showcase", "users.acctype", "users.email_verified as active", "friends.id as isfriend"])
            ->leftjoin('friends', function ($join) use ($user) {
                $join->on('friends.friend_id', '=', "users.id")
                    ->where('friends.id', '=', $user->id)
                    ->where('friends.status', '=', "follower");
            })
            ->where('users.id', "=", $id)->first();

        if (empty($users)) {
            return response()->failed(['result' => 'error', 'sucess' => false, 'message' => 'not_exists_user']);
        }
        $users             = $users->toArray();
        $users['isfriend'] = $users['isfriend'] == null ? false : true;
        $users['itsme']    = $users['id'] == $user->id ? true : false;

        return response()->success($users);
    }

    public function getProfileFollowers($id, $skip = 0, $take = 10)
    {
        $user      = Auth::user();
        $followers = friends::select([DB::raw("concat(users.name, ' ', users.mid_name,' ', users.last_name) as name"), "users.id", "users.avatar", "f2.id as isfriend", "friends.created_at"])
            ->join("users", "users.id", "=", "friends.id")
            ->leftjoin('friends as f2', function ($join) use ($user) {
                $join->on('f2.friend_id', '=', "users.id")
                    ->where('f2.id', '=', $user->id)
                    ->where('f2.status', '=', "follower");
            })
            ->where("friends.friend_id", $id)
            ->where('friends.status', '=', "follower")
            ->take($take)->skip($skip)->get();

        $followers = $followers->toArray();
        if (empty($followers)) {
            return response()->success(["no post"]);
        } else {
            foreach ($followers as $key => $follower) {
                if ($follower['isfriend'] == $user->id) {
                    $followers[$key]['isfriend'] = true;
                } else {
                    $followers[$key]['isfriend'] = false;
                }
            }
        }

        return response()->success($followers);
    }

    public function getProfileFriends($id, $skip = 0, $take = 10)
    {
        $user      = Auth::user();
        $followers = friends::select([DB::raw("concat(users.name, ' ', users.mid_name, ' ', users.last_name) as name"), "users.id", "users.avatar", "f2.id as isfriend", "friends.created_at"])
            ->join("users", "users.id", "=", "friends.friend_id")
            ->leftjoin('friends as f2', function ($join) use ($user) {
                $join->on('f2.friend_id', '=', "users.id")
                    ->where('f2.id', '=', $user->id)
                    ->where('f2.status', '=', "follower");
            })
            ->where("friends.id", $id)
            ->where('friends.status', '=', "follower")
            ->take($take)->skip($skip)->get();
        $followers = $followers->toArray();
        if (empty($followers)) {
            return response()->success(["no post"]);
        } else {
            foreach ($followers as $key => $follower) {
                if ($follower['isfriend'] == $user->id) {
                    $followers[$key]['isfriend'] = true;
                } else {
                    $followers[$key]['isfriend'] = false;
                }
            }
        }
        return response()->success($followers);
    }

    public function getUserClasses($id, $skip = 0, $take = 10)
    {
        $classes = \App\classusers::select('vc.name', 'ins.id', 'ins.avatar', 'ins.name as u_name', 'vc.class_hall', 'vc.days', 'vc.from', 'vc.to')
            ->join('virtualclass as vc', 'classusers.class_id', '=', 'vc.id')
            ->leftjoin('users as ins', 'ins.id', '=', 'vc.instructor')
            ->where("classusers.uid", $id)
            ->take($take)->skip($skip)->get();
        if (empty($classes->toArray())) {
            return response()->success(["no post"]);
        }
        return response()->success($classes);
    }

    public function postAddInstructorEducation(Request $request)
    {
        $user = Auth::user();
        if (!empty($user)) {
            $this->validate($request, [
                'grade'          => 'required',
                'specialization' => 'required',
                'country_id'     => 'required',
                'start_year'     => 'required',
                'end_year'       => 'required',
            ]);
            $instructorEducation                  = new \App\InstructorEducation;
            $instructorEducation->grade           = $request->grade;
            $instructorEducation->specialization  = $request->specialization;
            $instructorEducation->country_id      = $request->country_id;
            $instructorEducation->start_year      = $request->start_year;
            $instructorEducation->end_year        = $request->end_year;
            $instructorEducation->user_id         = $user->id;
            $instructorEducation->university_name = $request->university_name;
            $instructorEducation->save();

            return response()->success($instructorEducation);
        } else {
            return response()->failed();
        }
    }

    public function postUpdateInstructorEducation(Request $request)
    {
        $user = Auth::user();
        $this->validate($request, [
            'id' => 'required',
        ]);
        if (!empty($user)) {
            $instructorEducation = \App\InstructorEducation::where('id', $request->id)->first();

            if (isset($request->grade) && !empty($request->grade)) {
                $instructorEducation->grade = $request->grade;
            }
            if (isset($request->specialization) && !empty($request->specialization)) {
                $instructorEducation->specialization = $request->specialization;
            }
            if (isset($request->country_id) && !empty($request->country_id)) {
                $instructorEducation->country_id = $request->country_id;
            }
            if (isset($request->start_year) && !empty($request->start_year)) {
                $instructorEducation->start_year = $request->start_year;
            }
            if (isset($request->end_year) && !empty($request->end_year)) {
                $instructorEducation->end_year = $request->end_year;
            }

            if (isset($request->university_name) && !empty($request->university_name)) {
                $instructorEducation->university_name = $request->university_name;
            }
            $instructorEducation->save();
            return response()->success($instructorEducation);
        } else {
        }
    }

    public function postDeleteInstructorEducation(Request $request)
    {
        $this->validate($request, [
            'id' => 'required',
        ]);
        \App\InstructorEducation::where('id', $request->id)->delete();
        return response()->success([]);
    }

    public function getGetCountriesList()
    {
        $countries = country::select("country_arabic", "id")->withTrashed()->get();
        return response()->success($countries);
    }

    public function postUpdateAvailableTime(Request $request)
    {
        $user           = Auth::user();
        $instructorInfo = \App\instructor_info::where("ins_id", $user->id)->first();
        if (isset($request->available_from) && !empty($request->available_from)) {
            $instructorInfo->avilablefrom = $request->available_from;
        }
        if (isset($request->available_to) && !empty($request->available_to)) {
            $instructorInfo->avilableto = $request->available_to;
        }
        $instructorInfo->save();
        return response()->success($instructorInfo);
    }

    public function postAddInstructorFreeHours(Request $request)
    {
        $user = Auth::user();
        if (!empty($user)) {
            $this->validate($request, [
                'days'      => 'required',
                'from_hour' => 'required',
                'to_hour'   => 'required',
            ]);

            $objectsArray = array();
            $daysArray    = $request->days;

            $characters       = '0123456789';
            $charactersLength = strlen($characters);
            $randomString     = '';
            for ($i = 0; $i < 10; $i++) {
                $randomString .= $characters[rand(0, $charactersLength - 1)];
            }

            $groupId = $randomString;
            foreach ($daysArray as $day) {
                $object['day']       = $day;
                $object['user_id']   = $user->id;
                $object['from_hour'] = $request->from_hour;
                $object['to_hour']   = $request->to_hour;
                $object['group_id']  = $groupId;
                $objectsArray[]      = $object;
            }
            \App\InstructorFreeHours::insert($objectsArray);
            return response()->success(["id" => $groupId]);
        }
    }

    public function getGetInstructorFreeHours()
    {
        $user           = Auth::user();
        $freeHours      = \App\InstructorFreeHours::where("user_id", $user->id)->get();
        $objects        = array();
        $formattedArray = array();
        foreach ($freeHours as $freeHour) {
            $key                        = $freeHour['from_hour'] . $freeHour["to_hour"];
            $objects[$key]['days'][]    = $freeHour['day'];
            $objects[$key]['from_hour'] = $freeHour['from_hour'];
            $objects[$key]['to_hour']   = $freeHour['to_hour'];
            $objects[$key]['id']        = $freeHour['group_id'];
            $formattedArray             = $objects[$key];
        }
        foreach ($objects as $object) {
            $formattedArray[] = $object;
        }
        return response()->success($formattedArray);
    }

    public function postDeleteFreeHours(Request $request)
    {
        $this->validate($request, [
            'id' => 'required',
        ]);
        \App\InstructorFreeHours::where("group_id", $request->id)->delete();
        return response()->success([]);
    }

    public function postCheckUnseenNotifications(Request $request)
    {
        $this->validate($request, [
            'count' => 'required',
        ]);
        $user = Auth::user();

        $count  = \App\notification::where('receiver_id', "=", $user->id)->where('seen', "=", 0)->count();
        $unseen = $count - $request->count;
        if ($unseen > 0) {
            $notifications = \App\notification::select("seen", "body", "title", "type_id", "redirect_type", "redirect_id", "created_at", "link", "icon")->where('receiver_id', "=", $user->id)->orderBy("id", "desc")
                ->limit($unseen)->get();
            $notifications = $notifications->toArray();
        } else {
            return response()->success(['unseen' => $count, 'notifications' => []]);
        }

        return response()->success(['unseen' => $count, 'notifications' => $notifications]);
    }
}
