import axios from 'axios';
import { setupAdminMockInterceptors } from './mock-api';

export const instance = axios.create({
  baseURL: import.meta.env.VITE_REQUEST_URL || 'https://ssalon.co.kr/api',
  timeout: 10000,
  withCredentials: true,
});

// Enable mocking always for client-side pages preview
setupAdminMockInterceptors(instance);
