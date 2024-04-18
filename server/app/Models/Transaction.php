<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;
    protected $table = 'transaction';
    protected $fillable = [
        'buyer_users_id',
        'seller_users_id',
        'publication_id',
        'publication_type_id',
        'quantity',
        'unity_price',
        'date',
        'description',
        'total'
    ];
    public $timestamps = false;
}
