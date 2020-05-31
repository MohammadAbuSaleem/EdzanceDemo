<?php
namespace App\Http\Controllers\Classes;

use App\Models\request as r;

/**
 *
 */
class Helper
{
    public static function isOks($model = "post", $permission = 'social.post.read', $forigen = null, $keys = ['user_id' => 0])
    {
        $fathers = $model::where('id', '<>', 0);
        foreach ($keys as $key => $value) {
            $fathers = $fathers->where($key, $value);
        }
        $fathers = $fathers->first();
        if ($fathers) {
            if (\Auth::user()->allowed($permission, $fathers, true, $forigen)) {
                return true;
            } else {
                die('not authorized');
            }
        } else {die('not authorized');}
    }
    public static function isOk($argument)
    {

        $permission = (isset($argument['permission'])) ? $argument['permission'] : false;
        $relation   = (isset($argument['relation'])) ? $argument['relation'] : false;
        $forigen    = (isset($argument['forigen'])) ? $argument['forigen'] : 'user_id';
        $model      = (isset($argument['model'])) ? $argument['model'] : false;
        $keys       = (isset($argument['keys'])) ? $argument['keys'] : [];
        if (!$permission || $permission == '') {
            return true;
        }
        $splitted = explode('.', $permission);
        unset($splitted[0]);
        $permission = implode('.', $splitted);
        ($permission);
        if (!$relation || empty($relation)) {
            if ($keys && !empty($keys)) {
                $fathers = $model::where('id', '<>', null);
                foreach ($keys as $key => $value) {
                    $fathers = $fathers->where($key, $value);
                }
                $relation     = $fathers->first();
                $has_relation = true;
            } else {
                $has_relation = false;
            }
        } else {
            $has_relation = true;
        }
        if ($relation == null) {
            return;
        }
        if ($has_relation) {
            if (\Auth::user()->allowed($permission, $relation, true, $forigen)) {
                return true;
            } else {
                die('not authorized(has Relation & has permission & No Auth)');
            }
        } else {

            if (\Auth::user()->hasPermission($permission)) {
                return true;
            } else {
                die('not authorized (No Key & No permission)');
            }

        }

    }
    public static function request($data)
    {
        extract($data);
        $check = r::where('requester_id', $requester)
            ->where('requested_id', $requested)
            ->where('place', $place)
            ->where('status', 'blocked')
            ->first();
        if ($check) {
            return 'blocked';
        } else {
            $db               = new r;
            $db->requester_id = (isset($requester)) ? $requester : \Auth::user()->id;
            $db->requested_id = $requested;
            $db->place        = $place;
            $db->operation    = $operation;
            $db->save();
        }
        return $db;

    }
    public static function requests($data, $skip = 0, $take = 10)
    {
        extract($data);
        $action   = ($action == 'new') ? null : $action;
        $requests = r::where('requested_id', $requested)
            ->where('place', $place)
            ->where('action', $action);
        $requests->update(['status' => 'seen']);
        // die(var_dump(func_get_args()));
        // die(var_dump($requests->skip($skip)->take($take)->get()));
        return $requests->skip($skip)->take($take)->get();

    }
    public static function response($id, $response, $callback = [], $argument = [])
    {
        $return  = null;
        $request = r::find($id);

        $request->action = $response['action'];
        // dd($response);

        switch ($response['action']) {
            case 'accepted':
                $return = call_user_func_array($callback, $argument);
                //to do : notify user in notification
                break;
            case 'blocked':
                $return = 'blocked';
                break;
            case 'refused':
                // $return          = call_user_func_array($callback, $argument);
                $request->status = 'refused';
                $return          = 'This Request refused Try Again Later';
                break;
            case 'delayed':
                $request->status = 'delayed';
                $return          = 'delayed done';
                break;
            default:

                break;
        }
        $request->status = 'seen';
        $request->save();
        return $return;
    }
}
