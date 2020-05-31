<?php

namespace App\Http\Controllers\Classes;

use App\Http\Controllers\Controller;
use \App\Models\User;
use \Auth;
use \Firebase;

class Chat extends Controller
{
    protected $chatter;
    protected $chatEnabled;
    public function __construct($requester, $UID = null)
    {
        if (!$user = Auth::user()) {
            die('not logged in');
        }
        if ($requester != $user->id) {
        }
        $user          = User::find($requester);
        $this->chatter = $user;
        if (!is_null($UID)) {
            $user         = User::where('id', $requester)->first();
            $user->FB_UID = $UID;
            $user->save();
        }
        $this->chatter = $user;
        return $this;
        // }
    }

    public function CheckIfRegistered($UID = null)
    {
        if (is_null($this->chatter->FB_UID) || $this->chatter->FB_UID == "0") {
            return $this->chatEnabled = false;
        }
        return $this->chatEnabled = true;
    }
    public function addNewRoom($participant, $type = null, $name = null, $opened = true)
    {
        $owner = $this->chatter->id;
        if ($participant == '') {
            $participant = [];
        } elseif (!is_array($participant)) {
            $participant = explode(',', $participant);
        }
        $partisipatnt_without_owner = $participant;
        array_push($participant, $owner);
        sort($participant);
        if (count($participant) > 2) {
            if (is_null($name)) {
                $name[0] = "محادثة مجموعة";
            }
            if (is_null($type)) {
                $type = 'public';
            }
        } else {
            if (count($participant) == 2) {
                $User      = User::whereIn('id', $participant)->get();
                $name[1]   = $User[0]->name . ' ' . $User[0]->last_name;
                $name[0]   = $User[1]->name . ' ' . $User[1]->last_name;
                $avatar[1] = $User[0]->avatar;
                $avatar[0] = $User[1]->avatar;
                $type      = 'personal';
            } else {
                $User      = User::whereIn('id', $participant)->get();
                $name[0]   = $name;
                $avatar[0] = $User[0]->avatar;
            }
        }

        $chatters                 = [];
        $Rooms                    = [];
        $chatter                  = [];
        $partisipatnt_without_own = [];
        $owner                    = User::find($owner);
        $firebase                 = Firebase::fromServiceAccount(env('FIREBASE_SERVICE_JSON'), env('FIREBASE_DATABASE'));
        $db                       = $firebase->getDatabase();
        $chat                     = ['CreatedBy' => $owner->FB_UID,
            'Online'                                 => [$owner->FB_UID => time()],
            'option'                                 => ['lastMessage' => 'null', 'count' => 0],
        ];
        $postRef            = $db->getReference('chat')->push($chat);
        $postKey            = $postRef->getKey();
        $chatters           = User::whereIn('id', $participant)->select('FB_UID', 'name', 'last_name', 'avatar')->get();
        $chatters_name      = array_column($chatters->toArray(), 'name');
        $chatters_last_name = array_column($chatters->toArray(), 'last_name');

        foreach ($chatters as $key => $value) {
            $chatter[$value->FB_UID] = $value;
            if ($value->FB_UID != $this->chatter->FB_UID) {
                $partisipatnt_without_own[$chatters[$key]->FB_UID] = $participant[$key];
            }

        }
        $partisipatnt_without_owner = $partisipatnt_without_own;
        $chatters                   = $chatter;
        $key                        = 0;
        foreach ($chatters as $k => $value) {
            if (count($participant) > 2) {
                $n = $name[0];
                $v = '';
            } elseif (count($participant) == 2) {
                $n = $name[$key];
                $v = $avatar[$key];
            } else {
                $n = $name;
                $v = $avatar[0];
            }
            $Rooms[$value->FB_UID] = [
                'name'        => $postKey,
                'created_at'  => time(),
                'hasNew'      => false,
                'unReaded'    => 0,
                'lastMessage' => "U2FsdGVkX1+dIfHFnyCFJFTEfCCMB6bi1qHbb0u3Tic6naMGNrmjNaTWMOB3fXTsGO5+0c5gAsu8+IfIZHwNEA==",
                'avatar'      => $v,
                'count'       => 0,
                'deleted'     => false,
                'deleted_at'  => 0,
                'display'     => $n,
                'type'        => $type,
                'chatter'     => $chatters,
                'participant' => $partisipatnt_without_owner,
                'updatedAt'   => time(),
            ];
            if ($opened == true) {
                $postRef = $db->getReference('Rooms/' . $value->FB_UID . '/' . $postKey)->set($Rooms[$value->FB_UID]);
            } else {
                $Rooms[$value->FB_UID]['deleted'] = true;
                $postRef                          = $db->getReference('Rooms/' . $value->FB_UID . '/' . $postKey)->set($Rooms[$value->FB_UID]);
            }
            $chatter[$value->FB_UID] = ['created_at' => time(),
                'unReaded'                               => 0,
                'avatar'                                 => $value->avatar,
                'name'                                   => $value->name . ' ' . $value->last_name];
            $key++;
        }
        $postRef       = $db->getReference('chat/' . $postKey . '/users')->set($chatter);
        $chat['users'] = $chatters;
        $chat          = [$postKey => $chat];
        return compact('Rooms', 'chat');
    }
    public function addUserToRoom($participant, $parent)
    {
        $owner = $this->chatter->id;
        if (!is_array($participant)) {
            $participant = explode(',', $participant);
        }
        $partisipatnt_without_owner = $participant;
        array_push($participant, $owner);
        sort($participant);
        $chatters           = [];
        $chatter            = [];
        $Rooms              = [];
        $owner              = User::find($owner);
        $firebase           = Firebase::fromServiceAccount(env('FIREBASE_SERVICE_JSON'), env('FIREBASE_DATABASE'));
        $db                 = $firebase->getDatabase();
        $chatters           = User::whereIn('id', $participant)->select('FB_UID', 'name', 'last_name', 'avatar')->get();
        $chatters_name      = array_column($chatters->toArray(), 'name');
        $chatters_last_name = array_column($chatters->toArray(), 'last_name');

        foreach ($chatters as $key => $value) {
            $Rooms[$value->FB_UID] = [
                'name'        => $parent->Fire_Base_Chat_Room_name,
                'created_at'  => time(),
                'hasNew'      => false,
                'unReaded'    => 0,
                'lastMessage' => "U2FsdGVkX1+dIfHFnyCFJFTEfCCMB6bi1qHbb0u3Tic6naMGNrmjNaTWMOB3fXTsGO5+0c5gAsu8+IfIZHwNEA==",
                'deleteCount' => 0,
                'deleted'     => false,
                'avatar'      => $parent->avatar,
                'display'     => $parent->name,
                'type'        => $parent->type,
                'chatter'     => $chatters,
                'participant' => $partisipatnt_without_owner,
            ];
            $chatter[$value->FB_UID] = ['created_at' => time(),
                'unReaded'                               => 0,
                'avatar'                                 => $value->avatar,
                'name'                                   => $value->name . ' ' . $value->last_name];

            $postRef = $db->getReference('Rooms/' . $value->FB_UID . '/' . $parent->Fire_Base_Chat_Room_name)->set($Rooms[$value->FB_UID]);
        }
        $postRef       = $db->getReference('chat/' . $parent->Fire_Base_Chat_Room_name . '/users')->update($chatter);
        $chat['users'] = $chatters;
        $chat          = [$parent->Fire_Base_Chat_Room_name => $chat];
        return compact('chat');
    }
    public function removeUserFromRoom($participant, $room)
    {
        $participant = User::where('id', $participant)->select('FB_UID', 'name', 'last_name', 'avatar')->first();
        $firebase    = Firebase::fromServiceAccount(env('FIREBASE_SERVICE_JSON'), env('FIREBASE_DATABASE'));
        $db          = $firebase->getDatabase();
        $postRef     = $db->getReference('chat/' . $room . '/users/' . $participant->FB_UID)->remove();
        $postRef     = $db->getReference('Rooms/' . $participant->FB_UID . '/' . $room)->remove();
        $users       = $db->getReference('chat/' . $room . '/users/')->getValue();
        if ($users) {
            foreach ($users as $key => $value) {
                $postRef = $db->getReference('Rooms/' . $key . '/' . $room . '/chatter/' . $participant->FB_UID)->remove();
                $postRef = $db->getReference('Rooms/' . $key . '/' . $room . '/participant/' . $participant->FB_UID)->remove();
            }
        }
        $chat['users'] = $users;
        $chat          = [$room => $chat];
        return compact('chat');
    }

    public function SetUid($id, $uid)
    {
        if (!$user = Auth::user()) {
            die('not logged in');
        }
        if ($id != Auth::user()->id) {
            die('not authorized');
        }
        $user         = Auth::user();
        $user->FB_UID = $uid;
        $user->save();
        return $user;
    }
}
