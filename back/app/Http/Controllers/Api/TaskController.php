<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ErpTask;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class TaskController extends Controller
{
    /**
     * Store a newly created task.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority' => 'required|string|in:Basse,Moyenne,Haute',
            'status' => 'required|string|in:À faire,En cours,Terminé',
            'visibility' => 'required|string|in:Publique,Interne',
            'due_date' => 'nullable|date',
            'erp_project_id' => 'required|exists:erp_projects,id',
            'erp_collaborator_id' => 'nullable|exists:erp_collaborators,id',
        ]);

        $task = ErpTask::create($validated);
        $task->load('collaborator');
        return response()->json($task, 201);
    }

    /**
     * Display the specified task with its comments.
     */
    public function show(Request $request, string $id): JsonResponse
    {
        $task = ErpTask::with([
            'collaborator',
            'comments' => function ($query) {
                $query->with(['collaborator', 'client'])->orderBy('created_at', 'desc');
            }, 
            'timesheets.collaborator' => function ($query) {
                $query->orderBy('date', 'desc');
            }
        ])->findOrFail($id);

        $role = $request->header('X-User-Role', 'client');

        // Check if task is internal and user is a client
        if ($task->visibility === 'Interne' && $role !== 'admin' && $role !== 'collaborateur') {
            return response()->json(['error' => 'Non autorisé. Cette tâche est interne.'], 403);
        }

        return response()->json($task);
    }

    /**
     * Update the specified task.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $task = ErpTask::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'priority' => 'sometimes|required|string|in:Basse,Moyenne,Haute',
            'status' => 'sometimes|required|string|in:À faire,En cours,Terminé',
            'visibility' => 'sometimes|required|string|in:Publique,Interne',
            'due_date' => 'nullable|date',
            'erp_collaborator_id' => 'nullable|exists:erp_collaborators,id',
        ]);

        $task->update($validated);
        $task->load('collaborator');
        return response()->json($task);
    }

    /**
     * Remove the specified task.
     */
    public function destroy(string $id): JsonResponse
    {
        $task = ErpTask::findOrFail($id);
        $task->delete();
        return response()->json(['message' => 'Tâche supprimée avec succès']);
    }
}
