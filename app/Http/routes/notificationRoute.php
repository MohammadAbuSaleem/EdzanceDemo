<?php
return [
	'unseen-notify' =>['check-unseen-notifications'   ,'postCheckUnseenNotifications' 	  ,'post'],
	'user-notify'   =>['user-notif/{skip}/{take}'     ,'getUserNotification'     	      ,'get' ],
	'seen-notify'   =>['sen-notfcations'		 	  ,'postSeenNotfction'        		  ,'post'],
	'notifi-token'  =>['notif-tokent'                 ,'postResetNotificationsToken' 	  ,'post'],
	'contact-us'    =>['contact-us/{skip}/{take}'     ,'getContactUsMessages'        	  ,'get' ],
	'suggested'		=>['suggest/{skp}/{tk}'           ,'suggested'                    	  ,'get' ],
];