<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HrNotification extends Model
{
    use HasFactory;

    protected $table = 'hr_notifications';
    protected $guarded = [];
}
