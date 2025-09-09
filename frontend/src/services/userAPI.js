import api from './api';

export const userAPI = {
  getProfile: () => api.get('/user/profile')
};