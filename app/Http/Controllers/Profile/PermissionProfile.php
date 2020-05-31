<?php
namespace App\Http\Controllers\Profile;

interface PermissionProfile
{
    const PERMISSION_INTERFACE = [
        'Cv '       => [

            'permission' => [
                'ProfileCv'                 => 'profile.cv.read',
                'GetCountriesList'          => 'profile.cv.read',
                'UpdateAvailableTime'       => 'profile.cv.read',
                'AddInstructorFreeHours'    => 'profile.cv.add',
                'GetInstructorFreeHours'    => 'profile.cv.read',
                'DeleteFreeHours'           => 'profile.cv.delete',
                'UpdateInstructorEducation' => 'profile.cv.edit',
                'DeleteInstructorEducation' => 'profile.cv.delete',
                'AddInstructorEducation'    => 'profile.cv.add',
                'Sec'                       => 'profile.cv.read',
                'Uni'                       => 'profile.cv.read',
                'Other'                     => 'profile.cv.read',
                'Contact'                   => 'profile.cv.read',
                'Inf'                       => 'profile.cv.read'],

            // Forigen Key and Model Name
            'forigen'    => 'id',
            'model'      => 'App\\Models\\student_info',
        ],

        // About Function Name and Permission
        'About'     => [

            'permission' => ['ProfileWall' => 'About.read'],

            // Forigen Key and Model Name
            'forigen'    => 'user_id',
            'model'      => 'App\\Models\\About',
        ],

        'Followers' => [

            'permission' => [

                'followers' => 'followers.read',
                'friends'   => 'friends.read'],

            // Forigen Key and Model Name
            'forigen'    => 'user_id',
            'model'      => 'App\\Models\\Followers',
        ],

        // 'Image'     => [

        //     'permission' => ['ProfileWall' => 'About.read'],

        //     // Forigen Key and Model Name
        //     'forigen'    => 'user_id',
        //     'model'      => 'App\\Models\\Image',
        // ],

        // 'Video'     => [

        //     'permission' => ['ProfileWall' => 'About.read'],

        //     // Forigen Key and Model Name
        //     'forigen'    => 'user_id',
        //     'model'      => 'App\\Models\\Video',
        // ],
    ];
}
