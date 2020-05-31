<?php
return [
    'readPost'    => ['post/{skip}/{take}', 'postRead', 'get', 'social.post.read'],
    'deletePost'  => ['del-post', 'postDelete', 'post', 'social.post.delete'],
    'editPost'    => ['post-update', 'postEdit', 'post', 'social.post.edit'],
    'post'        => ['post/{id}/{skip}/{take}', 'getPost', 'get'],
    'post'        => ['post', 'postAdd', 'post'],
    'image'       => ['image', 'postImag', 'post'],
    'image-posts' => ['image-posts/{id}/{skip}/{take}', 'getProfileImagePosts', 'get'],
    'video-posts' => ['video-posts/{id}/{skip}/{take}', 'getProfileVideoPosts', 'get'],
    'addComment'  => ['comnt/{id}/create', 'commentAdd', 'post', 'social.comment.add'],
    'editComment' => ['comnt/{i}/{plc}', 'commentRead', 'get', 'social.comment.read'],
    'follows'     => ['{frnd}/flw/{updt}', 'follows', 'post'],
    'followrs'    => ['{frnd}/flwr/{updt}', 'followrs', 'post'],
    'exp'         => ['exp/{i}/{exp}/{plc}', 'exp', 'post', 'social.exprission.add'],
    'suggest'     => ['suggest', 'suggest', 'get'],
    'post-page'   => ['post-page/{postId}', 'getPostPage', 'get'],
];
