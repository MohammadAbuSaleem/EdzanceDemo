<?php

namespace App\Http\Controllers\Institutes;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Institutes\Base as Inst;
use App\Http\Controllers\Institutes\institutes;
use Illuminate\Http\Request;

class Routing extends Controller
{
    /* This Function To Prepare The Link For Institute Function */
    public function institutes(Request $r, $action, $insId, $feature = 'post', $featureId = 'all', $skip = 0, $take = 10)
    {
        $array              = $r->all();
        $array['action']    = $action;
        $array['insId']     = $insId;
        $array['feature']   = $feature;
        $array['featureId'] = $featureId;
        $array['skip']      = $skip;
        $array['take']      = $take;
        switch ($action) {
            case 'set':
                $array->id = $insId;
                $INS       = (new Inst($array, $action, $insId, $feature, $featureId))->adding($array);
                return response()->success($INS);
                break;
            case 'get':
                $INS = (new Inst($array, $action, $insId, $feature, $featureId))->get($skip, $take);
                return response()->success($INS->result);
                break;
            case 'edit':
                // if ($feature == 'post') {
                //     return (new Inst($array->all(), $action, $insId, $feature, $featureId))->editing($insId);
                // }
                $INS = (new Inst($array, $action, $insId, $feature, $featureId))->editing($array->id);

                return response()->success($INS);
                break;

            case 'delete':
                // if ($feature == 'post') {
                //     return (new Inst($array->all(), $action, $insId, $feature, $featureId))->deleting($insId);
                // }
                $INS = (new Inst($array->all(), $action, $insId, $feature, $featureId))->deleting($array->id);
                return response()->success($INS);
                break;
        }
    }
}
