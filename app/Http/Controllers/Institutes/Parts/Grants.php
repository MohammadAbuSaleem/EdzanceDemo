<?php
namespace App\Http\Controllers\Institutes\Parts\Vaccation;

use App\Controllers\Institutes\Models\Grants;
use App\Http\Controllers\Classes\Helper;
use App\Http\Controllers\Controller;
use App\Http\Controllers\PermissionInterface\PermissionInterface;
use App\Models\taggable;
use App\Models\taxonomy;
use App\Models\User;
use Illuminate\Http\Request;

class Grants extends Controller implements PermissionInterface
{
    private static $instance = null;
    public static function getInstance()
    {

        if (self::$instance == null) {
            self::$instance = new Grants();
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

    private function addGrants($Request)
    {

        $this->validate($Request, [
            'name'           => 'required',
            'description'    => 'required',
            'type'           => 'required',
            'years'          => 'required',
            'apply_date'     => 'required',
            'needs_paper'    => 'required',
            'apply_location' => 'required',
            'image'          => 'required',
        ]);
        $grantsadd                 = new Grants;
        $grantsadd->user_id        = \Auth::user()->id;
        $grantsadd->name           = $Request->name;
        $grantsadd->description    = $Request->description;
        $grantsadd->type           = $Request->type;
        $grantsadd->years          = $Request->years;
        $grantsadd->apply_date     = $Request->apply_date;
        $grantsadd->apply_link     = $Request->apply_link;
        $grantsadd->apply_location = $Request->apply_location;
        $grantsadd->needs_paper    = $Request->needs_paper;
        $grantsadd->image          = $Request->image;
        $grantsadd->save();
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
            $gr_tax->taggable_id   = $grantsadd->id;
            $gr_tax->taxonomy_id   = $tax->id;
            $gr_tax->taggable_type = 'App\Controllers\Institutes\Models\Grants';
            $gr_tax->save();
        }
        return ('Added Done');
    }
    /*
    Work :: To Get All Vaccation From DB;
    Variables :: $id / $skip / $take ;
    Return ::
     */
    private function getGrants($id, $skip = 0, $take = 10)
    {
        if ($id == 'all' || $id == null2) {
            $grants = Grants::skip($skip)->take($take)->orderBy('created_at', 'desc')->get();
        } else {
            $grants = Grants::where('id', $id)->skip($skip)->take($take)->orderBy('created_at', 'desc')->get();
        }
        return $grants;
    }
    /*
    Work :: To Edit  Vaccation InTo DB;
    Variables ::
    Return ::
     */
    private function editGrants($id, Request $Request)
    {
        $editgrants                 = Grants::where('id', $id)->first();
        $editgrants->name           = ($Request->name) ? $Request->name : $editgrants->name;
        $editgrants->description    = ($Request->description) ? $Request->description : $editgrants->description;
        $editgrants->type           = ($Request->type) ? $Request->type : $editgrants->type;
        $editgrants->years          = ($Request->years) ? $Request->years : $editgrants->years;
        $editgrants->apply_date     = ($Request->apply_date) ? $Request->apply_date : $editgrants->apply_date;
        $editgrants->apply_link     = ($Request->apply_link) ? $Request->apply_link : $editgrants->apply_link;
        $editgrants->apply_location = ($Request->apply_location) ? $Request->apply_location : $editgrants->apply_location;
        $editgrants->needs_paper    = ($Request->needs_paper) ? $Request->needs_paper : $editgrants->needs_paper;
        $editgrants->save();
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
                $gr_tax->taggable_id   = $editgrants->id;
                $gr_tax->taxonomy_id   = $tax->id;
                $gr_tax->taggable_type = 'App\Controllers\Institutes\Models\Grants';
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
    private function deleteGrants($id)
    {
        return (Grants::where('id', $id)->delete()) ? 'Deleted Done' : 'Deleted Error';
    }

}
