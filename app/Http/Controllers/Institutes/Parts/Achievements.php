
<?php
namespace App\Http\Controllers\Institutes\Parts\Achievements;

use App\Controllers\Institutes\Models\Achievements;
use App\Http\Controllers\Classes\Helper;
use App\Http\Controllers\Controller;
use App\Http\Controllers\PermissionInterface\PermissionInterface;
use App\Models\taggable;
use App\Models\taxonomy;
use App\Models\User;
use Illuminate\Http\Request;

class Achievements extends Controller implements PermissionInterface
{
    private static $instance = null;
    public static function getInstance()
    {

        if (self::$instance == null) {
            self::$instance = new Achievements();
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
    /* To Add New Achiv In Database*/
    private function addAchievements($Request)
    {

        $this->validate($Request, [
            'achiv_name'        => 'required',
            'achiv_description' => 'required',
            'achiv_image'       => 'required',
            'achiv_date'        => 'required',
        ]);
        $achiv                    = new Achievements;
        $achiv->user_id           = \Auth::user()->id;
        $achiv->achiv_name        = $Request->achiv_name;
        $achiv->achiv_description = $Request->achiv_description;
        $achiv->achiv_image       = $Request->achiv_image;
        $achiv->achiv_date        = $Request->achiv_date;
        $achiv->save();
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
            $gr_tax->taggable_id   = $achiv->id;
            $gr_tax->taxonomy_id   = $tax->id;
            $gr_tax->taggable_type = 'App\Controllers\Institutes\Models\Achievements';
            $gr_tax->save();
        }
        return ('Added Done');
    }
    /* To Get All Achiv From DataBase */
    private function getAchievements($id, $skip = 0, $take = 10)
    {
        if ($id == 'all' || $id == null2) {
            $getAchiv = Achievements::skip($skip)->take($take)->orderBy('created_at', 'desc')->get();
        } else {
            $getAchiv = Achievements::where('id', $id)->skip($skip)->take($take)->orderBy('created_at', 'desc')->get();
        }
        return $event;
    }
    /* To Edit On Achiv In DataBase */
    private function editAchievements($id, Request $Request)
    {
        $editAchiv                    = Achievements::where('id', $id)->first();
        $editAchiv->achiv_name        = ($Request->achiv_name) ? $Request->achiv_name : $editAchiv->achiv_name;
        $editAchiv->achiv_description = ($Request->achiv_description) ? $Request->achiv_description : $editAchiv->achiv_description;
        $editAchiv->achiv_image       = ($Request->achiv_image) ? $Request->achiv_image : $editAchiv->achiv_image;
        $editAchiv->achiv_date        = ($Request->achiv_date) ? $Request->achiv_date : $editAchiv->achiv_date;

        $editAchiv->save();
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
                $gr_tax->taggable_id   = $editachiv->id;
                $gr_tax->taxonomy_id   = $tax->id;
                $gr_tax->taggable_type = 'App\Controllers\Institutes\Models\Achievements';
                $gr_tax->save();
            }
        }
        return ('Success');
    }
    /* To Delete Achiv Form DataBase */
    private function deleteAchievements($id)
    {
        return (Achievements::where('id', $id)->delete()) ? 'Deleted Done' : 'Deleted Error';
    }

}