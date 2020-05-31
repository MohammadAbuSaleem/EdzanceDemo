<?php

namespace App\Http\Controllers\VClass\parts;

use App\Http\Controllers\Classes\Helper;
use App\Http\Controllers\Controller;
use App\Http\Controllers\VClass\Models\Attendance as att;
use App\Http\Controllers\VClass\Models\classusers;
use App\Http\Controllers\VClass\Models\virtualclass;
use App\Http\Controllers\VClass\MyPermission;
use App\Models\User;
use Auth;

class Attendance extends Controller implements MyPermission {

    protected $me    = null;
    protected $user  = null;
    protected $users = null;
    public $class_id = null;
    public $count    = null;

    public function __construct($id = false) {
        $this->me = classusers::where('classusers.class_id', $id)
            ->withCount('absence_att')
            ->withCount('excuse_att')
            ->withCount('delay_att')
            ->leftJoin('users', 'classusers.uid', '=', 'users.id')
            ->addSelect(
                \DB::raw('CONCAT(users.name," ",users.last_name ) AS name'),
                'users.id as id');
        $this->user     = Auth::user();
        $this->class_id = $id;
        return $this;
    }
    public function get() {
        $return = [];
        $id     = $this->class_id;
        $data   = classusers::where('classusers.class_id', $id)
            ->leftJoin('users', 'classusers.uid', '=', 'users.id')
            ->withCount('excuse_att')
            ->withCount('absence_att')
            ->withCount('delay_att')
            ->addSelect(
                \DB::raw('CONCAT(users.name," ",users.last_name ) AS name'),
                'classusers.uid as user_id',
                'classusers.status as status'
            )
            ->get()->toArray();
        $class = virtualclass::find($id);
        foreach ($data as $key => &$value) {
            // $value = $value->toArray();
            // $value['attendanceDate'] = $value['absence_date'];
            unset($value['uid'],
                $value['created_at'],
                $value['class_id'],
                $value['updated_at'],
                $value['deleted_at'],
                $value['mid_name'],
                $value['last_name'],
                $value['FB_UID'],
                $value['FB_PASS'],
                $value['oauth_provider'],
                $value['oauth_provider_id'],
                $value['telephone'],
                $value['email'],
                $value['password'],
                $value['DOB'],
                $value['address'],
                $value['logged'],
                $value['permissions'],
                $value['email_verified'],
                $value['email_verification_code'],
                $value['active_verification_code'],
                $value['autologged'],
                $value['activated_at'],
                $value['last_login'],
                $value['persist_code'],
                $value['reset_password_code'],
                $value['remember_token'],
                $value['avatar'],
                $value['showcase'],
                $value['viewers'],
                $value['views'],
                $value['acctype'],
                $value['university_id'],
                $value['college_id'],
                $value['facebook'],
                $value['google'],
                $value['linkedin'],
                $value['twitter'],
                $value['skype'],
                $value['url'],
                $value['sex'],
                $value['rating'],
                $value['specialition_id'],
                $value['institute_id'],
                $value['country_id']
            );
            if ($value['id'] != $class->instructor) {
                if ($value['status']) {
                    $value['status'] = true;
                } else {
                    $value['status'] = false;
                }
                array_push($return, $value);
            }

        }
        return $return;
    }
    /* this function is like midelware to call all function and give permitssion */
    public function __call($method, $arguments) {
        if (method_exists($this, $method)) {
            $reflect                  = new \ReflectionClass($this);
            $permission               = self::PERMISSION_INTERFACE[$reflect->getShortName()];
            $permission['keys']       = ['class_id' => '', 'user_id' => \Auth::user()->id];
            $permission['permission'] = $permission['permission'][$method];
            Helper::isOk($permission);
            return call_user_func_array(array($this, $method), $arguments);
        }
    }

    public function details() {
        $arg     = func_get_args();
        $details = classusers::where('classusers.class_id', $this->class_id)
            ->where('attendance.user_id', $arg[1])
            ->where('attendance.deleted_at', null)
            ->leftJoin('users', 'classusers.uid', '=', 'users.id')
            ->leftJoin('attendance', 'attendance.user_id', '=', 'classusers.uid')
            ->select(\DB::raw('CONCAT(users.name," ",users.last_name ) AS name'), 'attendance.*', 'users.id as user_id')->get();
        // foreach ($details as $key => &$value) {
        //     $value['attendanceDate'] = $value->absence_date;

        // }
        return $details;
    }
    /* To Get Attendance */
    public function getAttendance() {
        $this->attendance = att::find($this->class_id)->groupBy('user_id')->get();
        return $this;
    }
    /* To Add Attendance */

    public function add($request) {
        $data = [];
        foreach ($request->all()['data'] as $key => $value) {
            $attendance               = new att;
            $attendance->class_id     = $this->class_id;
            $attendance->user_id      = $value['user_id'];
            $attendance->type         = $value['type'];
            $attendance->absence_date = date('Y-m-d H:i:s', $request->all()['absence_date']);
            $attendance->save();
            $data[] = $attendance;
            // $attendance->attendanceDate = $attendance->absence_date;
            // $attendance->uid            = $attendance->user_id;
            // unset($attendance->absence_date, $attendance->user_id);

        }
        $return = (count($data) > 1) ? $data : $data[0];
        return $return;
    }
    /* To Get User In Class */
    public function getUsers() {
        return $this->users = classuser::where('class_id', $this->class_id)
            ->join('users', 'classuser.user_id')
            ->get();

    }
    /* to get count of miss for some one */
    public function absenceCount($id) {
        return $this->count = classuser::where('uid', $id)->where('class_id', $this->class_id)->first()->absence_count;
    }
    /* to get all class user miss count */
    public function classAbsenceCount() {
        $this->count        = classuser::where('class_id', $this->class_id)->get();
        $count              = array_column($this->count, 'absence_count');
        return $this->count = array_sum($count);
    }
    /* To Get Attendance To Show To Fathers */
    public function fathers($child_id) {
        $fathers = Parents::where('parent_id', $this->user->id)->where('child_id', $child_id)->first();
        if ($fathers) {
            if ($this->user->allowed('virual.class.attendance.read', $fathers, true, 'parent_id')) {
                $this->getAttendance()->getUsers();
                return [
                    'attendance'   => $this->me->get(),
                    'users'        => $this->users,
                    'absenceCount' => $this->absenceCount($child_id)];
            } else {
                die('not authorized');
            }
        } else {die('not authorized');}
    }
    /* To Edit At Attendance Date */

    public function edit($request) {
        $arg                      = func_get_args();
        $user                     = $this->user;
        $r                        = $request->all()[0];
        $attendance               = att::where('id', $r['id'])->first();
        $attendance->type         = $r['type'];
        $attendance->absence_date = date('Y-m-d H:i:s', $r['absence_date']);
        $attendance->save();
        // $attendance->attendanceDate = date('Y-m-d H:i:s', $r['absence_date']);
        $attendance->user_id = $attendance->user_id;
        return $attendance;
    }
    /* To Edit At Attendance Date */
    // public function editStatus($request) {
    //     $arg                      = func_get_args();
    //     $att               = att::where('id', $request->id)->first();
    //     $att->type         = $request->type;
    //     $att->absence_date = date('Y-m-d H:i:s', $request->absence_date);
    //     $att->save();
    //     return $att;
    // }
    /* To Edit At user status */
    public function editUserStatus($request) {
        $arg = func_get_args();

        $attendance = classusers::where('classusers.class_id', $this->class_id)
            ->where('classusers.uid', $request->user_id)->first();
        $attendance->status = $request->status;
        $attendance->save();
        $attendance->user_id = $attendance->uid;
        $attendance->status  = $request->status;
        if ($attendance->status) {
            $attendance->status = true;
        } else {
            $attendance->status = false;
        }
        return $attendance;
    }
    /* To Delete Attendance For User */
    public function delete($request, $id) {
        $delete = att::where('id', $request->id)->delete();
        if ($delete) {
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
