# Components Structure

This directory contains all the React components organized by functionality and module.

## Directory Structure

```
components/
├── vendor/           # Vendor-related components
├── customer/         # Customer-related components  
├── item/            # Item/product-related components
├── cost-deal/       # Cost and deal management components
├── auth/            # Authentication components
├── admin/           # Administration components
├── shared/          # Shared/common components
├── ui/              # UI components (shadcn/ui)
└── index.ts         # Main export file
```

## Component Categories

### Vendor Components (`/vendor`)
- `vendor-list.tsx` - Display list of vendors
- `add-vendor-form.tsx` - Form to add new vendors
- `vendor-details.tsx` - Detailed vendor information
- `vendor-filters.tsx` - Vendor search and filtering
- `vendor-onboarding-flow.tsx` - Vendor onboarding process
- `edit-vendor-form.tsx` - Form to edit existing vendors

### Customer Components (`/customer`)
- `customer-list.tsx` - Display list of customers
- `add-customer-form.tsx` - Form to add new customers
- `customer-details.tsx` - Detailed customer information
- `customer-onboarding-flow.tsx` - Customer onboarding process
- `customer-search.tsx` - Customer search functionality

### Item Components (`/item`)
- `item-grid.tsx` - Display grid of items/products
- `item-search.tsx` - Item search functionality
- `item-general-form.tsx` - General item form
- `item-general-tab.tsx` - General item information tab
- `item-palletization-tab.tsx` - Palletization information tab
- `item-assortment-tab.tsx` - Assortment information tab
- `item-cost-deal-tab.tsx` - Cost and deal information tab
- `item-detail-tabs.tsx` - Tab container for item details
- `add-item-tabs.tsx` - Tab container for adding items
- `mass-add-items.tsx` - Bulk item upload functionality

### Cost/Deal Components (`/cost-deal`)
- `cost-deal-dashboard.tsx` - Cost and deal dashboard
- `cost-management.tsx` - Cost management interface
- `deal-management.tsx` - Deal management interface
- `bulk-cost-upload.tsx` - Bulk cost upload functionality
- `bulk-deal-upload.tsx` - Bulk deal upload functionality

### Auth Components (`/auth`)
- `login-form.tsx` - User login form
- `signup-form.tsx` - User registration form

### Admin Components (`/admin`)
- `admin-dashboard.tsx` - Admin dashboard
- `user-management.tsx` - User management interface
- `role-management.tsx` - Role management interface
- `profile-management.tsx` - Profile management interface
- `parameterization.tsx` - System parameterization

### Shared Components (`/shared`)
- `app-sidebar.tsx` - Main application sidebar
- `dashboard-cards.tsx` - Dashboard card components
- `recent-activity.tsx` - Recent activity display
- `theme-provider.tsx` - Theme provider component

### UI Components (`/ui`)
- shadcn/ui components (button, card, input, etc.)

## Import Patterns

### Individual Component Imports
```typescript
import { VendorList } from '@/components/vendor/vendor-list'
import { CustomerList } from '@/components/customer/customer-list'
import { ItemGrid } from '@/components/item/item-grid'
```

### Category Imports
```typescript
import { VendorList, AddVendorForm } from '@/components/vendor'
import { CustomerList, AddCustomerForm } from '@/components/customer'
```

### All Components Import
```typescript
import { VendorList, CustomerList, ItemGrid } from '@/components'
```

## Best Practices

1. **Component Organization**: Keep related components in the same folder
2. **Naming Convention**: Use kebab-case for file names
3. **Export Pattern**: Export components from index files for easy imports
4. **Type Safety**: Use TypeScript interfaces for component props
5. **Reusability**: Place shared components in the `/shared` folder
6. **UI Components**: Use shadcn/ui components from `/ui` folder

## Adding New Components

1. Create the component file in the appropriate category folder
2. Export the component from the category's `index.ts` file
3. Update this README if adding a new category
4. Follow the existing naming and structure patterns

## Migration Notes

- All import paths have been updated to reflect the new structure
- Components are now organized by functionality for better maintainability
- Index files provide backward compatibility and easier imports 