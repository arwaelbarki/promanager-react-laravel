<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('spa_businesses', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('category'); // Spa, Coiffure, Fitness, Hammam, Massage, Barber
            $table->string('city'); // Casablanca, Marrakech, Rabat, Agadir, Tanger
            $table->string('address');
            $table->string('phone');
            $table->string('email');
            $table->text('description')->nullable();
            $table->string('image_url')->nullable();
            $table->decimal('rating', 3, 2)->default(4.9);
            $table->integer('reviews_count')->default(24);
            $table->string('opening_hours')->default('09:00 - 21:00');
            $table->boolean('has_biometrics')->default(false); // Pointage & Reconnaissance faciale
            $table->boolean('has_whatsapp')->default(true);
            $table->boolean('is_featured')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('spa_businesses');
    }
};
