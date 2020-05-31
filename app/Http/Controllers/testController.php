<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Classes\VirtualClass\MarksClass as Mark;
use App\Http\Controllers\Members\Members;
use App\Models\category;
use App\Models\institute;
use App\Models\institute_admin;
use App\Models\taxonomy;
use App\Models\User;
use Auth;
use Bican\Roles\Models\Permission;
use Bican\Roles\Models\Role;
use Illuminate\Http\Request;

class testController extends Controller
{
    public $final = [];
    /*member test*/
    public function Member(Request $r, $action, $operation, $id, $skip = 0, $take = 10)
    {
        $r->institute = $id;
        $r->cv        = $id;
        $r->from      = date('Y-m-d H:i:s');
        $to           = date("Y-m-d H:i:s", strtotime('+2 hours'));
        $r->to        = $to;
        $array        = ['Request' => $r, 'action' => $action, 'operation' => $operation, 'user_id' => $id, 'skip' => $skip, 'take' => $take];
        $member       = (new Members($array))->result;
        return response(compact('member'));
    }

    public function permission(Request $r, $action)
    {
        $permission = (new members($action));
        return response(compact('permission'));
    }
    public function getAll($id)
    {
        $a = new Mark($id);
        return $a->get();
    }
    /* to make new role */
    public function postMakeRole(Request $r)
    {
        $adminRole = Role::create([
            'name'        => $r->name,
            'slug'        => $r->name,
            'description' => $r->description, // optional
            'level'       => $r->level, // optional, set to 1 by default
        ]);
        $this->postAttachRole($adminRole, 100158);
        return $adminRole;
    }
    public function getUser($id)
    {
        return 'User:' . $id;
        $user = User::find($id);
        return $user;
    }
    public function getData($id)
    {
        return Auth::user();
        return 'Data:' . $id;
        $user = User::find($id);
        return $user;
    }
    public function newPost($id)
    {
        return Auth::user();
        return 'newPost:' . $id;
        $user = User::find($id);
        return $user;
    }
    public function postAttachRole($adminRole = null, $id)
    {
        if ($adminRole) {
            $user = User::find($id);
            $user->attachRole($adminRole); // you can pass whole object, or just an id
        }
        return $adminRole;
    }
    /* to add new permission */
    public function postCreatePermission(Request $r)
    {
        $createUsersPermission = Permission::create([
            'name'        => $r->name,
            'slug'        => implode('.', explode(' ', $r->name)),
            'description' => $r->description, // optional
            'model'       => $r->model,
        ]);
        return $createUsersPermission;
    }
    /* to take permission from user */
    public function getDetachPermission($roleId, $permId)
    {
        $Permission = Permission::find($permId);
        $role->detachPermission($Permission);
        return $createUsersPermission;
    }
    /* to give permission to user */
    public function getAttachPermission($roleId, $permId)
    {

        $role       = Role::find($roleId);
        $Permission = Permission::find($permId);
        $role->attachPermission($Permission);
        return $role;
    }
    /* to get all categoty */
    public function getCategoty($type, $id)
    {

        $role = category::where('id', $id)->with($type)->get();
        return $role;
    }
    /* to get family relation */
    public function getFamily($id)
    {
        $role = category::where('id', $id)->with('parents')->with('childs')->first();
        $this->unionChild($role['child']);
        $this->unionParent($role['parents']);
        return $this->final;
    }
    public function unionChild($array)
    {
        if ($array != null) {
            foreach ($array as $key => $value) {
                if (!empty($value['childs'])) {
                    $this->unionChild($value['childs']);
                    unset($value['childs']);
                    array_push($this->final, $value);
                }
            }
        }
    }
    public function unionParent($array)
    {
        if ($array != null) {
            if (!empty($array['parents'])) {
                $this->unionParent($array['parents']);
                unset($array['parents']);
                array_push($this->final, $array);

            } else {array_push($this->final, $array);}
        }
    }
    public function getModelPerm($institute, $Permission, $model)
    {
        $editArticlesPermission = Permission::find(117);

        \Auth::user()->attachPermission($editArticlesPermission);
        $article = institute_admin::where('user_id', \Auth::user()->id)->where('institute_id', $institute)->first();
        if ($article) {
            if (\Auth::user()->allowed('edit.articles', $article)) {
                dd('authorized');
            } else {
                dd('Not authorized');

            }
        } else {
            dd('Not authorized');

        }
    }
    /* to get subcategoty in institute */
    public function getSubCategoty($id)
    {
        $role = category::find($id)->child;
        return compact('role');
    }
    /* to add categoty to institute */
    public function postAddCategoty(Request $r)
    {
        $cat = new category();
        // if ($r->parent) {
        //     $cat->parent = $r->parent;
        // }
        $cat->parent = ($r->parent) ? $r->parent : null;
        if ($tag = \DB::table('taxonomies')->where('body', 'LIKE', implode('-', explode(' ', $r->tag)))->first()) {
            $cat->name        = implode(' ', explode('-', $tag->body));
            $cat->taxonomy_id = $tag->id;
        } else {
            $tag         = new taxonomy();
            $tag->body   = implode('-', explode(' ', $r->tag));
            $tag->number = 1;
            $tag->save();
            $cat->name        = implode(' ', explode('.', $r->tag));
            $cat->taxonomy_id = $tag->id;
        }
        if ($r->name) {
            $cat->name = $r->name;
        }
        $cat->save();
        return compact('cat', 'tag');
    }
    /* to add new institute */
    public function postAddInstitue(Request $r)
    {
        $cat                 = $this->postAddCategoty($r);
        $inst                = new institute;
        $inst->mthr_name     = $r->name;
        $inst->presidant     = $r->presidant;
        $inst->category_id   = $cat['cat']['id'];
        $inst->contact       = $r->contact;
        $inst->status        = 'disable';
        $inst->type          = $r->type;
        $inst->avatar        = $r->avatar;
        $inst->countrey_id   = $r->countrey_id;
        $inst->student       = 0;
        $inst->instructor    = 0;
        $inst->study_program = $r->study_program;
        $inst->save();
        return compact('inst', 'cat');
    }

    public function Script () {
        
    }

}
