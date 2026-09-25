<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ErpPayment extends Model
{
    protected $table = 'erp_payments';

    protected $fillable = [
        'erp_invoice_id',
        'amount',
        'date_payment',
        'payment_method',
    ];

    /**
     * Get the invoice that owns the payment.
     */
    public function invoice(): BelongsTo
    {
        return $this->belongsTo(ErpInvoice::class, 'erp_invoice_id');
    }
}
