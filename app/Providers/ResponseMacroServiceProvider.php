<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Response;

class ResponseMacroServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        Response::macro('success', function ($data) {
            return Response::json([
                'errors' => false,
                'data'   => $data,
            ]);
        });
        Response::macro('done', function ($data, $message = null) {
            $data = (count($data) > 0) ? $data : 'no post';
            return Response::json([
                'errors' => false,
                // 'data'   => ['result' => $data, 'sucess' => true, 'message' => $message],
                'data'   => $data,
            ]);
        });
        Response::macro('undone', function ($data, $errors = true, $message = null) {
            $data = (count($data) > 0) ? $data : 'no post';
            return Response::json([
                'errors' => $errors,
                'data'   => $data,
                // 'data'   => ['result' => $data, 'sucess' => false, 'message' => $message],
            ]);
        });
        Response::macro('failed', function ($data) {
            return Response::json([

                'errors' => true,
                'data'   => $data,
            ]);
        });
        Response::macro('repeatNotifications', function ($data, $count) {
            return Response::json([
                'errors'  => true,
                'data'    => $data,
                'un_seen' => $count,
            ]);
        });

        Response::macro('error', function ($message, $status = 400) {
            return Response::json([
                'message'     => $status . ' error',
                'errors'      => [
                    'message' => [$message],
                ],
                'status_code' => $status,
            ], $status);
        });
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
