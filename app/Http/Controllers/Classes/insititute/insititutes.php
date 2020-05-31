<?php

namespace App\Http\Controllers\Classes\insititute;

use App\library\notifications\Notifications;
use Illuminate\Database\Eloquent\Model;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Models\feature;
use Auth;
use DB;
use App\Models\category;
use App\Models\institute;
use App\Models\insitituteFeature;
use App\Models\User;

class insititutes
{
    public function addFeature($Request)
    {
        $feature = new feature ;
        $feature->name =$Request ->name;
        $feature->save();
        return compact('feature');
    }

    public function insititutefeature($Request, $user_id)
    {
        $insf = new InsitituteFeature ;
        $insf->feature_id = $Request['id'];
        $insf->insititute_id = $Request['insititute_id'];
        $insf->user_id =$user_id;
        $insf->save();
        return compact('insf');
    }

    public function postAddCategoty($r)
    {
        $cat = new category();
        if ($r->parent) {
            $cat->parent = $r->parent;
        }
        if ($tag = \DB::table('taxonomies')->where('body', 'LIKE', implode('-', explode(' ', $r->tag)))->first()) {
            $cat->name=implode(' ', explode('-', $tag->body));
            $cat->taxonomy_id = $tag->id;
        } else {
            $tag = new taxonomy();
            $tag->body = implode('-', explode(' ', $r->tag));
            $tag->number = 1;
            $tag->save();
            $cat->name = implode(' ', explode('.', $r->tag));
            $cat->taxonomy_id = $tag->id;
        }
        if ($r->name) {
            $cat->name = $r->name;
        }
        $cat->save();
        return compact('cat');
    }
    public function AddInstitue($r)
    {
        $inst = new institute;
        $inst->mthr_name = $r->name;
        $inst->presidant = $r->presidant;
        $inst->category_id = $r->cat['cat']['id'];
        $inst->contact = $r->contact;
        $inst->status = 'disable';
        $inst->type = $r->type;
        $inst->avatar = $r->avatar;
        $inst->countrey_id = $r->countrey_id;
        $inst->student = 0;
        $inst->instructor = 0;
        $inst->study_program = $r->study_program;
        $inst->save();
        return compact('inst');
    }
    public function attachRole($f_id = null, $id)
    {
        $feature = feature::find($f_id);
        
        if ($feature->admin_id) {
            $user = User::find($id);
            $user->attachRole($feature->admin_id); // you can pass whole object, or just an id
        }
        return $feature;
    }
    public function add(Request $r)
    {
        $r->cat = $this->postAddCategoty($r);
        $institute = $this->AddInstitue($r);
        foreach ($r->feature as $key => $value) {
           if ($value['enabled']) {
               $this->insititutefeature($value, $r->user);
               $feature[$key] = $this->attachRole($value['id'], $r->user);
           }
        }
    }
}
