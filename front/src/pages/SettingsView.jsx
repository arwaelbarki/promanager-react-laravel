import React from 'react';

const SettingsView = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Paramètres du Système RH</h2>
        <p className="text-xs text-slate-500 mt-0.5">Configuration générale, seuils d'alertes et types de congés.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-xs space-y-6 text-xs text-slate-700">
        <div>
          <h3 className="font-bold text-sm text-slate-900 mb-3 border-b border-slate-100 pb-2">Informations Générales de l'Entreprise</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold block mb-1">Nom de l'Entreprise</label>
              <input type="text" defaultValue="AMSOFT Enterprise Tech" className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg" />
            </div>
            <div>
              <label className="font-semibold block mb-1">Email de Notification RH</label>
              <input type="email" defaultValue="rh@amsoft.ma" className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg" />
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-sm text-slate-900 mb-3 border-b border-slate-100 pb-2">Règles des Congés & Horaires</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="font-semibold block mb-1">Solde Annuel Légale (Jours)</label>
              <input type="number" defaultValue="18" className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg" />
            </div>
            <div>
              <label className="font-semibold block mb-1">Heure de Début de Journée</label>
              <input type="time" defaultValue="09:00" className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg" />
            </div>
            <div>
              <label className="font-semibold block mb-1">Heure de Fin de Journée</label>
              <input type="time" defaultValue="17:30" className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg" />
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-sm text-slate-900 mb-3 border-b border-slate-100 pb-2">Alertes Automatiques</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="rounded accent-[#0F766E]" />
              <span>Alerter par notification pour les contrats expirant dans moins de 30 jours</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="rounded accent-[#0F766E]" />
              <span>Envoyer une notification lorsqu'une nouvelle demande de congé est soumise</span>
            </label>
          </div>
        </div>

        <button className="btn-primary">
          Enregistrer les Paramètres
        </button>
      </div>
    </div>
  );
};

export default SettingsView;
