<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ErpClient extends Model
{
    protected $table = 'erp_clients';

    protected $fillable = [
        'name',
        'email',
        'phone',
        'company',
    ];

    /**
     * Get the projects for the client.
     */
    public function projects(): HasMany
    {
        return $this->hasMany(ErpProject::class, 'erp_client_id');
    }

    /**
     * Get the quotes for the client.
     */
    public function quotes(): HasMany
    {
        return $this->hasMany(ErpQuote::class, 'erp_client_id');
    }

    /**
     * Get the invoices for the client.
     */
    public function invoices(): HasMany
    {
        return $this->hasMany(ErpInvoice::class, 'erp_client_id');
    }

    /**
     * Get the comments written by the client.
     */
    public function comments(): HasMany
    {
        return $this->hasMany(ErpComment::class, 'erp_client_id');
    }
}
