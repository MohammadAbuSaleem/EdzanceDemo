<?php

namespace App\Http\Controllers\web;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\homework_answers;
use App\specialition;
use App\virtualclass;
use App\homework;
use App\exam;
use App\class_files;
use App\classpost;
use App\comment;
use App\friends;
use App\users;
use App\User;
use App\post;
use App\university;
use App\student_info;
use App\messages;
use DB;
use Cache;
use Auth;
use Intervention\Image\ImageManagerStatic as Image;
class meController extends Controller
{
	    public function getMe()
    {
     if(!$user = Auth::user())die('not logged in');
          $user = Auth::user();
        $users = User::where('id', $user->id)
                      ->with('student_info')->with('instructor_info')
                      ->with('post')->take(10)->get();
        return response()->success($users);
    }
          public function getComment($id,$place)
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

    if(!$user = Auth::user())die('not logged in');
          $user = Auth::user();
   if($comment =='No query results for model [App\post].')
           return response()->success('no comment');
        return response()->success($comment);
    }
        public function getUniversity()
    {
        $friends=[];
        $user = Auth::user();
        if($user->acctype==1)$acctype=[1]; else $acctype=[1,2];
        array_push($friends, $user->id);
        $university = university::where('id','=',$user->university_id)->first();
        $mypost=User::find($user->id)->friends()->select('friend_id')->get();
        foreach ( $mypost as $key => $value) {array_push($friends, $value->friend_id);}
        $suggested = User::where('users.university_id','=',$university->id)
                    ->whereIn('users.acctype',  $acctype)
                    ->whereNotIn('users.id',  $friends)
                    ->join('university as univ',  'users.university_id', '=','univ.id')
                    ->join('specialition as spec',  'users.specialition_id', '=','spec.id')
                    ->select('users.*','univ.mthr_name as university' ,'spec.mthr_name as specialition')
                    ->take(10)->get();
        return response()->success($suggested);
    }
        public function getPost($skip=0,$take=5)
    {
        if(!$user = Auth::user())die('not logged in');
       $friend=[];
       $post=[];
       $last=[];
       $liker=[] ;
         $user = Auth::user();
         $mypost=User::find($user->id)->post()->get();
       array_push($post, $mypost);
       try {
              $followpost =User::find($user->id)->friends()->get();
              foreach ($followpost as $key => $value) 
              {
                $friend=User::find($value->friend_id)->post()->get();
                array_push($post, $friend);
              }

              foreach ($post as $key => $value) {
                foreach ($value as $k => $v) {
                   $happy = explode(" ", $v['happy']);
                   $sad = explode(" ", $v['sad']);
                   $normal = explode(" ", $v['normal']);
                   $liker['happy'] =$happy;
                   $liker['normal'] =$normal;
                   $liker['sad'] =$sad;
                   $present = "no exp";
                   if (in_array($user->id, explode(" ", $v['happy']))) $present ='happy';
                   if (in_array($user->id, explode(" ", $v['normal']))) $present ='normal';
                   if (in_array($user->id, explode(" ", $v['sad']) )) $present ='sad';
                   $v['present'] = $present;
                   $v['all'] = $v["happyCount"] + $v["normalCount"] + $v["sadCount"];
                   $v['exprission'] = $liker;
                   if ($v['type'] == 'image') {
                        $v['media'] = \App\library\FileUpload::getInstance()->getImageFullPath($v['media'], 'wall_post_image');
                    }
               array_push($last, $v);
              }
              }
           } catch (Exception $e) {
         
      }
       $last = $this->array_orderby($last, 'created_at', SORT_DESC);
       $last = array_slice($last,$skip, $take);
      $last = $this->array_orderby($last, 'created_at', SORT_ASC);
            if (count($last)==0){
              return response()->success('no post');
          }
      return response()->success($last);
    }
   public function array_orderby()
  {
     if(!$user = Auth::user())die('not logged in');
      $args = func_get_args();
     $data = array_shift($args);
     foreach ($args as $n => $field) {
        if (is_string($field)) {
            $tmp = array();
            foreach ($data as $key => $row)
                $tmp[$key] = $row[$field];
            $args[$n] = $tmp;
            }
     }
     $args[] = &$data;
     call_user_func_array('array_multisort', $args);
     return array_pop($args);
  }
       public function getSPost($skip=0,$take=10)
    {
       if(!$user = Auth::user())die('not logged in');
       $friend=[];
       $post=[];
         $user = Auth::user();
        $followpost =friends::find($user->id)->friend();
        foreach ($followpost as $key => $value) {
          $fr=$friend;
        $friend=User::find($key->id)->post()->orderBy('created_at', 'desc')->get();
          array_push($post, $friend);
        }
       $mypost=User::find($user->id)->post()->orderBy('created_at', 'desc')->get();
       array_push($post, $mypost);
      return response()->success($post[0]);
    } 
        public function getProfile($id,$skip=0,$take=10)
    {
       if(!$user = Auth::user())die('not logged in');
        $user = Auth::user();

             if (!($student_info = student_info::where('user_id',$id)->first())) {$student_info = new student_info;$student_info->user_id =$id;$student_info->save();}
        $users = User::where('users.id', $id)->isfriend()->with('post')
                      ->with('student_info')->with('instructor_info')
                      ->with('myclass')->with('friends')->with('followers')
                      ->with('video')->with('image')
                      ->join('university as univ',  'users.university_id', '=','univ.id')
                      ->join('specialition as spec',  'users.specialition_id', '=','spec.id')
                       ->join('college as clg',  'users.college_id', '=','clg.id')
                      ->select('users.*','univ.mthr_name as university' ,'spec.mthr_Description as specialition_desc' ,'univ.mthr_place as university_town' ,'univ.mthr_Country as university_Country' ,'clg.mthr_name as college' ,'spec.mthr_name as specialition')
                      ->first();
             $users->isfriend = $this->isFriend($id);         
          $users->itsme= false;
                      if($user->id == $users->id){
          $users->itsme= true;
                      }
          $users->post = User::find($id)->post()->take($take)->skip($skip)->get();
          if ($skip!=0) {
            return response()->success($users->post);
          }
        return response()->success($users);
    }
            public function getProfilePost($id,$skip=0,$take=10)

    {
          $friend=[];
           $post=[];
           $last=[];
           $liker=[] ;
             $user = Auth::user();
             $mypost=User::find($id)->post()->get();
           array_push($post, $mypost);
           try {
                  foreach ($post as $key => $value) {
                    foreach ($value as $k => $v) {
                       $happy = explode(" ", $v['happy']);
                       $sad = explode(" ", $v['sad']);
                       $normal = explode(" ", $v['normal']);
                       $liker['happy'] =$happy;
                       $liker['normal'] =$normal;
                       $liker['sad'] =$sad;
                       $present = "no exp";
                       if (in_array($user->id, explode(" ", $v['happy']))) $present ='happy';
                       if (in_array($user->id, explode(" ", $v['normal']))) $present ='normal';
                       if (in_array($user->id, explode(" ", $v['sad']) )) $present ='sad';
                       $v['present'] = $present;
                       $v['all'] = $v["happyCount"] + $v["normalCount"] + $v["sadCount"];
                       $v['exprission'] = $liker;
                       if ($v['type'] == 'image') {
                        $v['media'] = \App\library\FileUpload::getInstance()->getImageFullPath($v['media'], 'wall_post_image');
                    }
                 
                   array_push($last, $v);
                  }
                  }
               } catch (Exception $e) {
         
          }
           $last = $this->array_orderby($last, 'created_at', SORT_DESC);
           $last = array_slice($last,$skip, $take);
           $last = $this->array_orderby($last, 'created_at', SORT_ASC);
            if (count($last)==0){
            return response()->success('no post');
          }
          return response()->success($last);
    }
            public function getIsFriend($id)
    {
      $IsFriend= false;
        if(!$user = Auth::user())die('not logged in');
        $user = Auth::user();

    if ($friend = friends::where('id',$user->id)->where('friend_id',$id)->where('status','follower')->get())
        $IsFriend= true;

        return response()->success($IsFriend);
    }
                public function isFriend($id)
    {
      $IsFriend= false;
        if(!$user = Auth::user())die('not logged in');

    if ($friend = friends::where('id',$user->id)->where('friend_id',$id)->where('status','follower')->first()){
        $IsFriend= true;
      }
        return $IsFriend;
    }
              public function postTestUser(Request $request)
    {
       if(!$user = Auth::user())die('not logged in');
         $sad = User::whereIn('users.id',$request->sad)->isfriend()->get();
        return response()->success(compact('sad'));
    }
                public function postExpUser(Request $request)
    {
       if(!$user = Auth::user())die('not logged in');
         $sad = User::whereIn('users.id',$request->sad)->leftjoin('friends as fr', function($join)
               {
                   $user = Auth::user();
                   $join->on('fr.friend_id', '=', 'users.id')->where('fr.id','=', $user->id)->where('fr.status','=','follower');
               })
         ->select('users.id',  DB::raw('CONCAT(users.name," ",users.mid_name," ",users.last_name ) AS full_name'),'users.avatar','fr.id as frid' ,'fr.friend_id as friend_id' , 'fr.created_at as isfriend' )->get();
         $normal = User::whereIn('users.id',$request->normal)->leftjoin('friends as fr', function($join)
               {
                   $user = Auth::user();
                   $join->on('fr.friend_id', '=', 'users.id')->where('fr.id','=', $user->id)->where('fr.status','=','follower');
               })
         ->select('users.id',  DB::raw('CONCAT(users.name," ",users.mid_name," ",users.last_name ) AS full_name'),'users.avatar','fr.id as frid' ,'fr.friend_id as friend_id' , 'fr.created_at as isfriend' )->get();
         $happy = User::whereIn('users.id',$request->happy)->leftjoin('friends as fr', function($join)
               {
                   $user = Auth::user();
                   $join->on('fr.friend_id', '=', 'users.id')->where('fr.id','=', $user->id)->where('fr.status','=','follower');
               })
         ->select('users.id',  DB::raw('CONCAT(users.name," ",users.mid_name," ",users.last_name ) AS full_name'),'users.avatar','fr.id as frid' ,'fr.friend_id as friend_id' , 'fr.created_at as isfriend' )->get();
        return response()->success(compact('sad','normal','happy'));
    }
       public function postPost(Request $request)
  {
      if(!$user = Auth::user())die('not logged in');
      
      $this->validate($request, [
              ]);
      $post_words = explode(" ", $request->input('textpost'));
      $post = new post;
      if(isset($post_words[1])){$title = $post_words[0]." ".$post_words[1];}else{$title = $post_words[0];}
      if(isset($post_words[2])){$title = $post_words[0]." ".$post_words[1]." ".$post_words[2];}else{}
      $post->title = $title;
      $post->type =1;
      $post->place = 'post';
      $post->status = 1;
      $post->body = $request->input('textpost');
      $post->tag = $request->input('tag');
      $post->media = $request->input('media');
      $post->mediadesc = $request->input('mediadesc');
      $post->mediatitle = $request->input('mediatitle');
      $post->mediaimage = $request->input('mediaimage');
      $post->type = $request->input('type');
      $user = Auth::user();
	    $post->users_id = $user->id;
      $post->save();
      $pst = User::find($user->id)->post()->where('post.id',$post->id)->first();
                 $happy = explode(" ", $pst['happy']);
                   $sad = explode(" ", $pst['sad']);
                   $normal = explode(" ", $pst['normal']);
                   $liker['happy'] =$happy;
                   $liker['normal'] =$normal;
                   $liker['sad'] =$sad;
                   $present = "no exp";
                   if (in_array($user->id, explode(" ", $pst['happy']))) $present ='happy';
                   if (in_array($user->id, explode(" ", $pst['normal']))) $present ='normal';
                   if (in_array($user->id, explode(" ", $pst['sad']) )) $present ='sad';
                   $pst['present'] = $present;
                   $pst['all'] = $pst["happyCount"] + $pst["normalCount"] + $pst["sadCount"];
                   $pst['exprission'] = $liker;
                   if ($pst['type'] == 'image') {
                        $pst['media'] = \App\library\FileUpload::getInstance()->getImageFullPath($pst['media'], 'wall_post_image');
                    }
             

      $post=$pst;
      return response()->success(compact('post'));
  }
         public function postImage(Request $request)
  {
      if(!$user = Auth::user())die('not logged in');
      $this->validate($request, [
        'textpost' => 'required' ,  
        ]);
      $post = new post;
      $post->media = $request->input('file');
      $post->body = $request->input('textpost');
      $post->tag ='';
      $post->place = 'post';
      $post->type = 'image';
      $post->users_id = $user->id;
      $post->save();
      $pst = User::find($user->id)->post()->where('post.id',$post->id)->first();
      $post=$pst;
      return response()->success(compact('post'));
  }
       public function postAddExprission($post,$exp,$place)
  {
    if(!$user = Auth::user())die('not logged in');
      $liker= [];
    $user = Auth::user();
    switch ($place) {
      case 'post':
     $post = post::where('id',$post)->first();
      break;
      case 'classpost':
     $post = classpost::where('id',$post)->first();
      break;
      
      default:
        return 'no place';
        break;
    }
     $happy = explode(" ", $post['happy']);
    $sad = explode(" ", $post['sad']);
    $normal = explode(" ", $post['normal']);
    $liker['happy'] =$happy;
    $liker['normal'] =$normal;
    $liker['sad'] =$sad;
    $present =0;
     if (in_array($user->id, $liker['happy'])) $present ='happy';
     if (in_array($user->id, $liker['normal'])) $present ='normal';
     if (in_array($user->id, $liker['sad'] )) $present ='sad';
      if ( $present ==('sad' || 'normal' ||'happy'))
        {
          if ( $present == $exp) 
            {
               unset($liker[$exp][array_search($user->id,$liker[$exp])]);
              $last = implode(" ",$liker[$exp]);
              $post[$exp] = $last;
              $post[$exp."Count"] -=1;
              $post->save();
              $post['present'] = $exp;
              $post['all'] = $post["happyCount"] + $post["normalCount"] + $post["sadCount"];
              $post['exprission'] = $liker;
              return response()->success($post);   
            }
          unset($liker[$present][array_search($user->id,$liker[$present])]);
          $last = implode(" ",$liker[$present]);
          $post[$present] = $last;
          $post[$present."Count"] -=1;
          array_push($liker[$exp],$user->id);
          $last = implode(" ",$liker[$exp]);
          $post[$exp] = $last;
          $post[$exp."Count"] +=1;
          $post->save();
          $post['present'] = $exp;
          $post['all'] = $post["happyCount"] + $post["normalCount"] + $post["sadCount"];
          $post['exprission'] = $liker;
             return response()->success($post);   
        }
      else
        {
          array_push($liker[$exp],$user->id);
          $last = implode(" ",$liker[$exp]);
          $post[$exp] = $last;
          $post[$exp."Count"] +=1;
          $post->save();
          $post['present'] = $exp;
          $post['all'] = $post["happyCount"] + $post["normalCount"] + $post["sadCount"];
          $post['exprission'] = $liker;
             return response()->success($post);
      }
  }
      public function postComment(Request $request)
  {
      if(!$user = Auth::user())die('not logged in');
        $this->validate($request, [
        'body' => 'required' , 
        ]);
      $comment = new comment;
      $comment->status =$request->input('status');
      $comment->place =$request->input('place');
      $comment->post_id =$request->input('post_id');
      $comment->body = $request->input('body');
      $user = Auth::user();
      $comment->uid = $user->id;
      $comment->save();
      $comment = comment::where('comment.id', $comment->id)
                    ->join('users as user',  'comment.uid', '=','user.id')
                    ->select('comment.*', 'user.id as userid', 'user.name as name', 'user.last_name as last_name','user.avatar as avatar')->first();
      return response()->success(compact('comment'));
  }
         public function postCreateorupdatefollow($friend,$update='follower')
  {
      if(!$user = Auth::user())die('not logged in');
      $user = Auth::user();
      if ($friendy = friends::where('id', $user->id)->where('friend_id', $friend)->first()) 
       {
          if($friendy->status=='follower' && $update=='follower') 
           { return response()->success('You are already follwing that person :)');}

          $friendy->status = $update;
          $friendy->save();
          $user = User::where('id', $friendy->friend_id)->first();
        
          return response()->success($user);
       }

      $friendy = new friends;
      $friendy->id=$user->id;
      $friendy->friend_id=$friend;
      $friendy->status=$update;
      $friendy->save();
      $user = User::where('id', $friendy->friend_id)->first();
        
      return response()->success($user);
  }
           public function postCreateorupdatefollower($friend,$update='follower')
  {
      if(!$user = Auth::user())die('not logged in');
      $user = Auth::user();
      if ($friendy = friends::where('friend_id', $user->id)->where('id', $friend)->first()) 
       {
          if($friendy->status=='follower' && $update=='follower') 
           { return response()->success('You are already follwing that person :)');}

          $friendy->status = $update;
          $friendy->save();
          $user = User::where('id', $friendy->id)->first();
        
          return response()->success($user);
       }

      $friendy = new friends;
      $friendy->id=$user->id;
      $friendy->friend_id=$friend;
      $friendy->status=$update;
      $friendy->save();
      $user = User::where('id', $friendy->friend_id)->first();
        
      return response()->success($user);
  }
        public function putMe(Request $request)
    {
        if(!$user = Auth::user())die('not logged in');
        $user = Auth::user();

        $this->validate($request, [
            'data.name' => 'required|min:3',
            'data.email' => 'required|email|unique:users,email,'.$user->id,
        ]);

        $userForm = app('request')
                    ->only(
                        'data.current_password',
                        'data.new_password',
                        'data.new_password_confirmation',
                        'data.name',
                        'data.email'
                    );

        $userForm = $userForm['data'];
        $user->name = $userForm['name'];
        $user->email = $userForm['email'];

        if ($request->has('data.current_password')) {
            Validator::extend('hashmatch', function ($attribute, $value, $parameters) {
                return Hash::check($value, Auth::user()->password);
            });

            $rules = [
                'data.current_password' => 'required|hashmatch:data.current_password',
                'data.new_password' => 'required|min:8|confirmed',
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
        if(!$user = Auth::user()) die('not logged in');
        $post = post::where('id', $request->input('id'))->first();
        if(!($post->users_id == $user->id)) die('not authorized');
        $post->body = $request->input('data'); 
        $post->save();
        return response()->success($post);
    }
        public function postDelPost(Request $request)
    {
        if(!$user = Auth::user())die('not logged in');
        $user = Auth::user();
       $post= post::where('id', $request->input('id'))->first();
         if(!($post->users_id == $user->id)) die('not authorized');
      $deletedRows = post::where('id', $request->input('id'))->delete();
        return response()->success('success');
    }
      public function postUploadhw(Request $request)
    {
      $validator = Validator::make($request->all(), [
             'file' => 'mimes:jpeg,jpg,png,gif,pdf,doc,docx,xdoc,xls,xlsx,ppt,pptx,odt,rtf,txt|required|max:10000',
                    ]);
                if ($validator->fails())
                {
                                   return response()->success([
                                    'result'=>$validator->errors()->getMessages(),
                                    'sucess'=>false]);
                }
      $filename = $_FILES['file']['name'];

      $path = $_FILES['file']['name'];
            $meta ='upload/posts/images/';
      $ext = pathinfo($path, PATHINFO_EXTENSION);
            $destination =  $meta .rand(). $ext ;
      try {
            $image = $_FILES['file']['tmp_name'];
            Image::make($image)->resize(null, 300, function ($constraint) {$constraint->aspectRatio();})->save($meta .'X300-'.$filename);
            Image::make($image)->resize(null, 600, function ($constraint) {$constraint->aspectRatio();})->save($meta .'X600-'.$filename);
            Image::make($image)->resize(null, 900, function ($constraint) {$constraint->aspectRatio();})->save($meta .'X900-'.$filename);
            $path = $_FILES['file']['name'];
            $ext = pathinfo($path, PATHINFO_EXTENSION);
            $return = [$meta .'X300-'.$filename , $ext];

            return response()->success($return);
          } 
          catch (\Exception $e) 
          {
              if(substr($e->getMessage(), 0,30) == 'Unable to read image from file')
              {
                  $filename = $_FILES['file']['name'];
                  $ext = pathinfo($filename, PATHINFO_EXTENSION);
                  $meta ='upload/files/'.$ext.'/';
                  $destination =  $meta .$filename ;
                  $pdf = $_FILES['file']['tmp_name'];
                  move_uploaded_file( $pdf, $destination );
                  $return = [$destination ,$ext];
                  return $e->getMessage();
            return response()->success($return);
              }else { return $e->getMessage();}
          }
  }
      public function postChangeAvatar(Request $request)
    {
      $path = 'upload/profile/avatar/'.md5(time()). $request->input('id').'.jpg';

    if(!$user = Auth::user())die('not logged in');
     $ii= Image::make($request->input('cropped'))->encode('jpg')->save( $path);

      $user->avatar =  $path;
      $user->save();
      return response()->success($request->input('cropped'));
   
  }
        public function postChangeCover(Request $request)
    {

      $path = 'upload/profile/cover/'.md5(time()). $request->input('id').'.jpg';
    if(!$user = Auth::user())die('not logged in');
     $ii= Image::make($request->file('file'))->save( $path);
      $user->showcase =  $path;
      $user->save();
      return response()->success($path);
  }
        public function getCache($id)
    {
      Cache::store('memcached')->put('key', $id, 10);
      Cache::store('memcached')->add('key1',  $id,15);
      $value = Cache::store('memcached')->get('key');
      return $value;
    }
          public function getMessages($friend)
    {
      return response()->success(Auth::check());
      return  $user = Auth::user();
        $messages = messages::where('sender_id', $user->id)
                            ->orWhere('sender_id', $friend)
                            ->orWhere('reciever_id', $friend)
                            ->orWhere('reciever_id', $user->id)
                            ->orderBy('created_at', 'desc')
                            ->get();
        return response()->success($messages);
    }
            public function postDelNode(Request $request)
    {
       if(!$user = Auth::user())die('not logged in');
        $user = Auth::user();
       switch ($request->place){
        case 'classpost':
              $comment = classpost::where('id', $request->input('id'))->first();
              if(!($comment->users_id == $user->id)&&!($user->acctype==2)) die('not authorized');
             return $deletedRows = classpost::where('id', $request->input('id'))->delete();
        
          break;
         case 'comment':
              $comment = comment::where('id', $request->input('id'))->first();
              if(!($comment->uid == $user->id) && !($user->acctype==2 )) die('not authorized');
             return $deletedRows = comment::where('id', $request->input('id'))->delete();
        
          break;
         case 'files':
             $comment = class_files::where('id', $request->input('id'))->first();
             if(!($user->acctype==2)) die('not authorized');
             return $deletedRows = class_files::where('id', $request->input('id'))->delete();
        
          break;
         case 'exam':
             $comment = exam::where('id', $request->input('id'))->first();
             if(!($user->acctype==2)) die('not authorized');
             return $deletedRows = exam::where('id', $request->input('id'))->delete();
        
          break;
         case 'homework':
            $comment = homework::where('id', $request->input('id'))->first();
            if(!($user->acctype==2)) die('not authorized');
             return $deletedRows = homework::where('id', $request->input('id'))->delete();
        
           break;
         case 'post':
           $comment = post::where('id', $request->input('id'))->first();
            if(!($comment->users_id == $user->id)) die('not authorized');
             return $deletedRows = post::where('id', $request->input('id'))->delete();
        
            break;
         case 'virtualclass':
            $comment = virtualclass::where('id', $request->input('id'))->first();
            if(!($comment->users_id == $user->id)) die('not authorized');
             return $deletedRows = virtualclass::where('id', $request->input('id'))->delete();
        
           break;
         case 'university':
            $comment = university::where('id', $request->input('id'))->first();
            if(!($comment->users_id == $user->id)) die('not authorized');
             return $deletedRows = university::where('id', $request->input('id'))->delete();
        
           break;
         case 'specialition':
           $comment = specialition::where('id', $request->input('id'))->first();
            if(!($comment->users_id == $user->id)) die('not authorized');
             return $deletedRows = specialition::where('id', $request->input('id'))->delete();
        
            break;
         case 'homework_answers':
           $comment = homework_answers::where('id', $request->input('id'))->first();
            if(!($comment->users_id == $user->id)) die('not authorized');
             return $deletedRows = homework_answers::where('id', $request->input('id'))->delete();
        
            break;
        
        default:
          break;
      }

        return response()->error('Nothing deleted');
    }
}
