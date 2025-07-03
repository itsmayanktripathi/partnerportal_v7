"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, DollarSign, TrendingUp, Calendar, Plus } from "lucide-react"

interface ItemCostDealTabProps {
  itemId: string
}

// Mock cost and deal data
const costDealData = {
  // Current Pricing
  currentCost: 18.5,
  currentPrice: 24.99,
  margin: 26.0,
  lastCostUpdate: "2024-01-10",
  lastPriceUpdate: "2024-01-15",

  // Cost History
  costHistory: [
    { date: "2024-01-10", cost: 18.5, reason: "Vendor price increase", updatedBy: "John Smith" },
    { date: "2023-12-15", cost: 17.25, reason: "Seasonal adjustment", updatedBy: "Sarah Johnson" },
    { date: "2023-11-01", cost: 16.8, reason: "Volume discount applied", updatedBy: "Mike Chen" },
    { date: "2023-10-01", cost: 18.0, reason: "Initial cost setup", updatedBy: "John Smith" },
  ],

  // Active Deals
  activeDeals: [
    {
      id: "1",
      name: "Holiday Special",
      type: "Percentage Discount",
      value: "15%",
      startDate: "2024-01-01",
      endDate: "2024-01-31",
      status: "active",
      conditions: "Minimum order 100 units",
    },
    {
      id: "2",
      name: "Bulk Purchase Deal",
      type: "Volume Discount",
      value: "$2.00 off",
      startDate: "2024-01-15",
      endDate: "2024-03-15",
      status: "active",
      conditions: "Orders over 500 units",
    },
  ],

  // Proposed Deals
  proposedDeals: [
    {
      id: "3",
      name: "Spring Promotion",
      type: "Buy 2 Get 1 Free",
      value: "33% savings",
      proposedStartDate: "2024-03-01",
      proposedEndDate: "2024-04-30",
      status: "pending",
      proposedBy: "ABC Supply Co.",
      proposedDate: "2024-01-20",
    },
  ],

  // Pricing Tiers
  pricingTiers: [
    { quantity: "1-99", price: 24.99, discount: "0%" },
    { quantity: "100-499", price: 23.99, discount: "4%" },
    { quantity: "500-999", price: 22.99, discount: "8%" },
    { quantity: "1000+", price: 21.99, discount: "12%" },
  ],
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800"
    case "pending":
      return "bg-yellow-100 text-yellow-800"
    case "expired":
      return "bg-gray-100 text-gray-800"
    case "rejected":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function ItemCostDealTab({ itemId }: ItemCostDealTabProps) {
  const data = costDealData

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Cost & Deal Management</h3>
          <p className="text-sm text-muted-foreground">Pricing information, cost history, and deal management</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Propose Deal
          </Button>
          <Button size="sm">
            <Edit className="mr-2 h-4 w-4" />
            Update Pricing
          </Button>
        </div>
      </div>

      {/* Current Pricing Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Current Cost</p>
                <p className="text-2xl font-bold text-red-600">${data.currentCost}</p>
              </div>
              <DollarSign className="h-8 w-8 text-red-600" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Updated {data.lastCostUpdate}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Current Price</p>
                <p className="text-2xl font-bold text-green-600">${data.currentPrice}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Updated {data.lastPriceUpdate}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Margin</p>
                <p className="text-2xl font-bold text-blue-600">{data.margin}%</p>
              </div>
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-sm">%</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Profit margin</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Deals</p>
                <p className="text-2xl font-bold text-purple-600">{data.activeDeals.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Currently running</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pricing Tiers */}
        <Card>
          <CardHeader>
            <CardTitle>Volume Pricing Tiers</CardTitle>
            <CardDescription>Quantity-based pricing structure</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Discount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.pricingTiers.map((tier, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{tier.quantity}</TableCell>
                    <TableCell>${tier.price}</TableCell>
                    <TableCell>
                      <Badge variant={tier.discount === "0%" ? "secondary" : "default"}>{tier.discount}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Cost History */}
        <Card>
          <CardHeader>
            <CardTitle>Cost History</CardTitle>
            <CardDescription>Recent cost changes and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.costHistory.map((entry, index) => (
                <div key={index} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">${entry.cost}</span>
                      <span className="text-sm text-muted-foreground">{entry.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{entry.reason}</p>
                    <p className="text-xs text-muted-foreground">Updated by {entry.updatedBy}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Deals */}
      <Card>
        <CardHeader>
          <CardTitle>Active Deals</CardTitle>
          <CardDescription>Currently running promotional offers</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Deal Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Conditions</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.activeDeals.map((deal) => (
                <TableRow key={deal.id}>
                  <TableCell className="font-medium">{deal.name}</TableCell>
                  <TableCell>{deal.type}</TableCell>
                  <TableCell className="font-semibold text-green-600">{deal.value}</TableCell>
                  <TableCell>
                    {deal.startDate} to {deal.endDate}
                  </TableCell>
                  <TableCell className="text-sm">{deal.conditions}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(deal.status)}>{deal.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Proposed Deals */}
      <Card>
        <CardHeader>
          <CardTitle>Proposed Deals</CardTitle>
          <CardDescription>Deals pending approval from vendors</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Deal Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Proposed Period</TableHead>
                <TableHead>Proposed By</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.proposedDeals.map((deal) => (
                <TableRow key={deal.id}>
                  <TableCell className="font-medium">{deal.name}</TableCell>
                  <TableCell>{deal.type}</TableCell>
                  <TableCell className="font-semibold text-blue-600">{deal.value}</TableCell>
                  <TableCell>
                    {deal.proposedStartDate} to {deal.proposedEndDate}
                  </TableCell>
                  <TableCell>{deal.proposedBy}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(deal.status)}>{deal.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm">
                        Approve
                      </Button>
                      <Button variant="ghost" size="sm">
                        Reject
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
