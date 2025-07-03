"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit, Trash2, Shield, Users } from "lucide-react"

// Mock role data with permissions
const roles = [
  {
    id: "1",
    name: "Admin",
    description: "Full system access and administration",
    userCount: 1,
    permissions: {
      dashboard: true,
      vendors: true,
      items: true,
      customers: true,
      customerOnboarding: true,
      vendorOnboarding: true,
      administration: true,
      reports: true,
      settings: true,
    },
    color: "purple",
  },
  {
    id: "2",
    name: "Approver",
    description: "Can approve proposals and manage customer relationships",
    userCount: 1,
    permissions: {
      dashboard: true,
      vendors: true,
      items: true,
      customers: true,
      customerOnboarding: true,
      vendorOnboarding: false,
      administration: false,
      reports: true,
      settings: false,
    },
    color: "blue",
  },
  {
    id: "3",
    name: "Reviewer",
    description: "Can review and process vendor proposals",
    userCount: 1,
    permissions: {
      dashboard: true,
      vendors: true,
      items: true,
      customers: false,
      customerOnboarding: false,
      vendorOnboarding: false,
      administration: false,
      reports: true,
      settings: false,
    },
    color: "yellow",
  },
  {
    id: "4",
    name: "Vendor",
    description: "Limited access for vendor partners",
    userCount: 2,
    permissions: {
      dashboard: true,
      vendors: false,
      items: true, // Limited view
      customers: false,
      customerOnboarding: false,
      vendorOnboarding: false,
      administration: false,
      reports: false,
      settings: false,
    },
    color: "green",
  },
]

const permissionLabels = {
  dashboard: "Dashboard Access",
  vendors: "Vendor Management",
  items: "Item Management",
  customers: "Customer Management",
  customerOnboarding: "Customer Onboarding",
  vendorOnboarding: "Vendor Onboarding",
  administration: "Administration",
  reports: "Reports & Analytics",
  settings: "System Settings",
}

const getRoleColor = (color: string) => {
  switch (color) {
    case "purple":
      return "bg-purple-100 text-purple-800"
    case "blue":
      return "bg-blue-100 text-blue-800"
    case "yellow":
      return "bg-yellow-100 text-yellow-800"
    case "green":
      return "bg-green-100 text-green-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function RoleManagement() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      {/* Roles Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        {roles.map((role) => (
          <Card
            key={role.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setSelectedRole(role.id)}
          >
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <Badge className={getRoleColor(role.color)}>{role.name}</Badge>
                <p className="text-2xl font-bold">{role.userCount}</p>
                <p className="text-sm text-muted-foreground">Users</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Roles Table */}
      <Card>
        <CardHeader>
          <CardTitle>Role Configuration</CardTitle>
          <CardDescription>Manage roles and their permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Users</TableHead>
                <TableHead>Key Permissions</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4" />
                      <Badge className={getRoleColor(role.color)}>{role.name}</Badge>
                    </div>
                  </TableCell>
                  <TableCell>{role.description}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{role.userCount}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {Object.entries(role.permissions)
                        .filter(([_, hasPermission]) => hasPermission)
                        .slice(0, 3)
                        .map(([permission]) => (
                          <Badge key={permission} variant="outline" className="text-xs">
                            {permissionLabels[permission as keyof typeof permissionLabels]}
                          </Badge>
                        ))}
                      {Object.values(role.permissions).filter(Boolean).length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{Object.values(role.permissions).filter(Boolean).length - 3} more
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Role
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Shield className="mr-2 h-4 w-4" />
                          Manage Permissions
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600" disabled={role.userCount > 0}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Role
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Permission Matrix */}
      <Card>
        <CardHeader>
          <CardTitle>Permission Matrix</CardTitle>
          <CardDescription>Overview of permissions across all roles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Permission</th>
                  {roles.map((role) => (
                    <th key={role.id} className="text-center p-2">
                      <Badge className={getRoleColor(role.color)}>{role.name}</Badge>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.entries(permissionLabels).map(([permission, label]) => (
                  <tr key={permission} className="border-b">
                    <td className="p-2 font-medium">{label}</td>
                    {roles.map((role) => (
                      <td key={role.id} className="text-center p-2">
                        <Checkbox checked={role.permissions[permission as keyof typeof role.permissions]} disabled />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
