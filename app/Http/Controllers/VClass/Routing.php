<?php

namespace App\Http\Controllers\VClass;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Vclass\parts\Mark;
use App\Http\Controllers\VClass\VClass;
use Illuminate\Http\Request;

class Routing extends Controller {
    /* This Function To Prepare The Link For VClass Function */
    public function vClass(Request $r, $action, $classId, $part = 'main', $partId = 'all', $skip = 0, $take = 10) {
        switch ($action) {
        case 'post':
            $VC = (new \App\Http\Controllers\Social\posts('vc', null, null, $classId, $partId));
            return response()->success($VC);
            break;
        case 'set':
            $r->id = $classId;
            $VC    = (new VClass($r, $action, $classId, $part, $partId))->adding($r);
            if ($part == 'file' || $part == 'files') {
                return response()->success($VC['files']);
            }
            if ($part == 'post' || $part == 'exam' || $part == 'mark' || $part == 'homework' || $part == 'homeWork') {
                return response()->success($VC);
            }
            return response()->success($VC->result);
            break;
        case 'get':
            if ($part == 'user') {
                return (new VClass($r->all(), $action, $classId, $part, $partId))->user($skip, $take);
            }
            $VC = (new VClass($r->all(), $action, $classId, $part, $partId))->get($skip, $take);
            return response()->success($VC->result);
            break;
        case 'solo':
            $VC = (new VClass($r->all(), $action, $classId, $part, $partId))->one();
            return response()->success($VC->result);
            break;
        case 'edit':
            $VC = (new VClass($r->all(), $action, $classId, $part, $partId))->editing($r);
            return response()->success($VC);
            break;
        case 'delete':
            if ($part == 'main') {
                return (new VClass($r->all(), $action, $classId, $part, $partId))->deleting($classId);
            }
            $VC = (new VClass($r->all(), $action, $classId, $part, $partId))->deleting($r->id);

            return response()->success($VC);
            break;
        case 'upload':
            $VC = (new VClass($r->all(), $action, $classId, $part, $partId))->uploading($partId);
            return response()->success($VC->result);
            break;
        case 'requests':
            $VC = (new VClass($r->all(), $action, $classId, 'main', $partId))->requests($r);
            return response()->success($VC);
            break;
        case 'attendance':
            $VC = (new VClass($r->all(), $action, $classId, $action, $partId))->$action->$part($r, $partId, $skip, $take);
            return response()->success($VC);
            break;
        case 'homeWork':
            $VC = (new VClass($r->all(), $action, $classId, $action, $partId))->$action->$part($r, $partId, $skip, $take);
            return response()->success($VC);
            break;
        case 'accept':
            $VC = (new VClass($r->all(), $action, $classId, 'main', $partId))->accept($r);
            return response()->success($VC);
            break;
        case 'add':
            $VC = (new VClass($r->all(), $action, $classId, 'main', $partId))->main->addUserByInsrtructor($r);
            return response()->success($VC);
            break;
        case 'enter':
            $VC = (new VClass($r->all(), $action, $classId, 'main', $partId))->entering($r);
            return response()->success($VC);
            break;
        case 'leave':
            $VC = (new VClass($r->all(), $action, $classId, $part))->leaving($r);
            return response()->success($VC);
            break;
        case 'search':
            $VC = (new VClass($r->all(), $action, $classId, 'main'))->searching($part, $classId);
            return response()->success($VC);
            break;
        case 'addMarks':
            $r->id = $classId;
            $VC    = (new Mark($classId, $partId))->addMarks($r);
            return response()->success($VC);
            break;
        case 'archiving':
            $VC = (new VClass($r->all(), null, $classId, 'main'))->main->archiving();
            return response()->success($VC);
            break;
        case 'activating':
            $VC = (new VClass($r->all(), null, $classId, 'main'))->main->activating();
            return response()->success($VC);
            break;
        case 'remove':
            $VC = (new VClass($r->all(), 'delete', $classId, 'main'))->main->remove($r);
            return response()->success($VC);
            break;

        }
    }
}
