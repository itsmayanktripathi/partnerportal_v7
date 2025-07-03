"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, Edit, Trash2, Mail, Phone, Building2, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { vendorApi } from "@/lib/api"

// Vendor interface matching the backend model
interface Vendor {
  id: number
  companyName: string
  contactPerson: string
  email: string
  phone: string
  alternatePhone?: string
  website?: string
  taxId?: string
  businessType?: string
  address?: string
  city?: string
  state?: string
  zipCode?: string
  country?: string
  businessDescription?: string
  productsServices?: string
  certifications?: string
  paymentTerms?: string
  creditLimit?: string
  isActive: boolean
  allowProposals: boolean
  requireApproval: boolean
}

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
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        setLoading(true)
        const data = await vendorApi.getAll()
        setVendors(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch vendors')
      } finally {
        setLoading(false)
      }
    }

    fetchVendors()
  }, [])

  const handleVendorDoubleClick = (vendorId: number) => {
    router.push(`/dashboard/vendors/${vendorId}`)
  }

  // Helper function to get status from isActive
  const getVendorStatus = (vendor: Vendor) => {
    return vendor.isActive ? "active" : "inactive"
  }

  // Helper function to format credit limit
  const formatCreditLimit = (creditLimit: string | undefined) => {
    if (!creditLimit) return "$0"
    const num = parseFloat(creditLimit)
    return isNaN(num) ? "$0" : `$${num.toLocaleString()}`
  }

  // Helper function to get location
  const getLocation = (vendor: Vendor) => {
    const parts = [vendor.city, vendor.state, vendor.country].filter(Boolean)
    return parts.length > 0 ? parts.join(", ") : "Location not specified"
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading vendors...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    )
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
                        <Badge className={getStatusColor(getVendorStatus(vendor))}>{getVendorStatus(vendor)}</Badge>
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
                      <span className="font-medium">{formatCreditLimit(vendor.creditLimit)}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Business Type: </span>
                      <span className="font-medium">{vendor.businessType || "Not specified"}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Payment Terms: </span>
                      <span className="font-medium">{vendor.paymentTerms || "Not specified"}</span>
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
                      <Badge className={`${getStatusColor(getVendorStatus(vendor))} text-xs`}>{getVendorStatus(vendor)}</Badge>
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
                    <span className="font-medium">{getLocation(vendor)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Credit Limit:</span>
                    <span className="font-bold text-green-600">{formatCreditLimit(vendor.creditLimit)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payment Terms:</span>
                    <span className="font-medium">{vendor.paymentTerms || "Not specified"}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-muted-foreground line-clamp-2">{vendor.businessDescription || "No description available"}</p>

                {/* Footer */}
                <div className="pt-2 border-t">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Status: {getVendorStatus(vendor)}</span>
                    <span>Proposals: {vendor.allowProposals ? "Allowed" : "Not allowed"}</span>
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
