<?php
namespace App\Http\Controllers\Social\parents;

interface PostInterface
{
    public function changeExp($id, $exp); /* use to change exp on post */
    public function textRead(); /* to get all post that type is text */
    public function imageRead(); /* to get all post with type image */
    public function videoRead(); /* to get all post with type video */
    public function urlRead(); /* to get all post with type url */
    public function textAdd($r); /* to add new post with type text */
    public function imageAdd($r); /* to add new post with type image */
    public function videoAdd($r); /* to add new post with type video */
    public function urlAdd($r); /* to add new post with type url */
    public function newClassPostadd($r); /* to add new post when create new class */
    public function followPostadd($r); /* to follow post */
    public function avatarImageadd($r); /* upload avatar image post */
    public function coverImageadd($r); /* upload cover image post */
}
