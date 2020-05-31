<?php

namespace App\Http\Controllers\Routing;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Social\posts;
use Illuminate\Http\Request;

class SocialController extends Controller
{
    public function index(Request $r, $action, $place, $part, $id = null, $skip = 0, $take = 10, $tk2 = 10)
    {
        return response()->success($this->$part($r, $action, $place, $id, $skip, $take, $tk2));
    }

    public function __call($method, $arguments)
    {
        return ["result" => "erorr in part ", "sucess" => false];
    }
    public function post($r, $action, $place, $id = null, $skip = 0, $take = 10, $tk2 = 10)
    {
        switch ($action) {
            case 'set':
                return (new posts($place, $id, $r->type, null))->post->adding($r);
            case 'get':
                $skip = ($skip === 0) ? 0 : $skip;
                if ($skip === 'solo') {
                    return (new posts($place, $id, null, $take))->post->one($take);
                } elseif ($skip === 'image' || $skip === 'video' || $skip === 'text' || $skip === 'url') {
                    return (new posts($place, null, $skip, $id))->post->reading($take, $tk2)->get();
                } else {
                    return (new posts($place, $id, null))->post->reading($skip, $take)->get();
                }
                break;
            case 'edit':
                return (new posts($place, $id, null))->post->update($r);
                break;
            case 'delete':
                return (new posts($place, $id, null))->post->deleting($r);
                break;
        }
    }
    /* to control all comment function */
    public function comment($r, $action, $place, $id = null, $skip = 0, $take = 10, $tk2 = 10)
    {
        switch ($action) {
            case 'set':
                return (new posts($place, null, null, $id))->post->addComment($r);
                break;
            case 'get':
                return (new posts($place, null, null, $id))->post->commenting($id, $skip, $take);
                break;
            case 'delete':
                return (new posts($place, null, null, $id))->post->commentDelete($r);
                break;
        }
    }
    /* to control all exp function */
    public function exprission($r, $action, $place, $id = null, $skip = 0, $take = 10, $tk2 = 10)
    {

        return (new posts($place, null, null, $id))->post->$action($id, $skip);

    }
}
