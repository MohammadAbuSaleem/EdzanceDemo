<?php
namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Classes\Helper;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Members\Members;
use App\Http\Controllers\Profile\PermissionProfile;
use App\Models\category;
use App\Models\classusers;
use App\Models\country;
use App\Models\friends;
use App\Models\history;
use App\Models\InstructorFreeHours;
use App\Models\student_info;
use App\Models\User;
use Auth;
use DB;
use Intervention\Image\ImageManagerStatic as Image;
use JWTAuth;

//Profile class
class Profile extends Controller implements PermissionProfile
{
    private static $instance = null;
    private $user            = null;
    private $ananymous       = null;

    public static function getInstance()
    {

        if (self::$instance == null) {
            self::$instance = new Profile();
        }
        return self::$instance;
    }
    public function __construct()
    {
        try {
            if (!JWTAuth::getToken()) {
                $this->ananymous = true;
            } else {
                $this->user      = JWTAuth::parseToken()->authenticate();
                $this->ananymous = false;
            }
        } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            $this->ananymous = true;
        } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            $this->ananymous = true;
        } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {
            $this->ananymous = true;
        }
        return $this;
    }
    public function __call($method, $arguments)
    {
        if (method_exists($this, $method)) {
            $reflect            = new \ReflectionClass($this);
            $permission         = self::PERMISSION_INTERFACE[$reflect->getShortName()];
            $permission['keys'] = false;
            if (isset($permission['permission'][$method])) {

                $permission['permission'] = $permission['permission'][$method];
            } else { $permission['permission'] = '';}
            Helper::isOk($permission);
            return call_user_func_array(array($this, $method), $arguments);
        }
    }
    /* to get profile header */
    public function ProfileHeader($id)
    {

        if ($this->ananymous) {
            $users = User::select(DB::raw("concat(users.name, ' ', users.mid_name, ' ', users.last_name) as name"), "users.id", "users.FB_UID", "users.avatar", "users.showcase", "users.email_verified as active")
                ->where('users.id', "=", $id)->first();
            $users['level']    = (new Members(['action' => 'getPermissions', 'user_id' => $id]))->level;
            $users['isfriend'] = false;
            $users['itsme']    = false;
        } else {
            $users = User::select([DB::raw("concat(users.name, ' ', users.mid_name, ' ', users.last_name) as name"), "users.id", "users.FB_UID", "users.avatar", "users.showcase", "users.acctype", "users.email_verified as active", "friends.id as isfriend"])
                ->leftjoin('friends', function ($join) use ($id) {
                    $join->on('friends.friend_id', '=', "users.id")
                        ->where('friends.id', '=', $this->user->id)
                        ->where('friends.status', '=', "follower");
                })
                ->where('users.id', "=", $id)->first();
            $users['level']    = (new Members(['action' => 'getPermissions', 'user_id' => $users->id]))->level;
            $users['isfriend'] = $users['isfriend'] == null ? false : true;
            $users['itsme']    = $this->user->id == $id ? true : false;
        }
        if (empty($users)) {
            return response()->failed(['result' => 'error', 'sucess' => false, 'message' => 'not_exists_user']);
        }
        $users        = $users->toArray();
        $this->header = $users;
        return $this->header;
    }
    /*
     * @Work :: To Get Profile Wall Data
     * @return User Info + Followers and Friends + Images and Videos
     */
    public function ProfileWall($id)
    {
        $users = User::select(["users.id", "users.DOB as birthdate", "users.sex", "student_info.country", DB::raw("concat( spec.name, ' - ',uni.name) as institute"), DB::raw("concat(users.name, ' ', users.mid_name, ' ', users.last_name) as name")])
            ->leftjoin("institutes", "users.institute_id", "=", "institutes.id")
            ->leftjoin("categories as spec", "users.institute_id", "=", "spec.id")
            ->leftjoin("categories as uni", "spec.main_parent", "=", "uni.id")
            ->leftjoin("student_info", "users.id", "=", "student_info.user_id")
            ->where('users.id', $id)
            ->with("profileFollowers")
            ->with("profileFriends")
            ->with("profilePostsImages")
            ->with("profilePostsVideos")
            ->with("profileFollowersCount")
            ->with("profileFriendsCount")
            ->first();
        $users                            = $users->toArray();
        $users['profile_followers_count'] = isset($users['profile_followers_count'][0]['count']) ? $users['profile_followers_count'][0]['count'] : 0;
        $users['profile_friends_count']   = isset($users['profile_friends_count'][0]['count']) ? $users['profile_friends_count'][0]['count'] : 0;
        return $users;
    }
    /*
     * @Work :: To Get Profile Cv Data
     * @return User All Data
     */
    public function ProfileCv($id)
    {
        $user         = User::where('users.id', $id)->leftJoin('categories', 'categories.id', '=', 'users.institute_id')->select('users.*', 'categories.parent as inst_parent', 'categories.level as inst_level', 'categories.parent_ids as parent_ids', 'categories.name as inst')->first();
        $institute    = $user->institute_id;
        $selectParams = [
            'users.name',
            'users.mid_name',
            'users.last_name',
            'users.sex',
            'users.DOB',
            'users.email',
            'users.telephone',
            'users.facebook',
            'users.twitter',
            'users.skype',
            'users.id',
            'users.linkedin',
            'uni.name as university_name',
            'college.mthr_name as college_name',
            'specialition.name as specialition_name',
            'country.country_arabic as university_country',
            'student_info.skills',
            'student_info.concerns',
            'student_info.country as student_country',
            'student_info.hobbies',
            'student_info.languages',
            'student_info.university_id',
            'student_info.specialition_desc',
            'student_info.university_start',
            'student_info.university_end',
            'student_info.school',
            'student_info.school_town',
            'student_info.school_end',
            'users.acctype',
            'instructor_info.avilablefrom as available_from',
            'instructor_info.avilableto as available_to',
        ];
        $users = User::select($selectParams)
            ->where('users.id', $id)
            ->leftjoin("categories as specialition", "users.institute_id", "=", "specialition.id")
            ->leftjoin("categories as uni", "uni.id", "=", "specialition.main_parent")
            ->leftjoin("institutes as inst", "uni.id", "=", "inst.id")
            ->leftjoin("college", "users.college_id", "=", "college.id")
            ->leftjoin("student_info", "users.id", "=", "student_info.user_id")
            ->leftjoin("country", "inst.country_id", "=", "country.id")
            ->leftjoin("instructor_info", "instructor_info.user_id", "=", "users.id")
            ->first();

        $users                         = $users->toArray();
        $users['instructor_education'] = \App\Models\InstructorEducation::select("instructor_education.*", "country.country_arabic as country_name")->where("user_id", $id)
            ->leftjoin("country", "instructor_education.country_id", "=", "country.id")
            ->get();

        $users['instructor_education'] = \App\Models\history::where("user_id", $id)
            ->leftjoin("categories", "histories.institute_id", "=", "categories.id")
            ->leftjoin("institutes as ins", "histories.institute_id", "=", "ins.id")
            ->leftjoin("country", "country.id", "=", "histories.country_id")
            ->leftjoin("institutes as uni", "uni.id", "=", "categories.main_parent")
            ->select(
                'histories.id',
                DB::raw("YEAR(histories.start) as start_year"),
                DB::raw("YEAR(histories.end) as end_year"),
                'country.country_arabic as country_name',
                'histories.institute',
                'histories.grade',
                'uni.id as instId',
                'uni.mthr_name as instName',
                'categories.id as speId',
                'categories.name as speName',
                'categories.parent_ids as parent_ids',
                'histories.country_id'
            )
            ->get()->toArray();
        foreach ($users['instructor_education'] as $key => &$value) {
            if (is_null($value['instId'])) {

                $names             = explode('-', $value['institute']);
                $value['speName']  = (isset($names[1])) ? $names[1] : '';
                $value['instName'] = (isset($names[0])) ? $names[0] : '';
                // unset($value['institute']);
            } else {

            }
        }
        $users['free_hours'] = [];
        // get doctor free hours
        $users['level'] = (new Members(['action' => 'getPermissions', 'user_id' => $id]))->level;
        if ($users['level'] == 5 && !empty($users)) {
            $freeHours = \App\Models\InstructorFreeHours::where("user_id", $user->id)->get();
            foreach ($freeHours as $key => &$value) {
                $value->days = explode(',', $value->day);
            }
            $users['free_hours'] = $freeHours;
        }
        return $users;
    }
    public function getMainParent($cat)
    {
        //get all main parents
        $retVal = '';
        $inst   = category::where('is_main', '<>', 0)
            ->Where(function ($query) use ($cat) {
                $query->whereIn('id', explode(',', $cat['parent_ids']))
                    ->orWhere('id', $cat['speId']);
            })->get()->toArray();
        //get first main parent name
        if (count($inst) > 1) {
            $retVal = ($inst[1]['id'] == $cat['speId']) ? $inst[0]['name'] : $inst[1]['name'];
            $retVal = ($retVal == $cat['instName']) ? '' : $retVal;
        }
        //get
        return $retVal;
    }
    /*
     * @Work :: To Get Countries List
     * @return country_arabic / id
     */
    public function CountriesList()
    {
        $countries = country::select("country_arabic", "id")->withTrashed()->get();
        return $countries;
    }
    /*
     * @Work :: To Add Instructor Free Houres
     * @return :: days / from_hour / to_hour
     */
    public function AddInstructorEducation($request)
    {
        $this->validate($request, [
            'grade'      => 'required',
            'country_id' => 'required',
            'start_year' => 'required',
            'end_year'   => 'required',
        ]);
        /* To Add New Institute History */
        $institute               = new \App\Models\history;
        $institute->grade        = $request->grade;
        $institute->start        = date("Y-m-d H:i:s", strtotime($request->start_year . '-01-01'));
        $institute->end          = date("Y-m-d H:i:s", strtotime($request->end_year . '-01-01'));
        $institute->country_id   = $request->country_id;
        $institute->institute    = ($request->speName != '') ? $request->instName . '-' . $request->speName : $request->instName;
        $institute->user_id      = $this->user->id;
        $institute->institute_id = ($request->speId != '') ? $request->speId : $request->instId;
        $institute->save();
        return $institute;
    }
    public function AddInstructorFreeHours($request)
    {
        $user = Auth::user();
        if (!empty($user)) {
            $this->validate($request, [
                'days'      => 'required',
                'from_hour' => 'required',
                'to_hour'   => 'required',
            ]);

            $freeHour            = new InstructorFreeHours();
            $freeHour->day       = implode(",", $request->days);
            $freeHour->from_hour = date("Y-m-d H:i:s", $request->from_hour);
            $freeHour->to_hour   = date("Y-m-d H:i:s", $request->to_hour);
            $freeHour->user_id   = $user->id;
            $freeHour->save();
            $freeHour->days = $request->days;
            return $freeHour;
        }
    }
    /*
     * @Work :: To Get Instructor Free Houres
     * @return :: days / from_hour / to_hour / id
     */
    public function GetInstructorFreeHours()
    {
        $user           = Auth::user();
        $freeHours      = InstructorFreeHours::where("user_id", $user->id)->get();
        $objects        = array();
        $formattedArray = array();
        foreach ($freeHours as $freeHour) {
            $key                     = $freeHour['from_hour'] . $freeHour["to_hour"];
            $objects[$key]['days'][] = $freeHour['day'];
            $freeHour->from_hour     = date("Y-m-d H:i:s", $request->from_hour);
            $freeHour->to_hour       = date("Y-m-d H:i:s", $request->to_hour);
            $objects[$key]['id']     = $freeHour['group_id'];
            $formattedArray          = $objects[$key];
        }
        foreach ($objects as $object) {
            $formattedArray[] = $object;
        }
        return $formattedArray;
    }
    /*
     * @Work :: To Delete Instructor Free Houres
     * @return :: Deleted / Error
     */
    public function DeleteFreeHours($request)
    {
        $delete = InstructorFreeHours::where('id', $request->id)->delete();
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
    /*
     * @Work :: To Update Instructor Education
     * @return :: grade / specialization / country_id / start_year / end_year / university_name
     */
    private function update(&$updated, $request, $db_name, $r_name)
    {
        $r_name = (isset($r_name)) ? $r_name : $db_name;
        if (isset($request->$r_name) && !empty($request->$r_name)) {
            $updated->$db_name = $request->$r_name;
        }
        return $this;
    }
    public function UpdateInstructorEducation($request)
    {
        $history             = \App\Models\history::where('id', $request->id)->first();
        $history->grade      = $request->grade;
        $history->country_id = $request->country_id;
        $history->start      = date("Y-m-d H:i:s", strtotime($request->start_year . '-01-01'));
        $history->end        = date("Y-m-d H:i:s", strtotime($request->end_year . '-01-01'));
        $history->save();

    }
    /*
     * @Work :: To Delete Instructor Education
     * @return :: Deleted / Error
     */
    public function DeleteInstructorEducation($request)
    {
        $this->validate($request, [
            'id' => 'required',
        ]);
        \App\Models\history::where('id', $request->id)->delete();
        return [];
    }
    public function addinstructoreducationOld($request)
    {
        $user = Auth::user();
        if (!empty($user)) {
            $this->validate($request, [
                'grade'           => 'required',
                'specialization'  => 'required',
                'country_id'      => 'required',
                'start_year'      => 'required',
                'end_year'        => 'required',
                'university_name' => 'required',
            ]);
            $instructorEducation                 = new \App\Models\InstructorEducation;
            $instructorEducation->grade          = $request->grade;
            $instructorEducation->specialization = $request->specialization;
            $instructorEducation->country_id     = $request->country_id;
            $instructorEducation->start_year     = date("Y-m-d H:i:s", $request->start_year);
            $instructorEducation->end_year       = date("Y-m-d H:i:s", $request->end_year);
            // $instructorEducation->start_year      = $request->start_year;
            // $instructorEducation->end_year        = $request->end_year;
            $instructorEducation->user_id         = $user->id;
            $instructorEducation->university_name = $request->university_name;
            $instructorEducation->save();

            return $instructorEducation;
        } else {
            return 0;
        }
    }
    /*
     * @Work :: To Add School Start And End Date
     * @return :: user_id / school / school_town / student_info
     */
    public function Sec($request)
    {
        $school_end = date('Y-m-d', strtotime(str_replace('-', '/', "1/1/" . $request->input('school_end'))));
        if (!$user = Auth::user()) {
            die('not logged in');
        }
        if (!($student_info = student_info::where('user_id', $user->id)->first())) {
            $student_info          = new student_info;
            $student_info->user_id = $user->id;
        }
        $student_info->school      = $request->input('school');
        $student_info->school_town = $request->input('school_town');
        $student_info->school_end  = $school_end;
        $student_info->save();
        return compact('student_info');
    }
    /*
     * @Work :: To Add University Start And End Date
     * @return :: user_id / specialition_desc / university_id / student_info
     */
    public function Uni($request)
    {
        $university_start = date("Y-m-d H:i:s", $request->input('university_start'));
        $university_end   = date("Y-m-d H:i:s", $request->input('university_end'));
        // $university_start = date('Y-m-d', strtotime(str_replace('-', '/', "1/1/" . $request->input('university_start'))));
        // $university_end   = date('Y-m-d', strtotime(str_replace('-', '/', "1/1/" . $request->input('university_end'))));
        if (!$user = Auth::user()) {
            die('not logged in');
        }
        $user = Auth::user();
        if (!($student_info = student_info::where('user_id', $user->id)->first())) {
            $student_info          = new student_info;
            $student_info->user_id = $user->id;
        }
        $student_info->specialition_desc = $request->input('specialition_desc');
        $student_info->university_id     = $request->input('university_id');
        $student_info->university_start  = $university_start;
        $student_info->university_end    = $university_end;
        $student_info->save();

        return compact('student_info');
    }
    /*
     * @Work :: To Add User Skills / Hobbies / Language / Concerns  In CV
     * @return :: skills / hobbies / concerns / languages
     */
    public function Other($request)
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
        return compact('user');
    }
    /* To Add User Contact Information */
    public function Contact($request)
    {
        if (!$user = $this->user) {
            die('not logged in');
        }
        $user            = $this->user;
        $user->email     = $request->input('email');
        $user->telephone = $request->input('telephone');
        $user->skype     = $request->input('skype');
        $user->twitter   = $request->input('twitter');
        $user->linkedin  = $request->input('linkedin');
        $user->facebook  = $request->input('facebook');
        $user->save();
        return compact('user');
    }
    /* To Add User Personal Information */
    public function Inf($request)
    {
        if (!($user = $this->user || $user->id == $request->input('id'))) {
            die('not logged in');
        }
        $user = $this->user;
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
            $student_info->user_id = $user->id;
        }
        if ($request->input('country') != '') {
            $student_info->country = $request->input('country');
        }
        $user->save();
        $student_info->save();
        $user = User::where('id', $user->id)->with('studentInfo')->first();
        return compact('user');
    }
    /* To Get User Followers And Shown In User Profile  */
    public function friends($id, $skip = 0, $take = 5)
    {
        $user = $this->user;
        // die(var_dump(func_get_args()));
        if (!$this->ananymous) {
            $followers = friends::select([DB::raw("concat(users.name, ' ', users.mid_name,' ', users.last_name) as name"), "users.id", "users.avatar", "f2.id as isfriend", "friends.created_at"])
                ->leftjoin("users", "users.id", "=", "friends.id")
                ->leftjoin('friends as f2', function ($join) use ($user) {
                    $join->on('f2.friend_id', '=', "users.id")
                        ->where('f2.id', '=', $this->user->id)
                        ->where('f2.status', '=', "follower");
                })->take($take)->skip($skip)->where('friends.friend_id', $id)->where('friends.status', "follower")->get();
        } else {
            $followers = friends::where("friend_id", $id)
                ->where('friends.status', "follower")
                ->join("users", "users.id", "=", "friends.friend_id")
                ->select(DB::raw("concat(users.name, ' ', users.mid_name, ' ', users.last_name) as name"), "users.id", "users.avatar")
                ->take($take)->skip($skip)->get();
        }
        if (empty($followers)) {
            return "no post";
        } else {
            if (!$this->ananymous) {
                foreach ($followers as $key => $follower) {
                    if ($follower['isfriend'] == $this->user->id) {
                        $followers[$key]['isfriend'] = true;
                    } else {
                        $followers[$key]['isfriend'] = false;
                    }
                }
            }
        }

        return $followers;
    }
    /* To Get User Friends And Show In User Profile  */
    public function followers($id, $skip = 0, $take = 10)
    {
        $user = $this->user;
        if (!$this->ananymous) {
            $followers = friends::select([DB::raw("concat(users.name, ' ', users.mid_name, ' ', users.last_name) as name"), "users.id", "users.avatar", "f2.id as isfriend", "friends.created_at"])
                ->join("users", "users.id", "=", "friends.friend_id")
                ->leftjoin('friends as f2', function ($join) use ($user) {
                    $join->on('f2.friend_id', '=', "users.id")
                        ->where('f2.id', '=', $user->id)
                        ->where('f2.status', '=', "follower");
                })->take($take)->skip($skip)->where('friends.id', $id)->where('friends.status', "follower")->get();
        } else {

            $followers = friends::where("friends.id", $id)
                ->where('friends.status', '=', "follower")
                ->join("users", "users.id", "=", "friends.friend_id")
                ->select(DB::raw("concat(users.name, ' ', users.mid_name, ' ', users.last_name) as name"), "users.id", "users.avatar")
                ->take($take)->skip($skip)->get();
        }
        // $followers = $followers->toArray();
        if (empty($followers)) {
            return "no post";
        } else {

            if (!$this->ananymous) {
                foreach ($followers as $key => $follower) {
                    if ($follower['isfriend'] == $this->user->id) {
                        $followers[$key]['isfriend'] = true;
                    } else {
                        $followers[$key]['isfriend'] = false;
                    }
                }
            }
        }
        return $followers;
    }
    /* To get all class users joined to it */
    public function classes($id, $skip = 0, $take = 10)
    {
        $classes = classusers::select('vc.name', 'ins.id', 'ins.avatar', 'ins.name as u_name', 'vc.class_hall', 'vc.days', 'vc.from', 'vc.to')
            ->join('virtualclass as vc', 'classusers.class_id', '=', 'vc.id')
            ->leftjoin('users as ins', 'ins.id', '=', 'vc.instructor')
            ->where("classusers.uid", $id)
            ->take($take)->skip($skip)->get();
        if (empty($classes->toArray())) {
            return ["no post"];
        }
        return $classes;
    }

    // public function UploadFile($type, $request)
    // {
    //     $user = Auth::user();
    //     if (!empty($user)) {
    //         try {
    //             $request->type = $type;
    //             $upload        = FileUpload::getInstance()->uploadFile($request, $user->acctype, $user->id);
    //         } catch (Exception $e) {
    //             return response()->failed(['result' => 'error', 'sucess' => false, 'message' => 'failed to upload image']);
    //         }
    //         if ($upload['success']) {
    //             switch ($request->type) {
    //                 case 'profile_avatar':
    //                 case 'profile_avatar_file':
    //                     $user->avatar = $upload['file_path'] . $upload['file_name'];
    //                     $user->save();
    //                     // add post
    //                     $post = new post();
    //                     $post->addAvatarPost($upload['file_name'], $user->id);
    //                     break;
    //                 case 'profile_cover':
    //                 case 'profile_cover_file':
    //                     $user->showcase = $upload['file_path'] . $upload['file_name'];
    //                     $user->save();
    //                     // add post

    //                     $post = new post();
    //                     $post->addCoverPost($upload['file_name'], $user->id);
    //                     break;
    //             }
    //             return response()->success(['file_name' => $upload['file_name'], 'file_path' => $upload['file_path'], 'file_extension' => $upload['file_extension']]);
    //         } else {
    //             return response()->failed(['result' => 'error', 'sucess' => false, 'message' => $upload['message']]);
    //         }
    //     }
    // }

    public function ChangeCover($request)
    {
        $path = 'upload/profile/cover/' . md5(time()) . Auth::user()->id . '.jpg';
        if (!$user = Auth::user()) {
            die('not logged in');
        }
        $ii             = Image::make($request->input('string_file'))->encode('jpg')->save(env('UPLOAD_DIRECTORY', '') . $path);
        $user->showcase = $path;
        $user->save();
        return $path;
    }

    public function ChangeAvatar($request)
    {
        $path                 = 'upload/profile/avatar/' . md5(time()) . Auth::user()->id . '.jpg';
        \Auth::user()->avatar = $path;
        if (!$user = \Auth::user()) {die('not logged in');}
        $ii = Image::make($request->input('string_file'))->encode('jpg')->save(env('UPLOAD_DIRECTORY', '') . $path);
        \Auth::user()->save();
        return ($path);
        return \Auth::user()->avatar;

    }

}
