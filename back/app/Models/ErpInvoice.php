<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ErpInvoice extends Model
{
    protected $table = 'erp_invoices';

    protected $fillable = [
        'invoice_number',
        'erp_client_id',
        'erp_project_id',
        'subtotal',
        'tax_rate',
        'total',
        'status',
        'date_issue',
        'date_due',
    ];

    /**
     * Get the client that owns the invoice.
     */
    public function client(): BelongsTo
    {
        return $this->belongsTo(ErpClient::class, 'erp_client_id');
    }

    /**
     * Get the project associated with the invoice.
     */
    public function project(): BelongsTo
    {
        return $this->belongsTo(ErpProject::class, 'erp_project_id');
    }

    /**
     * Get the payments for the invoice.
     */
    public function payments(): HasMany
    {
        return $this->hasMany(ErpPayment::class, 'erp_invoice_id');
    }
}
