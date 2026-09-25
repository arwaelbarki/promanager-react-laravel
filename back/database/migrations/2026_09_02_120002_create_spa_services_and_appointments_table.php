<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('spa_services', function (Blueprint $table) {
            $table->id();
            $table->foreignId('business_id')->constrained('spa_businesses')->onDelete('cascade');
            $table->string('title');
            $table->string('category'); // Massage, Soin Visage, Pass Fitness, Hammam, Carte Cadeau
            $table->text('description')->nullable();
            $table->integer('duration_minutes')->default(60);
            $table->decimal('price', 10, 2); // Tarif en MAD
            $table->integer('sessions_count')->nullable(); // Pour les pass/abonnements
            $table->boolean('is_popular')->default(false);
            $table->timestamps();
        });

        Schema::create('spa_staff', function (Blueprint $table) {
            $table->id();
            $table->foreignId('business_id')->constrained('spa_businesses')->onDelete('cascade');
            $table->string('name');
            $table->string('role'); // Massothérapeute, Esthéticienne, Coach Fitness, Coiffeur
            $table->string('avatar')->nullable();
            $table->decimal('commission_rate', 5, 2)->default(10.00); // Pourcentage commission
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('spa_appointments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('business_id')->constrained('spa_businesses')->onDelete('cascade');
            $table->foreignId('service_id')->constrained('spa_services')->onDelete('cascade');
            $table->foreignId('staff_id')->nullable()->constrained('spa_staff')->onDelete('set null');
            $table->string('client_name');
            $table->string('client_phone');
            $table->string('client_email')->nullable();
            $table->dateTime('appointment_date');
            $table->string('status')->default('confirmé'); // confirmé, en_cours, payé, annulé
            $table->decimal('total_amount', 10, 2);
            $table->string('payment_status')->default('sur_place'); // sur_place, paye_cmi, paye_stripe, carte_cadeau
            $table->string('payment_method')->nullable(); // Espèces, CB, Virement, WhatsApp Pay
            $table->text('notes')->nullable();
            $table->timestamps();
        });

        Schema::create('spa_stock_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('business_id')->constrained('spa_businesses')->onDelete('cascade');
            $table->string('name');
            $table->string('category'); // Retail, Consommable Cabine, Huile, Shampoing
            $table->integer('quantity')->default(10);
            $table->integer('min_threshold')->default(5);
            $table->decimal('unit_price', 10, 2);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('spa_stock_items');
        Schema::dropIfExists('spa_appointments');
        Schema::dropIfExists('spa_staff');
        Schema::dropIfExists('spa_services');
    }
};
