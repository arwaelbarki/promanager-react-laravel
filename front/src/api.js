import axios from 'axios';

// API Axios Instance
const api = axios.create({
  baseURL: 'http://localhost:8000/api/hr',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

// Interceptor for active role headers
api.interceptors.request.use((config) => {
  const currentRole = localStorage.getItem('hr_active_role') || 'RH';
  const currentUser = localStorage.getItem('hr_active_user') || 'Fatine Alaoui';
  config.headers['X-User-Role'] = currentRole;
  config.headers['X-User-Name'] = currentUser;
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
