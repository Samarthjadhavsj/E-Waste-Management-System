// API Configuration
const API_BASE_URL = 'http://localhost:3000/api';

// Get token from localStorage
const getToken = () => localStorage.getItem('ewaste_token');

// API Helper function
async function apiCall(endpoint, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Auth API
const authAPI = {
  register: (userData) => apiCall('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData)
  }),

  login: (credentials) => apiCall('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  })
};

// User API
const userAPI = {
  getProfile: () => apiCall('/users/profile'),

  claimDevice: (deviceData) => apiCall('/users/claim-device', {
    method: 'POST',
    body: JSON.stringify(deviceData)
  }),

  getTransactions: () => apiCall('/users/transactions')
};

// Facility API
const facilityAPI = {
  getAll: () => apiCall('/facilities'),

  getNearest: (lat, lng, limit = 5) => 
    apiCall(`/facilities/nearest?lat=${lat}&lng=${lng}&limit=${limit}`)
};

// Product API
const productAPI = {
  getAll: () => apiCall('/products'),

  getById: (id) => apiCall(`/products/${id}`)
};

// Order API
const orderAPI = {
  create: (orderData) => apiCall('/orders', {
    method: 'POST',
    body: JSON.stringify(orderData)
  }),

  getMyOrders: () => apiCall('/orders/my-orders')
};

// Export APIs
window.ewasteAPI = {
  auth: authAPI,
  user: userAPI,
  facility: facilityAPI,
  product: productAPI,
  order: orderAPI
};
