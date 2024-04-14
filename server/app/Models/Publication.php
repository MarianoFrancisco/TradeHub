<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Publication extends Model
{
    use HasFactory;
    protected $table = 'publication';
    protected $fillable = [
        'users_id',
        'publication_type_id',
        'publication_state_id',
        'category_id',
        'title',
        'description',
        'image',
        'quantity',
        'unity_price',
        'date'
    ];
    public $timestamps = false;
}
