"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, Edit, Eye, Trash2, Percent, Calendar, Users } from "lucide-react"

// Mock data - in real app this would come from API
const dealsData = [
  {
    id: "1",
    name: "Winter Electronics Sale",
    type: "percentage",
    discount: 15,
    items: 25,
    startDate: "2024-01-01",
    endDate: "2024-01-31",
    status: "active",
    totalSales: 12500,
    usageCount: 145,
    category: "Electronics",
  },
  {
    id: "2",
    name: "Coffee Bundle Deal",
    type: "bundle",
    discount: 20,
    items: 8,
    startDate: "2024-01-10",
    endDate: "2024-01-25",
    status: "active",
    totalSales: 3200,
    usageCount: 67,
    category: "Food & Beverage",
  },
  {
    id: "3",
    name: "Industrial Supplies Promo",
    type: "volume",
    discount: 10,
    items: 12,
    startDate: "2024-01-05",
    endDate: "2024-01-20",
    status: "expiring",
    totalSales: 5800,
    usageCount: 89,
    category: "Industrial",
  },
  {
    id: "4",
    name: "New Year Flash Sale",
    type: "fixed",
    discount: 5,
    items: 35,
    startDate: "2023-12-28",
    endDate: "2024-01-05",
    status: "expired",
    totalSales: 8900,
    usageCount: 234,
    category: "Mixed",
  },
  {
    id: "5",
    name: "Spring Cleaning Special",
    type: "percentage",
    discount: 25,
    items: 18,
    startDate: "2024-02-01",
    endDate: "2024-02-28",
    status: "scheduled",
    totalSales: 0,
    usageCount: 0,
    category: "Industrial",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800"
    case "scheduled":
      return "bg-blue-100 text-blue-800"
    case "expiring":
      return "bg-yellow-100 text-yellow-800"
    case "expired":
      return "bg-gray-100 text-gray-800"
    case "paused":
      return "bg-orange-100 text-orange-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getDealTypeIcon = (type: string) => {
  switch (type) {
    case "percentage":
      return <Percent className="h-4 w-4" />
    case "fixed":
      return <span className="text-sm font-bold">$</span>
    case "bundle":
      return <Users className="h-4 w-4" />
    case "volume":
      return <span className="text-sm font-bold">#</span>
    default:
      return <Percent className="h-4 w-4" />
  }
}

export function DealManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredData = dealsData.filter((deal) => {
    const matchesSearch = deal.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || deal.status === statusFilter
    const matchesType = typeFilter === "all" || deal.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Deals</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dealsData.filter((deal) => deal.status === "active").length}</div>
            <p className="text-xs text-muted-foreground">Currently running</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <span className="text-sm font-bold">$</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${dealsData.reduce((sum, deal) => sum + deal.totalSales, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">From all deals</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usage Count</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dealsData.reduce((sum, deal) => sum + deal.usageCount, 0)}</div>
            <p className="text-xs text-muted-foreground">Total redemptions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {dealsData.filter((deal) => deal.status === "expiring").length}
            </div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Deal List */}
      <Card>
        <CardHeader>
          <CardTitle>Deal Management</CardTitle>
          <CardDescription>Monitor and manage promotional deals and discounts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search deals..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="expiring">Expiring</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="percentage">Percentage</SelectItem>
                <SelectItem value="fixed">Fixed Amount</SelectItem>
                <SelectItem value="bundle">Bundle Deal</SelectItem>
                <SelectItem value="volume">Volume Discount</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Deals Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredData.map((deal) => (
              <Card key={deal.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h3 className="font-semibold text-sm leading-tight">{deal.name}</h3>
                        <div className="flex items-center gap-2">
                          <Badge className={`${getStatusColor(deal.status)} text-xs`}>{deal.status}</Badge>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            {getDealTypeIcon(deal.type)}
                            <span className="capitalize">{deal.type}</span>
                          </div>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Deal
                          </DropdownMenuItem>
                          <DropdownMenuItem>Duplicate</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {/* Discount Display */}
                    <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                      <div className="text-3xl font-bold text-blue-600">
                        {deal.type === "fixed" ? "$" : ""}
                        {deal.discount}
                        {deal.type === "percentage" ? "%" : ""}
                      </div>
                      <div className="text-xs text-blue-600 uppercase tracking-wide">
                        {deal.type === "fixed" ? "OFF" : deal.type === "percentage" ? "OFF" : "DEAL"}
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Items:</span>
                        <span className="font-medium">{deal.items}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Category:</span>
                        <span className="font-medium">{deal.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Period:</span>
                        <span className="font-medium">
                          {deal.startDate} - {deal.endDate}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Sales:</span>
                        <span className="font-bold text-green-600">${deal.totalSales.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Usage:</span>
                        <span className="font-medium">{deal.usageCount} times</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredData.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No deals found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
