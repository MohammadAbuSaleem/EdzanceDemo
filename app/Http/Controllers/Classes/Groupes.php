<?php

namespace App\Http\Controllers\Classes;

use App\Http\Controllers\Controller;
use DB;

class Groupes extends Controller
{
    protected static $me = 'No Data Yet';
    protected static $is_exist;
    protected static $is_Member = 'Not Member Yet';
    protected static $is_User   = false;
    protected static $privacy_ar;
    protected static $can_Enter        = false;
    protected static $owner_permission = false;
    protected static $sucess           = true;
    protected static $result           = 'No Group Yet';
    protected static $type;
    protected static $debug;
    protected static $data;
    protected static $message;
    protected static $group_id;
    protected static $group_users;
    protected static $user_id;
    protected static $group;
    protected static $my_auth;
    protected static $relation;
    protected static $template = 69;
    protected static $option   = [
        'add' => [
            '1' => [
                'MESSAGE'       => 'تمت اضيف  ',
                'MESSAGE_AFTER' => 'ألى المجموعة ',
                'STATUS'        => 'in',
                'CALL'          => 'toInState',
            ],
            '2' => [
                'MESSAGE'       => 'لقد غادر ',
                'MESSAGE_AFTER' => 'من المجموعة  ',
                'STATUS'        => 'out',
                'CALL'          => 'toOutState',
            ],
            '3' => [
                'MESSAGE'       => 'تم حظر',
                'MESSAGE_AFTER' => 'من المجموعة  ',
                'STATUS'        => 'blocked',
                'CALL'          => 'toAdminState',

            ],
            '4' => [
                'MESSAGE'       => 'تمت اضافة صلاحية الادارة',
                'MESSAGE_AFTER' => '',
                'STATUS'        => 'modirator',
                'CALL'          => 'toAdminState',
            ],
            '5' => [
                'MESSAGE'       => 'تمت دعوة :',
                'MESSAGE_AFTER' => 'ألى المجموعة ',
                'STATUS'        => 'invited',
                'CALL'          => 'toInvitationState',
            ],
            '6' => [
                'MESSAGE'       => 'تمت ارسال طلبك ',
                'MESSAGE_AFTER' => 'ألى المجموعة ',
                'STATUS'        => 'waiting',
                'CALL'          => 'toWaitingState',
            ],
            '7' => [
                'MESSAGE'       => 'تمت أضافة ',
                'MESSAGE_AFTER' => 'ألى المجموعة ',
                'STATUS'        => 'in',
                'CALL'          => 'toAcceptInvitation',
            ],
        ],
    ];
    public static function Add($group_id, $user_id, $param)
    {
        self::$me    = \Auth::user();
        self::$group = \App\Models\group::where('id', $group_id)
            ->select("groups.*", DB::raw("'group' as type"))->first();
        self::$group_id = $group_id;
        self::$user_id  = $user_id;
        self::$is_exist = false;
        $o              = self::$option['add'];
        self::$my_auth  = \App\Models\groupuser::where('user_id', '=', self::$me->id)
            ->where('id', '=', $group_id)
            ->first();
        if ($user_id == self::$group->creator) {
            return 'no access for anyone to admin';
        }

        self::FindOrCreate($group_id, $user_id);
        self::$template = self::FindTemplate($param);
        $func           = $o[$param]['CALL'];
        self::$type     = self::$func($o[$param]['STATUS'], $o[$param]['MESSAGE']);
        if (!is_null(self::$type)) {
            $before_type = self::$relation->type;
            if (self::$type != self::$relation->type && self::$type != 'not authorized') {
                self::save();
            } else {
                self::$message = 'لا يوجد لديك صلاحية';
            }

        } else {
            self::$message = 'ليست لديك الصلاحية!! راجع ادارة المجموعة';
        }

        $post = \App\Models\User::where('users.id', self::$user_id)
            ->leftjoin('university as uni', 'users.university_id', '=', 'uni.id')
            ->leftjoin('specialition as spec', 'users.specialition_id', '=', 'spec.id')
            ->select('users.id',
                'users.name',
                'users.mid_name',
                'users.last_name',
                'users.created_at',
                'users.avatar',
                'users.university_id',
                'users.specialition_id',
                'spec.mthr_name as specialition',
                'uni.mthr_name as university',
                DB::raw("'" . self::$template . "' as template"),
                DB::raw("'" . self::$type . "' as type"))->first();
        $post['message']          = self::$message . $post->name . ' ' . $post->last_name . $o[$param]['MESSAGE_AFTER'];
        $post['can_Enter']        = self::$can_Enter;
        $post['result']           = self::$result;
        $post['owner_permission'] = self::$owner_permission;
        $post['privacy_ar']       = self::$privacy_ar;
        $post['CALL']             = $o[$param]['CALL'];
        if ($post['type'] == 'in') {
            $Chat = new Chat(\Auth::user()->id, \Auth::user()->FB_UID);
            $Chat->addUserToRoom($user_id, self::$group);
        }
        if ($post['type'] == 'out' || $post['type'] == 'blocked') {
            $Chat = new Chat(\Auth::user()->id, \Auth::user()->FB_UID);
            $Chat->removeUserFromRoom($user_id, self::$group->Fire_Base_Chat_Room_name);
        }
        return compact('post');
    }

    public static function getGroup($group_id)
    {
        self::$group = \App\Models\group::where('groups.id', $group_id)
            ->leftjoin('users as usr', 'usr.id', '=', 'groups.creator')
            ->leftjoin('university as uni', 'usr.university_id', '=', 'uni.id')
            ->leftjoin('specialition as spec', 'usr.specialition_id', '=', 'spec.id')
            ->select('groups.cover', 'usr.id as user_id',
                'usr.name as first_name',
                'usr.mid_name', 'usr.last_name',
                'usr.created_at', 'usr.avatar',
                'usr.university_id', 'usr.college_id',
                'usr.specialition_id', 'spec.mthr_name as specialition',
                'uni.mthr_name as university', 'groups.Fire_Base_Chat_Room_name',
                'groups.id', 'groups.name', 'groups.privacy',
                'groups.creator', 'groups.authorized',
                'groups.university_id as uni', 'groups.specialization_id',
                'groups.created_at', 'groups.description',
                DB::raw("'suggested' as type"))
            ->with('taxonomies')->withCount('userWithoutModirator')->first(); //retreive group info
        if (self::$group) {
            self::$debug[] = 'group founded';
            if (self::isUser()) {
                if (self::$my_auth = \App\Models\groupuser::where('user_id', self::$me->id)->where('id', self::$group['id'])->first()) {
                    self::$debug[]          = 'user is group member';
                    self::$owner_permission = self::$group['authorized'];
                    self::$is_Member        = self::$my_auth->type;
                    self::$result           = self::$is_Member;
                    self::$can_Enter        = false;
                    switch (self::$is_Member) {
                        case 'in':
                        case 'modirator':
                        case 'owner':
                            self::$template   = 1;
                            self::$privacy_ar = 'مجموعة عامة';
                            break;
                        case 'blocked':
                            self::$template   = 3;
                            self::$privacy_ar = 'مجموعة مغلقة';
                            break;
                        case 'invited':
                            self::FindTemplate();
                            if (self::$template == 3) {
                                self::$template = 2;
                            }

                            self::$privacy_ar = 'مجموعة متوسطة';
                            self::$can_Enter  = true;
                            break;
                        case 'out':
                            self::$can_Enter = true;
                        case 'waiting':
                            if (self::$group['privacy'] == 'closed') {
                                self::$template   = 3;
                                self::$privacy_ar = 'مجموعة مغلقة';
                            } elseif (self::$group['privacy'] == 'public') {
                                self::$template   = 1;
                                self::$privacy_ar = 'مجموعة عامة';
                            } else {
                                self::$template   = 2;
                                self::$privacy_ar = 'مجموعة متوسطة';
                            }
                            break;
                    }
                    self::$debug[] = '$result turn to ' . self::$result . ' and template to ' . self::$template;

                } else {
                    self::FindTemplate();
                    self::$is_Member = 'out';
                }
            } else {
                switch (self::$group['privacy']) {
                    case 'closed':
                        self::$template   = 3;
                        self::$privacy_ar = 'مجموعة مغلقة';
                        self::$result     = 'closed group';
                        break;
                    default:
                        self::$privacy_ar = 'مجموعة متوسطة';
                        self::$template   = 2;
                        self::$result     = 'public group';
                        break;
                }
                self::$debug[] = '$result turn to ' . self::$result . ' and template to ' . self::$template;
            }
        } else {
            self::$debug[]  = 'group not founded';
            self::$result   = 'error in group id';
            self::$template = 3;
            self::$sucess   = false;
        }
        if (self::$template == 3) {
            $group = null;
        } else {
            $group = self::$group;
        }

        $data = ['result' => self::$result,
            'debug'           => self::$debug,
            'sucess'          => self::$sucess,
            'template'        => self::$template,
            'data'            => $group,
            'canEnter'        => self::$can_Enter,
            'privacy_ar'      => self::$privacy_ar,
            'permission'      => self::$owner_permission,
            'member'          => self::$is_Member,
        ];
        return $data;
    }
    public static function isUser()
    {
        try {
            //get user info
            if (!self::$me = \JWTAuth::parseToken()->authenticate()) { //check if user logged in
                self::$debug[] = 'user not confirmed'; //just for debugging
                self::$is_User = false; //flage to see if user is logged in - not logged
            } else {
                self::$debug[] = 'user confirmed'; //just for debugging
                self::$is_User = true; //flage to see if user is logged in - logged
            }
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
            self::$debug[] = 'user not confirmed -JWTException'; //just for debugging
            self::$is_User = false; //flage to see if user is logged in - erorr in token
        }
        return self::$is_User;
    }
    public static function FindOrCreate($group_id, $user_id)
    {
        if (count($groupuser = \App\Models\groupuser::where('user_id', '=', $user_id)
            ->where('id', '=', $group_id)->first())) {
            self::$is_exist = true;
            self::$relation = $groupuser;
        } else {
            self::$relation = new \App\Models\groupuser;
            self::$is_exist = false;
        }
    }
    public static function FindTemplate($param = null)
    {
        switch (self::$group['privacy']) {
            case 'public':
                self::$can_Enter        = true;
                self::$privacy_ar       = 'مجموعة عامة';
                self::$result           = 'public group';
                self::$template         = 1;
                self::$owner_permission = self::$group['authorized'];
                break;
            case 'closed':
                self::$template   = 3;
                self::$privacy_ar = 'مجموعة مغلقة';
                self::$result     = 'closed group';
                break;
            default:
                if (self::$group['specialization_id'] == self::$me->specialition_id) {
                    self::$template   = $param == 1 ? 1 : 2;
                    self::$privacy_ar = 'مجموعة متوسطة';
                    self::$result     = 'same spec';
                    self::$can_Enter  = true;
                } elseif (self::$group['uni'] == self::$me->university_id) {
                    self::$privacy_ar = 'مجموعة متوسطة';
                    self::$template   = $param == 1 ? 1 : 2;
                    self::$can_Enter  = true;
                    self::$result     = 'same uni';
                    self::$debug[]    = '$group->uni turn to ' . self::$group['university_id'] . ' and me->university_id to ' . self::$me->university_id;
                } else {
                    self::$template   = 3;
                    self::$privacy_ar = 'مجموعة مغلقة';
                    self::$result     = 'no common data';
                    self::$can_Enter  = false;
                }
                break;
        }

        self::$debug[] = '$result turn to ' . self::$result . ' and template to ' . self::$template;

        return self::$template;
    }

    public static function toInState($state, $message)
    {
        $result = 'initial';
        if (!is_null(self::$my_auth)) {
            if (self::$me['id'] == self::$group['creator'] || self::$my_auth->type == 'modirator') {
                if (self::$relation->type == 'blocked' || self::$relation->type == 'waiting' || self::$relation->type == 'modirator') {
                    $result = 'in';
                } else {
                    $result = 'not authorized';
                }

            } else {
                $result = 'not authorized';

                if (self::$group->privacy != 'closed' && self::$me['id'] == self::$user_id) {
                    if (self::$group->authorized == '1') {
                        $result = 'waiting';
                    } else {
                        $result = 'in';
                    }

                }
            }
        } else {
            if (self::$group->privacy != 'closed' && self::$me['id'] == self::$user_id) {
                if (self::$group->authorized == '1') {
                    $result = 'waiting';
                } else {
                    $result = 'in';
                }

            } else {
                $result = 'not authorized';
            }

        }
        if ($result != 'initial') {
            self::$type = $result;
        }

        self::$message = $message;
        return self::$type;
    }
    public static function toWaitingState($state, $message)
    {
        $result = 'initial';
        if (is_null(self::$my_auth)) {
            if (self::$me['id'] == self::$user_id) {
                $result = 'waiting';
            } else {
                $result = 'not authorized';
            }

        } elseif (self::$my_auth->type == 'out') {
            $result = 'waiting';
        } else { $result = 'not authorized';}
        if ($result != 'initial') {
            self::$type = $result;
        }

        self::$message = $message;
        return self::$type;
    }
    public static function toOutState($state, $message)
    {
        $result = 'initial';
        if (!is_null(self::$my_auth)) {
            if (self::$me['id'] == self::$group['creator'] || self::$my_auth->type == 'modirator' || self::$me['id'] == self::$user_id) {
                $result = 'out';
            } else {
                $result = 'not authorized';
            }

        } else {
            $result = 'not authorized';
        }

        if ($result != 'initial') {
            self::$type = $result;
        }

        self::$message = $message;
        return self::$type;
    }
    public static function toNormalState($state, $message)
    {
        $result = 'initial';
        if (self::$me['id'] == self::$group['creator']) {
            $result = 'in';
        } elseif (!is_null(self::$my_auth)) {
            if (self::$my_auth->type == 'modirator') {
                $result = 'in';
            } elseif (!(self::$my_auth->type == 'blocked' || self::$my_auth->type == 'waiting' || self::$group->privacy == 'closed') && self::$me['id'] == self::$user_id) {
                if (self::$group->authorized == '1') {
                    $result = 'waiting';
                } else {
                    $result = 'in';
                }

            } else {
                $result = 'not authorized';
            }

        } else {
            if (!self::$group->privacy == 'closed' && self::$me['id'] == self::$user_id) {
                if (self::$group->authorized == '1') {
                    $result = 'waiting';
                } else {
                    $result = 'in';
                }

            } else {
                $result = 'not authorized';
            }

        }
        if ($result != 'initial') {
            self::$type = $result;
        }

        self::$message = $message;
        return self::$type;
    }
    public static function toAdminState($state, $message)
    {
        $result = false;
        if (self::$me['id'] == self::$group['creator']) {
            $result = true;
        } elseif (!is_null(self::$my_auth)) {
            if ((self::$my_auth->type == 'modirator')) {
                $result = true;
            }
        }

        if ($result == true) {
            self::$type = $state;
        } else {
            self::$type = 'not authorized';
        }

        self::$message = $message;
        return self::$type;
    }
    public static function toInvitationState($state, $message)
    {
        $result = 'initial';

        if (self::$me['id'] == self::$group['creator']) {
            $result = 'invited';
        } elseif (!is_null(self::$my_auth)) {
            if (self::$my_auth->type == 'modirator' || self::$my_auth->type == 'owner') {
                $result = 'invited';
            } else {
                $result = 'not authorized';
            }

        } else {
            $result = 'not authorized';
        }

        if ($result != 'initial') {
            self::$type = $result;
        }

        self::$message = $message;
        return self::$type;
    }
    public static function toAcceptInvitation($state, $message)
    {
        $result = 'initial';
        if (self::$my_auth->type == 'invited' && self::$me['id'] == self::$user_id) {
            $result         = 'in';
            self::$template = 1;
        } else {
            $result = 'not authorized';
        }

        if ($result != 'initial') {
            self::$type = $result;
        }

        self::$message = $message;
        return self::$type;
    }
    public static function save()
    {
        if (self::$type == 'in') {
            $Chat = new Chat(\Auth::user()->id, \Auth::user()->FB_UID);
            $Chat->addUserToRoom(self::$user_id, self::$group);
        }
        if (self::$type == 'out' || self::$type == 'blocked') {
            $Chat = new Chat(\Auth::user()->id, \Auth::user()->FB_UID);
            $Chat->removeUserFromRoom(self::$user_id, self::$group->Fire_Base_Chat_Room_name);
        }
        self::$relation->user_id = self::$user_id;
        self::$relation->id      = self::$group_id;
        self::$relation->type    = self::$type;
        self::$relation->save();
        return self::$relation;
    }
}
