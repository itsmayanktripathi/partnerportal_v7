"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DollarSign, TrendingUp, TrendingDown, Percent, AlertTriangle } from "lucide-react"

// Mock data - in real app this would come from API
const dashboardData = {
  totalItems: 1250,
  itemsWithCosts: 1180,
  activeDeals: 45,
  expiredDeals: 12,
  avgMargin: 32.5,
  totalRevenue: 125000,
  costSavings: 8500,
  dealPerformance: 78,
}

const recentCostChanges = [
  {
    id: 1,
    item: "Premium Coffee Beans",
    sku: "PCB-001",
    oldCost: 18.5,
    newCost: 19.25,
    change: 4.1,
    date: "2024-01-15",
  },
  {
    id: 2,
    item: "Wireless Headphones",
    sku: "WBH-002",
    oldCost: 65.0,
    newCost: 62.5,
    change: -3.8,
    date: "2024-01-14",
  },
  { id: 3, item: "Organic Green Tea", sku: "OGT-003", oldCost: 12.0, newCost: 12.75, change: 6.3, date: "2024-01-13" },
]

const activeDeals = [
  {
    id: 1,
    name: "Winter Electronics Sale",
    items: 25,
    discount: 15,
    startDate: "2024-01-01",
    endDate: "2024-01-31",
    status: "active",
  },
  {
    id: 2,
    name: "Coffee Bundle Deal",
    items: 8,
    discount: 20,
    startDate: "2024-01-10",
    endDate: "2024-01-25",
    status: "active",
  },
  {
    id: 3,
    name: "Industrial Supplies Promo",
    items: 12,
    discount: 10,
    startDate: "2024-01-05",
    endDate: "2024-01-20",
    status: "expiring",
  },
]

export function CostDealDashboard() {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.totalItems.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{dashboardData.itemsWithCosts} with cost data</p>
            <Progress value={(dashboardData.itemsWithCosts / dashboardData.totalItems) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Deals</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.activeDeals}</div>
            <p className="text-xs text-muted-foreground">{dashboardData.expiredDeals} expired this month</p>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
              <span className="text-xs text-green-600">+12% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Margin</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.avgMargin}%</div>
            <p className="text-xs text-muted-foreground">Target: 35%</p>
            <Progress value={dashboardData.avgMargin} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cost Savings</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${dashboardData.costSavings.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">This month</p>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
              <span className="text-xs text-green-600">+5.2% from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Cost Changes */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Cost Changes</CardTitle>
            <CardDescription>Latest cost updates across your catalog</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCostChanges.map((change) => (
                <div key={change.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium text-sm">{change.item}</p>
                    <p className="text-xs text-muted-foreground">SKU: {change.sku}</p>
                    <p className="text-xs text-muted-foreground">{change.date}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm">
                      <span className="line-through text-muted-foreground">${change.oldCost}</span>
                      {" → "}
                      <span className="font-bold">${change.newCost}</span>
                    </div>
                    <div className={`text-xs font-medium ${change.change > 0 ? "text-red-600" : "text-green-600"}`}>
                      {change.change > 0 ? "+" : ""}
                      {change.change}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Deals */}
        <Card>
          <CardHeader>
            <CardTitle>Active Deals</CardTitle>
            <CardDescription>Current promotional campaigns and deals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeDeals.map((deal) => (
                <div key={deal.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm">{deal.name}</p>
                      <Badge variant={deal.status === "active" ? "default" : "destructive"}>
                        {deal.status === "expiring" && <AlertTriangle className="h-3 w-3 mr-1" />}
                        {deal.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {deal.items} items • {deal.discount}% discount
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {deal.startDate} - {deal.endDate}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">{deal.discount}%</div>
                    <div className="text-xs text-muted-foreground">OFF</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
