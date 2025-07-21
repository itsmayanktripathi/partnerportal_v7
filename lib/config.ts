// Frontend configuration
export interface Config {
  // API Configuration
  apiBaseUrl: string;
  apiVersion: string;
  
  // App Configuration
  appName: string;
  appVersion: string;
  appDescription: string;
  
  // Environment
  environment: 'development' | 'staging' | 'production';
  
  // Feature Flags
  features: {
    enableNotifications: boolean;
    enableFileUpload: boolean;
    enableAnalytics: boolean;
    enableDebugMode: boolean;
  };
  
  // External Services
  services: {
    analytics?: string;
    sentry?: string;
    intercom?: string;
  };
}

// Environment detection
const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

// Default configuration
const defaultConfig: Config = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000',
  apiVersion: 'v1',
  appName: 'PartnerPortal',
  appVersion: '1.0.0',
  appDescription: 'Vendor Management System',
  environment: isDevelopment ? 'development' : isProduction ? 'production' : 'staging',
  features: {
    enableNotifications: true,
    enableFileUpload: true,
    enableAnalytics: !isDevelopment,
    enableDebugMode: isDevelopment,
  },
  services: {
    analytics: process.env.NEXT_PUBLIC_ANALYTICS_URL,
    sentry: process.env.NEXT_PUBLIC_SENTRY_DSN,
    intercom: process.env.NEXT_PUBLIC_INTERCOM_APP_ID,
  },
};

// Production overrides
if (isProduction) {
  defaultConfig.apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.partnerportal.com';
  defaultConfig.features.enableDebugMode = false;
}

// Export the configuration
export const config: Config = defaultConfig;

// Helper functions
export const getApiUrl = (endpoint: string): string => {
  const baseUrl = config.apiBaseUrl.replace(/\/$/, ''); // Remove trailing slash
  const cleanEndpoint = endpoint.replace(/^\//, ''); // Remove leading slash
  return `${baseUrl}/${cleanEndpoint}`;
};

export const getApiV1Url = (endpoint: string): string => {
  return getApiUrl(`api/${config.apiVersion}/${endpoint}`);
};

// Common API endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
  },
  
  // Vendor endpoints
  vendors: {
    list: '/vendors',
    create: '/vendors',
    get: (id: string) => `/vendors/${id}`,
    update: (id: string) => `/vendors/${id}`,
    delete: (id: string) => `/vendors/${id}`,
    onboard: '/vendors/onboard',
  },
  
  // Customer endpoints
  customers: {
    list: '/customers',
    create: '/customers',
    get: (id: string) => `/customers/${id}`,
    update: (id: string) => `/customers/${id}`,
    delete: (id: string) => `/customers/${id}`,
    onboard: '/customers/onboard',
  },
  
  // Item endpoints
  items: {
    list: '/items',
    create: '/items',
    get: (id: string) => `/items/${id}`,
    update: (id: string) => `/items/${id}`,
    delete: (id: string) => `/items/${id}`,
    bulkUpload: '/items/bulk-upload',
  },
  
  // Cost/Deal endpoints
  costDeals: {
    list: '/cost-deals',
    create: '/cost-deals',
    get: (id: string) => `/cost-deals/${id}`,
    update: (id: string) => `/cost-deals/${id}`,
    delete: (id: string) => `/cost-deals/${id}`,
    bulkUpload: '/cost-deals/bulk-upload',
  },
  
  // User management endpoints
  users: {
    list: '/users',
    create: '/users',
    get: (id: string) => `/users/${id}`,
    update: (id: string) => `/users/${id}`,
    delete: (id: string) => `/users/${id}`,
    roles: '/users/roles',
    permissions: '/users/permissions',
  },
  
  // System endpoints
  system: {
    health: '/health',
    config: '/config',
    logs: '/logs',
  },
} as const;

// Type-safe API URL builder
export const buildApiUrl = <T extends keyof typeof API_ENDPOINTS>(
  section: T,
  endpoint: keyof typeof API_ENDPOINTS[T],
  params?: Record<string, string>
): string => {
  const baseEndpoint = API_ENDPOINTS[section][endpoint];
  
  if (typeof baseEndpoint === 'function') {
    // Handle dynamic endpoints that need parameters
    if (!params?.id) {
      throw new Error(`Missing required parameter 'id' for endpoint ${String(endpoint)}`);
    }
    return getApiUrl(baseEndpoint(params.id));
  }
  
  let url = getApiUrl(baseEndpoint as string);
  
  // Add query parameters if provided
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value);
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }
  
  return url;
}; 