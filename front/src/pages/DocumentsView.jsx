import React, { useState } from 'react';

const DocumentsView = ({ documents, onOpenUploadModal, theme = 'light' }) => {
  const [selectedCat, setSelectedCat] = useState('');

  const isDark = theme === 'dark';

  const filteredDocs = documents.filter(d => !selectedCat || d.category === selectedCat);

  return (
    <div className={`space-y-6 min-h-screen p-6 sm:p-8 lg:p-10 pb-16 transition-colors duration-200 ${
      isDark ? 'bg-[#100817] text-[#F7F1E7]' : 'bg-[#F8F9FA] text-[#1A1A24]'
    }`}>
      {/* Header */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-5 ${
        isDark ? 'border-white/10' : 'border-[#E5DEC9]'
      }`}>
        <div>
          <h2 className={`text-2xl sm:text-3xl font-serif font-extrabold tracking-tight ${
            isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'
          }`}>Gestion des Documents RH</h2>
          <p className={`text-xs mt-0.5 ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>
            Centralisation des pièces d'identité, contrats, diplômes et attestations.
          </p>
        </div>
        <button
          onClick={onOpenUploadModal}
          className={`text-xs font-extrabold px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-md active:scale-95 ${
            isDark ? 'bg-[#D9AE3A] hover:bg-[#E8C65A] text-[#100817]' : 'bg-[#D4AF37] hover:bg-[#c49f27] text-white'
          }`}
        >
          <span className="material-symbols-outlined text-base">cloud_upload</span>
          <span>Déposer un Document</span>
        </button>
      </div>

      {/* Categories Filter */}
      <div className={`p-4 rounded-2xl border shadow-xs flex items-center gap-2 overflow-x-auto ${
        isDark ? 'bg-[#180D21] border-white/10 text-[#F7F1E7]' : 'bg-white border-[#E5DEC9] text-[#1A1A24]'
      }`}>
        {['', 'CIN', 'Contrat', 'CV', 'Diplôme', 'Attestation de travail', 'Certificat'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCat === cat 
                ? isDark ? 'bg-[#D9AE3A] text-[#100817] font-extrabold shadow-xs' : 'bg-[#D4AF37] text-white font-extrabold shadow-xs'
                : isDark ? 'bg-[#100817] text-[#B8A9BD] hover:text-[#F7F1E7] border border-white/10' : 'bg-[#FAF6F0] text-[#6B7280] hover:text-[#1A1A24] border border-[#E5DEC9]'
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
            <div key={doc.id} className={`p-5 rounded-2xl border shadow-xs transition-all flex items-start justify-between gap-4 ${
              isDark 
                ? 'bg-[#180D21] border-white/10 text-[#F7F1E7] hover:border-[#D9AE3A]/40' 
                : 'bg-white border-[#E5DEC9] text-[#1A1A24] hover:border-[#D4AF37]/50'
            }`}>
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${
                  isDark ? 'bg-[#211027] border-[#D9AE3A]/40 text-[#D9AE3A]' : 'bg-[#FAF6F0] border-[#D4AF37]/40 text-[#D4AF37]'
                }`}>
                  <span className="material-symbols-outlined text-2xl">picture_as_pdf</span>
                </div>
                <div>
                  <h4 className={`font-bold text-sm leading-tight ${isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'}`}>{doc.title}</h4>
                  <span className={`text-[11px] font-semibold block mt-0.5 ${isDark ? 'text-[#D9AE3A]' : 'text-[#D4AF37]'}`}>{doc.category}</span>
                  <span className={`text-[11px] block mt-1 ${isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'}`}>
                    Associé à : <strong className={isDark ? 'text-[#F7F1E7]' : 'text-[#1A1A24]'}>{empName}</strong> • {doc.file_size_kb} KB
                  </span>
                </div>
              </div>

              <button className={`p-2 rounded-lg transition-all cursor-pointer shrink-0 ${
                isDark ? 'text-[#B8A9BD] hover:text-[#D9AE3A] hover:bg-white/5' : 'text-[#6B7280] hover:text-[#D4AF37] hover:bg-slate-100'
              }`}>
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
