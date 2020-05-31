<?php

namespace App\Http\Controllers;

use App\Http\Controllers\PermissionInterface\PermissionInterface;

class HomeController extends Controller implements PermissionInterface
{
    private static $instance = null;
    public static function getInstance()
    {

        if (self::$instance == null) {
            self::$instance = new HomeController();
        }
        return self::$instance;
    }
    public function __call($method, $arguments)
    {
        if (method_exists($this, $method)) {
            $reflect    = new \ReflectionClass($this);
            $permission = self::PERMISSION_INTERFACE[$reflect->getShortName()];
            // $permission['keys']       = ['user_id' => \Auth::user()->id];
            $permission['permission'] = $permission['permission'][$method];
            Helper::isOk($permission);
            return call_user_func_array(array($this, $method), $arguments);
        }
    }

    private function Me()
    {
        $user  = Auth::user();
        $users = \App\Models\User::where('users.id', $user->id)->with('myclass')->with('userPermissions')->with(['roles.permissions' => function ($query) {

        }])->leftjoin('specialition as spec', 'users.specialition_id', '=', 'spec.id')
            ->leftjoin('university as uni', 'users.university_id', '=', 'uni.id')
            ->select('users.id',
                'users.name',
                'users.mid_name',
                'users.last_name',
                'users.FB_UID',
                'users.FB_PASS',
                'users.email_verified',
                'users.active_verification_code',
                'users.activated_at',
                'users.avatar',
                'users.showcase',
                'users.acctype',
                'users.university_id',
                'users.college_id',
                'users.status',
                'users.specialition_id',
                'users.country_id',
                'spec.mthr_name as spec_name',
                'spec.id as spec_id',
                'uni.mthr_name as uni_name',
                'uni.id as university_id'
            )->withCount('friends')->withCount('followers')->first();
        $count = \App\Models\notification::where('receiver_id', "=", $user->id)->where('seen', "=", 0)->count();
        // get unseen notifications count
        $users['un_seen_notifications'] = $count;
        return response()->success($users);
    }
}
