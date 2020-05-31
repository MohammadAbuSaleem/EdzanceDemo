<?php
namespace App\Http\Controllers\VClass\parts;

use App\Http\Controllers\Classes\Helper;
use App\Http\Controllers\Controller;
use App\Http\Controllers\VClass\MyPermission;
use App\library\notifications\Notifications;
use App\Models\classusers;
use App\Models\homework as HW;
use App\Models\homework_answers as HomeworkAnswers;
use App\Models\User;
use App\Models\virtualclass;
use Auth;
use Intervention\Image\ImageManagerStatic as Image;
use Validator;

class HomeWork extends Controller implements MyPermission {
    public $me       = null;
    public $user     = null;
    public $class_id = 'No Data Yet';
    public $partId   = 'all';
    public function __construct($classId = false, $partId = 'all') {

        $this->class_id = $classId;
        $this->partId   = $partId;
        if ($classId == 'solo') {
            $this->me = HW::where('deleted_at', null);
        } else {
            $this->me = HW::where('virtualclass_id', $this->class_id);
        }
        $this->user = Auth::user();
        $this->me   = $this->me->with('comment')->leftJoin('users', 'users.id', '=', 'homework.user_id')
            ->leftJoin('homework_answers', 'homework.id', 'homework_answers.homework_id')
            ->select('homework.*', \DB::raw('CONCAT(users.name," ",users.last_name ) AS user_name'), 'users.avatar as user_avatar', 'homework_answers.review', 'homework_answers.mark', 'homework_answers.is_correct')
            ->orderBy('created_at', 'desc');
        return $this;
    }
    public function __call($method, $arguments) {
        if (method_exists($this, $method)) {
            $reflect                  = new \ReflectionClass($this);
            $permission               = self::PERMISSION_INTERFACE[$reflect->getShortName()];
            $permission['permission'] = $permission['permission'][$method];
            $permission['relation']   = classusers::classs($this->class_id)->where('uid', \Auth::user()->id)->leftJoin('homework', 'classusers.class_id', '=', 'homework.virtualclass_id')->first();
            Helper::isOk($permission);
            return call_user_func_array(array($this, $method), $arguments);
        }
    }
    /*  To Add New Homework */
    private function add($request) {
        $this->validate($request, [
            'hw_name' => 'required',
            'hw_mark' => 'required',
            'hw_type' => 'required',
            'hw_date' => 'required',
        ]);
        $homework                  = new HW;
        $homework->title           = $request->hw_name;
        $homework->status          = 1;
        $homework->type            = $request->hw_type;
        $homework->virtualclass_id = $request->class_id;
        $homework->user_id         = $this->user->id;
        $homework->mark            = $request->hw_mark;
        $homework->handover        = date("Y-m-d H:i:s", $request->hw_date);
        if (isset($_FILES['file'])) {
            $homework->file = $this->Uploadfl($request)[0];
        } else {
            $homework->file = '';
        }
        $homework->body = $request->hw_description;
        $homework->save();
        $homework['user_name']   = $this->user->name . ' ' . $this->user->last_name;
        $homework['user_avatar'] = $this->user->avatar;
        $homework                = HW::where('id', $homework->id)->orderBy('created_at', 'asc')->first();
        $homework['user_name']   = $this->user->name . ' ' . $this->user->last_name;
        $homework['user_avatar'] = $this->user->avatar;
        return $homework;
    }
    private function addHomeworkAnswer($request) {
        $this->validate($request, ['body' => 'required', 'file' => 'required']);
        $answer = HomeworkAnswers::where('user_id', $this->user->id)->where('homework_id', $request->homework_id)->first();
        if (is_null($answer)) {
            $answer = new HomeworkAnswers;
        }
        $answer->body        = $request->body;
        $answer->user_id     = $this->user->id;
        $answer->homework_id = $request->homework_id;
        if (isset($_FILES['file'])) {
            $answer->file = $this->UploadHomeWorkAnswer($request)[0];
        } else {
            $answer->file = '';
        }
        $answer->save();
        return $answer;
    }

    /* this function to upload file To Database */
    public function UploadHomeWorkAnswer($request) {
        $validator = Validator::make($request->all(), [
            'file' => 'mimes:jpeg,jpg,png,gif,pdf,doc,docx,xdoc,xls,xlsx,ppt,pptx,odt,rtf,txt|required|max:10000',
        ]);
        if ($validator->fails()) {
            return [
                'result' => $validator->errors()->getMessages(),
                'sucess' => false];
        }
        $filename    = $_FILES['file']['name'];
        $meta        = env('UPLOAD_DIRECTORY', '') . 'upload/homework/answer/';
        $destination = $meta . $filename;
        try {

            $image = $_FILES['file']['tmp_name'];
            Image::make($image)->resize(null, 300, function ($constraint) {
                $constraint->aspectRatio();
            })->save($meta . 'X300-' . $filename);
            Image::make($image)->resize(null, 600, function ($constraint) {
                $constraint->aspectRatio();
            })->save($meta . 'X600-' . $filename);
            Image::make($image)->resize(null, 900, function ($constraint) {
                $constraint->aspectRatio();
            })->save($meta . 'X900-' . $filename);
            $path   = $_FILES['file']['name'];
            $ext    = pathinfo($path, PATHINFO_EXTENSION);
            $meta   = 'upload/homework/answer/';
            $return = [$meta . 'X300-' . $filename, $ext, 'sucess' => true];
            return $return;
        } catch (\Exception $e) {
            if (substr($e->getMessage(), 0, 30) == 'Unable to read image from file') {
                $filename    = $_FILES['file']['name'];
                $ext         = pathinfo($filename, PATHINFO_EXTENSION);
                $meta        = env('UPLOAD_DIRECTORY', '') . 'upload/homework/answer/' . $ext . '/';
                $destination = $meta . $filename;
                $pdf         = $_FILES['file']['tmp_name'];
                move_uploaded_file($pdf, $destination);
                $destination = 'upload/homework/answer/' . $ext . '/' . $filename;
                $return      = [$destination, $ext, 'sucess' => true];
                return $return;
            } else {
                return $e->getMessage();
            }
        }
    }

    /* this function to upload file To Database */
    public function Uploadfl($request) {
        $validator = Validator::make($request->all(), [
            'file' => 'mimes:jpeg,jpg,png,gif,pdf,doc,docx,xdoc,xls,xlsx,ppt,pptx,odt,rtf,txt|required|max:10000',
        ]);
        if ($validator->fails()) {
            return [
                'result' => $validator->errors()->getMessages(),
                'sucess' => false];
        }
        $filename    = $_FILES['file']['name'];
        $meta        = env('UPLOAD_DIRECTORY', '') . 'upload/homework/images/';
        $destination = $meta . $filename;
        try {

            $image = $_FILES['file']['tmp_name'];
            Image::make($image)->resize(null, 300, function ($constraint) {
                $constraint->aspectRatio();
            })->save($meta . 'X300-' . $filename);
            Image::make($image)->resize(null, 600, function ($constraint) {
                $constraint->aspectRatio();
            })->save($meta . 'X600-' . $filename);
            Image::make($image)->resize(null, 900, function ($constraint) {
                $constraint->aspectRatio();
            })->save($meta . 'X900-' . $filename);
            $path   = $_FILES['file']['name'];
            $ext    = pathinfo($path, PATHINFO_EXTENSION);
            $meta   = 'upload/homework/images/';
            $return = [$meta . 'X300-' . $filename, $ext, 'sucess' => true];
            return $return;
        } catch (\Exception $e) {
            if (substr($e->getMessage(), 0, 30) == 'Unable to read image from file') {
                $filename    = $_FILES['file']['name'];
                $ext         = pathinfo($filename, PATHINFO_EXTENSION);
                $meta        = env('UPLOAD_DIRECTORY', '') . 'upload/homework/' . $ext . '/';
                $destination = $meta . $filename;
                $pdf         = $_FILES['file']['tmp_name'];
                move_uploaded_file($pdf, $destination);
                $destination = 'upload/homework/' . $ext . '/' . $filename;
                $return      = [$destination, $ext, 'sucess' => true];
                return $return;
            } else {
                return $e->getMessage();
            }
        }
    }
    /* To Edit In Homework */
    private function edit($request) {
        $user               = \Auth::user();
        $homework           = HW::where('id', '=', $request->id)->first();
        $homework->title    = $request->data['title'];
        $homework->body     = $request->data['body'];
        $homework->mark     = $request->data['mark'];
        $homework->type     = $request->data['type'];
        $homework->handover = date("Y-m-d H:i:s", $request->data['handover']);
        $homework->save();
        $class                             = virtualclass::where('id', $homework->virtualclass_id)->first();
        $notificationParams['class_name']  = $class->name;
        $notificationParams['user_name']   = $user->name;
        $notificationParams['user_id']     = $user->id;
        $notificationParams['homework_id'] = $homework->id;
        $notificationParams['class_id']    = $class->id;
        $notificationParams['icon']        = $user->avatar;

        Notifications::getInstance()->notifyUsers(15, $notificationParams);
        return $homework;
    }

    private function review($request) {
        $return = [];
        foreach ($request->student as $key => $value) {
            $editanswer             = HomeworkAnswers::where('id', '=', $value->id)->first();
            $editanswer->mark       = $value->mark;
            $editanswer->is_correct = $value->is_correct;
            $editanswer->save();
            $return[] = $editanswer;
        }
        return $return;
    }
    private function getanswer($req, $id) {
        $getanswer = HomeworkAnswers::where('homework_id', $id)
            ->leftJoin('users', 'users.id', '=', 'homework_answers.user_id')->select(\DB::raw('CONCAT(users.name," ",users.last_name ) AS user_name'),
            'users.id',
            'homework_answers.body',
            'homework_answers.mark',
            'homework_answers.review',
            'homework_answers.is_correct',
            'homework_answers.created_at as created',
            'homework_answers.homework_id',
            'homework_answers.file',
            'homework_answers.user_id'
        );
        $asd = HomeworkAnswers::where('homework_id', $id)->update([
            'review' => 'seen',
        ]);

        return $getanswer->get();
    }

    /* To Delete Homework */
    private function delete($id) {
        $delete = HW::where('id', $id)->delete();
        if ($delete) {
            return [
                'result' => 'deleted',
                'sucess' => true];
        } else {
            return [
                'result' => 'error',
                'sucess' => false];
        }
    }

}
