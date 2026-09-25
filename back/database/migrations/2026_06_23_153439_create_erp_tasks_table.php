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
        Schema::create('erp_tasks', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('priority')->default('Moyenne');
            $table->string('status')->default('À faire');
            $table->string('visibility')->default('Publique'); // Publique ou Interne (pour Admin seulement)
            $table->date('due_date')->nullable();
            $table->foreignId('erp_project_id')->constrained('erp_projects')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('erp_tasks');
    }
};
