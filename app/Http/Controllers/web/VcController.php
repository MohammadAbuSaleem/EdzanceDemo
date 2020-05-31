<?php

namespace App\Http\Controllers\web;

use App\classpost;
use App\classusers;
use App\class_files;
use App\comment;
use App\exam;
use App\homework;
use App\Http\Controllers\Controller;
use App\student_info;
use App\university;
use App\User;
use App\virtualclass;
use Auth;
use Carbon\Carbon;
use DB;
use Illuminate\Http\Request;
use Intervention\Image\ImageManagerStatic as Image;
use Validator;

class vcController extends Controller
{

    ///////////////////////////////////////////////////////
    /////////////////GET///////////////////////////////////
    ///////////////////////////////////////////////////////

    ////////////class Main
    public function getClass($id)
    {

        $u = Auth::user();
        if ($permission = classusers::where('uid', $u->id)->where('class_id', $id)->first()) {
            $a    = 100 / 12;
            $user = virtualclass::where('virtualclass.id', $id)->with('vcuser')
                ->join('users as usr', 'virtualclass.instructor', '=', 'usr.id')
                ->leftjoin('friends', function ($join) {
                    $user = Auth::user();
                    $join->on('friends.friend_id', '=', 'virtualclass.instructor')
                        ->where('friends.id', '=', $user->id)
                        ->where('friends.status', '=', 'follower');
                })
                ->select('friends.friend_id as fr_id', 'friends.created_at as isfriend', 'virtualclass.*', 'usr.id as usr_id', 'usr.avatar', DB::raw('CONCAT(usr.name," ",usr.last_name ) AS u_name'))
                ->first();
            $user->persantage = 0;
            $field            = ['name', 'class_hall', 'class_number', 'specialition_id', 'Books', 'Privacy', 'Hours', 'season', 'days', 'to', 'from', 'Description', 'syllabus', 'Books'];
            foreach ($field as $key => $value) {
                if ($user[$value] != null) {
                    $user->persantage += $a;
                }
            }
            $user->files    = virtualclass::find($id)->files->count();
            $user->homework = virtualclass::find($id)->homework->count();
            return response()->success($user);
        } else {
            return response()->error('you are not in this class');
        }
    }

    public function getUsers($id)
    {
        $u = Auth::user();
        if ($permission = classusers::where('virtualclass_id', $u->id)->where('class_id', $id)->first()) {
            $user = virtualclass::where('virtualclass.id', $id)->with('vcuser')
                ->join('users as usr', 'virtualclass.instructor', '=', 'usr.id')
                ->select('virtualclass.*', 'usr.id as usr_id', 'usr.avatar', 'usr.name as u_name')
                ->first();
            return response()->success($user);
        } else {
            return response()->error('you are not in this class');
        }
    }

    public function getUniversity()
    {
        $friends = [];
        $user    = Auth::user();
        if ($user->acctype == 1) {
            $acctype = [1];
        } else {
            $acctype = [1, 2];
        }

        array_push($friends, $user->id);
        $university = university::where('id', '=', $user->university_id)->first();
        $mypost     = User::find($user->id)->friends()->select('friend_id')->get();
        foreach ($mypost as $key => $value) {array_push($friends, $value->friend_id);}
        $suggested = User::where('users.university_id', '=', $university->id)
            ->whereIn('users.acctype', $acctype)
            ->whereNotIn('users.id', $friends)
            ->join('university as univ', 'users.university_id', '=', 'univ.id')
            ->join('specialition as spec', 'users.specialition_id', '=', 'spec.id')
            ->join('translate as transpec', 'spec.mthr_name', '=', 'transpec.vid')
            ->join('translate as transuniv', 'univ.mthr_name', '=', 'transuniv.vid')
            ->select('users.*', 'transuniv.vocabulary as university', 'transpec.vocabulary as specialition')
            ->take(10)->get();
        return response()->success($suggested);
    }

    public function getPost($id, $skip = 0, $take = 2)
    {
        if (!$user = Auth::user()) {
            die('not logged in');
        }

        $friend = [];
        $post   = [];
        $last   = [];
        $user   = Auth::user();
        $post   = classpost::where('class_id', $id)->with('comment')
            ->join('users', 'users.id', '=', 'classpost.users_id')
            ->select('users.avatar as avatar', 'users.name as name', 'users.last_name as last_name', 'classpost.*', 'users.id as userid')
            ->orderBy('created_at', 'DESC')->skip($skip)->take($take)->get();
        foreach ($post as $k => $v) {
            $present = "no exp";
            if (in_array($user->id, explode(" ", $v['happy']))) {
                $present = 'happy';
            }

            if (in_array($user->id, explode(" ", $v['normal']))) {
                $present = 'normal';
            }

            if (in_array($user->id, explode(" ", $v['sad']))) {
                $present = 'sad';
            }

            $v['present'] = $present;
            $v['all']     = $v["happyCount"] + $v["normalCount"] + $v["sadCount"];

            array_push($last, $v);
        }

        $last = $this->array_orderby($last, 'created_at', SORT_ASC);
        if (count($last) == 0) {
            return response()->success('no post');
        }
        return response()->success($last);
    }

    public function getUniversityInformation($id, $class)
    {
        $u             = [];
        $user          = [];
        $a             = Auth::user();
        $university_id = virtualclass::find($class)->vcuser()->select('User.university_id')->first()->university_id;
        $code          = virtualclass::find($class)->vcuser()->select('User.id')->get();
        foreach ($code as $key => $value) {
            $user[$key] = $value->id;
        }
        $u = User::select('users.id', 'users.university_id', DB::raw('CONCAT(users.name," ",users.mid_name," ",users.last_name) AS name', 'users.acctype'), 'users.avatar as img')
            ->where('users.university_id', '=', $university_id)
            ->where('users.acctype', '=', 1)
            ->whereRaw("(CONCAT(users.name,' ',users.mid_name,' ',users.last_name,' - ' ,users.id ) like '%$id%')")
            ->whereNotIn('users.id', $user)
            ->take(5)->get();
        if ($u) {
            return response()->success(compact('u'));
        } else {return response()->success($u);}
    }

    public function getSPost($skip = 0, $take = 10)
    {
        $friend     = [];
        $post       = [];
        $user       = Auth::user();
        $followpost = friends::find($user->id)->friend();
        foreach ($followpost as $key => $value) {
            $fr     = $friend;
            $friend = User::find($key->id)->vcpost()->orderBy('created_at', 'desc')->get();
            array_push($post, $friend);
        }
        $mypost = User::find($user->id)->vcpost()->orderBy('created_at', 'desc')->get();
        array_push($post, $mypost);
        return response()->success($post[0]);
    }

    public function getProfile($id)
    {
        $users = User::where('id', $id)->with('vcpost')->with('myclass')->with('friends')->first();
        return response()->success($users);
    }

    public function getHomeWork($id, $skip = 0, $take = 10)
    {
        $user   = Auth::user();
        $mypost = homework::where('virtualclass_id', $id)->with('comment')->orderBy('created_at', 'asc')->skip($skip)->take($take)->get();
        if (count($mypost) == 0) {
            return response()->success('no post');
        }

        return response()->success($mypost);
    }

    public function getExam($id, $skip = 0, $take = 10)
    {
        $user   = Auth::user();
        $mypost = exam::where('virtualclass_id', $id)->with('comment')->orderBy('created_at', 'desc')->skip($skip)->take($take)->get();
        if (count($mypost) == 0) {
            return response()->success('no post');
        }

        return response()->success($mypost);
    }

    public function getFiles($id, $skip = 0, $take = 10)
    {
        $user   = Auth::user();
        $mypost = class_files::where('class_files.class_id', $id)
            ->with('comment')
            ->join('virtualclass', 'class_files.class_id', "=", "virtualclass.id")
            ->join('users', "users.id", "=", "virtualclass.instructor")
            ->select("class_files.*", "users.id as user_id", DB::raw("concat(users.name,' ', users.last_name) as user_name"), "users.avatar as user_avatar")
            ->orderBy('class_files.created_at', 'desc')
            ->skip($skip)->take($take)->get();
        if (count($mypost) == 0) {
            return response()->success('no post');
        }

        return response()->success($mypost);
    }

    public function getVcUser($name)
    {
        $user = user::where('name', 'LIKE', '%' . $name . '%')->get();
        return response()->success(compact('post'));
    }

    ///////////////////////////////////////////////////////
    /////////////////POST///////////////////////////////////
    ///////////////////////////////////////////////////////

    public function postRemoveClassUser(Request $request)
    {
        $c          = $request->student;
        $uni        = explode("-", trim($c));
        $classusers = classusers::where('uid', $request->user)
            ->where('class_id', $request->class)->delete();
        $code = virtualclass::find($request->class)->vcuser()
            ->get();
        return response()->success(compact('code'));
    }

    public function postAddclassTeacher(Request $request)
    {
        $c                    = $request->student;
        $uni                  = explode("-", trim($c));
        $classusers           = classusers::findOrCreate($request->student, $request->vc['id']);
        $classusers           = new classusers;
        $classusers->uid      = trim($request->student);
        $classusers->class_id = $request->vc['id'];
        $classusers->save();
        $code = virtualclass::find($request->vc['id'])->vcuser()
            ->get();
        return response()->success(compact('code'));
    }

    public function postAddclass(Request $request)
    {
        $user = Auth::user();
        if (($user) && $user->acctype == 2) {
            $days = [];
            $this->validate($request, [
                'name'       => 'required',
                'class_hall' => 'required',
                'from'       => 'required',
                'to'         => 'required',
            ]);
            if ($request->input('sat')) {
                array_push($days, 'السبت');
            }

            if ($request->input('sun')) {
                array_push($days, 'الاحد');
            }

            if ($request->input('mon')) {
                array_push($days, 'الاثنين');
            }

            if ($request->input('tus')) {
                array_push($days, 'الثلاثاء');
            }

            if ($request->input('wed')) {
                array_push($days, 'الاربعاء');
            }

            if ($request->input('thu')) {
                array_push($days, 'الخميس');
            }

            $qlanguages = implode("','", $days);
            $qlanguages = str_replace('\'', '', $qlanguages);
            $day        = $qlanguages;
            $post       = new virtualclass;
            $classusers = new classusers;
            $post->name = $request->input('name');
            $c          = ucwords(substr(uniqid(), 7, 13));
            $d          = 1;
            while ($d == 1) {if ($code = virtualclass::where('class_code', $c)->first()) {$c = ucwords(substr(uniqid(), 7, 13));} else { $d = 2;}}
            $post->class_code  = $c;
            $post->instructor  = $user->id;
            $post->Description = $request->input('description');
            $post->from        = $request->from;
            $post->to          = $request->to;
            $post->days        = $day;
            if ($request->input('season')) {
                $post->season = $request->input('season');
            }

            if ($request->input('Hours')) {
                $post->Hours = $request->input('Hours');
            }

            if ($request->input('privacy')) {
                $post->Privacy = $request->input('privacy');
            }

            if ($request->input('class_number')) {
                $post->class_number = $request->input('class_number');
            }

            $post->class_hall = $request->input('class_hall');
            $post->save();
            $classusers           = new classusers;
            $classusers->uid      = $user->id;
            $classusers->class_id = $post->id;
            $classusers->save();
            $code = virtualclass::where('virtualclass.id', $post->id)->join('users as ins', 'ins.id', '=', 'instructor')
                ->select('virtualclass.*', 'ins.id as uid', 'ins.avatar', 'ins.name as u_name', 'virtualclass.id as class_id')->first();
            return response()->success(compact('code'));

        }
    }

    public function postAddclasses(Request $request)
    {

        $user = Auth::user();
        $c    = $request->input('code');
        if ($code = classusers::where('uid', $user->id)->where('class_id', $c)->first()) {
            return response()->success('you are already in this class');
        }
        if ($code = virtualclass::where('class_code', $c)->first()) {
            $classusers           = new classusers;
            $classusers->uid      = $user->id;
            $classusers->class_id = $code->id;
            $classusers->save();
            $code = virtualclass::where('class_code', $c)
                ->join('users as ins', 'ins.id', '=', 'instructor')
                ->select('virtualclass.*', 'ins.id', 'ins.avatar', 'ins.name as u_name', 'virtualclass.id as class_id')
                ->first();
            return response()->success(compact('code'));

        } else {
            return response()->error('Code erorr !!');
        }
    }

    public function postPost($class, Request $request)
    {

        $this->validate($request, [
        ]);
        $post_words = explode(" ", $request->input('textpost'));
        $post       = new classpost;
        if (isset($post_words[1])) {$title = $post_words[0] . " " . $post_words[1];} else { $title = $post_words[0];}
        if (isset($post_words[2])) {$title = $post_words[0] . " " . $post_words[1] . " " . $post_words[2];} else {}
        $post->title      = $title;
        $post->type       = 1;
        $post->place      = 'VC';
        $post->status     = 1;
        $post->class_id   = $class;
        $post->body       = $request->input('textpost');
        $post->tag        = '';
        $post->media      = $request->input('media');
        $post->mediadesc  = $request->input('mediadesc');
        $post->mediatitle = $request->input('mediatitle');
        $post->mediaimage = $request->input('mediaimage');
        $post->type       = $request->input('type');
        $user             = Auth::user();
        $post->users_id   = $user->id;
        $post->save();
        $pst  = User::find($user->id)->vcpost()->where('classpost.id', $post->id)->first();
        $post = $pst;
        return response()->success(compact('post'));
    }

    public function postEditvc($id, Request $request)
    {
        $user = Auth::user();
        if ($vc = virtualclass::where('id', $id)->first()) {
            if ($user->id == $vc->instructor) {
                $vc->days   = $request->days;
                $vc->season = $request->season;
                if (!empty($request->book)) {
                    $vc->Books = \App\library\FileUpload::getInstance()->getFileFullPath($request->book, 'vc_book');
                }
                if (!empty($request->syllabus)) {
                    $vc->syllabus = \App\library\FileUpload::getInstance()->getFileFullPath($request->syllabus, 'vc_syllabus');
                }
                $vc->Hours        = $request->Hours;
                $vc->Privacy      = $request->Privacy;
                $vc->class_number = $request->class_number;
                $vc->class_hall   = $request->class_hall;
                $vc->Description  = $request->Description;
                $vc->name         = $request->name;
                $vc->from         = $request->from;
                $vc->to           = $request->to;
                $vc->save();
                return response()->success(compact('vc'));
            }
        } else {
            return response()->error('Code erorr !!');
        }
    }

    public function postPostUpdate(Request $request)
    {
        if (!$user = Auth::user()) {
            die('not logged in');
        }

        $post = classpost::where('id', $request->input('id'))->first();
        if (!($post->users_id == $user->id)) {
            die('not authorized');
        }

        $post->body = $request->input('data');
        $post->save();
        return response()->success($post);
    }

    public function postVcUpdate(Request $request)
    {
        if (!$user = Auth::user()) {
            die('not logged in');
        }

        $post = classpost::where('id', $request->input('id'))->first();
        if (!($post->users_id == $user->id)) {
            die('not authorized');
        }

        $post->body = $request->input('data');
        $post->save();
        return response()->success($post);
    }

    public function postFileUpdate(Request $request)
    {
        if (!$user = Auth::user()) {
            die('not logged in');
        }

        $post              = class_files::where('id', $request->input('id'))->first();
        $post->description = $request->input('data');
        $post->save();
        return response()->success($post);
    }

    public function postExamUpdate(Request $request)
    {
        if (!$user = Auth::user()) {
            die('not logged in');
        }

        $post       = exam::where('id', $request->input('id'))->first();
        $post->hall = $request->input('data');
        $post->save();
        return response()->success($post);
    }

    public function postHomeworkUpdate(Request $request)
    {
        if (!$user = Auth::user()) {
            die('not logged in');
        }

        $post       = homework::where('id', $request->input('id'))->first();
        $post->body = $request->input('data');
        $post->save();
        return response()->success($post);
    }

    public function postUpdatePost(Request $request)
    {
        if (!$user = Auth::user()) {
            die('not logged in');
        }

        $post = classpost::where('id', $request->input('id'))->first();
        if (!($post->users_id == $user->id)) {
            die('not authorized');
        }

        $post->body = $request->input('data');
        $post->save();
        return response()->success($post);
    }

    public function postHomeWork(Request $request)
    {
        $user = Auth::user();
        $this->validate($request, [
            'hw_name'        => 'required',
            'hw_mark'        => 'required',
            'class_id'       => 'required',
            'hw_type'        => 'required',
            'hw_date'        => 'required',
            'hw_description' => 'required',
        ]);

        $homework                  = new homework;
        $homework->title           = $request->hw_name;
        $homework->status          = 1;
        $homework->type            = $request->hw_type;
        $homework->virtualclass_id = $request->class_id;
        $homework->mark            = $request->hw_mark;
        $homework->handover        = Carbon::createFromTimestamp(strtotime($request->hw_date))->toDateTimeString();

        $fullPath       = \App\library\FileUpload::getInstance()->getFileFullPath($request->upload["file_name"], 'vc_homework_file');
        $homework->file = $fullPath;
        $homework->body = $request->hw_description;
        $homework->save();
        $homework = homework::where('homework.id', $homework->id)
            ->with('comment')
            ->join('virtualclass', 'homework.virtualclass_id', "=", "virtualclass.id")
            ->join('users', "users.id", "=", "virtualclass.instructor")
            ->select("homework.*", "users.id as user_id", DB::raw("concat(users.name,' ', users.last_name) as user_name"), "users.avatar as user_avatar")
            ->first();

        $classObj = virtualclass::where("id", $request->class_id)->first();

        $notificationParams['user_id']     = $user->id;
        $notificationParams['homework_id'] = $homework["id"];
        $notificationParams['user_name']   = $user->name . " " . $user->mid_name . " " . $user->last_name;
        $notificationParams['class_name']  = $classObj['name'];
        $notificationParams['class_id']    = $classObj['id'];
        $notificationParams['icon']        = $user->avatar;
        \App\library\notifications\Notifications::getInstance()->notifyUsers(9, $notificationParams);

        return response()->success($homework);
    }

    public function postExam(Request $request)
    {
        $user = Auth::user();
        $this->validate($request, [
            'type'   => 'required',
            'hall'   => 'required',
            'mytime' => 'required',
        ]);

        $exam                  = new exam;
        $exam->status          = 1;
        $exam->type            = $request->input('type');
        $exam->virtualclass_id = $request->input('class_id');
        $exam->hall            = $request->input('hall');
        $timestamp             = strtotime($request->input('date'));
        $exam->exam_date       = Carbon::createFromTimestamp(strtotime($request->input('mytime')))->toDateTimeString();
        $exam->save();
        $exam = exam::where('id', $exam->id)->with('comment')->orderBy('created_at', 'asc')->first();
        // get vertual class info to fill notification body
        $class                            = virtualclass::where('id', $request->input('class_id'))->first();
        $class                            = $class->toArray();
        $notificationParams['class_name'] = $class['name'];
        $notificationParams['exam_date']  = date("Y-m-d", strtotime($exam->exam_date));
        $notificationParams['exam_time']  = date("H:i", strtotime($exam->exam_date));
        $notificationParams['exam_hall']  = $exam->hall;
        $notificationParams['exam_id']    = $exam->id;
        $notificationParams['class_id']   = $request->input('class_id');
        $notificationParams['icon']       = $user->avatar;
        $notificationParams['user_id']    = $user->id;

        \App\library\notifications\Notifications::getInstance()->notifyUsers(11, $notificationParams);

        return response()->success($exam);
    }

    public function postFiles(Request $request)
    {
        $user = Auth::user();
        $this->validate($request, [
            'file.name'   => 'required',
            'description' => 'required',
        ]);
        $files              = new class_files;
        $files->name        = $request->file['name'];
        $files->extension   = $request->upload["file_extension"];
        $fullPath           = \App\library\FileUpload::getInstance()->getFileFullPath($request->upload["file_name"], 'vc_file');
        $files->url         = $fullPath;
        $files->description = $request->input('description');
        $files->class_id    = $request->input('class_id');
        $files->save();
        $files = class_files::where('class_files.id', $files->id)
            ->with('comment')
            ->join('virtualclass', 'class_files.class_id', "=", "virtualclass.id")
            ->join('users', "users.id", "=", "virtualclass.instructor")
            ->select("class_files.*", "users.id as user_id", DB::raw("concat(users.name,' ', users.last_name) as user_name"), "users.avatar as user_avatar")
            ->orderBy('class_files.created_at', 'asc')
            ->first();

        // get class by id
        $classObj = virtualclass::where("id", $request->input('class_id'))->first();

        $notificationParams['user_id']    = $user->id;
        $notificationParams['post_id']    = $files->id;
        $notificationParams['user_name']  = $user->name . " " . $user->mid_name . " " . $user->last_name;
        $notificationParams['class_name'] = $classObj['name'];
        $notificationParams['class_id']   = $classObj['id'];
        $notificationParams['icon']       = $user->avatar;
        \App\library\notifications\Notifications::getInstance()->notifyUsers(7, $notificationParams);

        return response()->success($files);
    }

    public function postInf(Request $request)
    {
        if (!($user = Auth::user() || $user->id == $request->input('id'))) {
            die('not logged in');
        }

        $user = Auth::user();
        if ($request->input('name') != '') {
            $user->name = $request->input('name');
        }

        if ($request->input('mid_name') != '') {
            $user->mid_name = $request->input('mid_name');
        }

        if ($request->input('last_name') != '') {
            $user->last_name = $request->input('last_name');
        }

        if ($request->input('sex') != '') {
            $user->sex = $request->input('sex');
        }

        if ($request->input('DOB') != '') {
            $user->DOB = $request->input('DOB');
        }

        if (!($student_info = student_info::where('user_id', $user->id)->first())) {
            $student_info          = new student_info;
            $student_info->user_id = $user->id;}
        if ($request->input('country') != '') {
            $student_info->country = $request->input('country');
        }

        $user->save();
        $student_info->save();
        $user = User::where('id', $user->id)->with('student_info')->first();
        return response()->success(compact('user'));
    }

    public function postImage(Request $request)
    {
        if (!$user = Auth::user()) {
            die('not logged in');
        }

        $this->validate($request, [
            'textpost' => 'required',
        ]);

        $post           = new classpost;
        $post->media    = $request->input('file');
        $post->body     = $request->input('textpost');
        $post->tag      = $request->input('imgTag');
        $post->place    = 'VC';
        $post->type     = 'image';
        $post->users_id = $user->id;
        $post->class_id = $request->input('class_id');
        $post->save();
        $pst  = User::find($user->id)->vcpost()->where('classpost.id', $post->id)->first();
        $post = $pst;
        return response()->success(compact('post'));
    }

    public function postUni(Request $request)
    {
        $university_start = date('Y-m-d', strtotime(str_replace('-', '/', "1/1/" . $request->input('university_start'))));
        $university_end   = date('Y-m-d', strtotime(str_replace('-', '/', "1/1/" . $request->input('university_end'))));
        if (!$user = Auth::user()) {
            die('not logged in');
        }

        $user = Auth::user();
        if (!($student_info = student_info::where('user_id', $user->id)->first())) {
            $student_info          = new student_info;
            $student_info->user_id = $user->id;}
        $student_info->specialition_desc = $request->input('specialition_desc');
        $student_info->university_id     = $request->input('university_id');
        $student_info->university_start  = $university_start;
        $student_info->university_end    = $university_end;
        $student_info->save();
        return response()->success(compact('student_info'));
    }

    public function postSec(Request $request)
    {
        $school_end = date('Y-m-d', strtotime(str_replace('-', '/', "1/1/" . $request->input('school_end'))));
        if (!$user = Auth::user()) {
            die('not logged in');
        }

        if (!($student_info = student_info::where('user_id', $user->id)->first())) {
            $student_info          = new student_info;
            $student_info->user_id = $user->id;}
        $student_info->school      = $request->input('school');
        $student_info->school_town = $request->input('school_town');
        $student_info->school_end  = $school_end;
        $student_info->save();
        return response()->success(compact('student_info'));
    }

    public function postOther(Request $request)
    {
        if (!$user = Auth::user()) {
            die('not logged in');
        }

        $user = Auth::user();
        if (!($student_info = student_info::where('user_id', $user->id)->first())) {
            $student_info          = new student_info;
            $student_info->user_id = $user->id;
        }
        $student_info->user_id   = $user->id;
        $student_info->skills    = $request->input('skills');
        $student_info->hobbies   = $request->input('hobbies');
        $student_info->concerns  = $request->input('concerns');
        $student_info->languages = $request->input('languages');
        $student_info->save();
        return response()->success(compact('student_info'));
    }

    public function postContact(Request $request)
    {
        if (!$user = Auth::user()) {
            die('not logged in');
        }

        $user            = Auth::user();
        $user->email     = $request->input('email');
        $user->telephone = $request->input('telephone');
        $user->skype     = $request->input('skype');
        $user->twitter   = $request->input('twitter');
        $user->linkedin  = $request->input('linkedin');
        $user->facebook  = $request->input('facebook');
        $user->save();
        return response()->success(compact('user'));
    }

    public function postEdithomework(Request $request)
    {
        if (!$user = Auth::user()) {
            die('not logged in');
        }

        $homework           = homework::where('id', '=', $request->id)->first();
        $homework->title    = $request->data['title'];
        $homework->body     = $request->data['body'];
        $homework->mark     = $request->data['mark'];
        $homework->type     = $request->data['type'];
        $homework->handover = $request->data['handover'];
        $homework->save();
        return response()->success(compact('homework'));
    }

    public function postEditexam(Request $request)
    {
        if (!$user = Auth::user()) {
            die('not logged in');
        }

        $exam            = exam::where('id', '=', $request->id)->first();
        $exam->type      = $request['type'];
        $exam->exam_date = $request['exam_date'];
        $exam->hall      = $request['hall'];
        $exam->save();
        return response()->success(compact('exam'));
    }

    public function postEditfile(Request $request)
    {
        if (!$user = Auth::user()) {
            die('not logged in');
        }

        $file              = class_files::where('id', '=', $request->id)->first();
        $file->name        = $request->data['name'];
        $file->description = $request->data['description'];
        $file->save();
        return response()->success(compact('file'));
    }

    public function postAddExprission($post, $exp)
    {
        $liker           = [];
        $user            = Auth::user();
        $post            = classpost::where('id', $post)->first();
        $happy           = explode(" ", $post['happy']);
        $sad             = explode(" ", $post['sad']);
        $normal          = explode(" ", $post['normal']);
        $liker['happy']  = $happy;
        $liker['normal'] = $normal;
        $liker['sad']    = $sad;
        $present         = 0;
        if (in_array($user->id, $liker['happy'])) {
            $present = 'happy';
        }

        if (in_array($user->id, $liker['normal'])) {
            $present = 'normal';
        }

        if (in_array($user->id, $liker['sad'])) {
            $present = 'sad';
        }

        if ($present == ('sad' || 'normal' || 'happy')) {
            if ($present == $exp) {
                unset($liker[$exp][array_search($user->id, $liker[$exp])]);
                $last       = implode(" ", $liker[$exp]);
                $post[$exp] = $last;
                $post[$exp . "Count"] -= 1;
                $post->save();
                return response()->success($post);
            }
            unset($liker[$present][array_search($user->id, $liker[$present])]);
            $last           = implode(" ", $liker[$present]);
            $post[$present] = $last;
            $post[$present . "Count"] -= 1;
            array_push($liker[$exp], $user->id);
            $last       = implode(" ", $liker[$exp]);
            $post[$exp] = $last;
            $post[$exp . "Count"] += 1;
            $post->save();

            $notificationParams['user_id']   = $user->id;
            $notificationParams['post_id']   = $post['id'];
            $notificationParams['emotion']   = post::translateExprission('ar', $exp);
            $notificationParams['user_name'] = $user->name . " " . $user->mid_name . " " . $user->last_name;
            \App\library\notifications\Notifications::getInstance()->notifyUsers(14, $notificationParams);
            return response()->success($post);
        } else {
            array_push($liker[$exp], $user->id);
            $last       = implode(" ", $liker[$exp]);
            $post[$exp] = $last;
            $post[$exp . "Count"] += 1;
            $post->save();
            return response()->success($post);
        }
    }

    public function postComment(Request $request)
    {

        $this->validate($request, [
            'body' => 'required',
        ]);

        $comment          = new comment;
        $comment->status  = $request->input('status');
        $comment->place   = $request->input('place');
        $comment->post_id = $request->input('post_id');
        $comment->body    = $request->input('body');
        $user             = Auth::user();
        $comment->uid     = $user->id;
        $comment->save();
        $comment = comment::where('comment.id', $comment->id)
            ->join('users as user', 'comment.uid', '=', 'user.id')
            ->select('comment.*', 'user.id as userid', 'user.name as name', 'user.last_name as last_name', 'user.avatar as avatar')->first();
        return response()->success(compact('comment'));
    }

    public function postCreateorupdatefollow($friend, $update = 'follower')
    {
        $user = Auth::user();
        if ($friendy = friends::where('id', $user->id)->where('friend_id', $friend)->first()) {
            if ($friendy->status == 'follower' && $update == 'follower') {return response()->error('You are already follwing that person :)');}

            $friendy->status = $update;
            $friendy->save();
            $user = User::where('id', $friendy->friend_id)->first();

            return response()->success($user);
        }

        $friendy            = new friends;
        $friendy->id        = $user->id;
        $friendy->friend_id = $friend;
        $friendy->status    = $update;
        $friendy->save();
        $user = User::where('id', $friendy->friend_id)->first();

        return response()->success($user);
    }

    public function postUploadhw(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'file' => 'mimes:jpeg,jpg,png,gif,pdf,doc,docx,xdoc,xls,xlsx,ppt,pptx,odt,rtf,txt|required|max:10000',
        ]);
        if ($validator->fails()) {
            return response()->success([
                'result' => $validator->errors()->getMessages(),
                'sucess' => false]);
        }
        $filename = $_FILES['file']['name'];

        $meta        = 'upload/homework/images/';
        $destination = $meta . $filename;
        try {
            $image = $_FILES['file']['tmp_name'];
            Image::make($image)->resize(null, 300, function ($constraint) {$constraint->aspectRatio();})->save($meta . 'X300-' . $filename);
            Image::make($image)->resize(null, 600, function ($constraint) {$constraint->aspectRatio();})->save($meta . 'X600-' . $filename);
            Image::make($image)->resize(null, 900, function ($constraint) {$constraint->aspectRatio();})->save($meta . 'X900-' . $filename);
            $path   = $_FILES['file']['name'];
            $ext    = pathinfo($path, PATHINFO_EXTENSION);
            $return = [$meta . 'X900-' . $filename, $ext];
            return response()->success($return);
        } catch (\Exception $e) {
            if (substr($e->getMessage(), 0, 30) == 'Unable to read image from file') {
                $filename    = $_FILES['file']['name'];
                $ext         = pathinfo($filename, PATHINFO_EXTENSION);
                $meta        = 'upload/files/' . $ext . '/';
                $destination = $meta . $filename;
                $pdf         = $_FILES['file']['tmp_name'];
                move_uploaded_file($pdf, $destination);
                $return = [$destination, $ext];
                return response()->success($return);
            } else {return 'here the code to ppt';}
        }
    }

    public function postUploadsyllabus(Request $request)
    {
        $filename    = $_FILES['file']['name'];
        $meta        = 'upload/Vc/syllabus/';
        $destination = $meta . $filename;
        $filename    = $_FILES['file']['name'];
        $ext         = pathinfo($filename, PATHINFO_EXTENSION);
        $pdf         = $_FILES['file']['tmp_name'];
        move_uploaded_file($pdf, $destination);
        $return = [$destination, $ext];
        return response()->success($return);
    }
    public function postUploadbook(Request $request)
    {
        $filename    = $_FILES['file']['name'];
        $meta        = 'upload/Vc/Book/';
        $destination = $meta . $filename;
        $filename    = $_FILES['file']['name'];
        $ext         = pathinfo($filename, PATHINFO_EXTENSION);
        $pdf         = $_FILES['file']['tmp_name'];
        move_uploaded_file($pdf, $destination);
        $return = [$destination, $ext];
        return response()->success($return);
    }

    public function postUploadfl(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'file' => 'mimes:jpeg,jpg,png,gif,pdf,doc,docx,xdoc,xls,xlsx,ppt,pptx,odt,rtf,txt|required|max:10000',
        ]);
        if ($validator->fails()) {
            return response()->success([
                'result' => $validator->errors()->getMessages(),
                'sucess' => false]);
        }
        $filename = $_FILES['file']['name'];

        $meta        = 'upload/files/images/';
        $destination = $meta . $filename;
        try {
            $image = $_FILES['file']['tmp_name'];
            Image::make($image)->save($meta . $filename);
            $path   = $_FILES['file']['name'];
            $ext    = pathinfo($path, PATHINFO_EXTENSION);
            $return = [$meta . $filename, $ext];
            return response()->success($return);
        } catch (\Exception $e) {
            if (substr($e->getMessage(), 0, 30) == 'Unable to read image from file') {
                $filename    = $_FILES['file']['name'];
                $ext         = pathinfo($filename, PATHINFO_EXTENSION);
                $meta        = 'upload/files/files/';
                $destination = $meta . $filename;
                $pdf         = $_FILES['file']['tmp_name'];
                move_uploaded_file($pdf, $destination);
                $return = [$destination, $ext];
                return response()->success($return);
            } else {return $e->getMessage();}
        }
    }

    public function array_orderby()
    {
        $args = func_get_args();
        $data = array_shift($args);
        foreach ($args as $n => $field) {
            if (is_string($field)) {
                $tmp = array();
                foreach ($data as $key => $row) {
                    $tmp[$key] = $row[$field];
                }

                $args[$n] = $tmp;
            }
        }
        $args[] = &$data;
        call_user_func_array('array_multisort', $args);
        return array_pop($args);
    }

}
