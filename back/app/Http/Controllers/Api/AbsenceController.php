<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ErpAbsence;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class AbsenceController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = ErpAbsence::with('collaborator');

        if ($request->has('erp_collaborator_id')) {
            $query->where('erp_collaborator_id', $request->query('erp_collaborator_id'));
        }

        $absences = $query->latest()->get();
        return response()->json($absences);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'erp_collaborator_id' => 'required|exists:erp_collaborators,id',
            'type' => 'required|string|in:Vacation,Sick,Unpaid',
            'date_start' => 'required|date',
            'date_end' => 'required|date|after_or_equal:date_start',
            'status' => 'nullable|string|in:pending,approved,rejected',
        ]);

        $validated['status'] = $validated['status'] ?? 'pending';

        $absence = ErpAbsence::create($validated);
        return response()->json($absence->load('collaborator'), 201);
    }

    public function updateStatus(Request $request, string $id): JsonResponse
    {
        $validated = $request->validate([
            'status' => 'required|string|in:approved,rejected,pending',
        ]);

        $absence = ErpAbsence::findOrFail($id);
        $absence->update(['status' => $validated['status']]);
        return response()->json($absence->load('collaborator'));
    }

    public function destroy(string $id): JsonResponse
    {
        $absence = ErpAbsence::findOrFail($id);
        $absence->delete();
        return response()->json(['message' => 'Absence request deleted successfully']);
    }
}
