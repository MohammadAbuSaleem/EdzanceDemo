<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Classes\VirtualClass\FilesClass;
use App\Http\Controllers\Classes\VirtualClass\HomeworkClass;
use App\Http\Controllers\Classes\VirtualClass\Exams;
use App\Http\Controllers\Classes\VirtualClass\VirtualClassClass;

class test extends Controller
{
    public function Post_Add (Request $r){
        $r->place = 'class';
        $new_post = new Post();
        return $new_post->me;
        $new_post->newPost($r);
    }
    public function classRead ($id,Request $r){
        $r->place = 'class';
        $new_post = new VirtualClassClass();
        return $new_post->getClass($id);
    }

    // public function postEdit ($id)';
    // $r->place = 'class';
    //     $new_post = new Post();
    //     return $new_post->me;
    //     $new_post->newPost($r);
    // }
      

    // public function postDelete () {
    // $r->place = 'class';
        // $new_post = new Post();
        // return $new_post->me;
        // $new_post->newPost($r);
    // }

    // public function postRead (Request $r) {
    // 	$r->place = 'class';
        // $new_post = new Post();
        // return $new_post->me;
        // $new_post->newPost($r);
    // }

    // public function commentRead () {
    // 	return 'Comment_Read';
    // }

    // public function commentAdd () {
    // 	return 'Comment_Add';
    // }

    // public function commentEdit () {
    // 	return 'Comment_Edit';
    // }

    // public function commentDelete () {
    // 	return 'Comment_Delete';
    // }

    public function fileRead ($id) {
    	 $new_file = new Files();
       return $new_file->files($id);
    }

    public function fileAdd (Request $r) {
        $new_file = new Files();
       return $new_file->newFiles($r);
    }

    public function fileEdit ($id) {
        $new_file = new Files();
       return $new_file->editFile($id);
    }

    // public function fileDelete (Request $r) {
    // 	 // $r->place = 'class';
    //   //   $new_file = new file();
    //   //   $new_file->newFile($r);
    // }

    public function homeworkRead ($id) {
        $new_homework = new HomeworkClass();

       return $new_homework->HomeWork($id);
    	
    }

    public function homeworkAdd (Request $r) {
        $new_homework = new HomeworkClass();
       return $new_homework->newHomeWork($r);
    
    }

    public function homeworkEdit (Request $r) {
        $new_homework = new HomeworkClass();
        return $new_homework->editHomeWork($r);
    	
    }

    // public function homeworkDelete (Request $r) {
    //     //  $r->place = 'class';
    //     // $new_homework = new homework();
    //     // $new_homework->newHomework($r);
    	
    // }

    public function examRead ($id) {
        $new_exam = new Exams();
       return $new_exam->getExam($id);
    }

    public function examAdd (Request $r) {
        $new_exam = new Exams();
      return $new_exam->exam($r);
    }

    public function examEdit (Request $r) {
        $new_exam = new Exams();
       return $new_exam->editExam($r);
    }

    // public function examDelete (Request $r) {
    // 	  // $r->place = 'class';
    //    //  $new_exam = new Exams();
    //    //  $new_exam->newExam($r);
    // }

    public function informationRead ($id) {
        $new_virtualclass = new VirtualClassClass();
       return $new_virtualclass->newVirtualClass($id);
    }

    public function informationEdit (Request $r) {
        $new_virtualclass = new VirtualClassClass();
       return $new_virtualclass->newPost($r);
    }

    // public function chatAdd (Request $r) {
     // $new_virtualclass = new VirtualClassClass();
     //   return $new_virtualclass->newPost($r);
    // }
    // }

    public function studentRead ($id) {
    	$new_marks = new VirtualClassClass();
         return $new_marks->getUsers($id);
    }

    public function studentAdd (Request $r) {
    	$new_marks = new VirtualClassClass();
         return $new_marks->getUsers($id);
    }

    // public function studentEdit ($id) {
    // $new_marks = new VirtualClassClass();
    //      return $new_marks->getUsers($id);
    // }

    public function studentDelete (Request $r) {
        $new_marks = new VirtualClassClass();
        $new_marks->removeClassUser($r);
    }

    // public function marksRead (Request $r) {
    // 	 $r->place = 'class';
    //     $new_marks = new Marks();
    //     $new_marks->newMarks($r);
    // }

    // public function marksAdd (Request $r) {
    //  $r->place = 'class';
    //     $new_marks = new Marks();
    //     $new_marks->newMarks($r);
    // }

    // public function marksEdit (Request $r) {
    // 	 $r->place = 'class';
    //     $new_marks = new Marks();
    //     $new_marks->newMarks($r);
    // }

    // public function marksDelete (Request $r) {
    //  $r->place = 'class';
    //     $new_marks = new Marks();
    //     $new_marks->newMarks($r);
    // }

    // public function attendanceRead (Request $r) {
    // 	 $r->place = 'class';
    //     $new_attendance = new Attendance();
    //     $new_attendance->newAttendance($r);
    // }

    // public function attendanceAdd (Request $r) {
    // 	 $r->place = 'class';
    //     $new_attendance = new Attendance();
    //     $new_attendance->newAttendance($r);
    // }

    // public function attendanceEdit (Request $r) {
    // 	 $r->place = 'class';
    //     $new_attendance = new Attendance();
    //     $new_attendance->newAttendance($r);

    // public function attendanceDelete (Request $r) {
    // 	 $r->place = 'class';
    //     $new_attendance = new Attendance();
    //     $new_attendance->newAttendance($r);
    // }

    public function settingRead ($id) {
        $new_virtualclass = new VirtualClassClass();
        $new_virtualclass->newPost($id);
    }

    public function settingAdd (Request $r) {
        $new_virtualclass = new VirtualClassClass();
        $new_virtualclass->newPost($r);
    }

    public function settingEdit ($id, Request $r)  {
        $new_virtualclass = new VirtualClassClass();
      return  $new_virtualclass->editVc($id,$r);
    }

    // public function settingDelete () {
    //     $new_virtualclass = new VirtualClassClass();
    //     $new_virtualclass->newPost($r);
    // }

}
