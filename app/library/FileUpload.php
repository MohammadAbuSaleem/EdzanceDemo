<?php
namespace App\library;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\ImageManagerStatic as Image;

/**
 * Description of FileUpload
 *
 * @author ahmadhajeer
 */

class FileUpload implements FileUploadInt
{

    // public  $AAA = base_path();
    private static $instance = null;
    private static $me       = null;
    /**
     * returns an object of FileUpload
     * @return type
     */
    public static function getInstance()
    {

        if (self::$instance == null) {
            self::$instance = new FileUpload();
            self::$me       = \Auth::user();
        }
        return self::$instance;
    }
    public function uploadFile($request)
    {
        //validate received datagg
        $validation = $this->validateReceivedFile($request);
        // check if valid file
        if (!$validation) {return array('success' => false, 'message' => "invalid file");}
        // get file path by type
        $filePath = $this->getTypePath($request->type);
        // upload the received file
        switch ($request->type) {
            case self::WALL_POST_FILE_TYPE:
            case self::VIRTUAL_CLASS_POST_IMAGE_TYPE:
            case self::PROFILE_COVER_FILE_TYPE:
            case self::PROFILE_AVATAR_FILE_TYPE:
                // generate file name
                $fileName = $this->generateFileName($_FILES['file']['name']);
                $this->resizeAndSaveImageFile($_FILES['file']['tmp_name'], $filePath, $fileName);
                $extension = pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION);
                break;
            case self::VIRTUAL_CLASS_HOMEWORK_TYPE:
            case self::VIRTUAL_CLASS_FILE_TYPE:
            case self::DOCTOR_CV_FILE_TYPE:
            case self::VIRTUAL_CLASS_SYLLABUS_TYPE:
            case self::VIRTUAL_CLASS_BOOK_TYPE:
            case self::CONTACT_US:
                // generate file name
                $fileName = $this->generateFileName($_FILES['file']['name']);
                $this->saveNormlFile($_FILES['file']['tmp_name'], $filePath, $fileName);
                $extension = pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION);
                break;
            case self::PROFILE_AVATAR_TYPE:
            case self::PROFILE_BOOKBANK_TYPE:
            case self::PROFILE_COVER_TYPE:
            case self::GROUP_COVER_TYPE:
                $fileName = $this->generateFileName();
                $this->saveStringImage($request->string_file, $filePath, $fileName);
                $extension = "jpg";
                break;
        }
        $this->updateArchive($fileName, $request->type, $filePath);
        return array('success' => true, 'file_name' => $fileName, 'file_path' => $filePath, 'file_extension' => $extension);
    }

    public function uploadFileWithName($request, $name, $type = null, $rule = [])
    {
        if (!is_null($type)) {
            $request->request->add(['type' => $type]);
        }
        //validate received datagg
        // $validation = Validator::make($request->all(), $rule);
        $validation = $this->validateReceivedFile($request);
        // check if valid file
        if (!$validation) {return array('success' => false, 'message' => "invalid file");}
        // get file path by type
        $filePath = $this->getTypePath($type);
        // upload the received file
        switch ($type) {
            case self::WALL_POST_FILE_TYPE:
            case self::VIRTUAL_CLASS_POST_IMAGE_TYPE:
            case self::PROFILE_COVER_FILE_TYPE:
            case self::PROFILE_AVATAR_FILE_TYPE:
                // generate file name
                $fileName = $this->generateFileName($_FILES[$name]['name']);
                $this->resizeAndSaveImageFile($_FILES[$name]['tmp_name'], $filePath, $fileName);
                $extension = pathinfo($_FILES[$name]['name'], PATHINFO_EXTENSION);
                break;
            case self::VIRTUAL_CLASS_HOMEWORK_TYPE:
            case self::VIRTUAL_CLASS_FILE_TYPE:
            case self::DOCTOR_CV_FILE_TYPE:
            case self::VIRTUAL_CLASS_SYLLABUS_TYPE:
            case self::VIRTUAL_CLASS_BOOK_TYPE:
            case self::CONTACT_US:
                // generate file name
                $fileName = $this->generateFileName($_FILES[$name]['name']);
                $this->saveNormlFile($_FILES[$name]['tmp_name'], $filePath, $fileName);
                $extension = pathinfo($_FILES[$name]['name'], PATHINFO_EXTENSION);
                break;
            case self::PROFILE_AVATAR_TYPE:
            case self::PROFILE_BOOKBANK_TYPE:
            case self::PROFILE_COVER_TYPE:
            case self::GROUP_COVER_TYPE:
                $fileName = $this->generateFileName();
                $this->saveStringImage($request->string_file, $filePath, $fileName);
                $extension = "jpg";
                break;
        }
        $this->updateArchive($fileName, $type, $filePath);
        return array('success' => true, 'file_name' => $fileName, 'file_path' => $filePath, 'file_extension' => $extension);
    }

    /**
     * to get storage path by file type
     * @param type $fileType
     * @return type
     */
    public function getTypePath($fileType)
    {
        return env('UPLOAD_DIRECTORY', '') . self::FILE_TYPE_PATH[$fileType];
    }

    /**
     * get validation rules depending on file type and user type
     * @param type $fileType
     * @return type
     */
    private function getTypeValidation($fileType)
    {
        if (\Auth::user()->level() > 4) {
            # code...
            $userTypeValidations = self::FILE_TYPE_VALIDATION[2];
        } else {
            $userTypeValidations = self::FILE_TYPE_VALIDATION[1];
        }
        if (isset($userTypeValidations[$fileType]) && !empty($userTypeValidations[$fileType])) {
            return $userTypeValidations[$fileType];
        } else {
            return false;
        }
    }
    /**
     * validate base64 images
     * @param type $value
     */
    private function validateStringImages($value)
    {
        $explode = explode(',', $value);
        $allow   = ['png', 'jpg', 'svg'];
        $format  = str_replace(
            [
                'data:image/',
                ';',
                'base64',
            ], [
                '', '', '',
            ], $explode[0]
        );
        // check file format
        if (!in_array($format, $allow)) {
            return false;
        }
        // check base64 format
        if (!preg_match('%^[a-zA-Z0-9/+]*={0,2}$%', $explode[1])) {
            return false;
        }
        return true;
    }
    /**
     *
     * @param type $request
     * @return boolean
     */
    public function validateReceivedFile($request)
    {
        switch ($request->type) {
            case self::PROFILE_COVER_TYPE:
            case self::PROFILE_BOOKBANK_TYPE:
            case self::PROFILE_AVATAR_TYPE:
            case self::GROUP_COVER_TYPE:
                $valid = $this->validateStringImages($request->string_file);
                return $valid;
            default:
                $validationRules = $this->getTypeValidation($request->type);
                if ($validationRules) {
                    $validator = Validator::make($request->all(), [
                        $validationRules,
                    ]);
                    if ($validator->fails()) {
                        return false;
                    } else {
                        return true;
                    }
                } else {
                    return false;
                }
                break;
        }
    }
    /**
     * create deferent sizes copies 300/600/900/ px
     * @param type $image
     * @param type $path
     */
    private function resizeAndSaveImageFile($image, $path, $name)
    {
        $width = Image::make($image)->width();
        if ($width > 300) {
            Image::make($image)->resize(300, null, function ($constraint) {
                $constraint->aspectRatio();
            })->save($path . '300' . $name);
        }
        if ($width > 600) {
            Image::make($image)->resize(600, null, function ($constraint) {
                $constraint->aspectRatio();
            })->save($path . '600' . $name);
        }
        if ($width >= 900) {
            Image::make($image)->resize(900, null, function ($constraint) {
                $constraint->aspectRatio();
            })->save($path . '900' . $name);
        }
        Image::make($image)->save($path . $name);
        return true;
    }
    /**
     *
     * @param type $file
     * @param type $path
     * @param type $name
     */
    private function saveNormlFile($file, $path, $name)
    {
        move_uploaded_file($file, $path . $name);
    }
    /**
     *
     * @param type $file
     * @param type $path
     * @param type $name
     */
    private function saveStringImage($file, $path, $name)
    {
        try {
            Image::make($file)->encode('jpg')->save($path . $name);
        } catch (Exception $e) {

        }
    }
    /**
     * generate randomly a new name for the uploaded image
     * @param type $fileName
     * @param type $length
     * @return type
     */
    private function generateFileName($fileName = '', $length = 20)
    {
        if (!empty($fileName)) {
            $extension = pathinfo($fileName, PATHINFO_EXTENSION);
        } else {
            $extension = 'jpg';
        }
        $characters       = '0123456789abcdefghijklmnopqrstuvwxyz';
        $charactersLength = strlen($characters);
        $randomString     = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString . "." . $extension;
    }
    /**
     *
     * @param type $name
     * @param type $type
     * @param type $device
     * @return string
     */
    public function getImageFullPath($name, $type, $device = 'web')
    {

        $sizesArray = self::DEVICE_IMAGE_SIZE;
        if (isset($sizesArray[$type])) {
            $sizes = $sizesArray[$type];
        } else {
            $sizes = array();
        }
        // get path by file type
        $filePath = self::FILE_TYPE_PATH[$type];
        if (isset($sizes[$type]) && !empty($sizes[$type])) {
            // get device image size
            $typeSizes  = self::DEVICE_IMAGE_SIZE[$type];
            $deviceSize = $typeSizes[$device];

            // check if the wanted file is exists
            if ($deviceSize == '900' && file_exists($filePath . '900' . $name)) {
                $existsSize = '900';
            } elseif (($deviceSize == '600' || $deviceSize == '600') && file_exists($filePath . '600' . $name)) {
                $existsSize = '600';
            } elseif (($deviceSize == '600' || $deviceSize == '600' || $deviceSize == '300') && file_exists($filePath . '300' . $name)) {
                $existsSize = '300';
            } else {
                $existsSize = '';
            }
        } else {
            $existsSize = '';
        }
        $imageFullPath = $filePath . $existsSize . $name;
        return $imageFullPath;
    }

    public function getFileFullPath($name, $type)
    {
        // get path by file type
        $filePath = self::FILE_TYPE_PATH[$type];
        return $filePath . $name;

    }

    public function updateArchive($name, $type, $path)
    {
        // check if the uploaded file is a profile picture or profile cover
        switch ($type) {
            case self::PROFILE_AVATAR_TYPE:
            case self::PROFILE_COVER_TYPE:
            case self::PROFILE_BOOKBANK_TYPE:
            case self::PROFILE_COVER_FILE_TYPE:
            case self::PROFILE_AVATAR_FILE_TYPE:
                // set the old picture as deleted picture
                \App\Models\UserFilae::where("user_id", $this->me->id)->whereNull('updated_at')->where("file_type", $type)->delete();
                break;
        }
        // save name and type of the new file
        $insertParams = array(
            'file_name' => $name,
            'file_type' => $type,
            'file_path' => $path,
            'user_id'   => self::$me->id,
        );
        \App\Models\UserFilae::insert($insertParams);
    }
}
