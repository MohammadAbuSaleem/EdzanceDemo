<?php
namespace App\Http\Controllers\Debugger;

/**
 *
 */
class Debugger
{

    public function __construct($obj)
    {
        dd($obj->debug);
    }

    public function __call($method, $arguments)
    {

        if (method_exists($this, $method)) {
            $reflect    = new Debugger($this);
            $permission = self::PERMISSION_INTERFACE[$reflect->getShortName()];
            // $permission['keys']     = ['class_id' => ''];
            $permission['relation']   = classusers::classs($this->class_id)->addSelect('class_files.id as file_id', 'classusers.*', 'class_files.*')->where('classusers.uid', \Auth::user()->id)->leftJoin('class_files', 'classusers.class_id', '=', 'class_files.class_id')->first();
            $permission['permission'] = $permission['permission'][$method];
            Helper::isOk($permission);
            return call_user_func_array(array($this, $method), $arguments);
        }
    }
}
