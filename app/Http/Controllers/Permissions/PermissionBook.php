<?php
namespace App\Http\Controllers\Permissions;

interface PermissionBook
{
    const PERMISSION_INTERFACE = [

        'BookBank' => [

            'permission' => ['addBook' => '',
                'editBook'                 => 'home.book.edit',
                'getBooks'                 => 'home.book.read',
                'deleteBook'               => 'home.book.delete'],

            /* Forigen Key and Model Name */
            'forigen'    => '',
            'model'      => 'App\\Models\\Bookbank',
        ],
    ];
}
