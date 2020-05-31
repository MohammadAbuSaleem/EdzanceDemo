<?php

namespace App\Http\Controllers\Institutes\Parts;

use App\Http\Controllers\Classes\Helper;
use App\Http\Controllers\Controller;
use App\Http\Controllers\VClass\Permissions;
use App\Models\Assessment;
use App\Models\classusers;
use App\Models\mark as M;
use Auth;

class Mark extends Controller implements Permissions
{
    public $me          = null;
    public $user        = 'No Data Yet';
    public $class_id    = 'No Data Yet';
    public $partId      = 'all';
    public $marks       = [];
    public $assessments = [];
    public $users       = [];
    public function __construct($classId = false, $partId = 'all')
    {
        $this->user     = Auth::user();
        $this->class_id = $classId;
        $this->partId   = $partId;
        $this->me       = classusers::clas($this->class_id)->with('mark');

        return $this;
    }
    public function __call($method, $arguments)
    {
        if (method_exists($this, $method)) {
            $reflect                  = new \ReflectionClass($this);
            $permission               = self::PERMISSION_INTERFACE[$reflect->getShortName()];
            $permission['permission'] = $permission['permission'][$method];
            $permission['relation']   = classusers::clas($this->class_id)->where('uid', \Auth::user()->id)->leftJoin('marks', 'classusers.id', '=', 'marks.classuser_id')->first();
            Helper::isOk($permission);
            return call_user_func_array(array($this, $method), $arguments);
        }
    }
    /* To Get Assessment */
    private function getAssessments()
    {
        $this->assessments = Assessment::where('class_id', $this->class_id)->get();
        return $this;
    }

    // /* To Add Assessment */
    // private function add($Request)
    // {
    //     $assessments            = new Assessment;
    //     $assessments->class_id  = $this->class_id;
    //     $assessments->min       = $Request->min;
    //     $assessments->max       = $Request->max;
    //     $assessments->exam_name = $Request->exam_name;
    //     $assessments->save();
    //     $classusers = classusers::where('class_id', $this->class_id)->get();
    //     foreach ($classusers as $key => $value) {
    //         $mark                = new M;
    //         $mark->mark          = 0;
    //         $mark->classuser_id  = $value->id;
    //         $mark->assessment_id = $assessments->id;
    //         $mark->save();

    //     }
    //     return $this;
    // }

    /* To Get Markes */
    // private function edit($array)
    // {
    //     foreach ($array as $key => $value) {
    //         $mark       = M::find($value->mark_id);
    //         $mark->mark = $value->mark;
    //         $mark->save();
    //     }
    // }
    /* To Get Markes */
    private function getMarks()
    {
        if ($this->partId != 'all') {
            $this->marks = M::where('id', $this->class_id)->get();
        } else {
            $this->marks = $this->me->get();
        }
        return $this;
    }

    /* This To Get Markes And Assessment And Users */
    private function get()
    {

        $this->getMarks()->getAssessments();
        return ['users' => $this->me->get()];
    }

    /* This Function To Reset All Mark And Let It = 0 */
    // private function delete($id)
    // {
    //     $reset = M::whereIn($id)->update(['mark' => 0]);
    //     return (($reset) ? 'success' : 'error');
    // }

    /* To Get Student Mark */
    private function studentmark($uid)
    {
        return $studentmark = classusers::where('uid', $uid)
            ->leftjoin('marks', 'marks.id', '=', 'marks.classuser_id')
            ->leftjoin('users', 'users.id', '=', 'classusers.uid')
            ->get();
    }

    /* To Get Assessment Marks */
    private function exammark($assessment_id)
    {
        return $exammark = M::where('assessment_id', $assessment_id)
            ->leftjoin('classusers', 'classusers.id', '=', 'marks.classuser_id')
            ->leftjoin('users', 'users.id', '=', 'classusers.uid')->get();
    }

    /* To Get Student Mark For Fathers */
    private function fathers($child_id)
    {
        $fathers = Parents::where('parent_id', $this->user->id)->where('child_id', $child_id)->first();
        if ($fathers) {
            if ($this->user->allowed('virual.class.post.delete', $fathers, true, 'parent_id')) {
                $this->getMarks()->getAssessments();
                return [
                    'marks'       => $this->marks,
                    'assessments' => $this->assessments,
                    'users'       => $this->me->get()];
            } else {
                die('not authorized');
            }
        } else {die('not authorized');}
    }

}
