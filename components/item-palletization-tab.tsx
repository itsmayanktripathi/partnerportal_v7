"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Package, Truck, Warehouse } from "lucide-react"

interface ItemPalletizationTabProps {
  itemId: string
}

// Mock palletization data
const palletizationData = {
  // Case Information
  caseQuantity: 24,
  caseWeight: "25 lbs",
  caseDimensions: "12 x 8 x 6 inches",
  caseBarcode: "1234567890124",
  casesPerLayer: 8,
  layersPerPallet: 6,

  // Pallet Information
  palletQuantity: 1152, // 24 * 8 * 6
  palletWeight: "1,200 lbs",
  palletDimensions: "48 x 40 x 48 inches",
  palletType: "Standard Wood",
  palletHeight: "48 inches",
  stackable: true,
  maxStackHeight: 2,

  // Shipping Information
  shippingClass: "Class 60",
  hazardous: false,
  temperatureControlled: false,
  fragile: false,
  specialHandling: [],

  // Storage Information
  storageType: "Dry Storage",
  temperatureRange: "60-75°F",
  humidityRange: "30-50%",
  shelfLife: "24 months",
  rotationRequired: true,

  // Logistics
  leadTime: "5-7 business days",
  minimumOrderQuantity: 1,
  orderMultiple: 1,
  dropShipAvailable: true,
  crossDockAvailable: false,
}

export function ItemPalletizationTab({ itemId }: ItemPalletizationTabProps) {
  const data = palletizationData

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Palletization & Packaging Data</h3>
          <p className="text-sm text-muted-foreground">Packaging specifications and logistics information</p>
        </div>
        <Button size="sm">
          <Edit className="mr-2 h-4 w-4" />
          Edit Palletization
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Case Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Case Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Units per Case</label>
              <p className="text-lg font-semibold">{data.caseQuantity}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Case Weight</label>
              <p className="font-medium">{data.caseWeight}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Case Dimensions</label>
              <p className="font-medium">{data.caseDimensions}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Case Barcode</label>
              <p className="font-medium">{data.caseBarcode}</p>
            </div>
          </CardContent>
        </Card>

        {/* Pallet Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Warehouse className="h-5 w-5" />
              Pallet Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Cases per Layer</label>
              <p className="text-lg font-semibold">{data.casesPerLayer}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Layers per Pallet</label>
              <p className="text-lg font-semibold">{data.layersPerPallet}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Total Units per Pallet</label>
              <p className="text-xl font-bold text-blue-600">{data.palletQuantity}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Pallet Weight</label>
              <p className="font-medium">{data.palletWeight}</p>
            </div>
          </CardContent>
        </Card>

        {/* Pallet Specifications */}
        <Card>
          <CardHeader>
            <CardTitle>Pallet Specifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Pallet Type</label>
              <p className="font-medium">{data.palletType}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Pallet Dimensions</label>
              <p className="font-medium">{data.palletDimensions}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Pallet Height</label>
              <p className="font-medium">{data.palletHeight}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Stackable</label>
              <Badge variant={data.stackable ? "default" : "secondary"}>{data.stackable ? "Yes" : "No"}</Badge>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Max Stack Height</label>
              <p className="font-medium">{data.maxStackHeight} pallets</p>
            </div>
          </CardContent>
        </Card>

        {/* Shipping Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              Shipping Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Shipping Class</label>
              <p className="font-medium">{data.shippingClass}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Hazardous Material</label>
              <Badge variant={data.hazardous ? "destructive" : "secondary"}>{data.hazardous ? "Yes" : "No"}</Badge>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Temperature Controlled</label>
              <Badge variant={data.temperatureControlled ? "default" : "secondary"}>
                {data.temperatureControlled ? "Required" : "Not Required"}
              </Badge>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Fragile</label>
              <Badge variant={data.fragile ? "destructive" : "secondary"}>{data.fragile ? "Yes" : "No"}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Storage Requirements */}
        <Card>
          <CardHeader>
            <CardTitle>Storage Requirements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Storage Type</label>
              <p className="font-medium">{data.storageType}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Temperature Range</label>
              <p className="font-medium">{data.temperatureRange}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Humidity Range</label>
              <p className="font-medium">{data.humidityRange}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Shelf Life</label>
              <p className="font-medium">{data.shelfLife}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Rotation Required</label>
              <Badge variant={data.rotationRequired ? "default" : "secondary"}>
                {data.rotationRequired ? "Yes (FIFO)" : "No"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Logistics Information */}
        <Card>
          <CardHeader>
            <CardTitle>Logistics Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Lead Time</label>
              <p className="font-medium">{data.leadTime}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Minimum Order Quantity</label>
              <p className="font-medium">{data.minimumOrderQuantity} case(s)</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Order Multiple</label>
              <p className="font-medium">{data.orderMultiple} case(s)</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Drop Ship Available</label>
              <Badge variant={data.dropShipAvailable ? "default" : "secondary"}>
                {data.dropShipAvailable ? "Yes" : "No"}
              </Badge>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Cross Dock Available</label>
              <Badge variant={data.crossDockAvailable ? "default" : "secondary"}>
                {data.crossDockAvailable ? "Yes" : "No"}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Visual Pallet Layout */}
      <Card>
        <CardHeader>
          <CardTitle>Pallet Layout Visualization</CardTitle>
          <CardDescription>Visual representation of case arrangement on pallet</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="text-center space-y-4">
              <div className="inline-block bg-white border-2 border-dashed border-gray-300 p-8 rounded-lg">
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {Array.from({ length: data.casesPerLayer }).map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 bg-blue-200 border border-blue-400 rounded flex items-center justify-center text-xs"
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Layer 1 of {data.layersPerPallet} ({data.casesPerLayer} cases per layer)
                </p>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>
                  Total: {data.layersPerPallet} layers × {data.casesPerLayer} cases = {data.palletQuantity} units per
                  pallet
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
