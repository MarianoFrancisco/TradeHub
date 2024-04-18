<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MessageChat extends Model
{
    use HasFactory;
    protected $table = 'message_chat';
    protected $fillable = [
        'chat_id',
        'users_id',
        'date',
        'message'
    ];
    public $timestamps = false;
}
