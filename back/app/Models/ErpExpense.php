<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ErpExpense extends Model
{
    protected $table = 'erp_expenses';

    protected $fillable = [
        'erp_collaborator_id',
        'erp_project_id',
        'category',
        'amount',
        'date_expense',
        'status',
    ];

    /**
     * Get the collaborator that submitted the expense.
     */
    public function collaborator(): BelongsTo
    {
        return $this->belongsTo(ErpCollaborator::class, 'erp_collaborator_id');
    }

    /**
     * Get the project associated with the expense.
     */
    public function project(): BelongsTo
    {
        return $this->belongsTo(ErpProject::class, 'erp_project_id');
    }
}
