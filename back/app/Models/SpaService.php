<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SpaService extends Model
{
    protected $fillable = [
        'business_id', 'title', 'category', 'description', 'duration_minutes',
        'price', 'sessions_count', 'is_popular'
    ];

    public function business(): BelongsTo
    {
        return $this->belongsTo(SpaBusiness::class, 'business_id');
    }
}
