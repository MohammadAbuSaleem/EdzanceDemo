<?php

namespace App\Http\Controllers;

use App\Post;
use App\Http\Requests;
use Illuminate\Http\Request;

class CreatePostController extends Controller
{
  public function create(Request $request)
  {
      $this->validate($request, [
        'name'  => 'required',
        'topic' => 'required',
        ]);
    
      $post = new Post;
      $post->title = $request->input('name');
      $post->tag = $request->input('name');
      $post->body = $request->input('topic');
	  $post->users_id = 1;
      $post->save();
    
      return response()->success(compact('post'));
  }
  public function show($id)
  {
        $posts = Post::get();

        return response()
        ->success(compact('posts'));
  }
}