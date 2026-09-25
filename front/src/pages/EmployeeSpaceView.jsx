import React, { useState, useEffect } from 'react';

const EmployeeSpaceView = ({ onClockIn, onClockOut, onOpenLeaveModal, onOpenRequestModal }) => {
  const [clockState, setClockState] = useState('out'); // 'in' or 'out'
  const [clockInTime, setClockInTime] = useState(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

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
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#172033] to-[#0F766E] p-6 rounded-2xl text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm text-white font-bold text-xl flex items-center justify-center border-2 border-white/30 shrink-0 shadow-md">
            AB
          </div>
          <div>
            <h2 className="text-xl font-bold">Bienvenue, Ahmed Benali !</h2>
            <p className="text-xs text-teal-100 mt-0.5">Lead Développeur Fullstack • Département Informatique & Tech</p>
            <div className="flex items-center gap-2 text-[11px] text-teal-100 font-mono mt-1">
              <span>Matricule: EMP-0001</span> • <span>Contrat CDI</span>
            </div>
          </div>
        </div>

        {/* Quick Pointage Clock Button */}
        <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 text-center min-w-56">
          <span className="text-xs font-medium text-teal-100 uppercase tracking-wider block">Pointage du jour</span>
          <div className="text-2xl font-mono font-extrabold my-1">{formatTimer(elapsedSeconds)}</div>
          {clockState === 'out' ? (
            <button
              onClick={handleClockInClick}
              className="w-full py-2 bg-[#0F766E] hover:bg-[#0d655f] text-white font-bold text-xs rounded-lg shadow-md flex items-center justify-center gap-1 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">login</span>
              <span>MARQUER MON ARRIVÉE</span>
            </button>
          ) : (
            <button
              onClick={handleClockOutClick}
              className="w-full py-2 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs rounded-lg shadow-md flex items-center justify-center gap-1 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">logout</span>
              <span>MARQUER MON DÉPART ({clockInTime})</span>
            </button>
          )}
        </div>
      </div>

      {/* Quick Action Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs text-center flex flex-col items-center">
          <span className="text-xs font-semibold text-slate-400">Solde de Congés</span>
          <span className="text-3xl font-extrabold text-[#0F766E] my-1">16 jours</span>
          <span className="text-xs text-slate-500 mb-3">sur 18 jours acquis</span>
          <button
            onClick={onOpenLeaveModal}
            className="w-full py-2 bg-[#e6f7f4] hover:bg-[#d0f0eb] text-[#0F766E] font-bold text-xs rounded-xl transition-all cursor-pointer"
          >
            Demander un Congé
          </button>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs text-center flex flex-col items-center">
          <span className="text-xs font-semibold text-slate-400">Demandes Administratives</span>
          <span className="text-3xl font-extrabold text-[#0F766E] my-1">1 active</span>
          <span className="text-xs text-slate-500 mb-3">Attestation de travail (Acceptée)</span>
          <button
            onClick={onOpenRequestModal}
            className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer"
          >
            Nouvelle Demande RH
          </button>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs text-center flex flex-col items-center">
          <span className="text-xs font-semibold text-slate-400">Mes Documents RH</span>
          <span className="text-3xl font-extrabold text-slate-700 my-1">2 fichiers</span>
          <span className="text-xs text-slate-500 mb-3">CIN, Contrat CDI signé</span>
          <span className="text-xs font-bold text-[#0F766E]">Disponibles au téléchargement</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs text-center flex flex-col items-center justify-between">
          <span className="text-xs font-semibold text-slate-400">Horaires & Présence</span>
          <span className="text-xs font-bold text-slate-800 my-1">09:00 - 17:30</span>
          <span className="text-xs text-[#0F766E] font-semibold mb-2">98.5% Taux d'assiduité</span>
          <div className="text-[10px] text-slate-400">Conforme à la charte d'entreprise</div>
        </div>
      </div>

      {/* Contract & Personal Summary Card */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-xs space-y-4">
        <h3 className="font-bold text-base text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
          <span className="material-symbols-outlined text-[#0F766E]">badge</span>
          <span>Détails de mon Contrat & Fiche RH</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div>
            <span className="text-slate-400 font-medium block">Type de contrat</span>
            <span className="font-bold text-slate-900 text-sm mt-0.5 block">Contrat à Durée Indéterminée (CDI)</span>
          </div>
          <div>
            <span className="text-slate-400 font-medium block">Date de prise de poste</span>
            <span className="font-semibold text-slate-800 mt-0.5 block">15 Mars 2021 (3 ans d'ancienneté)</span>
          </div>
          <div>
            <span className="text-slate-400 font-medium block">Responsable hiérarchique</span>
            <span className="font-semibold text-slate-800 mt-0.5 block">Direction Générale / Fatine Alaoui</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(EmployeeSpaceView);
