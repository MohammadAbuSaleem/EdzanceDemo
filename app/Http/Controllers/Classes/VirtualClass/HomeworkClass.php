<?php

namespace App\Http\Controllers\Classes\VirtualClass;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Models\classusers;
use App\Models\virtualclass;
use App\Models\homework;
use App\Http\Controllers\Controller;
use App\library\notifications\Notifications;
use Carbon\Carbon;
use App\Model\Validator;
use App\Model\Image;
use Auth;
use DB;

class HomeworkClass extends Controller {
    protected $user ='No Data Yet';
    protected static $instance =null;
    public function __construct()
    {
         $this->user = Auth::user();
        return $this;
    } 

    public static function getInstance() {
        if (self::$instance == null) {
            self::$instance = new Homework();
        }
        return self::$instance;
    }

    public function newHomeWork(Request $request)
    {
        $this->validate($request, [
          'name' => 'required' ,
          'mark' => 'required' ,
          'type' => 'required' ,
          'date' => 'required' ,
          ]);

        $homework = new homework;
        $homework->title =  $request->input('name');
        $homework->status =1;
        $homework->type = $request->input('type');
        $homework->virtualclass_id = $request->input('id');
        $homework->mark = $request->input('mark');
        $timestamp = strtotime($request->input('date'));
        $homework->handover = Carbon::createFromTimestamp(strtotime($request->input('date')))->toDateTimeString();
        $homework->file = $request->input('file');
        $homework->body = $request->input('description');
        $homework->save();
        $homework=homework::where('id', $homework->id)->with('comment')->orderBy('created_at', 'asc')->first();
        return response()->success(compact('homework'));
    }

    public function HomeWork($id, $skip = 0, $take = 10) {
        $user =$this->user;
        $mypost = homework::where('homework.virtualclass_id', $id)
                        ->with('comment')
                        ->join('virtualclass', 'homework.virtualclass_id', "=", "virtualclass.id")
                        ->join('users', "users.id", "=", "virtualclass.instructor")
                        ->select("homework.*", "users.id as user_id", DB::raw("concat(users.name,' ', users.last_name) as user_name"), "users.avatar as user_avatar")
                        ->orderBy('homework.created_at', 'DESC')
                        ->skip($skip)
                        ->take($take)->get();
        if (count($mypost) == 0)
            return response()->success('no post');
        return response()->success($mypost);
    }

    public function editHomeWork(Request $request)
    {
      $user =$this->user; 
      
        $homework = homework::where('id', '=', $request->id)->first();
        $homework->title = $request->data['title'];
        $homework->body = $request->data['body'];
        $homework->mark = $request->data['mark'];
        $homework->type = $request->data['type'];
        $homework->handover = $request->data['handover'];
        $homework->save();
        $class = virtualclass::where('id', $homework->virtualclass_id)->first();
        $notificationParams['class_name'] = $class->name;
        $notificationParams['user_name'] = $user->name;
        $notificationParams['user_id'] = $user->id;
        $notificationParams['homework_id'] = $homework->id;
        $notificationParams['class_id'] = $class->id;
        $notificationParams['icon'] = $user->avatar;
        
        Notifications::getInstance()->notifyUsers(15, $notificationParams);
     return response()->success(compact('homework'));
    }

    public function HomeWorkPage($homeworkId) {
        $user = $this->user;
            $homework = homework::where('homework.id', $homeworkId)
                    ->with('comment')
                    ->join('virtualclass', 'homework.virtualclass_id', "=", "virtualclass.id")
                    ->join('users', "users.id", "=", "virtualclass.instructor")
                    ->select("homework.*", "users.id as user_id", DB::raw("concat(users.name,' ', users.last_name) as user_name"), "users.avatar as user_avatar")
                    ->get();
            $homework = $homework->toArray();
            if (!empty($homework)) {
                // check if the user in the class
                $class = classusers::where('class_id', $homework[0]['virtualclass_id'])->where('uid', $user->id)->first();
                if (!empty($class)) {
                    return response()->success($homework);
                } else {
                    return response()->failed(["message" => "not_calss_user"]);
                }
            } else {
                return response()->failed(["no post"]);
            }
    }

     public function uploadhw(Request $request)
    {
        $validator = Validator::make($request->all(), [
           'file' => 'mimes:jpeg,jpg,png,gif,pdf,doc,docx,xdoc,xls,xlsx,ppt,pptx,odt,rtf,txt|required|max:10000',
                      ]);
        if ($validator->fails()) {
            return response()->success([
                                    'result'=>$validator->errors()->getMessages(),
                                    'sucess'=>false]);
        }
        $filename = $_FILES['file']['name'];

        $meta ='upload/homework/images/';
        $destination =  $meta .$filename ;
        try {
            $image = $_FILES['file']['tmp_name'];
            Image::make($image)->resize(null, 300, function ($constraint) {
                $constraint->aspectRatio();
            })->save($meta .'X300-'.$filename);
            Image::make($image)->resize(null, 600, function ($constraint) {
                $constraint->aspectRatio();
            })->save($meta .'X600-'.$filename);
            Image::make($image)->resize(null, 900, function ($constraint) {
                $constraint->aspectRatio();
            })->save($meta .'X900-'.$filename);
            $path = $_FILES['file']['name'];
            $ext = pathinfo($path, PATHINFO_EXTENSION);
            $return = [$meta .'X900-'.$filename , $ext];
            return response()->success($return);
        } catch (\Exception $e) {
            if (substr($e->getMessage(), 0, 30) == 'Unable to read image from file') {
                $filename = $_FILES['file']['name'];
                $ext = pathinfo($filename, PATHINFO_EXTENSION);
                $meta ='upload/files/'.$ext.'/';
                $destination =  $meta .$filename ;
                $pdf = $_FILES['file']['tmp_name'];
                move_uploaded_file($pdf, $destination);
                $return = [$destination ,$ext];
                return response()->success($return);
            } else {
                return 'here the code to ppt';
            }
        }
    }

    public function HomeworkUpdate(Request $request)
    {
        if (!$user = Auth::user()) {
            die('not logged in');
        }
        $post = homework::where('id', $request->input('id'))->first();
        $post->body = $request->input('data');
        $post->save();
        return response()->success($post);
    }



}


