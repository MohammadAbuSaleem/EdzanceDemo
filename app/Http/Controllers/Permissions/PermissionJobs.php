<?php
namespace App\Http\Controllers\Permissions;

interface PermissionJobs
{
    const PERMISSION_INTERFACE = [
        'jobs' => [

            'permission' => [
                'addJob'    => 'home.job.add',
                'getJobs'   => 'home.job.read',
                'editJob'   => 'home.job.edit',
                'deleteJob' => 'home.job.delete'],

            // Forigen Key and Model Name
            'forigen'    => 'id',
            'model'      => 'App\\Models\\Jobs',
        ],
    ];
}
