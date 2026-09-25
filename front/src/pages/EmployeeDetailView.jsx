import React, { useState } from 'react';

const EmployeeDetailView = ({ employee, onBack, onEditEmployee }) => {
  const [activeTab, setActiveTab] = useState('personal');

  if (!employee) return <div className="p-8 text-center text-slate-500">Employé non trouvé</div>;

  const leaveBalance = employee.leave_balance || { initial_balance: 18, acquired_days: 18, consumed_days: 2, remaining_days: 16 };

  return (
    <div className="space-y-6">
      {/* Top Navigation Back Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          <span>Retour à la liste des employés</span>
        </button>
        <span className="text-xs text-slate-400 font-mono">Fiche Collaborateur : {employee.matricule}</span>
      </div>

      {/* Hero Profile Banner */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-xs flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
        <div className="flex flex-col md:flex-row items-center gap-5">
          {employee.photo_url ? (
            <img
              src={employee.photo_url}
              alt={`${employee.first_name} ${employee.last_name}`}
              width={96}
              height={96}
              loading="lazy"
              decoding="async"
              className="w-24 h-24 rounded-full object-cover border-4 border-slate-100 shadow-md"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-[#0F766E]/10 text-[#0F766E] font-bold text-2xl flex items-center justify-center border-4 border-slate-100 shrink-0 shadow-sm">
              {employee.first_name?.[0]}{employee.last_name?.[0]}
            </div>
          )}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 flex-wrap">
              <h2 className="text-xl font-bold text-slate-900">{employee.first_name} {employee.last_name}</h2>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-0.5 rounded-full text-xs font-bold ${
                  employee.status === 'Actif' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                  employee.status === 'En congé' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                  employee.status === 'Suspendu' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                  'bg-slate-100 text-slate-700 border border-slate-200'
                }`}>
                  {employee.status}
                </span>

                {/* Quick Status Selector */}
                <select
                  value={employee.status}
                  onChange={(e) => onEditEmployee && onEditEmployee({ ...employee, status: e.target.value }, true)}
                  title="Changer le statut de l'employé"
                  className="px-2 py-0.5 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-semibold text-slate-700 focus:outline-hidden cursor-pointer"
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
            <p className="text-xs text-slate-500 font-medium mt-1">
              {employee.position?.title || 'Lead Développeur'} • {employee.department?.name || 'Informatique & Tech'}
            </p>
            <div className="flex items-center justify-center md:justify-start gap-4 text-xs text-slate-500 mt-3 font-mono">
              <span>Matricule: <strong>{employee.matricule}</strong></span>
              <span>•</span>
              <span>CIN: <strong>{employee.cin || 'BE892102'}</strong></span>
              <span>•</span>
              <span>Email: <strong className="text-[#0F766E]">{employee.email}</strong></span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onEditEmployee && onEditEmployee(employee)}
            className="btn-primary text-xs px-4 py-2"
          >
            <span className="material-symbols-outlined text-sm">edit</span>
            <span>Modifier la fiche</span>
          </button>
        </div>
      </div>

      {/* Detail Tabs Header */}
      <div className="bg-white rounded-2xl border border-slate-100 p-2 shadow-xs flex items-center gap-1 overflow-x-auto">
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
                ? 'bg-[#0F766E] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <span className="material-symbols-outlined text-base">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-xs">
        {/* Tab 1: Personal Info */}
        {activeTab === 'personal' && (
          <div className="space-y-6">
            <h3 className="font-bold text-base text-slate-800 border-b border-slate-100 pb-3">Informations Personnelles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
              <div>
                <span className="text-slate-400 font-medium block">Nom complet</span>
                <span className="font-bold text-slate-900 text-sm mt-0.5 block">{employee.first_name} {employee.last_name}</span>
              </div>
              <div>
                <span className="text-slate-400 font-medium block">Date de naissance</span>
                <span className="font-semibold text-slate-800 mt-0.5 block">{employee.birth_date || '14/05/1990'}</span>
              </div>
              <div>
                <span className="text-slate-400 font-medium block">Genre</span>
                <span className="font-semibold text-slate-800 mt-0.5 block">{employee.gender === 'M' ? 'Masculin' : 'Féminin'}</span>
              </div>
              <div>
                <span className="text-slate-400 font-medium block">Numéro CIN</span>
                <span className="font-bold text-slate-900 font-mono mt-0.5 block">{employee.cin || 'BE892102'}</span>
              </div>
              <div>
                <span className="text-slate-400 font-medium block">Téléphone personnel</span>
                <span className="font-semibold text-slate-800 mt-0.5 block">{employee.phone || '+212 661 23 45 67'}</span>
              </div>
              <div>
                <span className="text-slate-400 font-medium block">Adresse email</span>
                <span className="font-semibold text-[#0F766E] mt-0.5 block">{employee.email}</span>
              </div>
              <div className="md:col-span-2">
                <span className="text-slate-400 font-medium block">Adresse résidentielle</span>
                <span className="font-semibold text-slate-800 mt-0.5 block">{employee.address || 'Boulevard Zerktouni, Résidence Al Amal'}, {employee.city}</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Professional Info */}
        {activeTab === 'professional' && (
          <div className="space-y-6">
            <h3 className="font-bold text-base text-slate-800 border-b border-slate-100 pb-3">Informations Professionnelles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
              <div>
                <span className="text-slate-400 font-medium block">Département</span>
                <span className="font-bold text-slate-900 text-sm mt-0.5 block">{employee.department?.name || 'Informatique & Tech'}</span>
              </div>
              <div>
                <span className="text-slate-400 font-medium block">Intitulé du poste</span>
                <span className="font-bold text-slate-900 text-sm mt-0.5 block">{employee.position?.title || 'Lead Développeur'}</span>
              </div>
              <div>
                <span className="text-slate-400 font-medium block">Date d'embauche</span>
                <span className="font-semibold text-slate-800 mt-0.5 block">{employee.hire_date || '15/03/2021'}</span>
              </div>
              <div>
                <span className="text-slate-400 font-medium block">Type de contrat actuel</span>
                <span className="font-bold text-[#0F766E] mt-0.5 block">{employee.contract_type}</span>
              </div>
              <div>
                <span className="text-slate-400 font-medium block">Responsable hiérarchique</span>
                <span className="font-semibold text-slate-800 mt-0.5 block">{employee.manager_name || 'Direction Générale'}</span>
              </div>
              <div>
                <span className="text-slate-400 font-medium block">Salaire mensuel brut</span>
                <span className="font-extrabold text-emerald-600 text-sm mt-0.5 block">{employee.salary} MAD</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Contracts */}
        {activeTab === 'contracts' && (
          <div className="space-y-4">
            <h3 className="font-bold text-base text-slate-800 border-b border-slate-100 pb-3">Historique des Contrats de Travail</h3>
            <div className="divide-y divide-slate-100">
              {employee.contracts && employee.contracts.length > 0 ? (
                employee.contracts.map((c) => (
                  <div key={c.id} className="py-3 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-slate-900">Contrat {c.contract_type} ({c.status})</div>
                      <div className="text-slate-500 mt-0.5">Début : {c.start_date} • Fin : {c.end_date || 'Indéterminée (CDI)'}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-extrabold text-emerald-600">{c.salary} MAD</div>
                      <div className="text-slate-400 text-[11px]">Essai: {c.trial_period_months} mois</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-xs text-slate-400 py-4">Contrat CDI actif depuis l'embauche</div>
              )}
            </div>
          </div>
        )}

        {/* Tab 4: Leaves & Balance */}
        {activeTab === 'leaves' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                <span className="text-xs text-slate-500 font-medium">Solde Initial</span>
                <span className="text-2xl font-bold text-slate-900 block mt-1">{leaveBalance.initial_balance} j</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                <span className="text-xs text-slate-500 font-medium">Jours Acquis</span>
                <span className="text-2xl font-bold text-[#0F766E] block mt-1">{leaveBalance.acquired_days} j</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                <span className="text-xs text-slate-500 font-medium">Consommés</span>
                <span className="text-2xl font-bold text-amber-600 block mt-1">{leaveBalance.consumed_days} j</span>
              </div>
              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 text-center">
                <span className="text-xs text-emerald-700 font-medium">Solde Restant</span>
                <span className="text-2xl font-extrabold text-emerald-700 block mt-1">{leaveBalance.remaining_days} j</span>
              </div>
            </div>

            <h4 className="font-bold text-sm text-slate-800 border-b border-slate-100 pb-2">Historique des demandes de congés</h4>
            <div className="divide-y divide-slate-100 text-xs">
              {employee.leave_requests && employee.leave_requests.length > 0 ? (
                employee.leave_requests.map((l) => (
                  <div key={l.id} className="py-3 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900">{l.reference}</span> — <span className="text-slate-600">{l.leave_type?.name || 'Congé'}</span>
                      <div className="text-slate-500 mt-0.5">Du {l.start_date} au {l.end_date} ({l.total_days} jours)</div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                      l.status === 'Acceptée' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      {l.status}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-slate-400 py-2">Aucune demande archivée.</div>
              )}
            </div>
          </div>
        )}

        {/* Tab 5: Absences */}
        {activeTab === 'absences' && (
          <div className="space-y-4 text-xs">
            <h3 className="font-bold text-base text-slate-800 border-b border-slate-100 pb-3">Registre des Absences</h3>
            {employee.absences && employee.absences.length > 0 ? (
              employee.absences.map((a) => (
                <div key={a.id} className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900">{a.date}</span> — <span className="font-semibold text-slate-700">{a.type}</span>
                    <p className="text-slate-500 mt-0.5">{a.reason}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${a.is_justified ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                    {a.is_justified ? 'Justifiée' : 'Non Justifiée'}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-slate-400 py-2">Aucune absence enregistrée.</div>
            )}
          </div>
        )}

        {/* Tab 6: Attendance */}
        {activeTab === 'attendance' && (
          <div className="space-y-4 text-xs">
            <h3 className="font-bold text-base text-slate-800 border-b border-slate-100 pb-3">Fiche de Présence et Pointages</h3>
            <div className="p-4 bg-[#e6f7f4]/60 rounded-xl border border-[#0F766E]/20 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900">Pointage aujourd'hui</span>
                <p className="text-slate-600 mt-0.5">Heure d'arrivée : <strong>08:55</strong> • Heure de départ : <strong>17:30</strong></p>
              </div>
              <span className="px-3 py-1 bg-[#0F766E] text-white font-bold rounded-lg text-xs">8.5 Heures travaillées</span>
            </div>
          </div>
        )}

        {/* Tab 7: Documents */}
        {activeTab === 'documents' && (
          <div className="space-y-4 text-xs">
            <h3 className="font-bold text-base text-slate-800 border-b border-slate-100 pb-3">Documents Administratifs & RH</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {employee.documents && employee.documents.length > 0 ? (
                employee.documents.map((doc) => (
                  <div key={doc.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#0F766E] text-2xl">picture_as_pdf</span>
                      <div>
                        <div className="font-bold text-slate-900">{doc.title}</div>
                        <span className="text-slate-400 text-[11px]">{doc.category} • {doc.file_size_kb} KB</span>
                      </div>
                    </div>
                    <button className="p-2 text-[#0F766E] hover:bg-[#e6f7f4] rounded-lg cursor-pointer">
                      <span className="material-symbols-outlined text-lg">download</span>
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-slate-400 py-2 col-span-2">Documents (CIN, Contrat) disponibles en pièce jointe.</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(EmployeeDetailView);
