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
        Schema::create('erp_timesheets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('erp_collaborator_id')->constrained('erp_collaborators')->onDelete('cascade');
            $table->foreignId('erp_task_id')->constrained('erp_tasks')->onDelete('cascade');
            $table->date('date');
            $table->decimal('hours', 5, 2);
            $table->text('description')->nullable();
            $table->string('status')->default('pending'); // pending, approved, rejected
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('erp_timesheets');
    }
};
