<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ErpProject extends Model
{
    protected $table = 'erp_projects';

    protected $fillable = [
        'name',
        'description',
        'status',
        'start_date',
        'end_date',
        'budget',
        'erp_client_id',
    ];

    /**
     * Get the client that owns the project.
     */
    public function client(): BelongsTo
    {
        return $this->belongsTo(ErpClient::class, 'erp_client_id');
    }

    /**
     * Get the tasks for the project.
     */
    public function tasks(): HasMany
    {
        return $this->hasMany(ErpTask::class, 'erp_project_id');
    }

    /**
     * Get the invoices for the project.
     */
    public function invoices(): HasMany
    {
        return $this->hasMany(ErpInvoice::class, 'erp_project_id');
    }

    /**
     * Get the expenses for the project.
     */
    public function expenses(): HasMany
    {
        return $this->hasMany(ErpExpense::class, 'erp_project_id');
    }
}
