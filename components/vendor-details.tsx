"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mail, Phone, Globe, MapPin, DollarSign, FileText, Settings } from "lucide-react"

interface VendorDetailsProps {
  vendorId: string
}

// Mock data - in real app this would be fetched based on vendorId
const vendorData = {
  id: "1",
  companyName: "ABC Supply Co.",
  contactPerson: "John Smith",
  email: "john@abcsupply.com",
  phone: "+1 (555) 123-4567",
  alternatePhone: "+1 (555) 123-4568",
  website: "https://www.abcsupply.com",
  taxId: "12-3456789",
  businessType: "Manufacturer",
  status: "active",

  // Address
  address: "123 Business Street",
  city: "New York",
  state: "NY",
  zipCode: "10001",
  country: "United States",

  // Business Details
  businessDescription:
    "Leading manufacturer of industrial supplies and equipment with over 20 years of experience in the market.",
  productsServices: "Industrial tools, safety equipment, maintenance supplies, custom manufacturing solutions",
  certifications: "ISO 9001:2015, OSHA Compliance, EPA Certified",
  paymentTerms: "Net 30",
  creditLimit: 50000,

  // Settings
  isActive: true,
  allowProposals: true,
  requireApproval: true,

  // Stats
  proposalsCount: 12,
  approvedProposals: 8,
  pendingProposals: 4,
  totalOrders: 156,
  lastActivity: "2024-01-15",
  joinedDate: "2023-03-15",
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

export function VendorDetails({ vendorId }: VendorDetailsProps) {
  const vendor = vendorData // In real app, fetch based on vendorId

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/placeholder.svg?height=64&width=64" />
                <AvatarFallback className="text-lg">{getInitials(vendor.companyName)}</AvatarFallback>
              </Avatar>

              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold">{vendor.companyName}</h2>
                  <Badge className={getStatusColor(vendor.status)}>{vendor.status}</Badge>
                </div>

                <p className="text-lg text-muted-foreground">Primary Contact: {vendor.contactPerson}</p>

                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    {vendor.email}
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    {vendor.phone}
                  </div>
                  {vendor.website && (
                    <div className="flex items-center gap-1">
                      <Globe className="h-4 w-4" />
                      <a
                        href={vendor.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Website
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="text-right text-sm">
              <div className="font-medium">{vendor.businessType}</div>
              <div className="text-muted-foreground">Joined {vendor.joinedDate}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Primary Phone</label>
              <p>{vendor.phone}</p>
            </div>
            {vendor.alternatePhone && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">Alternate Phone</label>
                <p>{vendor.alternatePhone}</p>
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-muted-foreground">Email</label>
              <p>{vendor.email}</p>
            </div>
            {vendor.website && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">Website</label>
                <p>
                  <a
                    href={vendor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {vendor.website}
                  </a>
                </p>
              </div>
            )}
            {vendor.taxId && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">Tax ID</label>
                <p>{vendor.taxId}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Address Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Address Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <p>{vendor.address}</p>
              <p>
                {vendor.city}, {vendor.state} {vendor.zipCode}
              </p>
              <p>{vendor.country}</p>
            </div>
          </CardContent>
        </Card>

        {/* Business Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Business Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Business Type</label>
              <p>{vendor.businessType}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Description</label>
              <p className="text-sm">{vendor.businessDescription}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Products & Services</label>
              <p className="text-sm">{vendor.productsServices}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Certifications</label>
              <p className="text-sm">{vendor.certifications}</p>
            </div>
          </CardContent>
        </Card>

        {/* Financial Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Financial Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Payment Terms</label>
              <p>{vendor.paymentTerms}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Credit Limit</label>
              <p className="text-lg font-semibold">${vendor.creditLimit.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Vendor Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{vendor.proposalsCount}</div>
              <div className="text-sm text-muted-foreground">Total Proposals</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{vendor.approvedProposals}</div>
              <div className="text-sm text-muted-foreground">Approved</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{vendor.pendingProposals}</div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{vendor.totalOrders}</div>
              <div className="text-sm text-muted-foreground">Total Orders</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Vendor Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span>Active Vendor</span>
              <Badge variant={vendor.isActive ? "default" : "secondary"}>{vendor.isActive ? "Yes" : "No"}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Allow Proposals</span>
              <Badge variant={vendor.allowProposals ? "default" : "secondary"}>
                {vendor.allowProposals ? "Yes" : "No"}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Require Approval</span>
              <Badge variant={vendor.requireApproval ? "default" : "secondary"}>
                {vendor.requireApproval ? "Yes" : "No"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
