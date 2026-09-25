<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\TaskController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\CollaboratorController;
use App\Http\Controllers\Api\TimesheetController;
use App\Http\Controllers\Api\QuoteController;
use App\Http\Controllers\Api\InvoiceController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\ContractController;
use App\Http\Controllers\Api\AbsenceController;
use App\Http\Controllers\Api\ExpenseController;

use App\Models\ErpClient;
use App\Models\ErpProject;
use App\Models\ErpTask;
use App\Models\ErpInvoice;
use App\Models\ErpPayment;
use App\Models\ErpContract;
use App\Models\ErpExpense;
use App\Models\ErpAbsence;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::get('/status', function () {
    return response()->json(['status' => 'API is running', 'time' => now()]);
});

// Dashboard KPIs (Admin only)
Route::get('/dashboard-stats', function () {
    return response()->json([
        'clients_count' => ErpClient::count(),
        'projects_count' => ErpProject::count(),
        'tasks_count' => ErpTask::count(),
        'projects_by_status' => [
            'Planifié' => ErpProject::where('status', 'Planifié')->count(),
            'En cours' => ErpProject::where('status', 'En cours')->count(),
            'Terminé' => ErpProject::where('status', 'Terminé')->count(),
        ],
        'tasks_by_status' => [
            'À faire' => ErpTask::where('status', 'À faire')->count(),
            'En cours' => ErpTask::where('status', 'En cours')->count(),
            'Terminé' => ErpTask::where('status', 'Terminé')->count(),
        ],
        // ERP Financials
        'total_invoiced' => ErpInvoice::sum('total'),
        'total_paid' => ErpPayment::sum('amount'),
        'total_salaries' => ErpContract::sum('base_salary'),
        'total_expenses' => ErpExpense::where('status', '!=', 'rejected')->sum('amount'),
        'pending_leaves_count' => ErpAbsence::where('status', 'pending')->count(),
    ]);
});

// Resource routes
Route::apiResource('clients', ClientController::class);
Route::apiResource('projects', ProjectController::class);
Route::apiResource('tasks', TaskController::class);
Route::post('comments', [CommentController::class, 'store']);

// Collaborators & Timesheets
Route::apiResource('collaborators', CollaboratorController::class);
Route::get('timesheets', [TimesheetController::class, 'index']);
Route::post('timesheets', [TimesheetController::class, 'store']);
Route::put('timesheets/{id}/status', [TimesheetController::class, 'updateStatus']);
Route::get('projects/{id}/costs', [TimesheetController::class, 'projectCost']);

// CRM & Facturation
Route::apiResource('quotes', QuoteController::class);
Route::apiResource('invoices', InvoiceController::class);
Route::apiResource('payments', PaymentController::class);

// RH & Absences
Route::apiResource('contracts', ContractController::class);
Route::get('absences', [AbsenceController::class, 'index']);
Route::post('absences', [AbsenceController::class, 'store']);
Route::put('absences/{id}/status', [AbsenceController::class, 'updateStatus']);
Route::delete('absences/{id}', [AbsenceController::class, 'destroy']);

// Achats & Dépenses
Route::get('expenses', [ExpenseController::class, 'index']);
Route::post('expenses', [ExpenseController::class, 'store']);
Route::put('expenses/{id}/status', [ExpenseController::class, 'updateStatus']);
Route::delete('expenses/{id}', [ExpenseController::class, 'destroy']);

// SPA / FITNESS / SALON MARKETPLACE & SAAS ROUTES (FRESHA CLONE)
use App\Http\Controllers\Api\SpaMarketplaceController;
use App\Http\Controllers\Api\HrApiController;

Route::get('spa/businesses', [SpaMarketplaceController::class, 'indexBusinesses']);
Route::get('spa/businesses/{id}', [SpaMarketplaceController::class, 'showBusiness']);
Route::post('spa/appointments', [SpaMarketplaceController::class, 'createAppointment']);
Route::put('spa/appointments/{id}/status', [SpaMarketplaceController::class, 'updateAppointmentStatus']);
Route::get('spa/partner-stats/{businessId}', [SpaMarketplaceController::class, 'partnerStats']);

/*
|--------------------------------------------------------------------------
| HR MANAGEMENT SYSTEM - ENTERPRISE REST API ROUTES
|--------------------------------------------------------------------------
*/
Route::prefix('hr')->group(function () {
    // Dashboard Stats
    Route::get('dashboard-stats', [HrApiController::class, 'getDashboardStats']);

    // Employees
    Route::get('employees', [HrApiController::class, 'getEmployees']);
    Route::get('employees/{id}', [HrApiController::class, 'showEmployee']);
    Route::post('employees', [HrApiController::class, 'storeEmployee']);
    Route::put('employees/{id}', [HrApiController::class, 'updateEmployee']);

    // Departments & Positions
    Route::get('departments', [HrApiController::class, 'getDepartments']);
    Route::post('departments', [HrApiController::class, 'storeDepartment']);
    Route::get('positions', [HrApiController::class, 'getPositions']);
    Route::post('positions', [HrApiController::class, 'storePosition']);

    // Contracts
    Route::get('contracts', [HrApiController::class, 'getContracts']);
    Route::post('contracts', [HrApiController::class, 'storeContract']);

    // Leave Requests
    Route::get('leaves', [HrApiController::class, 'getLeaves']);
    Route::post('leaves', [HrApiController::class, 'storeLeave']);
    Route::put('leaves/{id}/status', [HrApiController::class, 'updateLeaveStatus']);

    // Absences
    Route::get('absences', [HrApiController::class, 'getAbsences']);
    Route::post('absences', [HrApiController::class, 'storeAbsence']);

    // Attendances (Pointage)
    Route::get('attendances', [HrApiController::class, 'getAttendances']);
    Route::post('attendances/clock-in', [HrApiController::class, 'clockIn']);
    Route::post('attendances/clock-out', [HrApiController::class, 'clockOut']);

    // Documents
    Route::get('documents', [HrApiController::class, 'getDocuments']);
    Route::post('documents', [HrApiController::class, 'storeDocument']);

    // HR Requests
    Route::get('hr-requests', [HrApiController::class, 'getHrRequests']);
    Route::post('hr-requests', [HrApiController::class, 'storeHrRequest']);
    Route::put('hr-requests/{id}/status', [HrApiController::class, 'updateHrRequestStatus']);

    // Notifications & Audit Logs
    Route::get('notifications', [HrApiController::class, 'getNotifications']);
    Route::put('notifications/{id}/read', [HrApiController::class, 'markNotificationRead']);
    Route::get('audit-logs', [HrApiController::class, 'getAuditLogs']);
});




