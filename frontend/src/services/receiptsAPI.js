import api from './api';

export const receiptsAPI = {
  getReceipt: (id) => api.get(`/receipts/${id}`, { responseType: 'blob' })
};