<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SpaStockItem extends Model
{
    protected $fillable = [
        'business_id', 'name', 'category', 'quantity', 'min_threshold', 'unit_price'
    ];

    public function business(): BelongsTo
    {
        return $this->belongsTo(SpaBusiness::class, 'business_id');
    }
}
