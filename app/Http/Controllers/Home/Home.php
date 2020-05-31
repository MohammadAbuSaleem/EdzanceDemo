<?php

namespace App\Http\Controllers\Home;

use App\Http\Controllers\Classes\Helper;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Members\Members;
use App\Http\Controllers\PermissionInterface\PermissionInterface;
use App\Http\Controllers\testController;
use App\Models\category;
use App\Models\ContactUs;
use App\Models\country;
use App\Models\friends;
use App\Models\request as r;
use App\Models\User;
use App\Models\validate;
use Auth;
use DB;
use \App\library\FileUpload as FileUpload;

class Home extends Controller implements PermissionInterface {
    private static $instance = null;
    private $user            = null;
    public static function getInstance() {

        if (self::$instance == null) {
            self::$instance = new Home();
        }
        return self::$instance;
    }
    public function __construct() {
        $this->user = \Auth::user();
        return $this;
    }
    public function __call($method, $arguments) {
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
    /* to get all information about loged in user */
    private function me() {
        $user       = $this->user;
        $friends    = [];
        $allfriends = [];
        $users      = \App\Models\User::where('users.id', $user->id) /*->with('myclass')*/
            ->select('users.id',
                'users.name',
                'users.email',
                'users.mid_name',
                'users.last_name',
                'users.FB_UID',
                'users.FB_PASS',
                'users.email_verified',
                'users.active_verification_code',
                'users.activated_at',
                'users.acctype',
                'users.avatar',
                'users.showcase',
                'users.status',
                'users.country_id',
                'users.institute_id'
            )->withCount('friends')->withCount('followers') /*->with('friendsinvers')->with('requested')->withCount('requested')->with('requester')*/->first();

        // $friends['friend']    = array_column($users->friendsinvers->toArray(), 'id');
        // $friends['requested'] = array_column($users->requested->toArray(), 'requester_id');
        // $friends['requester'] = array_column($users->requester->toArray(), 'requested_id');
        // foreach ($friends as $key => $value) {
        //     for ($i = 0; $i < count($value); $i++) {
        //         $allfriends[$value[$i]] = $key;
        //     }
        // }
        // unset($users->friends, $users->friendsinvers, $users->requester, $users->requested);
        // $users->friend = $allfriends;

        $permissions                    = new members(['action' => 'getPermissions', 'user_id' => \Auth::user()->id]);
        $users['level']                 = $permissions->level;
        $users['permission']            = ['home' => $permissions->permissions['home'], 'social' => $permissions->permissions['social']];
        $count                          = \App\Models\notification::where('receiver_id', "=", $user->id)->where('seen', "=", 0)->count();
        $users['un_seen_notifications'] = $count;
        return ($users);
    }
    /* to get unseen notification to user */
    private function CheckUnseenNotifications($request) {
        $this->validate($request, [
            'count' => 'required',
        ]);
        $user = Auth::user();

        $count  = \App\Models\notification::where('receiver_id', "=", $user->id)->where('seen', "=", 0)->count();
        $unseen = $count - $request->count;
        if ($unseen > 0) {
            $notifications = \App\Models\notification::select("seen", "body", "title", "type_id", "redirect_type", "redirect_id", "created_at", "link", "icon")->where('receiver_id', "=", $user->id)->orderBy("id", "desc")
                ->limit($unseen)->get();
            $notifications = $notifications->toArray();
        } else {
            return ['unseen' => $count, 'notifications' => []];
        }

        return ['unseen' => $count, 'notifications' => $notifications];
    }
    /* to get user friends */
    private function friend($friend, $update = 'follower') {
        $user = $this->user;
        if ($friendy = friends::where('id', $user->id)->where('friend_id', $friend)->first()) {

            if ($friendy->status == 'follower' && $update == 'follower') {
                return ('You are already follwing that person :)');
            }
            $friendy->status = $update;
            $friendy->save();
            $fUser = User::where('id', $friend)->first();

            if ($update == "follower") {
                $notificationParams['user_id']          = $user->id;
                $notificationParams['user_name']        = $user->name . " " . $user->mid_name . " " . $user->last_name;
                $notificationParams['icon']             = $user->avatar;
                $notificationParams['followed_user_id'] = $friend;
                \App\library\notifications\Notifications::getInstance()->notifyUsers(3, $notificationParams);

            }
            $friendName = $fUser->name . " " . $fUser->mid_name . " " . $fUser->last_name;
            // post::addFollowPost($user->id, $friend, $friendName, $fUser->avatar);
            return ($fUser);
        }

        $friendy            = new friends;
        $friendy->id        = $user->id;
        $friendy->friend_id = $friend;
        $friendy->status    = $update;
        $friendy->save();
        $fUser = User::where('id', $friendy->friend_id)->first();

        $notificationParams['user_id']          = $user->id;
        $notificationParams['user_name']        = $user->name . " " . $user->mid_name . " " . $user->last_name;
        $notificationParams['icon']             = $user->avatar;
        $notificationParams['followed_user_id'] = $friend;
        \App\library\notifications\Notifications::getInstance()->notifyUsers(3, $notificationParams);

        $friendName = $fUser->name . " " . $fUser->mid_name . " " . $fUser->last_name;
        // post::addFollowPost($user->id, $friend, $friendName, $fUser->avatar);
        return ($fUser);
    }
    /* to get user friends */
    private function getFriend($friend, $update = 'follower') {
        $friend = User::find($friend);
        $me     = \Auth::user();
        if ($friendy = friends::where('id', $friend->id)->where('friend_id', $me->id)->first()) {
            if ($friendy->status == 'follower' && $update == 'follower') {
                return ('You are already follwing that person :)');
            }
            $friendy->status = $update;
            $friendy->save();
            $reverse_friendy         = friends::where('id', $me->id)->where('friend_id', $friend->id)->first();
            $reverse_friendy->status = $update;
            $reverse_friendy->save();
            $fUser = $friend;
            if ($update == "follower") {
                $notifyVar['user_id']          = $friend->id;
                $notifyVar['user_name']        = $friend->name . " " . $friend->mid_name . " " . $friend->last_name;
                $notifyVar['icon']             = $friend->avatar;
                $notifyVar['followed_user_id'] = $me->id;
                \App\library\notifications\Notifications::getInstance()->notifyUsers(3, $notifyVar);
            }
            return $friend;
        } else {
            $my_friendy            = new friends;
            $my_friendy->id        = $me->id;
            $my_friendy->friend_id = $friend->id;
            $my_friendy->status    = $update;
            $my_friendy->save();
            $friendy            = new friends;
            $friendy->id        = $friend->id;
            $friendy->friend_id = $me->id;
            $friendy->status    = $update;
            $friendy->save();
            $notifyVar['user_id']          = $friend->id;
            $notifyVar['user_name']        = $friend->name . " " . $friend->mid_name . " " . $friend->last_name;
            $notifyVar['icon']             = $friend->avatar;
            $notifyVar['followed_user_id'] = $me->id;
            \App\library\notifications\Notifications::getInstance()->notifyUsers(3, $notifyVar);
            return $friend;
        }
    }
    /* to Activate user search */
    private function search($value) {
        if ($value != null) {
            if (!($this->user)) {
                $user = [];
            } else {
                $user = [$this->user->id];
            }
            $u = [];
            $u = User::select('users.id',
                DB::raw('CONCAT(users.name," ",users.last_name ) AS name'),
                'users.avatar as avatar')
                ->whereRaw("(CONCAT(users.name,' ',users.mid_name,' ',users.last_name ) like '$value%')")
                ->whereNotIn('users.id', $user)
                ->take(5)->get();
            foreach ($u as $key => $value) {
                $value->isfriend = $this->isFriend($value->id);
            }
            if (count($u) == 0) {
                return ('no post');
            }
            return ($u);
        } else {
            return ('no post');
        }

    }
    public function countriesList() {
        $countries = country::select("country_arabic", "id")->get();
        return $countries;
    }
    /* to Activate user search */
    private function searchFirstInstitute($val, $father = 0) {
        $u = [];
        $u = category::select('categories.id', 'categories.name',
            'categories.taxonomy_id', 'categories.parent', 'categories.level', 'categories.main', 'categories.created_at')
            ->where('categories.name', 'like', "%$val%")
            ->where('categories.level', 1)
            ->take(7)->get();
        foreach ($u as $key => $value) {
            $parents = category::where('id', $value->id)->with(['childs' => function ($query) {
                $query->where('categories.main', 1);
            }])->first();
            $a = new testController();
            $a->unionChild($parents['child']);
            foreach ($a->final as $key => $value) {
                if ($value['main'] != 1) {
                    unset($a->final[$key]);
                }
            }
            return $u;
        }
        if (count($u) == 0) {
            return ('no post');
        }
        return ($u);
    }
    private function searchMainInstitute($val, $father = null) {
        $u = [];
        $u = category::select('categories.id', 'categories.name', 'categories.taxonomy_id', 'categories.parent', 'categories.level', 'categories.main', 'categories.created_at')
            ->where('categories.name', 'like', "%$val%")
            ->where('categories.level', '<>', 1)
            ->take(7)->get();
        if (count($u) == 0) {
            return ('no post');
        }
        return ($u);
    }
    /* to search about all user */
    private function searchAll($value, $skip = 0, $take = 5) {
        if (!($this->user)) {
            $user = [];
        } else {
            $user = [Auth::user()->id];
        }
        $u = [];
        $u = User::select('users.id', DB::raw('CONCAT(users.name," ",users.last_name ) AS name'), 'users.avatar as avatar')
            ->whereRaw("(CONCAT(users.name,' ',users.mid_name,' ',users.last_name ) like '$value%')")
            ->whereNotIn('users.id', $user)
            ->take($take)->skip($skip)->get();
        foreach ($u as $key => $value) {
            $value->isfriend = $this->isFriend($value->id);
        }
        if (count($u) == 0) {
            return ('no post');
        }
        return ($u);
    }
    /*
     * @Work :: To Get Suggested From Data Base
     * @return Countact Us
     */
    private function suggest() {
        $friends   = [];
        $user      = $this->user;
        $myFriends = User::find($user->id)->friends()->select('friend_id')->get();
        $friends   = (is_null($myFriends)) ? [] : array_column($myFriends->toArray(), 'friend_id');
        array_push($friends, $user->id);
        $suggested = User::whereNotIn('users.id', $friends);
        if (!is_null($user->institute_id)) {
            $count = User::whereNotIn('users.id', $friends)->where('users.institute_id', $user->institute_id)->count();
            if ($count > 4) {
                $suggested = $suggested->where('users.institute_id', $user->institute_id);
            }
        } else {
            $count = User::whereNotIn('users.id', $friends)->where('users.institute_id', null)->count();
            if ($count > 4) {
                $suggested = $suggested->where('users.institute_id', null);
            }
        }
        $suggested = $suggested->leftJoin('institutes as ins', 'users.institute_id', '=', 'ins.id')
            ->select('users.id',
                \DB::raw('CONCAT(users.name," ",users.last_name ) AS name'),
                \DB::raw('false AS isfriend'),
                'ins.mthr_name as institute',
                'users.avatar')
            ->take(10)->get()->toArray();
        shuffle($suggested);
        return $suggested;
    }
    /*
     * @Work :: To Get All Suggested User From DB
     * @return Suggested User
     */
    private function suggestAll($skip = 0, $take = 10) {
        $friends   = [];
        $user      = $this->user;
        $institute = \App\Models\category::find($user->institute_id);
        // return $institute;
        $myFriends = User::find($user->id)->friends()->select('friend_id')->get();
        $friends   = (is_null($myFriends)) ? [] : array_column($myFriends->toArray(), 'friend_id');
        array_push($friends, $user->id);
        $suggested = User::whereNotIn('users.id', $friends);
        if (!is_null($user->institute_id)) {

            $count = User::whereNotIn('users.id', $friends)->where('users.institute_id', $user->institute_id)->count();
            if ($count > 4) {
                $suggested = $suggested->where('users.institute_id', $user->institute_id);
            } else {
                $count = User::whereNotIn('users.id', $friends)->where('users.institute_id', $user->institute_id)->count();

            }
        } else {
            $count = User::whereNotIn('users.id', $friends)->where('users.institute_id', null)->count();
            if ($count > 4) {
                $suggested = $suggested->where('users.institute_id', null);
            }
        }
        $suggested = $suggested->leftJoin('institutes as ins', 'users.institute_id', '=', 'ins.id')
            ->select('users.id',
                DB::raw('CONCAT(users.name," ",users.last_name ) AS name'),
                \DB::raw('false AS isfriend'),
                'ins.mthr_name as institute',
                'users.avatar')
            ->skip($skip)->take($take)->get()->toArray();
        shuffle($suggested);
        return $suggested;
    }
    /* to get user nontification */
    private function UserNotifications($skip, $take) {
        $user = $this->user;
        if (!empty($user)) {
            $notifications = \App\Models\notification::select("seen", "body", "title", "type_id", "redirect_type", "redirect_id", "created_at", "link", "icon")->where('receiver_id', "=", $user->id)->orderBy("id", "desc")->take($take)->skip($skip)->get();
            $notifications = $notifications->toArray();
            if (!empty($notifications)) {
                return $notifications;
            } else {
                return 'no post';
            }
        }
    }
    /* to get seen notification */
    private function SeenNotifications($request) {
        $user       = $this->user;
        $updateSeen = \App\Models\notification::where("receiver_id", "=", $user->id)->where('seen', "=", 0)->update(['seen' => 1]);
        return [];
    }
    /* to Reset Notifications Token */
    private function ResetNotificationsToken($request) {

        $user = $this->user;
        if (!empty($user)) {
            // get session id
            $sessionId = $request->cookie('notifications_key');
            $token     = \App\library\notifications\Models\Notifications::getInstance()->updateUserToken($user->id, $request->token, "update", $request->platform, $sessionId);
            return [$token];
        }
        return $token;
    }
    /*
     * @Work :: To Add New Contact Us In DataBase
     * @return True / False
     */
    public function ContactUs($request) {
        $user = Auth::user();
        $this->validate($request, [
            'title'       => 'required',
            'description' => 'required',
        ]);
        if (isset($request->file)) {
            try {
                $request->type = 'contact';
                $upload        = FileUpload::getInstance()->uploadFile($request);
            } catch (Exception $e) {
                return ['result' => 'error', 'sucess' => false, 'message' => 'failed to upload image'];
            }
        }
        $contactUs              = new ContactUs();
        $contactUs->user_id     = $user->id;
        $contactUs->title       = $request->title;
        $contactUs->description = $request->description;
        $contactUs->created_at  = date("Y-m-d H:i:s");
        if (isset($request->file)) {
            $contactUs->file = $upload['file_name'];
        }
        $contactUs->save();
        $contactUs->file = FileUpload::getInstance()->getImageFullPath($contactUs->file, 'contact');
        return $contactUs;
    }
    /*
     * @Work :: To Get All Coutact Us In Data Base
     * @return Countact Us
     */
    public function contactUsMessages($skip, $take) {
        $user            = Auth::user();
        $contactMessages = ContactUs::select("title", "description", "comment", "created_at", "file", "comment_date")->where('user_id', $user->id)->take($take)->skip($skip)->get();
        foreach ($contactMessages as $key => $value) {
            $value->file = FileUpload::getInstance()->getImageFullPath($value->file, 'contact');
        }
        if (count($contactMessages) == 0) {
            return ('no post');
        }
        return $contactMessages;
    }

    /*
     * @Work :: TO Report A File
     * @return Reported File
     */

    public function reportFile($request) {
        $filename    = $_FILES['file']['name'];
        $meta        = 'upload/contact_us/';
        $destination = $meta . $filename;
        $filename    = $_FILES['file']['name'];
        $ext         = pathinfo($filename, PATHINFO_EXTENSION);
        $pdf         = $_FILES['file']['tmp_name'];
        move_uploaded_file($pdf, $destination);
        $return = [$destination, $ext];
        return $return;
    }
    public function friendRequest($id) {
        $data = [
            'requester' => $this->user->id,
            'requested' => $id,
            'place'     => 'friendship',
            'operation' => 'follow',
        ];

        return Helper::request($data);

    }
    public function friendsResponse($friend_id, $operation) {
        $requests = r::where('requested_id', $this->user->id)
            ->where('requester_id', $friend_id)
            ->where('place', 'friendship')->first();
        switch ($operation) {
        // 'follower','blocked','deleted'
        case 'follower': // 'refused','blocked','delayed','accepted'
            $action = 'accepted';
            $return = '';
            break;
        case 'blocked':
            $action = 'blocked';
            $return = '';
            # code...
            break;
        case 'deleted':
            $action = 'refused';
            $return = '';
            # code...
            break;
        }
        $response = Helper::response($requests->id, ['action' => $operation], [(new \App\Http\Controllers\Home\Home), 'getFriend'], [$requests->id, $operation]);
        return $response; //[$friend_id => ''];
    }
    public function friendsRemove($id) {

        // return Helper::response($id, ['action' => 'refused'], [(new \App\Http\Controllers\Home\Home), 'getFriend'], [r::find($id)->requester_id, 'deleted']);
        return $this->getFriend($id, 'deleted');
    }

    public function friendsRequests($action = null, $skip, $take) {
        $data = [
            'requested' => $this->user->id,
            'place'     => 'friendship',
            'action'    => $action,
        ];
        return Helper::requests($data, $skip, $take);
    }

}
