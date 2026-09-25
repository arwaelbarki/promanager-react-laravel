<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ErpTimesheet;
use App\Models\ErpProject;
use App\Models\ErpExpense;
use App\Models\ErpInvoice;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class TimesheetController extends Controller
{
    /**
     * Display a listing of timesheets.
     */
    public function index(Request $request): JsonResponse
    {
        $query = ErpTimesheet::with(['collaborator', 'task.project']);

        if ($request->has('status')) {
            $query->where('status', $request->query('status'));
        }

        if ($request->has('erp_collaborator_id')) {
            $query->where('erp_collaborator_id', $request->query('erp_collaborator_id'));
        }

        $timesheets = $query->latest()->get();
        return response()->json($timesheets);
    }

    /**
     * Store a newly created timesheet.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'erp_collaborator_id' => 'required|exists:erp_collaborators,id',
            'erp_task_id' => 'required|exists:erp_tasks,id',
            'date' => 'required|date',
            'hours' => 'required|numeric|min:0.5|max:24',
            'description' => 'nullable|string|max:1000',
        ]);

        $timesheet = ErpTimesheet::create($validated);
        $timesheet->load(['collaborator', 'task.project']);
        return response()->json($timesheet, 201);
    }

    /**
     * Update the status (Approve / Reject) of a timesheet.
     */
    public function updateStatus(Request $request, string $id): JsonResponse
    {
        $validated = $request->validate([
            'status' => 'required|string|in:approved,rejected,pending',
        ]);

        $timesheet = ErpTimesheet::findOrFail($id);
        $timesheet->update(['status' => $validated['status']]);
        
        return response()->json($timesheet->load(['collaborator', 'task.project']));
    }

    /**
     * Get costing report for a specific project.
     */
    public function projectCost(string $projectId): JsonResponse
    {
        $project = ErpProject::findOrFail($projectId);
        
        // Fetch all approved timesheets for tasks in this project
        $timesheets = ErpTimesheet::whereHas('task', function ($query) use ($projectId) {
            $query->where('erp_project_id', $projectId);
        })
        ->where('status', 'approved')
        ->with('collaborator')
        ->get();

        $totalHours = $timesheets->sum('hours');
        $laborCost = 0;

        foreach ($timesheets as $timesheet) {
            $rate = $timesheet->collaborator ? $timesheet->collaborator->hourly_rate : 0;
            $laborCost += $timesheet->hours * $rate;
        }

        // Fetch all non-rejected expenses for this project
        $totalExpenses = ErpExpense::where('erp_project_id', $projectId)
            ->where('status', '!=', 'rejected')
            ->sum('amount');

        // Fetch all invoices for this project
        $totalInvoiced = ErpInvoice::where('erp_project_id', $projectId)
            ->sum('total');

        $totalCost = $laborCost + $totalExpenses;
        $variance = $project->budget - $totalCost;

        return response()->json([
            'project_id' => $project->id,
            'project_name' => $project->name,
            'budget' => $project->budget,
            'total_hours' => $totalHours,
            'labor_cost' => $laborCost,
            'total_expenses' => $totalExpenses,
            'total_invoiced' => $totalInvoiced,
            'real_cost' => $totalCost, // backward compatibility
            'variance' => $variance
        ]);
    }
}
