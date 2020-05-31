<?php
namespace App\Http\Controllers\PermissionInterface;

interface PermissionInterface
{
    const PERMISSION_INTERFACE = [
        /* Start Of Virtual Class */
        // mangment function name and permission
        'Mangment'   => [
            'permission' => ['removeClassUser' => 'class.class.delete',
                'add'                              => 'home.class.add',
                'search'                           => '',
                'joinClass'                        => 'home.class.join',
                'enter'                            => 'class.class.read',
                'leave'                            => '',
                'accept'                           => '',
                'delete'                           => 'class.class.delete',
                'acceptJoin'                       => 'class.class.add',
                'joinRequests'                     => 'class.class.add',
                'addModerator'                     => 'class.class.add',
                'getUniversityInformation'         => 'class.class.add',
                'get'                              => 'class.class.read'],

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
                'getAttendance'     => 'class.attendance.raed',
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
                'add'    => 'class.homeWork.add',
                'edit'   => 'class.homeWork.edit',
                'upload' => 'class.homeWork.upload',
                'delete' => 'class.homeWork.delete'],

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

        /* Start Book Bank and Jobs*/

        // BookBank function name and permission
        'BookBank'   => [

            'permission' => ['addBook' => '',
                'editBook'                 => 'home.book.edit',
                'getBooks'                 => 'home.book.read',
                'deleteBook'               => 'home.book.delete'],

            /* Forigen Key and Model Name */
            'forigen'    => '',
            'model'      => 'App\\Models\\Bookbank',
        ],

        // Information function name and permission
        'jobs'       => [

            'permission' => [
                'addJob'    => 'home.job.add',
                'getJobs'   => 'home.job.read',
                'editJob'   => 'home.job.edit',
                'deleteJob' => 'home.job.delete'],

            // Forigen Key and Model Name
            'forigen'    => 'id',
            'model'      => 'App\\Models\\Jobs',
        ],

        /* Ends Of Book Bank and Jobs */

        /* Start Of Profile */

        // Cv function name and permission
        'Cv '        => [

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
        'About'      => [

            'permission' => ['ProfileWall' => 'About.read'],

            // Forigen Key and Model Name
            'forigen'    => 'user_id',
            'model'      => 'App\\Models\\About',
        ],

        /* Ends Of Profile */
    ];
}
