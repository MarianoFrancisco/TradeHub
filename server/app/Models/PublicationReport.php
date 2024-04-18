<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PublicationReport extends Model
{
    use HasFactory;
    protected $table = 'publication_reported';
    protected $fillable = [
        'users_id',
        'publication_id',
        'description',
        'date'
    ];
    public $timestamps = false;
}
