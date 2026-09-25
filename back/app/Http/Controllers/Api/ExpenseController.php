<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ErpExpense;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ExpenseController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = ErpExpense::with(['collaborator', 'project']);

        if ($request->has('erp_collaborator_id')) {
            $query->where('erp_collaborator_id', $request->query('erp_collaborator_id'));
        }

        if ($request->has('erp_project_id')) {
            $query->where('erp_project_id', $request->query('erp_project_id'));
        }

        $expenses = $query->latest()->get();
        return response()->json($expenses);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'erp_collaborator_id' => 'required|exists:erp_collaborators,id',
            'erp_project_id' => 'nullable|exists:erp_projects,id',
            'category' => 'required|string|in:Travel,Hardware,Meals,Other',
            'amount' => 'required|numeric|min:0.01',
            'date_expense' => 'required|date',
            'status' => 'nullable|string|in:pending,reimbursed,rejected',
        ]);

        $validated['status'] = $validated['status'] ?? 'pending';

        $expense = ErpExpense::create($validated);
        return response()->json($expense->load(['collaborator', 'project']), 201);
    }

    public function updateStatus(Request $request, string $id): JsonResponse
    {
        $validated = $request->validate([
            'status' => 'required|string|in:pending,reimbursed,rejected',
        ]);

        $expense = ErpExpense::findOrFail($id);
        $expense->update(['status' => $validated['status']]);
        return response()->json($expense->load(['collaborator', 'project']));
    }

    public function destroy(string $id): JsonResponse
    {
        $expense = ErpExpense::findOrFail($id);
        $expense->delete();
        return response()->json(['message' => 'Expense deleted successfully']);
    }
}
