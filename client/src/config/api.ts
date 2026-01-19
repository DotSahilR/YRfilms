const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

export default API_BASE_URL;

export const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem('yrfilms_token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const getAuthHeadersForFormData = (): HeadersInit => {
  const token = localStorage.getItem('yrfilms_token');
  return {
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};
