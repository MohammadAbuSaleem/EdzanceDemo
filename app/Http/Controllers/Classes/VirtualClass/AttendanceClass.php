<?php

namespace App\Http\Controllers\Classes\VirtualClass;
use App\Models\classusers;
use App\Models\virtualclass;
use App\Models\exam;
use App\Models\Assessment;
use App\Models\Attendance;
use App\Models\Parents;
use App\library\notifications\Notifications;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Requests;
use Auth;
use DB;

class AttendanceClass  extends Controller {

    protected $user ='No Data Yet';
    protected static $instance =null;
    protected $class_id ='No Data Yet';
    protected $attendance =[];
    protected $users =[];

    public function __construct($id = 0)
    {
        $this->user = Auth::user();
        $this->class_id = $id;
        return $this;
    } 
    public static function getInstance() {
        if (self::$instance == null) {
            self::$instance = new Attendance();
        }
        return self::$instance;
    }
        /* To Get All User In Class */
    public  function getUsers () {
      $this->users =classusers::class($this->class_id)
                     ->get();
            return $this;
    }
        /* To Get Attendance */
     public  function getAttendance () {
        $this->attendance =Attendance::find($this->class_id)->get();
        return $this;
    }

        /* To Get Attendance To Show To Fathers */s
       public function fathers ($child_id) {
           $fathers = Parents::where('parent_id',$this->user->id)->where('child_id',$child_id)->first();
           if ($fathers) {
            if ($this->user->allowed('virual.class.attendance.read', $fathers,true,'parent_id')) {
                $this->getAttendance()->getUsers();
                    return [
                    'miss'=>$this->miss,
                    'presence'=>$this->presence,
                    'users'=>$this->users,];
            }else{
                 die('not authorized');
            }
           }else{ die('not authorized');}
    }

  

}
