<?php
namespace App\Http\Controllers\Classes\VirtualClass;
use App\Models\classusers;
use App\Models\virtualclass;
use App\Models\exam;
use App\Models\class_files;
use App\library\notifications\Notifications;
use Carbon\Carbon;
use Auth;
use DB;
use App\Model\Image;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Validator;


class FilesClass extends Controller {
    protected $user ='No Data Yet';
    protected static $instance =null;
    public function __construct()
    {
        $this->user = Auth::user();
        return $this;
    } 
    public static function getInstance() {
        if (self::$instance == null) {
            self::$instance = new Files();
        }
        return self::$instance;
    }
    
   public function fileUpdate(Request $request)
    {
        $user =$this->user;
        $post = class_files::where('id', $request->input('id'))->first();
        $post->description = $request->input('data');
        $post->save();
        return response()->success($post);
    }

     public function newFiles(Request $request)
    {
      $files = new class_files;
        $files->name = $request->input('name');
        $files->extension = $request->input('extension');
        $files->url = $request->input('url');
        $files->description = $request->input('description');
        $files->class_id  = $request->input('class_id');
        $files->save();
        $files=class_files::where('id', $files->id)->with('comment')->orderBy('created_at', 'asc')->first();
        return response()->success(compact('files'));
    }

      public function editFile(Request $request)
    {
        $user =$this->user;
        $file = class_files::where('id', '=', $request->id)->first();
        $file->name = $request->data['name'];
        $file->description = $request->data['description'];
        $file->save();
        return response()->success(compact('file'));
    }

     public function files($id, $skip = 0, $take = 10) {
        $user =$this->user;
        $mypost = class_files::where('class_files.class_id', $id)
                        ->with('comment')
                        ->join('virtualclass', 'class_files.class_id', "=", "virtualclass.id")
                        ->join('users', "users.id", "=", "virtualclass.instructor")
                        ->select("class_files.*", "users.id as user_id", DB::raw("concat(users.name,' ', users.last_name) as user_name"), "users.avatar as user_avatar")
                        ->orderBy('class_files.created_at', 'desc')
                        ->skip($skip)->take($take)->get();
        if (count($mypost) == 0)
            return response()->success('no post');
        return response()->success($mypost);
    }

    public function Uploadfl(Request $request)
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
        $meta ='upload/files/images/';
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
                return $e->getMessage();
            }
        }
    }

    public function getClassFilePage($classFileId){
        $user =$this->user;
            $classFile = class_files::where('class_files.id',$classFileId)
                    ->with('comment')
                    ->join('virtualclass', 'class_files.class_id', "=", "virtualclass.id")
                    ->join('users', "users.id", "=", "virtualclass.instructor")
                    ->select("class_files.*", "users.id as user_id", DB::raw("concat(users.name,' ', users.last_name) as user_name"), "users.avatar as user_avatar")
                    ->get();
            
            $classFile = $classFile->toArray();
            if(!empty($classFile)){
                // check if the user in the class
                $class = classusers::where('class_id', $classFile[0]['class_id'])->where('uid', $user->id)->first();
                if(!empty($class)){
                    return response()->success($classFile);
                }else{
                    return response()->failed(["message" => "not_calss_user"]);
                }
            }else{
                return response()->failed(["no post"]);
            }
    }

    

}


