<?php
class GroupUser {
    protected $me;
    protected $is_exist;
    protected $type;
    protected $group_id;
    protected $user_id;
    protected $group;
    protected $my_auth;
    protected $relation;
    protected $template;
    function __construct($group_id,$user_id,$param) {
        $this->type = 'outed';
        $this->me = \Auth::user();
        $this->group = App\group::where('id',$group_id)->first();
        $this->type = \Auth::user();
        $this->is_exist = false;
        $this->my_auth = App\groupuser::where('user_id','=',$this->me->id)
                                      ->where('id','=',$group_id)->first();
        if ($user_id == $group_id->creator)
             return 'no access for anyone to admin';
        $this->FindOrCreate($group_id,$user_id);
        $this->template = $this->FindTemplate();
        switch ($param) {
            case '1':
                $this->toNormalState('in','تمت الاضافة إلى المجموعة');
                break;
            case '2':
                $this->toNormalState('out','تمت عملية الخروج من المجموعة');
               break;
            case '3':
                $this->toAdminState('block','تمت الاضافة إلى المجموعة');
               break;
            case '4':
                $this->toAdminState('modirator','تمت الاضافة إلى المجموعة');
               break;
            default:
                $this->toNormalState('in','تمت الاضافة إلى المجموعة');
               break;
                }
                return $this->relation;
    }
    function FindOrCreate($group_id,$user_id) {
          if (count($groupuser = App\groupuser::where('user_id','=',$user_id)
                    ->where('id','=',$group_id)->first())) 
            {
              $this->$is_exist=true;
               $this->relation = $groupuser; 
            }else{
               $this->relation = new App\groupuser; 
              $this->$is_exist=false;
             }
        }
    
    function FindTemplate() {      
        switch ($this->group->privacy) {
          case 'public':
           $this->template = 1;
            break;
          case 'closed':
           $this->template = 3;
            break;
           default:  
               //check if university is same
              if ($this->group->university_id == $this->me->university_id ) {
                 $this->template = 2;
                //check if 
                }elseif($this->group->specialization_id == $this->me->specialition_id) {
                $this->template = 2;
                }else{
                 $this->template = 3;
                }
          break;
        }
      return $this->template;
    }

    function toNormalState($state,$message) {
      if ($this->me->id == $this->group->creator){
             $this->type = $state;
             $this->message = $message;
             return $this->type;
          }elseif(!is_null($this->my_auth)) {
             if(( $this->my_auth->type == 'modirator')||
                ( $this->my_auth->type !='block' && $this->group->privacy!='closed')) {
                 $this->type = $state;
                 $this->message = $message;
                 return $this->type;
                  } 
              }elseif($this->me->id ==$this->user_id){
                 $this->type = $state;
                 $this->message = $message;
                 return $this->type;
             }else{ return 'no permission';}
       
    }
    function toAdminState($state,$message) {
      if ($this->me->id == $this->group->creator){
             $this->type = $state;
             $this->message = $message;
             return $this->type;
          }elseif(!is_null($this->my_auth)) {
             if(( $this->my_auth->type == 'modirator')||
                ( $this->my_auth->type !='block' && $this->group->privacy!='closed')) {
                 $this->type = $state;
                 $this->message = $message;
                 return $this->type;
                  } 
              }elseif($this->me->id ==$this->user_id){
                 $this->type = $state;
                 $this->message = $message;
                 return $this->type;
             }else{ return 'no permission';}
       
    }
    function toIn() {
      if ($this->me->id == $this->group->creator){
             $this->type = 'in';
             $this->message = 'تمت الاضافة إلى المجموعة';
             return $this->type;
          }elseif(!is_null($this->my_auth)) {
             if(( $this->my_auth->type == 'modirator')||
                ( $this->my_auth->type !='block' && $this->group->privacy!='closed')) {
                 $this->type = 'in';
                 $this->message = 'تمت الاضافة إلى المجموعة';
                 return $this->type;
                  } 
              }elseif($this->me->id ==$this->user_id){
                 $this->type = 'in';
                 $this->message = 'تمت الاضافة إلى المجموعة';
                 return $this->type;
             }else{ return 'no permission';}
       
    }
    function toOut() {      
    if ($this->me->id == $this->group->creator){
             $this->type = 'out';
             $this->message = 'تمت عملية الخروج من المجموعة';
             return $this->type;
          }elseif (!is_null($this->my_auth)) {
             if(( $this->my_auth->type == 'modirator')||
                ( $this->my_auth->type !='block' && $this->group->privacy!='closed')) {
             $this->type = 'out';
             $this->message = 'تمت عملية الخروج من المجموعة';
                 return $this->type;
                  } 
              }elseif($this->me->id ==$this->user_id){
             $this->type = 'out';
             $this->message = 'تمت عملية الخروج من المجموعة';
                 return $this->type;
             }else{ return 'no permission';}
   }
    function toBlock() {      
    if ($this->me->id == $this->group->creator){
             $this->type = 'block';
             $this->message = 'تمت عملية الخروج من المجموعة';
             return $this->type;
          }elseif (!is_null($this->my_auth)) {
             if(( $this->my_auth->type == 'modirator')||
                ( $this->my_auth->type !='block' && $this->group->privacy!='closed')) {
             $this->type = 'block';
             $this->message = 'تمت عملية الخروج من المجموعة';
                 return $this->type;
                  } 
              }else{ return 'no permission';}
   }
    function toModirate() {      
    if ($this->me->id == $this->group->creator){
             $this->type = 'out';
             $this->message = 'تمت عملية تعيين مدير المجموعة';
             return $this->type;
          }elseif (!is_null($this->my_auth)) {
             if( $this->my_auth->type == 'modirator') {
             $this->type = 'out';
             $this->message = 'تمت عملية تعيين مدير المجموعة';
                 return $this->type;
                  } 
              }else{ return 'no permission';}
    }
    function toWait() {
   if ($this->group->authorized) {
             $this->type = 'waiting';
             $this->message = 'تمت عملية طلب عضوية المجموعة';
             return $this->type;
   }else{ return 'no permission';}
    }

    function save() {
        $this->relation->user_id = $this->user_id;
        $this->relation->id = $this->group_id;
        $this->relation->type = $this->type;
        $this->relation->save();
       return $this->relation;
    }
}
