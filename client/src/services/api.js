const configuredApiUrl = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/+$/, '');
const API_URL = configuredApiUrl.endsWith('/api') ? configuredApiUrl : `${configuredApiUrl}/api`;
let pendingRequests = 0;
const requestListeners = new Set();
const notifyRequests = () => requestListeners.forEach((listener) => listener());
export const subscribePendingRequests = (listener) => { requestListeners.add(listener); return () => requestListeners.delete(listener); };
export const getPendingRequestCount = () => pendingRequests;

export async function api(path, options = {}) {
  pendingRequests += 1;
  notifyRequests();
  const token = localStorage.getItem('typepath_token');
  try {
    const response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...(token && { Authorization: `Bearer ${token}` }), ...options.headers }
    });
    if (response.status === 204) return null;
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      if (response.status === 401 && token) {
        localStorage.removeItem('typepath_token');
        window.dispatchEvent(new Event('typepath:unauthorized'));
      }
      throw new Error(data.message || 'Something went wrong');
    }
    return data;
  } finally {
    pendingRequests = Math.max(0, pendingRequests - 1);
    notifyRequests();
  }
}
