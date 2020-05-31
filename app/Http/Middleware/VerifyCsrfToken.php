<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as BaseVerifier;

class VerifyCsrfToken extends BaseVerifier
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array
     */

    protected $except = [
        //
    'me-debug/exp-user',
    'me-debug/test-user',
    'auth-debug/upload-mobile',
    ];
}
