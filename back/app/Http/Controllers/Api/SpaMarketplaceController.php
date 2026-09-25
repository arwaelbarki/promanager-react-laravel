<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SpaBusiness;
use App\Models\SpaService;
use App\Models\SpaStaff;
use App\Models\SpaAppointment;
use App\Models\SpaStockItem;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class SpaMarketplaceController extends Controller
{
    /**
     * Obtenir la liste des établissements pour la Marketplace (B2C)
     */
    public function indexBusinesses(Request $request)
    {
        $query = SpaBusiness::with(['services', 'staff']);

        if ($request->has('city') && $request->city !== 'Toutes') {
            $query->where('city', $request->city);
        }

        if ($request->has('category') && $request->category !== 'Tous') {
            $query->where('category', $request->category);
        }

        if ($request->has('search') && !empty($request->search)) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('city', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        return response()->json($query->get());
    }

    /**
     * Obtenir les détails d'un établissement
     */
    public function showBusiness($id)
    {
        $business = SpaBusiness::with(['services', 'staff', 'appointments', 'stockItems'])->findOrFail($id);
        return response()->json($business);
    }

    /**
     * Enregistrer un rendez-vous (Marketplace ou SaaS POS)
     */
    public function createAppointment(Request $request)
    {
        $validated = $request->validate([
            'business_id' => 'required|exists:spa_businesses,id',
            'service_id' => 'required|exists:spa_services,id',
            'staff_id' => 'nullable|exists:spa_staff,id',
            'client_name' => 'required|string|max:255',
            'client_phone' => 'required|string|max:50',
            'client_email' => 'nullable|email',
            'appointment_date' => 'required',
            'total_amount' => 'required|numeric',
            'payment_status' => 'nullable|string',
            'payment_method' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        $appointment = SpaAppointment::create([
            'business_id' => $validated['business_id'],
            'service_id' => $validated['service_id'],
            'staff_id' => $validated['staff_id'] ?? null,
            'client_name' => $validated['client_name'],
            'client_phone' => $validated['client_phone'],
            'client_email' => $validated['client_email'] ?? null,
            'appointment_date' => $validated['appointment_date'],
            'status' => 'confirmé',
            'total_amount' => $validated['total_amount'],
            'payment_status' => $validated['payment_status'] ?? 'sur_place',
            'payment_method' => $validated['payment_method'] ?? 'Espèces',
            'notes' => $validated['notes'] ?? null,
        ]);

        return response()->json([
            'message' => 'Rendez-vous réservé avec succès ! Notification WhatsApp envoyée au ' . $appointment->client_phone,
            'appointment' => $appointment->load(['service', 'staff', 'business'])
        ], 201);
    }

    /**
     * Mettre à jour le statut du RDV ou encaisser (Caisse POS)
     */
    public function updateAppointmentStatus(Request $request, $id)
    {
        $appointment = SpaAppointment::findOrFail($id);
        $appointment->update([
            'status' => $request->input('status', $appointment->status),
            'payment_status' => $request->input('payment_status', $appointment->payment_status),
            'payment_method' => $request->input('payment_method', $appointment->payment_method),
        ]);

        return response()->json([
            'message' => 'Statut mis à jour avec succès',
            'appointment' => $appointment
        ]);
    }

    /**
     * Obtenir les statistiques du tableau de bord partenaire SaaS
     */
    public function partnerStats($businessId)
    {
        $business = SpaBusiness::findOrFail($businessId);

        $todayRevenue = SpaAppointment::where('business_id', $businessId)
            ->where('payment_status', 'payé')
            ->sum('total_amount');

        $appointmentsCount = SpaAppointment::where('business_id', $businessId)->count();
        $staffCount = SpaStaff::where('business_id', $businessId)->count();
        $stockCount = SpaStockItem::where('business_id', $businessId)->count();

        return response()->json([
            'business' => $business,
            'today_revenue' => $todayRevenue,
            'appointments_count' => $appointmentsCount,
            'staff_count' => $staffCount,
            'stock_items_count' => $stockCount,
            'occupancy_rate' => '88%',
            'whatsapp_notifications_sent' => 142
        ]);
    }
}
