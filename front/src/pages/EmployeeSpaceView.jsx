import React, { useState, useEffect } from 'react';

const EmployeeSpaceView = ({ onClockIn, onClockOut, onOpenLeaveModal, onOpenRequestModal, theme = 'light' }) => {
  const [clockState, setClockState] = useState('out'); // 'in' or 'out'
  const [clockInTime, setClockInTime] = useState(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const isDark = theme === 'dark';

  useEffect(() => {
    let timer;
    if (clockState === 'in') {
      timer = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [clockState]);

  const handleClockInClick = () => {
    setClockState('in');
    setClockInTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    onClockIn();
  };

  const handleClockOutClick = () => {
    setClockState('out');
    onClockOut();
  };

  const formatTimer = (sec) => {
    const hrs = String(Math.floor(sec / 3600)).padStart(2, '0');
    const mins = String(Math.floor((sec % 3600) / 60)).padStart(2, '0');
    const secs = String(sec % 60).padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  return (
    <div className={`space-y-6 min-h-screen p-6 sm:p-8 lg:p-10 pb-16 transition-colors duration-200 ${
      isDark ? 'bg-[#100817] text-[#F7F1E7]' : 'bg-[#F8F9FA] text-[#1A1A24]'
    }`}>
      {/* Welcome Banner */}
      <div className={`border p-6 rounded-2xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 ${
        isDark ? 'bg-[#180D21] border-white/10 text-[#F7F1E7]' : 'bg-white border-[#E5DEC9] text-[#1A1A24]'
      }`}>
        <div className="flex items-center gap-4">
          <div className={`w-16 h-16 rounded-full font-extrabold text-xl flex items-center justify-center shrink-0 shadow-md border-2 ${
            isDark ? 'bg-[#211027] border-[#D9AE3A] text-[#E8C65A]' : 'bg-[#FAF6F0] border-[#D4AF37] text-[#D4AF37]'
          }`}>
            AB
          </div>
          <div>
            <h2 className="text-xl font-serif font-bold">Bienvenue, Ahmed Benali !</h2>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>Lead Développeur Fullstack • Département Informatique & Tech</p>
            <div className={`flex items-center gap-2 text-[11px] font-mono mt-1 ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>
              <span>Matricule: EMP-0001</span> • <span className={isDark ? 'text-[#D9AE3A]' : 'text-[#D4AF37]'}>Contrat CDI</span>
            </div>
          </div>
        </div>

        {/* Quick Pointage Clock Button */}
        <div className={`p-4 rounded-xl border text-center min-w-56 ${
          isDark ? 'bg-[#100817] border-white/10' : 'bg-[#FAF6F0] border-[#E5DEC9]'
        }`}>
          <span className={`text-xs font-semibold uppercase tracking-wider block ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>Pointage du jour</span>
          <div className={`text-2xl font-mono font-extrabold my-1 ${isDark ? 'text-[#D9AE3A]' : 'text-[#D4AF37]'}`}>{formatTimer(elapsedSeconds)}</div>
          {clockState === 'out' ? (
            <button
              onClick={handleClockInClick}
              className={`w-full py-2 font-extrabold text-xs rounded-lg shadow-md flex items-center justify-center gap-1 transition-all cursor-pointer ${
                isDark ? 'bg-[#D9AE3A] hover:bg-[#E8C65A] text-[#100817]' : 'bg-[#D4AF37] hover:bg-[#b8952b] text-[#1A1A24]'
              }`}
            >
              <span className="material-symbols-outlined text-base">login</span>
              <span>MARQUER MON ARRIVÉE</span>
            </button>
          ) : (
            <button
              onClick={handleClockOutClick}
              className={`w-full py-2 font-extrabold text-xs rounded-lg shadow-md flex items-center justify-center gap-1 transition-all cursor-pointer ${
                isDark ? 'bg-[#D9AE3A] hover:bg-[#E8C65A] text-[#100817]' : 'bg-[#D4AF37] hover:bg-[#b8952b] text-[#1A1A24]'
              }`}
            >
              <span className="material-symbols-outlined text-base">logout</span>
              <span>MARQUER MON DÉPART ({clockInTime || '12:23 AM'})</span>
            </button>
          )}
        </div>
      </div>

      {/* Quick Action Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`p-5 rounded-2xl border shadow-xs text-center flex flex-col items-center ${
          isDark ? 'bg-[#180D21] border-white/10' : 'bg-white border-[#E5DEC9]'
        }`}>
          <span className={`text-xs font-semibold ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>Solde de Congés</span>
          <span className={`text-3xl font-extrabold my-1 ${isDark ? 'text-[#D9AE3A]' : 'text-[#D4AF37]'}`}>16 jours</span>
          <span className={`text-xs mb-3 ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>sur 18 jours acquis</span>
          <button
            onClick={onOpenLeaveModal}
            className={`w-full py-2 font-extrabold text-xs rounded-xl transition-all cursor-pointer shadow-xs ${
              isDark ? 'bg-[#D9AE3A] hover:bg-[#E8C65A] text-[#100817]' : 'bg-[#D4AF37] hover:bg-[#b8952b] text-[#1A1A24]'
            }`}
          >
            Demander un Congé
          </button>
        </div>

        <div className={`p-5 rounded-2xl border shadow-xs text-center flex flex-col items-center ${
          isDark ? 'bg-[#180D21] border-white/10' : 'bg-white border-[#E5DEC9]'
        }`}>
          <span className={`text-xs font-semibold ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>Demandes Administratives</span>
          <span className={`text-3xl font-extrabold my-1 ${isDark ? 'text-[#D9AE3A]' : 'text-[#D4AF37]'}`}>1 active</span>
          <span className={`text-xs mb-3 ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>Attestation de travail (Acceptée)</span>
          <button
            onClick={onOpenRequestModal}
            className={`w-full py-2 font-bold text-xs rounded-xl transition-all cursor-pointer border ${
              isDark ? 'bg-[#211027] border-white/10 hover:border-[#D9AE3A] text-[#F7F1E7]' : 'bg-[#FAF6F0] border-[#E5DEC9] hover:border-[#D4AF37] text-[#1A1A24]'
            }`}
          >
            Nouvelle Demande RH
          </button>
        </div>

        <div className={`p-5 rounded-2xl border shadow-xs text-center flex flex-col items-center ${
          isDark ? 'bg-[#180D21] border-white/10' : 'bg-white border-[#E5DEC9]'
        }`}>
          <span className={`text-xs font-semibold ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>Mes Documents RH</span>
          <span className={`text-3xl font-extrabold my-1 ${isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'}`}>2 fichiers</span>
          <span className={`text-xs mb-3 ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>CIN, Contrat CDI signé</span>
          <span className={`text-xs font-bold ${isDark ? 'text-[#D9AE3A]' : 'text-[#D4AF37]'}`}>Disponibles au téléchargement</span>
        </div>

        <div className={`p-5 rounded-2xl border shadow-xs text-center flex flex-col items-center justify-between ${
          isDark ? 'bg-[#180D21] border-white/10' : 'bg-white border-[#E5DEC9]'
        }`}>
          <span className={`text-xs font-semibold ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>Horaires & Présence</span>
          <span className={`text-xs font-bold my-1 ${isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'}`}>09:00 - 17:30</span>
          <span className={`text-xs font-semibold mb-2 ${isDark ? 'text-[#D9AE3A]' : 'text-[#D4AF37]'}`}>98.5% Taux d'assiduité</span>
          <div className={`text-[10px] ${isDark ? 'text-[#B8A9BD]/70' : 'text-[#6B7280]'}`}>Conforme à la charte d'entreprise</div>
        </div>
      </div>

      {/* Contract & Personal Summary Card */}
      <div className={`rounded-2xl border p-6 shadow-xs space-y-4 ${
        isDark ? 'bg-[#180D21] border-white/10 text-[#F7F1E7]' : 'bg-white border-[#E5DEC9] text-[#1A1A24]'
      }`}>
        <h3 className={`font-bold text-base border-b pb-3 flex items-center gap-2 font-serif ${
          isDark ? 'border-white/10 text-[#F7F1E7]' : 'border-[#E5DEC9] text-[#1A1A24]'
        }`}>
          <span className={`material-symbols-outlined ${isDark ? 'text-[#D9AE3A]' : 'text-[#D4AF37]'}`}>badge</span>
          <span>Détails de mon Contrat & Fiche RH</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div>
            <span className={`font-medium block ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>Type de contrat</span>
            <span className={`font-bold text-sm mt-0.5 block ${isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'}`}>Contrat à Durée Indéterminée (CDI)</span>
          </div>
          <div>
            <span className={`font-medium block ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>Date de prise de poste</span>
            <span className={`font-semibold mt-0.5 block ${isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'}`}>15 Mars 2021 (3 ans d'ancienneté)</span>
          </div>
          <div>
            <span className={`font-medium block ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>Responsable hiérarchique</span>
            <span className={`font-semibold mt-0.5 block ${isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'}`}>Direction Générale / Fatine Alaoui</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(EmployeeSpaceView);
