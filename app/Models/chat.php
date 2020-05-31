<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class chat extends Model
{
protected $table = 'chat';

    public function Sender()
    {
        return $this->belongsTo('App\Models\users', 'sender_id', 'id');
    }
    public function Reciever()
    {
        return $this->hasOne('App\Models\users', 'reciever_id', 'id');
    }
     

}
