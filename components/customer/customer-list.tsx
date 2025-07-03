"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, Edit, Trash2, Mail, Phone, MapPin, Users } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

// Mock data - in real app this would come from API
const customers = [
  {
    id: "1",
    companyName: "SuperMart Chain",
    contactPerson: "Jennifer Wilson",
    email: "jennifer@supermart.com",
    phone: "+1 (555) 234-5678",
    customerType: "Retailer",
    status: "active",
    tier: "platinum",
    region: "Northeast",
    totalOrders: 156,
    totalSpent: 245000,
    lastOrder: "2024-01-15",
    joinedDate: "2022-03-15",
    location: "Boston, MA",
    description: "Large retail chain with 50+ locations across New England",
    creditLimit: 100000,
    paymentTerms: "Net 30",
  },
  {
    id: "2",
    companyName: "Metro Foods Inc.",
    contactPerson: "Robert Chen",
    email: "robert@metrofoods.com",
    phone: "+1 (555) 345-6789",
    customerType: "Wholesaler",
    status: "active",
    tier: "gold",
    region: "West",
    totalOrders: 89,
    totalSpent: 180000,
    lastOrder: "2024-01-14",
    joinedDate: "2022-08-20",
    location: "San Francisco, CA",
    description: "Regional food distributor serving Bay Area restaurants",
    creditLimit: 75000,
    paymentTerms: "Net 15",
  },
  {
    id: "3",
    companyName: "Fresh Market Co.",
    contactPerson: "Maria Garcia",
    email: "maria@freshmarket.com",
    phone: "+1 (555) 456-7890",
    customerType: "Retailer",
    status: "pending",
    tier: "silver",
    region: "Southwest",
    totalOrders: 23,
    totalSpent: 45000,
    lastOrder: "2024-01-10",
    joinedDate: "2023-11-01",
    location: "Phoenix, AZ",
    description: "Organic grocery store chain focusing on local produce",
    creditLimit: 50000,
    paymentTerms: "Net 30",
  },
  {
    id: "4",
    companyName: "Quick Bite Restaurants",
    contactPerson: "David Thompson",
    email: "david@quickbite.com",
    phone: "+1 (555) 567-8901",
    customerType: "Restaurant",
    status: "active",
    tier: "gold",
    region: "Southeast",
    totalOrders: 234,
    totalSpent: 125000,
    lastOrder: "2024-01-16",
    joinedDate: "2021-06-10",
    location: "Atlanta, GA",
    description: "Fast-casual restaurant chain with 25 locations",
    creditLimit: 60000,
    paymentTerms: "Net 15",
  },
  {
    id: "5",
    companyName: "E-Commerce Plus",
    contactPerson: "Lisa Park",
    email: "lisa@ecommerceplus.com",
    phone: "+1 (555) 678-9012",
    customerType: "Online",
    status: "active",
    tier: "platinum",
    region: "West",
    totalOrders: 445,
    totalSpent: 320000,
    lastOrder: "2024-01-17",
    joinedDate: "2020-12-05",
    location: "Seattle, WA",
    description: "Leading online marketplace for specialty products",
    creditLimit: 150000,
    paymentTerms: "Net 30",
  },
  {
    id: "6",
    companyName: "Regional Distributors LLC",
    contactPerson: "Michael Brown",
    email: "michael@regionaldist.com",
    phone: "+1 (555) 789-0123",
    customerType: "Distributor",
    status: "inactive",
    tier: "bronze",
    region: "Midwest",
    totalOrders: 67,
    totalSpent: 85000,
    lastOrder: "2023-12-20",
    joinedDate: "2023-02-15",
    location: "Chicago, IL",
    description: "Mid-size distributor serving independent retailers",
    creditLimit: 40000,
    paymentTerms: "Net 45",
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

export function CustomerList() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const router = useRouter()

  const handleCustomerDoubleClick = (customerId: string) => {
    router.push(`/dashboard/customers/${customerId}`)
  }

  if (viewMode === "list") {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {customers.length} customers • Double-click a customer to view details
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
          {customers.map((customer) => (
            <Card
              key={customer.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onDoubleClick={() => handleCustomerDoubleClick(customer.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="/placeholder.svg?height=48&width=48" />
                      <AvatarFallback>{getInitials(customer.companyName)}</AvatarFallback>
                    </Avatar>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">{customer.companyName}</h3>
                        <Badge className={getStatusColor(customer.status)}>{customer.status}</Badge>
                        <Badge className={getTierColor(customer.tier)}>{customer.tier}</Badge>
                      </div>

                      <p className="text-sm text-muted-foreground">Contact: {customer.contactPerson}</p>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {customer.email}
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {customer.phone}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {customer.location}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right text-sm">
                      <div className="font-medium">{customer.customerType}</div>
                      <div className="text-muted-foreground">{customer.region}</div>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/customers/${customer.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/customers/${customer.id}/edit`}>
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
                      <span className="text-muted-foreground">Total Orders: </span>
                      <span className="font-medium">{customer.totalOrders}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Total Spent: </span>
                      <span className="font-medium">${customer.totalSpent.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Last Order: </span>
                      <span className="font-medium">{customer.lastOrder}</span>
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
          Showing {customers.length} customers • Double-click a customer to view details
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
        {customers.map((customer) => (
          <Card
            key={customer.id}
            className="cursor-pointer hover:shadow-lg transition-all duration-200 group"
            onDoubleClick={() => handleCustomerDoubleClick(customer.id)}
          >
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="/placeholder.svg?height=48&width=48" />
                      <AvatarFallback className="text-sm">{getInitials(customer.companyName)}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1 flex-1">
                      <h3 className="font-semibold text-sm leading-tight line-clamp-2">{customer.companyName}</h3>
                      <div className="flex gap-1">
                        <Badge className={`${getStatusColor(customer.status)} text-xs`}>{customer.status}</Badge>
                        <Badge className={`${getTierColor(customer.tier)} text-xs`}>{customer.tier}</Badge>
                      </div>
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
                        <Link href={`/dashboard/customers/${customer.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/customers/${customer.id}/edit`}>
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
                    <Users className="h-3 w-3 text-muted-foreground" />
                    <span className="font-medium">{customer.customerType}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-3 w-3 text-muted-foreground" />
                    <span className="truncate">{customer.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-3 w-3 text-muted-foreground" />
                    <span>{customer.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    <span>{customer.location}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Contact:</span>
                    <span className="font-medium truncate ml-2">{customer.contactPerson}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Region:</span>
                    <span className="font-medium">{customer.region}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Orders:</span>
                    <span className="font-bold text-blue-600">{customer.totalOrders}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Spent:</span>
                    <span className="font-bold text-green-600">${customer.totalSpent.toLocaleString()}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-muted-foreground line-clamp-2">{customer.description}</p>

                {/* Footer */}
                <div className="pt-2 border-t">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Joined: {customer.joinedDate}</span>
                    <span>Last Order: {customer.lastOrder}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {customers.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mb-4" />
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">No customers found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search criteria or add new customers.</p>
              <div className="flex gap-2">
                <Button variant="outline" asChild>
                  <Link href="/dashboard/customers/onboard">Onboard Customer</Link>
                </Button>
                <Button asChild>
                  <Link href="/dashboard/customers/add">Add Customer</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
