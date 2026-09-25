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
        Schema::create('erp_expenses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('erp_collaborator_id')->constrained('erp_collaborators')->onDelete('cascade');
            $table->foreignId('erp_project_id')->nullable()->constrained('erp_projects')->onDelete('set null');
            $table->string('category')->default('Meals'); // Travel, Hardware, Meals, Other
            $table->decimal('amount', 10, 2)->default(0.00);
            $table->date('date_expense');
            $table->string('status')->default('pending'); // pending, reimbursed, rejected
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('erp_expenses');
    }
};
