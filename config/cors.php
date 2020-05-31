<?php

return [
    /*
     |--------------------------------------------------------------------------
     | Laravel CORS
     |--------------------------------------------------------------------------
     |

     | allowedOrigins, allowedHeaders and allowedMethods can be set to array('*')
     | to accept any value, the allowed methods however have to be explicitly listed.
     |
     */
    'supportsCredentials' => true,
    'accessControlAllowOrigin'=>['*'],
    'ahmad'=>['athamneh'],
    'allowedOrigins' => ['*'],
    'allowedHeaders' => ['*'],
    'allowedMethods' => [ 'POST', 'PUT'],
    'exposedHeaders' => [],
    'Content-Type'   => ['application/json'],
    'maxAge' => 0,
    'hosts' => [],
];
