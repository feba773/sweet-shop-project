// src/api/sweets.ts
import api from './api';

export const purchaseSweet = (id: string) => {
  return api.post(`/sweets/${id}/purchase`);
};