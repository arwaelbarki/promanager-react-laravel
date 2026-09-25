<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\HrDepartment;
use App\Models\HrPosition;
use App\Models\HrEmployee;
use App\Models\HrContract;
use App\Models\HrLeaveType;
use App\Models\HrLeaveBalance;
use App\Models\HrLeaveRequest;
use App\Models\HrAbsence;
use App\Models\HrAttendance;
use App\Models\HrDocument;
use App\Models\HrRequest;
use App\Models\HrNotification;
use App\Models\HrAuditLog;

class HrDatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Departments
        $deptHr = HrDepartment::create(['name' => 'Ressources Humaines', 'description' => 'Gestion du personnel et recrutement', 'manager_name' => 'Fatine Alaoui', 'employee_count' => 3]);
        $deptIt = HrDepartment::create(['name' => 'Informatique & Tech', 'description' => 'Développement web, infrastructure et SI', 'manager_name' => 'Ahmed Benali', 'employee_count' => 4]);
        $deptFin = HrDepartment::create(['name' => 'Finance & Comptabilité', 'description' => 'Gestion financière et paie', 'manager_name' => 'Karim Tazi', 'employee_count' => 2]);
        $deptCom = HrDepartment::create(['name' => 'Commercial & Ventes', 'description' => 'Développement commercial et clients', 'manager_name' => 'Sanaa Mansouri', 'employee_count' => 3]);
        $deptMkt = HrDepartment::create(['name' => 'Marketing & Com', 'description' => 'Communication, web marketing et branding', 'manager_name' => 'Youssef El Amrani', 'employee_count' => 2]);

        // 2. Positions
        $posRhManager = HrPosition::create(['title' => 'Responsable RH', 'department_id' => $deptHr->id, 'level' => 'Senior', 'min_salary' => 12000, 'max_salary' => 22000]);
        $posRhAssistant = HrPosition::create(['title' => 'Assistant RH', 'department_id' => $deptHr->id, 'level' => 'Intermédiaire', 'min_salary' => 6000, 'max_salary' => 10000]);
        
        $posLeadDev = HrPosition::create(['title' => 'Lead Développeur Fullstack', 'department_id' => $deptIt->id, 'level' => 'Senior', 'min_salary' => 15000, 'max_salary' => 30000]);
        $posDevFront = HrPosition::create(['title' => 'Développeur Frontend React', 'department_id' => $deptIt->id, 'level' => 'Intermédiaire', 'min_salary' => 8000, 'max_salary' => 14000]);
        $posDevBack = HrPosition::create(['title' => 'Développeur Backend Laravel', 'department_id' => $deptIt->id, 'level' => 'Intermédiaire', 'min_salary' => 8500, 'max_salary' => 15000]);
        
        $posComptable = HrPosition::create(['title' => 'Comptable Senior', 'department_id' => $deptFin->id, 'level' => 'Senior', 'min_salary' => 10000, 'max_salary' => 18000]);
        $posCommercial = HrPosition::create(['title' => 'Responsable Commercial', 'department_id' => $deptCom->id, 'level' => 'Intermédiaire', 'min_salary' => 7000, 'max_salary' => 16000]);

        // 3. Employees
        $empAhmed = HrEmployee::create([
            'matricule' => 'EMP-0001',
            'first_name' => 'Ahmed',
            'last_name' => 'Benali',
            'birth_date' => '1990-05-14',
            'gender' => 'M',
            'cin' => 'BE892102',
            'phone' => '+212 661 23 45 67',
            'email' => 'ahmed.benali@company.ma',
            'address' => 'Boulevard Zerktouni, Résidence Al Amal',
            'city' => 'Casablanca',
            'photo_url' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
            'department_id' => $deptIt->id,
            'position_id' => $posLeadDev->id,
            'hire_date' => '2021-03-15',
            'contract_type' => 'CDI',
            'manager_name' => 'Direction Générale',
            'status' => 'Actif',
            'salary' => 18500.00,
            'work_phone' => '+212 522 10 20 30',
            'role' => 'RH',
        ]);

        $empFatine = HrEmployee::create([
            'matricule' => 'EMP-0002',
            'first_name' => 'Fatine',
            'last_name' => 'Alaoui',
            'birth_date' => '1992-11-20',
            'gender' => 'F',
            'cin' => 'A741029',
            'phone' => '+212 662 98 76 54',
            'email' => 'fatine.alaoui@company.ma',
            'address' => 'Avenue de France, Agdal',
            'city' => 'Rabat',
            'photo_url' => 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
            'department_id' => $deptHr->id,
            'position_id' => $posRhManager->id,
            'hire_date' => '2020-01-10',
            'contract_type' => 'CDI',
            'manager_name' => 'Direction Générale',
            'status' => 'Actif',
            'salary' => 16000.00,
            'work_phone' => '+212 522 10 20 31',
            'role' => 'RH',
        ]);

        $empKarim = HrEmployee::create([
            'matricule' => 'EMP-0003',
            'first_name' => 'Karim',
            'last_name' => 'Tazi',
            'birth_date' => '1994-08-05',
            'gender' => 'M',
            'cin' => 'CD551209',
            'phone' => '+212 663 11 22 33',
            'email' => 'karim.tazi@company.ma',
            'address' => 'Quartier Palmier, Rue des Lilas',
            'city' => 'Casablanca',
            'photo_url' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
            'department_id' => $deptFin->id,
            'position_id' => $posComptable->id,
            'hire_date' => '2023-06-01',
            'contract_type' => 'CDD',
            'manager_name' => 'Karim Tazi',
            'status' => 'Actif',
            'salary' => 12000.00,
            'work_phone' => '+212 522 10 20 32',
            'role' => 'Employé',
        ]);

        $empSanaa = HrEmployee::create([
            'matricule' => 'EMP-0004',
            'first_name' => 'Sanaa',
            'last_name' => 'Mansouri',
            'birth_date' => '1995-02-18',
            'gender' => 'F',
            'cin' => 'D889102',
            'phone' => '+212 664 44 55 66',
            'email' => 'sanaa.mansouri@company.ma',
            'address' => 'Maârif, Boulevard Al Massira',
            'city' => 'Casablanca',
            'photo_url' => 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150',
            'department_id' => $deptCom->id,
            'position_id' => $posCommercial->id,
            'hire_date' => '2024-01-15',
            'contract_type' => 'CDI',
            'manager_name' => 'Sanaa Mansouri',
            'status' => 'En congé',
            'salary' => 9500.00,
            'work_phone' => '+212 522 10 20 33',
            'role' => 'Employé',
        ]);

        // 4. Contracts
        HrContract::create([
            'employee_id' => $empAhmed->id,
            'contract_type' => 'CDI',
            'start_date' => '2021-03-15',
            'end_date' => null,
            'salary' => 18500.00,
            'trial_period_months' => 3,
            'status' => 'Actif',
            'observations' => 'Contrat CDI temps plein avec clause de confidentialité',
        ]);

        HrContract::create([
            'employee_id' => $empFatine->id,
            'contract_type' => 'CDI',
            'start_date' => '2020-01-10',
            'end_date' => null,
            'salary' => 16000.00,
            'trial_period_months' => 3,
            'status' => 'Actif',
            'observations' => 'Responsable Ressources Humaines',
        ]);

        HrContract::create([
            'employee_id' => $empKarim->id,
            'contract_type' => 'CDD',
            'start_date' => '2025-10-01',
            'end_date' => date('Y-m-d', strtotime('+20 days')),
            'salary' => 12000.00,
            'trial_period_months' => 1,
            'status' => 'Actif',
            'observations' => 'Contrat CDD 12 mois - À renouveler prochainement !',
        ]);

        // 5. Leave Types
        $ltAnnuel = HrLeaveType::create(['name' => 'Congé annuel', 'description' => 'Congé payé annuel légal', 'default_days' => 18, 'requires_proof' => false]);
        $ltMaladie = HrLeaveType::create(['name' => 'Congé maladie', 'description' => 'Arrêt maladie justifié par un certificat médical', 'default_days' => 10, 'requires_proof' => true]);
        $ltExcept = HrLeaveType::create(['name' => 'Congé exceptionnel', 'description' => 'Événement familial (Mariage, Naissance, etc.)', 'default_days' => 4, 'requires_proof' => true]);
        $ltSansSolde = HrLeaveType::create(['name' => 'Congé sans solde', 'description' => 'Absence non rémunérée convenue', 'default_days' => 30, 'requires_proof' => false]);

        // 6. Leave Balances
        foreach ([$empAhmed, $empFatine, $empKarim, $empSanaa] as $emp) {
            HrLeaveBalance::create([
                'employee_id' => $emp->id,
                'year' => 2026,
                'initial_balance' => 18,
                'acquired_days' => 18,
                'consumed_days' => $emp->id == $empSanaa->id ? 5 : 2,
                'remaining_days' => $emp->id == $empSanaa->id ? 13 : 16,
            ]);
        }

        // 7. Leave Requests
        HrLeaveRequest::create([
            'reference' => 'CONG-202609-001',
            'employee_id' => $empSanaa->id,
            'leave_type_id' => $ltAnnuel->id,
            'start_date' => '2026-09-08',
            'end_date' => '2026-09-15',
            'total_days' => 5,
            'reason' => 'Congés annuels de fin d’été',
            'status' => 'Acceptée',
            'hr_comment' => 'Accordé par le service RH',
            'processed_by' => 'Fatine Alaoui',
            'processed_at' => now(),
        ]);

        HrLeaveRequest::create([
            'reference' => 'CONG-202609-002',
            'employee_id' => $empAhmed->id,
            'leave_type_id' => $ltAnnuel->id,
            'start_date' => '2026-09-20',
            'end_date' => '2026-09-25',
            'total_days' => 5,
            'reason' => 'Repos personnel',
            'status' => 'En attente',
        ]);

        // 8. Absences
        HrAbsence::create([
            'employee_id' => $empKarim->id,
            'date' => '2026-09-02',
            'type' => 'Maladie',
            'reason' => 'Consultation médicale urgente',
            'is_justified' => true,
            'proof_document_path' => '/documents/certificat_med.pdf',
            'hr_comment' => 'Certificat médical reçu et validé',
        ]);

        // 9. Attendances (Pointages)
        $today = date('Y-m-d');
        HrAttendance::create([
            'employee_id' => $empAhmed->id,
            'date' => $today,
            'check_in' => '08:55:00',
            'check_out' => '17:30:00',
            'total_hours' => 8.5,
            'status' => 'Présent',
            'is_late' => false,
        ]);

        HrAttendance::create([
            'employee_id' => $empFatine->id,
            'date' => $today,
            'check_in' => '09:12:00',
            'check_out' => null,
            'total_hours' => 0,
            'status' => 'Retard',
            'is_late' => true,
            'notes' => 'Arrivée retardée embouteillages',
        ]);

        // 10. Documents
        HrDocument::create([
            'employee_id' => $empAhmed->id,
            'title' => 'Carte d’Identité Nationale (CIN)',
            'category' => 'CIN',
            'file_path' => '/documents/cin_ahmed_benali.pdf',
            'file_size_kb' => 420,
            'file_type' => 'application/pdf',
            'uploaded_by' => 'RH',
        ]);

        HrDocument::create([
            'employee_id' => $empAhmed->id,
            'title' => 'Contrat de Travail CDI signé',
            'category' => 'Contrat',
            'file_path' => '/documents/contrat_cdi_ahmed.pdf',
            'file_size_kb' => 1250,
            'file_type' => 'application/pdf',
            'uploaded_by' => 'RH',
        ]);

        // 11. HR Requests
        HrRequest::create([
            'reference' => 'REQ-202609-1001',
            'employee_id' => $empAhmed->id,
            'type' => 'Attestation de travail',
            'request_date' => '2026-09-05',
            'description' => 'Besoin d’une attestation de travail pour la banque',
            'status' => 'Acceptée',
            'hr_comment' => 'Attestation générée et téléchargeable',
            'processed_at' => now(),
        ]);

        // 12. Notifications
        HrNotification::create([
            'title' => 'Alerte Expiration Contrat',
            'message' => 'Le contrat CDD de Karim Tazi expire dans 20 jours !',
            'type' => 'warning',
            'is_read' => false,
        ]);

        HrNotification::create([
            'title' => 'Nouvelle Demande de Congé',
            'message' => 'Ahmed Benali a soumis une demande de congé pour le 20/09/2026.',
            'type' => 'info',
            'is_read' => false,
        ]);

        // 13. Audit Logs
        HrAuditLog::create([
            'user_name' => 'Fatine Alaoui',
            'role' => 'RH',
            'action' => 'Validation',
            'module' => 'Congés',
            'target_item' => 'Demande CONG-202609-001 (Sanaa Mansouri)',
            'ip_address' => '192.168.1.10',
        ]);

        HrAuditLog::create([
            'user_name' => 'System Auto',
            'role' => 'Admin',
            'action' => 'Pointage',
            'module' => 'Présences',
            'target_item' => 'Arrivée Ahmed Benali à 08:55',
            'ip_address' => '127.0.0.1',
        ]);
    }
}
