<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ErpTimesheet extends Model
{
    use HasFactory;

    protected $table = 'erp_timesheets';

    protected $fillable = [
        'erp_collaborator_id',
        'erp_task_id',
        'date',
        'hours',
        'description',
        'status',
    ];

    /**
     * Get the collaborator that owns the timesheet.
     */
    public function collaborator(): BelongsTo
    {
        return $this->belongsTo(ErpCollaborator::class, 'erp_collaborator_id');
    }

    /**
     * Get the task that owns the timesheet.
     */
    public function task(): BelongsTo
    {
        return $this->belongsTo(ErpTask::class, 'erp_task_id');
    }
}
