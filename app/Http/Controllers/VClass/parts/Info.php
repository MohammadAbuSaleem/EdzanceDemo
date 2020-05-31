<?php
namespace App\Http\Controllers\VClass\parts;

use App\Http\Controllers\Classes\Helper;
use App\Http\Controllers\Controller;
use App\Http\Controllers\VClass\MyPermission;
use App\Models\User;
use App\Models\virtualclass;
use Auth;

class Info extends Controller implements MyPermission
{
    public $me = null;
    public function __construct($id = false, $part = null)
    {
        $this->me = virtualclass::where('id', $id);
        return $this;
    }

    public function __call($method, $arguments)
    {
        if (method_exists($this, $method)) {
            $reflect                  = new \ReflectionClass($this);
            $permission               = self::PERMISSION_INTERFACE[$reflect->getShortName()];
            $permission['keys']       = ['id' => '', 'uid' => \Auth::user()->id];
            $permission['permission'] = $permission['permission'][$method];
            Helper::isOk($permission);
            return call_user_func_array(array($this, $method), $arguments);
        }
    }
    /* To Get User Data */
    private function users()
    {
        $this->me = $this->me->with('vcuser')->withCount('vcuser');
        return $this;
    }
    /* To Get One User Information */
    private function justUser($skp, $tk)
    {
        $a = $this->me->with(['vcuser' => function ($query) use ($skp, $tk) {
            $query->skip($skp)->take($tk);
        }])->first();
        return $a->vcuser;
    }
    /* To Edit In Class Information */
    private function edit($request)
    {
        $user = Auth::user();
        if ($vc = virtualclass::where('id', $request->id) /*->where('status', 'Activated')*/->first()) {
            if ($user->id == $vc->instructor) {
                $vc->days   = $request->days;
                $vc->season = $request->season;
                if (!empty($request->book) && $request->book !== 'null' && isset($_FILES['book'])) {
                    $book      = \App\library\FileUpload::getInstance()->uploadFileWithName($request, 'book', 'vc_book');
                    $vc->Books = $book['file_name'];
                }
                if (!empty($request->syllabus) && $request->syllabus !== 'null' && isset($_FILES['syllabus'])) {
                    $syllabus     = \App\library\FileUpload::getInstance()->uploadFileWithName($request, 'syllabus', 'vc_syllabus');
                    $vc->syllabus = $syllabus['file_name'];
                }
                $vc->Hours        = $request->Hours;
                $vc->Privacy      = $request->Privacy;
                $vc->class_number = $request->class_number;
                $vc->class_hall   = $request->class_hall;
                $vc->Description  = $request->Description;
                $vc->name         = $request->name;
                $vc->from         = date("Y-m-d H:i:s", $request->from);
                $vc->to           = date("Y-m-d H:i:s", $request->to);
                $vc->Permission   = (is_null($request->Permission) || $request->Permission == 'false' || $request->Permission == false || $request->Permission == 'undefined') ? 'false' : 'true';
                $vc->Permission   = $request->Permission;

                $vc->save();
                $vc->Permission = (is_null($request->Permission) || $request->Permission == 'false' || $request->Permission == false || $request->Permission == 'undefined') ? false : true;
                $vc['Books']    = \App\library\FileUpload::getInstance()->getImageFullPath($vc['Books'], 'vc_book');
                $vc['syllabus'] = \App\library\FileUpload::getInstance()->getImageFullPath($vc['syllabus'], 'vc_syllabus');
                return $vc;
            }
        } else {
            return 'id erorr !!';
        }
    }

}
