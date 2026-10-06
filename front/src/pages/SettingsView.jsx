import React from 'react';

const SettingsView = ({ theme = 'light' }) => {
  const isDark = theme === 'dark';

  return (
    <div className={`space-y-6 min-h-screen p-6 sm:p-8 lg:p-10 pb-16 transition-colors duration-200 ${
      isDark ? 'bg-[#100817] text-[#F7F1E7]' : 'bg-[#F8F9FA] text-[#1A1A24]'
    }`}>
      <div className={`border-b pb-5 ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
        <h2 className={`text-2xl sm:text-3xl font-serif font-extrabold tracking-tight ${isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'}`}>
          Paramètres du Système RH
        </h2>
        <p className={`text-xs mt-0.5 ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>
          Configuration générale, seuils d'alertes et types de congés.
        </p>
      </div>

      <div className={`rounded-2xl border p-6 shadow-xs space-y-6 text-xs ${
        isDark ? 'bg-[#180D21] border-white/10 text-[#F7F1E7]' : 'bg-white border-slate-200 text-[#1A1A24]'
      }`}>
        <div>
          <h3 className={`font-serif font-bold text-sm mb-3 border-b pb-2 ${
            isDark ? 'text-[#F7F1E7] border-white/10' : 'text-[#1A1A24] border-slate-200'
          }`}>
            Informations Générales de l'Entreprise
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`font-semibold block mb-1 ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>Nom de l'Entreprise</label>
              <input type="text" defaultValue="AMSOFT Enterprise Tech" className={`w-full p-2 border outline-none rounded-lg focus:border-[#D4AF37] ${
                isDark ? 'bg-[#100817] border-white/10 text-[#F7F1E7]' : 'bg-[#F8F9FA] border-slate-200 text-[#1A1A24]'
              }`} />
            </div>
            <div>
              <label className={`font-semibold block mb-1 ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>Email de Notification RH</label>
              <input type="email" defaultValue="rh@amsoft.ma" className={`w-full p-2 border outline-none rounded-lg focus:border-[#D4AF37] ${
                isDark ? 'bg-[#100817] border-white/10 text-[#F7F1E7]' : 'bg-[#F8F9FA] border-slate-200 text-[#1A1A24]'
              }`} />
            </div>
          </div>
        </div>

        <div>
          <h3 className={`font-serif font-bold text-sm mb-3 border-b pb-2 ${
            isDark ? 'text-[#F7F1E7] border-white/10' : 'text-[#1A1A24] border-slate-200'
          }`}>
            Règles des Congés &amp; Horaires
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={`font-semibold block mb-1 ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>Solde Annuel Légale (Jours)</label>
              <input type="number" defaultValue="18" className={`w-full p-2 border outline-none rounded-lg focus:border-[#D4AF37] ${
                isDark ? 'bg-[#100817] border-white/10 text-[#F7F1E7]' : 'bg-[#F8F9FA] border-slate-200 text-[#1A1A24]'
              }`} />
            </div>
            <div>
              <label className={`font-semibold block mb-1 ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>Heure de Début de Journée</label>
              <input type="time" defaultValue="09:00" className={`w-full p-2 border outline-none rounded-lg focus:border-[#D4AF37] ${
                isDark ? 'bg-[#100817] border-white/10 text-[#F7F1E7]' : 'bg-[#F8F9FA] border-slate-200 text-[#1A1A24]'
              }`} />
            </div>
            <div>
              <label className={`font-semibold block mb-1 ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>Heure de Fin de Journée</label>
              <input type="time" defaultValue="17:30" className={`w-full p-2 border outline-none rounded-lg focus:border-[#D4AF37] ${
                isDark ? 'bg-[#100817] border-white/10 text-[#F7F1E7]' : 'bg-[#F8F9FA] border-slate-200 text-[#1A1A24]'
              }`} />
            </div>
          </div>
        </div>

        <div>
          <h3 className={`font-serif font-bold text-sm mb-3 border-b pb-2 ${
            isDark ? 'text-[#F7F1E7] border-white/10' : 'text-[#1A1A24] border-slate-200'
          }`}>
            Alertes Automatiques
          </h3>
          <div className={`space-y-2 ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded accent-[#D4AF37]" />
              <span>Alerter par notification pour les contrats expirant dans moins de 30 jours</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded accent-[#D4AF37]" />
              <span>Envoyer une notification lorsqu'une nouvelle demande de congé est soumise</span>
            </label>
          </div>
        </div>

        <button className="bg-[#D4AF37] hover:bg-[#b8952b] text-[#1A1A24] font-extrabold px-5 py-2.5 rounded-xl transition-all cursor-pointer shadow-sm">
          Enregistrer les Paramètres
        </button>
      </div>
    </div>
  );
};

export default SettingsView;
