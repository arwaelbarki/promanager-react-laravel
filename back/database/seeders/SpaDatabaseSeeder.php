<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SpaBusiness;
use App\Models\SpaService;
use App\Models\SpaStaff;
use App\Models\SpaAppointment;
use App\Models\SpaStockItem;

class SpaDatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Crystal Spa & Luxury Wellness Marrakech
        $b1 = SpaBusiness::create([
            'name' => 'Crystal Spa & Wellness Royal',
            'slug' => 'crystal-spa-royal-marrakech',
            'category' => 'Spa',
            'city' => 'Marrakech',
            'address' => 'Avenue Mohammed VI, Hivernage, Marrakech',
            'phone' => '+212 524 43 00 11',
            'email' => 'contact@crystalspa-marrakech.ma',
            'description' => 'Centre d’exception combinant Hammam traditionnel en marbre blanc, soins à l’huile d’argan pure et massages relaxants.',
            'image_url' => 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
            'rating' => 4.95,
            'reviews_count' => 148,
            'opening_hours' => '09:00 - 22:00',
            'has_biometrics' => true,
            'has_whatsapp' => true,
            'is_featured' => true,
        ]);

        // Services pour Crystal Spa
        $s1 = SpaService::create([
            'business_id' => $b1->id,
            'title' => 'Rituel Hammam Royal & Gommage au Savon Noir',
            'category' => 'Hammam',
            'description' => 'Hammam vapeur aromatique, gommage traditionnel au kessa et enveloppement au ghassoul aux 7 plantes.',
            'duration_minutes' => 75,
            'price' => 450.00,
            'is_popular' => true,
        ]);

        $s2 = SpaService::create([
            'business_id' => $b1->id,
            'title' => 'Massage Relaxant à l’Huile d’Argan Fleur d’Oranger',
            'category' => 'Massage',
            'description' => 'Massage complet du corps décontracturant aux huiles précieuses du souss.',
            'duration_minutes' => 60,
            'price' => 600.00,
            'is_popular' => true,
        ]);

        $s3 = SpaService::create([
            'business_id' => $b1->id,
            'title' => 'Pass Sérénité 10 Séances Spa & Hammam',
            'category' => 'Pass Fitness',
            'description' => 'Abonnement multi-accès utilisable sur 6 mois avec accès jacuzzi et sauna offert.',
            'duration_minutes' => 90,
            'price' => 3800.00,
            'sessions_count' => 10,
            'is_popular' => false,
        ]);

        // Personnel
        $st1 = SpaStaff::create([
            'business_id' => $b1->id,
            'name' => 'Laila El Amrani',
            'role' => 'Master Praticienne Spa & Hammam',
            'avatar' => 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
            'commission_rate' => 15.00,
        ]);

        $st2 = SpaStaff::create([
            'business_id' => $b1->id,
            'name' => 'Youssef Benali',
            'role' => 'Massothérapeute Sportif & Wellness',
            'avatar' => 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
            'commission_rate' => 12.00,
        ]);

        // Stock Items
        SpaStockItem::create([
            'business_id' => $b1->id,
            'name' => 'Huile d’Argan Biologique 250ml',
            'category' => 'Retail',
            'quantity' => 24,
            'min_threshold' => 5,
            'unit_price' => 180.00,
        ]);

        SpaStockItem::create([
            'business_id' => $b1->id,
            'name' => 'Savon Noir à l’Eucalyptus (Seau 5Kg)',
            'category' => 'Consommable Cabine',
            'quantity' => 8,
            'min_threshold' => 2,
            'unit_price' => 320.00,
        ]);

        // Rendez-vous exemples
        SpaAppointment::create([
            'business_id' => $b1->id,
            'service_id' => $s1->id,
            'staff_id' => $st1->id,
            'client_name' => 'Sophiya Bennani',
            'client_phone' => '+212 661 12 34 56',
            'client_email' => 'sophiya.b@gmail.com',
            'appointment_date' => now()->format('Y-m-d 14:30:00'),
            'status' => 'confirmé',
            'total_amount' => 450.00,
            'payment_status' => 'payé',
            'payment_method' => 'Carte Bancaire CMI',
            'notes' => 'Client régulier - Préfère la salle VIP'
        ]);

        SpaAppointment::create([
            'business_id' => $b1->id,
            'service_id' => $s2->id,
            'staff_id' => $st2->id,
            'client_name' => 'Karim Tazi',
            'client_phone' => '+212 662 99 88 77',
            'client_email' => 'karim.tazi@hotmail.com',
            'appointment_date' => now()->format('Y-m-d 16:00:00'),
            'status' => 'confirmé',
            'total_amount' => 600.00,
            'payment_status' => 'sur_place',
            'payment_method' => 'Espèces',
            'notes' => 'Besoin d’accentuer sur le dos'
        ]);

        // 2. FitClub Pro & Reconnaissance Faciale Casablanca
        $b2 = SpaBusiness::create([
            'name' => 'FitClub Premium & BioGym Casa',
            'slug' => 'fitclub-biogym-casablanca',
            'category' => 'Fitness',
            'city' => 'Casablanca',
            'address' => 'Boulevard d’Anfa, Gauthier, Casablanca',
            'phone' => '+212 522 20 40 50',
            'email' => 'contact@fitclub-casa.ma',
            'description' => 'Club de fitness haut de gamme doté du contrôle d’accès biométrique par reconnaissance faciale, cours collectifs et coaching personnalisé.',
            'image_url' => 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
            'rating' => 4.88,
            'reviews_count' => 210,
            'opening_hours' => '06:00 - 23:00',
            'has_biometrics' => true,
            'has_whatsapp' => true,
            'is_featured' => true,
        ]);

        SpaService::create([
            'business_id' => $b2->id,
            'title' => 'Abonnement Annuel VIP All Inclusive + Badge Facial',
            'category' => 'Pass Fitness',
            'description' => 'Accès illimité 7j/7, accès hammam/sauna, 3 séances de coaching et enregistrement biométrique.',
            'duration_minutes' => 60,
            'price' => 5500.00,
            'sessions_count' => 365,
            'is_popular' => true,
        ]);

        // 3. Salon Elegance Hair & Barber Rabat
        $b3 = SpaBusiness::create([
            'name' => 'Maison Élégance Coiffure & Barbershop',
            'slug' => 'elegance-coiffure-barber-rabat',
            'category' => 'Coiffure',
            'city' => 'Rabat',
            'address' => 'Avenue de France, Agdal, Rabat',
            'phone' => '+212 537 77 88 99',
            'email' => 'info@elegance-rabat.ma',
            'description' => 'Salon de coiffure styliste et barbershop pour hommes et femmes avec soins capillaires à la kératine et lissage brésilien.',
            'image_url' => 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80',
            'rating' => 4.90,
            'reviews_count' => 95,
            'opening_hours' => '10:00 - 20:00',
            'has_biometrics' => false,
            'has_whatsapp' => true,
            'is_featured' => true,
        ]);

        SpaService::create([
            'business_id' => $b3->id,
            'title' => 'Soin Capillaire Kératine & Brushing Signature',
            'category' => 'Coiffure',
            'description' => 'Soin réparateur en profondeur, coupe tendance et brushing d’exception.',
            'duration_minutes' => 90,
            'price' => 500.00,
            'is_popular' => true,
        ]);
    }
}
