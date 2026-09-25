<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SpaBusiness extends Model
{
    protected $fillable = [
        'name', 'slug', 'category', 'city', 'address', 'phone', 'email',
        'description', 'image_url', 'rating', 'reviews_count', 'opening_hours',
        'has_biometrics', 'has_whatsapp', 'is_featured'
    ];

    protected $casts = [
        'rating' => 'float',
        'has_biometrics' => 'boolean',
        'has_whatsapp' => 'boolean',
        'is_featured' => 'boolean',
    ];

    public function services(): HasMany
    {
        return $this->hasMany(SpaService::class, 'business_id');
    }

    public function staff(): HasMany
    {
        return $this->hasMany(SpaStaff::class, 'business_id');
    }

    public function appointments(): HasMany
    {
        return $this->hasMany(SpaAppointment::class, 'business_id');
    }

    public function stockItems(): HasMany
    {
        return $this->hasMany(SpaStockItem::class, 'business_id');
    }
}
