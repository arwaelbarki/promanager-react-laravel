<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SpaStaff extends Model
{
    protected $fillable = [
        'business_id', 'name', 'role', 'avatar', 'commission_rate', 'is_active'
    ];

    public function business(): BelongsTo
    {
        return $this->belongsTo(SpaBusiness::class, 'business_id');
    }
}
