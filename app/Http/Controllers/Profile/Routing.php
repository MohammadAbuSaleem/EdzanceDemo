<?php

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Members\Members;
use App\Http\Controllers\Profile\Profile;
use Illuminate\Http\Request;

class Routing extends Controller
{
    /* to make a link for profile function */
    public function profile(Request $r, $action, $userId = 0, $skip = 0, $take = 10)
    {
        switch ($action) {
            case 'post':
                $VC = (new \App\Http\Controllers\Social\posts('profile', null, null, $userId, null));
                return response()->success($VC->post->get($skip, $take));
                break;
            case 'header':
                $ProfileHeader = Profile::getInstance()->ProfileHeader($userId);
                return response()->success($ProfileHeader);
                break;
            case 'wall':
                $ProfileWall = Profile::getInstance()->ProfileWall($userId);
                return response()->success($ProfileWall);
                break;
            case 'cv':
                $ProfileCv = Profile::getInstance()->ProfileCv($userId);
                return response()->success($ProfileCv);
                break;
            case 'countries-list':
                $GetCountriesList = Profile::getInstance()->CountriesList();
                return response()->success($GetCountriesList);
                break;
            case 'add-information':
                $permissions = (new members(['Request' => $r, 'action' => 'addInformation', 'user_id' => \Auth::user()->id]));
                return response()->success($permissions->roles);
                break;
            case 'add-history':
                $addHistory = Profile::getInstance()->addHistory();
                return response()->success($addHistory);
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
            case 'available-time':
                $UpdateAvailableTime = Profile::getInstance()->UpdateAvailableTime($r);
                return response()->success($UpdateAvailableTime);
                break;
            case 'add-instructor-free-Hours':
                $AddInstructorFreeHours = Profile::getInstance()->AddInstructorFreeHours($r);
                return response()->success($AddInstructorFreeHours);
                break;
            case 'get-instructor-free-hours':
                $GetInstructorFreeHours = Profile::getInstance()->GetInstructorFreeHours();
                return response()->success($GetInstructorFreeHours);
                break;
            case 'delete-instructor-education':
                $DeleteInstructorEducation = Profile::getInstance()->DeleteInstructorEducation($r);
                return response()->success($DeleteInstructorEducation);
                break;
            case 'update-instructor-education':
                $UpdateInstructorEducation = Profile::getInstance()->UpdateInstructorEducation($r);
                return response()->success($UpdateInstructorEducation);
                break;
            case 'delete-free-hours':
                $DeleteFreeHours = Profile::getInstance()->DeleteFreeHours($r);
                return response()->success($DeleteFreeHours);
                break;
            case 'add-instructor-education':
                $AddInstructorEducation = Profile::getInstance()->AddInstructorEducation($r);
                return response()->success($AddInstructorEducation);
                break;
            case 'sec':
                $Sec = Profile::getInstance()->Sec($r);
                return response()->success($Sec);
                break;
            case 'uni':
                $Uni = Profile::getInstance()->Uni($r);
                return response()->success($Uni);
                break;
            case 'other':
                $Other = Profile::getInstance()->Other($r);
                return response()->success($Other);
                break;
            case 'changecover':
                $path = Profile::getInstance()->ChangeCover($r);
                return response()->success($path);
                break;
            case 'changeavatar':
                $changeav = Profile::getInstance()->ChangeAvatar($r);
                return response()->success($changeav);
                break;
            case 'contact':
                $Contact = Profile::getInstance()->Contact($r);
                return response()->success($Contact);
                break;
            case 'inf':
                $Inf = Profile::getInstance()->Inf($r);
                return response()->success($Inf);
                break;
            case 'followers':
                $followers = Profile::getInstance()->followers($userId, $skip, $take);
                return response()->success($followers);
                break;
            case 'friends':
                $friends = Profile::getInstance()->friends($userId, $skip, $take);
                return response()->success($friends);
                break;
            case 'classes':
                $classes = Profile::getInstance()->classes($userId, $skip, $take);
                return response()->success($classes);
                break;
            case 'image':
                $post = (new \App\Http\Controllers\Social\posts('profile', null, 'image', $id))->post->reading($skip, $take)->get();
                return response()->success($post);
                break;
            case 'video':
                $post = (new \App\Http\Controllers\Social\posts('profile', null, 'video', $id))->post->reading($skip, $take)->get();
                return response()->success($post);
                break;
        }
    }
    public function profileAvatar(Request $r)
    {
        $a = Profile::getInstance()->ChangeAvatar($r);
        return response()->success($a);
    }

    public function profileCover(Request $r)
    {
        $path = Profile::getInstance()->ChangeCover($r);
        return response()->success($path);
    }
}
