import React, { useState } from 'react';

const AttendanceView = ({ attendances, onClockIn, onClockOut }) => {
  const [showQrModal, setShowQrModal] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header & Quick Clock-in Widget */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 rounded-2xl border border-slate-100 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Gestion des Présences & Pointage</h2>
          <p className="text-xs text-slate-500 mt-0.5">Suivi des heures d'arrivée, de départ, retards et départs anticipés.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowQrModal(true)}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl flex items-center gap-2 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">qr_code_scanner</span>
            <span>Simuler Badge QR / Biométrie</span>
          </button>
          <button
            onClick={onClockIn}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-2 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">login</span>
            <span>ARRIVER (08:55)</span>
          </button>
          <button
            onClick={onClockOut}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-2 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">logout</span>
            <span>PARTIR (17:30)</span>
          </button>
        </div>
      </div>

      {/* Daily Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs text-center">
          <span className="text-xs text-slate-400 font-semibold uppercase">Présents Aujourd'hui</span>
          <div className="text-2xl font-extrabold text-emerald-600 mt-1">3 / 4</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs text-center">
          <span className="text-xs text-slate-400 font-semibold uppercase">Retards Détectés</span>
          <div className="text-2xl font-extrabold text-amber-600 mt-1">1 collaborateur</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs text-center">
          <span className="text-xs text-slate-400 font-semibold uppercase">Taux d'Assiduité</span>
          <div className="text-2xl font-extrabold text-[#0F766E] mt-1">96.8 %</div>
        </div>
      </div>

      {/* Attendances Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="p-4">Collaborateur</th>
                <th className="p-4">Date</th>
                <th className="p-4">Heure Arrivée</th>
                <th className="p-4">Heure Départ</th>
                <th className="p-4">Total Heures</th>
                <th className="p-4">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {attendances.map((att) => {
                const empName = att.employee ? `${att.employee.first_name} ${att.employee.last_name}` : 'Collaborateur';

                return (
                  <tr key={att.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 font-bold text-slate-900">{empName}</td>
                    <td className="p-4 font-mono">{att.date}</td>
                    <td className="p-4 font-bold text-emerald-600">{att.check_in || '--:--'}</td>
                    <td className="p-4 font-bold text-rose-600">{att.check_out || 'En cours...'}</td>
                    <td className="p-4 font-extrabold text-slate-900">{att.total_hours} h</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        att.is_late ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}>
                        {att.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* QR Code / Biometrics Simulation Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center space-y-4 shadow-2xl">
            <h3 className="font-bold text-base text-slate-900">Pointeuse Biométrique / Scanner QR Code</h3>
            <div className="p-6 bg-slate-50 border-2 border-dashed border-[#0F766E]/40 rounded-2xl flex flex-col items-center">
              <span className="material-symbols-outlined text-6xl text-[#0F766E] animate-pulse">qr_code_scanner</span>
              <span className="text-xs font-semibold text-slate-700 mt-2">Scan du badge collaborateur...</span>
              <span className="text-[11px] text-emerald-600 font-bold mt-1">✓ Badge Valide: EMP-0001 (Ahmed Benali)</span>
            </div>
            <button
              onClick={() => setShowQrModal(false)}
              className="btn-primary w-full py-2"
            >
              Fermer le Simulateur
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceView;
