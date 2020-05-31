<?php
namespace App\Http\Controllers\VClass;

interface MyPermission
{
    const PERMISSION_INTERFACE = [
        /* Start Of Virtual Class */
        // mangment function name and permission
        'Mangment'   => [
            'permission' => [
                'removeClassUser'          => 'class.class.delete',
                'add'                      => 'home.class.add',
                'search'                   => '',
                'joinClass'                => 'home.class.join',
                'enter'                    => 'class.class.read',
                'addUserByInsrtructor'     => 'class.class.read',
                'classes'                  => '',
                'archived'                 => '',
                'archiving'                => '',
                'activating'               => '',
                'remove'                   => '',
                'leave'                    => '',
                'accept'                   => '',
                'delete'                   => 'class.class.delete',
                'acceptJoin'               => 'class.class.add',
                'joinRequests'             => 'class.class.add',
                'addModerator'             => 'class.class.add',
                'getUniversityInformation' => 'class.class.add',
                'get'                      => '',
            ],

            // Forigen Key and Model Name
            'forigen'    => 'uid',
            'model'      => 'App\\Models\\classusers',

        ],
        'Home'       => [
            'permission' => ['me'     => 'home.me.read',
                'suggest'                 => 'home.suggest.read',
                'suggestAll'              => 'home.suggest.read',
                'UserNotifications'       => 'home.notify.read',
                'seenNotifications'       => 'home.notify.seen',
                'ResetNotificationsToken' => 'home.notify.reset',
                'addclass'                => 'home.class.add',
                'joinClass'               => 'home.class.join',
            ],

            // Forigen Key and Model Name
            'forigen'    => 'uid',
            'model'      => 'App\\Models\\classusers',

        ],
        // Attendance function name and permission
        'Attendance' => [

            'permission' => [
                'details'           => 'class.attendance.raed',
                'add'               => 'class.attendance.add',
                'getUsers'          => 'class.attendance.read',
                'absenceCount'      => 'class.attendance.read',
                'classAbsenceCount' => 'class.attendance.read',
                'fathers'           => 'class.attendance.read',
                'edit'              => 'class.attendance.edit',
                'delete'            => 'class.attendance.delete'],

            // Forigen Key and Model Name
            'forigen'    => 'uid',
            'model'      => 'App\\Models\\Attendance',
        ],
        // Mark function name and permission
        'Mark'       => [

            'permission' => [
                'getAssessments' => 'class.mark.read',
                'add'            => 'class.mark.add',
                'edit'           => 'class.mark.edit',
                'addMarks'       => '',
                'getMarks'       => 'class.mark.read',
                'get'            => 'class.mark.read',
                'delete'         => 'class.mark.delete',
                'studentmark'    => 'class.mark.read',
                'exammark'       => 'class.mark.read',
                'fathers'        => 'class.mark.read'],

            // Forigen Key and Model Name
            'forigen'    => 'uid',
            'model'      => 'App\\Models\\mark',
        ],
        // Exam function name and permission
        'Exam'       => [

            'permission' => [
                'get'    => 'class.exam.read',
                'add'    => 'class.exam.add',
                'edit'   => 'class.exam.edit',
                'delete' => 'class.exam.delete'],

            // Forigen Key and Model Name
            'forigen'    => 'uid',
            'model'      => 'App\\Models\\Exam',
        ],
        // File function name and permission
        'Files'      => [

            'permission' => [
                'add'    => 'class.files.add',
                'edit'   => 'class.files.edit',
                'upload' => 'class.files.upload',
                'delete' => 'class.files.delete'],

            // Forigen Key and Model Name
            'forigen'    => 'uid',
            'model'      => 'App\\Models\\class_files',
        ],
        // Homework function name and permission
        'HomeWork'   => [

            'permission' => [
                'add'               => 'class.homeWork.add',
                'edit'              => 'class.homeWork.edit',
                'upload'            => 'class.homeWork.upload',
                'delete'            => 'class.homeWork.delete',
                'addHomeworkAnswer' => '',
                'review'            => '',
                'getanswer'         => '',

            ],

            //Forigen Key and Model Name
            'forigen'    => 'uid',
            'model'      => 'App\\Models\\homework',
        ],
        // Information function name and permission
        'Info'       => [

            'permission' => [
                'user'     => 'class.information.read',
                'edit'     => 'class.information.edit',
                'justUser' => 'class.information.read'],
            // Forigen Key and Model Name
            'forigen'    => 'id',
            'model'      => 'App\\Models\\classusers',
        ],

        /* End Of Vitrual Class */
    ];
}
