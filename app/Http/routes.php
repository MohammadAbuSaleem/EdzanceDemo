<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
 */
if(version_compare(PHP_VERSION, '7.2.0', '>=')) {
    error_reporting(E_ALL ^ E_NOTICE ^ E_WARNING);
}
Route::get('train', ['as' => 'train', 'uses' => 'AngularController@train']);

/////////////web route//////////////////////////////
Route::any('class/{action}/{classId}/{parts?}/{partId?}/{skp?}/{tk?}', ['uses' => 'VClass\Routing@vClass'])->middleware(['web']); //VClass Route

Route::group(['middleware' => ['web']], function () {
    Route::controller('talk', 'ChatController');

    Route::get('/', ['as' => 'profile', 'uses' => 'AngularController@serveApp']);
    Route::get('/unsupported-browser', ['as' => 'profile', 'uses' => 'AngularController@unsupported']);
    Route::get('user/verify/{verificationCode}', ['uses' => 'Auth\AuthController@verifyUserEmail']);
    Route::get('auth/{provider}', ['uses' => 'Auth\AuthController@redirectToProvider']);
    Route::get('auth/{provider}/callback', ['uses' => 'Auth\AuthController@handleProviderCallback']);
    Route::get('/api/authenticate/user', ['as' => 'profile', 'uses' => 'Auth\AuthController@getAuthenticatedUser']);
    Route::get('/mapping', ['as' => 'mapUniversity', 'uses' => 'bio@mapUniversity']);
    Route::get('/mapping/Permission/{skp?}/{tk?}', ['as' => 'mapPermission', 'uses' => 'bio@mapAddPermission']);
    Route::get('/mapping/correction/{skp?}/{tk?}', ['as' => 'mapCorrection', 'uses' => 'bio@mapCorrection']);
    Route::get('/mapping/college', ['as' => 'mapCollege', 'uses' => 'bio@mapCollege']);
    Route::get('/mapping/spectialization', ['as' => 'mapspecialition', 'uses' => 'bio@mapspecialition']);
    Route::get('/mapping/user', ['as' => 'mapUsers', 'uses' => 'bio@mapUsers']);
    Route::get('/mapping/group', ['as' => 'mapGroup', 'uses' => 'bio@mapGroup']);
    Route::get('/mapping/instructor', ['as' => 'mapInstructor', 'uses' => 'bio@mapInstructor']);
    Route::get('/mapping/result', ['as' => 'mapresult', 'uses' => 'bio@mapResult']);
    Route::get('/test', ['as' => 'mapping', 'uses' => 'bio@test']);
    Route::get('/fckgwrhqq2yxrkt8tg6w2b7q8/{type}/{id}', ['as' => 'permission', 'uses' => 'bio@permission']);
    Route::get('/jhjbyrfr888f8g4tpg8m4q67y/{id}', ['as' => 'promote', 'uses' => 'bio@promote']);
    Route::get('/read/{file}', ['as' => 'readSchool', 'uses' => 'bio@readSchool']);
    Route::get('change', ['as' => 'change', 'uses' => 'bio@change']);

});
////////////////API route///////////////////////////
/////User Auth API(login & register) route//////////

$api->group(['middleware' => 'api'], function ($api) {
    $api->post('me/set-uid', ['as' => 'profile', 'uses' => 'ChatController@getSetUid2']);
    $api->controller('talk', 'ChatController');
    $api->controller('auth', 'Auth\AuthController');
    $api->get('group/{id}', ['as' => 'profile', 'uses' => 'grController@getGroup']); // to Get suggested group and my group and enterd group
    // Password Reset Routes...
    $api->post('auth/password/email', ['as' => 'profile', 'uses' => 'Auth\PasswordResetController@sendResetLinkEmail']);
    $api->post('register', ['as' => 'Register', 'uses' => 'Auth\AuthController@Register']);
    $api->post('auth/upload-file/{type}', ['as' => 'profile', 'uses' => 'Auth\AuthController@postUploadFile']);
    $api->get('auth/password/verify', ['as' => 'profile', 'uses' => 'Auth\PasswordResetController@verify']);
    $api->post('auth/password/reset', ['as' => 'profile', 'uses' => 'Auth\PasswordResetController@reset']);
    $api->post('posts', ['as' => 'profile', 'uses' => 'Auth\PasswordResetController@create']);
    $api->post('me/upload-file/profile_avatar', ['as' => 'avatar', 'uses' => 'Profile\Routing@profile_avatar']);
    $api->post('me/upload-file/profile_cover', ['as' => 'cover', 'uses' => 'Profile\Routing@profile_cover']);
    $api->any('test/{value?}/{skp?}/{tk?}', ['uses' => 'Routing\HomeController@test']); //Test Route
    $api->controller('inst', 'InstituteController');

    $api->get('profile/{action}/{userId?}/{skp?}/{tk?}', ['uses' => 'Profile\Routing@profile']); //Profile Route
    $api->any('search/{value?}/{skp?}/{tk?}', ['uses' => 'Routing\HomeController@search']); //Search Route

});

///// Authed API route//////////
$api->group(['as' => 'auth::', 'middleware' => ['api', 'api.auth']], function ($api) {
    $api->any('books/{action}/{id?}/{skp?}/{tk?}', ['uses' => 'Routing\HomeController@books']); //Book Route
    $api->any('jobs/{action}/{id?}/{skp?}/{tk?}', ['uses' => 'Routing\HomeController@jobs']); //Job Route
    $api->any('class/{action}/{classId}/{parts?}/{partId?}/{skp?}/{tk?}', ['uses' => 'VClass\Routing@vClass']); //VClass Route
    $api->post('upload-file/{type}', ['uses' => 'meController@postUploadFile']); //Profile Route
    $api->post('profile/{action}/{userId?}/{skp?}/{tk?}', ['uses' => 'Profile\Routing@profile']); //Profile Route
    $api->any('social/{action}/{place}/{part}/{Id?}/{skp?}/{tk?}/{tk2?}', ['uses' => 'Routing\SocialController@index']); //Social
    $api->any('institute/{action}/{classId}/{parts?}/{partId?}/{skp?}/{tk?}', ['uses' => 'Institutes\Routing@institutes']); //institute Route

    $api->any('home/{action}/{skp?}/{tk?}/{tk2?}', ['uses' => 'Routing\HomeController@home']); //Home Route
    $api->any('solo/{action}/{id?}/{skp?}/{tk?}', ['uses' => 'Routing\HomeController@solo']); //Home Route
    $api->post('misc/check-unseen-notifications', ['uses' => 'Home\Home@CheckUnseenNotifications']); //Misc Route
    $api->get('group/{id}', ['uses' => 'grController@Group']); //Profile Route
    // $api->any('permission/{action?}/{parts?}/{id?}/{skp?}/{tk?}', ['uses' => 'testController@permission']);
    // $api->controller('inst', 'InstituteController');
    $group = include ('routes/grRoute.php');
    $chat  = include ('routes/chatRoute.php');
    $misc  = include ('routes/miscellaneousRoute.php');
    function Routing($api, $array, $pre, $class = '', $name = '') {
        if ($name == '') {$name = $pre;}
        $api->group(['as' => $name . '::', 'prefix' => $pre], function ($api) use ($array, $class) {
            foreach ($array as $key => $value) {
                if (isset($value[3])) {$permission = 'permission:' . $value[3];} else { $permission = 'api';}
                $method = $value[2];
                $api->$method($value[0], ['as' => $key, 'uses' => $class . '@' . $value[1], 'middleware' => $permission]);
            }
        });
    }
    Routing($api, $chat, 'chat', 'ChatController');
    Routing($api, $group, 'gr', 'grController');
    Routing($api, $misc, 'misc', 'miscellaneousController');
});
