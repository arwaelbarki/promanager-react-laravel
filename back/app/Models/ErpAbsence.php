<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ErpAbsence extends Model
{
    protected $table = 'erp_absences';

    protected $fillable = [
        'erp_collaborator_id',
        'type',
        'date_start',
        'date_end',
        'status',
    ];

    /**
     * Get the collaborator that owns the absence request.
     */
    public function collaborator(): BelongsTo
    {
        return $this->belongsTo(ErpCollaborator::class, 'erp_collaborator_id');
    }
}
