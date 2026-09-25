<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ErpComment;
use App\Models\ErpTask;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class CommentController extends Controller
{
    /**
     * Store a newly created comment.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'author' => 'required|string|max:255',
            'content' => 'required|string',
            'erp_task_id' => 'required|exists:erp_tasks,id',
            'erp_collaborator_id' => 'nullable|exists:erp_collaborators,id',
            'erp_client_id' => 'nullable|exists:erp_clients,id',
        ]);

        // Optional check: if task is internal and role is client, deny
        $task = ErpTask::findOrFail($validated['erp_task_id']);
        $role = $request->header('X-User-Role', 'client');

        if ($task->visibility === 'Interne' && $role !== 'admin') {
            return response()->json(['error' => 'Non autorisé.'], 403);
        }

        // Auto associate admin collaborator if role is admin
        if ($role === 'admin' && empty($validated['erp_collaborator_id'])) {
            $adminCollab = \App\Models\ErpCollaborator::where('role', 'admin')->first();
            if ($adminCollab) {
                $validated['erp_collaborator_id'] = $adminCollab->id;
            }
        }

        $comment = ErpComment::create($validated);
        $comment->load(['collaborator', 'client']);
        return response()->json($comment, 201);
    }
}
