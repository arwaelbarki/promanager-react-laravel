<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HrAuditLog extends Model
{
    use HasFactory;

    protected $table = 'hr_audit_logs';
    protected $guarded = [];
}
