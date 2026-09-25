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
        // 1. Departments
        Schema::create('hr_departments', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('manager_name')->nullable();
            $table->integer('employee_count')->default(0);
            $table->timestamps();
        });

        // 2. Positions (Postes)
        Schema::create('hr_positions', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->foreignId('department_id')->nullable()->constrained('hr_departments')->nullOnDelete();
            $table->text('description')->nullable();
            $table->string('level')->default('Intermédiaire');
            $table->decimal('min_salary', 10, 2)->default(4000);
            $table->decimal('max_salary', 10, 2)->default(25000);
            $table->timestamps();
        });

        // 3. Employees
        Schema::create('hr_employees', function (Blueprint $table) {
            $table->id();
            $table->string('matricule')->unique();
            $table->string('first_name');
            $table->string('last_name');
            $table->date('birth_date')->nullable();
            $table->string('gender')->default('M');
            $table->string('cin')->nullable();
            $table->string('phone')->nullable();
            $table->string('email')->unique();
            $table->text('address')->nullable();
            $table->string('city')->default('Casablanca');
            $table->string('photo_url')->nullable();
            
            // Professional Info
            $table->foreignId('department_id')->nullable()->constrained('hr_departments')->nullOnDelete();
            $table->foreignId('position_id')->nullable()->constrained('hr_positions')->nullOnDelete();
            $table->date('hire_date')->nullable();
            $table->string('contract_type')->default('CDI');
            $table->string('manager_name')->nullable();
            $table->string('status')->default('Actif'); // Actif, En congé, Suspendu, Démissionnaire, Licencié, Retraité
            $table->decimal('salary', 10, 2)->default(8000.00);
            $table->string('work_phone')->nullable();
            $table->string('role')->default('Employé'); // Admin, Responsable RH, Employé

            $table->timestamps();
        });

        // 4. Contracts (Historique & Contrats)
        Schema::create('hr_contracts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained('hr_employees')->onDelete('cascade');
            $table->string('contract_type'); // CDI, CDD, Stage, Intérim, Freelance
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->decimal('salary', 10, 2);
            $table->integer('trial_period_months')->default(3);
            $table->string('status')->default('Actif'); // Actif, Expiré, Résilié, En attente
            $table->string('document_path')->nullable();
            $table->text('observations')->nullable();
            $table->timestamps();
        });

        // 5. Leave Types
        Schema::create('hr_leave_types', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Congé annuel, Congé maladie, Congé exceptionnel, Congé sans solde
            $table->text('description')->nullable();
            $table->integer('default_days')->default(18);
            $table->boolean('requires_proof')->default(false);
            $table->timestamps();
        });

        // 6. Leave Balances (Solde des congés par employé)
        Schema::create('hr_leave_balances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained('hr_employees')->onDelete('cascade');
            $table->integer('year')->default(2026);
            $table->integer('initial_balance')->default(18);
            $table->integer('acquired_days')->default(18);
            $table->integer('consumed_days')->default(0);
            $table->integer('remaining_days')->default(18);
            $table->timestamps();
        });

        // 7. Leave Requests (Demandes de congé)
        Schema::create('hr_leave_requests', function (Blueprint $table) {
            $table->id();
            $table->string('reference')->unique();
            $table->foreignId('employee_id')->constrained('hr_employees')->onDelete('cascade');
            $table->foreignId('leave_type_id')->nullable()->constrained('hr_leave_types')->nullOnDelete();
            $table->date('start_date');
            $table->date('end_date');
            $table->integer('total_days');
            $table->text('reason')->nullable();
            $table->string('proof_document_path')->nullable();
            $table->string('status')->default('En attente'); // En attente, Acceptée, Refusée, Annulée
            $table->text('hr_comment')->nullable();
            $table->string('processed_by')->nullable();
            $table->timestamp('processed_at')->nullable();
            $table->timestamps();
        });

        // 8. Absences
        Schema::create('hr_absences', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained('hr_employees')->onDelete('cascade');
            $table->date('date');
            $table->string('type')->default('Absence non justifiée'); // Absence justifiée, Absence injustifiée, Maladie, Autorisation exceptionnelle
            $table->text('reason')->nullable();
            $table->boolean('is_justified')->default(false);
            $table->string('proof_document_path')->nullable();
            $table->text('hr_comment')->nullable();
            $table->timestamps();
        });

        // 9. Attendances (Pointage & Présences)
        Schema::create('hr_attendances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained('hr_employees')->onDelete('cascade');
            $table->date('date');
            $table->time('check_in')->nullable();
            $table->time('check_out')->nullable();
            $table->decimal('total_hours', 4, 2)->default(0.00);
            $table->string('status')->default('Présent'); // Présent, Retard, Départ anticipé, Absent
            $table->boolean('is_late')->default(false);
            $table->boolean('is_early_departure')->default(false);
            $table->text('notes')->nullable();
            $table->timestamps();
        });

        // 10. HR Documents (Gestion des documents RH)
        Schema::create('hr_documents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained('hr_employees')->onDelete('cascade');
            $table->string('title');
            $table->string('category'); // CIN, Contrat, CV, Diplôme, Attestation de travail, Certificat, Document administratif
            $table->string('file_path');
            $table->integer('file_size_kb')->default(500);
            $table->string('file_type')->default('application/pdf');
            $table->string('uploaded_by')->default('RH');
            $table->timestamps();
        });

        // 11. HR Requests (Demandes RH Administratives)
        Schema::create('hr_requests', function (Blueprint $table) {
            $table->id();
            $table->string('reference')->unique();
            $table->foreignId('employee_id')->constrained('hr_employees')->onDelete('cascade');
            $table->string('type'); // Attestation de travail, Fiche de paie, Demande de document, Changement d'adresse, Autre
            $table->date('request_date');
            $table->text('description')->nullable();
            $table->string('attachment_path')->nullable();
            $table->string('status')->default('Nouvelle'); // Nouvelle, En cours, Acceptée, Refusée, Clôturée
            $table->text('hr_comment')->nullable();
            $table->timestamp('processed_at')->nullable();
            $table->timestamps();
        });

        // 12. Notifications (Centre de notifications)
        Schema::create('hr_notifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained('users')->cascadeOnDelete();
            $table->string('title');
            $table->text('message');
            $table->string('type')->default('info'); // info, success, warning, danger
            $table->boolean('is_read')->default(false);
            $table->string('action_url')->nullable();
            $table->timestamps();
        });

        // 13. Audit Logs (Journalisation des actions)
        Schema::create('hr_audit_logs', function (Blueprint $table) {
            $table->id();
            $table->string('user_name')->default('Système');
            $table->string('role')->default('RH');
            $table->string('action'); // Création, Modification, Suppression, Validation, Refus, Upload
            $table->string('module'); // Employés, Contrats, Congés, Absences, Présences, Documents, Demandes RH
            $table->string('target_item');
            $table->string('ip_address')->default('127.0.0.1');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hr_audit_logs');
        Schema::dropIfExists('hr_notifications');
        Schema::dropIfExists('hr_requests');
        Schema::dropIfExists('hr_documents');
        Schema::dropIfExists('hr_attendances');
        Schema::dropIfExists('hr_absences');
        Schema::dropIfExists('hr_leave_requests');
        Schema::dropIfExists('hr_leave_balances');
        Schema::dropIfExists('hr_leave_types');
        Schema::dropIfExists('hr_contracts');
        Schema::dropIfExists('hr_employees');
        Schema::dropIfExists('hr_positions');
        Schema::dropIfExists('hr_departments');
    }
};
