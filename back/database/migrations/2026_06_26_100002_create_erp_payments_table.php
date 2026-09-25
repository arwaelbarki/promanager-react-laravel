<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('erp_payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('erp_invoice_id')->constrained('erp_invoices')->onDelete('cascade');
            $table->decimal('amount', 12, 2)->default(0.00);
            $table->date('date_payment');
            $table->string('payment_method')->default('Wire'); // Wire, Card, Cash
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('erp_payments');
    }
};
