<?php

namespace App\Http\Controllers;
use App\Models\User;
// use App\Models\users;
use Auth;
use App\Http\Controllers\Classes\insititute\insititutes;
use Bican\Roles\Models\Permission;
use Bican\Roles\Models\Role;
use Hash;
use App\Models\specialition;
//use Crypt;
use App\Http\Controllers\Classes\Chat;
use App\Http\Controllers\Classes\Posts;
use Illuminate\Http\Request;
use Input;
use Validator;

class UserController extends Controller
{

    public function testObject($id){
      $a = new Posts();
       return $a->comments($id,'classpost');


    }


    public function addInstitute (Request $r) {
           $inst =  new insititutes();
           $inst = $inst->add($r);
        return $inst;

    }
          public function getProfile($id)
    {
        $users = User::where('id', $id)->with('student_info')->with('instructor_info')->with('post')->take(10)->get();
        return response()->success($id);
    }
              public function getHi($id)
    {
        $users = User::where('id', $id)->with('student_info')->with('instructor_info')->get();
        return response()->success($users);
    }
    public function getCheck()
    {  
        return response()->success( Auth::check());
     }
     public function Me()
    {
        $user = Auth::user();
        $users = \App\Models\User::where('users.id', $user->id)->with('myclass')->with('userPermissions')->with(['roles.permissions'=>function($query){

                    }])->leftjoin('specialition as spec',  'users.specialition_id', '=','spec.id')
                       ->leftjoin('university as uni',  'users.university_id', '=','uni.id')
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
                                 'spec.mthr_name as spec_name' ,
                                 'spec.id as spec_id',
                                 'uni.mthr_name as uni_name' ,
                                 'uni.id as university_id'
                                    )->withCount('friends')->withCount('followers')->first();
       $count = \App\Models\notification::where('receiver_id', "=", $user->id)->where('seen', "=", 0)->count();
        // get unseen notifications count 
        $users['un_seen_notifications'] = $count;
        return response()->success($users);
    }

    public function putMe(Request $request)
    {
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

    public function getIndex()
    {
        $users = User::all();

        return response()->success(compact('users'));
    }

    public function getShow($id)
    {
        $user = User::find($id);
        $user['role'] = $user
                        ->roles()
                        ->select(['slug', 'roles.id', 'roles.name'])
                        ->get();

        return response()->success($user);
    }

    public function putShow(Request $request)
    {
        $userForm = array_dot(
            app('request')->only(
                'data.name',
                'data.email',
                'data.id'
            )
        );

        $userId = intval($userForm['data.id']);

        $user = User::find($userId);

        $this->validate($request, [
            'data.id' => 'required|integer',
            'data.name' => 'required|min:3',
            'data.email' => 'required|email|unique:users,email,'.$user->id,
        ]);

        $userData = [
            'name' => $userForm['data.name'],
            'email' => $userForm['data.email'],
        ];

        $affectedRows = User::where('id', '=', $userId)->update($userData);

        $user->detachAllRoles();

        foreach (Input::get('data.role') as $setRole) {
            $user->attachRole($setRole);
        }

        return response()->success('success');
    }

    public function deleteUser($id)
    {

        return response()->success('success');
    }


    public function getRoles()
    {
        $roles = Role::all();

        return response()->success(compact('roles'));
    }

    public function getRolesShow($id)
    {
        $role = Role::find($id);

        $role['permissions'] = $role
                        ->permissions()
                        ->select(['permissions.name', 'permissions.id'])
                        ->get();

        return response()->success($role);
    }

    public function putRolesShow()
    {
        $roleForm = Input::get('data');
        $roleData = [
            'name' => $roleForm['name'],
            'slug' => $roleForm['slug'],
            'description' => $roleForm['description'],
        ];

        $roleForm['slug'] = str_slug($roleForm['slug'], '.');
        $affectedRows = Role::where('id', '=', intval($roleForm['id']))->update($roleData);
        $role = Role::find($roleForm['id']);

        $role->detachAllPermissions();

        foreach (Input::get('data.permissions') as $setPermission) {
            $role->attachPermission($setPermission);
        }

        return response()->success('success');
    }


    public function postRoles()
    {
        $role = Role::create([
            'name' => Input::get('role'),
            'slug' => str_slug(Input::get('slug'), '.'),
            'description' => Input::get('description'),
        ]);

        return response()->success(compact('role'));
    }


    public function deleteRoles($id)
    {
        Role::destroy($id);

        return response()->success('success');
    }

    public function getPermissions()
    {
        $permissions = Permission::all();

        return response()->success(compact('permissions'));
    }

    public function postPermissions()
    {
        $permission = Permission::create([
            'name' => Input::get('name'),
            'slug' => str_slug(Input::get('slug'), '.'),
            'description' => Input::get('description'),
        ]);

        return response()->success(compact('permission'));
    }

    public function getPermissionsShow($id)
    {
        $permission = Permission::find($id);

        return response()->success($permission);
    }

    public function putPermissionsShow()
    {
        $permissionForm = Input::get('data');
        $permissionForm['slug'] = str_slug($permissionForm['slug'], '.');
        $affectedRows = Permission::where('id', '=', intval($permissionForm['id']))->update($permissionForm);

        return response()->success($permissionForm);
    }

    public function deletePermissions($id)
    {
        Permission::destroy($id);

        return response()->success('success');
    }

}
