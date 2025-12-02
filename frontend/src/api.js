import axios from 'axios';

// Read base URL from env, or fall back to current origin (same domain)
const rawApiBase = import.meta.env.VITE_API_URL;

const API_BASE =
  (typeof rawApiBase === 'string' && rawApiBase.trim() !== '')
    ? rawApiBase.replace(/\/+$/, '') // remove trailing slash
    : (typeof window !== 'undefined' ? window.location.origin : '');

// Axios instance for normal HTTP requests
export const api = axios.create({
  baseURL: API_BASE,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// SSE URL builder
export function sseUrl(tenantId) {
  const token = localStorage.getItem('token');

  // /events will be relative to API_BASE (backend domain or same origin)
  const url = new URL('/events', API_BASE);

  if (tenantId) url.searchParams.set('tenantId', tenantId);
  if (token) url.searchParams.set('token', token);

  return url.toString();
}
