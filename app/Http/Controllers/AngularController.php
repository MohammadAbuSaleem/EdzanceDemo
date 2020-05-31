<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Foundation\Application;

class AngularController extends Controller
{
    /**
     * Serve the angular application.
     *
     * @return JSON
     */
    public function serveApp()
    {
        return view('index');
    }
    public function getTest()
    {
        return $environment = \App::environment();
        // return var_dump(getenv('APP_ENV')); ;
    }

    public function train()
    {
        $data = \DB::table('contact_us')->select('title', 'created_at')->get();
        foreach ($data as $key => &$value) {
            $value           = (array) $value;
            $sumday          = (date('d') - date('d', strtotime($value['created_at']))) * 1;
            $summonth        = (date('m') - date('m', strtotime($value['created_at']))) * 30;
            $sumyear         = (date('Y') - date('Y', strtotime($value['created_at']))) * 365;
            $value['Before'] = $sumday + $summonth + $sumyear;
        }
        // for ($i = 0; $i < count($data) - 1; $i++) {
        //     $data[$i]           = (array) $data[$i];
        //     $sumday             = (date('d') - date('d', strtotime($data[$i]['created_at']))) * 1;
        //     $summonth           = (date('m') - date('m', strtotime($data[$i]['created_at']))) * 30;
        //     $sumyear            = (date('Y') - date('Y', strtotime($data[$i]['created_at']))) * 365;
        //     $data[$i]['Before'] = $sumday + $summonth + $sumyear;
        // }

        return $data;

        // return var_dump(getenv('APP_ENV')); ;
    }
    /**
     * Page for unsupported browsers.
     *
     * @return JSON
     */
    public function unsupported()
    {
        return view('unsupported_browser');
    }
}
