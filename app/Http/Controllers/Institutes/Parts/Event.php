<?php
namespace App\Http\Controllers\Institutes\Parts\Event;

use App\Controllers\Institutes\Models\Event;
use App\Http\Controllers\Classes\Helper;
use App\Http\Controllers\Controller;
use App\Http\Controllers\PermissionInterface\PermissionInterface;
use App\Models\taggable;
use App\Models\taxonomy;
use App\Models\User;
use Illuminate\Http\Request;

class Event extends Controller implements PermissionInterface
{
    private static $instance = null;
    public static function getInstance()
    {

        if (self::$instance == null) {
            self::$instance = new Event();
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
    Work :: To Add New Event InTo DB;
    Variables ::
    Return ::
     */

    private function addEvent($Request)
    {

        $this->validate($Request, [
            'name'        => 'required',
            'description' => 'required',
            'image'       => 'required',
            'location'    => 'required',
            'time'        => 'required',
            'days'        => 'required',
            'start_date'  => 'required',
            'end_date'    => 'required',
        ]);
        $event              = new jo;
        $event->user_id     = \Auth::user()->id;
        $event->name        = $Request->name;
        $event->description = $Request->description;
        $event->image       = $Request->image;
        $event->start_date  = $Request->start_date;
        $event->end_date    = $Request->end_date;
        $event->Time        = $Request->Time;
        $event->days        = $Request->days;
        $event->location    = $Request->location;
        $event->save();
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
            $gr_tax->taggable_id   = $event->id;
            $gr_tax->taxonomy_id   = $tax->id;
            $gr_tax->taggable_type = 'App\Controllers\Institutes\Models\Event';
            $gr_tax->save();
        }
        return ('Added Done');
    }
    /*
    Work :: To Get All Event From DB;
    Variables :: $id / $skip / $take ;
    Return ::
     */
    private function getEvent($id, $skip = 0, $take = 10)
    {
        if ($id == 'all' || $id == null2) {
            $event = Event::skip($skip)->take($take)->orderBy('created_at', 'desc')->get();
        } else {
            $event = Event::where('id', $id)->skip($skip)->take($take)->orderBy('created_at', 'desc')->get();
        }
        return $event;
    }
    /*
    Work :: To Edit  Event InTo DB;
    Variables ::
    Return ::
     */
    private function editEvent($id, Request $Request)
    {
        $editevent              = Event::where('id', $id)->first();
        $editevent->name        = ($Request->name) ? $Request->name : $editevent->name;
        $editevent->description = ($Request->description) ? $Request->description : $editevent->description;
        $editevent->image       = ($Request->image) ? $Request->image : $editevent->image;
        $editevent->start_date  = ($Request->start_date) ? $Request->start_date : $editevent->start_date;
        $editevent->end_date    = ($Request->end_date) ? $Request->end_date : $editevent->end_date;
        $editevent->Time        = ($Request->Time) ? $Request->Time : $editevent->Time;
        $editevent->days        = ($Request->days) ? $Request->days : $editevent->days;
        $editevent->location    = ($Request->location) ? $Request->location : $editevent->location;
        $editevent->save();
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
                $gr_tax->taggable_id   = $editevent->id;
                $gr_tax->taxonomy_id   = $tax->id;
                $gr_tax->taggable_type = 'App\Controllers\Institutes\Models\Event';
                $gr_tax->save();
            }
        }
        return ('Success');
    }
    /*
    Work :: To Delete  Event From DB;
    Variables :: $id;
    Return ::Deleted / Error;
     */
    private function deleteEvent($id)
    {
        return (Event::where('id', $id)->delete()) ? 'Deleted Done' : 'Deleted Error';
    }

}
