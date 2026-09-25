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
        Schema::create('erp_contracts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('erp_collaborator_id')->constrained('erp_collaborators')->onDelete('cascade');
            $table->string('contract_type')->default('CDI'); // CDI, CDD, Freelance
            $table->decimal('base_salary', 10, 2)->default(0.00); // monthly gross base salary
            $table->date('date_start');
            $table->date('date_end')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('erp_contracts');
    }
};
