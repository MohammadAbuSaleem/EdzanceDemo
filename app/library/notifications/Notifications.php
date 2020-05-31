<?php

/**
 * @author ahmadhajeer
 */
namespace App\library\notifications;

use App\Models\NotificationType;

class Notifications implements notificationsInt
{

    public static $instance = null;

    public static function getInstance()
    {
        if (self::$instance == null) {
            self::$instance = new Notifications();
        }
        return self::$instance;
    }
    /**
     * to rout the notification order
     * @param String $type
     * @param Array $params
     * @author Ahmad Hajeer
     */
    public function Notifications()
    {

    }
    /**
     *
     * @param type $type
     * @param type $params
     * @author Ahmad Hajeer
     */
    public function notifyUsers($type, $params)
    {
        // get notification body and replace variables
        $notificationBody = $this->getNotificationBody($type, $params);
        // get targetted users
        $notificationTargets = $this->getNotificationTargets($type, $params);
        // generate notification objects
        $notificationObject = $this->generateNotificationObjects($type, $notificationBody['title'], $notificationBody['body'], $params['icon'], $notificationBody['click_action'], $notificationBody['created_at'], $params);
        // save notifications in db
        $this->saveNotification($params['user_id'], $notificationTargets, $notificationObject, $type);
        // get users tokens
        $tokens = $this->getTokensFromUsersObjects($notificationTargets);
        // call notification sp
        $notification = Firebase::getInstance()->firebaseNotification($tokens, $notificationObject);

        ////// write notification results to log file /////////
        // \Illuminate\Support\Facades\Log::useDailyFiles('logs/notifications_results.log');

        // \Illuminate\Support\Facades\Log::info("params");
        // \Illuminate\Support\Facades\Log::info("_____________________");
        // \Illuminate\Support\Facades\Log::info([$type, $params]);

        // \Illuminate\Support\Facades\Log::info("notificationTargets");
        // \Illuminate\Support\Facades\Log::info("_____________________");
        // \Illuminate\Support\Facades\Log::info([$notificationTargets]);

        // \Illuminate\Support\Facades\Log::info("tokens");
        // \Illuminate\Support\Facades\Log::info("_____________________");
        // \Illuminate\Support\Facades\Log::info([$tokens]);

        // \Illuminate\Support\Facades\Log::info("notificationObject");
        // \Illuminate\Support\Facades\Log::info("_____________________");
        // \Illuminate\Support\Facades\Log::info([$notificationObject]);

        // \Illuminate\Support\Facades\Log::info("notification");
        // \Illuminate\Support\Facades\Log::info("_____________________");
        // \Illuminate\Support\Facades\Log::info([$notification]);
        //////////////////////////////////////////////////////
    }

    /**
     * get notification body by type and replace Variables
     * @param type $type
     * @param type $params
     * @author Ahmad Hajeer
     */
    public function getNotificationBody($type, $params)
    {
        $notificationBody = null;
        // get notification body by type
        $notificationTypeInfo = NotificationType::select("body", "title", 'link')->where("id", "=", $type)->first();

        // loop over type params and replace variables
        foreach (self::TYPES_VARIABLES[$type] as $key => $typeParam) {
            if (isset($params[$typeParam])) {
                // replace body variables with the value in the params
                if ($typeParam == 'post_body') {
                    $prm = '
                             " ';
                    $prm = $prm . substr($params[$typeParam], 0, 50);
                    $prm = $prm . ' ..." ';
                } else {
                    $prm = $params[$typeParam];
                }
                $notificationBody['body']     = str_replace($key, $prm, $notificationTypeInfo['body']);
                $notificationTypeInfo['body'] = $notificationBody['body'];
            }
        }

        $notificationBody['title'] = $notificationTypeInfo['title'];
        // get on click redirect link
        $redirectParams                   = self::REDIRECT_VARIABLES[$type];
        $redirectId                       = $redirectParams['id'];
        $notificationBody['click_action'] = "/" . str_replace(':redirect_id:', $params[$redirectId], $notificationTypeInfo['link']);
        $notificationBody['created_at']   = date("Y-m-d H:i:s");
        return $notificationBody;
    }
    /**
     * generate notifications objects depending on body and the targeted users
     * @param type $type
     * @param type $notificationBody
     * @author Ahmad Hajeer
     */
    public function generateNotificationObjects($type, $notificationTitle, $notificationBody, $notificationIcon, $notificationLink, $notificationTime, $params)
    {
        $notificationObject                 = array();
        $notificationObject['type']         = $type;
        $notificationObject['title']        = $notificationTitle;
        $notificationObject['body']         = $notificationBody;
        $notificationObject['icon']         = $notificationIcon;
        $notificationObject['click_action'] = $notificationLink;
        $notificationObject['created_at']   = $notificationTime;
        $this->addRedirectParrams($notificationObject, $params, $type);
        return $notificationObject;
    }
    /**
     * get the targeted users for each post type
     *
     * @param type $type
     * @param type $params
     * @return array
     * @author Ahmad Hajeer
     */
    public function getNotificationTargets($type, $params)
    {
        // check the type of the notification to get targetted users
        switch ($type) {
            case self::POST_NOTIFICATION_TYPE:
                // get user followers
                $friends = new \App\Models\friends();
                $targets = $friends->getFollowersTokens($params['user_id']);

                break;
            case self::POST_COMMENT_NOTIFICATION_TYPE:
            case self::POST_EMOTION_NOTIFICATION_TYPE:
                // get post ouner
                $post    = new \App\Models\post();
                $targets = $post->getPostOunerToken($params['post_id'], $params['user_id']);
                break;

            case self::FOLLOW_USER_NOTIFICATION_TYPE:
                // get followed user
                $userToken = new \App\Models\UserToken();
                $targets   = $userToken->getUserTokens($params['followed_user_id']);
                break;

            case self::JOIN_GROUP_REQUEST_NOTIFICATION_TYPE:
            case self::JOINED_GROUP_NOTIFICATION_TYPE:
            case self::GROUP_POST_PERMISSION_NOTIFICATION_TYPE:
                // get group admin
                $targets = array();
                break;

            case self::GROUP_POST_NOTIFICATION_TYPE:
                // get group users
                $targets = array();
                break;

            case self::GROUP_POST_COMMENT_NOTIFICATION_TYPE:
            case self::GROUP_POST_EMOTION_NOTIFICATION_TYPE:
                // get group post ouner
                $targets = array();
                break;

            case self::VC_POST_NOTIFICATION_TYPE:
            case self::ADDED_EXAM_NOTIFICATION_TYPE:
            case self::EDITED_EXAM_NOTIFICATION_TYPE:
            case self::DELETED_EXAM_NOTIFICATION_TYPE:
            case self::ADDED_HW_NOTIFICATION_TYPE:
            case self::EDITED_HW_NOTIFICATION_TYPE:
            case self::DELETED_HW_NOTIFICATION_TYPE:
            case self::ADDED_CLASS_ATTACMENT_NOTIFICATION_TYPE:
                // get VC users
                $virtualClass = new \App\Models\virtualclass();
                $targets      = $virtualClass->getClassUsersTokens($params['class_id'], $params['user_id']);
                break;

            case self::VC_POST_COMMENT_NOTIFICATION_TYPE:
            case self::VC_POST_EMOTION_NOTIFICATION_TYPE:
                // get VC post ouner
                $vcPost  = new \App\Models\classpost();
                $targets = $vcPost->getPostOwnerToken($params['post_id'], $params['user_id']);
                break;

            case self::ADDED_EXAM_COMMENT_NOTIFICATION_TYPE:
            case self::ADDED_HW_COMMENT_NOTIFICATION_TYPE:
            case self::ADDED_CLASS_ATTACMENT_COMMENT_NOTIFICATION_TYPE:
                // get VC teacher
                $virtualClass = new \App\Models\virtualclass();
                $targets      = $virtualClass->getClassTeacherToken($params['class_id'], $params['user_id']);
                break;
        }
        return $targets;
    }
    /**
     * save users notifications in the db
     * @param type $notificationBody
     * @param type $notificationTargets
     * @author Ahmad Hajeer
     */
    public function saveNotification($userId, $notificationTargets, $notificationObject)
    {
        $insertObjects = array();
        $uniqueTargets = array();
        // loop over the users to create query rows
        foreach ($notificationTargets as $notificationTarget) {
            if (!empty($notificationTarget['user_id']) && !in_array($notificationTarget['user_id'], $uniqueTargets)) {
                $uniqueTargets[]               = $notificationTarget['user_id'];
                $notification                  = array();
                $notification['sender_id']     = $userId;
                $notification['receiver_id']   = $notificationTarget['user_id'];
                $notification['body']          = $notificationObject['body'];
                $notification['title']         = $notificationObject['title'];
                $notification['type_id']       = $notificationObject['type'];
                $notification['redirect_type'] = $notificationObject['redirect_type'];
                $notification['redirect_id']   = $notificationObject['redirect_id'];
                $notification['icon']          = $notificationObject['icon'];
                $notification['link']          = $notificationObject['click_action'];
                //            $notification['created_at'] = $notificationObject['created_at'];
                $insertObjects[] = $notification;
            }
        }
        \App\Models\notification::insert($insertObjects);
    }
    /**
     *
     * @param type $usersObjects
     * @author Ahmad Hajeer
     */
    public function getTokensFromUsersObjects($usersObjects)
    {
        $tokensArray = array();
        foreach ($usersObjects as $usersObject) {
            if (!empty($usersObject['token'])) {
                $tokensArray[] = $usersObject['token'];
            }
        }
        return $tokensArray;
    }
    /**
     *
     * @param type $notificationObject
     * @param type $params
     * @param type $type
     * @author Ahmad Hajeer
     */
    public function addRedirectParrams(&$notificationObject, $params, $type)
    {
        $notificationObject['redirect_type'] = self::REDIRECT_VARIABLES[$type]['redirect_type'];
        $notificationObject['redirect_id']   = $params[self::REDIRECT_VARIABLES[$type]['id']];
    }

    public function updateUserToken($userId, $token, $action, $platform, $sessionId)
    {
        // delete old user token
        \App\Models\UserToken::where("user_id", $userId)->where("platform", $platform)->where("session_id", $sessionId)->delete();
        \App\Models\UserToken::where("token", $token)->delete();
        // insert the new token
        $userToken                   = new \App\Models\UserToken;
        $userToken->token            = $token;
        $userToken->service_provider = self::NOTIFICATIONS_SERVICE_PROVIDER;
        $userToken->user_id          = $userId;
        $userToken->platform         = $platform;
        $userToken->action           = $action;
        $userToken->session_id       = $sessionId;
        $userToken->save();
        return $token;
    }
}
