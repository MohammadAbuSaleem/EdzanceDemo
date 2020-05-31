<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Classes\VirtualClass\FilesClass;
use App\Http\Controllers\Classes\VirtualClass\HomeworkClass;
use App\Http\Controllers\Classes\VirtualClass\Exams;
use App\Http\Controllers\Classes\VirtualClass\VirtualClassClass;
use App\Http\Controllers\Classes\Posts;
class VClassController extends Controller
{
    /*
    public function Post_Add (Request $r) {
        $new_post = new Posts();
        return $new_post->me;
        $new_post->newPost($r);
    }
    public function postEdit ($id) {
        $new_post = new Post();
        return $new_post->me;
        $new_post->newPost($r);
    }

    public function postRead (Request $r) {
        $new_post = new Post();
        return $new_post->me;
        $new_post->newPost($r);
    }

    public function commentRead () {
     return 'Comment_Read';
    }

    public function commentAdd () {
     return 'Comment_Add';
    }

    public function commentEdit () {
     return 'Comment_Edit';
    }

    public function commentDelete () {
     return 'Comment_Delete';
    }
    */

    public function classRead ($id){
        $new_post = new VirtualClassClass();
        return $new_post->classRead($id);
    }

    public function classAdd (Request $r){
        $r->place = 'class';
        $new_post = new VirtualClassClass();
        return $new_post->Addclass($r);
    }

    public function joinRequest ($classId){
        $new_post = new VirtualClassClass();
        return $new_post->JoinRequests($classId);
    }

    public function classEnter (Request $r){
        $new_post = new VirtualClassClass();
        return $new_post->addClasses($r);
    }
    public function classFiles (Request $r){
        $r->place = 'class';
        $new_post = new FilesClass();
        return $new_post->Uploadfl($r);
    }
    public function HomeWorkUpload (Request $r){
        $new_post = new VirtualClassClass();
        return $new_post->addClasses($r);
    }

    public function Uploadfl (Request $request){
        $new_file = new FilesClass();
        return $new_file->Uploadfl($request);
    }

    public function postDelete (Request $r) {
        $new_post = new Posts();
        return $new_post->delClassPost($r);
        $new_post->newPost($r);
    }

    public function fileRead ($id) {
    	 $new_file = new FilesClass();
       return $new_file->files($id);
    }

    public function fileAdd (Request $request) {
        $new_file = new FilesClass();
       return $new_file->newFiles($request);
    }

    public function fileEdit (Request $request) {
        $new_file = new FilesClass();
       return $new_file->editFile($request);
    }

    // public function fileDelete (Request $r) {S
    //   //   $new_file = new file();
    //   //   $new_file->newFile($r);
    // }

    public function homeworkRead ($id) {
        $new_homework = new HomeworkClass();
       return $new_homework->HomeWork($id);
    }

    public function homeworkAdd (Request $request) {
        $new_homework = new HomeworkClass();
       return $new_homework->newHomeWork($request);   
    }

    public function homeworkEdit (Request $request) {
        $new_homework = new HomeworkClass();
        return $new_homework->editHomeWork($request);
    }

    // public function homeworkDelete (Request $r) {
    //     // $new_homework = new homework();
    //     // $new_homework->newHomework($r);
    // }

    public function examRead ($id) {
        $new_exam = new Exams();
       return $new_exam->getExam($id);
    }

    public function examAdd (Request $request) {
        $new_exam = new Exams();
      return $new_exam->exam($request);
    }

    public function examEdit (Request $r) {
        $new_exam = new Exams();
       return $new_exam->editExam($r);
    }

    // public function examDelete (Request $r) {
    //    //  $new_exam = new Exams();
    //    //  $new_exam->newExam($r);
    // }

    public function informationAdd ($id , Request $request) {
        $new_virtualclass = new VirtualClassClass();
       return $new_virtualclass->editVc($id,$request);
    }

    public function chatAdd (Request $r) {
     $new_virtualclass = new VirtualClassClass();
       return $new_virtualclass->chat($r);
    }

    public function studentRead ($id) {
    	$new_marks = new VirtualClassClass();
         return $new_marks->getUsers($id);
    }

    public function studentAdd (Request $request) {
    	$new_marks = new VirtualClassClass();
         return $new_marks->joinClass($request);
    }

    public function studentEdit (Request $request) {
    $new_marks = new VirtualClassClass();
         return $new_marks->removeClassUser($request);
    }

    public function marksRead ($id) {
        $new_marks = new MarksClass();
        $new_marks->get($id);
    }

    public function marksAdd ($id) {
        $new_marks = new MarksClass();
        $new_marks->newMarks($id);
    }

    public function marksDelete ($id) {
        $new_marks = new MarksClass();
        $new_marks->resetAll($id);
    }

    // public function attendanceRead (Request $r) {
    //     $new_attendance = new Attendance();
    //     $new_attendance->newAttendance($r);
    // }

    // public function attendanceAdd (Request $r) {
    //     $new_attendance = new Attendance();
    //     $new_attendance->newAttendance($r);
    // }

    // public function attendanceEdit (Request $r) {
    //     $new_attendance = new Attendance();
    //     $new_attendance->newAttendance($r);

    // public function attendanceDelete (Request $r) {
    //     $new_attendance = new Attendance();
    //     $new_attendance->newAttendance($r);
    // }

    public function settingRead ($id) {
        $new_virtualclass = new VirtualClassClass();
       return $new_virtualclass->newPost($id);
    }

    public function settingAdd (Request $r) {
        $new_virtualclass = new VirtualClassClass();
       return $new_virtualclass->newPost($r);
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
