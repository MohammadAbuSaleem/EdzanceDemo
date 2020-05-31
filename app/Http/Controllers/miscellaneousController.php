<?php

namespace App\Http\Controllers;

use App\Models\ContactUs;
use App\Models\friends;
use App\Models\post;
use App\Models\university;
use App\Models\User;
use Auth;
use DB;
use Illuminate\Http\Request;
use Mail;
use \App\library\FileUpload as FileUpload;

class miscellaneousController extends Controller
{
    public function Search($val, $skip = 0, $take = 5)
    {
        if (!(Auth::user())) {
            $user = [];
        } else {
            $user = [Auth::user()->id];
        }
        $u = [];
        $u = User::select('users.id', 'univ.mthr_name as university', DB::raw('CONCAT(users.name," ",users.last_name ) AS name', 'users.acctype'), 'users.avatar as avatar')

            ->where('users.acctype', '=', 1)
            ->join('university as univ', 'users.university_id', '=', 'univ.id')
            ->whereRaw("(CONCAT(users.name,' ',users.mid_name,' ',users.last_name ) like '$val%')")
            ->whereNotIn('users.id', $user)
            ->take($take)->skip($skip)->get();
        foreach ($u as $key => $value) {
            $value->isfriend = $this->isFriend($value->id);
        }
        if (count($u) == 0) {
            return response()->success('no post');
        }
        return response()->success($u);
    }

    public function allSuggested($skip = 0, $take = 10)
    {
        $friends = [];
        $user    = Auth::user();
        if ($user->acctype == 1) {
            $acctype = [1];
        } else {
            $acctype = [1, 2];
        }
        array_push($friends, $user->id);
        $university = university::where('id', '=', $user->university_id)->first();
        $mypost     = User::find($user->id)->friends()->select('friend_id')->get();
        foreach ($mypost as $key => $value) {
            array_push($friends, $value->friend_id);
        }
        $suggested = User::where('users.university_id', '=', $university->id)
            ->whereIn('users.acctype', $acctype)
            ->whereNotIn('users.id', $friends)
            ->join('university as univ', 'users.university_id', '=', 'univ.id')
            ->join('specialition as spec', 'users.specialition_id', '=', 'spec.id')
            ->select('users.id', 'univ.mthr_name as university', DB::raw('CONCAT(users.name," ",users.last_name ) AS name', 'users.acctype'), 'users.avatar as avatar', 'spec.mthr_name as specialition')
            ->take($take)->skip($skip)->get();
        foreach ($suggested as $key => $value) {
            $value->isfriend = $this->isFriend($value->id);

        }
        if (count($suggested) == 0) {
            return response()->success('no post');
        }
        return response()->success($suggested);
    }

    public function isFriend($id)
    {
        $IsFriend = false;
        if (!$user = Auth::user()) {
            die('not logged in');
        }
        if ($friend = friends::where('id', $user->id)->where('friend_id', $id)->where('status', 'follower')->first()) {
            $IsFriend = true;
        }
        return $IsFriend;
    }

    public function Remail()
    {
        try {
            if (!$user = Auth::user()) {
                die('not logged in');
            }
            $verificationCode               = str_random(40);
            $user->email_verification_code  = $verificationCode;
            $user->active_verification_code = 1;

            $user->save();
            Mail::send('emails.userverification', [
                'verificationCode' => $user->email_verification_code,
                'user'             => $user->name . ' ' . $user->last_name,
                'email'            => $user->email,
            ], function ($message) use ($user) {
                $message->from('noreplay@ed-zance.com', 'ادزانس');
                $message->to($user->email, 'القادم الجديد')->subject('تفعيل حسابك في ادزانس');
            });
            return response()->success(['result' => 'تم ارسال الايميل بنجاح', 'sucess' => true]);
        } catch (Exception $e) {
            return response()->success(['result' => 'حدث خطأ الرجاء اعادة المحاولة', 'sucess' => false]);
        }
    }

    public function CheckMail(Request $request)
    {
        if (!$user = Auth::user()) {
            die('not logged in');
        }
        $this->validate($request, [
            'email' => 'required|email|unique:users',
        ]);
        return response()->success(['result' => 'هذا الايميل متوفر', 'sucess' => true]);
    }

    public function ChangeMail(Request $request)
    {
        try {
            if (!$user = Auth::user()) {
                die('not logged in');
            }
            $this->validate($request, [
                'email' => 'required|email|unique:users',
            ]);
            $user->email      = $request->email;
            $user->updated_at = date('Y-m-d H:i:s');
            $user->save();
            Mail::send('emails.userverification', [
                'verificationCode' => $user->email_verification_code,
                'user'             => $user->name . ' ' . $user->last_name,
                'email'            => $user->email,
            ], function ($message) use ($user) {
                $message->from('noreplay@ed-zance.com', 'ادزانس');
                $message->to($user->email, 'القادم الجديد')->subject('تفعيل حسابك في ادزانس');
            });
            return response()->success([
                'result' => 'تم تغيير البريد الالكتروني بنجاح   قم بفحص بريدك الالكتروني لاتمام عملية تفعيل حسابك',
                'sucess' => true]);
        } catch (Exception $e) {
            return response()->success([
                'result' => 'حدث خطأ الرجاء اعادة المحاولة',
                'sucess' => false]);
        }
    }

    public function ReportFile(Request $request)
    {
        $filename    = $_FILES['file']['name'];
        $meta        = 'upload/contact_us/';
        $destination = $meta . $filename;
        $filename    = $_FILES['file']['name'];
        $ext         = pathinfo($filename, PATHINFO_EXTENSION);
        $pdf         = $_FILES['file']['tmp_name'];
        move_uploaded_file($pdf, $destination);
        $return = [$destination, $ext];
        return response()->success($return);
    }

    public function ContactUsMessages($skip, $take)
    {
        $user            = Auth::user();
        $contactMessages = ContactUs::select("title", "description", "comment", "created_at", "file", "comment_date")->where('user_id', $user->id)->take($take)->skip($skip)->get();
        if (count($contactMessages) == 0) {
            return response()->success('no post');
        }
        return response()->success($contactMessages);
    }

    public function UserNotifications($skip, $take)
    {
        $user = Auth::user();
        if (!empty($user)) {
            $notifications = \App\Models\notification::select("seen", "body", "title", "type_id", "redirect_type", "redirect_id", "created_at", "link", "icon")->where('receiver_id', "=", $user->id)->orderBy("id", "desc")->take($take)->skip($skip)->get();
            $notifications = $notifications->toArray();
            if (!empty($notifications)) {
                return response()->success($notifications);
            } else {
                return response()->success('no post');
            }
        }
    }

    public function SeenNotifications(Request $request)
    {
        $user       = Auth::user();
        $updateSeen = \App\Models\notification::where("receiver_id", "=", $user->id)->where('seen', "=", 0)->update(['seen' => 1]);
        return response()->success([]);
    }

    public function ResetNotificationsToken(Request $request)
    {
        $user = Auth::user();
        if (!empty($user)) {
            $sessionId = $request->cookie('notifications_key');
            $token     = \App\library\notifications\Notifications::getInstance()->updateUserToken($user->id, $request->token, "update", $request->platform, $sessionId);
            return response()->success([$token]);
        }
        return response()->failed($token);
    }

    public function Post($skip = 0, $take = 5)
    {
        if (!$user = Auth::user()) {
            die('not logged in');
        }

        $friend = [];
        $post   = [];
        $last   = [];
        $liker  = [];
        $user   = Auth::user();
        $mypost = User::find($user->id)->post()->get();
        try {
            $followpost = User::find($user->id)->friends()->get();
            foreach ($followpost as $key => $value) {
                $friend = User::find($value->friend_id)->post()->get();
                array_push($post, $friend);
                foreach ($friend as $k => $v) {
                    $present = "no exp";
                    if (strpos($v['happy'], (string) $user->id) !== false) {
                        $present = 'happy';
                    }
                    if (strpos($v['normal'], (string) $user->id) !== false) {
                        $present = 'normal';
                    }
                    if (strpos($v['sad'], (string) $user->id) !== false) {
                        $present = 'sad';
                    }
                    $v['present'] = $present;
                    $v['all']     = $v["happyCount"] + $v["normalCount"] + $v["sadCount"];
                    if ($v['type'] == 'image') {
                        $v['media'] = \App\library\FileUpload::getInstance()->getImageFullPath($v['media'], 'wall_post_image');
                    } elseif ($v['type'] == 'avatar_image') {
                        $v['media'] = \App\library\FileUpload::getInstance()->getImageFullPath($v['media'], 'profile_avatar_file');
                    } elseif ($v['type'] == 'cover_image') {
                        $v['media'] = \App\library\FileUpload::getInstance()->getImageFullPath($v['media'], 'profile_cover_file');
                    }
                    unset($v['happy'], $v['happyCount'], $v['normal'], $v['normalCount'], $v['sad'], $v['sadCount']);
                    array_push($last, $v);
                }

            }
            if (!count($followpost) == 0) {
                foreach ($mypost as $k => $v) {
                    $present = "no exp";
                    if (strpos($v['happy'], (string) $user->id) !== false) {
                        $present = 'happy';
                    }
                    if (strpos($v['normal'], (string) $user->id) !== false) {
                        $present = 'normal';
                    }
                    if (strpos($v['sad'], (string) $user->id) !== false) {
                        $present = 'sad';
                    }
                    $v['present'] = $present;
                    $v['all']     = $v["happyCount"] + $v["normalCount"] + $v["sadCount"];
                    if ($v['type'] == 'image') {
                        $v['media'] = \App\library\FileUpload::getInstance()->getImageFullPath($v['media'], 'wall_post_image');
                    } elseif ($v['type'] == 'avatar_image') {
                        $v['media'] = \App\library\FileUpload::getInstance()->getImageFullPath($v['media'], 'profile_avatar_file');
                    } elseif ($v['type'] == 'cover_image') {
                        $v['media'] = \App\library\FileUpload::getInstance()->getImageFullPath($v['media'], 'profile_cover_file');
                    }
                    unset($v['happy'], $v['happyCount'], $v['normal'], $v['normalCount'], $v['sad'], $v['sadCount']);
                    array_push($last, $v);
                }

            }
        } catch (Exception $e) {

        }

        $last = $this->arrayOrderby($last, 'created_at', SORT_DESC);
        $last = array_slice($last, $skip, $take);
        $last = $this->arrayOrderby($last, 'created_at', SORT_ASC);
        if (count($last) == 0) {
            return response()->success('no post');
        }
        return response()->success($last);
    }
    public function postPost(Request $request)
    {
        // dd(435);
        if (!$user = Auth::user()) {
            die('not logged in');
        }

        $this->validate($request, []);
        $post_words = explode(" ", $request->input('textpost'));
        $post       = new post;
        if (isset($post_words[1])) {
            $title = $post_words[0] . " " . $post_words[1];
        } else {
            $title = $post_words[0];
        }
        if (isset($post_words[2])) {
            $title = $post_words[0] . " " . $post_words[1] . " " . $post_words[2];
        } else {
        }
        $post->title      = $title;
        $post->type       = 1;
        $post->place      = 'post';
        $post->status     = 1;
        $post->body       = $request->input('textpost');
        $post->tag        = $request->input('tag');
        $post->media      = $request->input('media');
        $post->mediadesc  = $request->input('mediadesc');
        $post->mediatitle = $request->input('mediatitle');
        $post->mediaimage = $request->input('mediaimage');
        $post->type       = $request->input('type');
        $user             = Auth::user();
        $post->user_id    = $user->id;
        $post->save();
        $pst             = User::find($user->id)->post()->where('post.id', $post->id)->first();
        $happy           = explode(" ", $pst['happy']);
        $sad             = explode(" ", $pst['sad']);
        $normal          = explode(" ", $pst['normal']);
        $liker['happy']  = $happy;
        $liker['normal'] = $normal;
        $liker['sad']    = $sad;
        $present         = "no exp";
        if (in_array($user->id, explode(" ", $pst['happy']))) {
            $present = 'happy';
        }
        if (in_array($user->id, explode(" ", $pst['normal']))) {
            $present = 'normal';
        }
        if (in_array($user->id, explode(" ", $pst['sad']))) {
            $present = 'sad';
        }
        $pst['present']    = $present;
        $pst['all']        = $pst["happyCount"] + $pst["normalCount"] + $pst["sadCount"];
        $pst['exprission'] = $liker;
        if ($pst['type'] == 'image') {
            $pst['media'] = \App\library\FileUpload::getInstance()->getImageFullPath($pst['media'], 'wall_post_image');
        }

        $post = $pst;

        $notificationParams['user_id']   = $user->id;
        $notificationParams['post_id']   = $pst["id"];
        $notificationParams['user_name'] = $user->name . " " . $user->mid_name . " " . $user->last_name;
        $notificationParams['icon']      = $user->avatar;
        $notificationParams['post_body'] = $post->body;
        \App\library\notifications\Notifications::getInstance()->notifyUsers(1, $notificationParams);
        return response()->success(compact('post'));
    }

    public function postImage(Request $request)
    {
        if (!$user = Auth::user()) {
            die('not logged in');
        }
        $this->validate($request, [
            'textpost' => 'required',
        ]);
        $post           = new post;
        $post->media    = $request->input('file');
        $post->body     = $request->input('textpost');
        $post->tag      = '';
        $post->place    = 'post';
        $post->type     = 'image';
        $post->users_id = $user->id;
        $post->save();
        $pst = User::find($user->id)->post()->where('post.id', $post->id)->first();

        $post        = $pst;
        $post->media = \App\library\FileUpload::getInstance()->getImageFullPath($post['media'], 'wall_post_image');

        $notificationParams['user_id']   = $user->id;
        $notificationParams['title']     = 'منشور جديد';
        $notificationParams['post_id']   = $post->id;
        $notificationParams['user_name'] = $user->name . " " . $user->mid_name . " " . $user->last_name;
        $notificationParams['icon']      = $user->avatar;
        $notificationParams['post_body'] = $post->body;
        \App\library\notifications\Notifications::getInstance()->notifyUsers(1, $notificationParams);

        return response()->success(compact('post'));
    }

    public function arrayOrderby()
    {
        if (!$user = Auth::user()) {
            die('not logged in');
        }
        $args = func_get_args();
        $data = array_shift($args);
        foreach ($args as $n => $field) {
            if (is_string($field)) {
                $tmp = array();
                foreach ($data as $key => $row) {
                    $tmp[$key] = $row[$field];
                }
                $args[$n] = $tmp;
            }
        }
        $args[] = &$data;
        call_user_func_array('array_multisort', $args);
        return array_pop($args);
    }

    public function suggested()
    {
        $friends = [];
        $user    = Auth::user();
        if ($user->acctype == 1) {
            $acctype = [1];
        } else {
            $acctype = [1, 2];
        }
        array_push($friends, $user->id);
        $university = university::where('id', '=', $user->university_id)->first();
        $mypost     = User::find($user->id)->friends()->select('friend_id')->get();
        foreach ($mypost as $key => $value) {
            array_push($friends, $value->friend_id);
        }
        $suggested = User::where('users.university_id', '=', $university->id)
            ->whereIn('users.acctype', $acctype)
            ->whereNotIn('users.id', $friends)
            ->join('university as univ', 'users.university_id', '=', 'univ.id')
            ->select('users.id',
                DB::raw('CONCAT(users.name," ",users.last_name ) AS name'),
                'univ.mthr_name as university',
                'users.avatar')
            ->take(10)->get();
        return response()->success($suggested);
    }

}
