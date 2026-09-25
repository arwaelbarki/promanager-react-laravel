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
        Schema::create('erp_invoices', function (Blueprint $table) {
            $table->id();
            $table->string('invoice_number');
            $table->foreignId('erp_client_id')->constrained('erp_clients')->onDelete('cascade');
            $table->foreignId('erp_project_id')->nullable()->constrained('erp_projects')->onDelete('set null');
            $table->decimal('subtotal', 12, 2)->default(0.00);
            $table->decimal('tax_rate', 5, 2)->default(20.00); // percentage e.g. 20%
            $table->decimal('total', 12, 2)->default(0.00);
            $table->string('status')->default('Draft'); // Draft, Sent, Paid, Overdue
            $table->date('date_issue');
            $table->date('date_due');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('erp_invoices');
    }
};
