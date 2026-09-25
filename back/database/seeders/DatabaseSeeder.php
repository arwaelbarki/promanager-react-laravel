<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ErpClient;
use App\Models\ErpProject;
use App\Models\ErpTask;
use App\Models\ErpComment;
use App\Models\ErpCollaborator;
use App\Models\ErpTimesheet;
use App\Models\ErpQuote;
use App\Models\ErpInvoice;
use App\Models\ErpPayment;
use App\Models\ErpContract;
use App\Models\ErpAbsence;
use App\Models\ErpExpense;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Seed Clients
        $acme = ErpClient::create([
            'name' => 'Jean Dupont',
            'email' => 'acme@example.com',
            'phone' => '+33 6 12 34 56 78',
            'company' => 'Acme Corporation',
        ]);

        $globex = ErpClient::create([
            'name' => 'Alice Martin',
            'email' => 'globex@example.com',
            'phone' => '+33 6 98 76 54 32',
            'company' => 'Globex Industries',
        ]);

        $helios = ErpClient::create([
            'name' => 'Thomas Roux',
            'email' => 'thomas.roux@helios.com',
            'phone' => '+33 6 88 99 00 11',
            'company' => 'Helios Energy Solutions',
        ]);

        $edulearn = ErpClient::create([
            'name' => 'Lucie Bernard',
            'email' => 'lucie.bernard@edulearn.org',
            'phone' => '+33 6 55 44 33 22',
            'company' => 'EduLearn Group',
        ]);

        $cybershield = ErpClient::create([
            'name' => 'Karim Bensalah',
            'email' => 'karim.bensalah@cybershield.net',
            'phone' => '+33 6 77 66 55 44',
            'company' => 'CyberShield Technologies',
        ]);

        // 2. Seed Projects with Budgets
        $acmeWebsite = ErpProject::create([
            'name' => 'Refonte du Site Web E-commerce',
            'description' => 'Modernisation complète de la boutique en ligne avec tunnel de commande optimisé et design adaptatif.',
            'status' => 'En cours',
            'start_date' => '2026-06-01',
            'end_date' => '2026-08-31',
            'budget' => 15000.00,
            'erp_client_id' => $acme->id,
        ]);

        $acmeMobile = ErpProject::create([
            'name' => 'Application Mobile Fidélité',
            'description' => 'Développement d\'une application mobile iOS et Android pour gérer le programme de fidélité client.',
            'status' => 'Planifié',
            'start_date' => '2026-09-01',
            'end_date' => '2026-12-15',
            'budget' => 25000.00,
            'erp_client_id' => $acme->id,
        ]);

        $globexBilling = ErpProject::create([
            'name' => 'Système de Facturation Automatisé',
            'description' => 'Intégration d\'une solution automatisée pour la facturation récurrente et les relances de paiement.',
            'status' => 'En cours',
            'start_date' => '2026-05-15',
            'end_date' => '2026-07-30',
            'budget' => 8500.00,
            'erp_client_id' => $globex->id,
        ]);

        $btpProject = ErpProject::create([
            'name' => 'Construction Immeuble Résidentiel R+4',
            'description' => 'Projet de construction d\'un bâtiment résidentiel de 4 étages à Marrakech (fondations, gros œuvre, finitions).',
            'status' => 'Planifié',
            'start_date' => '2026-10-01',
            'end_date' => '2027-12-31',
            'budget' => 450000.00,
            'erp_client_id' => $globex->id,
        ]);

        $agriProject = ErpProject::create([
            'name' => 'Système d\'Irrigation Intelligent',
            'description' => 'Déploiement de capteurs IoT et d\'irrigation connectée automatisée pour optimiser la consommation d\'eau des cultures.',
            'status' => 'En cours',
            'start_date' => '2026-07-01',
            'end_date' => '2026-11-30',
            'budget' => 35000.00,
            'erp_client_id' => $acme->id,
        ]);

        $biotechProject = ErpProject::create([
            'name' => 'Plateforme Télémédecine Santé',
            'description' => 'Mise en place d\'une plateforme de consultation médicale à distance sécurisée avec visioconférence et ordonnances électroniques.',
            'status' => 'Planifié',
            'start_date' => '2026-11-01',
            'end_date' => '2027-04-30',
            'budget' => 65000.00,
            'erp_client_id' => $globex->id,
        ]);

        $cyberAudit = ErpProject::create([
            'name' => 'Audit de Sécurité Globale & Pentesting',
            'description' => 'Évaluation de la vulnérabilité du système d\'information, tests d\'intrusion externes et internes, et rapport d\'audit détaillé avec recommandations.',
            'status' => 'En cours',
            'start_date' => '2026-06-10',
            'end_date' => '2026-09-10',
            'budget' => 28000.00,
            'erp_client_id' => $cybershield->id,
        ]);

        $solarProject = ErpProject::create([
            'name' => 'Parc Solaire Photovoltaïque Industriel',
            'description' => 'Étude technique d\'ingénierie et installation complète de panneaux photovoltaïques en toiture d\'un site industriel.',
            'status' => 'Planifié',
            'start_date' => '2026-10-15',
            'end_date' => '2027-02-28',
            'budget' => 145000.00,
            'erp_client_id' => $helios->id,
        ]);

        $lmsProject = ErpProject::create([
            'name' => 'Plateforme de E-learning Interactive (LMS)',
            'description' => 'Développement d\'une plateforme d\'apprentissage en ligne sur mesure intégrant des cours vidéo, des quiz et la génération automatique de certificats.',
            'status' => 'En cours',
            'start_date' => '2026-05-01',
            'end_date' => '2026-08-31',
            'budget' => 32000.00,
            'erp_client_id' => $edulearn->id,
        ]);

        $chargingProject = ErpProject::create([
            'name' => 'Déploiement Bornes de Recharge Électriques',
            'description' => 'Conception et installation d\'un réseau de bornes connectées de véhicules électriques pour les collaborateurs et clients de l\'entreprise.',
            'status' => 'Planifié',
            'start_date' => '2026-12-01',
            'end_date' => '2027-03-31',
            'budget' => 68000.00,
            'erp_client_id' => $helios->id,
        ]);

        // Seed Collaborators
        $devSenior = ErpCollaborator::create([
            'name' => 'Marc Lemaire',
            'email' => 'marc.lemaire@example.com',
            'role' => 'collaborateur',
            'hourly_rate' => 75.00,
        ]);

        $designer = ErpCollaborator::create([
            'name' => 'Sophie Bernard',
            'email' => 'sophie.bernard@example.com',
            'role' => 'collaborateur',
            'hourly_rate' => 50.00,
        ]);

        $admin = ErpCollaborator::create([
            'name' => 'Directeur Technique',
            'email' => 'admin@example.com',
            'role' => 'admin',
            'hourly_rate' => 100.00,
        ]);

        // 3. Seed Tasks for Acme Website
        $task1 = ErpTask::create([
            'title' => 'Conception des maquettes UI/UX',
            'description' => 'Création des wireframes et prototypes interactifs pour la page d\'accueil et le panier.',
            'priority' => 'Haute',
            'status' => 'Terminé',
            'visibility' => 'Publique',
            'due_date' => '2026-06-15',
            'erp_project_id' => $acmeWebsite->id,
            'erp_collaborator_id' => $designer->id,
        ]);

        $task2 = ErpTask::create([
            'title' => 'Intégration du thème Tailwind CSS',
            'description' => 'Développer le design système et intégrer les composants de base basés sur les maquettes UI.',
            'priority' => 'Moyenne',
            'status' => 'En cours',
            'visibility' => 'Publique',
            'due_date' => '2026-07-10',
            'erp_project_id' => $acmeWebsite->id,
            'erp_collaborator_id' => $devSenior->id,
        ]);

        $task3 = ErpTask::create([
            'title' => 'Développement de l\'API Panier & Commandes',
            'description' => 'Création des routes, contrôleurs et logique backend pour la gestion du panier utilisateur.',
            'priority' => 'Haute',
            'status' => 'À faire',
            'visibility' => 'Publique',
            'due_date' => '2026-07-25',
            'erp_project_id' => $acmeWebsite->id,
            'erp_collaborator_id' => $devSenior->id,
        ]);

        $task4 = ErpTask::create([
            'title' => 'Audit technique du code source existant',
            'description' => 'Analyse des vulnérabilités de la base de données héritée et rapport de sécurité interne.',
            'priority' => 'Haute',
            'status' => 'Terminé',
            'visibility' => 'Interne', // Invisible for Client
            'due_date' => '2026-06-05',
            'erp_project_id' => $acmeWebsite->id,
            'erp_collaborator_id' => $admin->id,
        ]);

        // 4. Seed Tasks for Globex Billing
        $task5 = ErpTask::create([
            'title' => 'Configuration des Webhooks Stripe',
            'description' => 'Mettre en place la réception des événements Stripe pour valider les paiements automatiques.',
            'priority' => 'Haute',
            'status' => 'En cours',
            'visibility' => 'Publique',
            'due_date' => '2026-06-30',
            'erp_project_id' => $globexBilling->id,
            'erp_collaborator_id' => $devSenior->id,
        ]);

        $task6 = ErpTask::create([
            'title' => 'Calcul des marges et taxes internes',
            'description' => 'Réglage des coefficients de calcul de taxes internes selon les directives financières confidentielles.',
            'priority' => 'Moyenne',
            'status' => 'En cours',
            'visibility' => 'Interne', // Invisible for Client
            'due_date' => '2026-07-15',
            'erp_project_id' => $globexBilling->id,
            'erp_collaborator_id' => $admin->id,
        ]);

        // Seed Tasks for CyberAudit
        $taskCyber1 = ErpTask::create([
            'title' => 'Reconnaissance passive et cartographie',
            'description' => 'Recherche d\'informations publiques, cartographie DNS et recensement des adresses IP cibles.',
            'priority' => 'Moyenne',
            'status' => 'Terminé',
            'visibility' => 'Publique',
            'due_date' => '2026-06-25',
            'erp_project_id' => $cyberAudit->id,
            'erp_collaborator_id' => $admin->id,
        ]);

        $taskCyber2 = ErpTask::create([
            'title' => 'Scans de vulnérabilités & Exploitation active',
            'description' => 'Détection automatisée et exploitation manuelle des failles de sécurité trouvées sur les serveurs.',
            'priority' => 'Haute',
            'status' => 'En cours',
            'visibility' => 'Publique',
            'due_date' => '2026-07-20',
            'erp_project_id' => $cyberAudit->id,
            'erp_collaborator_id' => $devSenior->id,
        ]);

        $taskCyber3 = ErpTask::create([
            'title' => 'Rédaction du rapport de remédiation confidentiel',
            'description' => 'Documentation des failles trouvées et élaboration du plan de sécurité recommandé.',
            'priority' => 'Haute',
            'status' => 'À faire',
            'visibility' => 'Interne',
            'due_date' => '2026-08-15',
            'erp_project_id' => $cyberAudit->id,
            'erp_collaborator_id' => $admin->id,
        ]);

        // Seed Tasks for LMSProject
        $taskLMS1 = ErpTask::create([
            'title' => 'Conception du schéma de la base de données',
            'description' => 'Modélisation des tables cours, leçons, quiz, tentatives et certificats.',
            'priority' => 'Moyenne',
            'status' => 'Terminé',
            'visibility' => 'Publique',
            'due_date' => '2026-05-15',
            'erp_project_id' => $lmsProject->id,
            'erp_collaborator_id' => $devSenior->id,
        ]);

        $taskLMS2 = ErpTask::create([
            'title' => 'Développement de l\'interface apprenant (React)',
            'description' => 'Création du lecteur de cours vidéo, affichage des leçons et interface interactive des quiz.',
            'priority' => 'Moyenne',
            'status' => 'En cours',
            'visibility' => 'Publique',
            'due_date' => '2026-07-30',
            'erp_project_id' => $lmsProject->id,
            'erp_collaborator_id' => $designer->id,
        ]);

        $taskLMS3 = ErpTask::create([
            'title' => 'Intégration du module de génération de PDF',
            'description' => 'Génération dynamique des certificats de réussite au format PDF lors de la validation des cours.',
            'priority' => 'Basse',
            'status' => 'À faire',
            'visibility' => 'Publique',
            'due_date' => '2026-08-25',
            'erp_project_id' => $lmsProject->id,
            'erp_collaborator_id' => $devSenior->id,
        ]);

        // Seed Timesheets
        // Approved Timesheets (Count towards project cost)
        ErpTimesheet::create([
            'erp_collaborator_id' => $designer->id,
            'erp_task_id' => $task1->id,
            'date' => '2026-06-10',
            'hours' => 12.5,
            'description' => 'Recherche graphique et maquettes de la page d\'accueil.',
            'status' => 'approved', // Cost: 12.5 * 50 = 625
        ]);

        ErpTimesheet::create([
            'erp_collaborator_id' => $designer->id,
            'erp_task_id' => $task1->id,
            'date' => '2026-06-12',
            'hours' => 8.0,
            'description' => 'Finalisation des maquettes du tunnel de commande.',
            'status' => 'approved', // Cost: 8 * 50 = 400
        ]);

        ErpTimesheet::create([
            'erp_collaborator_id' => $devSenior->id,
            'erp_task_id' => $task2->id,
            'date' => '2026-06-20',
            'hours' => 15.0,
            'description' => 'Intégration du layout de base et de la navigation responsive.',
            'status' => 'approved', // Cost: 15 * 75 = 1125
        ]);

        ErpTimesheet::create([
            'erp_collaborator_id' => $devSenior->id,
            'erp_task_id' => $task4->id,
            'date' => '2026-06-04',
            'hours' => 6.0,
            'description' => 'Recherche de failles XSS et SQLi sur l\'ancien code.',
            'status' => 'approved', // Cost: 6 * 75 = 450
        ]);

        ErpTimesheet::create([
            'erp_collaborator_id' => $devSenior->id,
            'erp_task_id' => $task5->id,
            'date' => '2026-06-22',
            'hours' => 10.0,
            'description' => 'Développement initial de la route webhook et vérification des signatures.',
            'status' => 'approved', // Cost: 10 * 75 = 750
        ]);

        // Timesheets for CyberAudit
        ErpTimesheet::create([
            'erp_collaborator_id' => $admin->id,
            'erp_task_id' => $taskCyber1->id,
            'date' => '2026-06-15',
            'hours' => 8.0,
            'description' => 'Cartographie DNS et scans préliminaires.',
            'status' => 'approved', // Cost: 8 * 100 = 800
        ]);

        ErpTimesheet::create([
            'erp_collaborator_id' => $devSenior->id,
            'erp_task_id' => $taskCyber2->id,
            'date' => '2026-06-20',
            'hours' => 12.0,
            'description' => 'Tests d\'intrusion applicatifs et exploitation de failles d\'authentification.',
            'status' => 'approved', // Cost: 12 * 75 = 900
        ]);

        // Timesheets for LMSProject
        ErpTimesheet::create([
            'erp_collaborator_id' => $devSenior->id,
            'erp_task_id' => $taskLMS1->id,
            'date' => '2026-05-12',
            'hours' => 10.0,
            'description' => 'Modélisation base de données PostgreSQL.',
            'status' => 'approved', // Cost: 10 * 75 = 750
        ]);

        ErpTimesheet::create([
            'erp_collaborator_id' => $designer->id,
            'erp_task_id' => $taskLMS2->id,
            'date' => '2026-05-22',
            'hours' => 16.5,
            'description' => 'Maquettage et intégration React du lecteur vidéo.',
            'status' => 'approved', // Cost: 16.5 * 50 = 825
        ]);

        // Pending Timesheets (No cost yet)
        ErpTimesheet::create([
            'erp_collaborator_id' => $devSenior->id,
            'erp_task_id' => $task2->id,
            'date' => '2026-06-23',
            'hours' => 4.0,
            'description' => 'Ajustements CSS sur les boutons et les formulaires.',
            'status' => 'pending',
        ]);

        // Rejected Timesheets (No cost)
        ErpTimesheet::create([
            'erp_collaborator_id' => $designer->id,
            'erp_task_id' => $task2->id,
            'date' => '2026-06-21',
            'hours' => 5.0,
            'description' => 'Recherche d\'icônes personnalisées (rejeté car hors budget).',
            'status' => 'rejected',
        ]);

        // 5. Seed Comments
        ErpComment::create([
            'author' => 'Administrateur',
            'content' => 'Les maquettes UI ont été validées par le client. Excellent travail de l\'équipe design.',
            'erp_task_id' => $task1->id,
            'erp_collaborator_id' => $admin->id,
        ]);

        ErpComment::create([
            'author' => 'Jean Dupont',
            'content' => 'Ravi des maquettes de la page d\'accueil. Pouvez-vous juste agrandir un peu le logo dans la barre de navigation ?',
            'erp_task_id' => $task1->id,
            'erp_client_id' => $acme->id,
        ]);

        ErpComment::create([
            'author' => 'Administrateur',
            'content' => 'Noté, nous ajusterons cela lors de la phase d\'intégration HTML/CSS.',
            'erp_task_id' => $task1->id,
            'erp_collaborator_id' => $admin->id,
        ]);

        ErpComment::create([
            'author' => 'Administrateur',
            'content' => 'Le setup Tailwind CSS est prêt. Nous commençons à intégrer la page d\'accueil aujourd\'hui.',
            'erp_task_id' => $task2->id,
            'erp_collaborator_id' => $admin->id,
        ]);

        ErpComment::create([
            'author' => 'Alice Martin',
            'content' => 'Avez-vous bien pris en compte les devises USD et EUR pour les webhooks Stripe ?',
            'erp_task_id' => $task5->id,
            'erp_client_id' => $globex->id,
        ]);

        ErpComment::create([
            'author' => 'Administrateur',
            'content' => 'Oui Alice, le système convertit automatiquement les montants en centimes selon la devise renvoyée par Stripe.',
            'erp_task_id' => $task5->id,
            'erp_collaborator_id' => $admin->id,
        ]);

        // 6. Seed Quotes
        $quote1 = ErpQuote::create([
            'reference' => 'DEV-2026-001',
            'erp_client_id' => $acme->id,
            'total_amount' => 18000.00,
            'date_issue' => '2026-05-10',
            'date_expiry' => '2026-06-10',
            'status' => 'Accepted',
        ]);

        $quote2 = ErpQuote::create([
            'reference' => 'DEV-2026-002',
            'erp_client_id' => $globex->id,
            'total_amount' => 9500.00,
            'date_issue' => '2026-06-01',
            'date_expiry' => '2026-07-01',
            'status' => 'Sent',
        ]);

        $quote3 = ErpQuote::create([
            'reference' => 'DEV-2026-003',
            'erp_client_id' => $acme->id,
            'total_amount' => 5000.00,
            'date_issue' => '2026-06-20',
            'date_expiry' => '2026-07-20',
            'status' => 'Draft',
        ]);

        $quote4 = ErpQuote::create([
            'reference' => 'DEV-2026-004',
            'erp_client_id' => $cybershield->id,
            'total_amount' => 28000.00,
            'date_issue' => '2026-06-01',
            'date_expiry' => '2026-07-01',
            'status' => 'Accepted',
        ]);

        $quote5 = ErpQuote::create([
            'reference' => 'DEV-2026-005',
            'erp_client_id' => $helios->id,
            'total_amount' => 145000.00,
            'date_issue' => '2026-09-15',
            'date_expiry' => '2026-10-15',
            'status' => 'Accepted',
        ]);

        $quote6 = ErpQuote::create([
            'reference' => 'DEV-2026-006',
            'erp_client_id' => $edulearn->id,
            'total_amount' => 32000.00,
            'date_issue' => '2026-04-10',
            'date_expiry' => '2026-05-10',
            'status' => 'Accepted',
        ]);

        // 7. Seed Invoices
        $invoice1 = ErpInvoice::create([
            'invoice_number' => 'FAC-2026-001',
            'erp_client_id' => $acme->id,
            'erp_project_id' => $acmeWebsite->id,
            'subtotal' => 15000.00,
            'tax_rate' => 20.00,
            'total' => 18000.00,
            'status' => 'Paid',
            'date_issue' => '2026-06-01',
            'date_due' => '2026-06-30',
        ]);

        $invoice2 = ErpInvoice::create([
            'invoice_number' => 'FAC-2026-002',
            'erp_client_id' => $globex->id,
            'erp_project_id' => $globexBilling->id,
            'subtotal' => 8500.00,
            'tax_rate' => 20.00,
            'total' => 10200.00,
            'status' => 'Sent',
            'date_issue' => '2026-06-15',
            'date_due' => '2026-07-15',
        ]);

        $invoice3 = ErpInvoice::create([
            'invoice_number' => 'FAC-2026-003',
            'erp_client_id' => $acme->id,
            'erp_project_id' => $acmeMobile->id,
            'subtotal' => 6000.00,
            'tax_rate' => 20.00,
            'total' => 7200.00,
            'status' => 'Overdue',
            'date_issue' => '2026-05-01',
            'date_due' => '2026-05-31',
        ]);

        $invoice4 = ErpInvoice::create([
            'invoice_number' => 'FAC-2026-004',
            'erp_client_id' => $cybershield->id,
            'erp_project_id' => $cyberAudit->id,
            'subtotal' => 28000.00,
            'tax_rate' => 20.00,
            'total' => 33600.00,
            'status' => 'Sent',
            'date_issue' => '2026-06-15',
            'date_due' => '2026-07-15',
        ]);

        $invoice5 = ErpInvoice::create([
            'invoice_number' => 'FAC-2026-005',
            'erp_client_id' => $edulearn->id,
            'erp_project_id' => $lmsProject->id,
            'subtotal' => 15000.00,
            'tax_rate' => 20.00,
            'total' => 18000.00,
            'status' => 'Paid',
            'date_issue' => '2026-05-10',
            'date_due' => '2026-06-10',
        ]);

        // 8. Seed Payments
        ErpPayment::create([
            'erp_invoice_id' => $invoice1->id,
            'amount' => 18000.00,
            'date_payment' => '2026-06-15',
            'payment_method' => 'Wire',
        ]);

        ErpPayment::create([
            'erp_invoice_id' => $invoice5->id,
            'amount' => 18000.00,
            'date_payment' => '2026-05-12',
            'payment_method' => 'Wire',
        ]);

        // 9. Seed Contracts
        ErpContract::create([
            'erp_collaborator_id' => $devSenior->id,
            'contract_type' => 'CDI',
            'base_salary' => 4500.00,
            'date_start' => '2024-01-15',
        ]);

        ErpContract::create([
            'erp_collaborator_id' => $designer->id,
            'contract_type' => 'CDI',
            'base_salary' => 3500.00,
            'date_start' => '2024-06-01',
        ]);

        ErpContract::create([
            'erp_collaborator_id' => $admin->id,
            'contract_type' => 'CDI',
            'base_salary' => 6000.00,
            'date_start' => '2022-09-01',
        ]);

        // 10. Seed Absences
        ErpAbsence::create([
            'erp_collaborator_id' => $designer->id,
            'type' => 'Vacation',
            'date_start' => '2026-07-01',
            'date_end' => '2026-07-15',
            'status' => 'approved',
        ]);

        ErpAbsence::create([
            'erp_collaborator_id' => $devSenior->id,
            'type' => 'Sick',
            'date_start' => '2026-06-10',
            'date_end' => '2026-06-12',
            'status' => 'approved',
        ]);

        ErpAbsence::create([
            'erp_collaborator_id' => $designer->id,
            'type' => 'Vacation',
            'date_start' => '2026-08-20',
            'date_end' => '2026-08-25',
            'status' => 'pending',
        ]);

        // 11. Seed Expenses
        ErpExpense::create([
            'erp_collaborator_id' => $devSenior->id,
            'erp_project_id' => $acmeWebsite->id,
            'category' => 'Travel',
            'amount' => 250.00,
            'date_expense' => '2026-06-05',
            'status' => 'reimbursed',
        ]);

        ErpExpense::create([
            'erp_collaborator_id' => $designer->id,
            'erp_project_id' => $acmeWebsite->id,
            'category' => 'Hardware',
            'amount' => 1200.00,
            'date_expense' => '2026-06-08',
            'status' => 'reimbursed',
        ]);

        ErpExpense::create([
            'erp_collaborator_id' => $devSenior->id,
            'erp_project_id' => $globexBilling->id,
            'category' => 'Meals',
            'amount' => 85.50,
            'date_expense' => '2026-06-20',
            'status' => 'pending',
        ]);

        ErpExpense::create([
            'erp_collaborator_id' => $devSenior->id,
            'erp_project_id' => $cyberAudit->id,
            'category' => 'Travel',
            'amount' => 350.00,
            'date_expense' => '2026-06-18',
            'status' => 'reimbursed',
        ]);

        ErpExpense::create([
            'erp_collaborator_id' => $designer->id,
            'erp_project_id' => $lmsProject->id,
            'category' => 'Hardware',
            'amount' => 500.00,
            'date_expense' => '2026-05-25',
            'status' => 'pending',
        ]);

        $this->call(HrDatabaseSeeder::class);
    }
}

