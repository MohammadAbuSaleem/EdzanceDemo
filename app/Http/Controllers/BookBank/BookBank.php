<?php
namespace App\Http\Controllers\BookBank;

use App\Http\Controllers\Classes\Helper;
use App\Http\Controllers\Controller;
use App\Http\Controllers\PermissionInterface\PermissionInterface;
use App\Models\Bookbank as book;
use App\Models\taggable;
use App\Models\taxonomy;
use App\Models\User;
use Intervention\Image\ImageManagerStatic as Image;
use Validator;

//BookBank class
class BookBank extends Controller implements PermissionInterface
{
    private static $instance = null;
    public static function getInstance()
    {
        if (self::$instance == null) {
            self::$instance = new BookBank();
        }
        return self::$instance;
    }
    public function __call($method, $arguments)
    {
        if (method_exists($this, $method)) {
            $reflect                  = new \ReflectionClass($this);
            $permission               = self::PERMISSION_INTERFACE[$reflect->getShortName()];
            $permission['permission'] = $permission['permission'][$method];
            Helper::isOk($permission);
            return call_user_func_array(array($this, $method), $arguments);
        }
    }
/*
Work :: To Add New Book To DB;
Variables :: book_name (var) /description (var) / file (upload) / type (enum) / price (Decimal) /contact (var);
Return :: book_name / description / file / type / price / contact;
 */
    private function addBook($Request)
    {
        self::validate($Request, [
            'book_name'   => 'required',
            'description' => 'required',
            'file'        => 'required',
            'type'        => 'required',
            // 'price'       => 'required',
            'contact'     => 'required',
        ]);
        $addbook                   = new book;
        $addbook->book_name        = $Request->book_name;
        $addbook->book_image       = $this->Uploadfl($Request)[0];
        $addbook->contact          = $Request->contact;
        $addbook->user_id          = \Auth::user()->id;
        $addbook->book_description = $Request->description;
        $addbook->type             = $Request->type;
        $addbook->price            = ((isset($Request->price)) ? $Request->price : 0);
        $addbook->save();
        foreach ($Request->tags as $key => $value) {
            if ($tax = taxonomy::where('body', $value['text'])->first()) {
                $tax->increment('number');
            } else {
                $tax         = new taxonomy;
                $tax->number = 1;
                $tax->body   = $value['text'];
                $tax->save();
            }
            $gr_tax                = new taggable;
            $gr_tax->taggable_id   = $addbook->id;
            $gr_tax->taxonomy_id   = $tax->id;
            $gr_tax->taggable_type = 'App\Models\Bookbank';
            $gr_tax->save();
        }
        return $addbook;
    }
/*
Work :: To Edit Books On DB;
Variables :: $id / $Requset;
Return :: book_name / description / file / type / price / contact;
 */
    private static function editBook($id, $Request)
    {
        //edit only if the field is filled
        $editbook                   = book::find($id);
        $editbook->book_name        = ($Request->book_name) ? $Request->book_name : $editbook->book_name;
        $editbook->book_image       = self::Uploadfl($Request)[0];
        $editbook->contact          = ($Request->contact) ? $Request->contact : $editbook->contact;
        $editbook->book_description = ($Request->book_description) ? $Request->book_description : $editbook->book_description;
        $editbook->type             = ($Request->type) ? $Request->type : $editbook->type;
        $editbook->price            = ($Request->price) ? $Request->price : $editbook->price;
        $editbook->save();

        if (!is_array($Request->tags)) {
            $Request->tags = explode(',', $Request->tags);
        }
        foreach ($Request->tags as $key => $value) {
            if ($tax = taxonomy::where('body', $value['text'])->first()) {
                $tax->increment('number');
            } else {
                $tax         = new taxonomy;
                $tax->number = 1;
                $tax->body   = $value['text'];
                $tax->save();
            }
            $gr_tax                = new taggable;
            $gr_tax->taggable_id   = $editbook->id;
            $gr_tax->taxonomy_id   = $tax->id;
            $gr_tax->taggable_type = 'App\Models\Bookbank';
            $gr_tax->save();
        }
        return ($editbook);

    }
/*
Work :: To Get All Books From DB;
Variables :: $id / $skip / $take;
Return :: book_name / description / file / type / price / contact;
 */
    private static function getBooks($id, $skip = 0, $take = 10)
    {
        $getbook = book::skip($skip)->take($take)
            ->orderBy('created_at', 'desc')
            ->join('users', 'users.id', '=', 'bookbank.user_id')
            ->select('bookbank.*', 'users.id as user_id', 'users.name', 'users.avatar', \DB::raw('CONCAT(users.name," ",users.last_name ) AS name'));
        if ($id == 'all' || $id == null) {
            $getbook = $getbook->get();
        } else {
            $getbook = $getbook->where('user_id', $id)->get();
        }
        return $getbook;
    }

    /* delete book bank */
    private static function deleteBook($id)
    {
        return (book::where('id', $id)->update(['deleted_at' => date('Y-m-d H:i:s')])) ? [
            'result' => 'deleted',
            'sucess' => true] : 'Deleted Error';
    }

/*
Work :: To Upload Book Cover Photo To DB;
Variables :: file;
Return :: Photo Url;
 */
    private static function Uploadfl($request)
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
                $meta        = env('UPLOAD_DIRECTORY', '') . 'upload/files/' . $ext . '/';
                $destination = $meta . $filename;
                $pdf         = $_FILES['file']['tmp_name'];
                move_uploaded_file($pdf, $destination);
                $destination = 'upload/files/' . $ext . '/' . $filename;
                $return      = [$destination, $ext, 'sucess' => true];
                return $return;
            } else {
                return $e->getMessage();
            }
        }
    }

}
