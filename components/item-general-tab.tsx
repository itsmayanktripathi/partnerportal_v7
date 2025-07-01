"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Package, Tag, Building2 } from "lucide-react"

interface ItemGeneralTabProps {
  itemId: string
}

// Mock data - in real app this would be fetched based on itemId
const itemData = {
  id: "1",
  name: "Premium Coffee Beans",
  sku: "PCB-001",
  description:
    "High-quality arabica coffee beans sourced from premium farms in Colombia. These beans are carefully selected and roasted to perfection, offering a rich and smooth flavor profile with notes of chocolate and caramel.",
  category: "Food & Beverage",
  subcategory: "Coffee & Tea",
  brand: "Premium Roasters",
  manufacturer: "Colombian Coffee Co.",
  vendor: "ABC Supply Co.",
  status: "active",
  barcode: "1234567890123",
  weight: "1 lb",
  dimensions: "8 x 4 x 2 inches",
  color: "Dark Brown",
  material: "Coffee Beans",
  origin: "Colombia",
  certifications: ["Organic", "Fair Trade", "Rainforest Alliance"],
  tags: ["Premium", "Arabica", "Single Origin", "Dark Roast"],
  createdDate: "2024-01-01",
  lastUpdated: "2024-01-15",
  createdBy: "John Smith",
  images: [
    "/placeholder.svg?height=300&width=300",
    "/placeholder.svg?height=300&width=300",
    "/placeholder.svg?height=300&width=300",
  ],
}

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

export function ItemGeneralTab({ itemId }: ItemGeneralTabProps) {
  const item = itemData // In real app, fetch based on itemId

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                <img
                  src={item.images[0] || "/placeholder.svg"}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold">{item.name}</h2>
                  <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                </div>
                <p className="text-muted-foreground">SKU: {item.sku}</p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Building2 className="h-4 w-4" />
                    {item.vendor}
                  </div>
                  <div className="flex items-center gap-1">
                    <Tag className="h-4 w-4" />
                    {item.category}
                  </div>
                </div>
              </div>
            </div>
            <Button size="sm">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Item Name</label>
              <p className="font-medium">{item.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">SKU</label>
              <p className="font-medium">{item.sku}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Barcode</label>
              <p className="font-medium">{item.barcode}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Description</label>
              <p className="text-sm">{item.description}</p>
            </div>
          </CardContent>
        </Card>

        {/* Classification */}
        <Card>
          <CardHeader>
            <CardTitle>Classification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Category</label>
              <p className="font-medium">{item.category}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Subcategory</label>
              <p className="font-medium">{item.subcategory}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Brand</label>
              <p className="font-medium">{item.brand}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Manufacturer</label>
              <p className="font-medium">{item.manufacturer}</p>
            </div>
          </CardContent>
        </Card>

        {/* Physical Properties */}
        <Card>
          <CardHeader>
            <CardTitle>Physical Properties</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Weight</label>
              <p className="font-medium">{item.weight}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Dimensions</label>
              <p className="font-medium">{item.dimensions}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Color</label>
              <p className="font-medium">{item.color}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Material</label>
              <p className="font-medium">{item.material}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Origin</label>
              <p className="font-medium">{item.origin}</p>
            </div>
          </CardContent>
        </Card>

        {/* Additional Information */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Certifications</label>
              <div className="flex flex-wrap gap-1 mt-1">
                {item.certifications.map((cert) => (
                  <Badge key={cert} variant="secondary" className="text-xs">
                    {cert}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Tags</label>
              <div className="flex flex-wrap gap-1 mt-1">
                {item.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Created Date</label>
              <p className="font-medium">{item.createdDate}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Last Updated</label>
              <p className="font-medium">{item.lastUpdated}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Created By</label>
              <p className="font-medium">{item.createdBy}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Images */}
      <Card>
        <CardHeader>
          <CardTitle>Product Images</CardTitle>
          <CardDescription>View all product images and media</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {item.images.map((image, index) => (
              <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${item.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
