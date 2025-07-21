import { buildApiUrl, API_ENDPOINTS, config, getApiV1Url } from './config';

// Common headers for API requests
const getDefaultHeaders = (): HeadersInit => ({
  'Content-Type': 'application/json',
});

// Add authentication header if token is available
const getAuthHeaders = (token?: string): HeadersInit => {
  const headers = getDefaultHeaders();
  if (token) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

// Generic API request function
export const apiRequest = async <T = any>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...getDefaultHeaders(),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// Authenticated API request function
export const authenticatedApiRequest = async <T = any>(
  url: string,
  token: string,
  options: RequestInit = {}
): Promise<T> => {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...getAuthHeaders(token),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// Vendor API functions
export const vendorApi = {
  // Get all vendors
  getAll: async (params?: Record<string, string>) => {
    const url = getApiV1Url('vendors');
    return apiRequest(url);
  },

  // Get vendor by ID
  getById: async (id: string) => {
    const url = getApiV1Url(`vendors/${id}`);
    return apiRequest(url);
  },

  // Create new vendor
  create: async (data: any) => {
    const url = getApiV1Url('vendors');
    return apiRequest(url, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Update vendor
  update: async (id: string, data: any) => {
    const url = getApiV1Url(`vendors/${id}`);
    return apiRequest(url, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Delete vendor
  delete: async (id: string) => {
    const url = getApiV1Url(`vendors/${id}`);
    return apiRequest(url, {
      method: 'DELETE',
    });
  },

  // Onboard vendor
  onboard: async (data: any) => {
    const url = getApiV1Url('vendors/onboard');
    return apiRequest(url, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// Customer API functions
export const customerApi = {
  // Get all customers
  getAll: async (params?: Record<string, string>) => {
    const url = buildApiUrl('customers', 'list', params);
    return apiRequest(url);
  },

  // Get customer by ID
  getById: async (id: string) => {
    const url = buildApiUrl('customers', 'get', { id });
    return apiRequest(url);
  },

  // Create new customer
  create: async (data: any) => {
    const url = buildApiUrl('customers', 'create');
    return apiRequest(url, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Update customer
  update: async (id: string, data: any) => {
    const url = buildApiUrl('customers', 'update', { id });
    return apiRequest(url, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Delete customer
  delete: async (id: string) => {
    const url = buildApiUrl('customers', 'delete', { id });
    return apiRequest(url, {
      method: 'DELETE',
    });
  },

  // Onboard customer
  onboard: async (data: any) => {
    const url = buildApiUrl('customers', 'onboard');
    return apiRequest(url, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// Item API functions
export const itemApi = {
  // Get all items
  getAll: async (params?: Record<string, string>) => {
    const url = buildApiUrl('items', 'list', params);
    return apiRequest(url);
  },

  // Get item by ID
  getById: async (id: string) => {
    const url = buildApiUrl('items', 'get', { id });
    return apiRequest(url);
  },

  // Create new item
  create: async (data: any) => {
    const url = buildApiUrl('items', 'create');
    return apiRequest(url, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Update item
  update: async (id: string, data: any) => {
    const url = buildApiUrl('items', 'update', { id });
    return apiRequest(url, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Delete item
  delete: async (id: string) => {
    const url = buildApiUrl('items', 'delete', { id });
    return apiRequest(url, {
      method: 'DELETE',
    });
  },

  // Bulk upload items
  bulkUpload: async (data: any) => {
    const url = buildApiUrl('items', 'bulkUpload');
    return apiRequest(url, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// Cost/Deal API functions
export const costDealApi = {
  // Get all cost deals
  getAll: async (params?: Record<string, string>) => {
    const url = buildApiUrl('costDeals', 'list', params);
    return apiRequest(url);
  },

  // Get cost deal by ID
  getById: async (id: string) => {
    const url = buildApiUrl('costDeals', 'get', { id });
    return apiRequest(url);
  },

  // Create new cost deal
  create: async (data: any) => {
    const url = buildApiUrl('costDeals', 'create');
    return apiRequest(url, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Update cost deal
  update: async (id: string, data: any) => {
    const url = buildApiUrl('costDeals', 'update', { id });
    return apiRequest(url, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Delete cost deal
  delete: async (id: string) => {
    const url = buildApiUrl('costDeals', 'delete', { id });
    return apiRequest(url, {
      method: 'DELETE',
    });
  },

  // Bulk upload cost deals
  bulkUpload: async (data: any) => {
    const url = buildApiUrl('costDeals', 'bulkUpload');
    return apiRequest(url, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// Auth API functions
export const authApi = {
  // Login
  login: async (credentials: { email: string; password: string }) => {
    const url = buildApiUrl('auth', 'login');
    return apiRequest(url, {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  // Register
  register: async (userData: any) => {
    const url = buildApiUrl('auth', 'register');
    return apiRequest(url, {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Logout
  logout: async (token: string) => {
    const url = buildApiUrl('auth', 'logout');
    return authenticatedApiRequest(url, token, {
      method: 'POST',
    });
  },

  // Refresh token
  refresh: async (refreshToken: string) => {
    const url = buildApiUrl('auth', 'refresh');
    return apiRequest(url, {
      method: 'POST',
      body: JSON.stringify({ refresh_token: refreshToken }),
    });
  },
};

// System API functions
export const systemApi = {
  // Health check
  health: async () => {
    const url = buildApiUrl('system', 'health');
    return apiRequest(url);
  },

  // Get system config
  getConfig: async () => {
    const url = buildApiUrl('system', 'config');
    return apiRequest(url);
  },

  // Get system logs
  getLogs: async (token: string) => {
    const url = buildApiUrl('system', 'logs');
    return authenticatedApiRequest(url, token);
  },
}; 