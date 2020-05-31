<?php
namespace App\Http\Controllers\Institutes;

use App\Http\Controllers\Institutes\Models\category;
use App\Http\Controllers\Institutes\Models\institute;
use App\Http\Controllers\Institutes\Models\InstitutesJoin;
use App\Http\Controllers\Institutes\Models\taggable;
use App\Http\Controllers\Institutes\Models\taxonomy;

// use App\Http\Controllers\Institutes\Parts\InstititesInformation;
// use App\Http\Controllers\Institutes\Parts\post;
// use App\Http\Controllers\Institutes\Parts\Setting;
// use App\Http\Controllers\Institutes\Parts\Member;

class institutes
{
    public $me;
    public $actions;
    public $arg = [];
    public $user;
    public $users = [];
    public $admin;
    public $inst;
    public $features;
    public $result           = [];
    public $debug            = [];
    public $childs           = [];
    public $fathers          = [];
    public $family           = [];
    private static $instance = null;

    public function __construct($arg = null)
    {
        $arg = ($arg) ? $arg : [];
        if (isset($arg['request'])) {
            # code...
            foreach ($arg['request'] as $key => $value) {
                $this->arg[$key]            = [];
                $this->arg[$key]            = (isset($arg['request'][$key])) ? $arg['request'][$key] : "no $key";
                $this->debug['construct'][] = "adding $key to args";
            }
        }
        foreach ($arg as $key => $value) {
            $this->arg[$key]            = [];
            $this->arg[$key]            = (isset($arg[$key])) ? $arg[$key] : "no $key";
            $this->debug['construct'][] = "adding $key to args";
        }
        if (isset($this->arg['institute'])) {
            if ($this->inst = institute::find($this->arg['institute'])) {
                $this->family();
                $this->debug['construct'][] = "get institute [" . $this->inst->id . "] from DB to inst";
            }
        }

        return ($this);
    }
    public static function getInstance($arg)
    {
        if (self::$instance == null) {
            self::$instance = new institutes($arg);
        }
        return self::$instance;
    }
    public function __call($method, $arguments)
    {
        if (method_exists($this, $method)) {

            $reflect                  = new \ReflectionClass($this);
            $permission               = self::PERMISSION_INTERFACE[$reflect->getShortName()];
            $permission['permission'] = $permission['permission'][$method];
            Helper::isOk($permission);
            return call_user_func_array([$this, $method], $arguments);
        }
    }
    /* to get all categoty */
    private function categoty($type, $id)
    {

        $role = category::where('id', $id)->with($type)->get();
        return $role;
    }
    /* to get family relation */
    private function family()
    {
        $role = category::where('id', $this->inst->id)->with('parents')->with('childs')->first();
        $this->unionChild($role['child']);
        $this->unionParent($role['parents']);
        return $this->family;
    }
    private function unionChild($array)
    {
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
    private function unionParent($array)
    {
        if ($array != null) {
            if (!empty($array['parents'])) {
                $this->unionParent($array['parents']);
                unset($array['parents']);
                array_push($this->family, $array);

            } else {array_push($this->family, $array);}
        }
    }
    /* to get subcategoty in institute */
    private function SubCategoty($id)
    {
        $role = category::find($id)->child;
        return compact('role');
    }
    /* to get subcategoty in institute */
    public function Institutes($id)
    {
        return $role = InstitutesJoin::all();
    }
    /* to add categoty to institute */
    private function AddCategoty()
    {
        //create new category
        $cat = new category();
        //determine if main is passed and give it dafault value
        $cat->main = (isset($this->arg['main'])) ? 1 : 0;
        //determine if parent is passed and give it dafault value
        $cat->parent = (isset($this->arg['parent'])) ? $this->arg['parent'] : 0;
        //determine if name is passed
        if (isset($this->arg['name'])) {
            $cat->name = $this->arg['name'];
        }
        //get the parent data
        $parent = InstitutesJoin::find($this->arg['parent']);
        //make a copy of parent to check if it's main
        $updater = $parent;
        //check the parents recrusivley to find the first main parent
        do {
            //get first main parent
            if ($updater->is_main == 1 & $first_main == true) {
                $cat->main_parent = $updater->id;
            }
            //check if this parent is main
            if ($updater->is_main != 0 && $cat->main != 0) {
                $retry = false;
                //set my type to my parent main_child_type
                category::where('id', $updater->id)->update(['main_child_type' => $updater->type]);
            } else {
                if ($updater->parent > 0) {
                    //if the parent not main go to next parent
                    $updater = InstitutesJoin::find($updater->parent);
                    //check if we complete all parents
                    $retry = ($updater->parent == 0) ? false : true;
                } else {
                    $retry = false;
                }
            }
        } while ($retry);

        $updater = $parent;
        $parents = [$cat->parent];
        //get all parent id to save to parent_ids

        do {
            array_push($parents, $updater->parent);
            $updater = category::find($updater->parent);
            $retry   = ($updater->parent != 0) ? true : false;
        } while ($retry);

        $cat->parent_ids = implode(',', $parents);
        // foreach ($cat->parent_ids as $key => $value) {
        //     $id = $value->id;
        // }

        $cat->level = ($this->input('level') == '') ? ++$parent->level : $this->input('level');
        $cat->name  = (isset($this->arg['name'])) ? $this->arg['name'] : '';
        $cat->save();
        foreach ($this->arg['tags'] as $key => $value) {
            if ($tag = \DB::table('taxonomies')->where('body', 'LIKE', implode('-', explode(' ', $value)))->first()) {
            } else {
                $tag         = new taxonomy();
                $tag->body   = implode('-', explode(' ', $value));
                $tag->number = 1;
                $tag->save();
            }
            $taggable                = new taggable;
            $taggable->taxonomy_id   = $tag->id;
            $taggable->taggable_id   = $cat->id;
            $taggable->taggable_type = __NAMESPACE__ . '\Models\institute';
            $taggable->save();

        }
        $this->arg['institute'] = $cat->id;
        return $this;
        return compact('cat', 'tag');
    }
    private function input($name)
    {
        return (isset($this->arg[$name])) ? $this->arg[$name] : '';
    }
    /* to add new institute */
    public function AddInstitue()
    {
        $this->arg['tag'] = (isset($this->arg['tag'])) ? $this->arg['tag'] : '';
        $this->AddCategoty();
        $inst              = new institute;
        $inst->id          = $this->input('institute');
        $inst->mthr_name   = $this->input('name');
        $inst->presidant   = $this->input('presidant');
        $inst->category_id = $this->input('institute');
        $inst->contact     = $this->input('contact');
        $inst->status      = 'disabled';
        $inst->type        = $this->input('type');
        $inst->child_types = $this->input('child_types');
        $inst->avatar      = $this->input('avatar');
        $inst->country_id  = $this->input('country_id');
        $inst->students    = 0;
        $inst->instructors = 0;
        $inst->save();
        $this->inst = $inst;
        return $this;
    }
    /* to Activate user search */
    public function MainInstitute($country)
    {
        $u = [];
        $u = InstitutesJoin::select('id', 'name', 'parent', 'level', 'main', 'created_at', 'country_arabic', 'child_types', 'type')
            ->where('country_id', $country)
            ->where('status', 'enabled')
            ->where('level', 0)
            ->get();

        if (count($u) == 0) {
            return ('no post');
        }
        return ($u);
    }
    /* to Activate user search */
    public function searchInstitute($father = 0, $val = null)
    {
        // die(var_dump('belal'));
        $u    = [];
        $last = [];
        if ($father) {
            // if ($ids = Redis::HGETALL("searchInstitute:$father:$val:ids")) {
            //     $names = Redis::HGETALL("searchInstitute:$father:$val:names");
            //     ksort($names);
            //     return (array_combine($ids, $names));
            // }
            $u = category::where('name', 'like', "%$val%")
                ->join('institutes as ins', 'ins.id', '=', 'categories.id')
                ->when(($father == 1 || $father == 2), function ($query) use ($father) {
                    return $query->where('categories.id', '<>', 1)
                        ->where('categories.id', '<>', 2)
                    // ->orWhere('parent', $father)
                    ;
                })
                ->where('is_main', 1)
                ->where('categories.id', '<>', 1)
                ->where('categories.id', '<>', 2)
                ->where('main_parent', $father)
                ->select('categories.id'
                    , 'categories.name'
                )
                ->take(10)->orderBy('id')->get();
        }
        // $this->result = $u;
        // Redis::pipeline(function ($pipe) use ($val, $father, $u, $last) {
        //     $ids   = array_column($u->toArray(), 'id');
        //     $names = array_column($u->toArray(), 'name');
        foreach ($u as $key => $value) {
            //         $pipe->HMSET("searchInstitute:$father:$val:ids", $ids);
            //         $pipe->HMSET("searchInstitute:$father:$val:names", $names);
            //         $pipe->EXPIRE("searchInstitute:$father:$val:ids", 60 * 60 * 24);
            //         $pipe->EXPIRE("searchInstitute:$father:$val:names", 60 * 60 * 24);
            $this->result[$value->id] = $value->name;
        }
        // });
        if (count($this->result) == 0) {
            return ('no post');
        }
        return ($this->result);
    }
    public function searchByTag2($father = null, $val = null)
    {
        $u = [];
        if ($father) {
            $parent = InstitutesJoin::find($father);
            $type   = explode(',', $parent->child_types)[$parent->main - 1];
            $u      = InstitutesJoin::where('name', 'like', "%$val%")
                ->where('type', $type)->with(['tags' => function ($query) { /*dd($query->toSql());*/}])
                ->select('id', 'name', 'parent', 'level', 'main', 'created_at', 'type', 'child_types', 'parent_ids')
                ->take(7)->get();
        }

        if (count($u) == 0) {
            return ('no post');
        }
        return ($u);
    }
    public function searchByTag($tags = null, $val = null)
    {
        $u = [];
        if ($father) {
            $parent = InstitutesJoin::find($father);
            $type   = explode(',', $parent->child_types)[$parent->main - 1];
            $u      = InstitutesJoin::where('name', 'like', "%$val%")
                ->where('type', DB::raw('SPLIT_STRING((SELECT `institutes`.`child_types` FROM `Institutes` WHERE `Institutes`.`id` = ' . $father . '),",",(SELECT `categories`.`main` FROM `categories` WHERE `categories`.`id` = ' . $father . '))'))

                ->select('id', 'name', 'parent', 'level', 'main', 'created_at', 'type', 'child_types', 'parent_ids')->with('tags')
                ->take(7)->get();
        }

        if (count($u) == 0) {
            return ('no post');
        }
        return ($u);
    }
}
