import React, { useState } from 'react';

const DocumentsView = ({ documents, onOpenUploadModal }) => {
  const [selectedCat, setSelectedCat] = useState('');

  const filteredDocs = documents.filter(d => !selectedCat || d.category === selectedCat);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Gestion des Documents RH</h2>
          <p className="text-xs text-slate-500 mt-0.5">Centralisation des pièces d'identité, contrats, diplômes et attestations.</p>
        </div>
        <button
          onClick={onOpenUploadModal}
          className="btn-primary text-xs px-4 py-2"
        >
          <span className="material-symbols-outlined text-base">cloud_upload</span>
          <span>Déposer un Document</span>
        </button>
      </div>

      {/* Categories Filter */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-2 overflow-x-auto">
        {['', 'CIN', 'Contrat', 'CV', 'Diplôme', 'Attestation de travail', 'Certificat'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCat === cat ? 'bg-[#0F766E] text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {cat === '' ? 'Tous les types' : cat}
          </button>
        ))}
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredDocs.map((doc) => {
          const empName = doc.employee ? `${doc.employee.first_name} ${doc.employee.last_name}` : 'Collaborateur';

          return (
            <div key={doc.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md transition-all flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-2xl">picture_as_pdf</span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 leading-tight">{doc.title}</h4>
                  <span className="text-[11px] font-semibold text-[#0F766E] block mt-0.5">{doc.category}</span>
                  <span className="text-[11px] text-slate-400 block mt-1">
                    Associé à : <strong>{empName}</strong> • {doc.file_size_kb} KB
                  </span>
                </div>
              </div>

              <button className="p-2 text-slate-500 hover:text-[#0F766E] hover:bg-[#e6f7f4] rounded-lg transition-all cursor-pointer shrink-0">
                <span className="material-symbols-outlined text-lg">download</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DocumentsView;
