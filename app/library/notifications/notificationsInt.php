<?php

/**
 * define notifications types
 * mark the notifications bodies variables
 * 
 * @author ahmadhajeer
 */

namespace App\library\notifications;

interface notificationsInt {
    
    const NOTIFICATIONS_SERVICE_PROVIDER = "firebase";
    
    // wall post notifications types
    const POST_NOTIFICATION_TYPE = 1;
    const POST_COMMENT_NOTIFICATION_TYPE = 2;
    const POST_EMOTION_NOTIFICATION_TYPE = 4;
    // follow notifications types
    const FOLLOW_USER_NOTIFICATION_TYPE = 3;
    //groups notifications types
    const JOIN_GROUP_REQUEST_NOTIFICATION_TYPE = 44;
    const JOINED_GROUP_NOTIFICATION_TYPE = 66;
    const GROUP_POST_NOTIFICATION_TYPE = 77;
    const GROUP_POST_COMMENT_NOTIFICATION_TYPE = 88;
    const GROUP_POST_EMOTION_NOTIFICATION_TYPE = 99;
    const GROUP_POST_PERMISSION_NOTIFICATION_TYPE = 100;
    
    // virtual classes notifications types
    const ADDED_CLASS_NOTIFICATION_TYPE = 111;
    const VC_POST_NOTIFICATION_TYPE = 5;
    const VC_POST_COMMENT_NOTIFICATION_TYPE = 6;
    const VC_POST_EMOTION_NOTIFICATION_TYPE = 13;
    const ADDED_EXAM_NOTIFICATION_TYPE = 11;
    const ADDED_EXAM_COMMENT_NOTIFICATION_TYPE = 12;
    const EDITED_EXAM_NOTIFICATION_TYPE = 14;
    const DELETED_EXAM_NOTIFICATION_TYPE = 18;
    // homeworks notifications types
    const ADDED_HW_NOTIFICATION_TYPE = 9;
    const ADDED_HW_COMMENT_NOTIFICATION_TYPE = 10;
    const EDITED_HW_NOTIFICATION_TYPE = 15;
    const DELETED_HW_NOTIFICATION_TYPE = 22;
    // attachments notifications types
    const ADDED_CLASS_ATTACMENT_NOTIFICATION_TYPE = 7;
    const ADDED_CLASS_ATTACMENT_COMMENT_NOTIFICATION_TYPE = 8;
    
    // array to link between notification body variable
    // and the expected values key
    const TYPES_VARIABLES = array(
        self::POST_NOTIFICATION_TYPE => array(
            ":USER:" => "user_name",
            ":POST_BODY:" => "post_body"
        ),
        self::POST_COMMENT_NOTIFICATION_TYPE => array(
            ":USER:" => "user_name"
        ),
        self::POST_EMOTION_NOTIFICATION_TYPE => array(
            ":USER:" => "user_name",
            ":EMOTION:" => "emotion"
        ),
        self::FOLLOW_USER_NOTIFICATION_TYPE => array(
            ":USER:" => "user_name"
        ),
        self::JOIN_GROUP_REQUEST_NOTIFICATION_TYPE => array(
            ":USER:" => "user_name",
            ":GROUP_NAME:" => "group_name"
        ),
        self::JOINED_GROUP_NOTIFICATION_TYPE => array(
            ":USER:" => "user_name",
            ":GROUP_NAME:" => "group_name"
        ),
        self::GROUP_POST_NOTIFICATION_TYPE => array(
            ":USER:" => "user_name",
            ":GROUP_NAME:" => "group_name"
        ),
        self::GROUP_POST_COMMENT_NOTIFICATION_TYPE => array(
            ":USER:" => "user_name",
            ":GROUP_NAME:" => "group_name"
        ),
        self::GROUP_POST_EMOTION_NOTIFICATION_TYPE => array(
            ":USER:" => "user_name",
            ":GROUP_NAME:" => "group_name",
            ":EMOTION:" => "emotion"
        ),
        self::GROUP_POST_PERMISSION_NOTIFICATION_TYPE => array(
            ":USER:" => "user_name",
            ":GROUP_NAME:" => "group_name"
        ),
        self::VC_POST_NOTIFICATION_TYPE => array(
            ":USER:" => "user_name",
            ":CLASS_NAME:" => "class_name",
            ":POST_BODY:" => "post_body"
        ),
        self::VC_POST_COMMENT_NOTIFICATION_TYPE => array(
            ":USER:" => "user_name",
            ":CLASS_NAME:" => "class_name"
        ),
        self::VC_POST_EMOTION_NOTIFICATION_TYPE => array(
            ":USER:" => "user_name",
            ":EMOTION:" => "emotion"
        ),
        self::ADDED_EXAM_NOTIFICATION_TYPE => array(
            ":CLASS_NAME:" => "class_name",
            ":DATE:" => "exam_date",
            ":TIME:" => "exam_time",
            ":HALL:" => "exam_hall"
        ),
        self::ADDED_EXAM_COMMENT_NOTIFICATION_TYPE => array(
            ":USER:" => "user_name",
            ":CLASS_NAME:" => "class_name"
        ),
        self::EDITED_EXAM_NOTIFICATION_TYPE => array(
            ":TYPE:" => "exam_type",
            ":CLASS_NAME:" => "class_name"
        ),
        self::DELETED_EXAM_NOTIFICATION_TYPE => array(
            ":TYPE:" => "exam_type",
            ":CLASS_NAME:" => "class_name"
        ),
        self::ADDED_HW_NOTIFICATION_TYPE => array(
            ":CLASS_NAME:" => "class_name"
        ),
        self::ADDED_HW_COMMENT_NOTIFICATION_TYPE => array(
            ":USER:" => "user_name",
            ":CLASS_NAME:" => "class_name"
        ),
        self::EDITED_HW_NOTIFICATION_TYPE => array(
            ":USER:" => "user_name",
            ":CLASS_NAME:" => "class_name"
        ),
        self::DELETED_HW_NOTIFICATION_TYPE => array(
            ":USER:" => "user_name",
            ":CLASS_NAME:" => "class_name"
        ),
        self::ADDED_CLASS_ATTACMENT_NOTIFICATION_TYPE => array(
            ":USER:" => "user_name",
            ":CLASS_NAME:" => "class_name"
        ),
        self::ADDED_CLASS_ATTACMENT_COMMENT_NOTIFICATION_TYPE => array(
            ":USER:" => "user_name",
            ":CLASS_NAME:" => "class_name"
        ),
        self::ADDED_CLASS_NOTIFICATION_TYPE => array(
            ":USER:" => "user_name",
            ":CLASS_NAME:" => "class_name"
        ),
    );
    
    
    const REDIRECT_VARIABLES = array(
        self::POST_NOTIFICATION_TYPE => array(
            "id" => "post_id",
            "redirect_type" => "post" 
        ),
        self::POST_COMMENT_NOTIFICATION_TYPE => array(
            "id" => "post_id",
            "redirect_type" => "post" 
        ),
        self::POST_EMOTION_NOTIFICATION_TYPE => array(
            "id" => "post_id",
            "redirect_type" => "post" 
        ),
        self::FOLLOW_USER_NOTIFICATION_TYPE => array(
            "id" => "user_id",
            "redirect_type" => "user" 
        ),
        self::JOIN_GROUP_REQUEST_NOTIFICATION_TYPE => array(
           
        ),
        self::JOINED_GROUP_NOTIFICATION_TYPE => array(
            
        ),
        self::GROUP_POST_NOTIFICATION_TYPE => array(
            
        ),
        self::GROUP_POST_COMMENT_NOTIFICATION_TYPE => array(
            
        ),
        self::GROUP_POST_EMOTION_NOTIFICATION_TYPE => array(
            
        ),
        self::GROUP_POST_PERMISSION_NOTIFICATION_TYPE => array(
            
        ),
        self::VC_POST_NOTIFICATION_TYPE => array(
            "id" => "post_id",
            "redirect_type" => "classpost" 
        ),
        self::VC_POST_COMMENT_NOTIFICATION_TYPE => array(
            "id" => "post_id",
            "redirect_type" => "classpost" 
        ),
        self::VC_POST_EMOTION_NOTIFICATION_TYPE => array(
            "id" => "post_id",
            "redirect_type" => "classpost" 
        ),
        self::ADDED_EXAM_NOTIFICATION_TYPE => array(
            "id" => "exam_id",
            "redirect_type" => "classexam" 
        ),
        self::ADDED_EXAM_COMMENT_NOTIFICATION_TYPE => array(
            "id" => "post_id",
            "redirect_type" => "classexam" 
        ),
        self::EDITED_EXAM_NOTIFICATION_TYPE => array(
            "id" => "exam_id",
            "redirect_type" => "classexam" 
        ),
        self::DELETED_EXAM_NOTIFICATION_TYPE => array(
            
        ),
        self::ADDED_HW_NOTIFICATION_TYPE => array(
            "id" => "homework_id",
            "redirect_type" => "classhomework" 
        ),
        self::ADDED_HW_COMMENT_NOTIFICATION_TYPE => array(
            "id" => "homework_id",
            "redirect_type" => "classhomework" 
        ),
        self::EDITED_HW_NOTIFICATION_TYPE => array(
            "id" => "homework_id",
            "redirect_type" => "classhomework" 
        ),
        self::DELETED_HW_NOTIFICATION_TYPE => array(
            
        ),
        self::ADDED_CLASS_ATTACMENT_NOTIFICATION_TYPE => array(
            "id" => "post_id",
            "redirect_type" => "classfile" 
        ),
        self::ADDED_CLASS_ATTACMENT_COMMENT_NOTIFICATION_TYPE => array(
            "id" => "post_id",
            "redirect_type" => "classfile" 
        ),
        self::ADDED_CLASS_NOTIFICATION_TYPE => array(
            
        ),
    );
}
