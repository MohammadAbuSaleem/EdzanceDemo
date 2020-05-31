<?php

namespace App\Http\Controllers\Classes\insititute;
use App\library\notifications\Notifications;
use Illuminate\Database\Eloquent\Model;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Models\Feature;
use App\Models\Rolefeature;
use App\Models\institutefeature;
use Auth;
use DB;


class insititute  extends Controller {

   public function addFeature ($Request) {
    $feature = new Feature ;
    $feature->name =$Request ->name;
    $feature->save();
    return compact('feature');
   }

   public function insititutefeature ($Request,$user_id) {
    $insf = new InsitituteFeature ;
    $insf->feature_id = $Request->id;
    $insf->insititute_id = $Request->insititute_id;
    $insf->user_id =$user_id;
    $insf->save();
    return compact('insf');
   }

    public function postAddCategoty($r){
        $cat = new category();
        if ($r->parent) 
            $cat->parent = $r->parent;
        if ($tag = \DB::table('taxonomies')->where('body','LIKE',implode('-',explode(' ',$r->tag)))->first()){
                $cat->name=implode(' ',explode('-',$tag->body));
                $cat->taxonomy_id = $tag->id;
            } 
            else{
                $tag = new taxonomy();
                $tag->body = implode('-',explode(' ',$r->tag));
                $tag->number = 1;
                $tag->save();
                $cat->name = implode(' ',explode('.',$r->tag));
                $cat->taxonomy_id = $tag->id;
            }
        if ($r->name) 
            $cat->name = $r->name;
        $cat->save();
        return compact('cat');
    }

    public function AddInstitue($r){
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
        function attachRole($f_id = null,$id){
        $feature = Feature::find($f_id);
        if ($feature->admin_id) {
        $user = User::find($id);
        $user->attachRole($feature->admin_id); // you can pass whole object, or just an id
        }
        return $feature;
    }

    public function add (Request $r){
        $r->cat = $this->postAddCategoty($r);
        $institute = $this->AddInstitue($r);
        foreach ($r->feature as $key => $value) {
           if ($value->enabled) {
               $this->insititutefeature($value);
             $feature[$key] = $this->attachRole($value->id,$r->user);
           }
        }
        return($cat,$feature);
    }

    public function usercheck ($id,$inst) {
        $user = Users::where('institute_id','=',$inst)->where('id',$id)->get();
        if ($user) {
         return($user);
        }else return 'not in institute';
    }

    public function adduserrole ($id,$user,Request $r) {
        $featu = institutefeature::where('insititute_id','=',$id) ->join('ins__features', 'ins__features.id', '=', 'ins__insititute_feature.feature_id')->get();
        foreach ($featu as $key => $value) {
         $user->attachRole($value->admin_id);
        }
        
     }
        /* To Get All Event In DB */
    public function eventRead () {
        $event = event::select(
            'id',
            'name',
            'date',
            'description',
            'days',
            'image')->get();
            return($event);        
     }
        /* To Add New Event */
    public function eventAdd (Request $Request) {
        $events = new event;
        $events->id = $Request->id;
        $events->name = $Request->name;
        $events->date = $Request->date;
        $events->description = $Request->description;
        $events->days = $Request->days;
        $events->image = $Request->image;
        $events->save();
        return($events);

     }

     /* To Edit At Event Data */
    public function eventEdit ($id,Request $Request){
       $events = event::where('id',$id)->first();
       $events->name = $Request->name;
       $events->date = $Request->date;
       $events->description = $Request->description;
       $events->days = $Request->days;
       $events->save();
       return($events);
    }
        /* delete event */
    public function eventDelete ($id){
        $events = event::where('id',$id);
        $events->delete();
        return('done');
    }
     /* to get all vacation */
    public function vacationRead () {
        $vacationread = vacation::select(
            'id',
            'name',
            'description',
            'from',
            'to'
            )->get();
        return($vacation);
    }
        /* to add new vacation */
    public function vacationAdd (Request $Request) {
        $vacationadd = new vacation;
        $vacationadd->id = $Request->id;
        $vacationadd->name = $Request->name;
        $vacationadd->description = $Request->description;
        $vacationadd->from = $Request->from;
        $vacationadd->to = $Request->to;
        $vacationadd->save();
        return($vacationadd);
    }
         /* to edit vacation */
    public function vacationEdit ($id,Request $Request) {
        $vacationedit = event::where('id',$id)->first();
        $vacationedit->name = $Request->name;
        $vacationedit->description = $Request->description;
        $vacationedit->from = $Request->from;
        $vacationedit->to = $Request->to;
        $vacationedit->save();
        return($vacationedit);
    }
        /* to delete vacation */
    public function vacationDelete ($id) {
        $vacationdelete = vacation::where('id',$id);
        $vacationdelete->delete();
        return('done');
    }
        /* to get all achiv */
    public function achivRead () {
        $achivreqd = achievements::select(
            'id',
            'name',
            'description',
            'image'
            )->get();
        return($vacation);
    }
        /* to add achivement */
    public function achivAdd (Request $Request) {
        $achivadd = new achievements;
        $achivadd->id = $Request->id;
        $achivadd->name = $Request->name;
        $achivadd->description = $Request->description;
        $achivadd->image = $Request->image;
        $achivadd->save();
        return($achivadd);
    }
        /* to edit achivement */
    public function achivEdit ($id,Request $Request) {
        $achivedit = achievements::where('id',$id)->first();
        $achivedit->name = $Request->name;
        $achivedit->description = $Request->description;
        $achivedit->image  = $Request->image ;
        $achivedit->save();
        return($achivedit);
    }
     /* to delete achivment */
    public function achivDelete ($id) {
        $achivdelete = achievements::where('id',$id);
        $achivdelete->delete();
        return('done');
    }

    
}


