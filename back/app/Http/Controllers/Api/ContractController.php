<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ErpContract;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ContractController extends Controller
{
    public function index(): JsonResponse
    {
        $contracts = ErpContract::with('collaborator')->latest()->get();
        return response()->json($contracts);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'erp_collaborator_id' => 'required|exists:erp_collaborators,id',
            'contract_type' => 'required|string|in:CDI,CDD,Freelance',
            'base_salary' => 'required|numeric|min:0',
            'date_start' => 'required|date',
            'date_end' => 'nullable|date|after_or_equal:date_start',
        ]);

        $contract = ErpContract::create($validated);
        return response()->json($contract->load('collaborator'), 201);
    }

    public function show(string $id): JsonResponse
    {
        $contract = ErpContract::with('collaborator')->findOrFail($id);
        return response()->json($contract);
    }

    public function update(Request $request, string $id): JsonResponse
    {
        $contract = ErpContract::findOrFail($id);

        $validated = $request->validate([
            'erp_collaborator_id' => 'sometimes|required|exists:erp_collaborators,id',
            'contract_type' => 'sometimes|required|string|in:CDI,CDD,Freelance',
            'base_salary' => 'sometimes|required|numeric|min:0',
            'date_start' => 'sometimes|required|date',
            'date_end' => 'nullable|date|after_or_equal:date_start',
        ]);

        $contract->update($validated);
        return response()->json($contract->load('collaborator'));
    }

    public function destroy(string $id): JsonResponse
    {
        $contract = ErpContract::findOrFail($id);
        $contract->delete();
        return response()->json(['message' => 'Contract deleted successfully']);
    }
}
