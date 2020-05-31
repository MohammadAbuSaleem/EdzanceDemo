<?php
namespace App\Http\Controllers\VClass\parts;

use App\Http\Controllers\Classes\Helper;
use App\Http\Controllers\Controller;
use App\Http\Controllers\VClass\MyPermission;
use App\Models\classusers;
use App\Models\HomeworkAnswers;
use App\Models\homework as HW;
use App\Models\User;
use App\Models\virtualclass;
use Auth;
use Intervention\Image\ImageManagerStatic as Image;
use Validator;

class HomeworkAnswer extends Controller implements MyPermission
{
    public $me       = null;
    public $user     = null;
    public $class_id = 'No Data Yet';
    public $partId   = 'all';
    public function __construct($classId = false, $partId = 'all')
    {

        $this->class_id = $classId;
        $this->partId   = $partId;
        if ($classId == 'solo') {
            $this->me = HW::where('deleted_at', null);
        } else {
            $this->me = HW::where('virtualclass_id', $this->class_id);
        }
        $this->user = Auth::user();
        $this->me   = $this->me->with('comment')->leftJoin('users', 'users.id', '=', 'homework.user_id')->select('homework.*', \DB::raw('CONCAT(users.name," ",users.last_name ) AS user_name'), /*'users.name', 'users.last_name',*/'users.avatar as user_avatar')->orderBy('created_at', 'desc');

        return $this;
    }
    public function __call($method, $arguments)
    {
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
    private function addHomeworkAnswer($request)
    {
        $this->validate($request, ['body' => 'required', 'file' => 'required']);
        $answer              = new HomeworkAnswers;
        $answer->body        = $request->body;
        $answer->user_id     = $this->user->id;
        $answer->type        = $request->hw_type;
        $answer->homework_id = $request->homework_id;
        if (isset($_FILES['file'])) {
            $answer->file = $this->Uploadfl($request)[0];
        } else {
            $answer->file = '';
        }
        $answer->save();
        return $answer;
    }
    /* this function to upload file To Database */
    public function Uploadfl($request)
    {
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
    private function editHomeworkanswer($request)
    {
        $user             = \Auth::user();
        $editanswer       = HomeworkAnswers::where('id', '=', $request->id)->first();
        $editanswer->body = $request->data['body'];
        $editanswer->save();
        $class = virtualclass::where('id', $editanswer->virtualclass_id)->first();
        // $notificationParams['class_name']  = $class->name;
        // $notificationParams['user_name']   = $user->name;
        // $notificationParams['user_id']     = $user->id;
        // $notificationParams['homework_id'] = $homework->id;
        // $notificationParams['class_id']    = $class->id;
        // $notificationParams['icon']        = $user->avatar;
        // Notifications::getInstance()->notifyUsers(15, $notificationParams);
        return $homework;
    }
    /* To Delete Homework */
    private function deleteHomeworkAnswer($id)
    {
        $delete = HomeworkAnswers::where('id', $id)->delete();
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
