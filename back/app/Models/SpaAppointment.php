<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SpaAppointment extends Model
{
    protected $fillable = [
        'business_id', 'service_id', 'staff_id', 'client_name', 'client_phone',
        'client_email', 'appointment_date', 'status', 'total_amount',
        'payment_status', 'payment_method', 'notes'
    ];

    public function business(): BelongsTo
    {
        return $this->belongsTo(SpaBusiness::class, 'business_id');
    }

    public function service(): BelongsTo
    {
        return $this->belongsTo(SpaService::class, 'service_id');
    }

    public function staff(): BelongsTo
    {
        return $this->belongsTo(SpaStaff::class, 'staff_id');
    }
}
