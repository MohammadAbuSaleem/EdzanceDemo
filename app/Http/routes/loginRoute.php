<?php
return [
	'me'             =>['me'                           ,'getMe' 	                ,'get'  ],
	'RolesAbilities' =>['rolesabilities'               ,'getRolesAbilities'     	,'get'  ],
	'AuthUser'       =>['authenticateduser'		 	   ,'getAuthenticatedUser'      ,'get'  ],
	'search'         =>['search/{val}/{sk}/{tk}'       ,'getSearch' 	            ,'get'  ],
	'Check'          =>['check'                        ,'getCheck'          	    ,'get'  ],
	'logout' 		 =>['logout'                       ,'getLogout'                 ,'get'  ],
	'redirectToPr'   =>['redirecttoprovider'           ,'redirectToProvider'        ,'get'  ],
	'handlePrCall'   =>['handleprovidercallback'       ,'handleProviderCallback'    ,'get'  ],
	'login'          =>['login'                        ,'postLogin'                 ,'post' ],
	'Register'       =>['register'                     ,'postRegister'              ,'post' ],
	'mail'           =>['mail'                         ,'getMail'                   ,'get'  ],
	'ChkRegdEmail'   =>['check-registered-email'       ,'postCheckRegisteredEmail'  ,'post' ],
	'GetCountriesLt' =>['countries-list'          	   ,'getGetCountriesList'       ,'get'  ],
	'SetNotisToken'  =>['setnotificationstoken'        ,'postSetNotificationsToken' ,'post' ],
	'Categoty'       =>['categoty'                     ,'getCategoty'               ,'get'  ],
	'SubCategoty'    =>['subcategoty'                  ,'getSubCategoty'            ,'get'  ],
	'byCountreyId'   =>['by-countrey-id/{c_id}'    	   ,'getByCountreyId'           ,'get'  ],
];