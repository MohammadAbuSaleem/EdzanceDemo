<?php
namespace App\Http\Controllers\Institutes;

interface myPermissions
{
    const PERMISSION_INTERFACE = [

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
        // Attendance function name and permission
        'Info'       => [

            'permission' => [
                'getInformation'    => 'class.attendance.raed',
                'addInformation'    => 'class.attendance.add',
                'get'               => 'class.attendance.read',
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
    ];
}
