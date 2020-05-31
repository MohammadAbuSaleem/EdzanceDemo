<?php
namespace App\Http\Controllers\VClass;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Social\posts as Post;
use App\Http\Controllers\VClass\parts\Attendance;
use App\Http\Controllers\VClass\parts\Exam;
use App\Http\Controllers\VClass\parts\Files;
use App\Http\Controllers\VClass\parts\HomeWork;
use App\Http\Controllers\VClass\parts\Info;
use App\Http\Controllers\VClass\parts\Mangment;
use App\Http\Controllers\VClass\parts\Mark;

//VClass class
class VClass extends Controller {
    public $request    = null;
    public $parts      = null;
    public $exam       = null;
    public $mark       = null;
    public $attendance = null;
    public $homeWork   = null;
    public $files      = null;
    public $file       = null;
    public $main       = null;
    public $classId    = null;
    public $partId     = null;
    public $info       = null;
    public $solo       = null;
    public $user       = null;
    public function __construct($request, $action = 'get', $classId = null, $part = 'main', $partId = 'all') {
        $this->request = $request;
        $skp           = (isset($request['skip'])) ? $request['skip'] : 0;
        $tk            = (isset($request['take'])) ? $request['take'] : 10;
        $this->classId = $classId;
        $this->partId  = $partId;
        $this->part    = $part;
        $this->user    = \Auth::user();
        if ($action === 'solo') {
            $this->solo = $this->one();
            return $this;
        }
        switch ($part) {
        case 'all':
            $this->post       = (new \App\Http\Controllers\Social\posts('vc', null, null, $this->classId))->post;
            $this->exam       = (new Exam($this->classId, $this->partId));
            $this->mark       = (new Mark($this->classId, $this->partId));
            $this->homeWork   = (new HomeWork($this->classId, $this->partId));
            $this->attendance = (new Attendance($this->classId, $this->partId));
            $this->files      = (new Files($this->classId, $this->partId));
            $this->info       = (new Info($this->classId, $this->partId))->users();
            $this->main       = (new Mangment($this->classId));
            break;
        case 'mark':
            $this->mark = (new Mark($this->classId, $this->partId));
            break;
        case 'exam':
            $this->exam = (new Exam($this->classId, $this->partId));
            break;
        case 'post':
            $type       = (isset($request['type'])) ? $request['type'] : null;
            $this->post = (new \App\Http\Controllers\Social\posts('vc', $classId, $type, null))->post;
            break;
        case 'homeWork':
            $this->homeWork = (new HomeWork($this->classId, $this->partId));
            break;
        case 'attendance':
            $this->attendance = (new Attendance($this->classId, $this->partId));
            break;
        case 'files':
        case 'file':
            $this->part  = 'files';
            $this->files = (new Files($this->classId, $this->partId));
            break;
        case 'info':
            $this->info = (new Info($this->classId, $this->partId));
            break;
        case 'main':
            $this->main = new Mangment($this->classId);
            break;
        }
        return $this;
    }
    /* all user information */
    public function user($skp = 0, $tk = 10) {
        return (new Info($this->classId, $this->partId))->justUser($skp, $tk);
    }
    /* to class any function make add */
    public function adding($r) {

        $b = $this->part;
        $a = $this->$b;
        if ($this->part == 'post') {
            return $this->$b->adding($this->request);
            # code...
        }
        return $this->$b->add($r);
    }
    /* to call any function that make searching */
    public function searching($q, $class) {
        $b = $this->part;
        $a = $this->$b;
        return $this->$b->search($q, $class);
    }
    /* to call any function that make uploading */
    public function uploading($r) {
        $b = $this->part;
        $a = $this->$b;
        return $this->$b->upload($r);
    }
    /* to call any function that make entering */
    public function entering($r) {
        $b = $this->part;
        $a = $this->$b;
        return $this->$b->enter($r);
    }
    /* to call any function that make leaving */
    public function leaving($r) {
        $b = $this->part;
        $a = $this->$b;
        return $this->$b->leave($r);
    }
    /* to call any function that make requests */
    public function requests($r) {
        $b = $this->part;
        $a = $this->$b;
        return $this->$b->joinRequests($this->classId);
    }
    /* to call any function that make accept */
    public function accept($r) {
        $b = $this->part;
        $a = $this->$b;
        return $this->$b->accept($r);
    }
    /* to call any function that make  editing */
    public function editing($request) {
        $b           = $this->part;
        $a           = $this->$b;
        $request->id = (isset($request->id)) ? $request->id : $this->classId;
        return $this->$b->edit($request);
    }
    /* to call any function that make deleting */
    public function deleting($id) {
        $b = $this->part;
        $a = $this->$b;

        return $this->$b->delete($id);
    }
    /* to get all part of VClass */
    public function get($skp = 0, $tk = 10) {
        if ($this->part == 'all') {
            $this->post       = (new \App\Http\Controllers\Social\posts('vc', $this->classId, $this->partId))->post->reading(0, 10)->get();
            $this->exam       = (new Exam($this->classId, $this->partId))->me->skip($skp)->take($tk)->get();
            $this->mark       = (new Mark($this->classId, $this->partId))->me->skip($skp)->take($tk)->get();
            $this->homeWork   = (new HomeWork($this->classId, $this->partId))->me->skip($skp)->take($tk)->get();
            $this->attendance = (new Attendance($this->classId, $this->partId))->me->skip($skp)->take($tk)->get();
            $this->files      = (new Files($this->classId, $this->partId))->me->skip($skp)->take($tk)->get();
            $this->info       = (new Info($this->classId, $this->partId))->users();
            $this->main       = (new Mangment($this->classId))->me->skip($skp)->take($tk)->get();
            $this->result     = $this;
        } elseif ($this->part == 'mark' || $this->part == 'main') {

            $b            = $this->part;
            $this->$b     = $this->$b->get();
            $this->result = $this->$b;
            return $this;
        } elseif ($this->part == 'post') {

            $b = $this->part;
            if ($this->partId == 'all') {
                $this->result = $this->$b->select()->get($skp, $tk);
            } else {

                $tk = ($skp == 0) ? $tk : $skp;

                $skp          = $this->partId;
                $this->result = $this->$b->get($skp, $tk);
                $this->result = (count($this->result) == 0) ? 'no post' : $this->result;
            }
        } else {
            $b = $this->part;
            if ($this->partId != 'all') {
                $b            = $this->$b->me->where('id', $this->partId)->skip($skp)->take($tk)->get();
                $b            = (count($b) == 0) ? 'no post' : $b;
                $this->result = $b;
            } else {
                $b            = $this->$b->me->skip($skp)->take($tk)->get();
                $b            = (count($b) == 0) ? 'no post' : $b;
                $this->result = $b;

            }
        }
        return $this;
    }
    /* to get all part of VClass */
    public function one($id = null) {

        if ($this->part == 'mark' || $this->part == 'main') {
            $b            = $this->part;
            $this->$b     = $this->$b->first();
            $this->result = $this->$b;
            return $this;
        } elseif ($this->part == 'post') {
            $b            = (new \App\Http\Controllers\Social\posts('vc', $this->classId, null, null))->post;
            $this->result = $b->one($this->partId);
            $this->result = (count($this->result->toArray()) == 0) ? 'no post' : $this->result;
        } else {
            $feature        = $this->part;
            $class_name     = 'App\\Http\\Controllers\\VClass\\parts\\' . ucfirst($feature);
            $this->$feature = new $class_name($this->classId, $this->partId);
            $b              = $this->$feature->me->where('id', $id)->first();
            $b              = (count($b) == 0) ? 'nopost' : $b;
            $this->result   = $b;
        }
        return $this;
    }

}
