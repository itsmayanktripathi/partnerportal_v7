# Configuration System

This document explains how to use the configuration system for the PartnerPortal application.

## Overview

The application uses a centralized configuration system that allows you to easily manage environment-specific settings for both frontend and backend components.

## Backend Configuration

### Configuration File: `backend/config.py`

The backend configuration is managed through the `Settings` class in `backend/config.py`. This class handles:

- **API Configuration**: Project name, version, description
- **Server Configuration**: Host, port, debug mode
- **Database Configuration**: MySQL connection settings
- **CORS Configuration**: Allowed origins for cross-origin requests
- **Security Configuration**: Secret keys, token expiration
- **File Upload Configuration**: Max file size, upload directory
- **Email Configuration**: SMTP settings
- **Logging Configuration**: Log level and file paths

### Environment Variables

Create a `.env` file in the `backend/` directory using `backend/env.example` as a template:

```bash
# Copy the example file
cp backend/env.example backend/.env

# Edit the .env file with your settings
```

### Key Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `ENVIRONMENT` | Environment (development/production) | development |
| `HOST` | Server host | 0.0.0.0 |
| `PORT` | Server port | 8000 |
| `DEBUG` | Debug mode | True |
| `MYSQL_USER` | Database username | root |
| `MYSQL_PASSWORD` | Database password | rootpwd01 |
| `MYSQL_HOST` | Database host | localhost |
| `MYSQL_PORT` | Database port | 3306 |
| `MYSQL_DB` | Database name | partner_portal |
| `SECRET_KEY` | Secret key for JWT | your-secret-key-here |
| `FRONTEND_URL` | Frontend URL for CORS | http://localhost:3000 |

### Using Configuration in Backend Code

```python
from .config import settings

# Access configuration values
database_url = settings.DATABASE_URL
api_base_url = settings.API_BASE_URL
cors_origins = settings.CORS_ORIGINS
```

## Frontend Configuration

### Configuration File: `lib/config.ts`

The frontend configuration is managed through the `Config` interface and `config` object in `lib/config.ts`. This handles:

- **API Configuration**: Base URL, API version
- **App Configuration**: App name, version, description
- **Environment Detection**: Development, staging, production
- **Feature Flags**: Enable/disable features
- **External Services**: Analytics, monitoring services

### Environment Variables

Create a `.env.local` file in the root directory using `env.example` as a template:

```bash
# Copy the example file
cp env.example .env.local

# Edit the .env.local file with your settings
```

### Key Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_BASE_URL` | Backend API base URL | http://localhost:8000 |
| `NEXT_PUBLIC_APP_NAME` | Application name | PartnerPortal |
| `NEXT_PUBLIC_APP_VERSION` | Application version | 1.0.0 |
| `NEXT_PUBLIC_ENABLE_DEBUG_MODE` | Enable debug mode | true (dev) |

### Using Configuration in Frontend Code

```typescript
import { config, getApiUrl, buildApiUrl, API_ENDPOINTS } from '@/lib/config';

// Access configuration values
const apiUrl = config.apiBaseUrl;
const appName = config.appName;

// Build API URLs
const vendorsUrl = getApiUrl('vendors');
const vendorUrl = buildApiUrl('vendors', 'get', { id: '123' });
```

## API Utilities

### File: `lib/api.ts`

The `lib/api.ts` file provides utility functions for making API calls:

- **Generic API requests**: `apiRequest()`, `authenticatedApiRequest()`
- **Vendor API**: `vendorApi.getAll()`, `vendorApi.create()`, etc.
- **Customer API**: `customerApi.getAll()`, `customerApi.create()`, etc.
- **Item API**: `itemApi.getAll()`, `itemApi.create()`, etc.
- **Auth API**: `authApi.login()`, `authApi.register()`, etc.

### Using API Utilities

```typescript
import { vendorApi, customerApi, authApi } from '@/lib/api';

// Create a vendor
const newVendor = await vendorApi.create({
  companyName: 'ABC Supply Co.',
  contactPerson: 'John Smith',
  email: 'john@abcsupply.com',
  // ... other fields
});

// Get all customers
const customers = await customerApi.getAll();

// Login
const authResponse = await authApi.login({
  email: 'user@example.com',
  password: 'password123'
});
```

## Deployment Configuration

### Development

For development, use the default configuration:

```bash
# Backend
cd backend
python -m uvicorn main:app --reload

# Frontend
npm run dev
```

### Production

For production deployment:

1. **Backend Environment Variables**:
   ```bash
   ENVIRONMENT=production
   HOST=0.0.0.0
   PORT=8000
   DEBUG=False
   SECRET_KEY=your-production-secret-key
   FRONTEND_URL=https://yourdomain.com
   ```

2. **Frontend Environment Variables**:
   ```bash
   NEXT_PUBLIC_API_BASE_URL=https://api.yourdomain.com
   NEXT_PUBLIC_ENABLE_DEBUG_MODE=false
   ```

3. **CORS Configuration**: Update `CORS_ORIGINS` in backend config to include your production frontend URL.

## Environment-Specific Configurations

### Development
- Debug mode enabled
- Local database
- CORS allows localhost
- Detailed error messages

### Staging
- Debug mode disabled
- Staging database
- CORS allows staging URLs
- Limited error details

### Production
- Debug mode disabled
- Production database
- CORS allows production URLs
- Minimal error details
- HTTPS required

## Best Practices

1. **Never commit sensitive data**: Use environment variables for secrets
2. **Use different configs per environment**: Separate dev, staging, and production configs
3. **Validate configuration**: Ensure required values are present
4. **Use type-safe configuration**: Leverage TypeScript interfaces
5. **Centralize API calls**: Use the provided API utilities
6. **Document changes**: Update this file when adding new configuration options

## Troubleshooting

### Common Issues

1. **Configuration not loading**: Ensure `.env` files are in the correct location
2. **CORS errors**: Check that frontend URL is in `CORS_ORIGINS`
3. **API calls failing**: Verify `NEXT_PUBLIC_API_BASE_URL` is correct
4. **Database connection issues**: Check database environment variables

### Debug Configuration

To debug configuration issues:

```typescript
// Frontend
console.log('Config:', config);
console.log('API URL:', getApiUrl('vendors'));

// Backend
print(f"Database URL: {settings.DATABASE_URL}")
print(f"API Base URL: {settings.API_BASE_URL}")
``` 