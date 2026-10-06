import React from 'react';
import { 
  LayoutGrid, 
  User, 
  Users, 
  Building2, 
  Briefcase, 
  BadgeCheck, 
  Sun, 
  CalendarX, 
  Clock, 
  FolderOpen, 
  ClipboardList, 
  Bell, 
  BarChart3, 
  UserCog, 
  Shield, 
  History, 
  Palette, 
  Settings
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, activeRole, unreadNotificationsCount, theme = 'light' }) => {
  const isDark = theme === 'dark';

  const navSections = [
    {
      title: 'MENU PRINCIPAL',
      items: [
        { id: 'dashboard', label: 'Tableau de bord', icon: LayoutGrid, roles: ['Admin', 'RH'] },
        { id: 'employee_space', label: 'Mon Espace Employé', icon: User, roles: ['Employé'] },
      ]
    },
    {
      title: 'COLLABORATEURS',
      items: [
        { id: 'employees', label: 'Employés', icon: Users, roles: ['Admin', 'RH'] },
        { id: 'departments', label: 'Départements', icon: Building2, roles: ['Admin', 'RH'] },
        { id: 'positions', label: 'Postes', icon: Briefcase, roles: ['Admin', 'RH'] },
      ]
    },
    {
      title: 'GESTION RH & POINTAGE',
      items: [
        { id: 'contracts', label: 'Contrats', icon: BadgeCheck, badge: '5', roles: ['Admin', 'RH'] },
        { id: 'leaves', label: 'Congés', icon: Sun, badge: '12', roles: ['Admin', 'RH', 'Employé'] },
        { id: 'absences', label: 'Absences', icon: CalendarX, roles: ['Admin', 'RH'] },
        { id: 'attendance', label: 'Présences', icon: Clock, roles: ['Admin', 'RH', 'Employé'] },
        { id: 'documents', label: 'Documents', icon: FolderOpen, roles: ['Admin', 'RH', 'Employé'] },
      ]
    },
    {
      title: 'ANALYTIQUE & RAPPORTS',
      items: [
        { id: 'hr_requests', label: 'Demandes RH', icon: ClipboardList, badge: '3', roles: ['Admin', 'RH', 'Employé'] },
        { id: 'notifications', label: 'Notifications', icon: Bell, badge: unreadNotificationsCount > 0 ? unreadNotificationsCount : null, roles: ['Admin', 'RH', 'Employé'] },
        { id: 'reports', label: 'Rapports', icon: BarChart3, roles: ['Admin', 'RH'] },
      ]
    },
    {
      title: 'ADMINISTRATION',
      items: [
        { id: 'users', label: 'Utilisateurs', icon: UserCog, roles: ['Admin'] },
        { id: 'roles', label: 'Rôles & Permissions', icon: Shield, roles: ['Admin'] },
        { id: 'audit_logs', label: 'Audit Logs', icon: History, roles: ['Admin', 'RH'] },
        { id: 'design_system', label: 'Design System', icon: Palette, roles: ['Admin', 'RH'] },
        { id: 'settings', label: 'Paramètres', icon: Settings, roles: ['Admin'] },
      ]
    }
  ];

  return (
    <aside className={`w-64 border-r flex flex-col min-h-screen shrink-0 transition-colors duration-200 select-none z-30 ${
      isDark 
        ? 'bg-[#100817] text-white border-white/10' 
        : 'bg-white text-[#1A1A24] border-[#E5DEC9]'
    }`}>
      {/* Logo Amsoft People avec Badge Carré Doré */}
      <div className={`p-6 flex items-center justify-between border-b bg-transparent ${
        isDark ? 'border-white/10' : 'border-[#E5DEC9]'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-serif font-bold text-lg shadow-sm ${
            isDark ? 'bg-[#D9AE3A] text-[#100817]' : 'bg-[#D4AF37] text-[#1A1A24]'
          }`}>
            A
          </div>
          <div>
            <h1 className={`font-extrabold text-base leading-none tracking-tight font-serif ${
              isDark ? 'text-white' : 'text-[#1A1A24]'
            }`}>
              Amsoft People
            </h1>
            <p className={`text-[10px] font-medium mt-1 uppercase tracking-wider ${
              isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'
            }`}>
              SOLUTION RH B2B
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 px-3 py-4 space-y-6 overflow-y-auto">
        {navSections.map((section, sIdx) => {
          const visibleItems = section.items.filter(item => item.roles.includes(activeRole));
          if (visibleItems.length === 0) return null;

          return (
            <div key={sIdx}>
              <div className={`px-3 mb-2 text-[10px] font-bold uppercase tracking-wider ${
                isDark ? 'text-[#B8A9BD] opacity-80' : 'text-[#6B7280]'
              }`}>
                {section.title}
              </div>
              <div className="space-y-1">
                {visibleItems.map((item) => {
                  const isActive = activeTab === item.id;
                  const IconComp = item.icon;

                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs transition-all duration-200 cursor-pointer relative ${
                        isActive
                          ? isDark
                            ? 'bg-[#211027] text-white font-semibold border-l-2 border-[#D9AE3A] shadow-xs'
                            : 'bg-[#FAF6F0] text-[#1A1A24] font-bold border-l-2 border-[#D4AF37] shadow-xs'
                          : isDark
                            ? 'text-[#B8A9BD] hover:bg-white/5 hover:text-white font-normal'
                            : 'text-[#6B7280] hover:bg-slate-50 hover:text-[#1A1A24] font-normal'
                      }`}
                    >
                      <IconComp className={`w-4 h-4 shrink-0 stroke-[1.75] ${
                        isActive 
                          ? isDark ? 'text-[#D9AE3A]' : 'text-[#D4AF37]' 
                          : isDark ? 'text-[#B8A9BD]' : 'text-[#6B7280]'
                      }`} />
                      
                      <span className="flex-1 text-left truncate">{item.label}</span>
                      
                      {item.badge && (
                        <span className={`px-2 py-0.5 text-[10px] rounded-full font-extrabold ${
                          isDark 
                            ? 'bg-[#D9AE3A] text-[#100817]' 
                            : 'bg-[#D4AF37] text-[#1A1A24]'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Status Footer */}
      <div className={`p-4 border-t bg-transparent text-xs ${
        isDark ? 'border-white/10' : 'border-[#E5DEC9]'
      }`}>
        <div className={`px-3.5 py-2.5 rounded-xl border flex items-center justify-between ${
          isDark 
            ? 'bg-white/5 border-white/10 text-white' 
            : 'bg-[#FAF6F0] border-[#E5DEC9] text-[#1A1A24]'
        }`}>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <div className="text-[11px] font-medium">Système RH Temps Réel</div>
          </div>
          <span className={`text-[10px] font-mono font-extrabold px-2 py-0.5 rounded shadow-xs ${
            isDark ? 'bg-[#D9AE3A] text-[#100817]' : 'bg-[#D4AF37] text-[#1A1A24]'
          }`}>
            2026
          </span>
        </div>
      </div>
    </aside>
  );
};

export default React.memo(Sidebar);
