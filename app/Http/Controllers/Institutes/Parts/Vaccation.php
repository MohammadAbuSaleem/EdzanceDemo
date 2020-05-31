<?php
namespace App\Http\Controllers\Institutes\Parts\Vaccation;

use App\Controllers\Institutes\Models\Vaccation;
use App\Http\Controllers\Classes\Helper;
use App\Http\Controllers\Controller;
use App\Http\Controllers\PermissionInterface\PermissionInterface;
use App\Models\taggable;
use App\Models\taxonomy;
use App\Models\User;
use Illuminate\Http\Request;

class Vaccation extends Controller implements PermissionInterface
{
    private static $instance = null;
    public static function getInstance()
    {

        if (self::$instance == null) {
            self::$instance = new Vaccation();
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
    /*
    Work :: To Add New Vaccation InTo DB;
    Variables ::
    Return ::
     */

    private function addVaccation($Request)
    {

        $this->validate($Request, [
            'name'        => 'required',
            'description' => 'required',
            'from'        => 'required',
            'to'          => 'required',
            'days'        => 'required',
        ]);
        $vaccation              = new Vaccation;
        $vaccation->user_id     = \Auth::user()->id;
        $vaccation->name        = $Request->name;
        $vaccation->description = $Request->description;
        $vaccation->from        = $Request->from;
        $vaccation->to          = $Request->to;
        $vaccation->days        = $Request->days;
        $vaccation->save();
        if (!is_array($Request->tags)) {
            $Request->tags = explode(',', $Request->tags);
        }
        foreach ($Request->tags as $key => $value) {
            if ($tax = taxonomy::where('body', $value['text'])->first()) {
                $tax->increment('number');
            } else {
                $tax         = new taxonomy;
                $tax->number = 1;
                $tax->body   = $value['text'];
                $tax->save();
            }
            $gr_tax                = new taggable;
            $gr_tax->taggable_id   = $vaccation->id;
            $gr_tax->taxonomy_id   = $tax->id;
            $gr_tax->taggable_type = 'App\Controllers\Institutes\Models\Vaccation';
            $gr_tax->save();
        }
        return ('Added Done');
    }
    /*
    Work :: To Get All Vaccation From DB;
    Variables :: $id / $skip / $take ;
    Return ::
     */
    private function getVaccation($id, $skip = 0, $take = 10)
    {
        if ($id == 'all' || $id == null2) {
            $vaccation = Vaccation::skip($skip)->take($take)->orderBy('created_at', 'desc')->get();
        } else {
            $vaccation = Vaccation::where('id', $id)->skip($skip)->take($take)->orderBy('created_at', 'desc')->get();
        }
        return $vaccation;
    }
    /*
    Work :: To Edit  Vaccation InTo DB;
    Variables ::
    Return ::
     */
    private function editVaccation($id, Request $Request)
    {
        $vaccationedit              = Vaccation::where('id', $id)->first();
        $vaccationedit->name        = ($Request->name) ? $Request->name : $vaccationedit->name;
        $vaccationedit->description = ($Request->description) ? $Request->description : $vaccationedit->description;
        $vaccationedit->from        = ($Request->from) ? $Request->from : $vaccationedit->from;
        $vaccationedit->to          = ($Request->to) ? $Request->to : $vaccationedit->to;
        $vaccationedit->days        = ($Request->days) ? $Request->days : $vaccationedit->days;
        $vaccationedit->save();
        if ($Request->tags) {
            foreach ($Request->tags as $key => $value) {
                if ($tax = taxonomy::where('body', $value['text'])->first()) {
                    $tax->increment('number');
                } else {
                    $tax         = new taxonomy;
                    $tax->number = 1;
                    $tax->body   = $value['text'];
                    $tax->save();
                }
                $gr_tax                = new taggable;
                $gr_tax->taggable_id   = $vaccationedit->id;
                $gr_tax->taxonomy_id   = $tax->id;
                $gr_tax->taggable_type = 'App\Controllers\Institutes\Models\Vaccation';
                $gr_tax->save();
            }
        }
        return ('Success');
    }
    /*
    Work :: To Delete  Vaccation From DB;
    Variables :: $id;
    Return ::Deleted / Error;
     */
    private function deleteVaccation($id)
    {
        return (Vaccation::where('id', $id)->delete()) ? 'Deleted Done' : 'Deleted Error';
    }

}
