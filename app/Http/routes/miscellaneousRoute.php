<?php
return [
	'search'		=>['srch/{q}/{skp}/{tk}'           ,'search'                        ,'get' ], 
	'suggested'     =>['all-suggested/{sk}/{tk}'       ,'allSuggested'                  ,'get' ], 
	'remail'		=>['remail'				           ,'remail'                        ,'get' ], 
	'check-mail'	=>['check-mail'		               ,'CheckMail'                     ,'post'], 
	'change-mail'   =>['change-mail'	               ,'ChangeMail'                    ,'post'], 
	'report-file'	=>['report-file'                   ,'ReportFile'                    ,'post'], 
	'ContactUsMg'	=>['contactusmessages/{sk}/{tk}'   ,'ContactUsMessages'             ,'get' ], 
	'UserNotif'	    =>['user-notifications/{sk}/{tk}'  ,'UserNotifications'             ,'get' ], 
	'SeenNotif'	    =>['seen-notifications'            ,'SeenNotifications'             ,'post'], 
	'RstNotifToken'	=>['reset-notifications-token'     ,'ResetNotificationsToken'       ,'post'], 
	'post'	        =>['post/{sk}/{tk}'                ,'Post'                          ,'get' ], 
	'postpost'      =>['post'                		   ,'postPost'                      ,'post'], 
	'suggested'	    =>['suggested'                     ,'suggested'                     ,'get' ], 
];

