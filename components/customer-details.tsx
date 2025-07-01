"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mail, Phone, Globe, MapPin, DollarSign, FileText, Settings, Users, TrendingUp } from "lucide-react"

interface CustomerDetailsProps {
  customerId: string
}

// Mock data - in real app this would be fetched based on customerId
const customerData = {
  id: "1",
  companyName: "SuperMart Chain",
  contactPerson: "Jennifer Wilson",
  email: "jennifer@supermart.com",
  phone: "+1 (555) 234-5678",
  alternatePhone: "+1 (555) 234-5679",
  website: "https://www.supermart.com",
  taxId: "12-3456789",
  customerType: "Retailer",
  status: "active",
  tier: "platinum",

  // Address
  address: "123 Business Street",
  city: "Boston",
  state: "MA",
  zipCode: "02101",
  country: "United States",
  region: "Northeast",

  // Business Details
  businessDescription:
    "Large retail chain with 50+ locations across New England, specializing in consumer goods and groceries.",
  industry: "Retail",
  annualRevenue: "50m-100m",
  employeeCount: "501-1000",

  // Financial Information
  creditLimit: 100000,
  paymentTerms: "Net 30",
  taxExempt: false,

  // Settings
  isActive: true,
  allowOnlineOrdering: true,
  requireApproval: false,

  // Stats
  totalOrders: 156,
  totalSpent: 245000,
  averageOrderValue: 1571,
  lastOrder: "2024-01-15",
  joinedDate: "2022-03-15",
  location: "Boston, MA",
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800"
    case "inactive":
      return "bg-gray-100 text-gray-800"
    case "pending":
      return "bg-yellow-100 text-yellow-800"
    case "suspended":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getTierColor = (tier: string) => {
  switch (tier) {
    case "platinum":
      return "bg-purple-100 text-purple-800"
    case "gold":
      return "bg-yellow-100 text-yellow-800"
    case "silver":
      return "bg-gray-100 text-gray-800"
    case "bronze":
      return "bg-orange-100 text-orange-800"
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

export function CustomerDetails({ customerId }: CustomerDetailsProps) {
  const customer = customerData // In real app, fetch based on customerId

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/placeholder.svg?height=64&width=64" />
                <AvatarFallback className="text-lg">{getInitials(customer.companyName)}</AvatarFallback>
              </Avatar>

              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold">{customer.companyName}</h2>
                  <Badge className={getStatusColor(customer.status)}>{customer.status}</Badge>
                  <Badge className={getTierColor(customer.tier)}>{customer.tier}</Badge>
                </div>

                <p className="text-lg text-muted-foreground">Primary Contact: {customer.contactPerson}</p>

                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    {customer.email}
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    {customer.phone}
                  </div>
                  {customer.website && (
                    <div className="flex items-center gap-1">
                      <Globe className="h-4 w-4" />
                      <a
                        href={customer.website}
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
              <div className="font-medium">{customer.customerType}</div>
              <div className="text-muted-foreground">Joined {customer.joinedDate}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold text-blue-600">{customer.totalOrders}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Since joining</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Spent</p>
                <p className="text-2xl font-bold text-green-600">${customer.totalSpent.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Lifetime value</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Order Value</p>
                <p className="text-2xl font-bold text-purple-600">${customer.averageOrderValue}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Per order</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Credit Limit</p>
                <p className="text-2xl font-bold text-orange-600">${customer.creditLimit.toLocaleString()}</p>
              </div>
              <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-600 font-bold text-sm">$</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Available credit</p>
          </CardContent>
        </Card>
      </div>

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
              <p>{customer.phone}</p>
            </div>
            {customer.alternatePhone && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">Alternate Phone</label>
                <p>{customer.alternatePhone}</p>
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-muted-foreground">Email</label>
              <p>{customer.email}</p>
            </div>
            {customer.website && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">Website</label>
                <p>
                  <a
                    href={customer.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {customer.website}
                  </a>
                </p>
              </div>
            )}
            {customer.taxId && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">Tax ID</label>
                <p>{customer.taxId}</p>
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
              <p>{customer.address}</p>
              <p>
                {customer.city}, {customer.state} {customer.zipCode}
              </p>
              <p>{customer.country}</p>
              <div className="mt-3">
                <label className="text-sm font-medium text-muted-foreground">Region</label>
                <p>{customer.region}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Business Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Business Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Customer Type</label>
              <p>{customer.customerType}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Industry</label>
              <p>{customer.industry}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Description</label>
              <p className="text-sm">{customer.businessDescription}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Annual Revenue</label>
              <p>{customer.annualRevenue}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Employee Count</label>
              <p>{customer.employeeCount}</p>
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
              <p>{customer.paymentTerms}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Credit Limit</label>
              <p className="text-lg font-semibold">${customer.creditLimit.toLocaleString()}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Tax Exempt</label>
              <Badge variant={customer.taxExempt ? "default" : "secondary"}>{customer.taxExempt ? "Yes" : "No"}</Badge>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Last Order</label>
              <p>{customer.lastOrder}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Customer Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span>Active Customer</span>
              <Badge variant={customer.isActive ? "default" : "secondary"}>{customer.isActive ? "Yes" : "No"}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Online Ordering</span>
              <Badge variant={customer.allowOnlineOrdering ? "default" : "secondary"}>
                {customer.allowOnlineOrdering ? "Enabled" : "Disabled"}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Require Approval</span>
              <Badge variant={customer.requireApproval ? "default" : "secondary"}>
                {customer.requireApproval ? "Yes" : "No"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
