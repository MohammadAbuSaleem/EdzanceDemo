<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Debugger\Debugger;
use App\Models\mapping\category;
use App\Models\mapping\college;
use App\Models\mapping\institute;
use App\Models\mapping\InstitutesJoin;
use App\Models\mapping\mapping;
use App\Models\mapping\specialition;
use App\Models\mapping\taggable;
use App\Models\mapping\taxonomy;
use App\Models\mapping\university;
use App\Models\mapping\User;
use App\Models\mapping\variable;

class bio extends Controller {
    public $arg             = [];
    public $data            = [];
    public $inst            = [];
    public $debug           = [];
    public $last_type       = 'university';
    public $last_id         = 0;
    public $mapping_last_id = 0;

    public $option = [
        'child_type'      => 'college,specialition,year,class',
        'type'            => 'university',
        'main_child_type' => 'specialition',

    ];
    public function getId($id, $type = null) {
        if ($id < 3) {
            return $id;
        }
        $type = ($type == null) ? $this->last_type : $type;
        $map  = mapping::where('past_id', $id)->where('type', $type)->first();
        if ($map) {
            return ($map->new_id);
        } else {
            (new mapping)->error($id, $type);
            return $id * 1000;
        }
    }
    public function mapEngine() {
        institute::truncate();
        category::truncate();
        variable::truncate();
        mapping::truncate();
        $this->mapping_last_id        = new variable;
        $this->mapping_last_id->id    = 1;
        $this->mapping_last_id->title = 'mapping_last_id';
        $this->mapping_last_id->value = 0;
        $this->mapping_last_id->save();
        institute::insert([
            ['mthr_name'  => 'وزارة التعليم العالي ',
                'child_types' => 'university,collage,department,specialition,year,class',
                'status'      => 'enabled',
                'type'        => 'ministrey',
                'id'          => 1,
                'country_id'  => 14,
            ],
            ['mthr_name'  => 'وزارة التربية والتعليم',
                'child_types' => 'court,section,school,year,class',
                'status'      => 'enabled',
                'type'        => 'ministrey',
                'id'          => 2,
                'country_id'  => 14,
            ],
        ]);
        category::insert([
            ['name'           => 'وزارة التعليم العالي ',
                'parent'          => '0',
                'level'           => '0',
                'main_child_type' => 'university',
                'is_main'         => 0,
                'main_parent'     => 0,
                'parent_ids'      => null,
                'id'              => 1,
            ],
            ['name'           => 'وزارة التربية والتعليم',
                'parent'          => '0',
                'level'           => '0',
                'main_child_type' => 'school',
                'is_main'         => 0,
                'main_parent'     => 0,
                'parent_ids'      => null,
                'id'              => 2,
            ],
        ]);
        return $this;
    }
    public function mapUniversity() {
        $university = university::all();
        $this->mapEngine()->mappingInst($university);
        echo '<h1> done University </h1>';
        return redirect()->route('mapCollege');
        return $this;
    }
    public function mapCollege() {
        $college = college::all();
        $this->setType(['main_child_type' => 'specialition', 'child_type' => 'specialition,year,class', 'type' => 'college']);
        $this->last_type = 'university';
        $this->mappingInst($college);
        echo '<h1> done Colleges </h1>';
        return redirect()->route('mapspecialition');
        return $this;
    }
    public function mapspecialition() {
        $specialition = specialition::all();
        $this->setType(['main_child_type' => 'year', 'child_type' => 'year,class', 'type' => 'specialition']);
        $this->last_type = 'college';
        $this->mappingInst($specialition);
        echo '<h1> done specialitions </h1>';
        return redirect()->route('mapUsers');
        return $this;
    }
    public function mapUsers() {
        $users = User::all();
        $this->setType(['main_child_type' => 'year', 'child_type' => 'year,class', 'type' => 'specialition']);
        $this->last_type = 'specialition';
        foreach ($users as $key => $v) {
            \DB::connection('live_new')->table('users')->where('id', $v->id)->update([
                'institute_id'    => $this->getId($v->specialition_id, 'specialition'),
                'specialition_id' => $v->specialition_id,
                'university_id'   => $this->getId($v->university_id, 'university'),
                'college_id'      => $this->getId($v->college_id, 'college'),
            ]);
        }
        echo '<h1> done Users </h1>';
        return redirect()->route('mapGroup');
        return $this;
    }
    public function mapCorrection($skp = 0, $tk = 50) {
        $inst = category::where('parent', '>', 0)
            ->skip($skp)
            ->take($tk)
            ->orderBy('id', 'desc')
            ->get();
        foreach ($inst as $key => $ins) {
            $parents = category::whereIn('id', explode(',', $ins->parent_ids))
                ->where('is_main', 1)
                ->select('id', 'name', 'is_main', 'main_parent', 'parent')
                ->first();
            category::where('id', $ins->id)->update(['main_parent' => $parents->id]); //Redis::set('mapping_last_id', $this->input('last_id'));

            $inst[$key]['parents'] = $parents;
            # code...
        }

        return redirect()->route('mapCorrection', ['skp' => $skp + count($inst), 'tk' => $tk]);

        return $inst;

    }
    public function permission($type, $id = 0) {
        $user = User::find($id);
        // dd($user);
        switch ($type) {
        case 'doctor':
            $arr = [
                'action'  => 'addInformation',
                'Request' => [
                    'institute' => 999999,
                    'specialty' => 999999,
                    'file'      => 'test',
                    'from'      => 'test',
                    'to'        => 'test'],
                'user_id' => $user->id,
            ];
            break;
        case 'student':
            $arr = [
                'action'  => 'addInformation',
                'Request' => ['institute' => 999999, 'specialty' => 999999],
                'user_id' => $user->id,
            ];
            break;

        default:
            # code...
            break;
        }
        (new \App\Http\Controllers\Members\Members($arr))->permissions;
        return back();
    }
    public function promote($id = 0) {
        $req  = \App\Models\request::find($id);
        $info = \App\Models\instructor_info::where('user_id', $req->requester_id)->first();
        $arr  = [
            'action'  => 'addInformation',
            'Request' => [
                'institute' => $req->requested_id,
                'specialty' => $req->requested_id,
                'file'      => $info->cv,
                'from'      => $info->avilablefrom,
                'to'        => $info->avilableto],
            'user_id' => $req->requester_id,
        ];
        $a = (new \App\Http\Controllers\Members\Members($arr))->permissions;
        return back();
    }
    public function mapAddPermission($skp = 0, $tk = 50) {
        $last  = [];
        $users = User::skip($skp)->take($tk)->get();
        // $users = User::get();
        // return $users;
        foreach ($users as $key => $user) {
            if ($user->acctype == 2) {
                if (is_null($user->instructorInfo)) {
                    $arr = [
                        'action'  => 'addInformation',
                        'Request' => ['institute' => $user->institute_id, 'specialty' => $user->specialition_id],
                        'user_id' => $user->id,
                    ];
                } else {
                    $arr = [
                        'action'  => 'addInformation',
                        'Request' => [
                            'institute' => $user->institute_id,
                            'specialty' => $user->specialition_id,
                            'file'      => $user->instructorInfo->cv,
                            'from'      => $user->instructorInfo->avilablefrom,
                            'to'        => $user->instructorInfo->avilableto],
                        'user_id' => $user->id,
                    ];
                }
            } else {
                $arr = [
                    'action'  => 'addInformation',
                    'Request' => ['institute' => $user->institute_id, 'specialty' => $user->specialition_id],
                    'user_id' => $user->id,
                ];
            }
            $new_reg = [
                'action'  => 'register',
                'user_id' => $user->id,
                'Request' => ['institute' => $user->institute_id, 'specialty' => $user->specialition_id],
            ];
            $member = new \App\Http\Controllers\Members\Members($new_reg);
            $a      = new \App\Http\Controllers\Members\Members($arr);
            array_push($last, $a);

        }
        // return $d;
        if (count($users) > 0) {
            return '<h1> done Permissions </h1>';
            # code...
        }
        return redirect()->route('mapPermission', ['skp' => $skp + count($users), 'tk' => $tk]);
        // return redirect()->route('profile');
        // return $this;
    }
    public function readSchool($school) {
        $csv        = array_map('str_getcsv', file("$school.txt"));
        $department = [];
        foreach ($csv as $key => $value) {
            $array[$key] = explode("$$", $value[0]);
            array_push($department, $array[$key][1]);
        }
        $department = array_unique($department);

        dd($department);
        dd($array);
    }

    public function mapGroup() {
        $group = \DB::connection('live')->table('groups')->get();
        $this->setType(['main_child_type' => '', 'child_type' => '', 'type' => 'groups']);
        $this->last_type = 'specialition';
        foreach ($group as $key => $v) {
            \DB::connection('live_new')->table('groups')->where('id', $v->id)->update([
                'institute_id'      => $this->getId($v->specialization_id, 'specialition'),
                'university_id'     => $this->getId($v->university_id, 'university'),
                'specialization_id' => $v->specialization_id,
            ]);
        }
        echo '<h1> done groups </h1>';
        return redirect()->route('mapInstructor');
        return $this;
    }
    public function mapInstructor() {
        $this->setType(['main_child_type' => '', 'child_type' => '', 'type' => 'instructor_education']);
        $this->last_type      = 'specialition';
        $instructor_education = \DB::connection('live')->table('instructor_education')->get();
        foreach ($instructor_education as $key => $v) {
            \DB::connection('live_new')->table('instructor_education')->where('id', $v->id)->update([
                'institute_id'   => $this->getId($v->specialization, 'specialition'),
                'specialization' => $v->specialization,
            ]);
        }
        return '<h1> done For All </h1>';
        return $this;
    }
    public function getData() {
        return $this->data;
    }
    public function Debugging() {
        return $this->debug;
    }
    public function addDebug($data = '', $inst = null) {

        $time = (isset($this->debug['last_time'])) ? $this->debug['last_time'] : '';
        $time = ($time == date('H:i:s', time() - date('Z'))) ? '' : $time . " || ";
        $time = (!isset($this->debug['last_time']) && $time == ' || ') ? date('H:i:s', time() - date('Z')) . " || " : $time;

        $this->debug['last_time'] = date('H:i:s', time() - date('Z'));
        if ($inst) {
            if ($time != '') {
                $this->debug[$inst][] = '====================================';
            }

            $this->debug[$inst][] = $time . $data;
        } else {
            if ($time != '') {
                $this->debug['initial'][] = '====================================';
            }
            $this->debug['initial'][] = $time . $data;
        }
        return $this;
    }
    public function stop($e = '', $line = __LINE__, $function = __METHOD__) {
        // dd($this->arg['parent']);
        $this->debug['line']     = $line;
        $this->debug['function'] = $function;
        $this->addDebug($e);
        throw new \Exception($e);
    }
    public function setType($array = []) {

        $this->last_type = $this->option['type'];
        foreach ($array as $key => $value) {
            $this->option[$key] = $value;
        }
        return $this;
    }
    public function mappingInst($data = null) {
        $variableSetup = [
            'pobox'              => ['type' => 'number', 'title' => 'رقم البريد'],
            'eng_name'           => ['type' => 'text', 'title' => 'الاسم بالانجليزية'],
            'telephone'          => ['type' => 'text', 'title' => 'رقم الهاتف'],
            'email'              => ['type' => 'text', 'title' => 'البريد الالكتروني'],
            'fax'                => ['type' => 'text', 'title' => 'رقم الفاكس'],
            'costavg'            => ['type' => 'number', 'title' => 'تكلفة الدراسة'],
            'DOB'                => ['type' => 'date', 'title' => 'تاريخ التأسيس'],
            'mthr_place'         => ['type' => 'map', 'title' => 'المدينة'],
            'URL'                => ['type' => 'url', 'title' => 'عنوان الموقع الالكتروني'],
            'mthr_Description'   => ['type' => 'bigText', 'title' => 'الوصف'],
            'eng_Description'    => ['type' => 'bigText', 'title' => 'الوصف بالانجليزية'],
            'eng_address'        => ['type' => 'bigText', 'title' => 'العنوان بالانجليزية'],
            'rating'             => ['type' => 'number', 'title' => 'التقييم المحلي'],
            'globalrating'       => ['type' => 'number', 'title' => 'التقييم العالمي'],
            'longitude'          => ['type' => 'text', 'title' => 'احداثيات طول'],
            'latittude'          => ['type' => 'text', 'title' => 'احداثيات عرض'],
            'showcase'           => ['type' => 'image', 'title' => 'خلفية الصفحة'],
            'mthr_Country'       => ['type' => 'map', 'title' => 'البلد'],
            'rating_count'       => ['type' => 'number', 'title' => 'عدد المقيميين'],
            'globalrating_count' => ['type' => 'number', 'title' => ''],

        ];
        $foregienSetup = [
            'university'   => 1,
            'college'      => 'university_id',
            'specialition' => 'college_id',
            'users'        => 'specialition_id',
            'class'        => 'specialition_id',
        ];
        foreach ($data as $k => $v) {
            /////////////////////////////////////////////
            $last_id       = variable::where('id', 1)->first()->value; //Redis::get('mapping_last_id');
            $this->last_id = ($last_id) ? $last_id : 0;
            /////////////////////////////////////////////
            $node = [
                'past_id' => $v->id,
                'new_id'  => $v->id + $this->last_id,
                'type'    => $this->option['type'],
                'name'    => $v->mthr_name,
            ];
            $mapping                 = (new mapping)->set($node);
            $v->id                   = $v->id + $this->last_id;
            $this->arg               = $v;
            $this->arg['child_type'] = $this->option['child_type'];
            $this->arg['type']       = $this->option['type'];
            $this->arg['parent']     = $this->getId($foregienSetup[$this->arg['type']]);
            if ($this->option['type'] != 'university') {
                $foregien            = $foregienSetup[$this->option['type']];
                $this->arg['parent'] = $this->getId($v->$foregien);
                unset($v->$foregien);
            }
            $this->AddCategoty();
            $this->AddInstitue();
            unset($v->id);
            unset($v->qualification_id);
            unset($v->department_id);
            unset($v->deleted_at);

            foreach ($v->toArray() as $key => $value) {
                if (!isset($this->inst->$key)) {
                    $var               = new variable();
                    $var->block        = $key;
                    $var->title        = (isset($variableSetup[$key])) ? $variableSetup[$key]['title'] : $key;
                    $var->value        = $value;
                    $var->status       = 'enabled';
                    $var->type         = (isset($variableSetup[$key])) ? $variableSetup[$key]['type'] : 'text';
                    $var->institute_id = $this->inst->category_id;
                    $var->save();
                    $all[$k][$key] = $var;
                }
            }
        }
        $this->data[$this->option['type']] = ['variables' => $all, 'institute' => $this->inst];

        $this->last_id = $this->input('last_id');
        /////////////////////////////////
        variable::where('id', 1)->update(['value' => $this->input('last_id')]); //Redis::set('mapping_last_id', $this->input('last_id'));
        /////////////////////////////////
        $this->addDebug("end " . $this->option['type'] . "=================")
            ->addDebug("last id: $this->last_id")
            ->addDebug("start " . $this->option['main_child_type'] . " =====================");

        return $this;
    }
    /* to add categoty to institute */
    public function AddCategoty() {
        //trigger exception in a "try" block
        try {
            $cat = new category();
            // set default values
            $cat->name    = (isset($this->arg['mthr_name'])) ? $this->arg['mthr_name'] : '';
            $id           = $this->input('id');
            $cat->id      = $id;
            $cat->is_main = 1;
            // $this->addDebug("(+value-$id) ")->addDebug("$cat->name");
            $cat->main_child_type = $this->option['main_child_type'];
            $cat->parent          = (isset($this->arg['parent'])) ? $this->arg['parent'] : 0;
            $parent               = InstitutesJoin::find($this->arg['parent']);
            do {
                $retVal = (is_null($parent)) ? $this->stop("(XFail 1 Parent Not Found) $cat->name : |$cat->parent| ", __LINE__, __METHOD__) : '';
                if ($parent->is_main && $cat->is_main) {
                    $cat->main_parent = $parent->id;
                    $retry            = false;
                    category::where('id', $parent->id)->update(['main_child_type' => $this->input('type')]);
                } else {
                    if ($parent->parent > 0) {
                        $parent = InstitutesJoin::find($parent->parent);
                        $retry  = ($parent->level == 0) ? false : true;
                    } else {
                        $retry = false;
                    }
                }
            } while ($retry);
            $parent  = InstitutesJoin::find($this->arg['parent']);
            $parents = [$this->arg['parent']];
            do {

                $retVal = (is_null($parent)) ? $this->stop("(XFail 2 Parent Not Found) $cat->name : |$cat->parent| ", __LINE__, __METHOD__) : '';
                if ($parent->parent != 0) {
                    array_push($parents, $parent->parent);
                    $parent = category::find($parent->parent);
                    $retry  = true;
                } else { $retry = false;}
            } while ($retry);
            $cat->parent_ids = implode(',', $parents);
            $cat->level      = ($this->input('level') == '') ? ++$parent->level : $this->input('level');
            $cat->save();
            // $this->addDebug("(+category-$id)")->addDebug("$cat->name");
            if (isset($this->arg['tags'])) {
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
            }
            $this->arg['institute'] = $this->input('id');
            return $this;
            return compact('cat', 'tag');
        } catch (\Exception $e) {
            //catch exception
            // echo 'Message: ' . $e->getMessage();
            // dd($e);
            $this->debug['error'] = [
                'message' => $e->getMessage() ?? "",
                'code'    => $e->getCode() ?? "",
                'file'    => $e->getFile() ?? "",
                'line'    => $e->getLine() ?? "",
                // 'severity' => $e->getSeverity() ?? "",
                'trace'   => $e->getTrace() ?? "",
            ];
            $a = new Debugger($this);
        } // create new category
    }
    public function input($name) {
        return (isset($this->arg[$name])) ? $this->arg[$name] : '';
    }
    /* to add new institute */
    public function AddInstitue() {
        $this->arg['tag']  = (isset($this->arg['tag'])) ? $this->arg['tag'] : '';
        $inst              = new institute;
        $inst->id          = $this->input('id');
        $inst->mthr_name   = $this->input('mthr_name');
        $inst->presidant   = $this->input('presidant');
        $inst->category_id = $this->input('id');
        $inst->contact     = $this->input('contact');
        $inst->status      = 'disabled';
        $inst->type        = $this->input('type');
        $inst->child_types = $this->input('child_types');
        $inst->avatar      = $this->input('avatar');
        $inst->country_id  = $this->input('country_id');
        $inst->students    = 0;
        $inst->instructors = 0;
        $inst->save();
        $this->arg['last_id'] = $this->input('id');
        $this->inst           = $inst;
        return $this;
    }
}
