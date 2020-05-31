<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Institutes\institutes;
use Illuminate\Http\Request;

class InstituteController extends Controller
{
    public function postRead(Request $r)
    {
        $inst = institutes::getInstance(['institute' => $r->institute, 'request' => $r->all()]);

        return response()->success($inst);
        return 'Post_Read';
    }
    public function postAdd(Request $r)
    {
        $inst = institutes::getInstance(['institute' => $r->institute, 'request' => $r->all()])->AddInstitue();
        return response()->success($inst);

    }
    public function getSearchByTag($q, $parent = null)
    {
        $search = institutes::getInstance([])->searchByTag($q, $parent);
        return response()->success($search);
    }
    public function anySearchMainInstitute($q, $parent = null)
    {
        $parent = (func_num_args() > 2) ? $parent : 0;
        // dd($q);
        $search = institutes::getInstance([])->searchMainInstitute2($q, $parent);
        return response()->success($search);

    }
    public function anySearchInstitute($q, $parent = null)
    {
        $search = institutes::getInstance([])->searchInstitute($q, $parent);
        // dd($search);
        return response()->success($search);

    }
    public function anyMainInstitute($q = 14)
    {
        return response()->success(institutes::getInstance([])->MainInstitute($q));
    }
    public function getInstitute($q)
    {
        $search = institutes::getInstance([])->Institutes($q);
        return response()->success($search);

    }
}
