<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ErpContract extends Model
{
    protected $table = 'erp_contracts';

    protected $fillable = [
        'erp_collaborator_id',
        'contract_type',
        'base_salary',
        'date_start',
        'date_end',
    ];

    /**
     * Get the collaborator that owns the contract.
     */
    public function collaborator(): BelongsTo
    {
        return $this->belongsTo(ErpCollaborator::class, 'erp_collaborator_id');
    }
}
