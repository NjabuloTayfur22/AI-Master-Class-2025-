const API_BASE = import.meta.env.PROD 
  ? '/api'
  : 'http://localhost:8888/api';

export const api = {
  async getUser() {
    const response = await fetch(`${API_BASE}/user`);
    if (!response.ok) throw new Error('Failed to fetch user');
    return response.json();
  },

  async getHealth() {
    const response = await fetch(`${API_BASE}/health`);
    if (!response.ok) throw new Error('Failed to fetch health status');
    return response.json();
  }
};
