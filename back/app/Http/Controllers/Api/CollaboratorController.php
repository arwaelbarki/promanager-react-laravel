<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ErpCollaborator;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class CollaboratorController extends Controller
{
    /**
     * Display a listing of the collaborators.
     */
    public function index(): JsonResponse
    {
        $collaborators = ErpCollaborator::withCount(['timesheets as total_hours' => function ($query) {
            $query->where('status', 'approved');
        }])->get();
        return response()->json($collaborators);
    }

    /**
     * Store a newly created collaborator.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:erp_collaborators,email',
            'role' => 'required|string|in:collaborator,collaborateur,admin',
            'hourly_rate' => 'required|numeric|min:0',
        ]);

        $collaborator = ErpCollaborator::create($validated);
        return response()->json($collaborator, 201);
    }

    /**
     * Update the specified collaborator.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $collaborator = ErpCollaborator::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:erp_collaborators,email,' . $collaborator->id,
            'role' => 'sometimes|required|string|in:collaborator,collaborateur,admin',
            'hourly_rate' => 'sometimes|required|numeric|min:0',
        ]);

        $collaborator->update($validated);
        return response()->json($collaborator);
    }

    /**
     * Remove the specified collaborator.
     */
    public function destroy(string $id): JsonResponse
    {
        $collaborator = ErpCollaborator::findOrFail($id);
        $collaborator->delete();
        return response()->json(['message' => 'Collaborator deleted successfully']);
    }
}
