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
        // Add relationships to erp_comments
        Schema::table('erp_comments', function (Blueprint $table) {
            $table->foreignId('erp_collaborator_id')->nullable()->constrained('erp_collaborators')->onDelete('set null');
            $table->foreignId('erp_client_id')->nullable()->constrained('erp_clients')->onDelete('set null');
        });

        // Add relationship to erp_tasks
        Schema::table('erp_tasks', function (Blueprint $table) {
            $table->foreignId('erp_collaborator_id')->nullable()->constrained('erp_collaborators')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('erp_comments', function (Blueprint $table) {
            $table->dropForeign(['erp_collaborator_id']);
            $table->dropColumn('erp_collaborator_id');
            $table->dropForeign(['erp_client_id']);
            $table->dropColumn('erp_client_id');
        });

        Schema::table('erp_tasks', function (Blueprint $table) {
            $table->dropForeign(['erp_collaborator_id']);
            $table->dropColumn('erp_collaborator_id');
        });
    }
};
