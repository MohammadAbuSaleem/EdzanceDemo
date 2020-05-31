<?php

namespace App\Http\Controllers\Social;

use App\Http\Controllers\Controller;

class posts extends Controller
{
    public $post = null;
    public function __construct($place = false, $id = false, $type = null, $placeId = null)
    {
        $true = false;
        $place = ($place=='class') ? 'vc' :$place ;
        switch ($place) {
            case 'home':
            case 'profile':
            case 'group':
            case 'vc':
            case 'institute':
            case 'course':
                $true = true;
                break;
            default:
                $true = false;
                break;
        }
        $a          = strtr(get_class(), [(new \ReflectionClass($this))->getShortName() => 'childs\\' . $place]);
        $this->post = new $a($id, $place, $placeId, $type);
        return $this;

    }

}
