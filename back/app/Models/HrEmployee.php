<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HrEmployee extends Model
{
    use HasFactory;

    protected $table = 'hr_employees';
    protected $guarded = [];

    public function department()
    {
        return $this->belongsTo(HrDepartment::class, 'department_id');
    }

    public function position()
    {
        return $this->belongsTo(HrPosition::class, 'position_id');
    }

    public function contracts()
    {
        return $this->hasMany(HrContract::class, 'employee_id');
    }

    public function leaveBalance()
    {
        return $this->hasOne(HrLeaveBalance::class, 'employee_id');
    }

    public function leaveRequests()
    {
        return $this->hasMany(HrLeaveRequest::class, 'employee_id');
    }

    public function absences()
    {
        return $this->hasMany(HrAbsence::class, 'employee_id');
    }

    public function attendances()
    {
        return $this->hasMany(HrAttendance::class, 'employee_id');
    }

    public function documents()
    {
        return $this->hasMany(HrDocument::class, 'employee_id');
    }

    public function hrRequests()
    {
        return $this->hasMany(HrRequest::class, 'employee_id');
    }
}
