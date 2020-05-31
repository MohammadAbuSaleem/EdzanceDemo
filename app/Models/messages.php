<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class messages extends Model
{
   use SoftDeletes;
 protected $table = 'messages';
    public function Sender()
    {
        return $this->belongsTo('App\Models\users', 'sender_id', 'id');
    }
    public function Reciever()
    {
        return $this->hasOne('App\Models\users', 'reciever_id', 'id');
    }
}
