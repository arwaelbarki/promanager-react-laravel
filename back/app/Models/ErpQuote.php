<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ErpQuote extends Model
{
    protected $table = 'erp_quotes';

    protected $fillable = [
        'reference',
        'erp_client_id',
        'total_amount',
        'date_issue',
        'date_expiry',
        'status',
    ];

    /**
     * Get the client that owns the quote.
     */
    public function client(): BelongsTo
    {
        return $this->belongsTo(ErpClient::class, 'erp_client_id');
    }
}
