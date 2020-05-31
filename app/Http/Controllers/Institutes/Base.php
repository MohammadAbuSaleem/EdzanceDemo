<?php
namespace App\Http\Controllers\Institutes;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Institutes\Parts\Achievements;
use App\Http\Controllers\Institutes\Parts\Affiliates;
use App\Http\Controllers\Institutes\Parts\Classroom;
use App\Http\Controllers\Institutes\Parts\Course;
use App\Http\Controllers\Institutes\Parts\Event;
use App\Http\Controllers\Institutes\Parts\Grant;
use App\Http\Controllers\Institutes\Parts\Image;
use App\Http\Controllers\Institutes\Parts\Info;
use App\Http\Controllers\Institutes\Parts\Jobs;
use App\Http\Controllers\Institutes\Parts\Marks;
use App\Http\Controllers\Institutes\Parts\Massage;
use App\Http\Controllers\Institutes\Parts\Member;
use App\Http\Controllers\Institutes\Parts\Post;
use App\Http\Controllers\Institutes\Parts\Setting;
use App\Http\Controllers\Institutes\Parts\Statistics;
use App\Http\Controllers\Institutes\Parts\Subjects;
use App\Http\Controllers\Institutes\Parts\Vaccation;
use App\Http\Controllers\Institutes\Parts\Videos;
use App\Http\Controllers\Social\posts;
use Illuminate\Http\Request;

//Base class
class Base extends Controller
{
    public $request      = null;
    public $parts        = null;
    public $achievements = null;
    public $affiliates   = null;
    public $classroom    = null;
    public $course       = null;
    public $event        = null;
    public $grant        = null;
    public $image        = null;
    public $Info         = null;
    public $jobs         = null;
    public $marks        = null;
    public $massage      = null;
    public $member       = null;
    public $parent       = null;
    public $post         = null;
    public $setting      = null;
    public $statistics   = null;
    public $subjects     = null;
    public $vaccation    = null;
    public $videos       = null;
    public $insId        = null;
    public $featureId    = null;
    public $nowFeature   = null;
    public $info         = null;
    public function __construct($request, $action = 'get', $insId = null, $feature = 'main', $featureId = 'all')
    {
        $this->request   = $request;
        $skp             = (isset($request['skip'])) ? $request['skip'] : 0;
        $tk              = (isset($request['take'])) ? $request['take'] : 10;
        $this->insId     = $insId;
        $this->featureId = $featureId;
        $this->feature   = $feature;
        switch ($feature) {
            case 'all':
                $this->achievements = (new Achievements($this->insId, $this->featureId));
                $this->affiliates   = (new Affiliates($this->insId, $this->featureId));
                $this->classroom    = (new Classroom($this->insId, $this->featureId));
                $this->course       = (new Course($this->insId, $this->featureId));
                $this->event        = (new Event($this->insId, $this->featureId));
                $this->grant        = (new Grant($this->insId, $this->featureId));
                $this->image        = (new Image($this->insId, $this->featureId))->users();
                $this->info         = (new Info($this->insId));
                $this->jobs         = (new Jobs($this->insId));
                $this->marks        = (new Marks($this->insId));
                $this->massage      = (new Massage($this->insId));
                $this->member       = (new Member($this->insId));
                $this->parent       = (new Parent($this->insId));
                $this->post         = (new App\Http\Controllers\Social\posts('institute', null, null, $this->insId))->post;
                $this->setting      = (new Setting($this->insId));
                $this->statistics   = (new Statistics($this->insId));
                $this->subjects     = (new Subjects($this->insId));
                $this->vaccation    = (new Vaccation($this->insId));
                $this->videos       = (new Videos($this->insId));
                $this->vaccation    = (new Vaccation($this->insId));
                break;
            case 'post':
                $this->post = (new \App\Http\Controllers\Social\posts('institute', $insId, null, null))->post;
                break;
            default:
                $class_name       = ucfirst($feature);
                $this->$feature   = (new $class_name($this->insId, $this->featureId));
                $this->nowFeature = $this->$feature;
                break;
        }
        return $this;
    }
    /* all user information */
    public function user($skp = 0, $tk = 10)
    {
        return (new Info($this->insId, $this->featureId))->justUser($skp, $tk);
    }
    /* to class any function make add */
    public function adding($r)
    {

        $b = $this->feature;
        $a = $this->$b;
        return $this->$b->add($this->request);
        return $this->$b->add($r);
    }
    /* to call any function that make searching */
    // public function searching($q, $ins)
    // {
    //     $b = $this->feature;
    //     $a = $this->$b;
    //     return $this->$b->search($q, $class);
    // }
    /* to call any function that make uploading */
    // public function uploading($r)
    // {
    //     $b = $this->feature;
    //     $a = $this->$b;
    //     return $this->$b->upload($r);
    // }
    /* to call any function that make entering */
    // public function entering($r)
    // {
    //     $b = $this->feature;
    //     $a = $this->$b;
    //     return $this->$b->enter($r);
    // }
    /* to call any function that make leaving */
    // public function leaving($r)
    // {
    //     $b = $this->feature;
    //     $a = $this->$b;
    //     return $this->$b->leave($r);
    // }
    /* to call any function that make requests */
    // public function requests($r)
    // {
    //     $b = $this->feature;
    //     $a = $this->$b;
    //     return $this->$b->joinRequests($this->insId);
    // }
    /* to call any function that make accept */
    // public function accept($r)
    // {
    //     $b = $this->feature;
    //     $a = $this->$b;
    //     return $this->$b->accept($r);
    // }
    /* to call any function that make  editing */
    public function editing($request)
    {
        $b           = $this->feature;
        $a           = $this->$b;
        $request->id = (isset($request->id)) ? $request->id : $id;
        return $this->$b->edit($request);
    }
    /* to call any function that make deleting */
    public function deleting($id)
    {
        $b = $this->feature;
        $a = $this->$b;

        return $this->$b->delete($id);
    }
    /* to get all part of VClass */
    public function get($skp = 0, $tk = 10)
    {
        if ($this->feature == 'all') {
            // foreach ($variable as $key => $value) {
            //     # code...
            // }
            $this->achievements = (new Achievements($this->insId, $this->featureId))->me->skip($skp)->take($tk)->get();
            $this->affiliates   = (new Affiliates($this->insId, $this->featureId))->me->skip($skp)->take($tk)->get();
            $this->classroom    = (new Classroom($this->insId, $this->featureId))->me->skip($skp)->take($tk)->get();
            $this->course       = (new Course($this->insId, $this->featureId))->me->skip($skp)->take($tk)->get();
            $this->event        = (new Event($this->insId, $this->featureId))->me->skip($skp)->take($tk)->get();
            $this->grant        = (new Grant($this->insId, $this->featureId))->me->skip($skp)->take($tk)->get();
            $this->image        = (new Image($this->insId, $this->featureId))->me->skip($skp)->take($tk)->get();
            $this->info         = (new Info($this->insId, $this->featureId))->me->skip($skp)->take($tk)->get();
            $this->jobs         = (new Jobs($this->insId, $this->featureId))->me->skip($skp)->take($tk)->get();
            $this->marks        = (new Marks($this->insId, $this->featureId))->me->skip($skp)->take($tk)->get();
            $this->massage      = (new Massage($this->insId, $this->featureId))->me->skip($skp)->take($tk)->get();
            $this->member       = (new Member($this->insId, $this->featureId))->me->skip($skp)->take($tk)->get();
            $this->parent       = (new Parent($this->insId, $this->featureId))->me->skip($skp)->take($tk)->get();
            $this->post         = (new App\Http\Controllers\Social\posts('institute', $this->insId, $this->featureId))->post->reading(0, 10)->get();
            $this->setting      = (new Setting($this->insId, $this->featureId))->me->skip($skp)->take($tk)->get();
            $this->statistics   = (new Statistics($this->insId, $this->featureId))->me->skip($skp)->take($tk)->get();
            $this->subjects     = (new Subjects($this->insId, $this->featureId))->me->skip($skp)->take($tk)->get();
            $this->vaccation    = (new Vaccation($this->insId, $this->featureId))->me->skip($skp)->take($tk)->get();
            $this->videos       = (new Videos($this->insId, $this->featureId))->me->skip($skp)->take($tk)->get();
            $this->vaccation    = (new Vaccation($this->insId, $this->featureId))->me->skip($skp)->take($tk)->get();
            $this->result       = $this;
        } elseif ($this->feature == 'mark' || $this->feature == 'main') {
            $b            = $this->feature;
            $this->$b     = $this->$b->get();
            $this->result = $this->$b;
            return $this;
        } elseif ($this->feature == 'post') {
            $b = $this->feature;
            if ($this->featureId == 'all') {
                $this->result = $this->$b->select()->get($skp, $tk);
            } else {
                $tk           = ($skp == 0) ? $tk : $skp;
                $skp          = $this->featureId;
                $this->result = $this->$b->get($skp, $tk);
                $this->result = (count($this->result) == 0) ? 'no post' : $this->result;
            }
        } else {
            $b = $this->feature;
            if ($this->featureId != 'all') {
                $b            = $this->$b->where('id', $this->featureId)->skip($skp)->take($tk)->get();
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

}
