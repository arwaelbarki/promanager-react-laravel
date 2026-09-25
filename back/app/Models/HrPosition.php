<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HrPosition extends Model
{
    use HasFactory;

    protected $table = 'hr_positions';
    protected $guarded = [];

    public function department()
    {
        return $this->belongsTo(HrDepartment::class, 'department_id');
    }

    public function employees()
    {
        return $this->hasMany(HrEmployee::class, 'position_id');
    }
}
