<?php

namespace App\Http\Controllers\VClass\parts;

use App\Http\Controllers\Classes\Helper;
use App\Http\Controllers\Controller;
use App\Http\Controllers\VClass\MyPermission;
use App\Models\classusers;
use App\Models\class_files;
use App\Models\User;
use Auth;
use Intervention\Image\ImageManagerStatic as Image;
use Validator;

class Files extends Controller implements MyPermission
{
    public $me       = null;
    public $user     = null;
    public $class_id = null;
    public function __construct($id = false)
    {
        $this->class_id = $id;
        if ($id == 'solo') {
            $this->me = class_files::where('class_files.deleted_at', null);
        } else {
            $this->me = class_files::where('class_files.class_id', $id);
        }
        $this->me = $this->me->with('comment')->leftJoin('users', 'users.id', '=', 'class_files.user_id')->select('class_files.*', \DB::raw('CONCAT(users.name," ",users.last_name ) AS user_name'), /*'users.name', 'users.last_name',*/'users.avatar as user_avatar')->orderBy('created_at', 'desc');

        $this->user = Auth::user();
        return $this;
    }

    public function __call($method, $arguments)
    {

        if (method_exists($this, $method)) {
            $reflect    = new \ReflectionClass($this);
            $permission = self::PERMISSION_INTERFACE[$reflect->getShortName()];
            // $permission['keys']     = ['class_id' => ''];
            $permission['relation']   = classusers::classs($this->class_id)->addSelect('class_files.id as file_id', 'classusers.*', 'class_files.*')->where('classusers.uid', \Auth::user()->id)->leftJoin('class_files', 'classusers.class_id', '=', 'class_files.class_id')->first();
            $permission['permission'] = $permission['permission'][$method];
            Helper::isOk($permission);
            return call_user_func_array(array($this, $method), $arguments);
        }
    }
    /* To Add New File */
    private function add($request)
    {
        $uploaded = $this->Uploadfl($request);

        if ($uploaded['sucess'] == true) {
            $files              = new class_files;
            $files->name        = $request->file('file')->getClientOriginalName();
            $files->extension   = $uploaded[1];
            $files->url         = $uploaded[0];
            $files->description = $request->input('description');
            $files->class_id    = $request->input('class_id');
            $files->user_id     = $this->user->id;
            $files->save();
            $files['user_name']   = $this->user->name . ' ' . $this->user->last_name;
            $files['user_avatar'] = $this->user->avatar;

            // $files = class_files::where('id', $files->id)->orderBy('created_at', 'asc')->first();
            return compact('files');
        } else {return $uploaded['erorr'];}
    }
    /* This Function To Upload File To Database */
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
        $meta        = env('UPLOAD_DIRECTORY', '') . 'upload/files/images/';
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
            $meta   = 'upload/files/images/';
            $return = [$meta . 'X300-' . $filename, $ext, 'sucess' => true];
            return $return;
        } catch (\Exception $e) {
            if (substr($e->getMessage(), 0, 30) == 'Unable to read image from file') {
                $filename    = $_FILES['file']['name'];
                $ext         = pathinfo($filename, PATHINFO_EXTENSION);
                $meta        = env('UPLOAD_DIRECTORY', '') . 'upload/files/';
                $destination = $meta . $filename;
                $pdf         = $_FILES['file']['tmp_name'];
                move_uploaded_file($pdf, $destination);
                $destination = 'upload/files/' . $filename;
                $return      = [$destination, $ext, 'sucess' => true];
                return $return;
            } else {
                return $e->getMessage();
            }
        }
    }
    /* To Edit In File */
    private function edit($request)
    {
        $file              = class_files::where('id', '=', $request->id)->first();
        $file->name        = $request->data['name'];
        $file->description = $request->data['description'];
        $file->save();
        return $file;
    }
    /* To Delete File */
    private function delete($id)
    {

        $delete = class_files::where('id', $id)->delete();
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
