"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, Edit, Trash2, Mail, Phone, Building2, Loader2, RefreshCw } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { vendorApi } from "@/lib/api"

interface Vendor {
  id: string
  legal_name: string
  dba_name?: string
  business_type: string
  status: string
  payment_terms?: string
  credit_limit?: number
  tax_id?: string
  website?: string
  description?: string
  created_at: string
  updated_at: string
  addresses?: Array<{
    id: string
    address_type: string
    address_line_1: string
    address_line_2?: string
    city: string
    state: string
    postal_code: string
    country: string
    is_primary: boolean
    contacts?: Array<{
      id: string
      name: string
      email: string
      phone: string
      title?: string
      is_primary: boolean
    }>
  }>
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
  const pathname = usePathname()

  const fetchVendors = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await vendorApi.getAll()
      setVendors(response)
    } catch (err) {
      console.error('Error fetching vendors:', err)
      setError('Failed to load vendors')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVendors()
  }, [])

  // Refresh vendors when component mounts or pathname changes
  useEffect(() => {
    fetchVendors()
  }, [pathname])

  const handleVendorDoubleClick = (vendorId: string) => {
    router.push(`/dashboard/vendors/${vendorId}`)
  }

  const getPrimaryContact = (vendor: Vendor) => {
    const primaryAddress = vendor.addresses?.find(addr => addr.is_primary)
    const primaryContact = primaryAddress?.contacts?.find(contact => contact.is_primary)
    return primaryContact
  }

  const getPrimaryAddress = (vendor: Vendor) => {
    return vendor.addresses?.find(addr => addr.is_primary)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading vendors...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Error loading vendors</h3>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={fetchVendors}>Try Again</Button>
          </div>
        </CardContent>
      </Card>
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
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={fetchVendors}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 mr-1 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
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
          {vendors.map((vendor) => {
            const primaryContact = getPrimaryContact(vendor)
            const primaryAddress = getPrimaryAddress(vendor)
            
            return (
              <Card
                key={vendor.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onDoubleClick={() => handleVendorDoubleClick(vendor.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src="/placeholder.svg" alt={vendor.legal_name} />
                        <AvatarFallback>{getInitials(vendor.legal_name)}</AvatarFallback>
                      </Avatar>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold">{vendor.legal_name}</h3>
                          {vendor.dba_name && (
                            <span className="text-sm text-muted-foreground">({vendor.dba_name})</span>
                          )}
                          <Badge className={getStatusColor(vendor.status)}>{vendor.status}</Badge>
                        </div>

                        {primaryContact && (
                          <p className="text-sm text-muted-foreground">Contact: {primaryContact.name}</p>
                        )}

                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          {primaryContact?.email && (
                            <div className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {primaryContact.email}
                            </div>
                          )}
                          {primaryContact?.phone && (
                            <div className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {primaryContact.phone}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right text-sm">
                        <div className="font-medium">{vendor.business_type}</div>
                        {vendor.payment_terms && (
                          <div className="text-muted-foreground">{vendor.payment_terms}</div>
                        )}
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
                      {vendor.credit_limit && (
                        <div>
                          <span className="text-muted-foreground">Credit Limit: </span>
                          <span className="font-medium">${vendor.credit_limit.toLocaleString()}</span>
                        </div>
                      )}
                      {primaryAddress && (
                        <div>
                          <span className="text-muted-foreground">Location: </span>
                          <span className="font-medium">{primaryAddress.city}, {primaryAddress.state}</span>
                        </div>
                      )}
                      <div>
                        <span className="text-muted-foreground">Created: </span>
                        <span className="font-medium">{new Date(vendor.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
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
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={fetchVendors}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 mr-1 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
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
        {vendors.map((vendor) => {
          const primaryContact = getPrimaryContact(vendor)
          const primaryAddress = getPrimaryAddress(vendor)
          
          return (
            <Card
              key={vendor.id || vendor.vendor_id}
              className="cursor-pointer hover:shadow-lg transition-all duration-200 group"
              onDoubleClick={() => handleVendorDoubleClick(vendor.id)}
            >
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src="/placeholder.svg" alt={vendor.legal_name} />
                        <AvatarFallback className="text-sm">{getInitials(vendor.legal_name)}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1 flex-1">
                        <h3 className="font-semibold text-sm leading-tight line-clamp-2">
                          {vendor.legal_name || vendor.trade_name || vendor.name || vendor.companyName || "Unnamed Vendor"}
                        </h3>
                        {vendor.dba_name && (
                          <p className="text-xs text-muted-foreground">{vendor.dba_name}</p>
                        )}
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
                      <span className="font-medium">{vendor.business_type}</span>
                    </div>
                    {primaryContact?.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        <span className="truncate">{primaryContact.email}</span>
                      </div>
                    )}
                    {primaryContact?.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        <span>{primaryContact.phone}</span>
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="space-y-2 text-xs">
                    {primaryContact && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Contact:</span>
                        <span className="font-medium truncate ml-2">{primaryContact.name}</span>
                      </div>
                    )}
                    {primaryAddress && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Location:</span>
                        <span className="font-medium">{primaryAddress.city}, {primaryAddress.state}</span>
                      </div>
                    )}
                    {vendor.credit_limit && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Credit Limit:</span>
                        <span className="font-bold text-green-600">${vendor.credit_limit.toLocaleString()}</span>
                      </div>
                    )}
                    {vendor.payment_terms && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Payment Terms:</span>
                        <span className="font-medium">{vendor.payment_terms}</span>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  {vendor.description && (
                    <p className="text-xs text-muted-foreground line-clamp-2">{vendor.description}</p>
                  )}

                  {/* Footer */}
                  <div className="pt-2 border-t">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Created: {new Date(vendor.created_at).toLocaleDateString()}</span>
                      <span>Updated: {vendor.updated_at ? new Date(vendor.updated_at).toLocaleDateString() : "N/A"}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
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
