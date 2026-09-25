<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ErpQuote;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class QuoteController extends Controller
{
    public function index(): JsonResponse
    {
        $quotes = ErpQuote::with('client')->latest()->get();
        return response()->json($quotes);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'reference' => 'required|string|max:255',
            'erp_client_id' => 'required|exists:erp_clients,id',
            'total_amount' => 'required|numeric|min:0',
            'date_issue' => 'required|date',
            'date_expiry' => 'required|date',
            'status' => 'required|string|in:Draft,Sent,Accepted,Declined',
        ]);

        $quote = ErpQuote::create($validated);
        return response()->json($quote->load('client'), 201);
    }

    public function show(string $id): JsonResponse
    {
        $quote = ErpQuote::with('client')->findOrFail($id);
        return response()->json($quote);
    }

    public function update(Request $request, string $id): JsonResponse
    {
        $quote = ErpQuote::findOrFail($id);

        $validated = $request->validate([
            'reference' => 'sometimes|required|string|max:255',
            'erp_client_id' => 'sometimes|required|exists:erp_clients,id',
            'total_amount' => 'sometimes|required|numeric|min:0',
            'date_issue' => 'sometimes|required|date',
            'date_expiry' => 'sometimes|required|date',
            'status' => 'sometimes|required|string|in:Draft,Sent,Accepted,Declined',
        ]);

        $quote->update($validated);
        return response()->json($quote->load('client'));
    }

    public function destroy(string $id): JsonResponse
    {
        $quote = ErpQuote::findOrFail($id);
        $quote->delete();
        return response()->json(['message' => 'Quote deleted successfully']);
    }
}
