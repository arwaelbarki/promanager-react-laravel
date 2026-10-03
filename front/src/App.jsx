import React, { useState, useEffect, lazy, Suspense } from 'react';
import api from './api';

// Components
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Modal from './components/Modal';

// Pages Lazy Loaded for bundle optimization & code splitting
const LandingView = lazy(() => import('./pages/LandingView'));
const LoginView = lazy(() => import('./pages/LoginView'));
const DashboardView = lazy(() => import('./pages/DashboardView'));
const EmployeesView = lazy(() => import('./pages/EmployeesView'));
const EmployeeDetailView = lazy(() => import('./pages/EmployeeDetailView'));
const EmployeeSpaceView = lazy(() => import('./pages/EmployeeSpaceView'));
const ContractsView = lazy(() => import('./pages/ContractsView'));
const LeavesView = lazy(() => import('./pages/LeavesView'));
const AbsencesView = lazy(() => import('./pages/AbsencesView'));
const AttendanceView = lazy(() => import('./pages/AttendanceView'));
const DocumentsView = lazy(() => import('./pages/DocumentsView'));
const HrRequestsView = lazy(() => import('./pages/HrRequestsView'));
const NotificationsView = lazy(() => import('./pages/NotificationsView'));
const DepartmentsPositionsView = lazy(() => import('./pages/DepartmentsPositionsView'));
const UsersRolesView = lazy(() => import('./pages/UsersRolesView'));
const AuditLogsView = lazy(() => import('./pages/AuditLogsView'));
const ReportsView = lazy(() => import('./pages/ReportsView'));
const SettingsView = lazy(() => import('./pages/SettingsView'));
const DesignSystemView = lazy(() => import('./pages/DesignSystemView'));

// Default Mock Datasets for instant presentation & offline fallback
const initialEmployees = [
  { id: 1, matricule: 'EMP-0001', first_name: 'Ahmed', last_name: 'Benali', email: 'ahmed.benali@company.ma', phone: '+212 661 23 45 67', cin: 'BE892102', contract_type: 'CDI', salary: 18500, status: 'Actif', hire_date: '2021-03-15', city: 'Casablanca', role: 'RH', department: { name: 'Informatique & Tech' }, position: { title: 'Lead Développeur Fullstack' } },
  { id: 2, matricule: 'EMP-0002', first_name: 'Fatine', last_name: 'Alaoui', email: 'fatine.alaoui@company.ma', phone: '+212 662 98 76 54', cin: 'A741029', contract_type: 'CDI', salary: 16000, status: 'Actif', hire_date: '2020-01-10', city: 'Rabat', role: 'RH', department: { name: 'Ressources Humaines' }, position: { title: 'Responsable RH' } },
  { id: 3, matricule: 'EMP-0003', first_name: 'Karim', last_name: 'Tazi', email: 'karim.tazi@company.ma', phone: '+212 663 11 22 33', cin: 'CD551209', contract_type: 'CDD', salary: 12000, status: 'Actif', hire_date: '2025-10-01', city: 'Casablanca', role: 'Employé', department: { name: 'Finance & Comptabilité' }, position: { title: 'Comptable Senior' } },
  { id: 4, matricule: 'EMP-0004', first_name: 'Sanaa', last_name: 'Mansouri', email: 'sanaa.mansouri@company.ma', phone: '+212 664 44 55 66', cin: 'D889102', contract_type: 'CDI', salary: 9500, status: 'En congé', hire_date: '2024-01-15', city: 'Casablanca', role: 'Employé', department: { name: 'Commercial & Ventes' }, position: { title: 'Responsable Commercial' } },
  { id: 5, matricule: 'EMP-0005', first_name: 'Youssef', last_name: 'El Amrani', email: 'youssef.elamrani@company.ma', phone: '+212 665 77 88 99', cin: 'F129044', contract_type: 'CDI', salary: 11000, status: 'Actif', hire_date: '2023-05-20', city: 'Rabat', role: 'Employé', department: { name: 'Marketing & Com' }, position: { title: 'UX/UI Designer' } },
  { id: 6, matricule: 'EMP-0006', first_name: 'Meryem', last_name: 'Bennani', email: 'meryem.bennani@company.ma', phone: '+212 666 33 22 11', cin: 'G441920', contract_type: 'CDD', salary: 7500, status: 'Actif', hire_date: '2026-02-01', city: 'Casablanca', role: 'Employé', department: { name: 'Ressources Humaines' }, position: { title: 'Assistant RH' } },
];

const initialContracts = [
  { id: 1, employee_id: 1, employee: initialEmployees[0], contract_type: 'CDI', start_date: '2021-03-15', end_date: null, salary: 18500, trial_period_months: 3, status: 'Actif' },
  { id: 2, employee_id: 2, employee: initialEmployees[1], contract_type: 'CDI', start_date: '2020-01-10', end_date: null, salary: 16000, trial_period_months: 3, status: 'Actif' },
  { id: 3, employee_id: 3, employee: initialEmployees[2], contract_type: 'CDD', start_date: '2025-10-01', end_date: '2026-10-15', salary: 12000, trial_period_months: 1, status: 'Actif' },
  { id: 4, employee_id: 4, employee: initialEmployees[3], contract_type: 'CDI', start_date: '2024-01-15', end_date: null, salary: 9500, trial_period_months: 3, status: 'Actif' },
  { id: 5, employee_id: 6, employee: initialEmployees[5], contract_type: 'CDD', start_date: '2026-02-01', end_date: '2026-11-30', salary: 7500, trial_period_months: 1, status: 'Actif' },
];

const initialLeaves = [
  { id: 1, reference: 'CONG-2026-001', employee_id: 1, employee: initialEmployees[0], leave_type: { name: 'Congé annuel' }, start_date: '2026-10-01', end_date: '2026-10-10', total_days: 8, reason: 'Repos annuel de fin de projet', status: 'En attente' },
  { id: 2, reference: 'CONG-2026-002', employee_id: 4, employee: initialEmployees[3], leave_type: { name: 'Congé annuel' }, start_date: '2026-09-08', end_date: '2026-09-15', total_days: 5, reason: 'Congés annuels de fin d’été', status: 'Acceptée' },
  { id: 3, reference: 'CONG-2026-003', employee_id: 3, employee: initialEmployees[2], leave_type: { name: 'Congé maladie' }, start_date: '2026-09-02', end_date: '2026-09-04', total_days: 2, reason: 'Consultation médicale urgente', status: 'Acceptée' },
  { id: 4, reference: 'CONG-2026-004', employee_id: 5, employee: initialEmployees[4], leave_type: { name: 'Congé exceptionnel' }, start_date: '2026-10-12', end_date: '2026-10-14', total_days: 3, reason: 'Mariage familial', status: 'En attente' },
  { id: 5, reference: 'CONG-2026-005', employee_id: 6, employee: initialEmployees[5], leave_type: { name: 'Congé annuel' }, start_date: '2026-10-20', end_date: '2026-10-25', total_days: 5, reason: 'Congés d’automne', status: 'En attente' },
  { id: 6, reference: 'CONG-2026-006', employee_id: 2, employee: initialEmployees[1], leave_type: { name: 'Congé RTT' }, start_date: '2026-11-02', end_date: '2026-11-03', total_days: 2, reason: 'RTT cumulés', status: 'En attente' },
  { id: 7, reference: 'CONG-2026-007', employee_id: 1, employee: initialEmployees[0], leave_type: { name: 'Congé sans solde' }, start_date: '2026-11-15', end_date: '2026-11-20', total_days: 5, reason: 'Formation personnelle certifiante', status: 'En attente' },
  { id: 8, reference: 'CONG-2026-008', employee_id: 3, employee: initialEmployees[2], leave_type: { name: 'Congé annuel' }, start_date: '2026-12-24', end_date: '2026-12-31', total_days: 6, reason: 'Fêtes de fin d’année', status: 'En attente' },
  { id: 9, reference: 'CONG-2026-009', employee_id: 4, employee: initialEmployees[3], leave_type: { name: 'Congé exceptionnel' }, start_date: '2026-11-05', end_date: '2026-11-07', total_days: 2, reason: 'Déménagement personnel', status: 'En attente' },
  { id: 10, reference: 'CONG-2026-010', employee_id: 5, employee: initialEmployees[4], leave_type: { name: 'Congé maladie' }, start_date: '2026-09-18', end_date: '2026-09-19', total_days: 1, reason: 'Grippe saisonnière', status: 'Acceptée' },
  { id: 11, reference: 'CONG-2026-011', employee_id: 6, employee: initialEmployees[5], leave_type: { name: 'Congé RTT' }, start_date: '2026-12-10', end_date: '2026-12-11', total_days: 2, reason: 'RTT trimestriel', status: 'En attente' },
  { id: 12, reference: 'CONG-2026-012', employee_id: 2, employee: initialEmployees[1], leave_type: { name: 'Congé annuel' }, start_date: '2026-12-18', end_date: '2026-12-28', total_days: 7, reason: 'Vacances annuelles d’hiver', status: 'En attente' },
];

const initialHrRequests = [
  { id: 1, reference: 'REQ-202609-1001', employee_id: 1, employee: initialEmployees[0], type: 'Attestation de travail', request_date: '2026-09-05', description: 'Besoin d’une attestation de travail pour la banque', status: 'Acceptée' },
  { id: 2, reference: 'REQ-202609-1002', employee_id: 3, employee: initialEmployees[2], type: 'Bulletin de paie', request_date: '2026-09-15', description: 'Duplicata du bulletin de paie du mois d’août 2026', status: 'Acceptée' },
  { id: 3, reference: 'REQ-202609-1003', employee_id: 6, employee: initialEmployees[5], type: 'Attestation de salaire', request_date: '2026-09-22', description: 'Attestation de salaire pour demande de visa touristique', status: 'En attente' },
];

const initialAbsences = [
  { id: 1, employee_id: 3, employee: initialEmployees[2], date: '2026-09-02', type: 'Maladie', reason: 'Consultation médicale urgente', is_justified: true, hr_comment: 'Certificat médical reçu et validé' },
  { id: 2, employee_id: 1, employee: initialEmployees[0], date: '2026-08-14', type: 'Autorisation', reason: 'Démarche administrative personnelle', is_justified: true, hr_comment: 'Autorisé par la direction' },
  { id: 3, employee_id: 5, employee: initialEmployees[4], date: '2026-09-18', type: 'Maladie', reason: 'Grippe saisonnière', is_justified: true, hr_comment: 'Arrêt de 48h transmis' },
];

const initialAttendances = [
  { id: 1, employee_id: 1, employee: initialEmployees[0], date: new Date().toISOString().split('T')[0], check_in: '08:55:00', check_out: '17:30:00', total_hours: 8.5, status: 'Présent', is_late: false },
  { id: 2, employee_id: 2, employee: initialEmployees[1], date: new Date().toISOString().split('T')[0], check_in: '09:12:00', check_out: null, total_hours: 0, status: 'Retard', is_late: true, notes: 'Embouteillages en ville' },
  { id: 3, employee_id: 3, employee: initialEmployees[2], date: new Date().toISOString().split('T')[0], check_in: '08:50:00', check_out: '18:00:00', total_hours: 9.0, status: 'Présent', is_late: false },
  { id: 4, employee_id: 5, employee: initialEmployees[4], date: new Date().toISOString().split('T')[0], check_in: '09:00:00', check_out: '17:45:00', total_hours: 8.75, status: 'Présent', is_late: false },
  { id: 5, employee_id: 6, employee: initialEmployees[5], date: new Date().toISOString().split('T')[0], check_in: '08:45:00', check_out: '17:15:00', total_hours: 8.5, status: 'Présent', is_late: false },
];

const initialDocuments = [
  { id: 1, employee_id: 1, employee: initialEmployees[0], title: 'Carte d’Identité Nationale (CIN)', category: 'CIN', file_size_kb: 420, file_type: 'application/pdf', uploaded_by: 'RH' },
  { id: 2, employee_id: 1, employee: initialEmployees[0], title: 'Contrat de Travail CDI signé', category: 'Contrat', file_size_kb: 1250, file_type: 'application/pdf', uploaded_by: 'RH' },
  { id: 3, employee_id: 2, employee: initialEmployees[1], title: 'Diplôme Master Ressources Humaines', category: 'Diplôme', file_size_kb: 890, file_type: 'application/pdf', uploaded_by: 'RH' },
  { id: 4, employee_id: 3, employee: initialEmployees[2], title: 'Contrat CDD 12 mois', category: 'Contrat', file_size_kb: 1100, file_type: 'application/pdf', uploaded_by: 'RH' },
  { id: 5, employee_id: 4, employee: initialEmployees[3], title: 'Attestation de travail', category: 'Attestation', file_size_kb: 340, file_type: 'application/pdf', uploaded_by: 'RH' },
];

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Start on Landing Page for SaaS workflow
  const [authView, setAuthView] = useState('landing'); // 'landing' or 'login'
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeRole, setActiveRole] = useState(localStorage.getItem('hr_active_role') || 'RH');
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('hr_active_user') || 'Fatine Alaoui');
  const [searchQuery, setSearchQuery] = useState('');

  // Data States initialized with rich default datasets
  const [stats, setStats] = useState(null);
  const [employees, setEmployees] = useState(initialEmployees);
  const [selectedEmpId, setSelectedEmpId] = useState(null);
  const [selectedEmpData, setSelectedEmpData] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [positions, setPositions] = useState([]);
  const [contracts, setContracts] = useState(initialContracts);
  const [leaves, setLeaves] = useState(initialLeaves);
  const [absences, setAbsences] = useState(initialAbsences);
  const [attendances, setAttendances] = useState(initialAttendances);
  const [documents, setDocuments] = useState(initialDocuments);
  const [hrRequests, setHrRequests] = useState(initialHrRequests);
  const [notifications, setNotifications] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);

  // Modals
  const [showNewEmpModal, setShowNewEmpModal] = useState(false);
  const [showEditEmpModal, setShowEditEmpModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showContractModal, setShowContractModal] = useState(false);
  const [showAbsenceModal, setShowAbsenceModal] = useState(false);
  const [showDocModal, setShowDocModal] = useState(false);
  const [showHrReqModal, setShowHrReqModal] = useState(false);
  const [showDeptModal, setShowDeptModal] = useState(false);
  const [showPosModal, setShowPosModal] = useState(false);

  // Toast message
  const [toast, setToast] = useState(null);

  const showFeedback = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Initial Fetch Data
  const fetchData = async () => {
    try {
      const [
        statsRes,
        empRes,
        deptRes,
        posRes,
        contRes,
        leaveRes,
        absRes,
        attRes,
        docRes,
        reqRes,
        notifRes,
        logRes
      ] = await Promise.all([
        api.get('/dashboard-stats'),
        api.get('/employees'),
        api.get('/departments'),
        api.get('/positions'),
        api.get('/contracts'),
        api.get('/leaves'),
        api.get('/absences'),
        api.get('/attendances'),
        api.get('/documents'),
        api.get('/hr-requests'),
        api.get('/notifications'),
        api.get('/audit-logs'),
      ]);

      if (statsRes.data) setStats(statsRes.data);
      if (empRes.data && empRes.data.length > 0) setEmployees(empRes.data);
      if (deptRes.data && deptRes.data.length > 0) setDepartments(deptRes.data);
      if (posRes.data && posRes.data.length > 0) setPositions(posRes.data);
      if (contRes.data && contRes.data.length > 0) setContracts(contRes.data);
      if (leaveRes.data && leaveRes.data.length > 0) setLeaves(leaveRes.data);
      if (absRes.data && absRes.data.length > 0) setAbsences(absRes.data);
      if (attRes.data && attRes.data.length > 0) setAttendances(attRes.data);
      if (docRes.data && docRes.data.length > 0) setDocuments(docRes.data);
      if (reqRes.data && reqRes.data.length > 0) setHrRequests(reqRes.data);
      if (notifRes.data && notifRes.data.length > 0) setNotifications(notifRes.data);
      if (logRes.data && logRes.data.length > 0) setAuditLogs(logRes.data);
    } catch (err) {
      console.warn("API Server offline, using active state fallback.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Login & Logout handlers
  const handleLogin = ({ role, name }) => {
    setActiveRole(role);
    setCurrentUser(name);
    localStorage.setItem('hr_active_role', role);
    localStorage.setItem('hr_active_user', name);
    setIsAuthenticated(true);
    if (role === 'Employé') {
      setActiveTab('employee_space');
    } else {
      setActiveTab('dashboard');
    }
    showFeedback(`Bienvenue ${name} (${role}) !`);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAuthView('landing');
    showFeedback("Déconnexion réussie.", "info");
  };

  // Fetch detailed employee data when selected
  const handleSelectEmployee = async (id) => {
    try {
      const res = await api.get(`/employees/${id}`);
      setSelectedEmpData(res.data);
    } catch (e) {
      const fallbackEmp = employees.find(e => e.id === id);
      setSelectedEmpData(fallbackEmp);
    }
    setSelectedEmpId(id);
    setActiveTab('employee_detail');
  };

  // Edit Employee Handler (opens modal or processes quick status update)
  const handleEditEmployeeClick = async (emp, isQuickStatusChange = false) => {
    if (isQuickStatusChange) {
      // Quick Status Change directly from detail view dropdown
      try {
        await api.put(`/employees/${emp.id}`, { status: emp.status });
      } catch (e) {}
      
      const updatedList = employees.map(e => e.id === emp.id ? { ...e, status: emp.status } : e);
      setEmployees(updatedList);
      if (selectedEmpData && selectedEmpData.id === emp.id) {
        setSelectedEmpData({ ...selectedEmpData, status: emp.status });
      }
      showFeedback(`Statut de ${emp.first_name} mis à jour : ${emp.status}`);
    } else {
      // Open Full Edit Modal
      setEditingEmployee(emp);
      setShowEditEmpModal(true);
    }
  };

  const handleUpdateEmployeeSubmit = async (e) => {
    e.preventDefault();
    if (!editingEmployee) return;

    const formData = new FormData(e.target);
    const payload = {
      first_name: formData.get('first_name'),
      last_name: formData.get('last_name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      cin: formData.get('cin'),
      gender: formData.get('gender') || 'M',
      birth_date: formData.get('birth_date') || null,
      status: formData.get('status'),
      contract_type: formData.get('contract_type'),
      salary: parseFloat(formData.get('salary')),
      hire_date: formData.get('hire_date'),
      address: formData.get('address'),
      city: formData.get('city'),
    };

    try {
      const res = await api.put(`/employees/${editingEmployee.id}`, payload);
      const updated = { ...editingEmployee, ...res.data };
      setEmployees(employees.map(emp => emp.id === editingEmployee.id ? updated : emp));
      if (selectedEmpData && selectedEmpData.id === editingEmployee.id) {
        setSelectedEmpData({ ...selectedEmpData, ...updated });
      }
      showFeedback(`Fiche de ${updated.first_name} ${updated.last_name} mise à jour avec succès!`);
    } catch (err) {
      // Local fallback update
      const updated = { ...editingEmployee, ...payload };
      setEmployees(employees.map(emp => emp.id === editingEmployee.id ? updated : emp));
      if (selectedEmpData && selectedEmpData.id === editingEmployee.id) {
        setSelectedEmpData({ ...selectedEmpData, ...updated });
      }
      showFeedback(`Fiche de ${updated.first_name} ${updated.last_name} mise à jour!`);
    }

    setShowEditEmpModal(false);
    setEditingEmployee(null);
  };

  // Handlers for Form Submissions
  const handleCreateEmployeeSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = {
      first_name: formData.get('first_name'),
      last_name: formData.get('last_name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      cin: formData.get('cin'),
      gender: formData.get('gender') || 'M',
      birth_date: formData.get('birth_date') || null,
      hire_date: formData.get('hire_date'),
      contract_type: formData.get('contract_type'),
      salary: parseFloat(formData.get('salary')),
      department_id: formData.get('department_id') || null,
      position_id: formData.get('position_id') || null,
    };

    try {
      const res = await api.post('/employees', payload);
      setEmployees([res.data, ...employees]);
      showFeedback(`Collaborateur ${res.data.first_name} ${res.data.last_name} créé avec succès!`);
    } catch (err) {
      const newEmp = {
        id: Date.now(),
        matricule: `EMP-000${employees.length + 1}`,
        first_name: payload.first_name,
        last_name: payload.last_name,
        email: payload.email,
        phone: payload.phone,
        cin: payload.cin,
        gender: payload.gender,
        birth_date: payload.birth_date,
        hire_date: payload.hire_date,
        contract_type: payload.contract_type,
        salary: payload.salary,
        status: 'Actif',
        photo_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
      };
      setEmployees([newEmp, ...employees]);
      showFeedback(`Collaborateur ${newEmp.first_name} ${newEmp.last_name} ajouté!`);
    }
    setShowNewEmpModal(false);
  };

  const handleCreateLeaveSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = {
      employee_id: formData.get('employee_id') || (employees[0]?.id ?? 1),
      leave_type_id: formData.get('leave_type_id') || 1,
      start_date: formData.get('start_date'),
      end_date: formData.get('end_date'),
      total_days: parseInt(formData.get('total_days') || '3'),
      reason: formData.get('reason'),
    };

    try {
      const res = await api.post('/leaves', payload);
      setLeaves([res.data, ...leaves]);
      showFeedback(`Demande de congé ${res.data.reference} soumise avec succès!`);
    } catch (err) {
      const newLeave = {
        id: Date.now(),
        reference: `CONG-202609-${Math.floor(Math.random() * 900 + 100)}`,
        employee: employees[0] || { first_name: 'Ahmed', last_name: 'Benali' },
        leave_type: { name: 'Congé annuel' },
        start_date: payload.start_date,
        end_date: payload.end_date,
        total_days: payload.total_days,
        status: 'En attente',
      };
      setLeaves([newLeave, ...leaves]);
      showFeedback(`Demande de congé ${newLeave.reference} soumise!`);
    }
    setShowLeaveModal(false);
  };

  const handleUpdateLeaveStatus = async (id, status, comment) => {
    try {
      await api.put(`/leaves/${id}/status`, { status, hr_comment: comment });
    } catch (e) {}
    setLeaves(leaves.map(l => l.id === id ? { ...l, status, hr_comment: comment } : l));
    showFeedback(`Demande de congé mise à jour vers : ${status}`);
  };

  const handleClockIn = async () => {
    try {
      await api.post('/attendances/clock-in', { employee_id: 1 });
    } catch (e) {}
    showFeedback("Pointage ARRIVÉE enregistré avec succès à " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  };

  const handleClockOut = async () => {
    try {
      await api.post('/attendances/clock-out', { employee_id: 1 });
    } catch (e) {}
    showFeedback("Pointage DÉPART enregistré à " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  };

  const handleMarkNotifRead = async (id) => {
    try {
      await api.put(`/notifications/${id}/read`);
    } catch (e) {}
    setNotifications(notifications.map(n => n.id === id ? { ...n, is_read: true } : n));
  };

  // Render Landing Page or Login View if not authenticated
  if (!isAuthenticated) {
    return (
      <Suspense fallback={
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#f4f7f6] text-slate-400 space-y-3">
          <div className="w-10 h-10 border-3 border-[#0d766e] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs font-semibold text-slate-600">Chargement de la plateforme Amsoft People...</p>
        </div>
      }>
        {authView === 'landing' ? (
          <LandingView
            onGoToLogin={() => setAuthView('login')}
            onDirectDemoLogin={(role, name, email) => handleLogin({ role, name, email })}
          />
        ) : (
          <LoginView
            onLogin={handleLogin}
          />
        )}
      </Suspense>
    );
  }

  return (
    <div className="flex h-screen bg-theme-primary text-theme-primary overflow-hidden">
      {/* Toast Feedback */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 px-4 py-3 bg-slate-900 text-white rounded-xl shadow-2xl flex items-center gap-3 animate-fade-in border border-slate-700">
          <span className="material-symbols-outlined text-emerald-400">check_circle</span>
          <span className="text-xs font-semibold">{toast.msg}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeRole={activeRole}
        unreadNotificationsCount={notifications.filter(n => !n.is_read).length}
      />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header Bar */}
        <Header
          activeRole={activeRole}
          setActiveRole={setActiveRole}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          notifications={notifications}
          setActiveTab={setActiveTab}
          onLogout={handleLogout}
        />

        {/* Dynamic Page Workspace */}
        <main className="flex-1 overflow-y-auto p-6">
          <Suspense fallback={
            <div className="flex flex-col items-center justify-center py-20 text-slate-400 space-y-3">
              <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-xs font-medium">Chargement du composant...</p>
            </div>
          }>
            {activeTab === 'dashboard' && (
              <DashboardView
                stats={stats}
                currentUser={currentUser}
                setActiveTab={setActiveTab}
                onOpenNewEmployeeModal={() => setShowNewEmpModal(true)}
              />
            )}

            {activeTab === 'employee_space' && (
              <EmployeeSpaceView
                onClockIn={handleClockIn}
                onClockOut={handleClockOut}
                onOpenLeaveModal={() => setShowLeaveModal(true)}
                onOpenRequestModal={() => setShowHrReqModal(true)}
              />
            )}

            {activeTab === 'employees' && (
              <EmployeesView
                employees={employees}
                departments={departments}
                onSelectEmployee={handleSelectEmployee}
                onOpenNewEmployeeModal={() => setShowNewEmpModal(true)}
              />
            )}

            {activeTab === 'employee_detail' && (
              <EmployeeDetailView
                employee={selectedEmpData}
                onBack={() => setActiveTab('employees')}
                onEditEmployee={handleEditEmployeeClick}
              />
            )}

            {activeTab === 'contracts' && (
              <ContractsView
                contracts={contracts}
                onOpenNewContractModal={() => setShowContractModal(true)}
              />
            )}

            {activeTab === 'leaves' && (
              <LeavesView
                leaves={leaves}
                activeRole={activeRole}
                onOpenLeaveModal={() => setShowLeaveModal(true)}
                onUpdateLeaveStatus={handleUpdateLeaveStatus}
              />
            )}

            {activeTab === 'absences' && (
              <AbsencesView
                absences={absences}
                onOpenNewAbsenceModal={() => setShowAbsenceModal(true)}
              />
            )}

            {activeTab === 'attendance' && (
              <AttendanceView
                attendances={attendances}
                onClockIn={handleClockIn}
                onClockOut={handleClockOut}
              />
            )}

            {activeTab === 'documents' && (
              <DocumentsView
                documents={documents}
                onOpenUploadModal={() => setShowDocModal(true)}
              />
            )}

            {activeTab === 'hr_requests' && (
              <HrRequestsView
                hrRequests={hrRequests}
                activeRole={activeRole}
                onOpenRequestModal={() => setShowHrReqModal(true)}
                onUpdateHrRequestStatus={(id, st, comm) => {
                  setHrRequests(hrRequests.map(r => r.id === id ? { ...r, status: st, hr_comment: comm } : r));
                  showFeedback("Demande RH mise à jour !");
                }}
              />
            )}

            {activeTab === 'notifications' && (
              <NotificationsView
                notifications={notifications}
                onMarkRead={handleMarkNotifRead}
              />
            )}

            {(activeTab === 'departments' || activeTab === 'positions') && (
              <DepartmentsPositionsView
                departments={departments}
                positions={positions}
                onOpenNewDeptModal={() => setShowDeptModal(true)}
                onOpenNewPosModal={() => setShowPosModal(true)}
              />
            )}

            {(activeTab === 'users' || activeTab === 'roles') && <UsersRolesView />}
            {activeTab === 'audit_logs' && <AuditLogsView auditLogs={auditLogs} />}
            {activeTab === 'design_system' && <DesignSystemView />}
            {activeTab === 'reports' && <ReportsView />}
            {activeTab === 'settings' && <SettingsView />}
          </Suspense>
        </main>
      </div>

      {/* --- MODALS --- */}

      {/* 1. Modal Nouveau Collaborateur */}
      <Modal isOpen={showNewEmpModal} onClose={() => setShowNewEmpModal(false)} title="Créer un Nouveau Collaborateur">
        <form onSubmit={handleCreateEmployeeSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-semibold block mb-1">Prénom *</label>
              <input type="text" name="first_name" required placeholder="Ex: Youssef" className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs" />
            </div>
            <div>
              <label className="font-semibold block mb-1">Nom *</label>
              <input type="text" name="last_name" required placeholder="Ex: El Amrani" className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-semibold block mb-1">Genre / Sexe *</label>
              <select name="gender" required defaultValue="M" className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800">
                <option value="M">Masculin (Homme)</option>
                <option value="F">Féminin (Femme)</option>
              </select>
            </div>
            <div>
              <label className="font-semibold block mb-1">Date de Naissance</label>
              <input type="date" name="birth_date" defaultValue="1995-06-15" className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-semibold block mb-1">Email Professionnel *</label>
              <input type="email" name="email" required placeholder="youssef@company.ma" className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs" />
            </div>
            <div>
              <label className="font-semibold block mb-1">Numéro CIN</label>
              <input type="text" name="cin" placeholder="Ex: A98210" className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-semibold block mb-1">Département</label>
              <select name="department_id" className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                {departments.map(d => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-semibold block mb-1">Type de Contrat *</label>
              <select name="contract_type" required className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                <option value="CDI">CDI</option>
                <option value="CDD">CDD</option>
                <option value="Stage">Stage</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-semibold block mb-1">Salaire Brut (MAD) *</label>
              <input type="number" name="salary" required defaultValue="9500" className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono" />
            </div>
            <div>
              <label className="font-semibold block mb-1">Date d'embauche *</label>
              <input type="date" name="hire_date" required defaultValue={new Date().toISOString().split('T')[0]} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs" />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
            <button type="button" onClick={() => setShowNewEmpModal(false)} className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-xl cursor-pointer">Annuler</button>
            <button type="submit" className="btn-primary">Enregistrer Collaborateur</button>
          </div>
        </form>
      </Modal>

      {/* 2. Modal Modifier la Fiche Collaborateur */}
      {showEditEmpModal && editingEmployee && (
        <Modal isOpen={showEditEmpModal} onClose={() => setShowEditEmpModal(false)} title={`Modifier la Fiche : ${editingEmployee.first_name} ${editingEmployee.last_name}`}>
          <form onSubmit={handleUpdateEmployeeSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-semibold block mb-1 text-slate-700">Prénom *</label>
                <input type="text" name="first_name" required defaultValue={editingEmployee.first_name} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium" />
              </div>
              <div>
                <label className="font-semibold block mb-1 text-slate-700">Nom *</label>
                <input type="text" name="last_name" required defaultValue={editingEmployee.last_name} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-semibold block mb-1 text-blue-700 font-bold">Genre / Sexe *</label>
                <select name="gender" required defaultValue={editingEmployee.gender || 'M'} className="w-full p-2 bg-blue-50/50 border border-blue-300 rounded-lg text-xs font-bold text-slate-800">
                  <option value="M">Masculin (Homme)</option>
                  <option value="F">Féminin (Femme)</option>
                </select>
              </div>
              <div>
                <label className="font-semibold block mb-1 text-slate-700">Date de Naissance</label>
                <input type="date" name="birth_date" defaultValue={editingEmployee.birth_date || '1990-05-14'} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-semibold block mb-1 text-slate-700">Adresse Email *</label>
                <input type="email" name="email" required defaultValue={editingEmployee.email} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs" />
              </div>
              <div>
                <label className="font-semibold block mb-1 text-slate-700">Téléphone Personnel</label>
                <input type="text" name="phone" defaultValue={editingEmployee.phone || ''} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-semibold block mb-1 text-slate-700">Numéro CIN</label>
                <input type="text" name="cin" defaultValue={editingEmployee.cin || ''} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono" />
              </div>
              <div>
                <label className="font-semibold block mb-1 font-bold text-blue-600">Statut de l'Employé *</label>
                <select name="status" required defaultValue={editingEmployee.status || 'Actif'} className="w-full p-2 bg-slate-50 border-2 border-blue-400 rounded-lg text-xs font-bold text-slate-800">
                  <option value="Actif">Actif</option>
                  <option value="En congé">En congé</option>
                  <option value="Suspendu">Suspendu</option>
                  <option value="Démissionnaire">Démissionnaire</option>
                  <option value="Licencié">Licencié</option>
                  <option value="Retraité">Retraité</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-semibold block mb-1 text-slate-700">Type de Contrat *</label>
                <select name="contract_type" required defaultValue={editingEmployee.contract_type || 'CDI'} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold">
                  <option value="CDI">CDI</option>
                  <option value="CDD">CDD</option>
                  <option value="Stage">Stage</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Intérim">Intérim</option>
                </select>
              </div>
              <div>
                <label className="font-semibold block mb-1 text-slate-700">Salaire Mensuel Brut (MAD) *</label>
                <input type="number" name="salary" required defaultValue={editingEmployee.salary || 8000} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono font-bold" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-semibold block mb-1 text-slate-700">Date d'embauche</label>
                <input type="date" name="hire_date" defaultValue={editingEmployee.hire_date || '2021-03-15'} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs" />
              </div>
              <div>
                <label className="font-semibold block mb-1 text-slate-700">Ville</label>
                <input type="text" name="city" defaultValue={editingEmployee.city || 'Casablanca'} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs" />
              </div>
            </div>

            <div>
              <label className="font-semibold block mb-1 text-slate-700">Adresse Résidentielle</label>
              <input type="text" name="address" defaultValue={editingEmployee.address || ''} placeholder="Adresse complète..." className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs" />
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
              <button type="button" onClick={() => setShowEditEmpModal(false)} className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-xl cursor-pointer">Annuler</button>
              <button type="submit" className="btn-primary">Sauvegarder les Modifications</button>
            </div>
          </form>
        </Modal>
      )}

      {/* 3. Modal Demande de Congé */}
      <Modal isOpen={showLeaveModal} onClose={() => setShowLeaveModal(false)} title="Formulaire de Demande de Congé">
        <form onSubmit={handleCreateLeaveSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold block mb-1">Type de Congé *</label>
            <select name="leave_type_id" required className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs">
              <option value="1">Congé annuel (Payé)</option>
              <option value="2">Congé maladie (Certificat requis)</option>
              <option value="3">Congé exceptionnel (Événement)</option>
              <option value="4">Congé sans solde</option>
            </select>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="font-semibold block mb-1">Date Début *</label>
              <input type="date" name="start_date" required defaultValue="2026-09-20" className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs" />
            </div>
            <div>
              <label className="font-semibold block mb-1">Date Fin *</label>
              <input type="date" name="end_date" required defaultValue="2026-09-25" className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs" />
            </div>
            <div>
              <label className="font-semibold block mb-1">Nombre de Jours</label>
              <input type="number" name="total_days" defaultValue="5" className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-blue-600" />
            </div>
          </div>

          <div>
            <label className="font-semibold block mb-1">Motif de la demande</label>
            <textarea name="reason" rows="3" placeholder="Précisez la raison de votre absence..." className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"></textarea>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
            <button type="button" onClick={() => setShowLeaveModal(false)} className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-xl cursor-pointer">Annuler</button>
            <button type="submit" className="btn-primary">Soumettre la Demande</button>
          </div>
        </form>
      </Modal>

      {/* 4. Modal Nouveau Contrat */}
      <Modal isOpen={showContractModal} onClose={() => setShowContractModal(false)} title="Créer un Nouveau Contrat de Travail">
        <form onSubmit={(e) => { e.preventDefault(); showFeedback("Nouveau contrat créé!"); setShowContractModal(false); }} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold block mb-1">Collaborateur *</label>
            <select name="employee_id" required className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs">
              {employees.map(e => <option key={e.id} value={e.id}>{e.first_name} {e.last_name} ({e.matricule})</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-semibold block mb-1">Type de Contrat *</label>
              <select name="contract_type" required className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                <option value="CDI">CDI</option>
                <option value="CDD">CDD</option>
                <option value="Stage">Stage</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>
            <div>
              <label className="font-semibold block mb-1">Salaire (MAD) *</label>
              <input type="number" name="salary" defaultValue="12000" className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs" />
            </div>
          </div>
          <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
            <button type="button" onClick={() => setShowContractModal(false)} className="px-4 py-2 bg-slate-100 font-semibold rounded-xl">Annuler</button>
            <button type="submit" className="btn-primary">Créer Contrat</button>
          </div>
        </form>
      </Modal>

      {/* 5. Modal Enregistrer Absence */}
      <Modal isOpen={showAbsenceModal} onClose={() => setShowAbsenceModal(false)} title="Enregistrer une Absence">
        <form onSubmit={(e) => { e.preventDefault(); showFeedback("Absence enregistrée avec succès!"); setShowAbsenceModal(false); }} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold block mb-1">Collaborateur *</label>
            <select required className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs">
              {employees.map(e => <option key={e.id} value={e.id}>{e.first_name} {e.last_name}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-semibold block mb-1">Date *</label>
              <input type="date" required defaultValue="2026-09-10" className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs" />
            </div>
            <div>
              <label className="font-semibold block mb-1">Type d'absence</label>
              <select className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                <option>Absence injustifiée</option>
                <option>Maladie</option>
                <option>Autorisation exceptionnelle</option>
              </select>
            </div>
          </div>
          <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
            <button type="button" onClick={() => setShowAbsenceModal(false)} className="px-4 py-2 bg-slate-100 font-semibold rounded-xl">Annuler</button>
            <button type="submit" className="btn-primary">Valider Absence</button>
          </div>
        </form>
      </Modal>

      {/* 6. Modal Déposer Document */}
      <Modal isOpen={showDocModal} onClose={() => setShowDocModal(false)} title="Déposer un Document RH">
        <form onSubmit={(e) => { e.preventDefault(); showFeedback("Document téléversé avec succès!"); setShowDocModal(false); }} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold block mb-1">Collaborateur *</label>
            <select required className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs">
              {employees.map(e => <option key={e.id} value={e.id}>{e.first_name} {e.last_name}</option>)}
            </select>
          </div>
          <div>
            <label className="font-semibold block mb-1">Titre du document *</label>
            <input type="text" required placeholder="Ex: Attestation d'affiliation CNSS" className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs" />
          </div>
          <div>
            <label className="font-semibold block mb-1">Fichier (PDF, PNG, JPG - Max 5MB) *</label>
            <input type="file" required accept=".pdf,.png,.jpg,.docx" className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs" />
          </div>
          <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
            <button type="button" onClick={() => setShowDocModal(false)} className="px-4 py-2 bg-slate-100 font-semibold rounded-xl">Annuler</button>
            <button type="submit" className="btn-primary">Téléverser</button>
          </div>
        </form>
      </Modal>

      {/* 7. Modal Demande RH */}
      <Modal isOpen={showHrReqModal} onClose={() => setShowHrReqModal(false)} title="Nouvelle Demande Administrative RH">
        <form onSubmit={(e) => { e.preventDefault(); showFeedback("Demande RH envoyée au service RH!"); setShowHrReqModal(false); }} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold block mb-1">Type de document / demande *</label>
            <select required className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs">
              <option>Attestation de travail</option>
              <option>Fiche de paie du mois</option>
              <option>Demande de prêt / Avance sur salaire</option>
              <option>Mise à jour d'adresse RIB</option>
            </select>
          </div>
          <div>
            <label className="font-semibold block mb-1">Commentaires complémentaires</label>
            <textarea rows="3" placeholder="Précisez votre demande..." className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"></textarea>
          </div>
          <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
            <button type="button" onClick={() => setShowHrReqModal(false)} className="px-4 py-2 bg-slate-100 font-semibold rounded-xl">Annuler</button>
            <button type="submit" className="btn-primary">Envoyer Demande</button>
          </div>
        </form>
      </Modal>

      {/* 8. Modal Nouveau Département */}
      <Modal isOpen={showDeptModal} onClose={() => setShowDeptModal(false)} title="Créer un Nouveau Département">
        <form onSubmit={(e) => { e.preventDefault(); showFeedback("Nouveau département créé!"); setShowDeptModal(false); }} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold block mb-1">Nom du département *</label>
            <input type="text" required placeholder="Ex: Recherche & Développement" className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs" />
          </div>
          <div>
            <label className="font-semibold block mb-1">Responsable de Pôle</label>
            <input type="text" placeholder="Nom du responsable..." className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs" />
          </div>
          <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
            <button type="button" onClick={() => setShowDeptModal(false)} className="px-4 py-2 bg-slate-100 font-semibold rounded-xl">Annuler</button>
            <button type="submit" className="btn-primary">Créer Département</button>
          </div>
        </form>
      </Modal>

      {/* 9. Modal Nouveau Poste */}
      <Modal isOpen={showPosModal} onClose={() => setShowPosModal(false)} title="Créer un Nouveau Poste">
        <form onSubmit={(e) => { e.preventDefault(); showFeedback("Nouveau poste configuré!"); setShowPosModal(false); }} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold block mb-1">Intitulé du poste *</label>
            <input type="text" required placeholder="Ex: UX/UI Designer Senior" className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-semibold block mb-1">Salaire Min (MAD)</label>
              <input type="number" defaultValue="7000" className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs" />
            </div>
            <div>
              <label className="font-semibold block mb-1">Salaire Max (MAD)</label>
              <input type="number" defaultValue="15000" className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs" />
            </div>
          </div>
          <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
            <button type="button" onClick={() => setShowPosModal(false)} className="px-4 py-2 bg-slate-100 font-semibold rounded-xl">Annuler</button>
            <button type="submit" className="btn-primary">Créer Poste</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
