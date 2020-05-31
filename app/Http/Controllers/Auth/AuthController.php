<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Members\Members;
use App\Models\category;
use App\Models\country;
use App\Models\friends;
use App\Models\institute;
use App\Models\User;
use Auth;
use Bican\Roles\Models\Role;
use DB;
// use Illuminate\Support\Facades\Request;
use GrahamCampbell\Throttle\Facades\Throttle;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Http\Request;
use JWTAuth;
use Mail;
use Socialite;

class AuthController extends Controller {

    use AuthenticatesAndRegistersUsers, ThrottlesLogins;
    /**
     * Get all roles and their corresponding permissions.
     *
     * @return array
     */

    public function getRolesAbilities() {
        $abilities = [];
        $roles     = Role::all();

        foreach ($roles as $role) {
            if (!empty($role->slug)) {
                $abilities[$role->slug] = [];
                $rolePermission         = $role->permissions()->get();

                foreach ($rolePermission as $permission) {
                    if (!empty($permission->slug)) {
                        array_push($abilities[$role->slug], $permission->slug);
                    }
                }
            }
        }

        return $abilities;
    }

    /**
     * Get authenticated user details and auth credentials.
     *
     * @return JSON
     */
    public function getAuthenticatedUser() {
        if (Auth::check()) {
            $user      = Auth::user();
            $token     = JWTAuth::fromUser($user);
            $abilities = $this->getRolesAbilities();
            $userRole  = [];

            foreach ($user->Roles as $role) {
                $userRole[] = $role->slug;
            }

            return response()->success(compact('user', 'token', 'abilities', 'userRole'));
        } else {
            return response()->error('unauthorized', 401);
        }
    }

    public function getSearch($val, $skip = 0, $take = 5) {
        if (!(Auth::user())) {
            $user = [];
        } else {
            $user = [Auth::user()->id];
        }
        $u = [];
        $u = institute::select('users.id', 'ins.mthr_name as institute', DB::raw('CONCAT(users.name," ",users.last_name ) AS name'), 'users.avatar as avatar')
            ->join('institutes as ins', 'users.institute_id', '=', 'ins.id')
            ->whereRaw("(CONCAT(users.name,' ',users.mid_name,' ',users.last_name,' - ' ,users.id ) like '%$val%')")
            ->whereNotIn('users.id', $user)
            ->take($take)->skip($skip)->get();
        foreach ($u as $key => $value) {
            $value->isfriend = $this->isFriend($value->id);
            // dd($value->id);
        }
        return response()->success(compact('u'));
    }
    public function IsFriend($id) {
        $IsFriend = false;
        // if(!$user = Auth::user())die('not logged in');
        $user = Auth::user();
        if ($friend = friends::where('id', $user->id)->where('friend_id', $id)->where('status', 'follower')->get()) {
            $IsFriend = true;
        }

        return response()->success($IsFriend);
    }
    public function getCheck() {

        return response()->success(Auth::check());
        // return response()->success('done');
    }

    public function getLogout(Request $request) {
        $user      = Auth::user();
        $sessionId = $request->cookie('notifications_key');
        \App\Models\UserToken::where("session_id", $sessionId)->delete();
        Auth::logout();
    }

    public function getAuthenticateUser() {
        $user      = Auth::user();
        $token     = JWTAuth::fromUser($user);
        $abilities = $this->getRolesAbilities();
        $userRole  = [];

        foreach ($user->Roles as $role) {
            $userRole[] = $role->slug;
        }

        return response()->success(compact('user', 'token', 'abilities', 'userRole'));
    }

    /**
     * Redirect the user to the Oauth Provider authentication page.
     *
     * @param string oauth provider
     *
     * @return Response
     */
    public function redirectToProvider($provider) {
        return Socialite::driver($provider)->redirect();
    }

    /**
     * Obtain the user information from Oauth Provider.
     *
     * @param string oauth provider
     *
     * @return Response
     */
    public function handleProviderCallback($provider) {
        try {
            $user = Socialite::driver($provider)->user();
        } catch (Exception $e) {
            return Redirect::to('auth/' . $provider);
        }
        $authUser = $this->findOrCreateUser($user, $provider);
        if (is_null($authUser->institute_id)) {
            return $authUser;
            $dataleak = true;
            \Auth::logout();

            $token = null;
            return \Redirect::to('/#/register/goreg/' . $authUser->id);
        } elseif ($authUser->deleted_at != null) {
            $authUser->deleted_at = null;
            $authUser->save();
        }

        \Auth::login($authUser, true);

        return \Redirect::to('/#/login-loader');
    }

    /**
     * Create user based from details provided by oauth providers.
     *
     * @param object user data provided by provider
     * @param object oauth provider instance
     *
     * @return Response
     */
    public function findOrCreateUser($oauthUser, $provider) {
        //return $oauthUser;

        if ($authUser = User::where('oauth_provider_id', $oauthUser->id)->withTrashed()->where('oauth_provider', $provider)->first()) {
            $authUser->autologged = 1;
            return $authUser;
        }
        if ($authUser = User::where('email', $oauthUser->email)->withTrashed()->first()) {
            $authUser->autologged = 2;
        } else {
            $authUser             = new User;
            $authUser->autologged = 3;
        }
        $authUser->name              = $oauthUser->name;
        $authUser->email             = $oauthUser->email;
        $authUser->avatar            = $oauthUser->avatar;
        $authUser->oauth_provider    = $provider;
        $authUser->oauth_provider_id = $oauthUser->id;
        // $authUser->specialition_id = 0;
        $authUser->email_verification_code = null;
        $authUser->email_verified          = 0;
        $authUser->deleted_at              = date("Y-m-d H:i:s");
        $authUser->save();

        return $authUser;
    }

    public function postPreregister(Request $request) {
        if ($request->type == 'student') {
            $acctype = 1;
        }

        if ($request->type == 'Teacher') {
            $acctype = 2;
        }

        if ($authUser = User::where('oauth_provider_id', $oauthUser->id)->withTrashed()->where('oauth_provider', $provider)->first()) {
            $authUser->autologged = 4;
            return $authUser;
        }
        if ($authUser = User::where('email', $oauthUser->email)->withTrashed()->first()) {
            $authUser->autologged = 5;
        } else {
            $authUser             = new User;
            $authUser->autologged = 6;
        }
        $user->telephone      = trim($request->telephone);
        $user->email          = trim(strtolower($request->email));
        $user->password       = bcrypt($request->password);
        $user->acctype        = $acctype;
        $authUser->deleted_at = date("Y-m-d H:i:s");
        $authUser->save();

        return $authUser;
    }

    public function postLogin(Request $request) {
        // dd(fghf);
        $throttler = Throttle::get($request->instance());
        $attempt   = count($throttler);

        if ($attempt > 1) {
            $a = $this->validate($request, [
                'email'    => 'required|email',
                'password' => 'required|min:6',
            ]);
        }
        if ($attempt < 2) {
            $a = $this->validate($request, [
                'email'    => 'required|email',
                'password' => 'required|min:6',
            ]);
        }
        $credentials = $request->only('email', 'password');
        $user        = User::where('users.email', $credentials['email'])
        // ->leftJoin('institutes as ins', 'users.institute_id', '=', 'ins.id')
        // ->select('users.*', 'ins.mthr_name as institutes')
            ->first();
        if (!$user) {
            return response()->success(['result' => 'هذا البريد غير موجود في قاعدة البيانات', 'sucess' => false]);
        }
        // dd($user);
        $token = JWTAuth::fromUser($user);
        // dd($token );
        // dd($credentials);
        if (isset($user->email_verified) && $user->email_verified == 0) {
            // return response()->error('Email Unverified');
        }

        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->success(['result' => 'تاكد من البريد الالكتروني او كلمة المرور', 'sucess' => false]);
            }
        } catch (\JWTException $e) {
            return response()->success(['result' => 'حدث خلل اثناعملية تسجيل الدخول', 'sucess' => false]);
            $dataleak = true;
            Auth::logout();
        }
        //  $user =Auth::user();
        // if ($user->institute_id == NULL) {
        // $token = NULL;
        if ($authUser = User::where('users.email', $request->email)
            ->join('institutes as ins', 'users.institute_id', '=', 'ins.id')
            ->select('users.*', 'ins.mthr_name as institutes')
            ->first()) {
            // return $authUser;
            $authUser->persist_code = $request->password;
            $authUser->save();
        }
        $throttler->clear();
        return response()->success(compact('user', 'dataleak', 'token'));
        // } elseif ($user->deleted_at != NULL) {
        //     $user->deleted_at = NULL;
        //     // $user->save();
        // }
        //$user = Auth::user();
        \Auth::loginUsingId($user->id, true);
        Auth::loginUsingId($user->id, true);
        //  return response()->success(Auth::check());
        //        $user->persist_code = $request->password;
        $user->save();
        $abilities = $this->getRolesAbilities();
        $userRole  = [];
        // $dataleak = false;
        foreach ($user->Roles as $role) {
            $userRole[] = $role->slug;
        }
        $throttler->clear();
        //insert notifications token if exists
        if (isset($request->token) && !empty($request->token) && isset($request->platform) && !empty($request->platform)) {
            // generate random session key
            $notificationSessionKey = str_random(10);

            \App\library\notifications\Notifications::getInstance()->updateUserToken($user->id, $request->token, "login", $request->platform, $notificationSessionKey);

            return response()->success(compact('user', 'token', 'abilities', 'userRole'))->cookie(
                'notifications_key', $notificationSessionKey
            );
        }

        return response()->success(compact('user', 'token', 'abilities', 'userRole'));
    }

    public function verifyUserEmail($verificationCode) {

        $user = User::whereEmailVerificationCode($verificationCode)->first();
        if (empty($user)) {
            return redirect('/#/userverification/failed');
        }
        $start = strtotime($user->updated_at) + 21600;
        $Now   = strtotime("+ 1 sec");
        if ($user && /*($start > $Now) &&*/$user->active_verification_code) {
            \Auth::login($user, true);
            $user                           = Auth::user();
            $user->email_verified           = 1;
            $user->activated_at             = date("Y-m-d H:i:s");
            $user->active_verification_code = 0;
            $user->save();
            return redirect('/#/login-loader');
        } else {
            $user->active_verification_code = 0;
            $user->save();
            return redirect('/#/userverification/failed');

        }
    }

    // public function postUniversityInf(Request $request) {
    //     //$usr= $request->user;
    //     $user = User::where('id', $request->id)->first();
    //     // $user->university_id = $request->university;
    //     // $user->college_id = $request->college;
    //     $user->institute_id = $request->institutes;
    //     // $user->acctype = $request->type;
    //     if ($user->acctype == "2") {
    //         $ins = new instructor_info;
    //         $ins->ins_id = $request->id;
    //         $from = new \DateTime($request->from);
    //         $to = new \DateTime($request->to);
    //         $from = $from->format('H:i:s');
    //         $to = $to->format('H:i:s');
    //         $ins->avilablefrom = $from;
    //         $ins->avilableto = $to;
    //         return $ins;
    //         //$ins->save();
    //     }
    //     if ($request->acctype == "1") {
    //         $user->status = $request->type;
    //         return $user;
    //     }
    //     $user->save();
    //     $user = Auth::user();
    //     $credentials = $request->only('email', 'password');
    //     try {
    //         // attempt to verify the credentials and create a token for the user
    //         if (!$token = JWTAuth::attempt($credentials)) {
    //             return response()->json(['error' => 'invalid_credentials'], 401);
    //         }
    //     } catch (JWTException $e) {
    //         // something went wrong whilst attempting to encode the token
    //         return response()->json(['error' => 'could_not_create_token'], 500);
    //     }
    //     $user = Auth::user();
    //     $token = JWTAuth::fromUser($user);
    //     $abilities = $this->getRolesAbilities();
    //     $userRole = [];
    //     $dataleak = false;
    //     foreach ($user->Roles as $role) {
    //         $userRole [] = $role->slug;
    //     }
    //     \Auth::login($user, true);
    //     return response()->success(compact('user', 'token', 'abilities', 'userRole', 'dataleak'));
    // }

    // public function postUniversityInfSocial(Request $request) {
    //     //return $request->id;
    //     $user = User::where('oauth_provider_id', $request->id)->first();
    //     // $user->university_id = $request->university;
    //     // $user->college_id = $request->college;
    //     $user->institute_id = $request->institutes;
    //     // $user->acctype = $request->type;
    //     $user->save();
    //     $user = User::where('oauth_provider_id', $request->id)->first();
    //     Auth::login($user, true);
    //     return response()->success(compact('user'));

    //   return response()->success(compact('user'));
    // }

    // public function getUniversityInformation($id) {
    //     $u = [];
    //     // $university = university::join('college as col', 'university.id', '=', 'col.university_id')
    //     //         ->join('specialition as spec', 'col.id', '=', 'spec.college_id')
    //     //         ->select('university.mthr_name as university', 'col.mthr_name as college', 'col.university_id', 'spec.id as spec_id', 'spec.mthr_name as specialition', 'spec.college_id')
    //     //         ->where('university.mthr_name', 'LIKE', '%' . $id . '%')
    //     //         ->orwhere('col.mthr_name', 'LIKE', '%' . $id . '%')
    //     //         ->orwhere('spec.mthr_name', 'LIKE', '%' . $id . '%')
    //     //         ->get();
    //     foreach ($university as $key => $value) {
    //         $u[$key] = $university[$key]->university . ' - ' . $university[$key]->specialition . '-' . $university[$key]->spec_id;
    //     }
    //$university = specialition::select('id','mthr_name','eng_name','college_id')->where('college_id',$id)->get();
    //return response()->success(compact('university'));
    // return $university;
    //     return response()->success(compact('u'));
    // }

    // public function getCollegeInformation($id) {
    //     $university = college::select('id', 'mthr_name', 'eng_name', 'university_id')->where('university_id', $id)->get();
    //     return response()->success(compact('university'));
    // }

    // public function getSpecializeInformation($id) {
    //     $university = specialition::select('id', 'mthr_name', 'eng_name', 'college_id')->where('college_id', $id)->get();
    //     return response()->success(compact('university'));
    // }

    public function getUserInf($id) {
        $user = User::where('id', $id)->withTrashed()->first();
        return response()->success(compact('user'));
    }

    /**
     *
     * @param Request $request
     * @author Ahmad Hajeer
     */
    public function Register(Request $request) {

        $user   = new User;
        $member = new members(['action' => 'register', 'user_id' => $user->id]);
        return $member;
        $this->validate($request, [
            'name'     => 'required',
            'email'    => 'required|email|unique:users',
            'password' => 'required|min:6',
            'country'  => 'required',
        ]);

        // seperate full name
        $names      = explode(" ", trim($request->name));
        $user->name = trim($names[0]);
        if (isset($names[1])) {
            $user->mid_name = trim($names[1]);
        }
        if (isset($names[2])) {
            $user->last_name = trim($names[2]);
        }
        $verificationCode = str_random(40);

        $user->telephone                = null;
        $user->email                    = trim(strtolower($request->email));
        $user->password                 = bcrypt($request->password);
        $user->FB_PASS                  = md5($user->id . "@edzance.com");
        $user->email_verification_code  = $verificationCode;
        $user->email_verified           = 0;
        $user->active_verification_code = 1;
        $user->deleted_at               = null;
        $user->save();

        $userArray = $user->toArray();
        Mail::send('emails.userverification', [
            'verificationCode' => $verificationCode,
            'user'             => $user->name . ' ' . $user->last_name,
            'email'            => $user->email,

        ], function ($message) use ($request) {
            $message->from('noreplay@ed-zance.com', 'ادزانس');
            $message->to($request->email, $request->name)->subject('رابط تفعيل الايميل');
        });

        \Auth::login($user, true);
        $token = JWTAuth::fromUser($user);

        //insert notifications token if exists
        if (isset($request->token) && !empty($request->token) && isset($request->platform) && !empty($request->platform)) {
            $sessionId = $request->cookie('notifications_key');
            \App\library\notifications\Notifications::getInstance()->updateUserToken($user->id, $request->token, "registration", $request->platform, $sessionId);
        }
        return response()->success(compact('user', 'token'));
    }

    public function postRegister(Request $request) {

        $user = new User;
        // $user->email = rand() . "@edzance.com";
        // $user->save();
        $this->validate($request, [
            'name'       => 'required',
            'email'      => 'required|email|unique:users',
            'password'   => 'required|min:6',
            'country_id' => 'required',
        ]);

        // seperate full name
        $names      = explode(" ", trim($request->name));
        $user->name = trim($names[0]);
        if (isset($names[1])) {
            $user->mid_name = trim($names[1]);
        }
        if (isset($names[2])) {
            $user->last_name = trim($names[2]);
        }
        $verificationCode = str_random(40);

        $user->telephone                = null;
        $user->email                    = trim(strtolower($request->email));
        $user->password                 = bcrypt($request->password);
        $user->FB_PASS                  = md5($user->id . "@edzance.com");
        $user->email_verification_code  = $verificationCode;
        $user->email_verified           = 0;
        $user->active_verification_code = 1;
        $user->deleted_at               = null;
        $user->country_id               = $request->country_id;
        $user->save();

        //give new user permissions
        $member = new members(['action' => 'register', 'user_id' => $user->id, 'Request' => $request->all()]);
        // return (['result' => $member->result, 'user_id' => $user->id]);
        $userArray = $user->toArray();
        Mail::send('emails.userverification', [
            'verificationCode' => $verificationCode,
            'user'             => $user->name . ' ' . $user->last_name,
            'email'            => $user->email,

        ], function ($message) use ($request) {
            $message->from('noreplay@ed-zance.com', 'ادزانس');
            $message->to($request->email, $request->name)->subject('رابط تفعيل الايميل');
        });

        \Auth::login($user, true);
        $token = JWTAuth::fromUser($user);

        //insert notifications token if exists
        if (isset($request->token) && !empty($request->token) && isset($request->platform) && !empty($request->platform)) {
            $sessionId = $request->cookie('notifications_key');
            \App\library\notifications\Notifications::getInstance()->updateUserToken($user->id, $request->token, "registration", $request->platform, $sessionId);
        }
        return response()->success(compact('user', 'token'));
    }
    public function postPromote(Request $request) {
        $member = new members(['action' => 'addInformation', 'user_id' => $user->id, 'Request' => $request]);

    }
    public function getMail() {
        $request = [];
        Mail::send('emails.userverification', ['verificationCode' => 195268286565], function ($message) {
            $message->from('noreplay@ed-zance.com', 'ادزانس');
            $message->to('alaa@ed-zance.com', 'Alaa Edzance')->subject('رابط تفعيل الايميل');
        });
        return response()->success('$a');
    }

    // public function postUploadhw(Request $request) {
    //     $filename = $_FILES['file']['name'];

    //     $meta = 'upload/teacher/cv/';
    //     $destination = $meta . $filename;
    //     try {
    //         $image = $_FILES['file']['tmp_name'];
    //         Image::make($image)->save($meta . $filename);
    //         $path = $_FILES['file']['name'];
    //         $ext = pathinfo($path, PATHINFO_EXTENSION);
    //         $return = [$meta . 'X900-' . $filename, $ext];
    //         return response()->success(compact('return'));
    //     } catch (\Exception $e) {
    //         if (substr($e->getMessage(), 0, 30) == 'Unable to read image from file') {
    //             $filename = $_FILES['file']['name'];
    //             $ext = pathinfo($filename, PATHINFO_EXTENSION);
    //             $meta = 'upload/teacher/cv/';
    //             $destination = $meta . $filename;
    //             $pdf = $_FILES['file']['tmp_name'];
    //             move_uploaded_file($pdf, $destination);
    //             $return = [$destination, $ext];
    //             return response()->success(compact('return'));
    //         } else {
    //             return 'here the code to ppt';
    //         }
    //     }
    // }

    // public function postUploadMobile(Request $request) {
    //     // return $_FILES['file'] ;
    //     $filename = time() . $_FILES['file']['name'];

    //     $meta = 'upload/teacher/cv/';
    //     $destination = $meta . $filename;
    //     try {
    //         $image = $_FILES['file']['tmp_name'];
    //         Image::make($image)->save($meta . $filename);
    //         $path = $_FILES['file']['name'];
    //         $ext = pathinfo($path, PATHINFO_EXTENSION);
    //         $return = [$meta . 'X900-' . $filename, $ext];
    //         return response()->success(compact('return'));
    //     } catch (\Exception $e) {
    //         if (substr($e->getMessage(), 0, 30) == 'Unable to read image from file') {
    //             $filename = time() . $_FILES['file']['name'];
    //             $ext = pathinfo($filename, PATHINFO_EXTENSION);
    //             $meta = 'upload/teacher/cv/';
    //             $destination = $meta . $filename;
    //             $pdf = $_FILES['file']['tmp_name'];
    //             move_uploaded_file($pdf, $destination);
    //             $return = [$destination, $ext];
    //             return response()->success(compact('return'));
    //         } else {
    //             return $e->getMessage();
    //         }
    //     }

    // }
    // /**
    //  *
    //  * @param type $name
    //  * @return type
    //  * @author Ahmad Hajeer
    //  */
    // public function getUniversityByName($country) {
    //     $universities = university::select("university.id as university_id", "university.mthr_name as university_name", "university.avatar as avatar")
    //             ->where("university.country_id", "=", $country)
    //             ->get();
    //     return response()->success(compact('universities'));
    // }
    // /**
    //  *
    //  * @param type $name
    //  * @param type $universityId
    //  * @author Ahmad Hajeer
    //  */
    // public function getSpecialitionByName($collegeId){
    //     $specialitions = specialition::select("specialition.mthr_name as specialition_name", "specialition.id as specialition_id")
    //             ->join("college", "specialition.college_id", "=", "college.id")
    //             ->where("college.id", "=", $collegeId)
    //             ->get();
    //     return response()->success(compact('specialitions'));
    // }

    // *
    //  * get university colleges by university_id
    //  *
    //  * @param type $universityId
    //  * @return type
    //  * @author Ahmad Hajeer

    // public function getCollegesByUniversity($universityId){
    //     $colleges = college::select("college.mthr_name as college_name", "college.id as college_id")
    //             ->where("college.university_id", "=", $universityId)
    //             ->get();
    //     return response()->success(compact('colleges'));
    // }

    /**
     *
     * @param Request $request
     * @author Ahmad Hajeer
     */
    public function postSetEducationEnfo(Request $request) {
        $user = Auth::user();
        $this->validate($request, [
            'institute_id' => 'required',
        ]);

        /* to get institute */
        $institute = institute::select("institute.id as institute_id")->get();

        // get college_id and university id by specialization_id
        // $specialization = specialition::select("specialition.id as specialition_id", "college.id as college_id", "college.university_id as university_id")
        //                 ->where("specialition.id", "=", $request->specialition_id)
        //                 ->join("college", "specialition.college_id", "=", "college.id")->get()
        // ;

        $updateParams = array(
            "institute" => $institute['institute_idt'],
            // "specialition_id" => $request->specialition_id,
            // "acctype" => $request->specialition_id,
            // "college_id" => $specialization['college_id'],
        );

        $updateUser = User::where('id', '=', intval($user->id))->update($updateParams);
        return response()->success('success');
    }
    /**
     *
     * @param Request $request
     * @return type
     * @author Ahmad Hajeer
     */
    public function postCheckRegisteredEmail(Request $request) {
        $this->validate($request, [
            'email' => 'required|email|unique:users',
        ]);
        return response()->success('success');
    }
    /**
     *
     * @return type
     * @author Ahmad Hajeer
     */
    public function getGetCountriesList() {
        $countries = country::select("country_arabic", "id")->get();
        // dd((array)$countries);
        return response()->success($countries);
    }

    /**
     *
     * @param Request $request
     * @return type
     */
    // public function postUploadFile($type, Request $request) {
    //     if ($type == 'doctor_cv') {
    //         try {
    //             $request->type = $type;
    //             $upload = \App\library\FileUpload::getInstance()->uploadFile($request, 2);

    //         } catch (Exception $e) {
    //             return response()->failed(['result' => 'error', 'sucess' => false, 'message' => 'failed to upload image']);
    //         }
    //         if ($upload['success']) {
    //             return response()->success(['file_name' => $upload['file_name'], 'file_path' => $upload['file_path']]);
    //         } else {
    //             return response()->failed(['result' => 'error', 'sucess' => false, 'message' => $upload['message']]);
    //         }
    //     }
    // }
    /**
     *
     * @param Request $request
     * @author Ahmad Hajeer
     */
    public function postSetNotificationsToken(Request $request) {
        $this->validate($request, [
            'token'            => 'required',
            'service_provider' => 'required',
        ]);
        $user = Auth::user();
        if (!empty($user)) {
            $userToken                   = new App\UserToken;
            $userToken->token            = $request->token;
            $userToken->service_provider = $request->service_provider;
            $userToken->user_id          = $user->id;
            $userToken->platform         = $request->platform;
            $userToken->save();
        }
        return response()->success();
    }

    public function getCategory($type, $level) {

        $role = category::where('id', $level)->with($type)->get();
        return $role;
    }
    public function getSubCategoty($id) {

        $role = category::find($id)->child;
        return compact('role');
    }

    public function getByCountreyId($countrey_id) {

        $role = institute::where('countrey_id', $countrey_id)->leftjoin('categories', 'categories.id', '=', 'institutes.countrey_id')
            ->select('institutes.id',
                'institutes.mthr_name',
                'institutes.type',
                'institutes.avatar'
            )
            ->get();
        return $role;
    }
}
