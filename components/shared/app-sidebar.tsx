"use client"

import { Building2, Package, Users, Home, Settings, LogOut, ChevronRight, Shield, DollarSign } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock user context - in real app this would come from authentication
const mockUser = {
  name: "John Doe",
  role: "Admin", // Can be: Admin, Approver, Reviewer, Vendor
  profile: "Admin",
  email: "john@partnerportal.com",
}

// Define menu items based on user roles
const getMenuItemsForRole = (role: string) => {
  const baseItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
      roles: ["Admin", "Approver", "Reviewer", "Vendor"],
    },
  ]

  const vendorItems = [
    {
      title: "Item Management",
      icon: Package,
      roles: ["Admin", "Approver", "Reviewer", "Vendor"],
      items: [
        {
          title: "Add New Item",
          url: "/dashboard/items/add",
          roles: ["Admin", "Approver", "Reviewer", "Vendor"],
        },
        {
          title: "Review Items",
          url: "/dashboard/items",
          roles: ["Admin", "Approver", "Reviewer", "Vendor"],
        },
      ],
    },
  ]

  const costAndDealItems = [
    {
      title: "Cost & Deal Management",
      icon: DollarSign,
      roles: ["Admin", "Approver", "Reviewer"],
      items: [
        {
          title: "Cost Management",
          url: "/dashboard/cost-deals/cost-management",
          roles: ["Admin", "Approver", "Reviewer"],
        },
        {
          title: "Deal Management",
          url: "/dashboard/cost-deals/deal-management",
          roles: ["Admin", "Approver", "Reviewer"],
        },
        {
          title: "Bulk Cost Upload",
          url: "/dashboard/cost-deals/bulk-cost-upload",
          roles: ["Admin", "Approver"],
        },
        {
          title: "Bulk Deal Upload",
          url: "/dashboard/cost-deals/bulk-deal-upload",
          roles: ["Admin", "Approver"],
        },
      ],
    },
  ]

  const managementItems = [
    {
      title: "Vendor Management",
      icon: Building2,
      roles: ["Admin", "Approver", "Reviewer"],
      items: [
        {
          title: "Add New Vendor",
          url: "/dashboard/vendors/add",
          roles: ["Admin", "Approver"],
        },
        {
          title: "Vendor Management",
          url: "/dashboard/vendors",
          roles: ["Admin", "Approver", "Reviewer"],
        },
        {
          title: "Vendor Onboarding",
          url: "/dashboard/vendors/onboard",
          roles: ["Admin", "Approver"],
        },
      ],
    },
    {
      title: "Customer Management",
      icon: Users,
      roles: ["Admin", "Approver"],
      items: [
        {
          title: "Add New Customer",
          url: "/dashboard/customers/add",
          roles: ["Admin", "Approver"],
        },
        {
          title: "Customer Management",
          url: "/dashboard/customers",
          roles: ["Admin", "Approver"],
        },
        {
          title: "Customer Onboarding",
          url: "/dashboard/customers/onboard",
          roles: ["Admin", "Approver"],
        },
      ],
    },
  ]

  const adminItems = [
    {
      title: "Administration",
      icon: Shield,
      roles: ["Admin"],
      items: [
        {
          title: "User Management",
          url: "/dashboard/admin/users",
          roles: ["Admin"],
        },
        {
          title: "Role Management",
          url: "/dashboard/admin/roles",
          roles: ["Admin"],
        },
        {
          title: "Profile Management",
          url: "/dashboard/admin/profiles",
          roles: ["Admin"],
        },
        {
          title: "Parameterization",
          url: "/dashboard/admin/parameterization",
          roles: ["Admin"],
        },
      ],
    },
  ]

  // Filter items based on user role
  const filterItemsByRole = (items: any[]) => {
    return items
      .filter((item) => item.roles.includes(role))
      .map((item) => ({
        ...item,
        items: item.items ? item.items.filter((subItem: any) => subItem.roles.includes(role)) : undefined,
      }))
  }

  let allItems = [...baseItems, ...vendorItems, ...costAndDealItems]

  if (role !== "Vendor") {
    allItems = [...allItems, ...managementItems]
  }

  if (role === "Admin") {
    allItems = [...allItems, ...adminItems]
  }

  return filterItemsByRole(allItems)
}

export function AppSidebar() {
  const menuItems = getMenuItemsForRole(mockUser.role)

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="flex items-center gap-2">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Building2 className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">PartnerPortal</span>
                  <span className="truncate text-xs">Vendor Management</span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.items ? (
                    <Collapsible className="group/collapsible">
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton tooltip={item.title}>
                          {item.icon && <item.icon />}
                          <span>{item.title}</span>
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <a href={subItem.url}>
                                  <span>{subItem.title}</span>
                                </a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton tooltip={item.title} asChild>
                      <a href={item.url}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback className="rounded-lg">
                      {mockUser.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{mockUser.name}</span>
                    <span className="truncate text-xs">{mockUser.role}</span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
