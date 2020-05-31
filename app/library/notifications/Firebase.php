<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Firebase
 *
 * @author ahmadhajeer
 */
namespace App\library\notifications;
class Firebase implements FirebaseInt{
    //put your code here
    
    public static $instance = NULL;

    public static function getInstance() {
        if (self::$instance == null) {
            self::$instance = new Firebase();
        }
        return self::$instance;
    }

    /**
     * 
     * @param type $targets
     * @param type $body
     * @author Ahmad Hajeer
     */
    public function firebaseNotification($targets, $notificationObj){
        if(!empty($targets)){
            $notification = $this->generateFirebaseRequestObject($targets, $notificationObj);
            $sendNotification = $this->firebaseRequest($notification);
            return $this->checkNotificationResponse($sendNotification);
        }else{
            return 'empty targets list';
        }
    }
    /**
     * 
     * @param type $notificationObject
     * @author Ahmad Hajeer
     */
    public function firebaseRequest($notificationObject){
      
        $data_string = json_encode($notificationObject);     
 
        $ch = curl_init(self::FCM_SREVICE_IP);                                                                      
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");                                                                     
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);                                                                  
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);                                                                      
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(                                                                          
            'Content-Type: application/json',                                                                                
            'Content-Length: ' . strlen($data_string),
            'Authorization:'.'key='.self::SERVRER_KEY)                                                                       
        );                                                                                                                   

        $result = curl_exec($ch);
        $info = curl_getinfo($ch);
        curl_close ($ch);
        return [$info, $result, $notificationObject];
    }
    /**
     * 
     * @param type $targets
     * @param type $notificationObj
     * @author Ahmad Hajeer
     */
    public function generateFirebaseRequestObject($targets, $notificationObj){
        $notification = array();
        $targetsCount = count($targets);
        if($targetsCount > 1){
            $notification['registration_ids'] = $targets;
        }elseif (count($targets) == 1) {
            $notification['to'] = $targets[0];
        }else{
            // return empty targets error
        }
        $notification['notification'] = $notificationObj;
        $notification['data'] = $notificationObj;
        return $notification;
    }
    /**
     * 
     * @param type $response
     */
    public function checkNotificationResponse($response){
        return $response;
    }
}
