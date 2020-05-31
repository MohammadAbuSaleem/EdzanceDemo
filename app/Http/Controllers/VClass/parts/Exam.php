<?php

namespace App\Http\Controllers\VClass\parts;

use App\Http\Controllers\Classes\Helper;
use App\Http\Controllers\Controller;
use App\Http\Controllers\VClass\MyPermission;
use App\library\notifications\Notifications;
use App\Models\classusers;
use App\Models\exam as ex;
use App\Models\User;
use App\Models\virtualclass;
use Auth;

class Exam extends Controller implements MyPermission
{
    public $me       = null;
    public $user     = null;
    public $class_id = 'No Data Yet';
    public $partId   = 'all';
    public function __construct($classId = false, $partId = 'all')
    {
        $this->class_id = $classId;
        $this->partId   = $partId;
        if ($classId == 'solo') {
            $this->me = ex::where('deleted_at', null);
        } else {
            $this->me = ex::where('virtualclass_id', $this->class_id);
        }
        $this->me = $this->me->with('comment')->leftJoin('users', 'users.id', '=', 'exams.user_id')->select('exams.*', \DB::raw('CONCAT(users.name," ",users.last_name ) AS user_name'), /*'users.name', 'users.last_name',*/'users.avatar as user_avatar')->orderBy('created_at', 'desc');

        $this->user = Auth::user();
        return $this;
    }
    public function __call($method, $arguments)
    {
        if (method_exists($this, $method)) {
            $reflect                  = new \ReflectionClass($this);
            $permission               = self::PERMISSION_INTERFACE[$reflect->getShortName()];
            $permission['permission'] = $permission['permission'][$method];
            $permission['relation']   = classusers::classs($this->class_id)->where('uid', \Auth::user()->id)->leftJoin('exams', 'classusers.class_id', '=', 'exams.virtualclass_id')->first();
            Helper::isOk($permission);
            return call_user_func_array(array($this, $method), $arguments);
        }
    }
    /* To Add New Exam */
    private function add($request)
    {
        $user = $this->user;
        $this->validate($request, [
            'type' => 'required',
            'hall' => 'required',
            'date' => 'required',
        ]);
        $exam                  = new ex;
        $exam->status          = 1;
        $exam->type            = $request->type;
        $exam->virtualclass_id = $request->id;
        $exam->hall            = $request->hall;
        $exam->user_id         = $user->id;
        $exam->exam_date       = date("Y-m-d H:i:s", $request->date);
        $exam->exam_time       = date("Y-m-d H:i:s", $request->mytime);
        $exam->save();
        $exam  = ex::where('id', $exam->id)->orderBy('created_at', 'asc')->first();
        $class = virtualclass::where('id', $request->id)->first();
        // Notification Code
        $notificationParams['class_name'] = $class->name;
        // $notificationParams['exam_date']  = date("Y-m-d H:i:s", $exam->exam_date);
        // $notificationParams['exam_time']  = date("Y-m-d H:i:s", $exam->exam_date);
        $notificationParams['exam_hall'] = $exam->hall;
        $notificationParams['exam_id']   = $exam->id;
        $notificationParams['user_id']   = $user->id;
        $notificationParams['class_id']  = $request->id;
        $notificationParams['icon']      = $user->avatar;
        Notifications::getInstance()->notifyUsers(11, $notificationParams);
        $this->result = $exam;
        return $exam;
    }
    /* To Edit In Exam */
    private function edit($request)
    {
        $user            = $this->user;
        $exam            = ex::where('id', '=', $request->id)->first();
        $exam->type      = $request['data']['type'];
        $exam->exam_date = date("Y-m-d H:i:s", $request->data['exam_date']);
        $exam->hall      = $request['data']['hall'];
        $exam->save();
        $class                            = virtualclass::where('id', $exam->virtualclass_id)->first();
        $notificationParams['class_name'] = $class->name;
        $notificationParams['class_id']   = $class->id;
        $notificationParams['exam_type']  = $exam->type;
        $notificationParams['exam_id']    = $exam->id;
        $notificationParams['user_id']    = $user->id;
        $notificationParams['user_name']  = $user->name;
        $notificationParams['icon']       = $user->avatar;
        Notifications::getInstance()->notifyUsers(14, $notificationParams);
        return $exam;
    }
    /* To Delete Exam */
    private function delete($id)
    {
        $delete = ex::where('id', $id)->delete();
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
