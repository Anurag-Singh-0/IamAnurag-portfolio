import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

// Add a request interceptor to attach the JWT token
api.interceptors.request.use(
  (config) => {
    // Get the token from localStorage
    const token = localStorage.getItem('adminToken');
    
    // If token exists, attach it to the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --- Portfolio Data ---
export const fetchProjects = () => api.get('/projects');
export const fetchSkills = () => api.get('/skills');
export const fetchAchievements = () => api.get('/achievements');
export const fetchAbout = () => api.get('/about');

// --- Admin ---
export const adminLogin = (data) => api.post('/admin/login', data);

// --- Admin CRUD ---
export const adminFetchProjects = () => api.get('/projects');
export const adminCreateProject = (data) => api.post('/projects', data);
export const adminUpdateProject = (id, data) => api.put(`/projects/${id}`, data);
export const adminDeleteProject = (id) => api.delete(`/projects/${id}`);

export const adminFetchSkills = () => api.get('/skills');
export const adminCreateSkill = (data) => api.post('/skills', data);
export const adminUpdateSkill = (id, data) => api.put(`/skills/${id}`, data);
export const adminDeleteSkill = (id) => api.delete(`/skills/${id}`);

export const adminFetchAchievements = () => api.get('/achievements');
export const adminCreateAchievement = (data) => api.post('/achievements', data);
export const adminUpdateAchievement = (id, data) => api.put(`/achievements/${id}`, data);
export const adminDeleteAchievement = (id) => api.delete(`/achievements/${id}`);

export const adminFetchAbout = () => api.get('/about');
export const adminUpdateAbout = (data) => api.put('/about', data);

// --- Image Upload ---
export const uploadImage = (file) => {
  const formData = new FormData();
  formData.append('image', file);
  
  // Note: The interceptor will also automatically attach the token to this request
  return api.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export default api;