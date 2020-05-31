<?php

namespace App\Http\Controllers\Routing;

use App\Http\Controllers\BookBank\BookBank;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Home\Home;
use App\Http\Controllers\Jobs\Jobs;
use App\Http\Controllers\Members\Members;
use App\Http\Controllers\VClass\VClass;
use App\Models\ContactUs;
use App\Models\virtualclass;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /*Home*/
    public function home(Request $r, $action, $skip = 0, $take = 10, $take2 = null)
    {
        switch ($action) {
            case 'me':
                $me = Home::getInstance()->me();
                return response()->success($me);
                break;
            case 'friend':
                $r->friend = ($skip) ? $skip : $r->friend;
                $r->update = ($take) ? $take : $r->update;
                $friend    = Home::getInstance()->friend($r->friend, $r->update);
                return response()->success($friend);
                break;
            case 'friend-request':
                $r->friend = ($skip) ? $skip : $r->friend;
                $friend    = Home::getInstance()->friendRequest($r->friend);
                return response()->success($friend);
                break;
            case 'friend-requests':
                $r->response = ($skip) ? $skip : $r->response;
                $r->skip     = ($take2) ? $take : 0;
                $r->take     = ($take2) ? $take2 : 10;
                $friend      = Home::getInstance()->friendsRequests($r->response, $r->skip, $r->take);
                return response()->success($friend);
                break;
            case 'friend-response':
                $r->id     = ($skip) ? $skip : $r->id;
                $r->update = ($take) ? $take : $r->update;
                $friend    = Home::getInstance()->friendsResponse($r->id, $r->update);
                return response()->success($friend);
                break;
            case 'friend-remove':
                $r->id  = ($skip) ? $skip : $r->id;
                $friend = Home::getInstance()->friendsRemove($r->id);
                return response()->success($friend);
                break;
            case 'suggest':
                $suggest = Home::getInstance()->suggest();
                return response()->success($suggest);
                break;
            case 'suggest-all':
                $suggestAll = Home::getInstance()->suggestAll($skip, $take);
                return response()->success($suggestAll);
                break;
            case 'notification':
                $notification = Home::getInstance()->UserNotifications($skip, $take);
                return response()->success($notification);
                break;
            case 'seen-notifications':
                $seenNotifications = Home::getInstance()->SeenNotifications($r);
                return response()->success($seenNotifications);
                break;
            case 'reset-notifications-token':
                $ResetNotificationsToken = Home::getInstance()->ResetNotificationsToken($r);
                return response()->success($ResetNotificationsToken);
                break;
            case 'check-unseen-notifications':
                $CheckUnseenNotifications = Home::getInstance()->CheckUnseenNotifications($r);
                return response()->success($CheckUnseenNotifications);
                break;
            case 'addclass':
                $addclass = (new VClass($r))->adding($r);
                return response()->success($addclass);
                break;
            case 'post':
                if (func_num_args() >= 3) {
                    $post = (new \App\Http\Controllers\Social\posts('home'))->post->get($skip, $take);
                } elseif (func_num_args() == 2) {
                    $post = (new \App\Http\Controllers\Social\posts('home'))->post->get(0, 10);
                } else {
                    $post = (new \App\Http\Controllers\Social\posts('home'))->post->get($skip);
                }
                return response()->success($post);
                break;
            case 'contact-us':
                $ContactUs = Home::getInstance()->ContactUs($r);
                return response()->success($ContactUs);
                break;
            case 'contact-us-messages':
                $contactUsMessages = Home::getInstance()->contactUsMessages($skip, $take);
                return response()->success($contactUsMessages);
                break;
            case 'report-file':
                $reportFile = Home::getInstance()->reportFile($r);
                return response()->success($reportFile);
                break;
            case 'add-information':
                $users       = [];
                $permissions = (new members(['Request' => $r, 'action' => 'addInformation', 'user_id' => \Auth::user()->id]));
                $permissions = $permissions->readPermission()->splitPermission();
                // return response()->success($permissions->case);
                $users['level']      = $permissions->level;
                $users['permission'] = ['home' => $permissions->permissions['home'], 'social' => $permissions->permissions['social']];
                return response()->success($users);
                break;
            case 'search-first-institute':
                $search = Home::getInstance()->searchFirstInstitute($skip);
                return response()->success($search);
                break;
            case 'search-main-institute':
                $take   = (func_num_args() > 3) ? $take : 0;
                $search = Home::getInstance()->searchMainInstitute($skip, $take);
                return response()->success($search);
                break;
            case 'enterclass':
                $class = virtualclass::where('class_code', $r->code)->first();
                if (!empty($class)) {

                    $vc = (new VClass($r->all(), 'enter', $class->id, 'main', null))->entering($r);
                    return response()->success($vc);
                    return response()->success(['result' => 'sucess', 'sucess' => true, 'message' => $vc]);
                } else {
                    return response()->success(['result' => 'error', 'sucess' => false, 'message' => 'كود المادة غير صحيح']);
                }
                break;
            case 'classes':
                $classes = (new VClass($r->all(), null, 'main'))->main->classes();
                return response()->success($classes);
                break;
            case 'archived':
                $VC = (new VClass($r->all(), null, 'main'))->main->archived($skip, $take);
                return response()->done($VC);
                break;
            case 'countries-list':
                $countriesList = Home::getInstance()->countriesList();
                return response()->success($countriesList);
                break;
            case 'post-page':
                $post = Home::getInstance()->postPage($postId);
                return response()->success($post);
                break;
        }
    }

    public function search($value = null, $skip = 0, $take = 5)
    {
        if (func_num_args() > 1) {
            $search = Home::getInstance()->searchAll($value, $skip, $take);
        } else { $search = Home::getInstance()->search($value);}
        return response()->success($search);
    }
    public function test(Request $r, $value = null)
    {

        $test = \DB::table('notification')->where('body', 'like', "%$value%")->take(7)->get();
        return response()->success($test);
    }
    /*Book test*/
    public function books(Request $r, $action, $id = null, $skip = 0, $take = 10)
    {
        switch ($action) {
            case 'set':
                $post = BookBank::getInstance()->addBook($r);
                return response()->success($post);
                break;
            case 'get':
                $post = BookBank::getInstance()->getBooks($id, $skip, $take);
                return response()->success($post);
                break;
            case 'edit':
                $post = BookBank::getInstance()->editBook($id, $r);
                return response()->success($post);
                break;
            case 'delete':
                $post = BookBank::getInstance()->deleteBook($r->id);
                return response()->success($post);
                break;
        }
    }
    public function jobs(Request $r, $action, $id = null, $skip = 0, $take = 10)
    {
        switch ($action) {
            case 'set':
                $post = jobs::getInstance()->addJob($r);
                return response()->success($post);
                break;
            case 'get':
                $post = jobs::getInstance()->getJobs($id, $skip, $take);
                return response()->success($post);
                break;
            case 'edit':
                $post = jobs::getInstance()->editJob($id, $r);
                return response()->success($post);
                break;
            case 'delete':
                $post = jobs::getInstance()->deleteJob($r->id);
                return response()->success($post);
                break;
        }
    }

    public function solo(Request $r, $action, $id = null, $skip = 0, $take = 10)
    {
        switch ($action) {
            case 'post':
                $post = (new \App\Http\Controllers\Social\posts('home', $id, null, $id))->post->one($id);
                return response()->success([$post]);
                break;
            case 'classpost':
                $post = (new \App\Http\Controllers\Social\posts('vc', $id, null, $id))->post->one($id);
                return response()->success([$post]);
                break;
            case 'files':
            case 'homework':
            case 'exam':
                $VC = (new VClass($r->all(), 'solo', 'solo', $action, 'solo'))->one($id);
                return response()->success([$VC->result]);
                break;
        }
    }
}
