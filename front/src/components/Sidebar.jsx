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

const Sidebar = ({ activeTab, setActiveTab, activeRole, unreadNotificationsCount }) => {
  const navSections = [
    {
      title: 'VUE GÉNÉRALE',
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
      title: 'GESTION RH',
      items: [
        { id: 'contracts', label: 'Contrats', icon: BadgeCheck, badge: '5', roles: ['Admin', 'RH'] },
        { id: 'leaves', label: 'Congés', icon: Sun, badge: '12', roles: ['Admin', 'RH', 'Employé'] },
        { id: 'absences', label: 'Absences', icon: CalendarX, roles: ['Admin', 'RH'] },
        { id: 'attendance', label: 'Présences', icon: Clock, roles: ['Admin', 'RH', 'Employé'] },
        { id: 'documents', label: 'Documents', icon: FolderOpen, roles: ['Admin', 'RH', 'Employé'] },
      ]
    },
    {
      title: 'AUTRES',
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
    <aside className="w-64 bg-theme-sidebar border-r border-theme flex flex-col min-h-screen shrink-0 transition-all duration-200 select-none z-30">
      {/* Brand Header */}
      <div className="p-6 flex items-center gap-3 border-b border-theme bg-transparent">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 shadow-glow-teal flex items-center justify-center text-white shrink-0 font-bold">
          <Users className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="font-bold text-base text-theme-primary leading-none tracking-tight">Amsoft People</h1>
          <p className="text-theme-secondary text-[11px] font-medium mt-1">Gestion des collaborateurs</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
        {navSections.map((section, sIdx) => {
          const visibleItems = section.items.filter(item => item.roles.includes(activeRole));
          if (visibleItems.length === 0) return null;

          return (
            <div key={sIdx}>
              <div className="px-4 mb-3 text-[11px] font-bold uppercase tracking-wider text-theme-muted">
                {section.title}
              </div>
              <div className="space-y-1.5">
                {visibleItems.map((item) => {
                  const isActive = activeTab === item.id;
                  const IconComp = item.icon;

                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer relative ${
                        isActive
                          ? 'bg-teal-500/20 text-teal-300 border-l-2 border-teal-400 font-bold shadow-glow-teal'
                          : 'text-theme-secondary hover:bg-teal-500/10 hover:text-teal-400'
                      }`}
                    >
                      <IconComp className={`w-5 h-5 shrink-0 ${isActive ? 'text-teal-300' : 'text-theme-muted'}`} />
                      
                      <span className="flex-1 text-left truncate">{item.label}</span>
                      
                      {item.badge && (
                        <span className={`px-2 py-0.5 text-[10px] rounded-full font-bold ${
                          isActive ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30' : 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
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
      <div className="p-4 border-t border-theme bg-transparent text-xs">
        <div className="px-4 py-3 rounded-xl bg-theme-card border border-theme flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse shadow-glow-teal"></span>
            <div className="text-[11px] font-semibold text-theme-primary">Système RH</div>
          </div>
          <span className="text-[10px] font-mono text-teal-400">v2.0 Theme</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
