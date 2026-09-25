<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ErpCollaborator extends Model
{
    use HasFactory;

    protected $table = 'erp_collaborators';

    protected $fillable = [
        'name',
        'email',
        'role',
        'hourly_rate',
    ];

    /**
     * Get the timesheets for the collaborator.
     */
    public function timesheets(): HasMany
    {
        return $this->hasMany(ErpTimesheet::class, 'erp_collaborator_id');
    }

    /**
     * Get the contracts for the collaborator.
     */
    public function contracts(): HasMany
    {
        return $this->hasMany(ErpContract::class, 'erp_collaborator_id');
    }

    /**
     * Get the absences for the collaborator.
     */
    public function absences(): HasMany
    {
        return $this->hasMany(ErpAbsence::class, 'erp_collaborator_id');
    }

    /**
     * Get the expenses for the collaborator.
     */
    public function expenses(): HasMany
    {
        return $this->hasMany(ErpExpense::class, 'erp_collaborator_id');
    }

    /**
     * Get the comments written by the collaborator.
     */
    public function comments(): HasMany
    {
        return $this->hasMany(ErpComment::class, 'erp_collaborator_id');
    }

    /**
     * Get the tasks assigned to the collaborator.
     */
    public function tasks(): HasMany
    {
        return $this->hasMany(ErpTask::class, 'erp_collaborator_id');
    }
}
