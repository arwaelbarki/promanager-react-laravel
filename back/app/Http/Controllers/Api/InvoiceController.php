<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ErpInvoice;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class InvoiceController extends Controller
{
    public function index(): JsonResponse
    {
        $invoices = ErpInvoice::with(['client', 'project'])->latest()->get();
        return response()->json($invoices);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'invoice_number' => 'required|string|max:255',
            'erp_client_id' => 'required|exists:erp_clients,id',
            'erp_project_id' => 'nullable|exists:erp_projects,id',
            'subtotal' => 'required|numeric|min:0',
            'tax_rate' => 'required|numeric|min:0|max:100',
            'total' => 'required|numeric|min:0',
            'status' => 'required|string|in:Draft,Sent,Paid,Overdue',
            'date_issue' => 'required|date',
            'date_due' => 'required|date',
        ]);

        $invoice = ErpInvoice::create($validated);
        return response()->json($invoice->load(['client', 'project']), 201);
    }

    public function show(string $id): JsonResponse
    {
        $invoice = ErpInvoice::with(['client', 'project', 'payments'])->findOrFail($id);
        return response()->json($invoice);
    }

    public function update(Request $request, string $id): JsonResponse
    {
        $invoice = ErpInvoice::findOrFail($id);

        $validated = $request->validate([
            'invoice_number' => 'sometimes|required|string|max:255',
            'erp_client_id' => 'sometimes|required|exists:erp_clients,id',
            'erp_project_id' => 'nullable|exists:erp_projects,id',
            'subtotal' => 'sometimes|required|numeric|min:0',
            'tax_rate' => 'sometimes|required|numeric|min:0|max:100',
            'total' => 'sometimes|required|numeric|min:0',
            'status' => 'sometimes|required|string|in:Draft,Sent,Paid,Overdue',
            'date_issue' => 'sometimes|required|date',
            'date_due' => 'sometimes|required|date',
        ]);

        $invoice->update($validated);
        return response()->json($invoice->load(['client', 'project']));
    }

    public function destroy(string $id): JsonResponse
    {
        $invoice = ErpInvoice::findOrFail($id);
        $invoice->delete();
        return response()->json(['message' => 'Invoice deleted successfully']);
    }
}
