import React, { useState } from 'react';

const DesignSystemView = () => {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16 animate-fade-in select-none">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#0F766E] uppercase tracking-wider mb-1">
            <span className="w-2 h-2 rounded-full bg-[#0F766E]"></span>
            <span>Référence Officielle</span>
          </div>
          <h1 className="text-2xl font-bold text-[#172033] tracking-tight">Design System — Amsoft People</h1>
          <p className="text-xs text-slate-500 mt-1">
            Guide complet et spécifications visuelles (Couleurs, Typographies, Boutons, Badges, Cartes &amp; Composants RH).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 bg-[#e6f7f4] text-[#0F766E] font-bold text-xs rounded-xl border border-[#0F766E]/20">
            Version 1.0.0
          </span>
        </div>
      </div>

      {/* 1. PALETTE DE COULEURS */}
      <section className="space-y-4">
        <div className="border-b border-slate-200 pb-2">
          <h2 className="text-sm font-bold text-[#172033] uppercase tracking-wider">1. Palette de Couleurs</h2>
          <p className="text-xs text-slate-500">80–90 % de l'interface utilise les couleurs neutres et Teal principal. Les couleurs secondaires sont réservées aux états métier.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Primary */}
          <div className="card-saas p-4 space-y-3">
            <div className="h-16 rounded-xl bg-[#0F766E] flex items-end p-2.5 text-white font-mono text-xs font-bold shadow-xs">
              #0F766E
            </div>
            <div>
              <div className="font-bold text-xs text-[#172033]">Primary (Marque Amsoft)</div>
              <div className="text-[11px] text-slate-500">Identité visuelle principale, CTA, sélections</div>
            </div>
          </div>

          {/* Primary Hover */}
          <div className="card-saas p-4 space-y-3">
            <div className="h-16 rounded-xl bg-[#0D625C] flex items-end p-2.5 text-white font-mono text-xs font-bold shadow-xs">
              #0D625C
            </div>
            <div>
              <div className="font-bold text-xs text-[#172033]">Primary Hover</div>
              <div className="text-[11px] text-slate-500">Survol des boutons et interactions</div>
            </div>
          </div>

          {/* Text Main */}
          <div className="card-saas p-4 space-y-3">
            <div className="h-16 rounded-xl bg-[#172033] flex items-end p-2.5 text-white font-mono text-xs font-bold shadow-xs">
              #172033
            </div>
            <div>
              <div className="font-bold text-xs text-[#172033]">Text Main (Bleu Nuit)</div>
              <div className="text-[11px] text-slate-500">Titres, corps principal, contraste élevé</div>
            </div>
          </div>

          {/* Text Secondary */}
          <div className="card-saas p-4 space-y-3">
            <div className="h-16 rounded-xl bg-[#64748B] flex items-end p-2.5 text-white font-mono text-xs font-bold shadow-xs">
              #64748B
            </div>
            <div>
              <div className="font-bold text-xs text-[#172033]">Text Secondary</div>
              <div className="text-[11px] text-slate-500">Sous-titres, labels, légendes</div>
            </div>
          </div>

          {/* Background */}
          <div className="card-saas p-4 space-y-3">
            <div className="h-16 rounded-xl bg-[#F7F9FA] border border-slate-200 flex items-end p-2.5 text-slate-700 font-mono text-xs font-bold">
              #F7F9FA
            </div>
            <div>
              <div className="font-bold text-xs text-[#172033]">Background (Fond de page)</div>
              <div className="text-[11px] text-slate-500">Fond sobre à léger contraste</div>
            </div>
          </div>

          {/* Surface */}
          <div className="card-saas p-4 space-y-3">
            <div className="h-16 rounded-xl bg-[#FFFFFF] border border-slate-200 flex items-end p-2.5 text-slate-700 font-mono text-xs font-bold">
              #FFFFFF
            </div>
            <div>
              <div className="font-bold text-xs text-[#172033]">Surface (Cartes & Tableaux)</div>
              <div className="text-[11px] text-slate-500">Conteneurs d'informations unifiés</div>
            </div>
          </div>

          {/* Border */}
          <div className="card-saas p-4 space-y-3">
            <div className="h-16 rounded-xl bg-[#E2E8F0] flex items-end p-2.5 text-slate-700 font-mono text-xs font-bold">
              #E2E8F0
            </div>
            <div>
              <div className="font-bold text-xs text-[#172033]">Border (Bordure)</div>
              <div className="text-[11px] text-slate-500">Séparateurs et contours discrets</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. COULEURS FONCTIONNELLES (ÉTATS MÉTIER) */}
      <section className="space-y-4">
        <div className="border-b border-slate-200 pb-2">
          <h2 className="text-sm font-bold text-[#172033] uppercase tracking-wider">2. Couleurs Fonctionnelles (États Métier)</h2>
          <p className="text-xs text-slate-500">Réservées uniquement pour porter une signification fonctionnelle (Succès, Avertissement, Erreur, Information).</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Success */}
          <div className="card-saas p-4 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-[#16A34A]"></span>
              <span className="font-bold text-xs text-[#172033]">Success (#16A34A)</span>
            </div>
            <p className="text-[11px] text-slate-500">Actif, Acceptée, Validé, Disponible, Justifiée</p>
          </div>

          {/* Warning */}
          <div className="card-saas p-4 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-[#D97706]"></span>
              <span className="font-bold text-xs text-[#172033]">Warning (#D97706)</span>
            </div>
            <p className="text-[11px] text-slate-500">En attente, À échéance, Expirant bientôt, À vérifier</p>
          </div>

          {/* Error */}
          <div className="card-saas p-4 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-[#DC2626]"></span>
              <span className="font-bold text-xs text-[#172033]">Error (#DC2626)</span>
            </div>
            <p className="text-[11px] text-slate-500">Refusée, Expiré, Non justifiée, Supprimer (action destructive)</p>
          </div>

          {/* Info */}
          <div className="card-saas p-4 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-[#2563EB]"></span>
              <span className="font-bold text-xs text-[#172033]">Info (#2563EB)</span>
            </div>
            <p className="text-[11px] text-slate-500">Informations système neutres, filtres informatifs</p>
          </div>
        </div>
      </section>

      {/* 3. TYPOGRAPHIE ET RAYONS DE COURBURE */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Typography */}
        <div className="card-saas p-6 space-y-4">
          <h2 className="text-sm font-bold text-[#172033] uppercase tracking-wider border-b border-slate-100 pb-2">
            3. Échelle Typographique (Inter)
          </h2>
          <div className="space-y-3">
            <div>
              <span className="text-[10px] font-mono text-slate-400">H1 — 36px / 48px</span>
              <h1 className="text-2xl font-extrabold text-[#172033]">Gestion des collaborateurs</h1>
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-400">H2 — 24px / 32px</span>
              <h2 className="text-lg font-bold text-[#172033]">Tableau de bord RH</h2>
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-400">H3 — 18px / 24px</span>
              <h3 className="text-sm font-bold text-[#172033]">Fiche du collaborateur</h3>
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-400">Body — 15px / 22px</span>
              <p className="text-xs text-slate-600">Gérez les contrats, les absences et les présences depuis un espace unifié.</p>
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-400">Small — 13px / 18px</span>
              <p className="text-[11px] text-slate-400">Dernière synchronisation : aujourd'hui à 14:30</p>
            </div>
          </div>
        </div>

        {/* Radius Scale */}
        <div className="card-saas p-6 space-y-4">
          <h2 className="text-sm font-bold text-[#172033] uppercase tracking-wider border-b border-slate-100 pb-2">
            4. Système de Rayons (Border Radius)
          </h2>
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-[6px]">
              <div>
                <span className="font-bold text-[#172033] block">Small — 6px</span>
                <span className="text-[11px] text-slate-500">Badges d'état, étiquettes, pilules courtes</span>
              </div>
              <span className="px-2 py-1 bg-white border border-slate-200 rounded-[6px] font-mono text-[11px]">6px</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-[10px]">
              <div>
                <span className="font-bold text-[#172033] block">Medium — 10px</span>
                <span className="text-[11px] text-slate-500">Boutons, champs de saisie, sélecteurs</span>
              </div>
              <span className="px-2 py-1 bg-white border border-slate-200 rounded-[10px] font-mono text-[11px]">10px</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-[14px]">
              <div>
                <span className="font-bold text-[#172033] block">Large — 14px</span>
                <span className="text-[11px] text-slate-500">Cartes de contenu, modales, conteneurs principaux</span>
              </div>
              <span className="px-2 py-1 bg-white border border-slate-200 rounded-[14px] font-mono text-[11px]">14px</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BOUTONS & CHAMPS */}
      <section className="card-saas p-6 space-y-6">
        <h2 className="text-sm font-bold text-[#172033] uppercase tracking-wider border-b border-slate-100 pb-2">
          5. Composants Standardisés (Boutons &amp; Formulaires)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Primary Button */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-500 block">Bouton Principal (Teal)</span>
            <button className="btn-primary w-full">
              <span className="material-symbols-outlined text-base">add</span>
              <span>+ Ajouter un employé</span>
            </button>
            <p className="text-[11px] text-slate-400">Action principale de la page (bg: #0F766E, radius: 10px)</p>
          </div>

          {/* Secondary Button */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-500 block">Bouton Secondaire (Blanc + Bordure)</span>
            <button className="btn-secondary w-full">
              <span>Annuler</span>
            </button>
            <p className="text-[11px] text-slate-400">Actions d'annulation ou secondaires (bg: #FFFFFF, border: #E2E8F0)</p>
          </div>

          {/* Danger Button */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-500 block">Bouton Danger (Rouge)</span>
            <button className="btn-danger w-full">
              <span className="material-symbols-outlined text-base">delete</span>
              <span>Supprimer la fiche</span>
            </button>
            <p className="text-[11px] text-slate-400">Réservé uniquement aux actions destructives (#DC2626)</p>
          </div>
        </div>

        {/* Input Fields */}
        <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#172033] mb-1">Champ de Saisie Standard</label>
            <input type="text" placeholder="Entrez une valeur..." className="input-field" defaultValue="Fatine Alaoui" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#172033] mb-1">Menu Déroulant (Select)</label>
            <select className="input-field" defaultValue="CDI">
              <option value="CDI">Contrat CDI</option>
              <option value="CDD">Contrat CDD</option>
              <option value="Stage">Stage</option>
            </select>
          </div>
        </div>
      </section>

      {/* 6. BADGES D'ÉTAT MÉTIER PAR MODULE */}
      <section className="card-saas p-6 space-y-4">
        <h2 className="text-sm font-bold text-[#172033] uppercase tracking-wider border-b border-slate-100 pb-2">
          6. Badges &amp; Statuts Métier par Module
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {/* Congés */}
          <div className="p-3 bg-slate-50 rounded-xl space-y-2 border border-slate-100">
            <span className="font-bold text-slate-700 block">Module Congés</span>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2 py-0.5 rounded-[6px] text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">En attente</span>
              <span className="px-2 py-0.5 rounded-[6px] text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">Acceptée</span>
              <span className="px-2 py-0.5 rounded-[6px] text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">Refusée</span>
            </div>
          </div>

          {/* Absences */}
          <div className="p-3 bg-slate-50 rounded-xl space-y-2 border border-slate-100">
            <span className="font-bold text-slate-700 block">Module Absences</span>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2 py-0.5 rounded-[6px] text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">Justifiée</span>
              <span className="px-2 py-0.5 rounded-[6px] text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">À vérifier</span>
              <span className="px-2 py-0.5 rounded-[6px] text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">Non Justifiée</span>
            </div>
          </div>

          {/* Contrats */}
          <div className="p-3 bg-slate-50 rounded-xl space-y-2 border border-slate-100">
            <span className="font-bold text-slate-700 block">Module Contrats</span>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2 py-0.5 rounded-[6px] text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">Actif</span>
              <span className="px-2 py-0.5 rounded-[6px] text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">À échéance</span>
              <span className="px-2 py-0.5 rounded-[6px] text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">Expiré</span>
            </div>
          </div>

          {/* Documents */}
          <div className="p-3 bg-slate-50 rounded-xl space-y-2 border border-slate-100">
            <span className="font-bold text-slate-700 block">Module Documents</span>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2 py-0.5 rounded-[6px] text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">Disponible</span>
              <span className="px-2 py-0.5 rounded-[6px] text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">Expire bientôt</span>
              <span className="px-2 py-0.5 rounded-[6px] text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">Manquant</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DesignSystemView;
