<?php
namespace App\Http\Controllers\Members;

use App\Http\Controllers\Classes\Helper;
use App\Http\Controllers\Controller;
use App\library\FileUpload;
use App\Models\category;
use App\Models\history;
use App\Models\institute;
use App\Models\instructor_info;
use App\Models\User;
use Bican\Roles\Models\Role;

class Members extends Controller {
    public $roles       = null;
    public $user_id     = null;
    public $operation   = null;
    public $level       = 0;
    public $user        = null;
    public $permissions = null;
    public $case        = null;
    public $result      = null;
    public $family      = [];
    public function __construct($array) {
        $this->operation  = (isset($array['action'])) ? $array['action'] : '';
        $array['Request'] = (isset($array['Request'])) ? $array['Request'] : [];
        $this->user_id    = (isset($array['user_id'])) ? $array['user_id'] : '';
        $this->user       = User::find($this->user_id);
        $this->result     = $this->readPermission()->decideLevel()->splitPermission()->decideOperation($array['Request']);

        return $this;
    }
    public function decideOperation($request = null) {

        switch ($this->operation) {
        case 'register':
            $Roles = Role::where('slug', 'like', '%visitor%')->get();
            $Roles = array_column($Roles->toArray(), 'id');
            // [21, 54, 60, 66, 72, 92]
            $this->addRole($Roles);
            $this->readPermission()->decideLevel()->splitPermission();
            return $this->permissions;
            break;
        case 'login':
            return $this->permissions['social'];
            break;
        case 'addInformation':
            if (isset($request->institute)) {
                $request->institute = ($request->specialty) ? $request->specialty : $request->institute;
            }
            return $this->checkForPromote($request);
            break;
        case 'addRole':
            //must be forbidden
            return $this->addRole($request['roles']);
            break;
        case 'addPermissions':
            return $this->addPermissions($request);
            break;
        case 'delPermissions':
            return $this->delPermissions($request['permissions']);
            break;
        case 'getPermissions':
            return $this->permissions;
            break;
        case 'getPermissionsWithId':
            $this->readPermissionsWithId($request)->decideLevel()->splitPermission();
            return $this->permissions;
            break;
        case 'getLevel':
            return $this->level;
            break;
        case 'assign':
            $this->case = 'toManager';
            return $this->promote($request);
            break;
        case 'fire':
            return $this->fire($request->institute);
            break;
        default:
            break;
        }
    }
    public function readPermission() {
        /* to Read Premission */
        $users = \App\Models\User::where('users.id', $this->user_id)
            ->with('userPermissions')
            ->with(['roles.permissions' => function ($query) {}])
            ->first();
        $result      = [];
        $this->roles = $users->roles->toArray();
        foreach (array_column($users->roles->toArray(), 'permissions') as $key => $value) {
            $value  = array_column($value, 'slug');
            $result = array_merge($result, $value);
        }
        foreach ($users->userPermissions as $key => $value) {
            $value  = array_column((array) $value, 'slug');
            $result = array_merge($result, $value);
        }
        $this->permissions = array_unique($result);
        return $this;
    }
    public function isOk($argument) {

        $id      = (isset($argument['id'])) ? $argument['id'] : null;
        $forigen = (isset($argument['forigen'])) ? $argument['forigen'] : 'user_id';
        $model   = (isset($argument['model'])) ? $argument['model'] : false;
        $model   = (isset($argument['model'])) ? $argument['model'] : false;
        $fathers = $model::where('id', $id)->where($forigen, $this->user_id)->first();
        // dd($fathers);
        return (($fathers) ? true : false);

    }
    public function readPermissionsWithId($request = []) {
        /* to Read Premission */
        // return $this->isOk($request);
        // if (condition) {
        //     # code...
        // }
        $users = \App\Models\User::where('users.id', $this->user_id)
            ->with('userPermissions')
            ->with(['roles.permissions' => function ($query) {
                // return $query->join('roles', 'role_id', '=', 'roles.id')->where('level', 4);
            }])
            ->first();
        $result = [];

        $this->roles = $users->roles->toArray();
        foreach (array_column($users->roles->toArray(), 'permissions') as $key => $value) {
            if ($this->roles[$key]['level'] == 4 || $this->isOk($request)) {
                $value  = array_column($value, 'slug');
                $result = array_merge($result, $value);
            }
        }
        foreach ($users->userPermissions as $key => $value) {
            $value  = array_column((array) $value, 'slug');
            $result = array_merge($result, $value);
        }
        $this->permissions = array_unique($result);
        return $this;
    }
    public function decideLevel() {
        /* To Get Levels */
        $a = [];
        if ($this->roles == null) {
            $this->readPermission();
        }
        foreach ($this->roles as $key => $value) {
            $a[$key] = [
                'id'    => $this->roles[$key]['id'],
                'level' => $this->roles[$key]['level'],
                'slug'  => $this->roles[$key]['slug'],
            ];
            $this->level = ($this->level < $this->roles[$key]['level']) ? $this->roles[$key]['level'] : $this->level;
        }
        $this->roles = $a;

        return $this;
    }
    public function splitPermission() {
        /* dividing permission with class / institute / soctial */
        if ($this->permissions == null) {
            $this->readPermission();
        }

        $a = [];
        foreach ($this->permissions as $key => $value) {
            // $splitted = explode('.', $value);
            $slug = explode('.', $value);
            switch ($slug[0]) {
            case 'institute':
                unset($slug[0]);
                $value            = implode('.', $slug);
                $a['institute'][] = $value;
                break;
            case 'home':
                unset($slug[0]);
                $value       = implode('.', $slug);
                $a['home'][] = $value;
                break;
            case 'class':
                unset($slug[0]);
                $value        = implode('.', $slug);
                $a['class'][] = $value;
                break;
            case 'social':
                unset($slug[0]);
                $value         = implode('.', $slug);
                $a['social'][] = $value;
                break;
            default:
                # code...
                break;
            }
        }
        $this->permissions = $a;
        return $this;
    }
    public function promoteRequest($id) {
        $data = [
            'requester' => $this->user->id,
            'requested' => $id,
            'place'     => 'institute',
            'operation' => 'promotion',
        ];

        return Helper::request($data);

    }
    public function checkForPromote($request) {
        /* Check Promatiomn To Promte User */
        $request       = (object) $request;
        $request->type = 'doctor_cv';
        $institute     = $this->getFamily($request);
        if ($institute) {
            if ($this->level == 5) {
                $this->case = 'changeInstituteToDoctor';
                $this->changeInstitute($request);
            } elseif ($this->level == 4) {
                if ($this->user->institute_id != $request->institute) {
                    $this->case = 'changeInstituteToStudent';
                    $this->changeInstitute($request);
                }
                if (isset($request->file) && isset($request->from) && isset($request->to)) {
                    try {
                        $upload = FileUpload::getInstance()->uploadFile($request);
                    } catch (Exception $e) {
                        die(['result' => 'error', 'sucess' => false, 'message' => 'failed to upload image']);
                    }
                    $req               = new instructor_info();
                    $req->user_id      = $this->user->id;
                    $req->avilablefrom = date('Y-m-d H:i:s', $request->from);
                    $req->avilableto   = date('Y-m-d H:i:s', $request->to);
                    $req->cv           = $upload['file_name'];
                    $this->case        = 'toDoctor';
                    // $this->promoteRequest($request->institute);
                    $this->promote($request);
                    $req->save();
                }
            } else {
                $this->case = 'impossible case';
                if (isset($request->institute) && isset($request->file) && isset($request->from) && isset($request->to)) {
                    try {
                        $upload = FileUpload::getInstance()->uploadFile($request);
                    } catch (Exception $e) {
                        die(['result' => 'error', 'sucess' => false, 'message' => 'failed to upload image']);
                    }
                    $this->case        = 'toDoctor';
                    $req               = new instructor_info();
                    $req->user_id      = $this->user->id;
                    $req->avilablefrom = date('Y-m-d H:i:s', $request->from);
                    $req->avilableto   = date('Y-m-d H:i:s', $request->to);
                    $req->cv           = $upload['file_name'];
                    // $this->promoteRequest($request->institute);
                    $this->promote($request);
                }
                if (isset($request->institute)) {
                    $this->changeInstitute($request);
                    $this->case = 'toStudent';
                    $this->promote($request);
                }
            }
        } else {
            if (isset($request->institute) && isset($request->file) && isset($request->from) && isset($request->to)) {
                try {
                    $upload = FileUpload::getInstance()->uploadFile($request);
                } catch (Exception $e) {
                    die(['result' => 'error', 'sucess' => false, 'message' => 'failed to upload image']);
                }
                $req               = new instructor_info();
                $req->avilablefrom = date('Y-m-d H:i:s', $request->from);
                $req->avilableto   = date('Y-m-d H:i:s', $request->to);
                $req->cv           = $upload['file_name'];
                $req->user_id      = $this->user->id;
                $req->save();
                $this->case = 'toDoctor';
                $this->promote($request);
            }
            if (isset($request->institute)) {
                $this->changeInstitute($request);
                $this->case = 'toStudent';
                $this->promote($request);
            }
        }
        return $this;
    }
    public function getFamily($request) {
        /* To Get Institute Info */
        $role = category::where('id', $request->institute)->with('parents')->with('childs')->first();
        $this->unionChild($role['child']);
        $this->unionParent($role['parents']);
        return $this->family;
    }
    public function unionChild($array) {
        /* To Add Childs With Fathers */
        if ($array != null) {
            foreach ($array as $key => $value) {
                if (!empty($value['childs'])) {
                    $this->unionChild($value['childs']);
                    unset($value['childs']);
                    array_push($this->family, $value);
                }
            }
        }
    }
    public function unionParent($array) {
        /* To Add Fathers With Childs */
        if ($array != null) {
            if (!empty($array['parents'])) {
                $this->unionParent($array['parents']);
                unset($array['parents']);
                array_push($this->family, $array);

            } else {array_push($this->family, $array);}
        }
    }
    public function getMainParent($institut) {
        $role = category::whereIn('id', function ($query) use ($institute) {
            //description
            $query->select('categories.parent_ids')
                ->from('categories')
                ->where('id', $institut)->first();
        })->first();
        return $role;
    }
    public function changeInstitute($request) {
        /* To Set End Date For Old Institute */
        $ins = array_column($this->family, 'id');
        // dd($ins);
        if (!in_array($this->user->institute_id, $ins)) {
            // dd($this);
            $old = history::where('user_id', $this->user->id)->where('institute_id', $this->user->institute_id)->first();
            if ($old) {
                $old->end = date('Y-m-d H:i:s');
                $old->save();
            }

            /* To Add New Institute History */
            $institute               = new history();
            $institute->start        = date('Y-m-d H:i:s');
            $institute->user_id      = $this->user->id;
            $institute->institute_id = $request->institute;
            $institute->save();
        }
        /* Change New Institute */
        $user               = User::find($this->user->id);
        $user->institute_id = $request->institute;
        $user->save();
    }
    public function promote($request) {

        /* To Give Promotion To Users */
        switch ($this->case) {
        case 'toDoctor':
            $doctor = Role::where('level', '<', 6)->where('level', '<>', 3)->get();
            foreach ($doctor as $key => $value) {
                $this->user->attachRole($value);
            }
            return 'Promoted';
            break;
        case 'toStudent':
            $student = Role::where('level', '<', 5)->where('level', '<>', 3)->get();
            foreach ($student as $key => $value) {
                $this->user->attachRole($value);
            }
            return 'Promoted';
            break;
        case 'toManager':
            $array   = [];
            $manager = \App\Models\insitituteFeature::where('insititute_id', $this->user->institute_id)->with('roles')->get();
            if ($manager != null) {
                foreach ($manager as $key => $value) {
                    foreach ($value->roles as $k => $v) {
                        if (!$this->user->hasRole($v->role_id)) {
                            $this->user->attachRole($v->role_id);
                        }
                        $debug[] = $v->role_id;
                    }
                }
            }
            return $debug;
            break;
        case 'toOwner':
            $admin          = institute_admin::where('institute_id', $request->institute)->first();
            $admin->user_id = $request->user_id;
            $admin->save();
            return 'Promoted';
            break;
        default:
            # code...
            break;
        }
    }
    public function addRole($Roles) {
        foreach ($Roles as $key => $value) {
            $this->user->attachRole($value);
        }
        return 'Roleadded';
    }
    public function addPermissions($permissions) {
        foreach ($Roles as $key => $value) {
            $this->user->attachPermission($value); // permission attached to a user
        }
        return 'Permissionsadded';
    }
    public function fire($id) {

        $array   = [];
        $manager = \App\Models\insitituteFeature::where('insititute_id', $this->user->institute_id)->with('roles')->get();
        // return ($manager);
        if ($manager != null) {
            foreach ($manager as $key => $value) {
                foreach ($value->roles as $k => $v) {
                    $this->user->detachRole($v->role_id);
                    $debug[] = $v->role_id;

                }
            }
        }
        return $debug;
    }
    public function delPermissions($permissions) {
        foreach ($Roles as $key => $value) {
            $this->user->detachPermission($value); // permission attached to a user
        }
        return 'Permissionsadded';
    }
}
