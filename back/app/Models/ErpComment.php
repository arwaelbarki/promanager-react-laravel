<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ErpComment extends Model
{
    protected $table = 'erp_comments';

    protected $fillable = [
        'author',
        'content',
        'erp_task_id',
        'erp_collaborator_id',
        'erp_client_id',
    ];

    /**
     * Get the task that owns the comment.
     */
    public function task(): BelongsTo
    {
        return $this->belongsTo(ErpTask::class, 'erp_task_id');
    }

    /**
     * Get the collaborator who wrote the comment.
     */
    public function collaborator(): BelongsTo
    {
        return $this->belongsTo(ErpCollaborator::class, 'erp_collaborator_id');
    }

    /**
     * Get the client who wrote the comment.
     */
    public function client(): BelongsTo
    {
        return $this->belongsTo(ErpClient::class, 'erp_client_id');
    }
}
