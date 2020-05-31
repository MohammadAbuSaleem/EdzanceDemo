<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Models\homework_answers;
use App\Models\specialition;
use App\Models\virtualclass;
use App\Models\homework;
use App\Models\exam;
use App\Models\class_files;
use App\Models\classpost;
use App\Models\comment;
use App\Models\friends;
use App\Models\users;
use App\Models\group;
use App\Models\groupuser;
use App\Models\User;
use App\Models\post;
use App\Models\university;
use App\Models\student_info;
use App\Models\messages;
use DB;
use Mail;
use Cache;
use \Firebase;
use \Firebase\Database as Database;
use Auth;
use Validator;
use App\Models\ContactUs;
use App\Models\country;
use \App\library\FileUpload as FileUpload;
use App\Http\Controllers\Classes\Chat;
use Intervention\Image\ImageManagerStatic as Image;
use  App\Http\Controllers\Social\posts;

class profileController extends Controller
{
	 public function UploadFile($type, Request $request)
    {
        $user = Auth::user();
        if (!empty($user)) {
            try {
                $request->type = $type;
                $upload = FileUpload::getInstance()->uploadFile($request, $user->acctype, $user->id);
            } catch (Exception $e) {
                return response()->failed(['result' => 'error', 'sucess' => false, 'message' => 'failed to upload image']);
            }
            if ($upload['success']) {
                switch ($request->type) {
                    case 'profile_avatar':
                    case 'profile_avatar_file':
                        $user->avatar = $upload['file_path'].$upload['file_name'];
                        $user->save();
                        // add post
                        $post = new post();
                        $post->addAvatarPost($upload['file_name'], $user->id);
                        break;
                    case 'profile_cover':
                    case 'profile_cover_file':
                        $user->showcase = $upload['file_path'].$upload['file_name'];
                        $user->save();
                        // add post
                        
                        $post = new post();
                        $post->addCoverPost($upload['file_name'], $user->id);
                        break;
                    case 'group_cover':
                        $group = \App\group::where('id', $request->input('id'))->first();
                        $group->cover = $upload['file_path'].$upload['file_name'];
                        $group->save();
                        break;
                }
                return response()->success(['file_name' => $upload['file_name'], 'file_path' => $upload['file_path'], 'file_extension' => $upload['file_extension']]);
            } else {
                return response()->failed(['result' => 'error', 'sucess' => false, 'message' => $upload['message']]);
            }
        }
    }

     public function Profile($id, $skip=0, $take=10)
    {
        if (!$user = Auth::user()) {
            die('not logged in');
        }
        $users =[];
        $users['id'] = 0;
        $user = Auth::user();
        if (!($student_info = student_info::where('user_id', $id)->first())) {
            $student_info = new student_info;
            $student_info->user_id =$id;
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
        $users['itsme']= false;
        if ($user->id == $id) {
            $users['itsme']= true;
        }
        $users->post = User::find($id)->post()->take($take)->skip($skip)->get();
           
        return response()->success($users);
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

    public function ProfilePost($id, $skip = 0, $take = 10)
    {
         return   response()->success( (new posts('profile',$id))->post->reading($skip,$take)->get());
   
    }
  
     public function ProfileWall($id)
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
        $users = $users->toArray();
        $users['profile_followers_count'] = isset($users['profile_followers_count'][0]['count']) ? $users['profile_followers_count'][0]['count'] : 0;
        $users['profile_friends_count'] = isset($users['profile_friends_count'][0]['count']) ? $users['profile_friends_count'][0]['count'] : 0;
        return response()->success($users);
    }

    public function ProfileCv($id){
        $user = Auth::user();
        $selectParams = array(
            'users.name',
            'users.mid_name',
            'users.last_name',
            'users.sex',
            'users.DOB',
            'users.email',
            'users.telephone',
            'users.facebook',
            'users.twitter',
            'users.skype',
            'users.linkedin',
            'university.mthr_name as university_name',
            'college.mthr_name as college_name',
            'specialition.mthr_name as specialition_name',
            'country.country_arabic as university_country',
            'student_info.skills',
            'student_info.concerns',
            'student_info.country as student_country',
            'student_info.hobbies',
            'student_info.languages',
            'student_info.university_id',
            'student_info.specialition_desc',
            'student_info.university_start',
            'student_info.university_end',
            'student_info.school',
            'student_info.school_town',
            'student_info.school_end',
            'users.acctype',
            'instructor_info.avilablefrom as available_from',
            'instructor_info.avilableto as available_to',
            
        );
        $users = User::select($selectParams)
                ->where('users.id', $id)
                ->leftjoin("university", "users.university_id", "=", "university.id")
                ->leftjoin("college", "users.college_id", "=", "college.id")
                ->leftjoin("specialition", "users.specialition_id", "=", "specialition.id")
                ->leftjoin("student_info", "users.id", "=", "student_info.user_id")
                ->leftjoin("country", "university.country_id", "=", "country.id")
                ->leftjoin("instructor_info", "instructor_info.ins_id", "=", "users.id")
                ->first();

        $users = $users->toArray();
        $users['instructor_education'] = \App\Models\InstructorEducation::select("instructor_education.*", "country.country_arabic as country_name")->where("user_id", $id)
                ->leftjoin("country", "instructor_education.country_id", "=", "country.id")
                ->get();
        
        
        // get doctor free hours
        if($user->acctype == 2 && !empty($users)){
            $freeHours = \App\Models\InstructorFreeHours::where("user_id", $user->id)->get();
            $objects = array();
            $formattedArray = array();
            foreach ($freeHours as $freeHour){
                $key = $freeHour['from_hour'].$freeHour["to_hour"];
                $objects[$key]['days'][] = $freeHour['day'];
                $objects[$key]['from_hour'] = $freeHour['from_hour'];
                $objects[$key]['to_hour'] = $freeHour['to_hour'];
                $objects[$key]['id'] = $freeHour['group_id'];
        
            }
            foreach ($objects as $object){
             $formattedArray[] = $object;
            }

            $users['free_hours'] = $formattedArray;
        }
        return response()->success($users);
    }

    public function ProfileHeader($id)
    {
        $user = Auth::user();
        $users = User::select([DB::raw("concat(users.name, ' ', users.mid_name, ' ', users.last_name) as name"), "users.id","users.FB_UID", "users.avatar", "users.showcase", "users.acctype", "users.email_verified as active", "friends.id as isfriend"])
                        ->leftjoin('friends', function ($join) use ($user) {
                            $join->on('friends.friend_id', '=', "users.id")
                            ->where('friends.id', '=', $user->id)
                            ->where('friends.status', '=', "follower");
                        })
                        ->where('users.id', "=", $id)->first();

        if (empty($users)) {
            return response()->failed(['result' => 'error', 'sucess' => false, 'message' => 'not_exists_user']);
        }
        $users = $users->toArray();
        $users['isfriend'] = $users['isfriend'] == null ? false : true;
        $users['itsme'] = $users['id'] == $user->id ? true : false;


        return response()->success($users);
    }

    public function ProfileVideoPosts($id, $skip=0, $take=10){
        return response()->success( (new posts('profile',$id,'video'))->post->reading($skip,$take)->get());
       
    }

     public function ProfileImagePosts($id, $skip = 0, $take = 10) {
        return response()->success( (new posts('profile',$id,'image'))->post->reading($skip,$take)->get());
    }

    public function ProfileFollowers($id, $skip=0, $take=10)
    {
        $user = Auth::user();
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
        ;
          
        
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
    
    public function ProfileFriends($id, $skip=0, $take=10)
    {
        $user = Auth::user();
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
    
    public function UserClasses($id, $skip=0, $take=10)
    {
        $classes = \App\Models\classusers::select('vc.name', 'ins.id', 'ins.avatar', 'ins.name as u_name', 'vc.class_hall', 'vc.days', 'vc.from', 'vc.to')
                ->join('virtualclass as vc', 'classusers.class_id', '=', 'vc.id')
                ->leftjoin('users as ins', 'ins.id', '=', 'vc.instructor')
                ->where("classusers.uid", $id)
                ->take($take)->skip($skip)->get();
        if (empty($classes->toArray())) {
            return response()->success(["no post"]);
        }
        return response()->success($classes);
    }
    
    public function GetCountriesList()
    {
        $countries = country::select("country_arabic", "id")->withTrashed()->get();
        return response()->success($countries);
    }
    
     public function UpdateAvailableTime(Request $request)
    {
        $user = Auth::user();
        $instructorInfo = \App\Models\instructor_info::where("ins_id", $user->id)->first();
        if (isset($request->available_from) && !empty($request->available_from)) {
            $instructorInfo->avilablefrom = $request->available_from;
        }
        if (isset($request->available_to) && !empty($request->available_to)) {
            $instructorInfo->avilableto = $request->available_to;
        }
        $instructorInfo->save();
        return response()->success($instructorInfo);
    }

    public function AddInstructorFreeHours(Request $request) {
        $user = Auth::user();
        if (!empty($user)) {
            $this->validate($request, [
                'days' => 'required',
                'from_hour' => 'required',
                'to_hour' => 'required',
            ]);
            
            $objectsArray = array();
            $daysArray = $request->days;
            
            $characters = '0123456789';
            $charactersLength = strlen($characters);
            $randomString = '';
            for ($i = 0; $i < 10; $i++) {
                $randomString .= $characters[rand(0, $charactersLength - 1)];
            }
        
            $groupId = $randomString;
            foreach ($daysArray as $day){
                $object['day'] = $day;
                $object['user_id'] = $user->id;
                $object['from_hour'] = $request->from_hour;
                $object['to_hour'] = $request->to_hour;
                $object['group_id'] = $groupId;
                $objectsArray[] = $object;
            }
            \App\Models\InstructorFreeHours::insert($objectsArray);
            return response()->success(["id" => $groupId]);
        }
    }

    public function GetInstructorFreeHours(){
        $user = Auth::user();
        $freeHours = \App\Models\InstructorFreeHours::where("user_id", $user->id)->get();
        $objects = array();
        $formattedArray = array();
        foreach ($freeHours as $freeHour){
            $key = $freeHour['from_hour'].$freeHour["to_hour"];
            $objects[$key]['days'][] = $freeHour['day'];
            $objects[$key]['from_hour'] = $freeHour['from_hour'];
            $objects[$key]['to_hour'] = $freeHour['to_hour'];
            $objects[$key]['id'] = $freeHour['group_id'];
            $formattedArray = $objects[$key];
        }
        foreach ($objects as $object){
         $formattedArray[] = $object;
        }
        return response()->success($formattedArray);
    }
    
     public function DeleteFreeHours(Request $request) 
    {
        $this->validate($request, [
            'id' => 'required',
        ]);
        \App\Models\InstructorFreeHours::where("group_id", $request->id)->delete();
        return response()->success([]);
    }


    public function UpdateInstructorEducation(Request $request)
    {
        $user = Auth::user();
        $this->validate($request, [
            'id' => 'required',
        ]);
        if (!empty($user)) {
            $instructorEducation = \App\Models\InstructorEducation::where('id', $request->id)->first();

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

     public function DeleteInstructorEducation(Request $request)
    {
        $this->validate($request, [
                'id' => 'required',
            ]);
        \App\Models\InstructorEducation::where('id', $request->id)->delete();
        return response()->success([]);
    }

     public function AddInstructorEducation(Request $request)
    {
        $user = Auth::user();
        if (!empty($user)) {
            $this->validate($request, [
                'grade' => 'required',
                'specialization' => 'required',
                'country_id' => 'required',
                'start_year' => 'required',
                'end_year' => 'required',
            ]);
            $instructorEducation = new \App\Models\InstructorEducation;
            $instructorEducation->grade = $request->grade;
            $instructorEducation->specialization = $request->specialization;
            $instructorEducation->country_id = $request->country_id;
            $instructorEducation->start_year = $request->start_year;
            $instructorEducation->end_year = $request->end_year;
            $instructorEducation->user_id = $user->id;
            $instructorEducation->university_name = $request->university_name;
            $instructorEducation->save();
            
            return response()->success($instructorEducation);
        } else {
            return response()->failed();
        }
    }
    public function PostUpdate(Request $r)
    {
        return response()->success( (new posts('profile'))->post->update($r));

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

    public function Post(Request $r)
    {
        return response()->success( (new posts('profile',false, $r->type,$r->placeId))->post->adding($r));
    }
    public function PostPast(Request $request)
    {
        if (!$user = Auth::user()) {
            die('not logged in');
        }

        $this->validate($request, []);
        $post_words = explode(" ", $request->input('textpost'));
        $post = new post;
        if (isset($post_words[1])) {
            $title = $post_words[0] . " " . $post_words[1];
        } else {
            $title = $post_words[0];
        }
        if (isset($post_words[2])) {
            $title = $post_words[0] . " " . $post_words[1] . " " . $post_words[2];
        } else {
        }
        $post->title = $title;
        $post->type = 1;
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
        $pst = User::find($user->id)->post()->where('post.id', $post->id)->first();
        $happy = explode(" ", $pst['happy']);
        $sad = explode(" ", $pst['sad']);
        $normal = explode(" ", $pst['normal']);
        $liker['happy'] = $happy;
        $liker['normal'] = $normal;
        $liker['sad'] = $sad;
        $present = "no exp";
        if (in_array($user->id, explode(" ", $pst['happy']))) {
            $present = 'happy';
        }
        if (in_array($user->id, explode(" ", $pst['normal']))) {
            $present = 'normal';
        }
        if (in_array($user->id, explode(" ", $pst['sad']))) {
            $present = 'sad';
        }
        $pst['present'] = $present;
        $pst['all'] = $pst["happyCount"] + $pst["normalCount"] + $pst["sadCount"];
        $pst['exprission'] = $liker;
        if ($pst['type'] == 'image') {
            $pst['media'] = \App\library\FileUpload::getInstance()->getImageFullPath($pst['media'], 'wall_post_image');
        }

        $post = $pst;
        $notificationParams['user_id'] = $user->id;
        $notificationParams['post_id'] = $pst["id"];
        $notificationParams['user_name'] = $user->name." ". $user->mid_name." ".$user->last_name;
        $notificationParams['icon'] = $user->avatar;
        $notificationParams['post_body'] = $post->body;
        \App\library\notifications\Notifications::getInstance()->notifyUsers(1, $notificationParams);
        return response()->success(compact('post'));
    }

     public function Image(Request $request)
    {
        if (!$user = Auth::user()) {
            die('not logged in');
        }
        $this->validate($request, [
            'textpost' => 'required',
        ]);
        $post = new post;
        $post->media = $request->input('file');
        $post->body = $request->input('textpost');
        $post->tag = '';
        $post->place = 'post';
        $post->type = 'image';
        $post->users_id = $user->id;
        $post->save();
        $pst = User::find($user->id)->post()->where('post.id', $post->id)->first();

        $post = $pst;
        $post->media = \App\library\FileUpload::getInstance()->getImageFullPath($post['media'], 'wall_post_image');
            /* Notification */ 
        $notificationParams['user_id'] = $user->id;
        $notificationParams['title'] = 'منشور جديد';
        $notificationParams['post_id'] = $post->id;
        $notificationParams['user_name'] = $user->name." ". $user->mid_name." ".$user->last_name;
        $notificationParams['icon'] = $user->avatar;
        $notificationParams['post_body'] = $post->body;
        \App\library\notifications\Notifications::getInstance()->notifyUsers(1, $notificationParams);
        
        return response()->success(compact('post'));
    }

     public function Sec(Request $request)
    {
        $school_end = date('Y-m-d', strtotime(str_replace('-', '/', "1/1/".$request->input('school_end'))));
        if (!$user = Auth::user()) {
            die('not logged in');
        }
        if (!($student_info = student_info::where('user_id', $user->id)->first())) {
            $student_info = new student_info;
            $student_info->user_id = $user->id;
        }
        $student_info->school   = $request->input('school');
        $student_info->school_town = $request->input('school_town');
        $student_info->school_end = $school_end;
        $student_info->save();
        return response()->success(compact('student_info'));
    }

     public function Uni(Request $request)
    {
      $university_start = date('Y-m-d', strtotime(str_replace('-', '/', "1/1/".$request->input('university_start'))));
        $university_end = date('Y-m-d', strtotime(str_replace('-', '/', "1/1/".$request->input('university_end'))));
      if (!$user = Auth::user()) {
          die('not logged in');
      }
        $user = Auth::user();
        if (!($student_info = student_info::where('user_id', $user->id)->first())) {
            $student_info = new student_info;
            $student_info->user_id = $user->id;
        }
      $student_info->specialition_desc = $request->input('specialition_desc');
      $student_info->university_id     = $request->input('university_id');
        $student_info->university_start  = $university_start;
        $student_info->university_end    = $university_end;
        $student_info->save();
 
      return response()->success(compact('student_info'));
    }
     public function Other(Request $request)
    {
        if (!$user = Auth::user()) {
            die('not logged in');
        }
        $user = Auth::user();
        if (!($student_info = student_info::where('user_id', $user->id)->first())) {
            $student_info = new student_info;
            $student_info->user_id = $user->id;
        }
        $student_info->user_id  = $user->id;
        $student_info->skills = $request->input('skills');
        $student_info->hobbies = $request->input('hobbies');
        $student_info->concerns = $request->input('concerns');
        $student_info->languages = $request->input('languages');
        $student_info->save();
        return response()->success(compact('user'));
    }

    public function Contact(Request $request)
    {
        if (!$user = Auth::user()) {
            die('not logged in');
        }
        $user = Auth::user();
        $user->email = $request->input('email');
        $user->telephone = $request->input('telephone');
        $user->skype = $request->input('skype');
        $user->twitter = $request->input('twitter');
        $user->linkedin = $request->input('linkedin');
        $user->facebook = $request->input('facebook');
        $user->save();
        return response()->success(compact('user'));
    }

     public function Inf(Request $request)
    {
        if (!($user = Auth::user()||$user->id==$request->input('id'))) {
            die('not logged in');
        }
        $user = Auth::user();
        if ($request->input('name')!='') {
            $user->name = $request->input('name');
        }
        if ($request->input('mid_name')!='') {
            $user->mid_name = $request->input('mid_name');
        }
        if ($request->input('last_name')!='') {
            $user->last_name = $request->input('last_name');
        }
        if ($request->input('sex')!='') {
            $user->sex = $request->input('sex');
        }
  
      if ($request->input('DOB')!='') {
          $user->DOB  = $request->input('DOB');
      }
        if (!($student_info = student_info::where('user_id', $user->id)->first())) {
            $student_info = new student_info;
            $student_info->user_id = $user->id;
        }
        if ($request->input('country')!='') {
            $student_info->country  = $request->input('country');
        }
        $user->save();
        $student_info->save();
        $user = User::where('id', $user->id)->with('student_info')->first();
        return response()->success(compact('user'));
    }
    
}
