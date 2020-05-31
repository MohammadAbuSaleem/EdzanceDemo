<?php

namespace App\Http\Controllers\Classes\VirtualClass;

use App\Http\Controllers\Controller;
use App\Models\friends;
use App\Models\User;
use App\Models\virtualclass;
use Auth;

class VirtualClassClass extends Controller
{

    protected $user = 'No Data Yet';
    public function __construct()
    {
        $this->user = Auth::user();
        return $this;
    }

    public static function getInstance()
    {
        if (self::$instance == null) {
            self::$instance = new VirtualClass();
        }
        return self::$instance;
    }

    // public function classRead($id)
    // {
    //     $u = $this->user;
    //     if ($permission = classusers::where('uid', $u->id)->where('class_id', $id)->first()) {
    //         $a    = 100 / 12;
    //         $user = virtualclass::where('virtualclass.id', $id)
    //             ->with('vcuser')
    //             ->join('users as usr', 'virtualclass.instructor', '=', 'usr.id')
    //             ->leftjoin('friends', function ($join) use ($u) {
    //                 $join->on('friends.friend_id', '=', 'virtualclass.instructor')
    //                     ->where('friends.id', '=', $u->id)
    //                     ->where('friends.status', '=', 'follower');
    //             })
    //             ->select(
    //                 'friends.friend_id as fr_id',
    //                 'friends.created_at as isfriend',
    //                 'virtualclass.*',
    //                 'usr.id as usr_id',
    //                 'usr.avatar',
    //                 \DB::raw('CONCAT(usr.name," ",usr.last_name ) AS u_name'))
    //             ->first();
    //         $user->persantage = 0;
    //         $field            = ['name', 'class_hall', 'class_number', 'specialition_id', 'Books', 'Privacy', 'Hours', 'season', 'days', 'to', 'from', 'Description'];
    //         foreach ($field as $key => $value) {
    //             if ($user[$value] != null) {
    //                 $user->persantage += $a;

    //             }
    //         }
    //         $user->files    = virtualclass::find($id)->files->count();
    //         $user->homework = virtualclass::find($id)->homework->count();
    //         foreach ($user->vcuser as $key => $value) {
    //             $value->isfriend = $this->isFriend($value->uid);
    //         }

    //         // check user permission
    //         if ($u->id == $user->instructor) {
    //             $permission = 2;
    //         } elseif (!empty($user->class_moderator)) {
    //             $permission = 3;
    //         } else {
    //             $permission = 1;
    //         }
    //         $user->pms = $permission;

    //         return response()->success($user);
    //     } else {
    //         return response()->error('you are not in this class');
    //     }
    // }

    public function isFriend($id)
    {
        $IsFriend = false;
        $user     = $this->user;
        if ($friend = friends::where('id', $user->id)->where('friend_id', $id)->where('status', 'follower')->first()) {
            $IsFriend = true;
        }
        return $IsFriend;
    }

    // public function getUsers($id)
    // {
    //     $user = $this->user;
    //     if ($permission = classusers::where('class_id', $user->id)->where('class_id', $id)->first()) {
    //         $user = virtualclass::where('virtualclass.id', $id)->with('vcuser')
    //             ->join('users as usr', 'virtualclass.instructor', '=', 'usr.id')
    //             ->select('virtualclass.*', 'usr.id as usr_id', 'usr.avatar', 'usr.name as u_name')
    //             ->first();
    //         return response()->success($user);
    //     } else {
    //         return response()->error('you are not in this class');
    //     }
    // }

    // public function removeClassUser(Request $request)
    // {
    //     $c          = $request->student;
    //     $uni        = explode("-", trim($c));
    //     $classusers = classusers::where('uid', $request->user)
    //         ->where('class_id', $request->class)->delete();
    //     $code = virtualclass::find($request->class)->vcuser()->get();
    //     $Room = virtualclass::find($request->class)->Fire_Base_Chat_Room_name;
    //     $Chat = new Chat($this->user->id, $this->user->FB_UID);
    //     $Chat->removeUserFromRoom($request->user, $Room);
    //     return response()->success(compact('code'));
    // }

    // public function addclassTeacher($request)
    // {
    //     $c                    = $request->student;
    //     $uni                  = explode("-", trim($c));
    //     $classusers           = classusers::findOrCreate($request->student, $request->vc['id']);
    //     $classusers           = new classusers;
    //     $classusers->uid      = trim($request->student);
    //     $classusers->class_id = $request->vc['id'];
    //     $code                 = virtualclass::find($request->vc['id'])->vcuser()
    //         ->get();
    //     $vc   = virtualclass::where('virtualclass.id', $request->vc['id'])->join("users", "users.id", "=", "virtualclass.instructor")->select("virtualclass.*", "users.id as user_id", 'users.avatar', 'users.university_id', DB::raw("'class' as type"))->first();
    //     $Chat = new Chat($this->user->id, $this->user->FB_UID);
    //     $Chat->addUserToRoom($request->student, $vc);
    //     return response()->success(compact('code'));
    // }

    // public function Addclass($request)
    // {
    //     $user = $this->user;
    //     $days = [];
    //     $this->validate($request, [
    //         'name'       => 'required',
    //         'class_hall' => 'required',
    //         'from'       => 'required',
    //         'to'         => 'required',
    //     ]);
    //     if ($request->input('sat')) {
    //         array_push($days, 'السبت');
    //     }
    //     if ($request->input('sun')) {
    //         array_push($days, 'الاحد');
    //     }
    //     if ($request->input('mon')) {
    //         array_push($days, 'الاثنين');
    //     }
    //     if ($request->input('tus')) {
    //         array_push($days, 'الثلاثاء');
    //     }
    //     if ($request->input('wed')) {
    //         array_push($days, 'الاربعاء');
    //     }
    //     if ($request->input('thu')) {
    //         array_push($days, 'الخميس');
    //     }
    //     $qlanguages = implode("','", $days);
    //     $qlanguages = str_replace('\'', '', $qlanguages);
    //     $day        = $qlanguages;
    //     $post       = new virtualclass;
    //     $classusers = new classusers;
    //     $post->name = $request->input('name');
    //     $c          = ucwords(substr(uniqid(), 7, 13));
    //     $d          = 1;
    //     while ($d == 1) {
    //         if ($code = virtualclass::where('class_code', $c)->first()) {
    //             $c = ucwords(substr(uniqid(), 7, 13));
    //         } else {
    //             $d = 2;
    //         }
    //         $Chat                           = new Chat($user->id, $user->FB_UID);
    //         $room                           = $Chat->addNewRoom('', 'class', $request->input('name') . "-" . $request->input('class_hall'));
    //         $post->Fire_Base_Chat_Room_name = $room['Rooms'][$user->FB_UID]['name'];
    //         $post->class_code               = $c;
    //         $post->instructor               = $user->id;
    //         $post->Description              = $request->input('description');
    //         $post->from                     = date("Y-m-d H:i:s", strtotime($request->from));
    //         $post->to                       = date("Y-m-d H:i:s", strtotime($request->to));
    //         $post->days                     = $day;
    //         $post->specialization_id        = $user->specialition_id;
    //         if ($request->input('season')) {
    //             $post->season = $request->input('season');
    //         }
    //         if ($request->input('Hours')) {
    //             $post->Hours = $request->input('Hours');
    //         }
    //         if ($request->input('privacy')) {
    //             $post->Privacy = $request->input('privacy');
    //         }
    //         if ($request->input('class_number')) {
    //             $post->class_number = $request->input('class_number');
    //         }
    //         $post->class_hall = $request->input('class_hall');
    //         $post->save();
    //         $classusers           = new classusers;
    //         $classusers->uid      = $user->id;
    //         $classusers->class_id = $post->id;
    //         $classusers->save();
    //         $code = virtualclass::where('virtualclass.id', $post->id)->join('users as ins', 'ins.id', '=', 'instructor')
    //             ->select('virtualclass.*', 'ins.id as uid', 'ins.avatar', 'ins.name as u_name', 'virtualclass.id as class_id')->first();
    //         \App\Models\post::addNewClassPost($user->id, $post->id, $code->name, $user->avatar);
    //         return response()->success(compact('code'));
    //     }
    //     return response()->success('you are not doctor or yo are not confirmed');
    // }

    // public function editVc($id,$request)
    // {
    //     $user =$this->user;
    //     $vc = virtualclass::where('id', $id)->first();
    //     if ($vc && $user->id == $vc->instructor) {
    //         $vc->days = $request->days;
    //         $vc->season = $request->season;
    //         $vc->Hours = $request->Hours;
    //         $vc->Privacy = $request->Privacy;
    //         $vc->class_number = $request->class_number;
    //         $vc->class_hall = $request->class_hall;
    //         $vc->Description = $request->Description;
    //         $vc->name = $request->name;
    //         $vc->save();
    //         return response()->success(compact('vc'));
    //     } else {
    //         return response()->error('Code erorr !!');
    //     }
    // }

    // public function addClasses($request)
    // {
    //     $user = $this->user;
    //     $c    = $request->input('code');
    //     $code = classusers::where('uid', $user->id)->join("virtualclass", "virtualclass.id", "=", "classusers.class_id")->where('virtualclass.class_code', $c)->first();
    //     if (!empty($code)) {
    //         return response()->success(['result' => 'انت مسجل مسبقا في هذه المادة', 'sucess' => false]);
    //     }
    //     if ($code = virtualclass::where('class_code', $c)->join("users", "users.id", "=", "virtualclass.instructor")->select("virtualclass.*", "users.id as user_id", 'users.avatar', 'users.university_id', DB::raw("'class' as type"))->first()) {
    //         $Chat = new Chat($user->id, $user->FB_UID);
    //         $Chat->addUserToRoom($user->id, $code);
    //         $code = $code->toArray();
    //         if ($code['university_id'] == $user->university_id) {
    //             $classusers           = new classusers;
    //             $classusers->uid      = $user->id;
    //             $classusers->class_id = $code['id'];
    //             $classusers->save();
    //             $code = virtualclass::where('class_code', $c)
    //                 ->join('users as ins', 'ins.id', '=', 'instructor')
    //                 ->select('virtualclass.*', 'ins.id', 'ins.avatar', 'ins.name as u_name', 'virtualclass.id as class_id')
    //                 ->first();
    //             return response()->success(compact('code'));
    //         } else {
    //             return response()->success(['result' => 'لا تملك صلاحية للتسجيل في هذه المادة', 'sucess' => false]);
    //         }
    //     } else {
    //         return response()->success(['result' => 'كود المادة غير صحيح', 'sucess' => false]);
    //     }
    // }

    // public function vcUpdate(Request $request)
    // {
    //     $user = $this->user;
    //     $post = classpost::where('id', $request->input('id'))->first();
    //     if (!($post->users_id == $user->id)) {
    //         die('not authorized');
    //     }
    //     $post->body = $request->input('data');
    //     $post->save();
    //     return response()->success($post);
    // }

    // public function getProfile($id)
    // {
    //     $users = User::where('id', $id)->with('vcpost')->with('myclass')->with('friends')->first();
    //     return response()->success($users);
    // }

    // public function vcUser($name)
    // {
    //     $user = user::where('name', 'LIKE', '%' . $name . '%')->get();
    //     return response()->success(compact('post'));
    // }

    // public function universityByName(Request $request)
    // {
    //     $this->validate($request, [
    //         'name' => 'required',
    //     ]);
    // }

    // public function deleteClass($id, Request $request)
    // {
    //     $user = $this->user;
    //     $vc   = virtualclass::where('virtualclass.id', $id)
    //         ->with('instructor')
    //         ->withCount('homework')
    //         ->withCount('files')
    //         ->withCount('exam')
    //         ->withCount('post')
    //         ->withCount('user')
    //         ->first();
    //     if ($vc->instructor == $user->id) {
    //         $count = $vc->homework_count + $vc->files_count + $vc->exam_count + $vc->post_count;
    //         if ($count < 20 && $vc->user_count < 5) {
    //             $users = classusers::where('class_id', $vc->id)->delete();
    //             $vc->delete();
    //             return response()->success(['result' => 'done',
    //                 'sucess'                             => true]);
    //         } else {
    //             return response()->success(['result' => 'condition erorr',
    //                 'sucess'                             => false]);
    //         }
    //     } else {
    //         dd('not authrized');
    //     }
    // }

    // public function joinClass(Request $request)
    // {
    //     $user  = $this->user;
    //     $class = virtualclass::where('virtualclass.class_code', $request->code)
    //         ->join("users", "users.id", "=", "virtualclass.instructor")
    //         ->select("virtualclass.id as class_id", "users.institute_id as instructor_institute", "join_class_request.id as join_class_request_id", "classusers.id as classusers_id")
    //         ->leftjoin('join_class_request', function ($join) use ($user) {
    //             $join->on('join_class_request.class_id', '=', "virtualclass.id")
    //                 ->where('join_class_request.user_id', '=', $user->id)
    //                 ->where('join_class_request.accept_status', 'like', "waiting");
    //         })
    //         ->leftjoin('classusers', function ($join) use ($user) {
    //             $join->on('classusers.class_id', '=', "virtualclass.id")
    //                 ->whereNull('classusers.deleted_at')
    //                 ->where('classusers.uid', '=', $user->id);
    //         })
    //         ->first();

    //     // check if the code is class code
    //     if (empty($class->class_id)) {
    //         // there is no class wit this code
    //         return response()->failed(['result' => 'error', 'sucess' => false, 'message' => 'كود المادة غير صحيح']);
    //     }
    //     // check if the user is a class member
    //     if (!empty($class->join_class_request_id)) {
    //         // already on hold
    //         return response()->failed(['result' => 'error', 'sucess' => false, 'message' => 'لقد طلبت الانضمام لهذه المادة من قبل']);
    //     }
    //     // check if the user is a class member
    //     if (!empty($class->classusers_id)) {
    //         // already class member
    //         return response()->failed(['result' => 'error', 'sucess' => false, 'message' => 'انت مسجل في هذه المادة']);
    //     }
    //     // check if the class in the same university
    //     if ($user->university_id != $class->instructor_university) {
    //         // not in the same university
    //         return response()->failed(['result' => 'error', 'sucess' => false, 'message' => 'لا تملك صلاحية للتسجيل في هذه المادة']);
    //     }

    //     // valid to insert the join request
    //     $joinClass                = new JoinClassRequest;
    //     $joinClass->user_id       = $user->id;
    //     $joinClass->class_id      = $class->class_id;
    //     $joinClass->accept_status = "waiting";
    //     $joinClass->save();

    //     return response()->success(["message" => "تم ارسال طلبك بنجاح"]);
    // }

    // public function acceptJoin(Request $request)
    // {
    //     $user            = $this->user;
    //     $requestedUserId = $request->user_id;
    //     $acceptStatus    = $request->status ? "accepted" : "rejected";
    //     // get class and user info for validation
    //     $class = virtualclass::where('virtualclass.id', $request->class_id)
    //         ->join("users", "users.id", "=", "virtualclass.instructor")
    //         ->select("virtualclass.id as class_id", "virtualclass.Fire_Base_Chat_Room_name", "virtualclass.name", "users.id as instructor_id", "users.institute_id as instructor_institute", "join_class_request.id as join_class_request_id", "classusers.id as classusers_id", "users.id as user_id", 'users.avatar', 'users.university_id', DB::raw("'class' as type"))
    //         ->leftjoin('join_class_request', function ($join) use ($requestedUserId) {
    //             $join->on('join_class_request.class_id', '=', "virtualclass.id")
    //                 ->where('join_class_request.user_id', '=', $requestedUserId)
    //                 ->where('join_class_request.accept_status', 'like', "waiting");
    //         })
    //         ->leftjoin('classusers', function ($join) use ($requestedUserId) {
    //             $join->on('classusers.class_id', '=', "virtualclass.id")
    //                 ->whereNull('classusers.deleted_at')
    //                 ->where('classusers.uid', '=', $requestedUserId);
    //         })
    //         ->first();

    //     // make sure that the requested is the class instructor
    //     if ($class->instructor_id != $user->id) {
    //         return response()->failed(['result' => 'error', 'sucess' => false, 'message' => 'ليس لديك صلاحية لقبول الطلب']);
    //     }
    //     // insert classusers record
    //     $Chat = new Chat($this->user->id, $this->user->FB_UID);
    //     $Chat->addUserToRoom($requestedUserId, $class);
    //     $classusers           = new classusers;
    //     $classusers->uid      = $requestedUserId;
    //     $classusers->class_id = $class->class_id;
    //     $classusers->save();

    //     // update join reques record
    //     $update = JoinClassRequest::where('id', $request->join_id)
    //         ->update(['accept_status' => $acceptStatus]);
    //     if ($request->status) {
    //         return response()->success(["message" => "تم قبول الطلب بنجاح"]);
    //     } else {
    //         return response()->failed(["message" => "تم رفض طلب الانضمام"]);
    //     }
    // }

    // public function JoinRequests($classId)
    // {
    //     $user     = $this->user;
    //     $requests = JoinClassRequest::where('join_class_request.class_id', $classId)
    //         ->where('join_class_request.accept_status', 'waiting')
    //         ->join("users", "users.id", "=", "join_class_request.user_id")
    //         ->join("ins__institutes", "ins__institutes.id", "=", "users.institute_id")
    //         ->select("ins__institutes.mthr_name as institute", "join_class_request.class_id", "join_class_request.id as join_id", "users.id as user_id", "users.avatar", "users.name as first_name", "users.mid_name", "users.last_name", "join_class_request.created_at")
    //         ->get();
    //     try {
    //         $requests = $requests->toArray();
    //     } catch (Exception $ex) {

    //     }
    //     foreach ($requests as $key => $request) {
    //         $requests[$key]['isfriend'] = $this->isFriend($request['user_id']);
    //     }
    //     // check class id
    //     if (empty($requests)) {
    //         return response()->failed(['result' => 'error', 'sucess' => false, 'message' => 'لا يوجد طلبات انضمام في الوقت الحالي']);
    //     }
    //     return response()->success($requests);
    // }

    // public function addModerator(Request $request)
    // {
    //     $user = $this->user;

    //     // check if user is class intructor
    //     $class = virtualclass::where('virtualclass.id', $request->class_id)
    //         ->leftjoin('class_moderator', function ($join) use ($user) {
    //             $join->on('class_moderator.class_id', '=', "virtualclass.id")
    //                 ->whereNull('class_moderator.deleted_at')
    //                 ->where('class_moderator.user_id', '=', $user->id);
    //         })
    //         ->get();

    //     // check if already moderator
    //     if (!empty($class->class_moderator)) {
    //         // already moderator
    //         return response()->failed(['result' => 'error', 'sucess' => false, 'message' => 'تم تعيين الطالب كمشرف من قبل']);
    //     }
    //     // validate the requested user
    //     if ($user->id != $class->instructor) {
    //         return response()->failed(['result' => 'error', 'sucess' => false, 'message' => 'ليس لديك صلاحية لتعيين مشدف']);
    //     }

    //     // save user as a moderator for the class

    //     $classModerator           = new ClassModerator;
    //     $classModerator->class_id = $request->class_id;
    //     $classModerator->user_id  = $request->user_id;
    //     $classModerator->save();

    //     return response()->success([]);
    // }

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

    // public function getUniversityInformation($id = false, $class)
    // {
    //     $u    = [];
    //     $user = [];
    //     if ($id === false) {
    //         return response()->success(compact('u'));
    //     }
    //     $university_id = virtualclass::find($class)->instructor()->first()->university_id;
    //     $code          = virtualclass::find($class)->vcuser()->select('User.id')->get();
    //     foreach ($code as $key => $value) {
    //         $user[$key] = $value->id;
    //     }
    //     $u = User::select('users.id', 'users.university_id', DB::raw('CONCAT(users.name," ",users.mid_name," ",users.last_name) AS name', 'users.acctype'), 'users.avatar as img')
    //         ->where('users.university_id', '=', $university_id)
    //         ->where('users.acctype', '=', 1)
    //         ->whereRaw("(CONCAT(users.name,' ',users.mid_name,' ',users.last_name,' - ' ,users.id ) like '$id%')")
    //         ->whereNotIn('users.id', $user)
    //         ->take(5)->get();
    //     foreach ($u as $key => $value) {
    //         $value->isfriend = $this->isFriend($value->id);
    //     }
    //     if ($u) {
    //         return response()->success(compact('u'));
    //     } else {
    //         return response()->success($u);
    //     }
    // }

    // public function getPost($id, $skip = 0, $take = 2)
    // {
    //     if (!$user = Auth::user()) {
    //         die('not logged in');
    //     }
    //     $friend = [];
    //     $post   = [];
    //     $last   = [];
    //     $user   = Auth::user();
    //     $post   = classpost::where('class_id', $id)->isfriend()->with('comment')
    //         ->join('users', 'users.id', '=', 'classpost.users_id')
    //         ->select('users.avatar as avatar', 'users.name as name', 'users.FB_UID', 'users.last_name as last_name', 'classpost.*', 'users.id as userid')
    //         ->orderBy('created_at', 'DESC')->skip($skip)->take($take)->get();
    //     foreach ($post as $k => $v) {
    //         $present       = "no exp";
    //         $exp['happy']  = explode(" ", $v['happy']);
    //         $exp['normal'] = explode(" ", $v['normal']);
    //         $exp['sad']    = explode(" ", $v['sad']);
    //         if (in_array($user->id, $exp['happy'])) {
    //             $present = 'happy';
    //         }
    //         if (in_array($user->id, $exp['normal'])) {
    //             $present = 'normal';
    //         }
    //         if (in_array($user->id, $exp['sad'])) {
    //             $present = 'sad';
    //         }
    //         $v['present']    = $present;
    //         $v['all']        = $v["happyCount"] + $v["normalCount"] + $v["sadCount"];
    //         $v['exprission'] = $exp;
    //         if ($v['type'] == 'image') {
    //             $v['media'] = \App\library\FileUpload::getInstance()->getImageFullPath($v['media'], 'vc_post_image');
    //         }
    //         $v->isfriend = $this->isFriend($v->users_id);
    //         array_push($last, $v);
    //     }

    //     $last = $this->arrayOrderby($last, 'created_at', SORT_ASC);
    //     if (count($last) == 0) {
    //         return response()->success('no post');
    //     }
    //     return response()->success($last);
    // }

    // public function postPostUpdate(Request $request)
    // {
    //     if (!$user = Auth::user()) {
    //         die('not logged in');
    //     }
    //     $post = classpost::where('id', $request->input('id'))->first();
    //     if (!($post->users_id == $user->id)) {
    //         die('not authorized');
    //     }
    //     $post->body = $request->input('data');
    //     $post->save();
    //     return response()->success($post);
    // }

    // public function getSPost($skip = 0, $take = 10)
    // {
    //     $friend     = [];
    //     $post       = [];
    //     $user       = Auth::user();
    //     $followpost = friends::find($user->id)->friend();
    //     foreach ($followpost as $key => $value) {
    //         $fr     = $friend;
    //         $friend = User::find($key->id)->vcpost()->orderBy('created_at', 'desc')->get();
    //         array_push($post, $friend);
    //     }
    //     $mypost = User::find($user->id)->vcpost()->orderBy('created_at', 'desc')->get();
    //     array_push($post, $mypost);
    //     return response()->success($post[0]);
    // }

    // public function postPost($class, Request $request)
    // {
    //     $this->validate($request, [
    //     ]);
    //     $post_words = explode(" ", $request->input('textpost'));
    //     $post       = new classpost;
    //     if (isset($post_words[1])) {
    //         $title = $post_words[0] . " " . $post_words[1];
    //     } else {
    //         $title = $post_words[0];
    //     }
    //     if (isset($post_words[2])) {
    //         $title = $post_words[0] . " " . $post_words[1] . " " . $post_words[2];
    //     } else {
    //     }
    //     $post->title      = $title;
    //     $post->type       = 1;
    //     $post->place      = 'VC';
    //     $post->status     = 1;
    //     $post->class_id   = $class;
    //     $post->body       = $request->input('textpost');
    //     $post->tag        = '';
    //     $post->media      = $request->input('media');
    //     $post->mediadesc  = $request->input('mediadesc');
    //     $post->mediatitle = $request->input('mediatitle');
    //     $post->mediaimage = $request->input('mediaimage');
    //     $post->type       = $request->input('type');
    //     $user             = Auth::user();
    //     $post->users_id   = $user->id;
    //     $post->save();
    //     $pst             = User::find($user->id)->vcpost()->where('classpost.id', $post->id)->first();
    //     $happy           = explode(" ", $pst['happy']);
    //     $sad             = explode(" ", $pst['sad']);
    //     $normal          = explode(" ", $pst['normal']);
    //     $liker['happy']  = $happy;
    //     $liker['normal'] = $normal;
    //     $liker['sad']    = $sad;
    //     $present         = "no exp";
    //     if (in_array($user->id, explode(" ", $pst['happy']))) {
    //         $present = 'happy';
    //     }
    //     if (in_array($user->id, explode(" ", $pst['normal']))) {
    //         $present = 'normal';
    //     }
    //     if (in_array($user->id, explode(" ", $pst['sad']))) {
    //         $present = 'sad';
    //     }
    //     $pst['present']    = $present;
    //     $pst['all']        = $pst["happyCount"] + $pst["normalCount"] + $pst["sadCount"];
    //     $pst['exprission'] = $liker;
    //     if ($pst['type'] == 'image') {
    //         $pst['media'] = \App\library\FileUpload::getInstance()->getImageFullPath($pst['media'], 'wall_post_image');
    //     }
    //     $post = $pst;

    //     // get class by id
    //     $classObj = virtualclass::where("id", $class)->first();

    //     $notificationParams['user_id']    = $user->id;
    //     $notificationParams['post_id']    = $pst["id"];
    //     $notificationParams['user_name']  = $user->name . " " . $user->mid_name . " " . $user->last_name;
    //     $notificationParams['class_name'] = $classObj['name'];
    //     $notificationParams['class_id']   = $classObj['id'];
    //     $notificationParams['icon']       = $user->avatar;
    //     $notificationParams['post_body']  = $post->body;
    //     \App\library\notifications\Notifications::getInstance()->notifyUsers(5, $notificationParams);
    //     return response()->success(compact('post'));
    // }

    // public function postUpdatePost(Request $request)
    // {
    //     if (!$user = Auth::user()) {
    //         die('not logged in');
    //     }
    //     $post = classpost::where('id', $request->input('id'))->first();
    //     if (!($post->users_id == $user->id)) {
    //         die('not authorized');
    //     }
    //     $post->body = $request->input('data');
    //     $post->save();
    //     return response()->success($post);
    // }

    // public function postAddExprission($post, $exp)
    // {
    //     $liker           = [];
    //     $user            = Auth::user();
    //     $post            = classpost::where('id', $post)->first();
    //     $happy           = explode(" ", $post['happy']);
    //     $sad             = explode(" ", $post['sad']);
    //     $normal          = explode(" ", $post['normal']);
    //     $liker['happy']  = $happy;
    //     $liker['normal'] = $normal;
    //     $liker['sad']    = $sad;
    //     $present         = 0;
    //     if (in_array($user->id, $liker['happy'])) {
    //         $present = 'happy';
    //     }
    //     if (in_array($user->id, $liker['normal'])) {
    //         $present = 'normal';
    //     }
    //     if (in_array($user->id, $liker['sad'])) {
    //         $present = 'sad';
    //     }
    //     if ($present == ('sad' || 'normal' || 'happy')) {
    //         if ($present == $exp) {
    //             unset($liker[$exp][array_search($user->id, $liker[$exp])]);
    //             $last       = implode(" ", $liker[$exp]);
    //             $post[$exp] = $last;
    //             $post[$exp . "Count"] -= 1;
    //             $post->save();
    //             return response()->success($post);
    //         }
    //         unset($liker[$present][array_search($user->id, $liker[$present])]);
    //         $last           = implode(" ", $liker[$present]);
    //         $post[$present] = $last;
    //         $post[$present . "Count"] -= 1;
    //         array_push($liker[$exp], $user->id);
    //         $last       = implode(" ", $liker[$exp]);
    //         $post[$exp] = $last;
    //         $post[$exp . "Count"] += 1;
    //         $post->save();

    //         $notificationParams['user_id']   = $user->id;
    //         $notificationParams['post_id']   = $post['id'];
    //         $notificationParams['emotion']   = post::translateExprission('ar', $exp);
    //         $notificationParams['user_name'] = $user->name . " " . $user->mid_name . " " . $user->last_name;
    //         \App\library\notifications\Notifications::getInstance()->notifyUsers(14, $notificationParams);
    //         return response()->success($post);
    //     } else {
    //         array_push($liker[$exp], $user->id);
    //         $last       = implode(" ", $liker[$exp]);
    //         $post[$exp] = $last;
    //         $post[$exp . "Count"] += 1;
    //         $post->save();
    //         return response()->success($post);
    //     }
    // }

    // public function postComment(Request $request)
    // {
    //     $this->validate($request, [
    //         'body' => 'required',
    //     ]);
    //     $comment          = new comment;
    //     $comment->status  = $request->input('status');
    //     $comment->place   = $request->input('place');
    //     $comment->post_id = $request->input('post_id');
    //     $comment->body    = $request->input('body');
    //     $user             = Auth::user();
    //     $comment->uid     = $user->id;
    //     $comment->save();
    //     $comment = comment::where('comment.id', $comment->id)
    //         ->join('users as user', 'comment.uid', '=', 'user.id')
    //         ->select('comment.*', 'user.id as userid', 'user.name as name', 'user.last_name as last_name', 'user.avatar as avatar')->first();

    //     $notificationParams['user_id']   = $user->id;
    //     $notificationParams['post_id']   = $request->input('post_id');
    //     $notificationParams['user_name'] = $user->name . " " . $user->mid_name . " " . $user->last_name;
    //     \App\library\notifications\Notifications::getInstance()->notifyUsers(13, $notificationParams);
    //     return response()->success(compact('comment'));
    // }

    // public function postCreateorupdatefollow($friend, $update = 'follower')
    // {
    //     $user = Auth::user();
    //     if ($friendy = friends::where('id', $user->id)->where('friend_id', $friend)->first()) {
    //         if ($friendy->status == 'follower' && $update == 'follower') {
    //             return response()->error('You are already follwing that person :)');
    //         }

    //         $friendy->status = $update;
    //         $friendy->save();
    //         $user = User::where('id', $friendy->friend_id)->first();

    //         return response()->success($user);
    //     }

    //     $friendy            = new friends;
    //     $friendy->id        = $user->id;
    //     $friendy->friend_id = $friend;
    //     $friendy->status    = $update;
    //     $friendy->save();
    //     $user = User::where('id', $friendy->friend_id)->first();

    //     return response()->success($user);
    // }

    // public function getPostPage($postId)
    // {

    //     $user = Auth::user();
    //     if (!empty($user)) {

    //         // get post by id
    //         $postClass = new \App\classpost();
    //         $post      = $postClass->getPostInfo($postId);
    //         if (!empty($post)) {
    //             $happy           = explode(" ", $post[0]['happy']);
    //             $sad             = explode(" ", $post[0]['sad']);
    //             $normal          = explode(" ", $post[0]['normal']);
    //             $liker['happy']  = $happy;
    //             $liker['normal'] = $normal;
    //             $liker['sad']    = $sad;
    //             $present         = "no exp";
    //             if (in_array($user->id, explode(" ", $post[0]['happy']))) {
    //                 $present = 'happy';
    //             }

    //             if (in_array($user->id, explode(" ", $post[0]['normal']))) {
    //                 $present = 'normal';
    //             }

    //             if (in_array($user->id, explode(" ", $post[0]['sad']))) {
    //                 $present = 'sad';
    //             }

    //             $post[0]['present']    = $present;
    //             $post[0]['all']        = $post[0]["happyCount"] + $post[0]["normalCount"] + $post[0]["sadCount"];
    //             $post[0]['exprission'] = $liker;
    //             if ($post[0]['type'] == 'image') {
    //                 $post[0]['media'] = \App\library\FileUpload::getInstance()->getImageFullPath($post[0]['media'], 'wall_post_image');
    //             }

    //             // check if the user in the class
    //             $class = classusers::where('class_id', $post[0]['class_id'])->where('uid', $user->id)->first();
    //             if (!empty($class)) {
    //                 return response()->success($post);
    //             } else {
    //                 return response()->failed(["message" => "not_calss_user"]);
    //             }
    //         } else {
    //             return response()->failed(["no post"]);
    //         }
    //     }
    // }

}
