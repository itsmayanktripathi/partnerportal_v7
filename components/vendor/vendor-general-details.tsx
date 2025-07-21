"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, ExternalLink, Mail, Phone, Globe } from "lucide-react"

interface VendorGeneralDetailsProps {
  vendor: {
    id: string
    name: string
    code: string
    status: string
    type: string
    email: string
    phone: string
    website: string
    taxId: string
    paymentTerms: string
    currency: string
    creditLimit: number
    description: string
    createdAt: string
    updatedAt: string
  }
}

export function VendorGeneralDetails({ vendor }: VendorGeneralDetailsProps) {
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Basic Information */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Basic Information</CardTitle>
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Status</span>
              <Badge variant={vendor.status === "active" ? "default" : "secondary"}>{vendor.status}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Type</span>
              <span className="text-sm text-muted-foreground">{vendor.type}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Vendor Code</span>
              <span className="text-sm text-muted-foreground">{vendor.code}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Tax ID</span>
              <span className="text-sm text-muted-foreground">{vendor.taxId}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <a href={`mailto:${vendor.email}`} className="text-sm text-blue-600 hover:underline">
                {vendor.email}
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <a href={`tel:${vendor.phone}`} className="text-sm text-blue-600 hover:underline">
                {vendor.phone}
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <a
                href={vendor.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline flex items-center"
              >
                {vendor.website}
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Financial Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Financial Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Payment Terms</span>
              <span className="text-sm text-muted-foreground">{vendor.paymentTerms}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Currency</span>
              <span className="text-sm text-muted-foreground">{vendor.currency}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Credit Limit</span>
              <span className="text-sm text-muted-foreground">
                {formatCurrency(vendor.creditLimit, vendor.currency)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">System Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Created</span>
              <span className="text-sm text-muted-foreground">{formatDate(vendor.createdAt)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Last Updated</span>
              <span className="text-sm text-muted-foreground">{formatDate(vendor.updatedAt)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Description */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{vendor.description}</p>
        </CardContent>
      </Card>
    </div>
  )
}
