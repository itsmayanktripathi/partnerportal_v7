"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, MapPin, Warehouse, Plus, Truck } from "lucide-react"

interface ItemAssortmentTabProps {
  itemId: string
}

// Mock assortment data
const assortmentData = {
  // Warehouse Availability
  warehouses: [
    {
      id: "WH001",
      name: "Main Distribution Center",
      location: "New York, NY",
      available: true,
      stock: 1250,
      reserved: 150,
      available_stock: 1100,
      reorderPoint: 200,
      maxCapacity: 5000,
      lastRestocked: "2024-01-15",
    },
    {
      id: "WH002",
      name: "West Coast Hub",
      location: "Los Angeles, CA",
      available: true,
      stock: 850,
      reserved: 75,
      available_stock: 775,
      reorderPoint: 150,
      maxCapacity: 3000,
      lastRestocked: "2024-01-12",
    },
    {
      id: "WH003",
      name: "Southeast Regional",
      location: "Atlanta, GA",
      available: false,
      stock: 0,
      reserved: 0,
      available_stock: 0,
      reorderPoint: 100,
      maxCapacity: 2000,
      lastRestocked: "2023-12-20",
      reason: "Facility maintenance",
    },
    {
      id: "WH004",
      name: "Midwest Center",
      location: "Chicago, IL",
      available: true,
      stock: 650,
      reserved: 50,
      available_stock: 600,
      reorderPoint: 125,
      maxCapacity: 2500,
      lastRestocked: "2024-01-10",
    },
  ],

  // Customer Assignments
  customerAssignments: [
    {
      customerId: "CUST001",
      customerName: "SuperMart Chain",
      customerType: "Retailer",
      assignedWarehouses: ["WH001", "WH002"],
      preferredWarehouse: "WH001",
      deliveryZones: ["Northeast", "Mid-Atlantic"],
      minimumOrder: 50,
      orderMultiple: 25,
      leadTime: "2-3 days",
      shippingMethod: "Standard Ground",
    },
    {
      customerId: "CUST002",
      customerName: "Regional Foods Inc.",
      customerType: "Wholesaler",
      assignedWarehouses: ["WH002", "WH004"],
      preferredWarehouse: "WH002",
      deliveryZones: ["West Coast", "Southwest"],
      minimumOrder: 100,
      orderMultiple: 50,
      leadTime: "1-2 days",
      shippingMethod: "Express",
    },
    {
      customerId: "CUST003",
      customerName: "Metro Distributors",
      customerType: "Distributor",
      assignedWarehouses: ["WH001", "WH004"],
      preferredWarehouse: "WH004",
      deliveryZones: ["Midwest", "Great Lakes"],
      minimumOrder: 200,
      orderMultiple: 100,
      leadTime: "3-5 days",
      shippingMethod: "LTL Freight",
    },
  ],

  // Delivery Zones
  deliveryZones: [
    {
      zone: "Northeast",
      warehouses: ["WH001"],
      states: ["NY", "NJ", "CT", "MA", "RI", "VT", "NH", "ME"],
      leadTime: "1-2 days",
      shippingCost: "Standard",
    },
    {
      zone: "Mid-Atlantic",
      warehouses: ["WH001"],
      states: ["PA", "DE", "MD", "VA", "WV"],
      leadTime: "2-3 days",
      shippingCost: "Standard",
    },
    {
      zone: "West Coast",
      warehouses: ["WH002"],
      states: ["CA", "OR", "WA", "NV"],
      leadTime: "1-2 days",
      shippingCost: "Standard",
    },
    {
      zone: "Midwest",
      warehouses: ["WH004"],
      states: ["IL", "IN", "OH", "MI", "WI", "MN", "IA", "MO"],
      leadTime: "2-3 days",
      shippingCost: "Standard",
    },
  ],

  // Replenishment Rules
  replenishmentRules: {
    autoReplenishment: true,
    replenishmentMethod: "Economic Order Quantity (EOQ)",
    reviewCycle: "Weekly",
    safetyStock: 50,
    leadTimeBuffer: 7,
    seasonalAdjustment: true,
  },
}

const getStockStatusColor = (stock: number, reorderPoint: number) => {
  if (stock === 0) return "bg-red-100 text-red-800"
  if (stock <= reorderPoint) return "bg-yellow-100 text-yellow-800"
  return "bg-green-100 text-green-800"
}

const getStockStatus = (stock: number, reorderPoint: number) => {
  if (stock === 0) return "Out of Stock"
  if (stock <= reorderPoint) return "Low Stock"
  return "In Stock"
}

export function ItemAssortmentTab({ itemId }: ItemAssortmentTabProps) {
  const data = assortmentData

  const totalStock = data.warehouses.reduce((sum, wh) => sum + wh.stock, 0)
  const totalReserved = data.warehouses.reduce((sum, wh) => sum + wh.reserved, 0)
  const totalAvailable = data.warehouses.reduce((sum, wh) => sum + wh.available_stock, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Orderable Assortment</h3>
          <p className="text-sm text-muted-foreground">Warehouse assignments and customer delivery configurations</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Assignment
          </Button>
          <Button size="sm">
            <Edit className="mr-2 h-4 w-4" />
            Edit Assortment
          </Button>
        </div>
      </div>

      {/* Stock Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Stock</p>
                <p className="text-2xl font-bold text-blue-600">{totalStock.toLocaleString()}</p>
              </div>
              <Warehouse className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Across all warehouses</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Reserved</p>
                <p className="text-2xl font-bold text-orange-600">{totalReserved.toLocaleString()}</p>
              </div>
              <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-600 font-bold text-sm">R</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Pending orders</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Available</p>
                <p className="text-2xl font-bold text-green-600">{totalAvailable.toLocaleString()}</p>
              </div>
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold text-sm">A</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Ready to ship</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Warehouses</p>
                <p className="text-2xl font-bold text-purple-600">
                  {data.warehouses.filter((wh) => wh.available).length}
                </p>
              </div>
              <MapPin className="h-8 w-8 text-purple-600" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Active locations</p>
          </CardContent>
        </Card>
      </div>

      {/* Warehouse Inventory */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Warehouse className="h-5 w-5" />
            Warehouse Inventory
          </CardTitle>
          <CardDescription>Stock levels and availability across distribution centers</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Warehouse</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Reserved</TableHead>
                <TableHead>Available</TableHead>
                <TableHead>Reorder Point</TableHead>
                <TableHead>Last Restocked</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.warehouses.map((warehouse) => (
                <TableRow key={warehouse.id}>
                  <TableCell className="font-medium">
                    <div>
                      <p>{warehouse.name}</p>
                      <p className="text-xs text-muted-foreground">{warehouse.id}</p>
                    </div>
                  </TableCell>
                  <TableCell>{warehouse.location}</TableCell>
                  <TableCell>
                    {warehouse.available ? (
                      <Badge className={getStockStatusColor(warehouse.stock, warehouse.reorderPoint)}>
                        {getStockStatus(warehouse.stock, warehouse.reorderPoint)}
                      </Badge>
                    ) : (
                      <Badge variant="destructive">Unavailable</Badge>
                    )}
                  </TableCell>
                  <TableCell className="font-semibold">{warehouse.stock.toLocaleString()}</TableCell>
                  <TableCell className="text-orange-600">{warehouse.reserved.toLocaleString()}</TableCell>
                  <TableCell className="text-green-600 font-semibold">
                    {warehouse.available_stock.toLocaleString()}
                  </TableCell>
                  <TableCell>{warehouse.reorderPoint.toLocaleString()}</TableCell>
                  <TableCell>{warehouse.lastRestocked}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      Manage
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Customer Assignments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Customer Assignments
          </CardTitle>
          <CardDescription>Customer-specific warehouse assignments and delivery configurations</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Assigned Warehouses</TableHead>
                <TableHead>Preferred</TableHead>
                <TableHead>Delivery Zones</TableHead>
                <TableHead>Min Order</TableHead>
                <TableHead>Lead Time</TableHead>
                <TableHead>Shipping</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.customerAssignments.map((assignment) => (
                <TableRow key={assignment.customerId}>
                  <TableCell className="font-medium">
                    <div>
                      <p>{assignment.customerName}</p>
                      <p className="text-xs text-muted-foreground">{assignment.customerId}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{assignment.customerType}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {assignment.assignedWarehouses.map((whId) => (
                        <Badge key={whId} variant="secondary" className="text-xs">
                          {whId}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="default" className="text-xs">
                      {assignment.preferredWarehouse}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {assignment.deliveryZones.map((zone) => (
                        <Badge key={zone} variant="outline" className="text-xs">
                          {zone}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{assignment.minimumOrder}</TableCell>
                  <TableCell>{assignment.leadTime}</TableCell>
                  <TableCell className="text-sm">{assignment.shippingMethod}</TableCell>
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

      {/* Delivery Zones */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Delivery Zones
          </CardTitle>
          <CardDescription>Geographic delivery zones and warehouse assignments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {data.deliveryZones.map((zone) => (
              <Card key={zone.zone}>
                <CardContent className="pt-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{zone.zone}</h4>
                      <Badge variant="outline">{zone.leadTime}</Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Served by:</p>
                      <div className="flex flex-wrap gap-1">
                        {zone.warehouses.map((whId) => (
                          <Badge key={whId} variant="secondary" className="text-xs">
                            {whId}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">States:</p>
                      <p className="text-sm">{zone.states.join(", ")}</p>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Shipping Cost:</span>
                      <span className="font-medium">{zone.shippingCost}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Replenishment Rules */}
      <Card>
        <CardHeader>
          <CardTitle>Replenishment Rules</CardTitle>
          <CardDescription>Automated inventory replenishment configuration</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Auto Replenishment</label>
                <p className="font-medium">
                  <Badge variant={data.replenishmentRules.autoReplenishment ? "default" : "secondary"}>
                    {data.replenishmentRules.autoReplenishment ? "Enabled" : "Disabled"}
                  </Badge>
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Replenishment Method</label>
                <p className="font-medium">{data.replenishmentRules.replenishmentMethod}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Review Cycle</label>
                <p className="font-medium">{data.replenishmentRules.reviewCycle}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Safety Stock</label>
                <p className="font-medium">{data.replenishmentRules.safetyStock} units</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Lead Time Buffer</label>
                <p className="font-medium">{data.replenishmentRules.leadTimeBuffer} days</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Seasonal Adjustment</label>
                <p className="font-medium">
                  <Badge variant={data.replenishmentRules.seasonalAdjustment ? "default" : "secondary"}>
                    {data.replenishmentRules.seasonalAdjustment ? "Enabled" : "Disabled"}
                  </Badge>
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
