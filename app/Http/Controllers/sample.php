<?php



namespace App\Http\Controllers\Auth;
namespace App\Http\Controllers;
use Laravel\Socialite\Facades\Socialite;



use DB;
use App\Http\Controllers\Controller;

class sample extends Controller
{

    public function ahmad($id)
    {
        if ($id == 3) {
          DB::table('language')->insert([
            'name' => 'farsi',
            'shortname' => 'fr'

            ]);
        }

        $lang = DB::table('language')->where('id','=',$id)->get();
        return $lang;
    }
      public function footer()
    
    {
    
            return view('homeAng.footer');
    }
        public function header()
    {
    
            return view('homeAng.header');
    }
        public function home()
    {
    
            return view('homeAng.index');
    }
      public function hopemage()
    {
               return view('homeAng.home');
    
    }
      public function profile()
    {
               return view('homeAng.profile');
    
    }
     public function profile2()
    {
               return view('homeAng.profile2');
    
    }
     public function boo()
    {
        try {
    $user = Socialite::driver('facebook')->user();
            }
            catch (GuzzleHttp\Exception\ClientException $e) {
                 dd($e->response);
            }
     echo '<br>'.     $user->getId();
   echo '<br>'.     $user->getNickname();
    echo '<br>'.    $user->getName();
    echo '<br>'.    $user->getEmail();
    echo '<br>'.    $user->getAvatar();
    }
	public function  login()
	{
			return view('login.index1');
	}
public function  recovery()
	{
			return view('login.recovery');
	}
public function  privacy()
	{
			return view('login.privacy');
	}
public function  search()
	{
			return view('login.search');
	}
public function  signup()
	{
			return view('login.signup');
	}
public function  recover()
	{
			return view('login.recover');
	}
    public function redirectTogoogle()
    {
        return  Socialite::driver('google')->redirect();
    }
    public function redirectTofacebook()
    {
        return  Socialite::driver('facebook')->redirect();
    }
public function  handlegoogleCallback()
    {
      try {
    $user = Socialite::driver('google')->user();
            }
            catch (GuzzleHttp\Exception\ClientException $e) {
                 dd($e->response);
            }
         
        // OAuth Two Providers
        $token = $user->token;

        // All Providers
        echo $user->getId()."<br>";
        echo $user->getNickname()."<br>";
        echo $user->getName()."<br>";
        echo $user->getEmail()."<br>";
        echo $user->getAvatar()."<br>";
    }
public function  handlefacebookCallback()
    {
      try {
    $user = Socialite::driver('facebook')->user();
            }
            catch (GuzzleHttp\Exception\ClientException $e) {
                 dd($e->response);
            }
         
        // OAuth Two Providers
        $token = $user->token;
        $refreshToken = $user->refreshToken; // not always provided
        $expiresIn = $user->expiresIn;

        // All Providers
        echo $user->getId();
        echo $user->getNickname();
        echo $user->getName();
        echo $user->getEmail();
        echo $user->getAvatar();
    }
public function  index()
	{

			return view('login.index');
	}
}
