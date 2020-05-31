<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Classes\Chat;
use App\Http\Controllers\Controller;
use Auth;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    //
    protected $Chat;
    public function __construct($owner = null, $UID = null)
    {
    }
    public function AddNewRoom(Request $r)
    {
        $user = Auth::user();
        if (!isset($r->owner) || is_null($r->owner)) {
            $owner = $user->id;
        } else {
            $owner = $r->owner;
        }
        if (!isset($r->UID) || is_null($r->UID)) {
            $UID = $user->FB_UID;
        } else {
            $UID = $r->FB_UID;
        }
        $this->Chat = new Chat($owner, $UID);
        return $this->Chat->addNewRoom($r->participant, $r->type);
    }
    public function AddUser(Request $r)
    {
        $user = Auth::user();
        if (!isset($r->owner) || is_null($r->owner)) {
            $owner = $user->id;
        } else {
            $owner = $r->owner;
        }
        if (!isset($r->UID) || is_null($r->UID)) {
            $UID = $user->FB_UID;
        } else {
            $UID = $r->FB_UID;
        }
        $this->Chat = new Chat($user->id, $UID);

        return $this->Chat->addUserToRoom($r->participant, $r->room);

    }

    public function RemoveUser(Request $r) /* post */
    {
        $user = Auth::user();
        if (!isset($r->owner) || is_null($r->owner)) {
            $owner = $user->id;
        } else {
            $owner = $r->owner;
        }
        if (!isset($r->UID) || is_null($r->UID)) {
            $UID = $user->FB_UID;
        } else {
            $UID = $r->FB_UID;
        }
        $this->Chat = new Chat($user->id, $UID);
        return $this->Chat->removeUserFromRoom($r->participant, $r->room);
    }

    public function SetAllUid(Request $r)
    {
        if (!isset($r->take)) {
            $r->take = 10;
        }
        if (!isset($r->skip)) {
            $r->skip = 0;
        }
        $user = \App\Models\User::where('FB_UID', null)->select(\DB::raw('CONCAT(users.id,"@edzance.com" ) AS email'), \DB::raw('CONCAT(users.name," ",users.last_name ) AS name'), 'FB_PASS as password', 'FB_UID', 'id')->take($r->take)->skip($r->skip)->get();
        return $user;
    }
    public function postSetAllUid(Request $r)
    {
        if (!isset($r->take)) {
            $r->take = 10;
        }
        if (!isset($r->skip)) {
            $r->skip = 0;
        }
        $user = \App\Models\User::where('FB_UID', null)->select(\DB::raw('CONCAT(users.id,"@edzance.com" ) AS email'), \DB::raw('CONCAT(users.name," ",users.last_name ) AS name'), 'FB_PASS as password', 'FB_UID', 'id')->take($r->take)->skip($r->skip)->get();
        return $user;
    }

    public function SetUid(Request $r)
    {
        $user         = \App\Models\User::where('id', $r->id)->first();
        $user->FB_UID = $r->uid;
        $user->save();
        return $user->id;
    }

    public function getSetUid($id, $uid)
    {
        $user         = \App\Models\User::where('id', $id)->first();
        $user->FB_UID = $uid;
        $user->save();
        return $user->id;
    }

    public function SetUid2(Request $r)
    {
        $user         = \App\Models\User::where('id', $r->id)->first();
        $user->FB_UID = $r->uid;
        $user->save();
        return $user->id;
    }
}
