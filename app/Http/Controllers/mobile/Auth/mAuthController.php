<?php

namespace App\Http\Controllers\mobile\Auth;

use App\Http\Controllers\Controller;
use App\User;
use App\university;
use App\specialition;
use App\college;
use Auth;
use App\instructor_info;
use Bican\Roles\Models\Role;
use Illuminate\Http\Request;
use JWTAuth;
use Mail;
use Socialite;
use Intervention\Image\ImageManagerStatic as Image;
class mAuthController extends Controller
{
    /**
     * Get all roles and their corresponding permissions.
     *
     * @return array
     */

    
   public function getMe()
    {
 
     $validator = Validator::make($request->all(), [
            'title' => 'required|unique:posts|max:255',
            'body' => 'required',
        ]);

        if ($validator->fails()) {
            return redirect('post/create')
                        ->withErrors($validator)
                        ->withInput();
        }
      return response()->success($users);
    }
   private function getRolesAbilities()
    {
        $abilities = [];
        $roles = Role::all();

        foreach ($roles as $role) {
            if (!empty($role->slug)) {
                $abilities[$role->slug] = [];
                $rolePermission = $role->permissions()->get();

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
    public function getAuthenticatedUser()
    {
        if (Auth::check()) {
            $user = Auth::user();
            $token = JWTAuth::fromUser($user);
            $abilities = $this->getRolesAbilities();
            $userRole = [];

            foreach ($user->Roles as $role) {
                $userRole [] = $role->slug;
            }
         
            return response()->success(compact('user', 'token', 'abilities', 'userRole'));
        } else {
            return response()->error('unauthorized', 401);
        }
    }
    public function getCheck()
    {

        return response()->success( Auth::check());
           // return response()->success('done');
    }
    public function getLogout()
    {
        Auth::logout();
         return \Redirect::to('/#/login');
    }
    public function getAuthenticateUser()
    {
            $user = Auth::user();
            $token = JWTAuth::fromUser($user);
            $abilities = $this->getRolesAbilities();
            $userRole = [];

            foreach ($user->Roles as $role) {
                $userRole [] = $role->slug;
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
    public function redirectToProvider($provider)
    {
        return Socialite::driver($provider)->redirect();
    }
    /**
     * Obtain the user information from Oauth Provider.
     *
     * @param string oauth provider
     *
     * @return Response
     */
    public function handleProviderCallback($provider)
    {
        try {
            $user = Socialite::driver($provider)->user();
         } catch (Exception $e) {
            return Redirect::to('auth/'.$provider);
        }
       $authUser = $this->findOrCreateUser($user, $provider);
        if ($authUser->university_id == NULL||$authUser->college_id == NULL ||$authUser->specialition_id == NULL ||$authUser->acctype == NULL) {
        $dataleak = true;
        $authUser =\Auth::logout();
        $token =NULL;
        return \Redirect::to('/#/register/goreg/'.$authUser->id);
        }elseif ($authUser->deleted_at != NULL) {
          $authUser->deleted_at = NULL;
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
 private function findOrCreateUser($oauthUser, $provider)
     {
         //return $oauthUser;
       
        if ($authUser = User::where('oauth_provider_id', $oauthUser->id)->withTrashed()->where('oauth_provider', $provider)->first()) {
            $authUser->autologged = 1;
            return $authUser;
        }
          if ($authUser = User::where('email', $oauthUser->email)->withTrashed()->first()) {
            $authUser->autologged = 2;
        }else{
        $authUser = new User;
        $authUser->autologged = 3;}
        $authUser->name=$oauthUser->name;
        $authUser->email=$oauthUser->email;
        $authUser->avatar=$oauthUser->avatar;
        $authUser->oauth_provider=$provider;
        $authUser->oauth_provider_id=$oauthUser->id;
        $authUser->specialition_id=1;
        $authUser->email_verification_code = NULL;
        $authUser->email_verified = 1;
        $authUser->deleted_at = date("Y-m-d H:i:s");
        $authUser->save();

        return $authUser;
      
     }
// public function postSetpass(Request $request)
//      {
//           if ($authUser = User::where('email', $request->email)->first()) {
            
//         //$authUser->persist_code=$request->password;
//        // $authUser->save();

//        // return $authUser;

//         return response()->success($authUser);
//       }
//         return response()->success('failed');
//      }
    /**
     * Authenticate user.
     *
     * @param Instance Request instance
     *
     * @return JSON user details and auth credentials
     */
    public function postLogin(Request $request)
    {
      //print_r($_POST);
    // die();
 // The ID of the request

      // return $request->password;
        $this->validate($request, [
            'email'    => 'required|email',
            'password' => 'required|min:6',
        ]);

        $credentials = $request->only('email', 'password');

        $user = User::where('users.email',$credentials['email'])
                    ->join('university as univ',  'users.university_id', '=','univ.id')
                    ->select('users.*','univ.mthr_name as university')
                    ->first();
        //Auth::login($user, true);
      // \Auth::login($user, true);
       if (isset($user->email_verified) && $user->email_verified == 0) {
            return response()->error('Email Unverified');
        }

        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->error('Invalid credentials', 401);
            }
        } catch (\JWTException $e) {
            return response()->error('Could not create token', 500);
        }
      //  $user =Auth::user();
      if ($user->university_id == NULL||$user->college_id == NULL ||$user->specialition_id == NULL ||$user->acctype == NULL) {
            $dataleak = true;
            Auth::logout();
            $token =NULL;
              if ($authUser = User::where('users.email', $request->email)
                                  ->join('university as univ',  'users.university_id', '=','univ.id')
                                  ->select('users.*','univ.mthr_name as university')
                                  ->first()) {
                 // return $authUser;
                 $authUser->persist_code=$request->password;
                 $authUser->save();
                }
            return response()->success(compact('user','dataleak'));
          }elseif ($user->deleted_at != NULL) {
          $user->deleted_at = NULL;
         // $user->save();
          }
         //$user = Auth::user();
         \Auth::loginUsingId($user->id, true);
         Auth::loginUsingId($user->id, true);
      //  return response()->success(Auth::check());
       $user->persist_code=$request->password;
        $user->save();
        $token = JWTAuth::fromUser($user);
        $abilities = $this->getRolesAbilities();
        $userRole = [];
        $dataleak = false;
        foreach ($user->Roles as $role) {
            $userRole [] = $role->slug;
        }
        return response()->success(compact('user', 'token', 'abilities', 'userRole','dataleak'));
    }



    public function verifyUserEmail($verificationCode)
    {
        $user = User::whereEmailVerificationCode($verificationCode)->first();

        if (!$user) {
            return redirect('/#/userverification/failed');
        }

        \Auth::login($user, true);
        $user =Auth::user();
        $user->email_verified = 1;
        $user->save();

        return redirect('/#/login-loader');
    }

    /**
     * Create new user.
     *
     * @param Instance Request instance
     *
     * @return JSON user details and auth credentials
     */


    public function postUniversityInf(Request $request)
    {
      //$usr= $request->user;
      $user = User::where('id', $request->id)->first();
        $user->university_id =   $request->university;
        $user->college_id =   $request->college;
        $user->specialition_id =   $request->specialize;
       $user->acctype = $request->type;
        if($user->acctype=="2"){
              $ins = new instructor_info;
              $ins->ins_id=$request->id;
              $from = new \DateTime($request->from);
              $to = new \DateTime($request->to);
              $from = $from->format('H:i:s');
              $to = $to->format('H:i:s');
              $ins->avilablefrom=$from;
              $ins->avilableto=$to;
              return $ins;
              //$ins->save();  
        }
        if($request->acctype=="1"){
              $user->status = $request->type;
              return $user;
       }
        $user->save();
        $user = Auth::user();
        $credentials = $request->only('email', 'password');
        try {
            // attempt to verify the credentials and create a token for the user
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 401);
            }
        } catch (JWTException $e) {
            // something went wrong whilst attempting to encode the token
            return response()->json(['error' => 'could_not_create_token'], 500);
        }
        $user = Auth::user();
        $token = JWTAuth::fromUser($user);
        $abilities = $this->getRolesAbilities();
        $userRole = [];
        $dataleak = false;
        foreach ($user->Roles as $role) {
            $userRole [] = $role->slug;
        }
          \Auth::login($user, true);
        return response()->success(compact('user', 'token', 'abilities', 'userRole','dataleak'));
    }
    public function postUniversityInfSocial(Request $request)
    {
      //return $request->id;
      $user = User::where('oauth_provider_id', $request->id)->first();
        $user->university_id =   $request->university;
        $user->college_id =   $request->college;
        $user->specialition_id =   $request->specialize;
        $user->acctype = $request->type;
        $user->save();
        $user = User::where('oauth_provider_id', $request->id)->first();
        Auth::login($user, true);
           return response()->success(compact('user'));
      
            //   return response()->success(compact('user'));
    }


    public function getUniversityInformation($id)
    {
      $u=[];
        $university = university::join('college as col',  'university.id', '=','col.university_id')
                    ->join('specialition as spec',  'col.id', '=','spec.college_id')
                    ->select('university.mthr_name as university','col.mthr_name as college','col.university_id','spec.id as spec_id','spec.mthr_name as specialition','spec.college_id')
                    ->where('university.mthr_name','LIKE','%'.$id.'%')
                    ->orwhere('col.mthr_name','LIKE','%'.$id.'%')
                    ->orwhere('spec.mthr_name','LIKE','%'.$id.'%')
                    ->get();
                    foreach ($university as $key => $value) {
                      $u[$key] =  $university[$key]->university . ' - '.   $university[$key]->specialition .'-'.$university[$key]->spec_id;
                    }
        //$university = specialition::select('id','mthr_name','eng_name','college_id')->where('college_id',$id)->get();
        //return response()->success(compact('university'));
        // return $university;
       return response()->success(compact('u'));
    }
    public function getCollegeInformation($id)
    {
        $university = college::select('id','mthr_name','eng_name','university_id')->where('university_id',$id)->get();
        return response()->success(compact('university'));
    }
    public function getSpecializeInformation($id)
    {
        $university = specialition::select('id','mthr_name','eng_name','college_id')->where('college_id',$id)->get();
        return response()->success(compact('university'));
    }
    public function getUserInf($id)
    {
        $user = User::where('id',$id)->withTrashed()->first();
        return response()->success(compact('user'));
    }
       public function postRegister(Request $request)
    {
        if($request->type == 'student') $acctype =1;
        if($request->type == 'Teacher') $acctype =2;
        $names = explode(" ",trim($request->name));
        $uni = explode("-",trim($request->university));
        $specialition = specialition::select('id','college_id')->where('id',$uni[2])->first();
        $college = college::select('id','university_id')->where('id',$specialition->college_id)->first();
        $university = university::select('id')->where('id',$college->university_id)->first();

        try {

        if ($authUser = User::where('email', $request->email)->withTrashed()->first()) {

          $user = $authUser;
          $verificationCode = str_random(40);
          $user->name = trim($names[0]);
          if (isset($names[1])) {       $user->mid_name = trim($names[1]); }
          if (isset($names[2])) {       $user->last_name = trim($names[2]); }
          $user->telephone = trim($request->telephone);
          $user->email = trim(strtolower($request->email));
          $user->password = bcrypt($request->password);
          $user->email_verified = 1;
          $user->email_verification_code = $verificationCode;
           $user->email_verified = 1;
          $user->acctype =$acctype;
          $user->university_id = $university->id;
          $user->college_id = $college->id;
          $user->specialition_id = $specialition->id;
          $user->deleted_at = NULL;
          $user->save();
        \Auth::login($user, true);
       // return redirect('/#/login-loader');
         }else{
           $this->validate($request, [
                'telephone'       => 'required|unique:users',
                'university'       => 'required',
                'type'       => 'required',
                'name'       => 'required',
                'email'      => 'required|email|unique:users',
                'password'   => 'required|min:6',
            ]);
          $user = new User;
          $verificationCode = str_random(40);
          $user->name = trim($names[0]);
          if (isset($names[1])) {       $user->mid_name = trim($names[1]); }
          if (isset($names[2])) {       $user->last_name = trim($names[2]); }
          $user->telephone = trim($request->telephone);
          $user->email = trim(strtolower($request->email));
          $user->password = bcrypt($request->password);
          $user->email_verification_code = $verificationCode;
          $user->acctype =$acctype;
          $user->university_id = $university->id;
          $user->college_id = $college->id;
          $user->specialition_id = $specialition->id;
          $user->save();
          $user->email_verification_code ='';
         $token = JWTAuth::fromUser($user);
          Mail::send('emails.userverification', ['verificationCode' => $verificationCode], function ($message) use ($request) {
                $message->from('noreplay@ed-zance.com', 'ادزانس');
                $message->to($request->email, $request->name)->subject('رابط تفعيل الايميل');
              });
        } 



        //mail($request->email, 'Email Confirmation', view('emails.userverification', ['verificationCode' => $verificationCode]));

        //return view('emails.userverification');
        } catch (Exception $e) {
            return redirect(response()->json(compact($e->message)));
        }
        return response()->success(compact('user', 'token'));
    }
           public function getMail()
    {
      $request=[];
        Mail::send('ahmad', $request, function ($message) use ($request) {
              $message->from('saleem@ed-zance.com', 'Your Registeration');
              $message->to('zaxx44a@gmail.com', 'Email Confirmation')->subject('Email Confirmation');
            });
       // $a=mail('zaxx44a@gmail.com', 'Email Confirmation', 'view');
        return response()->success('$a');
    }
          public function postUploadhw(Request $request)
    {
      $filename = $_FILES['file']['name'];

      $meta ='upload/teacher/cv/';
      $destination =  $meta .$filename ;
      try {
            $image = $_FILES['file']['tmp_name'];
            Image::make($image)->save($meta .$filename);
            $path = $_FILES['file']['name'];
            $ext = pathinfo($path, PATHINFO_EXTENSION);
            $return = [$meta .'X900-'.$filename , $ext];
            return response()->success(compact('return'));
          } 
          catch (\Exception $e) 
          {
              if(substr($e->getMessage(), 0,30) == 'Unable to read image from file')
              {
                  $filename = $_FILES['file']['name'];
                  $ext = pathinfo($filename, PATHINFO_EXTENSION);
                  $meta ='upload/teacher/cv/';
                  $destination =  $meta .$filename ;
                  $pdf = $_FILES['file']['tmp_name'];
                  move_uploaded_file( $pdf, $destination );
                  $return = [$destination ,$ext];
            return response()->success(compact('return'));
              }else { return 'here the code to ppt';}
          }

  }

            public function postUploadMobile(Request $request)
    {
     // return $_FILES['file'] ;
      $filename = time().$_FILES['file']['name'];

      $meta ='upload/teacher/cv/';
      $destination =  $meta .$filename ;
      try {
            $image = $_FILES['file']['tmp_name'];
            Image::make($image)->save($meta .$filename);
            $path = $_FILES['file']['name'];
            $ext = pathinfo($path, PATHINFO_EXTENSION);
            $return = [$meta .'X900-'.$filename , $ext];
            return response()->success(compact('return'));
          } 
          catch (\Exception $e) 
          {
              if(substr($e->getMessage(), 0,30) == 'Unable to read image from file')
              {
                  $filename = time().$_FILES['file']['name'];
                  $ext = pathinfo($filename, PATHINFO_EXTENSION);
                  $meta ='upload/teacher/cv/';
                  $destination =  $meta .$filename ;
                  $pdf = $_FILES['file']['tmp_name'];
                  move_uploaded_file( $pdf, $destination );
                  $return = [$destination ,$ext];
            return response()->success(compact('return'));
              }else { return 'error in uploading';}
          }

  }
}
