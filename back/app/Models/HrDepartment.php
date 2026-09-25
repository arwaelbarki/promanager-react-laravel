<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HrDepartment extends Model
{
    use HasFactory;

    protected $table = 'hr_departments';
    protected $guarded = [];

    public function positions()
    {
        return $this->hasMany(HrPosition::class, 'department_id');
    }

    public function employees()
    {
        return $this->hasMany(HrEmployee::class, 'department_id');
    }
}
