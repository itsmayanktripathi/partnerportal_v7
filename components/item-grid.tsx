"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, Edit, Trash2, Package } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

// Mock data - in real app this would come from API
const items = [
  {
    id: "1",
    name: "Premium Coffee Beans",
    sku: "PCB-001",
    category: "Food & Beverage",
    vendor: "ABC Supply Co.",
    price: 24.99,
    cost: 18.5,
    status: "active",
    stock: 150,
    image: "/placeholder.svg?height=200&width=200",
    description: "High-quality arabica coffee beans sourced from premium farms",
    lastUpdated: "2024-01-15",
  },
  {
    id: "2",
    name: "Wireless Bluetooth Headphones",
    sku: "WBH-002",
    category: "Electronics",
    vendor: "Tech Solutions Pro",
    price: 89.99,
    cost: 65.0,
    status: "active",
    stock: 75,
    image: "/placeholder.svg?height=200&width=200",
    description: "High-fidelity wireless headphones with noise cancellation",
    lastUpdated: "2024-01-14",
  },
  {
    id: "3",
    name: "Organic Green Tea",
    sku: "OGT-003",
    category: "Food & Beverage",
    vendor: "Premium Foods LLC",
    price: 15.99,
    cost: 12.0,
    status: "pending",
    stock: 200,
    image: "/placeholder.svg?height=200&width=200",
    description: "Certified organic green tea leaves with antioxidants",
    lastUpdated: "2024-01-13",
  },
  {
    id: "4",
    name: "Industrial Safety Gloves",
    sku: "ISG-004",
    category: "Industrial",
    vendor: "Global Distributors Inc.",
    price: 12.5,
    cost: 8.75,
    status: "active",
    stock: 500,
    image: "/placeholder.svg?height=200&width=200",
    description: "Heavy-duty safety gloves for industrial applications",
    lastUpdated: "2024-01-12",
  },
  {
    id: "5",
    name: "Smart Home Thermostat",
    sku: "SHT-005",
    category: "Electronics",
    vendor: "Tech Solutions Pro",
    price: 199.99,
    cost: 145.0,
    status: "inactive",
    stock: 25,
    image: "/placeholder.svg?height=200&width=200",
    description: "WiFi-enabled smart thermostat with mobile app control",
    lastUpdated: "2024-01-10",
  },
  {
    id: "6",
    name: "Gourmet Spice Set",
    sku: "GSS-006",
    category: "Food & Beverage",
    vendor: "Premium Foods LLC",
    price: 34.99,
    cost: 22.5,
    status: "active",
    stock: 80,
    image: "/placeholder.svg?height=200&width=200",
    description: "Premium collection of international spices and seasonings",
    lastUpdated: "2024-01-09",
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
    case "discontinued":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function ItemGrid() {
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const router = useRouter()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const handleItemDoubleClick = (itemId: string) => {
    router.push(`/dashboard/items/${itemId}`)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {items.length} items • Double-click an item to view details
        </p>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">View:</span>
          <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
            Grid
          </Button>
          <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
            List
          </Button>
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <Card
              key={item.id}
              className="cursor-pointer hover:shadow-lg transition-all duration-200 group"
              onDoubleClick={() => handleItemDoubleClick(item.id)}
            >
              {/* Existing grid card content */}
              <CardContent className="p-4">
                <div className="space-y-3">
                  {/* Image */}
                  <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>

                  {/* Header */}
                  <div className="space-y-1">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-sm leading-tight line-clamp-2">{item.name}</h3>
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
                            <Link href={`/dashboard/items/${item.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/items/${item.id}/edit`}>
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
                    <p className="text-xs text-muted-foreground">SKU: {item.sku}</p>
                    <Badge className={`${getStatusColor(item.status)} text-xs`}>{item.status}</Badge>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Category:</span>
                      <span className="font-medium">{item.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Vendor:</span>
                      <span className="font-medium truncate ml-2">{item.vendor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Price:</span>
                      <span className="font-bold text-green-600">${item.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Stock:</span>
                      <span className={`font-medium ${item.stock < 50 ? "text-red-600" : "text-green-600"}`}>
                        {item.stock}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>

                  {/* Footer */}
                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground">Updated: {item.lastUpdated}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          <div className="grid grid-cols-12 gap-4 p-3 bg-gray-50 rounded-lg font-medium text-sm">
            <div className="col-span-1">Image</div>
            <div className="col-span-2">Name</div>
            <div className="col-span-1">SKU</div>
            <div className="col-span-1">Status</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-2">Vendor</div>
            <div className="col-span-1">Price</div>
            <div className="col-span-1">Stock</div>
            <div className="col-span-1">Actions</div>
          </div>
          {items.map((item) => (
            <Card
              key={item.id}
              className="cursor-pointer hover:shadow-md transition-all duration-200"
              onDoubleClick={() => handleItemDoubleClick(item.id)}
            >
              <CardContent className="p-3">
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-1">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </div>
                  <div className="col-span-2">
                    <h3 className="font-semibold text-sm">{item.name}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-1">{item.description}</p>
                  </div>
                  <div className="col-span-1">
                    <span className="text-sm font-mono">{item.sku}</span>
                  </div>
                  <div className="col-span-1">
                    <Badge className={`${getStatusColor(item.status)} text-xs`}>{item.status}</Badge>
                  </div>
                  <div className="col-span-2">
                    <span className="text-sm">{item.category}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-sm">{item.vendor}</span>
                  </div>
                  <div className="col-span-1">
                    <span className="text-sm font-bold text-green-600">${item.price}</span>
                  </div>
                  <div className="col-span-1">
                    <span className={`text-sm font-medium ${item.stock < 50 ? "text-red-600" : "text-green-600"}`}>
                      {item.stock}
                    </span>
                  </div>
                  <div className="col-span-1">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/items/${item.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/items/${item.id}/edit`}>
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
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {items.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Package className="h-12 w-12 text-muted-foreground mb-4" />
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">No items found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search criteria or add new items.</p>
              <div className="flex gap-2">
                <Button variant="outline" asChild>
                  <Link href="/dashboard/items/mass-add">Mass Add Items</Link>
                </Button>
                <Button asChild>
                  <Link href="/dashboard/items/add">Add New Item</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
