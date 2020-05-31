<?php

namespace App\Http\Controllers\Classes\VirtualClass;

use App\Http\Controllers\Controller;
use App\Models\Assessment;
use App\Models\classusers;
use App\Models\Mark;
use App\Models\Parents;
use App\Models\virtualclass;
use Auth;

class MarksClass extends Controller
{
    protected $user            = 'No Data Yet';
    protected static $instance = null;
    protected $class_id        = 'No Data Yet';
    protected $marks           = [];
    protected $assessments     = [];
    protected $users           = [];

    public function __construct($id = 0)
    {
        $this->user     = Auth::user();
        $this->class_id = $id;
        return $this;
    }
    public static function getInstance()
    {
        if (self::$instance == null) {
            self::$instance = new Exams();
        }
        return self::$instance;
    }
    /* To Get Users In Class */
    public function getUsers()
    {
        $this->users = classusers::clas($this->class_id)->with('mark')
            ->get();
        return $this;

    }
    /* To Get Assessment */
    public function getAssessments()
    {
        $this->assessments = Assessment::where('class_id', $this->class_id)->get();
        return $this;
    }
    /* To Get Markes */
    public function getMarks()
    {
        $this->marks = Mark::find($this->class_id)->get();
        return $this;
    }
    /* This Function To Call Any Function Not Found */
    public function __call($name, $arguments)
    {
        //$this->ahmad('asda',dsadas)
        //$name = 'ahmad'  , $arguments = ['asda',dsadas]
        $new_name = 'get' . ucfirst($name);
        $this->$new_name();
        $data = $this->$name;
        return $data;
    }
    /* This To Get Markes And Assessment And Users */
    public function get()
    {
        $this->getMarks()->getAssessments()->getUsers();
        return [
            'marks'       => $this->marks,
            'assessments' => $this->assessments,
            'users'       => $this->users];
    }
    /* This Function To Reset All Mark And Let It = 0 */
    public function resetAll($id)
    {
        $reset = Mark::whereIn($id)->update(['mark' => 0]);
    }
    /* To Get Student Mark */
    public function studentmark($uid)
    {
        $studentmark = classusers::where('uid', $uid)
            ->leftjoin('marks', 'marks.id', '=', 'marks.classuser_id')
            ->leftjoin('users', 'users.id', '=', 'classusers.uid')->get();
        return $studentmark;
    }
    /* To Get Assessment Marks */
    public function exammark($assessment_id)
    {
        $exammark = Mark::where('assessment_id', $assessment_id)
            ->leftjoin('classusers', 'classusers.id', '=', 'marks.classuser_id')
            ->leftjoin('users', 'users.id', '=', 'classusers.uid')->get();
        return $exammark;
    }
    /* To Get Student Mark For Fathers */
    public function fathers($child_id)
    {
        $fathers = Parents::where('parent_id', $this->user->id)->where('child_id', $child_id)->first();
        if ($fathers) {
            if ($this->user->allowed('virual.class.post.delete', $fathers, true, 'parent_id')) {
                $this->getMarks()->getAssessments()->getUsers();
                return [
                    'marks'       => $this->marks,
                    'assessments' => $this->assessments,
                    'users'       => $this->users];
            } else {
                die('not authorized');
            }
        } else {die('not authorized');}
    }

}
