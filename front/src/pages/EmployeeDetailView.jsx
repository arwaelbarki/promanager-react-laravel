import React, { useState } from 'react';

const EmployeeDetailView = ({ employee, onBack, onEditEmployee, theme = 'light' }) => {
  const [activeTab, setActiveTab] = useState('personal');

  const isDark = theme === 'dark';

  if (!employee) return <div className={`p-8 text-center ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>Employé non trouvé</div>;

  const leaveBalance = employee.leave_balance || { initial_balance: 18, acquired_days: 18, consumed_days: 2, remaining_days: 16 };

  return (
    <div className={`space-y-6 min-h-screen p-6 sm:p-8 lg:p-10 pb-16 transition-colors duration-200 ${
      isDark ? 'bg-[#100817] text-[#F7F1E7]' : 'bg-[#F8F9FA] text-[#1A1A24]'
    }`}>
      {/* Top Navigation Back Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold border rounded-xl transition-all cursor-pointer ${
            isDark 
              ? 'text-[#B8A9BD] hover:text-[#F7F1E7] bg-[#180D21] border-white/10 hover:border-[#D9AE3A]' 
              : 'text-[#6B7280] hover:text-[#1A1A24] bg-white border-[#E5DEC9] hover:border-[#D4AF37]'
          }`}
        >
          <span className={`material-symbols-outlined text-sm ${isDark ? 'text-[#D9AE3A]' : 'text-[#D4AF37]'}`}>arrow_back</span>
          <span>Retour à la liste des employés</span>
        </button>
        <span className={`text-xs font-mono ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>Fiche Collaborateur : {employee.matricule}</span>
      </div>

      {/* Hero Profile Banner */}
      <div className={`rounded-2xl border p-6 shadow-xs flex flex-col md:flex-row items-center md:items-start justify-between gap-6 ${
        isDark ? 'bg-[#180D21] border-white/10' : 'bg-white border-[#E5DEC9]'
      }`}>
        <div className="flex flex-col md:flex-row items-center gap-5">
          {employee.photo_url ? (
            <img
              src={employee.photo_url}
              alt={`${employee.first_name} ${employee.last_name}`}
              width={96}
              height={96}
              loading="lazy"
              decoding="async"
              className={`w-24 h-24 rounded-full object-cover border-4 shadow-md ${
                isDark ? 'border-[#D9AE3A]/30' : 'border-[#D4AF37]/40'
              }`}
            />
          ) : (
            <div className={`w-24 h-24 rounded-full font-extrabold text-2xl flex items-center justify-center border-4 shrink-0 shadow-sm ${
              isDark 
                ? 'bg-[#211027] text-[#E8C65A] border-[#D9AE3A]/30' 
                : 'bg-[#FAF6F0] text-[#D4AF37] border-[#D4AF37]/40'
            }`}>
              {employee.first_name?.[0]}{employee.last_name?.[0]}
            </div>
          )}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 flex-wrap">
              <h2 className={`text-xl font-bold ${isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'}`}>{employee.first_name} {employee.last_name}</h2>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-0.5 rounded-full text-xs font-bold ${
                  employee.status === 'Actif' ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20' :
                  employee.status === 'En congé' ? isDark ? 'bg-[#D9AE3A]/10 text-[#E8C65A] border border-[#D9AE3A]/30' : 'bg-[#FEF7E0] text-[#B06000] border border-[#D4AF37]/30' :
                  employee.status === 'Suspendu' ? 'bg-rose-500/10 text-rose-600 border border-rose-500/20' :
                  isDark ? 'bg-white/5 text-[#B8A9BD] border border-white/10' : 'bg-slate-100 text-[#6B7280] border border-[#E5DEC9]'
                }`}>
                  {employee.status}
                </span>

                {/* Quick Status Selector */}
                <select
                  value={employee.status}
                  onChange={(e) => onEditEmployee && onEditEmployee({ ...employee, status: e.target.value }, true)}
                  title="Changer le statut de l'employé"
                  className={`px-2 py-0.5 border rounded-lg text-[11px] font-semibold focus:outline-hidden cursor-pointer ${
                    isDark ? 'bg-[#100817] border-white/10 text-[#F7F1E7]' : 'bg-[#FAF6F0] border-[#E5DEC9] text-[#1A1A24]'
                  }`}
                >
                  <option value="Actif">Actif</option>
                  <option value="En congé">En congé</option>
                  <option value="Suspendu">Suspendu</option>
                  <option value="Démissionnaire">Démissionnaire</option>
                  <option value="Licencié">Licencié</option>
                  <option value="Retraité">Retraité</option>
                </select>
              </div>
            </div>
            <p className={`text-xs font-medium mt-1 ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>
              {employee.position?.title || 'Lead Développeur'} • {employee.department?.name || 'Informatique & Tech'}
            </p>
            <div className={`flex items-center justify-center md:justify-start gap-4 text-xs mt-3 font-mono ${
              isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'
            }`}>
              <span>Matricule: <strong className={isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'}>{employee.matricule}</strong></span>
              <span>•</span>
              <span>CIN: <strong className={isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'}>{employee.cin || 'BE892102'}</strong></span>
              <span>•</span>
              <span>Email: <strong className={isDark ? 'text-[#D9AE3A]' : 'text-[#D4AF37]'}>{employee.email}</strong></span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onEditEmployee && onEditEmployee(employee)}
            className={`text-xs font-extrabold px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-md ${
              isDark ? 'bg-[#D9AE3A] hover:bg-[#E8C65A] text-[#100817]' : 'bg-[#D4AF37] hover:bg-[#c49f27] text-white'
            }`}
          >
            <span className="material-symbols-outlined text-sm">edit</span>
            <span>Modifier la fiche</span>
          </button>
        </div>
      </div>

      {/* Detail Tabs Header */}
      <div className={`rounded-2xl border p-2 shadow-xs flex items-center gap-1 overflow-x-auto ${
        isDark ? 'bg-[#180D21] border-white/10' : 'bg-white border-[#E5DEC9]'
      }`}>
        {[
          { id: 'personal', label: 'Infos Personnelles', icon: 'person' },
          { id: 'professional', label: 'Infos Professionnelles', icon: 'work' },
          { id: 'contracts', label: 'Contrats & Historique', icon: 'badge' },
          { id: 'leaves', label: 'Congés & Solde', icon: 'beach_access' },
          { id: 'absences', label: 'Absences', icon: 'event_busy' },
          { id: 'attendance', label: 'Présences', icon: 'schedule' },
          { id: 'documents', label: 'Documents', icon: 'folder_open' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === tab.id
                ? isDark ? 'bg-[#D9AE3A] text-[#100817] font-extrabold shadow-xs' : 'bg-[#D4AF37] text-white font-extrabold shadow-xs'
                : isDark ? 'text-[#B8A9BD] hover:bg-white/5 hover:text-[#F7F1E7]' : 'text-[#6B7280] hover:bg-slate-50 hover:text-[#1A1A24]'
            }`}
          >
            <span className="material-symbols-outlined text-base">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className={`rounded-2xl border p-6 shadow-xs ${
        isDark ? 'bg-[#180D21] border-white/10 text-[#F7F1E7]' : 'bg-white border-[#E5DEC9] text-[#1A1A24]'
      }`}>
        {/* Tab 1: Personal Info */}
        {activeTab === 'personal' && (
          <div className="space-y-6">
            <h3 className={`font-bold text-base border-b pb-3 font-serif ${isDark ? 'border-white/10 text-[#F7F1E7]' : 'border-[#E5DEC9] text-[#1A1A24]'}`}>Informations Personnelles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
              <div>
                <span className={`font-medium block ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>Nom complet</span>
                <span className={`font-bold text-sm mt-0.5 block ${isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'}`}>{employee.first_name} {employee.last_name}</span>
              </div>
              <div>
                <span className={`font-medium block ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>Date de naissance</span>
                <span className={`font-semibold mt-0.5 block ${isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'}`}>{employee.birth_date || '14/05/1990'}</span>
              </div>
              <div>
                <span className={`font-medium block ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>Genre</span>
                <span className={`font-semibold mt-0.5 block ${isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'}`}>{employee.gender === 'M' ? 'Masculin' : 'Féminin'}</span>
              </div>
              <div>
                <span className={`font-medium block ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>Numéro CIN</span>
                <span className={`font-bold font-mono mt-0.5 block ${isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'}`}>{employee.cin || 'BE892102'}</span>
              </div>
              <div>
                <span className={`font-medium block ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>Téléphone personnel</span>
                <span className={`font-semibold mt-0.5 block ${isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'}`}>{employee.phone || '+212 661 23 45 67'}</span>
              </div>
              <div>
                <span className={`font-medium block ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>Adresse email</span>
                <span className={`font-semibold mt-0.5 block ${isDark ? 'text-[#D9AE3A]' : 'text-[#D4AF37]'}`}>{employee.email}</span>
              </div>
              <div className="md:col-span-2">
                <span className={`font-medium block ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>Adresse résidentielle</span>
                <span className={`font-semibold mt-0.5 block ${isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'}`}>{employee.address || 'Boulevard Zerktouni, Résidence Al Amal'}, {employee.city}</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Professional Info */}
        {activeTab === 'professional' && (
          <div className="space-y-6">
            <h3 className={`font-bold text-base border-b pb-3 font-serif ${isDark ? 'border-white/10 text-[#F7F1E7]' : 'border-[#E5DEC9] text-[#1A1A24]'}`}>Informations Professionnelles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
              <div>
                <span className={`font-medium block ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>Département</span>
                <span className={`font-bold text-sm mt-0.5 block ${isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'}`}>{employee.department?.name || 'Informatique & Tech'}</span>
              </div>
              <div>
                <span className={`font-medium block ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>Intitulé du poste</span>
                <span className={`font-bold text-sm mt-0.5 block ${isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'}`}>{employee.position?.title || 'Lead Développeur'}</span>
              </div>
              <div>
                <span className={`font-medium block ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>Date d'embauche</span>
                <span className={`font-semibold mt-0.5 block ${isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'}`}>{employee.hire_date || '15/03/2021'}</span>
              </div>
              <div>
                <span className={`font-medium block ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>Type de contrat actuel</span>
                <span className={`font-bold mt-0.5 block ${isDark ? 'text-[#D9AE3A]' : 'text-[#D4AF37]'}`}>{employee.contract_type}</span>
              </div>
              <div>
                <span className={`font-medium block ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>Responsable hiérarchique</span>
                <span className={`font-semibold mt-0.5 block ${isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'}`}>{employee.manager_name || 'Direction Générale'}</span>
              </div>
              <div>
                <span className={`font-medium block ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>Salaire mensuel brut</span>
                <span className={`font-extrabold text-sm mt-0.5 block ${isDark ? 'text-[#D9AE3A]' : 'text-[#D4AF37]'}`}>{employee.salary} MAD</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Contracts */}
        {activeTab === 'contracts' && (
          <div className="space-y-4">
            <h3 className={`font-bold text-base border-b pb-3 font-serif ${isDark ? 'border-white/10 text-[#F7F1E7]' : 'border-[#E5DEC9] text-[#1A1A24]'}`}>Historique des Contrats de Travail</h3>
            <div className={`divide-y ${isDark ? 'divide-white/10' : 'divide-[#E5DEC9]'}`}>
              {employee.contracts && employee.contracts.length > 0 ? (
                employee.contracts.map((c) => (
                  <div key={c.id} className="py-3 flex items-center justify-between text-xs">
                    <div>
                      <div className={`font-bold ${isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'}`}>Contrat {c.contract_type} ({c.status})</div>
                      <div className={`mt-0.5 ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>Début : {c.start_date} • Fin : {c.end_date || 'Indéterminée (CDI)'}</div>
                    </div>
                    <div className="text-right">
                      <div className={`font-extrabold ${isDark ? 'text-[#D9AE3A]' : 'text-[#D4AF37]'}`}>{c.salary} MAD</div>
                      <div className={`text-[11px] ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>Essai: {c.trial_period_months} mois</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className={`text-xs py-4 ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>Contrat CDI actif depuis l'embauche</div>
              )}
            </div>
          </div>
        )}

        {/* Tab 4: Leaves & Balance */}
        {activeTab === 'leaves' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className={`p-4 rounded-xl border text-center ${isDark ? 'bg-[#100817] border-white/10' : 'bg-[#FAF6F0] border-[#E5DEC9]'}`}>
                <span className={`text-xs font-medium ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>Solde Initial</span>
                <span className={`text-2xl font-bold block mt-1 ${isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'}`}>{leaveBalance.initial_balance} j</span>
              </div>
              <div className={`p-4 rounded-xl border text-center ${isDark ? 'bg-[#100817] border-white/10' : 'bg-[#FAF6F0] border-[#E5DEC9]'}`}>
                <span className={`text-xs font-medium ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>Jours Acquis</span>
                <span className={`text-2xl font-bold block mt-1 ${isDark ? 'text-[#D9AE3A]' : 'text-[#D4AF37]'}`}>{leaveBalance.acquired_days} j</span>
              </div>
              <div className={`p-4 rounded-xl border text-center ${isDark ? 'bg-[#100817] border-white/10' : 'bg-[#FAF6F0] border-[#E5DEC9]'}`}>
                <span className={`text-xs font-medium ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>Consommés</span>
                <span className={`text-2xl font-bold block mt-1 ${isDark ? 'text-[#E8C65A]' : 'text-[#B06000]'}`}>{leaveBalance.consumed_days} j</span>
              </div>
              <div className={`p-4 rounded-xl border text-center ${isDark ? 'bg-[#211027] border-[#D9AE3A]/40' : 'bg-[#FEF7E0] border-[#D4AF37]/40'}`}>
                <span className={`text-xs font-medium ${isDark ? 'text-[#D9AE3A]' : 'text-[#D4AF37]'}`}>Solde Restant</span>
                <span className={`text-2xl font-extrabold block mt-1 ${isDark ? 'text-[#D9AE3A]' : 'text-[#D4AF37]'}`}>{leaveBalance.remaining_days} j</span>
              </div>
            </div>

            <h4 className={`font-bold text-sm border-b pb-2 ${isDark ? 'border-white/10 text-[#F7F1E7]' : 'border-[#E5DEC9] text-[#1A1A24]'}`}>Historique des demandes de congés</h4>
            <div className={`divide-y text-xs ${isDark ? 'divide-white/10' : 'divide-[#E5DEC9]'}`}>
              {employee.leave_requests && employee.leave_requests.length > 0 ? (
                employee.leave_requests.map((l) => (
                  <div key={l.id} className="py-3 flex items-center justify-between">
                    <div>
                      <span className={`font-bold ${isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'}`}>{l.reference}</span> — <span className={isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}>{l.leave_type?.name || 'Congé'}</span>
                      <div className={`mt-0.5 ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>Du {l.start_date} au {l.end_date} ({l.total_days} jours)</div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                      l.status === 'Acceptée' ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20' : isDark ? 'bg-[#D9AE3A]/10 text-[#E8C65A] border border-[#D9AE3A]/30' : 'bg-[#FEF7E0] text-[#B06000] border border-[#D4AF37]/30'
                    }`}>
                      {l.status}
                    </span>
                  </div>
                ))
              ) : (
                <div className={`py-2 ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>Aucune demande archivée.</div>
              )}
            </div>
          </div>
        )}

        {/* Tab 5: Absences */}
        {activeTab === 'absences' && (
          <div className="space-y-4 text-xs">
            <h3 className={`font-bold text-base border-b pb-3 font-serif ${isDark ? 'border-white/10 text-[#F7F1E7]' : 'border-[#E5DEC9] text-[#1A1A24]'}`}>Registre des Absences</h3>
            {employee.absences && employee.absences.length > 0 ? (
              employee.absences.map((a) => (
                <div key={a.id} className={`p-3 rounded-xl border flex items-center justify-between ${isDark ? 'bg-[#100817] border-white/10' : 'bg-[#FAF6F0] border-[#E5DEC9]'}`}>
                  <div>
                    <span className={`font-bold ${isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'}`}>{a.date}</span> — <span className={`font-semibold ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>{a.type}</span>
                    <p className={`mt-0.5 ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>{a.reason}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${a.is_justified ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-600 border border-rose-500/20'}`}>
                    {a.is_justified ? 'Justifiée' : 'Non Justifiée'}
                  </span>
                </div>
              ))
            ) : (
              <div className={`py-2 ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>Aucune absence enregistrée.</div>
            )}
          </div>
        )}

        {/* Tab 6: Attendance */}
        {activeTab === 'attendance' && (
          <div className="space-y-4 text-xs">
            <h3 className={`font-bold text-base border-b pb-3 font-serif ${isDark ? 'border-white/10 text-[#F7F1E7]' : 'border-[#E5DEC9] text-[#1A1A24]'}`}>Fiche de Présence et Pointages</h3>
            <div className={`p-4 rounded-xl border flex items-center justify-between ${isDark ? 'bg-[#211027] border-[#D9AE3A]/30' : 'bg-[#FAF6F0] border-[#D4AF37]/30'}`}>
              <div>
                <span className={`font-bold ${isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'}`}>Pointage aujourd'hui</span>
                <p className={`mt-0.5 ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>Heure d'arrivée : <strong className={isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'}>08:55</strong> • Heure de départ : <strong className={isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'}>17:30</strong></p>
              </div>
              <span className={`px-3 py-1 font-extrabold rounded-lg text-xs ${isDark ? 'bg-[#D9AE3A] text-[#100817]' : 'bg-[#D4AF37] text-white'}`}>8.5 Heures travaillées</span>
            </div>
          </div>
        )}

        {/* Tab 7: Documents */}
        {activeTab === 'documents' && (
          <div className="space-y-4 text-xs">
            <h3 className={`font-bold text-base border-b pb-3 font-serif ${isDark ? 'border-white/10 text-[#F7F1E7]' : 'border-[#E5DEC9] text-[#1A1A24]'}`}>Documents Administratifs & RH</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {employee.documents && employee.documents.length > 0 ? (
                employee.documents.map((doc) => (
                  <div key={doc.id} className={`p-4 border rounded-xl flex items-center justify-between ${isDark ? 'bg-[#100817] border-white/10' : 'bg-[#FAF6F0] border-[#E5DEC9]'}`}>
                    <div className="flex items-center gap-3">
                      <span className={`material-symbols-outlined text-2xl ${isDark ? 'text-[#D9AE3A]' : 'text-[#D4AF37]'}`}>picture_as_pdf</span>
                      <div>
                        <div className={`font-bold ${isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'}`}>{doc.title}</div>
                        <span className={`text-[11px] ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>{doc.category} • {doc.file_size_kb} KB</span>
                      </div>
                    </div>
                    <button className={`p-2 rounded-lg cursor-pointer ${isDark ? 'text-[#D9AE3A] hover:bg-[#211027]' : 'text-[#D4AF37] hover:bg-slate-100'}`}>
                      <span className="material-symbols-outlined text-lg">download</span>
                    </button>
                  </div>
                ))
              ) : (
                <div className={`py-2 col-span-2 ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>Documents (CIN, Contrat) disponibles en pièce jointe.</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(EmployeeDetailView);
