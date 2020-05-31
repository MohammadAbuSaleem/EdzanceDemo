<?php
namespace App\Http\Controllers\Institutes\Parts\Volunteer;

use App\Controllers\Institutes\Models\Volunteer;
use App\Http\Controllers\Classes\Helper;
use App\Http\Controllers\Controller;
use App\Http\Controllers\PermissionInterface\PermissionInterface;
use App\Models\taggable;
use App\Models\taxonomy;
use App\Models\User;
use Illuminate\Http\Request;

class Volunteer extends Controller implements PermissionInterface
{
    private static $instance = null;
    public static function getInstance()
    {

        if (self::$instance == null) {
            self::$instance = new Volunteer();
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
    /* Add New Volunteer To DataBase */
    private function addVolunteer($Request)
    {

        $this->validate($Request, [
            'action_name'        => 'required',
            'action_description' => 'required',
            'from'               => 'required',
            'to'                 => 'required',
            'days'               => 'required',
        ]);
        $volunteer                     = new Volunteer;
        $volunteer->user_id            = \Auth::user()->id;
        $volunteer->action_name        = $Request->action_name;
        $volunteer->action_description = $Request->action_description;
        $volunteer->from               = $Request->from;
        $volunteer->to                 = $Request->to;
        $volunteer->days               = $Request->days;
        $volunteer->save();
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
            $gr_tax->taggable_id   = $volunteer->id;
            $gr_tax->taxonomy_id   = $tax->id;
            $gr_tax->taggable_type = 'App\Controllers\Institutes\Models\Volunteer';
            $gr_tax->save();
        }
        return ('Added Done');
    }
    /*Get All Voulnteer From Database */
    private function getVolunteer($id, $skip = 0, $take = 10)
    {
        if ($id == 'all' || $id == null2) {
            $vaccation = Volunteer::skip($skip)->take($take)->orderBy('created_at', 'desc')->get();
        } else {
            $vaccation = Volunteer::where('id', $id)->skip($skip)->take($take)->orderBy('created_at', 'desc')->get();
        }
        return $vaccation;
    }
    /* Edit Exisit Volunteer */
    private function editVolunteer($id, Request $Request)
    {
        $volunteeredit                     = Volunteer::where('id', $id)->first();
        $volunteeredit->action_name        = ($Request->action_name) ? $Request->action_name : $volunteeredit->action_name;
        $volunteeredit->action_description = ($Request->action_description) ? $Request->action_description : $volunteeredit->action_description;
        $volunteeredit->from               = ($Request->from) ? $Request->from : $volunteeredit->from;
        $volunteeredit->to                 = ($Request->to) ? $Request->to : $volunteeredit->to;
        $volunteeredit->days               = ($Request->days) ? $Request->days : $volunteeredit->days;
        $volunteeredit->save();
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
                $gr_tax->taggable_id   = $volunteeredit->id;
                $gr_tax->taxonomy_id   = $tax->id;
                $gr_tax->taggable_type = 'App\Controllers\Institutes\Models\Volunteer';
                $gr_tax->save();
            }
        }
        return ('Success');
    }
    /* Delete Volunteer From Database  */
    private function deleteVolunteer($id)
    {
        return (Volunteer::where('id', $id)->delete()) ? 'Deleted Done' : 'Deleted Error';
    }

}
