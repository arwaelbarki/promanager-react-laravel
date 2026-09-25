<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ErpClient;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ClientController extends Controller
{
    /**
     * Display a listing of clients with their projects count.
     */
    public function index(): JsonResponse
    {
        $clients = ErpClient::withCount('projects')->get();
        return response()->json($clients);
    }

    /**
     * Store a newly created client.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:erp_clients,email',
            'phone' => 'nullable|string|max:20',
            'company' => 'nullable|string|max:255',
        ]);

        $client = ErpClient::create($validated);
        return response()->json($client, 201);
    }

    /**
     * Display the specified client with projects.
     */
    public function show(string $id): JsonResponse
    {
        $client = ErpClient::with('projects')->findOrFail($id);
        return response()->json($client);
    }

    /**
     * Update the specified client.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $client = ErpClient::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:erp_clients,email,' . $client->id,
            'phone' => 'nullable|string|max:20',
            'company' => 'nullable|string|max:255',
        ]);

        $client->update($validated);
        return response()->json($client);
    }

    /**
     * Remove the specified client.
     */
    public function destroy(string $id): JsonResponse
    {
        $client = ErpClient::findOrFail($id);
        $client->delete();
        return response()->json(['message' => 'Client supprimé avec succès']);
    }
}
