<?php
namespace App\Http\Controllers\Institutes\Parts;

use App\Http\Controllers\Classes\Helper;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Institutes\Models\institute;
use App\Http\Controllers\Institutes\Models\variable;
use App\Http\Controllers\Institutes\Models\variable_block;
use App\Http\Controllers\Institutes\myPermissions as Permissions;
use App\Models\User;
use Illuminate\Http\Request;

class Info extends Controller implements Permissions
{
    private static $instance = null;
    public static function getInstance()
    {
        if (self::$instance == null) {
            self::$instance = new Info();
        }
        return self::$instance;
    }
    public function __call($method, $arguments)
    {
        if (method_exists($this, $method)) {
            $reflect                  = new \ReflectionClass($this);
            $permission               = self::PERMISSION_INTERFACE[$reflect->getShortName()];
            $permission['keys']       = ['id' => 56, 'user_id' => \Auth::user()->id];
            $permission['permission'] = $permission['permission'][$method];
            Helper::isOk($permission);
            return call_user_func_array(array($this, $method), $arguments);
        }
    }
    private function get($id)
    {
        $ins = Institute::where('id', $id)->get();
        return $ins;
    }
    private function getInformation($id)
    {
        // dd('sdf');
        return variable_block::where('institute_id', $id)->with('variables')->get();

    }
    private function addInformation($id, Request $request)
    {
        $add              = new variable();
        $add->block       = 1;
        $add->title       = $request->title;
        $add->type        = $request->type;
        $add->status      = 'enabled';
        $add->value       = $request->value;
        $add->order       = $request->order;
        $add->institue_id = $this->institue_id;
        $add->save();
        return ('Success');
    }

    private function editInformation($id, Request $Request)
    {
        $editinformation              = variable::where('institue_id', $id)->first();
        $editinformation->block       = 1;
        $editinformation->title       = $Request->title;
        $editinformation->type        = $Request->type;
        $editinformation->status      = 'enabled';
        $editinformation->value       = $Request->value;
        $editinformation->institue_id = $this->institue_id;
        $editinformation->save();
        return ('Done');
    }

    private function deleteInformation()
    {
        return (variable::where('id', $id)->delete()) ? 'DeletedDone' : 'DeletedError';
    }

    private function addBlock(Request $Request)
    {
        $addblock              = new variable_block();
        $addblock->block_name  = $Request->block_name;
        $addblock->block_icon  = $Request->block_icon;
        $addblock->institue_id = $this->institue_id;
        $addblock->order       = $Request->order;
        $addblock->status      = 'enabled';
        $addblock->save();
        return ('Success');
    }

    private function editBlock($id, Request $Request)
    {
        $editblock             = variable_block::where('id', $id)->first();
        $editblock->block_name = $Request->block_name;
        $editblock->block_icon = $Request->block_icon;
        $editblock->status     = 'enabled';
        $editblock->save();
        return ('Success');
    }

    private function deleteBlock($id)
    {
        return (variable_block::where('id', $id)->delete()) ? 'DeletedDone' : 'DeletedError';
    }

}
