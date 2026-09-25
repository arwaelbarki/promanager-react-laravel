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
        Schema::create('erp_quotes', function (Blueprint $table) {
            $table->id();
            $table->string('reference');
            $table->foreignId('erp_client_id')->constrained('erp_clients')->onDelete('cascade');
            $table->decimal('total_amount', 12, 2)->default(0.00);
            $table->date('date_issue');
            $table->date('date_expiry');
            $table->string('status')->default('Draft'); // Draft, Sent, Accepted, Declined
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('erp_quotes');
    }
};
