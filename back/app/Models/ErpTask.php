<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ErpTask extends Model
{
    protected $table = 'erp_tasks';

    protected $fillable = [
        'title',
        'description',
        'priority',
        'status',
        'visibility',
        'due_date',
        'erp_project_id',
        'erp_collaborator_id',
    ];

    /**
     * Get the project that owns the task.
     */
    public function project(): BelongsTo
    {
        return $this->belongsTo(ErpProject::class, 'erp_project_id');
    }

    /**
     * Get the comments for the task.
     */
    public function comments(): HasMany
    {
        return $this->hasMany(ErpComment::class, 'erp_task_id');
    }

    /**
     * Get the timesheets for the task.
     */
    public function timesheets(): HasMany
    {
        return $this->hasMany(ErpTimesheet::class, 'erp_task_id');
    }

    /**
     * Get the collaborator assigned to the task.
     */
    public function collaborator(): BelongsTo
    {
        return $this->belongsTo(ErpCollaborator::class, 'erp_collaborator_id');
    }
}
