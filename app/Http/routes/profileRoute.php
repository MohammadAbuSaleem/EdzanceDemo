<?php

return [
    'profile'        => ['prfl/{i}/{skp}/{tk}', 'profile', 'get'],
    'ProfilePost'    => ['prflpst/{i}/{skp?}/{tk?}', 'ProfilePost', 'get'],
    'video'          => ['video/{id}/{skip?}/{take?}', 'ProfileVideoPosts', 'get'],
    'images'         => ['images/{id}/{skip?}/{take?}', 'ProfileImagePosts', 'get'],
    'post'           => ['post', 'Post', 'post'],
    'post-update'    => ['post-update', 'PostUpdate', 'post'], // edit
    'profile-wall'   => ['wall/{id}', 'ProfileWall', 'get'],
    'profile-cv'     => ['cv/{id}', 'ProfileCv', 'get'],
    'header'         => ['header/{id}', 'ProfileHeader', 'get'],
    'followers'      => ['followers/{id}/{skip?}/{take?}', 'ProfileFollowers', 'get'],
    'friends'        => ['friends/{id}/{skip?}/{take?}', 'ProfileFriends', 'get'],
    'classes'        => ['classes/{id}/{skip?}/{take?}', 'UserClasses', 'get'],
    'countries-list' => ['countries-list', 'GetCountriesList', 'get'],
    'available-time' => ['update-available-time', 'UpdateAvailableTime', 'post'], // edit
    'add-free-hours' => ['add-instructor-free-hours', 'AddInstructorFreeHours', 'post'], // set
    'get-free-hours' => ['get-instructor-free-hours', 'GetInstructorFreeHours', 'get'], //get
    'del-free-hours' => ['delete-free-hours', 'DeleteFreeHours', 'post'], // delete
    'update-ins-edu' => ['update-ins-edu', 'UpdateInstructorEducation', 'post'], //edit
    'delete-ins-edu' => ['delete-ins-edu', 'DeleteInstructorEducation', 'post'], // delete
    'add-ins-ed'     => ['add-ins-edu', 'AddInstructorEducation', 'post'], // set
    'profile_avatar' => ['profile_avatar', 'ChangeAvatar', 'post'], // set
    'add-ins-ed'     => ['add-ins-edu', 'AddInstructorEducation', 'post'], // set
    'image'          => ['image', 'Image', 'post'], //upload
    'Sec'            => ['sec', 'Sec', 'post'], // edit
    'Uni'            => ['uni', 'Uni', 'post'], // edit
    'Other'          => ['other', 'Other', 'post'], // edit
    'Contact'        => ['contact', 'Contact', 'post'], // edit
    'Inf'            => ['inf', 'Inf', 'post'], // edit
];
