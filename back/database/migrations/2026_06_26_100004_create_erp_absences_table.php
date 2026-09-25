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
        Schema::create('erp_absences', function (Blueprint $table) {
            $table->id();
            $table->foreignId('erp_collaborator_id')->constrained('erp_collaborators')->onDelete('cascade');
            $table->string('type')->default('Vacation'); // Vacation, Sick, Unpaid
            $table->date('date_start');
            $table->date('date_end');
            $table->string('status')->default('pending'); // pending, approved, rejected
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('erp_absences');
    }
};
