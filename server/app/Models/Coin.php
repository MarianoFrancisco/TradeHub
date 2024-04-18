<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Coin extends Model
{
    use HasFactory;
    protected $table = 'user_coin';
    protected $fillable = [
        'users_id',
        'system_coin',
        'volunteerism_coin'
    ];

    public $timestamps = false;
}
