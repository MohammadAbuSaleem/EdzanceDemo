<?php
namespace App\Http\Controllers\VClass\parts;

use App\Http\Controllers\Classes\Chat;
use App\Http\Controllers\Classes\Helper;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Members\Members;
use App\Http\Controllers\VClass\MyPermission;
use App\Models\Assessment;
use App\Models\ClassModerator;
use App\Models\classusers;
use App\Models\friends;
use App\Models\JoinClassRequest;
use App\Models\post;
use App\Models\User;
use App\Models\virtualclass;
use DB;
use Illuminate\Http\Request;

class Mangment extends Controller implements MyPermission {
    public $id                    = null;
    public $me                    = null;
    public $user                  = null;
    public $code                  = null;
    public $permission            = [];
    public $predefined_permission = [];
    public function __construct($id = false) {
        $this->user = \Auth::user();
        if ($id != false) {
            $this->id         = $id;
            $this->class      = virtualclass::where('virtualclass.id', $id);
            $this->classusers = classusers::where('classusers.class_id', $id);
        }
        return $this;
    }
    public function __call($method, $arguments) {
        if (method_exists($this, $method)) {
            $reflect                  = new \ReflectionClass($this);
            $permission               = self::PERMISSION_INTERFACE[$reflect->getShortName()];
            $permission['keys']       = ['class_id' => $this->id, 'uid' => $this->user->id];
            $permission['permission'] = $permission['permission'][$method];
            Helper::isOk($permission);
            return call_user_func_array(array($this, $method), $arguments);
        }
    }
    /* This Function To Leave VClass */
    private function leave($request) {
        $classusers = $this->classusers->where('uid', \Auth::user()->id)->delete();
        if ($classusers) {
            $Room   = $this->class->first()->Fire_Base_Chat_Room_name;
            $FB_UID = User::where('id', \Auth::user()->id)->first()->FB_UID;
            $Chat   = (new Chat(\Auth::user()->id, $FB_UID))->removeUserFromRoom(\Auth::user()->id, $Room);
            $data   = [
                'result' => 'deleted',
                'sucess' => true];

        } else {
            $data = [
                'result' => 'error',
                'sucess' => false];
        }
        return ($data);
    }
    /* To Get In Class */
    private function enter($request) {
        $user       = $this->user;
        $permission = $this->class->first();
        $c          = virtualclass::where('class_code', $request->code)->first();
        if (!empty($c)) {
            $code = classusers::where('uid', $user->id)->where('class_id', $c->id)->first();
            if ($c->instructor == $user->id) {
                return ['result' => 'error', 'sucess' => false, 'message' => 'انت منشئ هذه المادة', 'toPush' => false];
            }
            if ($code) {
                return ['result' => 'error', 'sucess' => false, 'message' => 'انت مسجل في هذه المادة مسبقاً', 'toPush' => false];
            }
            if ($permission->Permission) {
                return $this->joinClass($request);
            } else {
                return $this->enterClass($request);
            }
        } else {
            return ['result' => 'error', 'sucess' => false, 'message' => 'كود المادة غير صحيح', 'toPush' => false];
        }
    }
    /* To Send Join Request To Enter The Class */
    private function joinClass($request) {
        $user  = $this->user;
        $class = virtualclass::where('virtualclass.class_code', $request->code)
            ->join("users", "users.id", "=", "virtualclass.instructor")
            ->select("virtualclass.id as class_id", "users.institute_id as instructor_institute", "join_class_request.id as join_class_request_id", "classusers.id as classusers_id")
            ->leftjoin('join_class_request', function ($join) use ($user) {
                $join->on('join_class_request.class_id', '=', "virtualclass.id")
                    ->where('join_class_request.user_id', '=', $user->id)
                    ->where('join_class_request.accept_status', 'like', "waiting");
            })
            ->leftjoin('classusers', function ($join) use ($user) {
                $join->on('classusers.class_id', '=', "virtualclass.id")
                    ->whereNull('classusers.deleted_at')
                    ->where('classusers.uid', '=', $user->id);
            })
            ->first();

        // check if the code is class code
        if (empty($class->class_id)) {
            // there is no class wit this code
            return ['result' => 'error', 'sucess' => false, 'message' => 'كود المادة غير صحيح', 'toPush' => false];
        }
        // check if the user is a class member
        if (!empty($class->join_class_request_id)) {
            // already on hold
            return ['result' => 'error', 'sucess' => false, 'message' => ' لقد قمت بتقديم طلب للانضمام لهذه المادة بوقت سابق , انتظر موافقة مدرس المادة على انضمامك ', 'toPush' => false];
        }
        // check if the user is a class member
        if (!empty($class->classusers_id)) {
            // already class member
            return ['result' => 'error', 'sucess' => false, 'message' => 'انت مسجل في هذه المادة', 'toPush' => false];
        }

        // valid to insert the join request
        $joinClass                = new JoinClassRequest;
        $joinClass->user_id       = $user->id;
        $joinClass->class_id      = $class->class_id;
        $joinClass->accept_status = "waiting";
        $joinClass->save();

        return ['result' => $joinClass, 'sucess' => true, "message" => "تم ارسال طلبك بنجاح", 'toPush' => false];
    }
    /* Get In Class */
    private function enterClass($request) {
        $user = $this->user;
        $c    = $request->code;
        $code = classusers::where('uid', $user->id)
            ->join("virtualclass", "virtualclass.id", "=", "classusers.class_id")
            ->where('virtualclass.class_code', $c)
            ->first();
        if ($code = virtualclass::where('class_code', $c)->join("users", "users.id", "=", "virtualclass.instructor")->select("virtualclass.*", "users.id as user_id", 'users.avatar', 'users.university_id', DB::raw("'class' as type"))->first()) {
            $Chat = new Chat($user->id, $user->FB_UID);
            $Chat->addUserToRoom($user->id, $code);
            $code                   = $code->toArray();
            $classusers             = classusers::findOrCreate($user->id, $this->id);
            $classusers->uid        = $user->id;
            $classusers->deleted_at = null;
            $classusers->class_id   = $code['id'];
            $classusers->save();

            $code = virtualclass::where('class_code', $c)
                ->join('users as ins', 'ins.id', '=', 'instructor')
                ->select('virtualclass.*', 'ins.id', 'ins.avatar', 'ins.name as u_name', 'virtualclass.id as class_id')
                ->first();
            $name = $code->name;

            return ['result' => $code, 'sucess' => true, "message" => "أهلا بك في مادة $name ", 'toPush' => true];
        } else {
            return ['result' => 'error', 'sucess' => false, "message" => 'كود المادة غير صحيح', 'toPush' => false];
        }
    }
    /* To Add User To Class By Instructur Or Admin */
    private function addUserByInsrtructor($request) {
        $student    = $request->student;
        $user       = $this->user;
        $permission = $this->class->first();
        $c          = virtualclass::where('id', $this->id)->first();
        $code       = classusers::where('uid', $student)->where('class_id', $this->id)->first();
        if (($code || ($c->instructor !== $user->id)) || $c->instructor == $request->student) {
            return ['result' => 'error', 'sucess' => false, 'message' => 'انت مسجل في هذه المادة مسبقاً'];
        }

        $uni                    = explode("-", trim($student));
        $classusers             = classusers::findOrCreate($request->student, $this->id);
        $classusers->uid        = trim($request->student);
        $classusers->class_id   = $this->id;
        $classusers->deleted_at = null;
        $classusers->save();
        $code = virtualclass::where('virtualclass.id', $this->id)->with(['vcuser' => function ($query) {
            $query->whereColumn('virtualclass.instructor', '<>', 'classusers.uid');
        }])
            ->first();
        $vc   = virtualclass::where('virtualclass.id', $this->id)->join("users", "users.id", "=", "virtualclass.instructor")->select("virtualclass.*", "users.id as user_id", 'users.avatar', DB::raw("'class' as type"))->first();
        $Chat = (new Chat($this->user->id, $this->user->FB_UID))->addUserToRoom($request->student, $vc);
        return ['result' => $code->vcuser, 'sucess' => true, 'message' => 'لقد تمت اضافة هذا المستخدم'];
        return $code->vcuser;
    }
    /* Create New Class */
    private function add($request) {

        $user = $this->user;
        $days = [];
        $this->validate($request, [
            'name'       => 'required',
            'class_hall' => 'required',
            'from'       => 'required',
            'to'         => 'required',
        ]);
        if ($request->sat) {
            array_push($days, 'السبت');
        }
        if ($request->sun) {
            array_push($days, 'الاحد');
        }
        if ($request->mon) {
            array_push($days, 'الاثنين');
        }
        if ($request->tus) {
            array_push($days, 'الثلاثاء');
        }
        if ($request->wed) {
            array_push($days, 'الاربعاء');
        }
        if ($request->thu) {
            array_push($days, 'الخميس');
        }
        $qlanguages = implode(",", $days);
        $day        = $qlanguages;
        $vc         = new virtualclass;
        $classusers = new classusers;
        $vc->name   = $request->name;
        $c          = ucwords(substr(uniqid(), 7, 13));
        $d          = 1;
        while ($d == 1) {
            if ($code = virtualclass::where('class_code', $c)->first()) {
                $c = ucwords(substr(uniqid(), 7, 13));
            } else {
                $d = 2;
            }
            $Chat                         = new Chat($user->id, $user->FB_UID);
            $room                         = $Chat->addNewRoom('', 'class', $request->name . "-" . $request->class_hall);
            $vc->Fire_Base_Chat_Room_name = $room['Rooms'][$user->FB_UID]['name'];
            $vc->class_code               = $c;
            $vc->instructor               = $user->id;
            $vc->Description              = $request->input('description');
            $vc->start                    = (isset($request->start) && !empty($request->start)) ? date("Y-m-d H:i:s", strtotime($request->start)) : null;
            $vc->end                      = (isset($request->end) && !empty($request->end)) ? date("Y-m-d H:i:s", strtotime($request->end)) : null;
            $vc->from                     = date("Y-m-d H:i:s", strtotime($request->from));
            $vc->to                       = date("Y-m-d H:i:s", strtotime($request->to));
            $vc->days                     = $day;
            $vc->permission               = $request->permission;
            $vc->institute_id             = $user->institute_id;
            if ($request->season) {
                $vc->season = $request->season;
            }
            if ($request->Hours) {
                $vc->Hours = $request->Hours;
            }
            if ($request->privacy) {
                $vc->Privacy = $request->privacy;
            }
            if ($request->class_number) {
                $vc->class_number = $request->class_number;
            }
            $vc->class_hall = $request->class_hall;
            $vc->save();
            $classusers           = new classusers;
            $classusers->uid      = $user->id;
            $classusers->class_id = $vc->id;
            $classusers->save();
            $code = virtualclass::where('virtualclass.id', $vc->id)->join('users as ins', 'ins.id', '=', 'instructor')
                ->select('virtualclass.*', 'ins.id as uid', 'ins.avatar', 'ins.name as u_name', 'virtualclass.id as class_id')->first();
            \App\Models\post::addNewClassPost($user->id, $vc->id, $code->name, $user->avatar);
            return $code;
        }
    }
    /* Accepet Join In Class */
    private function accept($request) {
        $user            = $this->user;
        $requestedUserId = $request->user_id;
        $acceptStatus    = $request->status ? "accepted" : "rejected";
        // get class and user info for validation
        $class = virtualclass::where('virtualclass.id', $this->id)
            ->join("users", "users.id", "=", "virtualclass.instructor")
            ->select("virtualclass.id as class_id", "virtualclass.Fire_Base_Chat_Room_name", "virtualclass.name", "users.id as instructor_id", "users.institute_id as instructor_institute", "join_class_request.id as join_class_request_id", "classusers.id as classusers_id", "users.id as user_id", 'users.avatar', 'users.university_id', DB::raw("'class' as type"))
            ->leftjoin('join_class_request', function ($join) use ($requestedUserId) {
                $join->on('join_class_request.class_id', '=', "virtualclass.id")
                    ->where('join_class_request.user_id', '=', $requestedUserId)
                    ->where('join_class_request.accept_status', 'like', "waiting");
            })
            ->leftjoin('classusers', function ($join) use ($requestedUserId) {
                $join->on('classusers.class_id', '=', "virtualclass.id")
                    ->whereNull('classusers.deleted_at')
                    ->where('classusers.uid', '=', $requestedUserId);
            })
            ->first();
        // make sure that the requested is the class instructor
        if ($class->instructor_id != $user->id) {
            return ['result' => 'error', 'sucess' => false, 'message' => 'ليس لديك صلاحية لقبول الطلب'];
        }
        // insert classusers record
        if ($request->status) {
            $Chat = new Chat($this->user->id, $this->user->FB_UID);
            $Chat->addUserToRoom($requestedUserId, $class);
            $classusers             = classusers::findOrCreate($requestedUserId, $class->class_id);
            $classusers->deleted_at = null;
            $classusers->uid        = $requestedUserId;
            $classusers->class_id   = $class->class_id;
            $classusers->save();

            // update join reques record
            $update = JoinClassRequest::where('id', $request->join_id)
                ->update(['accept_status' => $acceptStatus]);
            $Assessment = Assessment::where('class_id', $request->class_id)->get();
            foreach ($Assessment as $key => $value) {
                $mark                = new M;
                $mark->mark          = 0;
                $mark->classuser_id  = $classusers->id;
                $mark->assessment_id = $value->id;
                $mark->save();

            }
            return ["message" => "تم قبول الطلب بنجاح"];
        } else {

            $update = JoinClassRequest::where('id', $request->join_id)
                ->update(['accept_status' => $acceptStatus]);
            return ["message" => "تم رفض طلب الانضمام"];
        }
    }
    /* Send Join To Enter Class */
    private function joinRequests($classId) {
        $user     = $this->user;
        $requests = JoinClassRequest::where('join_class_request.class_id', $classId)
            ->where('join_class_request.accept_status', 'waiting')
            ->leftJoin("users", "users.id", "=", "join_class_request.user_id")
            ->leftJoin("institutes", "institutes.id", "=", "users.institute_id")
            ->select("institutes.mthr_name as institute", "join_class_request.class_id", "join_class_request.id as join_id", "users.id as user_id", "users.avatar", "users.name as first_name", "users.mid_name", "users.last_name", "join_class_request.created_at")
            ->get();
        try {
            $requests = $requests->toArray();
        } catch (Exception $ex) {

        }
        foreach ($requests as $key => $request) {
            $requests[$key]['isfriend'] = $this->isFriend($request['user_id']);
        }
        // check class id
        if (empty($requests)) {
            return ['result' => 'error', 'success' => false, 'message' => 'لا يوجد طلبات انضمام في الوقت الحالي'];
        }
        return $requests;
    }
    /* Delete Class */
    private function delete($id) {
        $user = $this->user;
        $vc   = virtualclass::where('virtualclass.id', $id)
            ->with('instructor')
            ->withCount('homework')
            ->withCount('files')
            ->withCount('exam')
            ->withCount('post')
            ->withCount('user')
            ->first();
        if ($vc->instructor == $user->id) {
            $count = $vc->homework_count + $vc->files_count + $vc->exam_count + $vc->post_count;
            if ($count < 20 && $vc->user_count < 5) {
                $users = classusers::where('class_id', $vc->id)->delete();
                $vc->delete();
                return response()->success(['result' => 'done',
                    'sucess'                             => true]);
            } else {
                return response()->success(['result' => 'condition erorr',
                    'sucess'                             => false]);
            }
        } else {
            dd('not authrized');
        }
    }
    /* Add Admin With Teacher In Class  */
    private function addModerator(Request $request) {
        $user = $this->user;

        // check if user is class intructor
        $class = virtualclass::where('virtualclass.id', $request->class_id)
            ->leftjoin('class_moderator', function ($join) use ($user) {
                $join->on('class_moderator.class_id', '=', "virtualclass.id")
                    ->whereNull('class_moderator.deleted_at')
                    ->where('class_moderator.user_id', '=', $user->id);
            })
            ->get();

        // check if already moderator
        if (!empty($class->class_moderator)) {
            // already moderator
            return response()->failed(['result' => 'error', 'sucess' => false, 'message' => 'تم تعيين الطالب كمشرف من قبل']);
        }
        // validate the requested user
        if ($user->id != $class->instructor) {
            return (['result' => 'error', 'sucess' => false, 'message' => 'ليس لديك صلاحية لتعيين مشدف']);
        }

        // save user as a moderator for the class

        $classModerator           = new ClassModerator;
        $classModerator->class_id = $request->class_id;
        $classModerator->user_id  = $request->user_id;
        $classModerator->save();

        return response()->success([]);
    }
    /* Search on Student Mangment */
    private function search($id = false, $class = '') {
        $u      = [];
        $user   = [];
        $friend = [];
        if ($id === false) {
            return [];
        }
        $code = virtualclass::find($class)->vcuser()->select('User.id')->get();
        foreach ($code as $key => $value) {
            $user[$key] = $value->id;
        }
        $ids        = friends::where('id', $this->user->id)->get();
        $friend_ids = friends::where('friend_id', $this->user->id)->get();
        $friend     = array_merge(array_column($friend_ids->toArray(), 'id'), array_column($ids->toArray(), 'friend_id'));
        $u          = User::select('users.id', 'users.university_id', DB::raw('CONCAT(users.name," ",users.mid_name," ",users.last_name) AS name'), 'users.avatar as img')
            ->whereRaw("(CONCAT(users.name,' ',users.mid_name,' ',users.last_name,' - ' ,users.id ) like '$id%')")
        // ->whereIn('users.id', $friend)
            ->whereNotIn('users.id', $user)
            ->take(5)->get();
        foreach ($u as $key => $value) {
            $value->isfriend = $this->isFriend($value->id);
        }
        $check = array_filter($u->toArray());
        if (!empty($check)) {
            return $u;
        } else {
            return 'no post';
        }
    }
    /* Get User Information */
    public function get() {
        $u  = $this->user;
        $id = $this->id;
        if ($permission = $this->classusers->where('uid', $u->id)->first()) {
            $a    = 100 / 12;
            $user = $this->class->with(['joinRequests'])
                ->with(['vcuser' => function ($query) {
                    $query->whereColumn('virtualclass.instructor', '<>', 'classusers.uid');
                }])
                ->leftjoin('users as usr', 'virtualclass.instructor', '=', 'usr.id')
                ->leftjoin('institutes as ins', 'usr.institute_id', '=', 'ins.id')
                ->leftjoin('friends', function ($join) use ($u) {
                    $join->on('friends.friend_id', '=', 'virtualclass.instructor')
                        ->where('friends.id', '=', $u->id)
                        ->where('friends.status', '=', 'follower');
                })
                ->select(
                    'friends.friend_id as fr_id',
                    'friends.created_at as isfriend',
                    'virtualclass.*',
                    'usr.id as usr_id',
                    'usr.id as user_id',
                    'ins.mthr_name as institute',
                    'usr.avatar',
                    \DB::raw('CONCAT(usr.name," ",usr.last_name ) AS u_name'))
                ->first()->toArray();

            $count = count($user['join_requests']);
            unset($user['join_requests']);
            $user['join_requests'] = $count;
            $user['persantage']    = 0;
            $field                 = ['name', 'class_hall', 'class_number', 'institute_id', 'Books', 'Privacy', 'Hours', 'season', 'days', 'to', 'from', 'Description'];
            foreach ($field as $key => $value) {
                if ($user[$value] != null) {
                    $user['persantage'] += $a;
                }
            }
            $new_reg = [
                'action'  => 'getPermissionsWithId',
                'user_id' => $u->id,
                'Request' => [
                    'forigen' => 'instructor',
                    'user_id' => $u->id,
                    'id'      => $this->id,
                    'model'   => 'App\\Models\\virtualclass',
                ],
            ];
            $permissions         = (new \App\Http\Controllers\Members\Members($new_reg));
            $user['permissions'] = ['class' => $permissions->permissions['class']];
            $user['files']       = virtualclass::find($id)->files->count();
            $user['homework']    = virtualclass::find($id)->homework->count();
            foreach ($user['vcuser'] as $key => $value) {

                $value['isfriend'] = $this->isFriend($value['uid']);
            }
            // check user permission
            if ($u->id == $user['instructor']) {
                $permission = 2;
            } elseif (!empty($user['class_moderator'])) {
                $permission = 3;
            } else {
                $permission = 1;
            }
            $user['pms']        = $permission;
            $user['Permission'] = $user['Permission'] = (is_null($user['Permission']) || $user['Permission'] == 'false') ? false : true;
            $user['Books']      = ($user['Books']) ? \App\library\FileUpload::getInstance()->getImageFullPath($user['Books'], 'vc_book') : null;
            $user['syllabus']   = ($user['syllabus']) ? \App\library\FileUpload::getInstance()->getImageFullPath($user['syllabus'], 'vc_syllabus') : null;

            return $user;
        } else {
            return ['result' => 'error', 'sucess' => false, 'access' => false];
        }
    }
    /* To Know How Friend With User */
    public function isFriend($id) {
        $IsFriend = false;
        $user     = $this->user;
        if ($friend = friends::where('id', $user->id)->where('friend_id', $id)->first()) {
            $IsFriend = true;
        }
        return $IsFriend;
    }
    /* To Delete User By Admin or Instructor */
    private function remove($request) {
        $classusers = $this->classusers->where('uid', $request->user)->delete();
        if ($classusers) {
            $Room   = $this->class->first()->Fire_Base_Chat_Room_name;
            $FB_UID = User::where('id', $request->user)->first()->FB_UID;
            $code   = virtualclass::where('virtualclass.id', $this->id)->with(['vcuser' => function ($query) {
                $query->whereColumn('virtualclass.instructor', '<>', 'classusers.uid');
            }])
                ->first()->vcuser;
            $Chat = (new Chat($request->user, $FB_UID))->removeUserFromRoom($request->user, $Room);
            return ['result' => $code, 'sucess' => true, 'message' => 'لقد تمت حذف هذا المستخدم'];
        } else {
            return ['result' => 'error', 'sucess' => false, 'message' => 'فشل الحذف'];

        }
    }
    /* Function To Make VC Archived */
    private function archiving() {
        $vc = $this->class->first();
        if ($this->user->id == $vc->instructor) {
            $vc->status = 'Archived';
            $vc->save();
            return [
                'result' => 'Archived',
                'sucess' => true,
            ];
        } else {
            return [
                'result' => 'You Dont Have Permission To Archived This Class',
                'sucess' => false,
            ];
        }
    }
    /* Function To Make VC Active */
    private function activating() {
        $user = $this->user;
        $vc   = $this->class->first();
        if ($user->id == $vc->instructor) {
            $vc->status = 'Activated';
            $vc->save();
            return [
                'result' => 'Activated',
                'sucess' => true];
        } else {
            return [
                'result' => 'You Dont Have Permission To Activate This Class',
                'sucess' => false,
            ];
        }
    }
    /* Function To Make VC Archived */
    private function archived($skip = 0, $take = 10) {
        $user         = $this->user;
        $enteredClass = \App\Models\classusers::where('classusers.uid', $user->id)
            ->join('virtualclass', 'virtualclass.id', '=', 'classusers.class_id')
            ->join('users', 'virtualclass.instructor', '=', 'users.id')
            ->where('virtualclass.status', 'Archived')
            ->select('classusers.uid', 'classusers.class_id', 'virtualclass.*', 'users.id as instructor', DB::raw('CONCAT(users.name," ",users.mid_name," ",users.last_name) AS u_name'), 'users.avatar as avatar')
            ->skip($skip)
            ->take($take)
            ->get();
        return $enteredClass;
    }
    /* Function To Make VC Archived */
    private function classes() {
        $user    = $this->user;
        $myClass = \App\Models\virtualclass::where('instructor', $user->id)
            ->join('users', 'virtualclass.instructor', '=', 'users.id')
            ->where('virtualclass.status', 'Activated')
            ->select('virtualclass.*', 'virtualclass.instructor as uid', 'virtualclass.id as class_id', 'users.id', DB::raw('CONCAT(users.name," ",users.mid_name," ",users.last_name) AS u_name'), 'users.avatar as avatar')
            ->get();
        $myClassId    = ($myClass) ? array_column($myClass->toArray(), 'class_id') : [];
        $enteredClass = \App\Models\classusers::where('classusers.uid', $user->id)
            ->join('virtualclass', 'virtualclass.id', '=', 'classusers.class_id')
            ->join('users', 'virtualclass.instructor', '=', 'users.id')
            ->whereNotIn('classusers.class_id', $myClassId)
            ->where('virtualclass.status', 'Activated')
            ->select('classusers.uid', 'classusers.class_id', 'virtualclass.*', 'users.id', DB::raw('CONCAT(users.name," ",users.mid_name," ",users.last_name) AS u_name'), 'users.avatar as avatar')
            ->get();
        return ['owened' => $myClass, 'entered' => $enteredClass];

    }
}
