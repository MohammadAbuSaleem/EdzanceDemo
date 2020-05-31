<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class SocialController extends Controller
{
   public function Post_Read () {
   	return 'Post_Read';
   }

   public function Post_Add () {
   	return 'Post_Add';
   }

   public function Post_Edit () {
   	return 'Post_Edit';
   } 

   public function Post_Delete () {
   	return 'Post_Delete';
   }

     public function Comment_Read () {
   	return 'Comment_Read';
   }

   public function Comment_Add () {
   	return 'Comment_Add';
   }

   public function Comment_Edit () {
   	return 'Comment_Edit';
   } 

   public function Comment_Delete () {
   	return 'Comment_Delete';
   }

      public function Exprission_Read () {
   	return 'Exprission_Read';
   }

   public function Exprission_Add () {
   	return 'Exprission_Add';
   }

   public function Exprission_Edit () {
   	return 'Exprission_Edit';
   } 

   public function Exprission_Delete () {
   	return 'Exprission_Delete';
   }
}
