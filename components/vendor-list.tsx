"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, Edit, Trash2, Mail, Phone, Building2 } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

// Mock data - in real app this would come from API
const vendors = [
  {
    id: "1",
    companyName: "ABC Supply Co.",
    contactPerson: "John Smith",
    email: "john@abcsupply.com",
    phone: "+1 (555) 123-4567",
    businessType: "Manufacturer",
    status: "active",
    paymentTerms: "Net 30",
    creditLimit: 50000,
    lastActivity: "2024-01-15",
    proposalsCount: 12,
    location: "New York, NY",
    description: "Leading manufacturer of industrial supplies and equipment",
    joinedDate: "2023-03-15",
  },
  {
    id: "2",
    companyName: "Global Distributors Inc.",
    contactPerson: "Sarah Johnson",
    email: "sarah@globaldist.com",
    phone: "+1 (555) 987-6543",
    businessType: "Distributor",
    status: "active",
    paymentTerms: "Net 15",
    creditLimit: 75000,
    lastActivity: "2024-01-14",
    proposalsCount: 8,
    location: "Los Angeles, CA",
    description: "International distribution network for premium products",
    joinedDate: "2023-01-20",
  },
  {
    id: "3",
    companyName: "Premium Foods LLC",
    contactPerson: "Mike Chen",
    email: "mike@premiumfoods.com",
    phone: "+1 (555) 456-7890",
    businessType: "Supplier",
    status: "pending",
    paymentTerms: "Net 45",
    creditLimit: 25000,
    lastActivity: "2024-01-10",
    proposalsCount: 3,
    location: "Chicago, IL",
    description: "Specialty food supplier with organic certifications",
    joinedDate: "2024-01-01",
  },
  {
    id: "4",
    companyName: "Tech Solutions Pro",
    contactPerson: "Emily Davis",
    email: "emily@techsolutions.com",
    phone: "+1 (555) 321-0987",
    businessType: "Service Provider",
    status: "inactive",
    paymentTerms: "Net 30",
    creditLimit: 15000,
    lastActivity: "2023-12-28",
    proposalsCount: 0,
    location: "Austin, TX",
    description: "Technology solutions and consulting services",
    joinedDate: "2023-06-10",
  },
  {
    id: "5",
    companyName: "Eco Materials Corp",
    contactPerson: "David Wilson",
    email: "david@ecomaterials.com",
    phone: "+1 (555) 654-3210",
    businessType: "Manufacturer",
    status: "active",
    paymentTerms: "Net 30",
    creditLimit: 40000,
    lastActivity: "2024-01-13",
    proposalsCount: 6,
    location: "Portland, OR",
    description: "Sustainable building materials and eco-friendly products",
    joinedDate: "2023-08-15",
  },
  {
    id: "6",
    companyName: "Quality Imports Ltd",
    contactPerson: "Lisa Rodriguez",
    email: "lisa@qualityimports.com",
    phone: "+1 (555) 789-0123",
    businessType: "Wholesaler",
    status: "active",
    paymentTerms: "Net 15",
    creditLimit: 60000,
    lastActivity: "2024-01-16",
    proposalsCount: 15,
    location: "Miami, FL",
    description: "International import/export with focus on quality goods",
    joinedDate: "2023-04-22",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800"
    case "inactive":
      return "bg-gray-100 text-gray-800"
    case "pending":
      return "bg-yellow-100 text-yellow-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}

export function VendorList() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const router = useRouter()

  const handleVendorDoubleClick = (vendorId: string) => {
    router.push(`/dashboard/vendors/${vendorId}`)
  }

  if (viewMode === "list") {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {vendors.length} vendors • Double-click a vendor to view details
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">View:</span>
            <Button variant="ghost" size="sm" onClick={() => setViewMode("grid")}>
              Grid
            </Button>
            <Button variant="outline" size="sm">
              List
            </Button>
          </div>
        </div>

        <div className="grid gap-4">
          {vendors.map((vendor) => (
            <Card
              key={vendor.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onDoubleClick={() => handleVendorDoubleClick(vendor.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="/placeholder.svg?height=48&width=48" />
                      <AvatarFallback>{getInitials(vendor.companyName)}</AvatarFallback>
                    </Avatar>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">{vendor.companyName}</h3>
                        <Badge className={getStatusColor(vendor.status)}>{vendor.status}</Badge>
                      </div>

                      <p className="text-sm text-muted-foreground">Contact: {vendor.contactPerson}</p>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {vendor.email}
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {vendor.phone}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right text-sm">
                      <div className="font-medium">{vendor.businessType}</div>
                      <div className="text-muted-foreground">{vendor.paymentTerms}</div>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/vendors/${vendor.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/vendors/${vendor.id}/edit`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-6 text-sm">
                    <div>
                      <span className="text-muted-foreground">Credit Limit: </span>
                      <span className="font-medium">${vendor.creditLimit.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Active Proposals: </span>
                      <span className="font-medium">{vendor.proposalsCount}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Last Activity: </span>
                      <span className="font-medium">{vendor.lastActivity}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {vendors.length} vendors • Double-click a vendor to view details
        </p>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">View:</span>
          <Button variant="outline" size="sm">
            Grid
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setViewMode("list")}>
            List
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vendors.map((vendor) => (
          <Card
            key={vendor.id}
            className="cursor-pointer hover:shadow-lg transition-all duration-200 group"
            onDoubleClick={() => handleVendorDoubleClick(vendor.id)}
          >
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="/placeholder.svg?height=48&width=48" />
                      <AvatarFallback className="text-sm">{getInitials(vendor.companyName)}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1 flex-1">
                      <h3 className="font-semibold text-sm leading-tight line-clamp-2">{vendor.companyName}</h3>
                      <Badge className={`${getStatusColor(vendor.status)} text-xs`}>{vendor.status}</Badge>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreHorizontal className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/vendors/${vendor.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/vendors/${vendor.id}/edit`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-3 w-3 text-muted-foreground" />
                    <span className="font-medium">{vendor.businessType}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-3 w-3 text-muted-foreground" />
                    <span className="truncate">{vendor.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-3 w-3 text-muted-foreground" />
                    <span>{vendor.phone}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Contact:</span>
                    <span className="font-medium truncate ml-2">{vendor.contactPerson}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Location:</span>
                    <span className="font-medium">{vendor.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Credit Limit:</span>
                    <span className="font-bold text-green-600">${vendor.creditLimit.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Proposals:</span>
                    <span className={`font-medium ${vendor.proposalsCount > 0 ? "text-blue-600" : "text-gray-500"}`}>
                      {vendor.proposalsCount}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-muted-foreground line-clamp-2">{vendor.description}</p>

                {/* Footer */}
                <div className="pt-2 border-t">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Joined: {vendor.joinedDate}</span>
                    <span>Active: {vendor.lastActivity}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {vendors.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">No vendors found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search criteria or add new vendors.</p>
              <Button asChild>
                <Link href="/dashboard/vendors/add">Add New Vendor</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
