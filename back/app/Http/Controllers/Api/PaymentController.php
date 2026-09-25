<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ErpPayment;
use App\Models\ErpInvoice;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class PaymentController extends Controller
{
    public function index(): JsonResponse
    {
        $payments = ErpPayment::with('invoice.client')->latest()->get();
        return response()->json($payments);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'erp_invoice_id' => 'required|exists:erp_invoices,id',
            'amount' => 'required|numeric|min:0.01',
            'date_payment' => 'required|date',
            'payment_method' => 'required|string|in:Wire,Card,Cash',
        ]);

        $payment = ErpPayment::create($validated);

        // Optionally, check if invoice is fully paid and update its status
        $invoice = ErpInvoice::findOrFail($validated['erp_invoice_id']);
        $totalPaid = ErpPayment::where('erp_invoice_id', $invoice->id)->sum('amount');
        if ($totalPaid >= $invoice->total) {
            $invoice->update(['status' => 'Paid']);
        }

        return response()->json($payment->load('invoice.client'), 201);
    }

    public function destroy(string $id): JsonResponse
    {
        $payment = ErpPayment::findOrFail($id);
        $payment->delete();
        return response()->json(['message' => 'Payment deleted successfully']);
    }
}
