<?php

namespace App\Http\Controllers\Classes\VirtualClass;
use App\Models\classusers;
use App\Models\virtualclass;
use App\Models\exam;
use App\library\notifications\Notifications;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Requests;
use Auth;
use DB;

class Exams  extends Controller {
    protected $user ='No Data Yet';
    protected static $instance =null;
    public function __construct()
    {
        $this->user = Auth::user();
        return $this;
    } 
    public static function getInstance() {
        if (self::$instance == null) {
            self::$instance = new Exams();
        }
        return self::$instance;
    }
    
     public function examUpdate(Request $request)
    {
     $user =$this->user;
        $post = exam::where('id', $request->input('id'))->first();
        $post->hall = $request->input('data');
        $post->save();
        return response()->success($post);
    }

    public function exam(Request $request) {
        $user =$this->user;
        $this->validate($request, [
            'type' => 'required',
            'hall' => 'required',
            'date' => 'required',
        ]);

        $exam = new exam;
        $exam->status = 1;
        $exam->type = $request->input('type');
        $exam->virtualclass_id = $request->input('id');
        $exam->hall = $request->input('hall');
        $timestamp = strtotime($request->input('date'));
        $exam->exam_date = Carbon::createFromTimestamp(strtotime($request->input('date')))->toDateTimeString();
        $exam->save();
        $exam = exam::where('id', $exam->id)->with('comment')->orderBy('created_at', 'asc')->first();
        $class = virtualclass::where('id', $request->input('id'));
        $notificationParams['class_name'] = $class->name;
        $notificationParams['exam_date'] = date("Y-m-d", strtotime($exam->exam_date));
        $notificationParams['exam_time'] = date("H:i", strtotime($exam->exam_date));
        $notificationParams['exam_hall'] = $exam->hall;
        $notificationParams['exam_id'] = $exam->id;
        $notificationParams['user_id'] = $user->id;
        Notifications::getInstance()->notifyUsers(11, $notificationParams);
        return response()->success(compact('exam'));
    }

     public function editExam(Request $request)
    {
        $user =$this->user;
        $exam = exam::where('id', '=', $request->id)->first();
        $exam->type = $request['type'];
        $exam->exam_date = $request['exam_date'];
        $exam->hall = $request['hall'];
        $exam->save();
        $class = virtualclass::where('id', $exam->virtualclass_id)->first();
        $notificationParams['class_name'] = $class->name;
        $notificationParams['class_id'] = $class->id;
        $notificationParams['exam_type'] = $exam->type;
        $notificationParams['exam_id'] = $exam->id;
        $notificationParams['user_id'] = $user->id;
        $notificationParams['user_name'] = $user->name;
        $notificationParams['icon'] = $user->avatar;
        Notifications::getInstance()->notifyUsers(14, $notificationParams);
        return response()->success(compact('exam'));
    }

     public function getExam($id, $skip=0, $take=10)
    {
        $user =$this->user;
        $mypost=exam::where('virtualclass_id', $id)->with('comment')->orderBy('created_at', 'desc')->skip($skip)->take($take)->get();
        if (count($mypost)==0) {
            return response()->success('no post');
        }
        return response()->success($mypost);
    }

    public function examPage($examId) {
        $user =$this->user;
            $exam = exam::where('id', $examId)
                    ->with('comment')
                    ->with('user')->get();
            if (!empty($exam)) {
                $class = classusers::where('class_id', $exam[0]['virtualclass_id'])->where('uid', $user->id)->first();
                if (!empty($class) || 1) {
                    return response()->success($exam);
                } else {
                    return response()->failed(["message" => "not_calss_user"]);
                }
            } else {
                return response()->failed(["no post"]);
            }
    }

}


