import React from 'react';

const DesignSystemView = ({ theme = 'light' }) => {
  const isDark = theme === 'dark';

  return (
    <div className={`space-y-8 max-w-6xl mx-auto pb-16 animate-fade-in select-none p-6 sm:p-8 rounded-2xl border transition-colors duration-200 ${
      isDark ? 'bg-[#100817] text-[#F7F1E7] border-white/10' : 'bg-[#F8F9FA] text-[#1A1A24] border-slate-200'
    }`}>
      {/* Header */}
      <div className={`p-6 rounded-2xl border shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 ${
        isDark ? 'bg-[#180D21] border-white/10' : 'bg-white border-slate-200'
      }`}>
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-1">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37]"></span>
            <span>Design System Dual-Theme</span>
          </div>
          <h1 className={`text-2xl font-serif font-extrabold tracking-tight ${isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'}`}>
            Design System — Amsoft People
          </h1>
          <p className={`text-xs mt-1 ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>
            Spécification UI/UX officielle : Dual Mode (Light Mode par défaut `#F8F9FA` &amp; Dark Mode `#0B0B0F`), Or Champagne (#D4AF37) &amp; Page Connexion Beige fixe.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className={`px-3 py-1.5 font-bold text-xs rounded-xl border ${
            isDark ? 'bg-[#211027] text-[#D4AF37] border-[#D4AF37]/40' : 'bg-[#FFFDF9] text-[#D4AF37] border-[#D4AF37]/40'
          }`}>
            Mode Actuel : {isDark ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </span>
        </div>
      </div>

      {/* 1. PALETTE DE COULEURS LIGHT MODE */}
      <section className="space-y-4">
        <div className={`border-b pb-2 ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
          <h2 className={`text-sm font-serif font-bold uppercase tracking-wider ${isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'}`}>
            1. Palette Light Mode (Par Défaut)
          </h2>
          <p className={`text-xs ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>
            Couleurs officielles du Dashboard en Mode Clair.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className={`p-4 rounded-2xl border space-y-3 ${isDark ? 'bg-[#180D21] border-white/10' : 'bg-white border-slate-200'}`}>
            <div className="h-16 rounded-xl bg-[#F8F9FA] border border-slate-200 flex items-end p-2.5 text-[#1A1A24] font-mono text-xs font-bold shadow-xs">
              #F8F9FA
            </div>
            <div>
              <div className={`font-bold text-xs ${isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'}`}>Fond Principal Canvas</div>
              <div className={`text-[11px] ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>Gris très clair</div>
            </div>
          </div>

          <div className={`p-4 rounded-2xl border space-y-3 ${isDark ? 'bg-[#180D21] border-white/10' : 'bg-white border-slate-200'}`}>
            <div className="h-16 rounded-xl bg-[#FFFFFF] border border-slate-200 flex items-end p-2.5 text-[#1A1A24] font-mono text-xs font-bold shadow-xs">
              #FFFFFF
            </div>
            <div>
              <div className={`font-bold text-xs ${isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'}`}>Fond des Cartes</div>
              <div className={`text-[11px] ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>Blanc pur avec ombre subtile</div>
            </div>
          </div>

          <div className={`p-4 rounded-2xl border space-y-3 ${isDark ? 'bg-[#180D21] border-white/10' : 'bg-white border-slate-200'}`}>
            <div className="h-16 rounded-xl bg-[#D4AF37] flex items-end p-2.5 text-[#1A1A24] font-mono text-xs font-extrabold shadow-xs">
              #D4AF37
            </div>
            <div>
              <div className={`font-bold text-xs ${isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'}`}>Accents / Boutons</div>
              <div className={`text-[11px] ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>Jaune / Doré Premium</div>
            </div>
          </div>

          <div className={`p-4 rounded-2xl border space-y-3 ${isDark ? 'bg-[#180D21] border-white/10' : 'bg-white border-slate-200'}`}>
            <div className="h-16 rounded-xl bg-[#1A1A24] flex items-end p-2.5 text-white font-mono text-xs font-bold shadow-xs">
              #1A1A24
            </div>
            <div>
              <div className={`font-bold text-xs ${isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'}`}>Texte Principal</div>
              <div className={`text-[11px] ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>Noir / Gris très foncé</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PALETTE DE COULEURS DARK MODE */}
      <section className="space-y-4">
        <div className={`border-b pb-2 ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
          <h2 className={`text-sm font-serif font-bold uppercase tracking-wider ${isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'}`}>
            2. Palette Dark Mode (Optionnel)
          </h2>
          <p className={`text-xs ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>
            Couleurs officielles du Dashboard en Mode Sombre.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className={`p-4 rounded-2xl border space-y-3 ${isDark ? 'bg-[#180D21] border-white/10' : 'bg-white border-slate-200'}`}>
            <div className="h-16 rounded-xl bg-[#0B0B0F] border border-white/10 flex items-end p-2.5 text-white font-mono text-xs font-bold shadow-xs">
              #0B0B0F
            </div>
            <div>
              <div className={`font-bold text-xs ${isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'}`}>Fond Principal Dark</div>
              <div className={`text-[11px] ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>Noir profond</div>
            </div>
          </div>

          <div className={`p-4 rounded-2xl border space-y-3 ${isDark ? 'bg-[#180D21] border-white/10' : 'bg-white border-slate-200'}`}>
            <div className="h-16 rounded-xl bg-[#1A1A24] border border-white/10 flex items-end p-2.5 text-white font-mono text-xs font-bold shadow-xs">
              #1A1A24
            </div>
            <div>
              <div className={`font-bold text-xs ${isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'}`}>Fond Cartes Dark</div>
              <div className={`text-[11px] ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>Gris foncé avec bordure fine</div>
            </div>
          </div>

          <div className={`p-4 rounded-2xl border space-y-3 ${isDark ? 'bg-[#180D21] border-white/10' : 'bg-white border-slate-200'}`}>
            <div className="h-16 rounded-xl bg-[#D4AF37] flex items-end p-2.5 text-[#1A1A24] font-mono text-xs font-extrabold shadow-xs">
              #D4AF37
            </div>
            <div>
              <div className={`font-bold text-xs ${isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'}`}>Accents Dorés</div>
              <div className={`text-[11px] ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>Identité Amsoft Or Champagne</div>
            </div>
          </div>

          <div className={`p-4 rounded-2xl border space-y-3 ${isDark ? 'bg-[#180D21] border-white/10' : 'bg-white border-slate-200'}`}>
            <div className="h-16 rounded-xl bg-[#FFFFFF] flex items-end p-2.5 text-[#1A1A24] font-mono text-xs font-bold shadow-xs">
              #FFFFFF
            </div>
            <div>
              <div className={`font-bold text-xs ${isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'}`}>Texte Principal Dark</div>
              <div className={`text-[11px] ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>Blanc pur</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BOUTONS & ELEMENTS GRAPHILQUES */}
      <section className="space-y-4">
        <div className={`border-b pb-2 ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
          <h2 className={`text-sm font-serif font-bold uppercase tracking-wider ${isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'}`}>
            3. Composants Interactifs
          </h2>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <button className="bg-[#D4AF37] hover:bg-[#b8952b] text-[#1A1A24] text-xs font-extrabold px-5 py-2.5 rounded-xl shadow-xs cursor-pointer">
            Bouton Principal (Doré #D4AF37)
          </button>
          <button className={`border text-xs font-bold px-5 py-2.5 rounded-xl cursor-pointer ${
            isDark ? 'bg-[#180D21] border-white/10 text-[#F7F1E7] hover:border-[#D4AF37]' : 'bg-white border-slate-200 text-[#1A1A24] hover:border-[#D4AF37]'
          }`}>
            Bouton Secondaire (Outlined)
          </button>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            Badge Statut Actif
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30">
            Badge En attente
          </span>
        </div>
      </section>
    </div>
  );
};

export default DesignSystemView;
