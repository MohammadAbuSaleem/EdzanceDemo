<?php

namespace App\Http\Controllers\Classes;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use \DB;
use Auth;
use App\Models\User;
use App\Models\classpost;
use App\Models\comment;
use App\Models\post as post;
use Intervention\Image\ImageManagerself as Image;
use \JWTAuth;
class Posts extends Controller {
    protected  $me ='No Data Yet';
    protected static $instance =null;
    public function __construct()
    {
        $this->me = Auth::user();
        return $this;
    } 
    public static function getInstance() {
        if (self::$instance == null) {
            self::$instance = new Posts();
        }
        return self::$instance;
    }
    public function delClassPost($request)
    {
         $classpost = classpost::find($request->id);
         $classpost->user_me = $this->me->id;
            if ($this->me->allowed('virual.class.post.delete', $classpost)) {
                die('authorized');
            }else{
                 die('not authorized');
            }
         if ($classpost) {
            return response()->success([
                        'result' => 'deleted',
                        'sucess' => true]);
         } else {
            return response()->success([
                        'result' => 'error',
                        'sucess' => false]);
         }
    }
    public function delPost($request, $place)
    {
         $a = 'App\\Models\\'.$place;
         $Node = $a::find($request->id);
         
         $Node = $Node ? $Node : 'no Record';
         if ($Node == 'no Record'){
            return 'no Record';
         }
         
            if ($this->me->allowed('social.post.delete', $Node,true,'users_id')) {
                dd($Node);
          
            }else{
              
                 die('not authorized');
            }
         if ($classpost) {
            return response()->success([
                        'result' => 'deleted',
                        'sucess' => true]);
         } else {
            return response()->success([
                        'result' => 'error',
                        'sucess' => false]);
         }
    }
    public function comments($id, $place)
    {
            $a = 'App\\Models\\'.$place;
            $comment = $a::find($id);
            $comment = $comment ? $comment->comment : 'no comment';
            return response()->success($comment);
    }
    public function post($skip=0,$take=5)
    {
       $friend=[];
       $post=[];
       $last=[];
       $loop=[];
       $liker=[] ;
         $user = $this->me->id;
        
         $mypost=User::where('id',$user)->with('post')->first()->post->toArray();

       try {
              $followpost =User::find($user)->friends()->get();
              if (count($followpost)==0) {
                $loop = $mypost->post;
              }else{
               
                $post = array_merge($post, $mypost);
                foreach ($followpost as $key => $value) 
                  {
                   
                    $friend=User::where('id',$value->friend_id)->with('post')->first()->post->toArray();
                  $post =   array_merge($post, $friend);
                  }
                  $loop = $post;
              }
                foreach ($loop as $k => $v) {
                        $present = "no exp";

                        if (strpos($v['happy'], (string)$user) !== false) {$present = 'happy';}
                        if (strpos($v['normal'], (string)$user)!== false) {$present = 'normal';}
                        if (strpos($v['sad'], (string)$user) !== false) {$present = 'sad';}
                        $v['present'] = $present;
                        $v['all'] = $v["happyCount"] + $v["normalCount"] + $v["sadCount"];
                        if ($v['type'] == 'image') {$v['media'] = \App\library\FileUpload::getInstance()->getImageFullPath($v['media'], 'wall_post_image');
                        }elseif ($v['type'] == 'avatar_image') {$v['media'] = \App\library\FileUpload::getInstance()->getImageFullPath($v['media'], 'profile_avatar_file');
                        }elseif ($v['type'] == 'cover_image') {$v['media'] = \App\library\FileUpload::getInstance()->getImageFullPath($v['media'], 'profile_cover_file');
                        }
                        unset($v['happy'],$v['happyCount'],$v['normal'],$v['normalCount'],$v['sad'],$v['sadCount']);
                        array_push($last, $v);
                    }
        } catch (Exception $e) {
        }
        $loop = $this->array_orderby($loop, 'created_at', SORT_DESC);
        $loop = array_slice($loop, $skip, $take);
        $loop = $this->array_orderby($loop, 'created_at', SORT_ASC);
        if (count($loop) == 0) {
           
            return 'no post';
        }
        return $loop;
    }

    public function array_orderby()
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
    public function newPost(Request $r)
    {
        $user = $this->me;
         $r->place = $r->place ? $r->place : 'post';
           
        $post_words = explode(" ", $r->textpost);
        $post = new post;
        $r->users_id = $user->id;
        $r->body = $r->textpost;
        unset($r->textpost);
        $r->place = $place;
        $r->place = $place;
        $post->body = $r->textpost;
        $post->tag = $r->tag;
        $post->media = $r->media;
        $post->mediadesc = $r->mediadesc;
        $post->mediatitle = $r->mediatitle;
        $post->mediaimage = $r->mediaimage;
        $post->type = $r->type;
        $post->save();
        $post['present'] = "no exp";
        $post['all'] = 0;
        $post['exprission'] = ['happy'=>[],'normal'=>[],'sad'=>[],];
        if ($post['type'] == 'image') {
            $post['media'] = \App\library\FileUpload::getInstance()->getImageFullPath($post['media'], 'wall_post_image');
        }
        $notificationParams['user_id'] = $user->id;
        $notificationParams['post_id'] = $post["id"];
        $notificationParams['user_name'] = $user->name." ". $user->mid_name." ".$user->last_name;
        $notificationParams['icon'] = $user->avatar;
        $notificationParams['post_body'] = $post->body;
        \App\library\notifications\Notifications::getInstance()->notifyUsers(1, $notificationParams);
        return compact('post');
    }
        public function exprission($post, $exp, $place)
    {
        $notificationType = 4;
        $liker = [];
        $user = $this->me;
        switch ($place) {
            case 'group':
            case 'post':
                $post = post::where('id', $post)->first();
                $notificationType = 4;
                break;
            case 'classpost':
                $post = classpost::where('id', $post)->first();
                $notificationType = 13;
                break;
            default:
                return 'no place';
                break;
        }
        $happy = explode(" ", $post['happy']);
        $sad = explode(" ", $post['sad']);
        $normal = explode(" ", $post['normal']);
        $liker['happy'] = $happy;
        $liker['normal'] = $normal;
        $liker['sad'] = $sad;
        $present = 0;
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
                $last = implode(" ", $liker[$exp]);
                $post[$exp] = $last;
                $post[$exp . "Count"] -= 1;
                $post->save();
                $post['present'] = $exp;
                $post['all'] = $post["happyCount"] + $post["normalCount"] + $post["sadCount"];
                $post['exprission'] = $liker;
                return $post;
            }
            unset($liker[$present][array_search($user->id, $liker[$present])]);
            $last = implode(" ", $liker[$present]);
            $post[$present] = $last;
            $post[$present . "Count"] -= 1;
            array_push($liker[$exp], $user->id);
            $last = implode(" ", $liker[$exp]);
            $post[$exp] = $last;
            $post[$exp . "Count"] += 1;
            $post->save();
            $post['present'] = $exp;
            $post['all'] = $post["happyCount"] + $post["normalCount"] + $post["sadCount"];
            $post['exprission'] = $liker;

            $notificationParams['user_id'] = $user->id;
            $notificationParams['post_id'] = $post['id'];
            $notificationParams['emotion'] = post::translateExprission('ar',$exp);
            $notificationParams['user_name'] = $user->name." ". $user->mid_name." ".$user->last_name;
            $notificationParams['icon'] = $user->avatar;
            \App\library\notifications\Notifications::getInstance()->notifyUsers($notificationType, $notificationParams);
            return $post;
        } else {
            array_push($liker[$exp], $user->id);
            $last = implode(" ", $liker[$exp]);
            $post[$exp] = $last;
            $post[$exp . "Count"] += 1;
            $post->save();
            $post['present'] = $exp;
            $post['all'] = $post["happyCount"] + $post["normalCount"] + $post["sadCount"];
            $post['exprission'] = $liker;
            
            $notificationParams['user_id'] = $user->id;
            $notificationParams['post_id'] = $post['id'];
            $notificationParams['emotion'] = post::translateExprission('ar',$exp);
            $notificationParams['user_name'] = $user->name." ". $user->mid_name." ".$user->last_name;
            $notificationParams['icon'] = $user->avatar;
            \App\library\notifications\Notifications::getInstance()->notifyUsers($notificationType, $notificationParams);
            
            return $post;
        }
    }
        public function postExpUser(Request $request)
    {
        $user = $this->me;
         $v = post::find($request->id);
        $liker['happy'] =explode(" ", $v['happy']);
        $liker['normal'] =  explode(" ", $v['normal']);
        $liker['sad'] =  explode(" ", $v['sad']);
        $sad = User::whereIn('users.id', $liker['sad'])
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
}


