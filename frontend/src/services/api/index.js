import axios from 'axios';
import { API_CONFIG } from './config';
import { setupInterceptors } from './interceptors';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
});

// Setup interceptors
setupInterceptors(api);

export default api;