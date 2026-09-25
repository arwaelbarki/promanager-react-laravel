<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
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
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class HrApiController extends Controller
{
    // Helper to log actions
    private function logAction($user, $role, $action, $module, $target) {
        try {
            HrAuditLog::create([
                'user_name' => $user,
                'role' => $role,
                'action' => $action,
                'module' => $module,
                'target_item' => $target,
                'ip_address' => request()->ip() ?? '127.0.0.1',
            ]);
        } catch (\Exception $e) {
            // Log silently
        }
    }

    // 1. Dashboard Statistics
    public function getDashboardStats()
    {
        $activeEmployees = HrEmployee::where('status', 'Actif')->count();
        $totalEmployees = HrEmployee::count();
        $pendingLeaves = HrLeaveRequest::where('status', 'En attente')->count();
        
        $today = date('Y-m-d');
        $todayAbsences = HrAbsence::where('date', $today)->count();
        $expiringContracts = HrContract::where('status', 'Actif')
            ->whereNotNull('end_date')
            ->where('end_date', '<=', date('Y-m-d', strtotime('+30 days')))
            ->count();

        // Employees per department
        $departmentStats = HrDepartment::withCount('employees')->get()->map(function ($d) {
            return [
                'name' => $d->name,
                'count' => $d->employees_count,
            ];
        });

        // Contract types breakdown
        $contractStats = HrEmployee::select('contract_type', DB::raw('count(*) as total'))
            ->groupBy('contract_type')
            ->get();

        // Recent Activity
        $recentAuditLogs = HrAuditLog::orderBy('created_at', 'desc')->take(10)->get();

        // Upcoming contract expirations list
        $expiringContractsList = HrContract::with('employee')
            ->where('status', 'Actif')
            ->whereNotNull('end_date')
            ->where('end_date', '<=', date('Y-m-d', strtotime('+45 days')))
            ->orderBy('end_date', 'asc')
            ->get();

        return response()->json([
            'active_employees' => $activeEmployees,
            'total_employees' => $totalEmployees,
            'pending_leaves' => $pendingLeaves,
            'today_absences' => $todayAbsences,
            'expiring_contracts' => $expiringContracts,
            'department_stats' => $departmentStats,
            'contract_stats' => $contractStats,
            'recent_logs' => $recentAuditLogs,
            'expiring_contracts_list' => $expiringContractsList,
        ]);
    }

    // 2. Employees API
    public function getEmployees(Request $request)
    {
        $query = HrEmployee::with(['department', 'position', 'leaveBalance', 'contracts']);

        if ($request->filled('search')) {
            $s = $request->search;
            $query->where(function ($q) use ($s) {
                $q->where('first_name', 'like', "%{$s}%")
                  ->orWhere('last_name', 'like', "%{$s}%")
                  ->orWhere('matricule', 'like', "%{$s}%")
                  ->orWhere('cin', 'like', "%{$s}%")
                  ->orWhere('email', 'like', "%{$s}%");
            });
        }

        if ($request->filled('department_id')) {
            $query->where('department_id', $request->department_id);
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('contract_type')) {
            $query->where('contract_type', $request->contract_type);
        }

        $employees = $query->orderBy('created_at', 'desc')->get();
        return response()->json($employees);
    }

    public function showEmployee($id)
    {
        $employee = HrEmployee::with([
            'department',
            'position',
            'contracts',
            'leaveBalance',
            'leaveRequests.leaveType',
            'absences',
            'attendances',
            'documents',
            'hrRequests'
        ])->findOrFail($id);

        return response()->json($employee);
    }

    public function storeEmployee(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|email|unique:hr_employees,email',
            'department_id' => 'nullable|exists:hr_departments,id',
            'position_id' => 'nullable|exists:hr_positions,id',
            'contract_type' => 'required|string',
            'salary' => 'required|numeric',
            'hire_date' => 'required|date',
            'phone' => 'nullable|string',
            'cin' => 'nullable|string',
        ]);

        $count = HrEmployee::count() + 1;
        $matricule = 'EMP-' . str_pad($count, 4, '0', STR_PAD_LEFT);

        $employee = HrEmployee::create(array_merge($validated, [
            'matricule' => $matricule,
            'status' => 'Actif',
            'photo_url' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        ]));

        // Create initial active contract
        HrContract::create([
            'employee_id' => $employee->id,
            'contract_type' => $validated['contract_type'],
            'start_date' => $validated['hire_date'],
            'salary' => $validated['salary'],
            'status' => 'Actif',
            'trial_period_months' => 3,
        ]);

        // Create leave balance
        HrLeaveBalance::create([
            'employee_id' => $employee->id,
            'year' => 2026,
            'initial_balance' => 18,
            'acquired_days' => 18,
            'consumed_days' => 0,
            'remaining_days' => 18,
        ]);

        // Update department count
        if ($employee->department_id) {
            $dept = HrDepartment::find($employee->department_id);
            if ($dept) {
                $dept->increment('employee_count');
            }
        }

        $this->logAction($request->user_name ?? 'Responsable RH', 'RH', 'Création', 'Employés', "Collaborateur {$employee->first_name} {$employee->last_name} ({$employee->matricule})");

        return response()->json($employee, 201);
    }

    public function updateEmployee(Request $request, $id)
    {
        $employee = HrEmployee::findOrFail($id);
        $employee->update($request->all());

        $this->logAction($request->user_name ?? 'Responsable RH', 'RH', 'Modification', 'Employés', "Collaborateur {$employee->first_name} {$employee->last_name}");

        return response()->json($employee);
    }

    // 3. Departments & Positions API
    public function getDepartments()
    {
        $departments = HrDepartment::withCount('employees')->with('positions')->get();
        return response()->json($departments);
    }

    public function storeDepartment(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'description' => 'nullable|string',
            'manager_name' => 'nullable|string',
        ]);

        $dept = HrDepartment::create($validated);
        $this->logAction($request->user_name ?? 'Admin', 'Admin', 'Création', 'Départements', "Département {$dept->name}");

        return response()->json($dept, 201);
    }

    public function getPositions()
    {
        $positions = HrPosition::with('department')->withCount('employees')->get();
        return response()->json($positions);
    }

    public function storePosition(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'department_id' => 'required|exists:hr_departments,id',
            'level' => 'nullable|string',
            'min_salary' => 'required|numeric',
            'max_salary' => 'required|numeric',
        ]);

        $pos = HrPosition::create($validated);
        $this->logAction($request->user_name ?? 'Admin', 'Admin', 'Création', 'Postes', "Poste {$pos->title}");

        return response()->json($pos, 201);
    }

    // 4. Contracts API
    public function getContracts(Request $request)
    {
        $query = HrContract::with(['employee.department', 'employee.position']);

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('contract_type')) {
            $query->where('contract_type', $request->contract_type);
        }

        $contracts = $query->orderBy('created_at', 'desc')->get();
        return response()->json($contracts);
    }

    public function storeContract(Request $request)
    {
        $validated = $request->validate([
            'employee_id' => 'required|exists:hr_employees,id',
            'contract_type' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date',
            'salary' => 'required|numeric',
            'trial_period_months' => 'nullable|integer',
            'observations' => 'nullable|string',
        ]);

        $contract = HrContract::create(array_merge($validated, ['status' => 'Actif']));
        
        // Update employee active contract type
        $emp = HrEmployee::find($request->employee_id);
        if ($emp) {
            $emp->update(['contract_type' => $validated['contract_type'], 'salary' => $validated['salary']]);
        }

        $this->logAction($request->user_name ?? 'RH', 'RH', 'Création', 'Contrats', "Nouveau contrat {$contract->contract_type} pour " . ($emp->first_name ?? 'Employé'));

        return response()->json($contract, 201);
    }

    // 5. Leave Requests API
    public function getLeaves(Request $request)
    {
        $query = HrLeaveRequest::with(['employee.department', 'leaveType']);

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('employee_id')) {
            $query->where('employee_id', $request->employee_id);
        }

        $leaves = $query->orderBy('created_at', 'desc')->get();
        return response()->json($leaves);
    }

    public function storeLeave(Request $request)
    {
        $validated = $request->validate([
            'employee_id' => 'required|exists:hr_employees,id',
            'leave_type_id' => 'required|exists:hr_leave_types,id',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'total_days' => 'required|integer',
            'reason' => 'nullable|string',
        ]);

        $ref = 'CONG-' . date('Ym') . '-' . rand(100, 999);

        $leave = HrLeaveRequest::create(array_merge($validated, [
            'reference' => $ref,
            'status' => 'En attente',
        ]));

        $emp = HrEmployee::find($request->employee_id);
        $this->logAction($emp->first_name ?? 'Employé', 'Employé', 'Demande', 'Congés', "Demande de congé {$leave->reference} ({$leave->total_days} jours)");

        // Create notification for RH
        HrNotification::create([
            'title' => 'Nouvelle demande de congé',
            'message' => "Nouvelle demande de congé ({$leave->total_days}j) soumise par {$emp->first_name} {$emp->last_name}.",
            'type' => 'info',
        ]);

        return response()->json($leave, 201);
    }

    public function updateLeaveStatus(Request $request, $id)
    {
        $leave = HrLeaveRequest::with('employee')->findOrFail($id);
        $status = $request->input('status'); // Acceptée or Refusée
        $comment = $request->input('hr_comment');

        $leave->status = $status;
        $leave->hr_comment = $comment;
        $leave->processed_by = $request->user_name ?? 'Responsable RH';
        $leave->processed_at = now();
        $leave->save();

        // Deduct from leave balance if accepted
        if ($status === 'Acceptée') {
            $balance = HrLeaveBalance::where('employee_id', $leave->employee_id)->first();
            if ($balance) {
                $balance->consumed_days += $leave->total_days;
                $balance->remaining_days = max(0, $balance->acquired_days - $balance->consumed_days);
                $balance->save();
            }
        }

        // Send notification to employee
        HrNotification::create([
            'title' => "Demande de congé " . strtolower($status),
            'message' => "Votre demande de congé ({$leave->reference}) a été {$status} par le service RH.",
            'type' => $status === 'Acceptée' ? 'success' : 'danger',
        ]);

        $this->logAction($request->user_name ?? 'RH', 'RH', 'Validation', 'Congés', "Décision {$status} sur la demande {$leave->reference}");

        return response()->json($leave);
    }

    // 6. Absences API
    public function getAbsences(Request $request)
    {
        $query = HrAbsence::with(['employee.department']);

        if ($request->filled('is_justified')) {
            $query->where('is_justified', $request->is_justified);
        }

        $absences = $query->orderBy('date', 'desc')->get();
        return response()->json($absences);
    }

    public function storeAbsence(Request $request)
    {
        $validated = $request->validate([
            'employee_id' => 'required|exists:hr_employees,id',
            'date' => 'required|date',
            'type' => 'required|string',
            'reason' => 'nullable|string',
            'is_justified' => 'boolean',
            'hr_comment' => 'nullable|string',
        ]);

        $absence = HrAbsence::create($validated);
        $emp = HrEmployee::find($request->employee_id);
        $this->logAction($request->user_name ?? 'RH', 'RH', 'Enregistrement', 'Absences', "Absence enregistrée pour {$emp->first_name} le {$absence->date}");

        return response()->json($absence, 201);
    }

    // 7. Attendances API (Pointage)
    public function getAttendances(Request $request)
    {
        $query = HrAttendance::with('employee');

        if ($request->filled('date')) {
            $query->where('date', $request->date);
        }

        if ($request->filled('employee_id')) {
            $query->where('employee_id', $request->employee_id);
        }

        $attendances = $query->orderBy('date', 'desc')->get();
        return response()->json($attendances);
    }

    public function clockIn(Request $request)
    {
        $validated = $request->validate([
            'employee_id' => 'required|exists:hr_employees,id',
        ]);

        $today = date('Y-m-d');
        $nowTime = date('H:i:s');

        $attendance = HrAttendance::where('employee_id', $validated['employee_id'])
            ->where('date', $today)
            ->first();

        $isLate = (strtotime($nowTime) > strtotime('09:05:00'));

        if (!$attendance) {
            $attendance = HrAttendance::create([
                'employee_id' => $validated['employee_id'],
                'date' => $today,
                'check_in' => $nowTime,
                'status' => $isLate ? 'Retard' : 'Présent',
                'is_late' => $isLate,
            ]);
        }

        $emp = HrEmployee::find($validated['employee_id']);
        $this->logAction($emp->first_name ?? 'Employé', 'Employé', 'Pointage', 'Présences', "Arrivée enregistrée à {$nowTime}");

        return response()->json($attendance);
    }

    public function clockOut(Request $request)
    {
        $validated = $request->validate([
            'employee_id' => 'required|exists:hr_employees,id',
        ]);

        $today = date('Y-m-d');
        $nowTime = date('H:i:s');

        $attendance = HrAttendance::where('employee_id', $validated['employee_id'])
            ->where('date', $today)
            ->first();

        if ($attendance && $attendance->check_in) {
            $attendance->check_out = $nowTime;
            $start = strtotime($attendance->check_in);
            $end = strtotime($nowTime);
            $diffHours = round(($end - $start) / 3600, 2);
            $attendance->total_hours = max(0, $diffHours);
            $attendance->is_early_departure = (strtotime($nowTime) < strtotime('17:00:00'));
            $attendance->save();
        }

        $emp = HrEmployee::find($validated['employee_id']);
        $this->logAction($emp->first_name ?? 'Employé', 'Employé', 'Pointage', 'Présences', "Départ enregistré à {$nowTime}");

        return response()->json($attendance);
    }

    // 8. HR Documents API
    public function getDocuments(Request $request)
    {
        $query = HrDocument::with('employee');

        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        if ($request->filled('employee_id')) {
            $query->where('employee_id', $request->employee_id);
        }

        $documents = $query->orderBy('created_at', 'desc')->get();
        return response()->json($documents);
    }

    public function storeDocument(Request $request)
    {
        $validated = $request->validate([
            'employee_id' => 'required|exists:hr_employees,id',
            'title' => 'required|string',
            'category' => 'required|string',
        ]);

        $doc = HrDocument::create([
            'employee_id' => $validated['employee_id'],
            'title' => $validated['title'],
            'category' => $validated['category'],
            'file_path' => '/documents/sample_' . rand(100, 999) . '.pdf',
            'file_size_kb' => rand(250, 1800),
            'file_type' => 'application/pdf',
            'uploaded_by' => $request->user_name ?? 'RH',
        ]);

        $emp = HrEmployee::find($validated['employee_id']);
        $this->logAction($request->user_name ?? 'RH', 'RH', 'Upload', 'Documents', "Document {$doc->title} pour {$emp->first_name}");

        return response()->json($doc, 201);
    }

    // 9. HR Requests API
    public function getHrRequests(Request $request)
    {
        $query = HrRequest::with('employee');

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('employee_id')) {
            $query->where('employee_id', $request->employee_id);
        }

        $requests = $query->orderBy('created_at', 'desc')->get();
        return response()->json($requests);
    }

    public function storeHrRequest(Request $request)
    {
        $validated = $request->validate([
            'employee_id' => 'required|exists:hr_employees,id',
            'type' => 'required|string',
            'description' => 'nullable|string',
        ]);

        $ref = 'REQ-' . date('Ym') . '-' . rand(1000, 9999);

        $hrReq = HrRequest::create([
            'reference' => $ref,
            'employee_id' => $validated['employee_id'],
            'type' => $validated['type'],
            'request_date' => date('Y-m-d'),
            'description' => $validated['description'],
            'status' => 'Nouvelle',
        ]);

        $emp = HrEmployee::find($validated['employee_id']);
        $this->logAction($emp->first_name ?? 'Employé', 'Employé', 'Demande', 'Demandes RH', "Demande RH {$ref} ({$hrReq->type})");

        return response()->json($hrReq, 201);
    }

    public function updateHrRequestStatus(Request $request, $id)
    {
        $hrReq = HrRequest::findOrFail($id);
        $hrReq->status = $request->input('status');
        $hrReq->hr_comment = $request->input('hr_comment');
        $hrReq->processed_at = now();
        $hrReq->save();

        $this->logAction($request->user_name ?? 'RH', 'RH', 'Traitement', 'Demandes RH', "Mise à jour demande {$hrReq->reference} vers {$hrReq->status}");

        return response()->json($hrReq);
    }

    // 10. Notifications API
    public function getNotifications()
    {
        $notifications = HrNotification::orderBy('created_at', 'desc')->get();
        return response()->json($notifications);
    }

    public function markNotificationRead($id)
    {
        $n = HrNotification::findOrFail($id);
        $n->update(['is_read' => true]);
        return response()->json($n);
    }

    // 11. Audit Logs API
    public function getAuditLogs()
    {
        $logs = HrAuditLog::orderBy('created_at', 'desc')->get();
        return response()->json($logs);
    }
}
