"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, Edit, TrendingUp, TrendingDown, DollarSign } from "lucide-react"

// Mock data - in real app this would come from API
const costData = [
  {
    id: "1",
    sku: "PCB-001",
    name: "Premium Coffee Beans",
    category: "Food & Beverage",
    vendor: "ABC Supply Co.",
    currentCost: 19.25,
    previousCost: 18.5,
    sellingPrice: 24.99,
    margin: 22.9,
    lastUpdated: "2024-01-15",
    status: "updated",
  },
  {
    id: "2",
    sku: "WBH-002",
    name: "Wireless Bluetooth Headphones",
    category: "Electronics",
    vendor: "Tech Solutions Pro",
    currentCost: 62.5,
    previousCost: 65.0,
    sellingPrice: 89.99,
    margin: 30.5,
    lastUpdated: "2024-01-14",
    status: "reduced",
  },
  {
    id: "3",
    sku: "OGT-003",
    name: "Organic Green Tea",
    category: "Food & Beverage",
    vendor: "Premium Foods LLC",
    currentCost: 12.75,
    previousCost: 12.0,
    sellingPrice: 15.99,
    margin: 20.3,
    lastUpdated: "2024-01-13",
    status: "increased",
  },
  {
    id: "4",
    sku: "ISG-004",
    name: "Industrial Safety Gloves",
    category: "Industrial",
    vendor: "Global Distributors Inc.",
    currentCost: 8.75,
    previousCost: 8.75,
    sellingPrice: 12.5,
    margin: 30.0,
    lastUpdated: "2024-01-10",
    status: "stable",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "increased":
      return "bg-red-100 text-red-800"
    case "reduced":
      return "bg-green-100 text-green-800"
    case "updated":
      return "bg-blue-100 text-blue-800"
    case "stable":
      return "bg-gray-100 text-gray-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getMarginColor = (margin: number) => {
  if (margin >= 30) return "text-green-600"
  if (margin >= 20) return "text-yellow-600"
  return "text-red-600"
}

export function CostManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All Categories")
  const [statusFilter, setStatusFilter] = useState("All Status")

  const filteredData = costData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !categoryFilter || item.category === categoryFilter
    const matchesStatus = !statusFilter || item.status === statusFilter

    return matchesSearch && matchesCategory && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{costData.length}</div>
            <p className="text-xs text-muted-foreground">Items with cost data</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Margin</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(costData.reduce((sum, item) => sum + item.margin, 0) / costData.length).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">Across all items</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cost Increases</CardTitle>
            <TrendingUp className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {costData.filter((item) => item.status === "increased").length}
            </div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cost Reductions</CardTitle>
            <TrendingDown className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {costData.filter((item) => item.status === "reduced").length}
            </div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Cost Management</CardTitle>
          <CardDescription>Monitor and manage item costs and margins</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or SKU..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Categories">All Categories</SelectItem>
                <SelectItem value="Food & Beverage">Food & Beverage</SelectItem>
                <SelectItem value="Electronics">Electronics</SelectItem>
                <SelectItem value="Industrial">Industrial</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Status">All Status</SelectItem>
                <SelectItem value="increased">Cost Increased</SelectItem>
                <SelectItem value="reduced">Cost Reduced</SelectItem>
                <SelectItem value="updated">Recently Updated</SelectItem>
                <SelectItem value="stable">Stable</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Cost Table */}
          <div className="space-y-4">
            <div className="grid grid-cols-12 gap-4 p-3 bg-gray-50 rounded-lg font-medium text-sm">
              <div className="col-span-2">Item</div>
              <div className="col-span-1">SKU</div>
              <div className="col-span-2">Category</div>
              <div className="col-span-1">Current Cost</div>
              <div className="col-span-1">Previous Cost</div>
              <div className="col-span-1">Selling Price</div>
              <div className="col-span-1">Margin</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-1">Actions</div>
            </div>

            {filteredData.map((item) => (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-3">
                  <div className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-2">
                      <h3 className="font-semibold text-sm">{item.name}</h3>
                      <p className="text-xs text-muted-foreground">{item.vendor}</p>
                    </div>
                    <div className="col-span-1">
                      <span className="text-sm font-mono">{item.sku}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-sm">{item.category}</span>
                    </div>
                    <div className="col-span-1">
                      <span className="text-sm font-bold">${item.currentCost}</span>
                    </div>
                    <div className="col-span-1">
                      <span className="text-sm text-muted-foreground">${item.previousCost}</span>
                      {item.currentCost !== item.previousCost && (
                        <div className="flex items-center mt-1">
                          {item.currentCost > item.previousCost ? (
                            <TrendingUp className="h-3 w-3 text-red-500 mr-1" />
                          ) : (
                            <TrendingDown className="h-3 w-3 text-green-500 mr-1" />
                          )}
                          <span
                            className={`text-xs ${item.currentCost > item.previousCost ? "text-red-500" : "text-green-500"}`}
                          >
                            {(((item.currentCost - item.previousCost) / item.previousCost) * 100).toFixed(1)}%
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="col-span-1">
                      <span className="text-sm font-bold">${item.sellingPrice}</span>
                    </div>
                    <div className="col-span-1">
                      <span className={`text-sm font-bold ${getMarginColor(item.margin)}`}>
                        {item.margin.toFixed(1)}%
                      </span>
                    </div>
                    <div className="col-span-2">
                      <Badge className={`${getStatusColor(item.status)} text-xs`}>{item.status}</Badge>
                      <p className="text-xs text-muted-foreground mt-1">{item.lastUpdated}</p>
                    </div>
                    <div className="col-span-1">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Cost
                          </DropdownMenuItem>
                          <DropdownMenuItem>View History</DropdownMenuItem>
                          <DropdownMenuItem>Update Margin</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredData.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No items found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
