import React, { useState } from 'react';

const AttendanceView = ({ attendances, onClockIn, onClockOut, theme = 'light' }) => {
  const [showQrModal, setShowQrModal] = useState(false);

  const isDark = theme === 'dark';

  return (
    <div className={`space-y-6 min-h-screen p-6 sm:p-8 lg:p-10 pb-16 transition-colors duration-200 ${
      isDark ? 'bg-[#100817] text-[#F7F1E7]' : 'bg-[#F8F9FA] text-[#1A1A24]'
    }`}>
      {/* Header & Quick Clock-in Widget */}
      <div className={`flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 rounded-2xl border shadow-xs ${
        isDark ? 'bg-[#180D21] border-white/10 text-[#F7F1E7]' : 'bg-white border-[#E5DEC9] text-[#1A1A24]'
      }`}>
        <div>
          <h2 className={`text-2xl sm:text-3xl font-serif font-extrabold tracking-tight ${
            isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'
          }`}>Gestion des Présences & Pointage</h2>
          <p className={`text-xs mt-0.5 ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>
            Suivi des heures d'arrivée, de départ, retards et départs anticipés.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowQrModal(true)}
            className={`px-4 py-2 border font-semibold text-xs rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
              isDark ? 'bg-[#100817] border-white/10 hover:border-[#D9AE3A] text-[#F7F1E7]' : 'bg-[#FAF6F0] border-[#E5DEC9] hover:border-[#D4AF37] text-[#1A1A24]'
            }`}
          >
            <span className={`material-symbols-outlined text-base ${isDark ? 'text-[#D9AE3A]' : 'text-[#D4AF37]'}`}>qr_code_scanner</span>
            <span>Simuler Badge QR / Biométrie</span>
          </button>
          <button
            onClick={onClockIn}
            className={`px-4 py-2 font-extrabold text-xs rounded-xl shadow-xs flex items-center gap-2 transition-all cursor-pointer ${
              isDark ? 'bg-[#D9AE3A] hover:bg-[#E8C65A] text-[#100817]' : 'bg-[#D4AF37] hover:bg-[#c49f27] text-white'
            }`}
          >
            <span className="material-symbols-outlined text-base">login</span>
            <span>ARRIVER (08:55)</span>
          </button>
          <button
            onClick={onClockOut}
            className={`px-4 py-2 font-bold text-xs rounded-xl border flex items-center gap-2 transition-all cursor-pointer ${
              isDark
                ? 'bg-transparent border-white/20 hover:border-[#D9AE3A] text-[#F7F1E7] hover:text-[#D9AE3A]'
                : 'bg-transparent border-slate-300 hover:border-[#D4AF37] text-[#1A1A24] hover:text-[#D4AF37]'
            }`}
          >
            <span className="material-symbols-outlined text-base">logout</span>
            <span>PARTIR (17:30)</span>
          </button>
        </div>
      </div>

      {/* Daily Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className={`p-4 rounded-xl border shadow-xs text-center ${
          isDark ? 'bg-[#180D21] border-white/10' : 'bg-white border-[#E5DEC9]'
        }`}>
          <span className={`text-xs font-semibold uppercase ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>Présents Aujourd'hui</span>
          <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">3 / 4</div>
        </div>
        <div className={`p-4 rounded-xl border shadow-xs text-center ${
          isDark ? 'bg-[#180D21] border-white/10' : 'bg-white border-[#E5DEC9]'
        }`}>
          <span className={`text-xs font-semibold uppercase ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>Retards Détectés</span>
          <div className="text-2xl font-extrabold mt-1 text-amber-600 dark:text-amber-400">1 collaborateur</div>
        </div>
        <div className={`p-4 rounded-xl border shadow-xs text-center ${
          isDark ? 'bg-[#180D21] border-white/10' : 'bg-white border-[#E5DEC9]'
        }`}>
          <span className={`text-xs font-semibold uppercase ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>Taux d'Assiduité</span>
          <div className={`text-2xl font-extrabold mt-1 ${isDark ? 'text-[#D9AE3A]' : 'text-[#D4AF37]'}`}>96.8 %</div>
        </div>
      </div>

      {/* Attendances Table */}
      <div className={`rounded-2xl border shadow-xs overflow-hidden ${
        isDark ? 'bg-[#180D21] border-white/10 text-[#F7F1E7]' : 'bg-white border-[#E5DEC9] text-[#1A1A24]'
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={`border-b text-[11px] font-bold uppercase tracking-wider ${
                isDark ? 'bg-[#100817] border-white/10 text-[#B8A9BD]' : 'bg-[#FAF6F0] border-[#E5DEC9] text-[#6B7280]'
              }`}>
                <th className="p-4">Collaborateur</th>
                <th className="p-4">Date</th>
                <th className="p-4">Heure Arrivée</th>
                <th className="p-4">Heure Départ</th>
                <th className="p-4">Total Heures</th>
                <th className="p-4">Statut</th>
              </tr>
            </thead>
            <tbody className={`divide-y text-xs ${isDark ? 'divide-white/10' : 'divide-[#E5DEC9]'}`}>
              {attendances.map((att) => {
                const empName = att.employee ? `${att.employee.first_name} ${att.employee.last_name}` : 'Collaborateur';

                return (
                  <tr key={att.id} className={`transition-colors ${isDark ? 'hover:bg-[#211027]' : 'hover:bg-[#FAF6F0]'}`}>
                    <td className={`p-4 font-bold ${isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'}`}>{empName}</td>
                    <td className={`p-4 font-mono ${isDark ? 'text-[#D9AE3A]' : 'text-[#D4AF37]'}`}>{att.date}</td>
                    <td className="p-4 font-mono font-bold text-emerald-600 dark:text-emerald-400">{att.check_in || '--:--'}</td>
                    <td className={`p-4 font-mono font-bold ${
                      att.check_out 
                        ? (isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]') 
                        : (isDark ? 'text-[#B8A9BD]/70 italic text-[11px]' : 'text-[#6B7280]/70 italic text-[11px]')
                    }`}>
                      {att.check_out || 'En cours...'}
                    </td>
                    <td className={`p-4 font-extrabold ${isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'}`}>{att.total_hours} h</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        att.is_late 
                          ? (isDark ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' : 'bg-amber-50 text-amber-700 border border-amber-200')
                          : (isDark ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-emerald-50 text-emerald-700 border border-emerald-200')
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
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-xs ${
          isDark ? 'bg-[#100817]/80' : 'bg-black/40'
        }`}>
          <div className={`border rounded-2xl p-6 max-w-sm w-full text-center space-y-4 shadow-2xl ${
            isDark ? 'bg-[#180D21] border-white/10 text-[#F7F1E7]' : 'bg-white border-[#E5DEC9] text-[#1A1A24]'
          }`}>
            <h3 className={`font-bold text-base ${isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'}`}>Pointeuse Biométrique / Scanner QR Code</h3>
            <div className={`p-6 border-2 border-dashed rounded-2xl flex flex-col items-center ${
              isDark ? 'bg-[#100817] border-[#D9AE3A]/40' : 'bg-[#FAF6F0] border-[#D4AF37]/40'
            }`}>
              <span className={`material-symbols-outlined text-6xl animate-pulse ${isDark ? 'text-[#D9AE3A]' : 'text-[#D4AF37]'}`}>qr_code_scanner</span>
              <span className={`text-xs font-semibold mt-2 ${isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'}`}>Scan du badge collaborateur...</span>
              <span className="text-[11px] text-emerald-600 font-bold mt-1">✓ Badge Valide: EMP-0001 (Ahmed Benali)</span>
            </div>
            <button
              onClick={() => setShowQrModal(false)}
              className={`font-extrabold w-full py-2 rounded-xl transition-all cursor-pointer ${
                isDark ? 'bg-[#D9AE3A] hover:bg-[#E8C65A] text-[#100817]' : 'bg-[#D4AF37] hover:bg-[#c49f27] text-white'
              }`}
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
