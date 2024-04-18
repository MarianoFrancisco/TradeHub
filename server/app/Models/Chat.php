<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    use HasFactory;
    protected $table = 'chat';
    protected $fillable = [
        'buyer_users_id',
        'seller_users_id',
        'publication_id',
    ];
    public $timestamps = false;
}
