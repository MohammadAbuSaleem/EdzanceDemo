<?php

namespace App\Http\Controllers\Social\childs;
use Auth;
use App\Http\Controllers\Social\parents\PostFather;
use App\Http\Controllers\Social\parents\PostInterface;

class course extends PostFather  implements PostInterface {
	    function __construct($id = false,$place='course',$type='post',$placeId=null) {
        parent::__construct($placeId,$type);
        $this->place = ($place == null) ? 'course' :$place;

        if ($id) 
            $this->Node = \App\Models\post::where('place','course');
        else
            $this->Node = new \App\Models\post;
        
        return $this->Node;
    }
    function add() {
        return 'add';
        
    } 
    public function textAdd($r,$post){
        return $post->save($r);
    }
    public function imageAdd($r,$post){
        return $post->save($r);
    }
    public function videoAdd($r,$post){
        return $post->save($r);
    }
    public function urlAdd($r,$post){
        return $post->save($r);
    }
    public function new_class_postAdd($r,$post){
        return $post->save($r);
    }
    public function follow_postAdd($r,$post){
        return $post->save($r);
    }
    public function avatar_imageAdd($r,$post){
        return $post->save($r);
    }
    public function cover_imageAdd($r,$post){
        return $post->save($r);
    }
    function read() {
        return 'read';

    } 
    function geta($skip=0,$take=10) {
    	return ($take==1) ? $this->Node->first() : $this->Node->skip($skip)->take($take)->get() ;
    }
}