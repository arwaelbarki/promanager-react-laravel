<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ErpProject;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ProjectController extends Controller
{
    /**
     * Display a listing of projects.
     */
    public function index(Request $request): JsonResponse
    {
        $query = ErpProject::with('client')->withCount('tasks');

        // Optional filter by client
        if ($request->has('erp_client_id')) {
            $query->where('erp_client_id', $request->query('erp_client_id'));
        }

        $projects = $query->get();
        return response()->json($projects);
    }

    /**
     * Store a newly created project.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|string',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date',
            'erp_client_id' => 'required|exists:erp_clients,id',
        ]);

        $project = ErpProject::create($validated);
        // load client relationship
        $project->load('client');
        return response()->json($project, 201);
    }

    /**
     * Display the specified project with its tasks.
     */
    public function show(Request $request, string $id): JsonResponse
    {
        $project = ErpProject::with('client')->findOrFail($id);
        
        $role = $request->header('X-User-Role', 'client'); // default to client for safety

        // Get tasks relation with count of comments and load collaborator
        $tasksQuery = $project->tasks()->with('collaborator')->withCount('comments');

        // If client, hide internal tasks
        if ($role !== 'admin') {
            $tasksQuery->where('visibility', 'Publique');
        }

        $tasks = $tasksQuery->get();
        
        // Add tasks manually to the response to match the structure
        $projectArray = $project->toArray();
        $projectArray['tasks'] = $tasks;

        return response()->json($projectArray);
    }

    /**
     * Update the specified project.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $project = ErpProject::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'sometimes|required|string',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date',
            'erp_client_id' => 'sometimes|required|exists:erp_clients,id',
        ]);

        $project->update($validated);
        $project->load('client');
        return response()->json($project);
    }

    /**
     * Remove the specified project.
     */
    public function destroy(string $id): JsonResponse
    {
        $project = ErpProject::findOrFail($id);
        $project->delete();
        return response()->json(['message' => 'Projet supprimé avec succès']);
    }
}
