<?php
namespace App\Http\Controllers\Institutes\Parts\Jobs;

use App\Http\Controllers\Classes\Helper;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Institutes\Models\Apply;
use App\Http\Controllers\Institutes\Models\Institute_Jobs;
use App\Http\Controllers\PermissionInterface\PermissionInterface;
use App\Models\taggable;
use App\Models\taxonomy;
use App\Models\User;
use Illuminate\Http\Request;

class jobs extends Controller implements PermissionInterface
{
    private static $instance = null;
    public static function getInstance()
    {

        if (self::$instance == null) {
            self::$instance = new Institute_Jobs();
        }
        return self::$instance;
    }
    public function __call($method, $arguments)
    {
        if (method_exists($this, $method)) {

            $reflect                  = new \ReflectionClass($this);
            $permission               = self::PERMISSION_INTERFACE[$reflect->getShortName()];
            $permission['keys']       = ['id' => 56, 'user_id' => \Auth::user()->id];
            $permission['permission'] = $permission['permission'][$method];
            Helper::isOk($permission);
            return call_user_func_array(array($this, $method), $arguments);
        }
    }
    /*
    Work :: To Add New Jobs InTo DB;
    Variables :: company_name/company_logo/start_date/end_date/work_hour/apply_link/countrey/address/job_title/job_description/work_days/tags;
    Return :: company_name/company_logo/start_date/end_date/work_hour/apply_link/countrey/address/job_title/job_description/work_days/tags;
     */

    private function addJob($Request)
    {

        $this->validate($Request, [
            'start_date'      => 'required',
            'end_date'        => 'required',
            'work_hour'       => 'required',
            'job_title'       => 'required',
            'job_description' => 'required',
            'work_days'       => 'required',
            'tags'            => 'required',
        ]);
        $addjob                  = new Institute_Jobs;
        $addjob->admin_id        = \Auth::user()->id;
        $addjob->start_date      = $Request->start_date;
        $addjob->end_date        = $Request->end_date;
        $addjob->work_hour       = $Request->work_hour;
        $addjob->institute_id    = $Request->institute_id;
        $addjob->job_title       = $Request->job_title;
        $addjob->job_description = $Request->job_description;
        $addjob->work_days       = $Request->work_days;
        $addjob->save();
        if (!is_array($Request->tags)) {
            $Request->tags = explode(',', $Request->tags);
        }
        foreach ($Request->tags as $key => $value) {
            if ($tax = taxonomy::where('body', $value['text'])->first()) {
                $tax->increment('number');
            } else {
                $tax         = new taxonomy;
                $tax->number = 1;
                $tax->body   = $value['text'];
                $tax->save();
            }
            $gr_tax                = new taggable;
            $gr_tax->taggable_id   = $addjob->id;
            $gr_tax->taxonomy_id   = $tax->id;
            $gr_tax->taggable_type = 'App\Http\Controllers\Institutes\Models\Institute_Jobs';
            $gr_tax->save();
        }
        return ('Added Done');
    }
    /*
    Work :: To Get All Jobs From DB;
    Variables :: $id / $skip / $take ;
    Return :: company_name/company_logo/start_date/end_date/work_hour/apply_link/countrey/address/job_title/job_description/work_days/tags as post;
     */
    private function getJobs($id, $skip = 0, $take = 10)
    {
        if ($id == 'all' || $id == null2) {
            $jobs = Institute_Jobs::skip($skip)->take($take)->orderBy('created_at', 'desc')->get();
        } else {
            $jobs = Institute_Jobs::where('id', $id)->skip($skip)->take($take)->orderBy('created_at', 'desc')->get();
        }
        return $jobs;
    }
    /*
    Work :: To Edit  Jobs InTo DB;
    Variables :: company_name/company_logo/start_date/end_date/work_hour/apply_link/countrey/address/job_title/job_description/work_days/tags;
    Return :: company_name/company_logo/start_date/end_date/work_hour/apply_link/countrey/address/job_title/job_description/work_days/tags;
     */
    private function editJob($id, Request $Request)
    {
        $editjobs                  = Institute_Jobs::where('id', $id)->first();
        $editjobs->start_date      = ($Request->start_date) ? $Request->start_date : $editjobs->start_date;
        $editjobs->end_date        = ($Request->end_date) ? $Request->end_date : $editjobs->end_date;
        $editjobs->work_hour       = ($Request->work_hour) ? $Request->work_hour : $editjobs->work_hour;
        $editjobs->job_title       = ($Request->job_title) ? $Request->job_title : $editjobs->job_title;
        $editjobs->job_description = ($Request->job_description) ? $Request->job_description : $editjobs->job_description;
        $editjobs->work_days       = ($Request->work_days) ? $Request->work_days : $editjobs->work_days;
        $editjobs->save();
        if ($Request->tags) {
            foreach ($Request->tags as $key => $value) {
                if ($tax = taxonomy::where('body', $value['text'])->first()) {
                    $tax->increment('number');
                } else {
                    $tax         = new taxonomy;
                    $tax->number = 1;
                    $tax->body   = $value['text'];
                    $tax->save();
                }
                $gr_tax                = new taggable;
                $gr_tax->taggable_id   = $editjobs->id;
                $gr_tax->taxonomy_id   = $tax->id;
                $gr_tax->taggable_type = 'App\Http\Controllers\Institutes\Models\Institute_Jobs';
                $gr_tax->save();
            }
        }
        return ('Success');
    }
    /*
    Work :: To Delete  Jobs From DB;
    Variables :: $id;
    Return ::Deleted / Error;
     */
    private function deleteJob($id)
    {
        return (Institute_Jobs::where('id', $id)->delete()) ? 'Deleted Done' : 'Deleted Error';
    }
    /*Work :: To Apply For New Jobs*/
    private function Apply(Request $Request, $id)
    {
        $apply               = new Apply;
        $apply->user_id      = \Auth::user()->id;
        $apply->job_id       = $Request->job_id;
        $apply->attachment   = $Request->attachment;
        $apply->cover_letter = $Request->cover_letter;
        $apply->seen         = $Request->seen;
        $apply->save();
        return $apply;
    }
    /* to get appled jobs */
    private function GetApply($id)
    {
        $getapply = Apply::where('id', $id)->get();
        return $getapply;
    }

}
