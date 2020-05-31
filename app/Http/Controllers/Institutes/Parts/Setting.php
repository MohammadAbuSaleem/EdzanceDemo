
<?php

namespace App\Http\Controllers\Institutes\Parts;

use App\Http\Controllers\Controller;

class Setting extends Controller implements PermissionInterface
{
    {
        private static $instance = null;
        public static function getInstance()
        {

            if (self::$instance == null) {
                self::$instance = new Setting();
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

    }
