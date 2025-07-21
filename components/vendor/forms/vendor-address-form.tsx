"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin } from "lucide-react"

interface VendorAddressFormProps {
  data: any[]
  onChange: (data: any[]) => void
}

export function VendorAddressForm({ data, onChange }: VendorAddressFormProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Address Chain Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Create address chains to organize vendor locations. Each chain can contain up to 4 addresses, and each
            address can have multiple contacts.
          </p>

          {/* For new vendor creation, we'll show a simplified version */}
          <div className="text-center py-8">
            <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Address Chains</h3>
            <p className="text-muted-foreground mb-4">
              Address chains will be available after creating the vendor. You can then add and manage multiple address
              chains with their associated addresses and contacts.
            </p>
            <div className="text-sm text-muted-foreground">
              <p>• Each chain can have up to 4 addresses</p>
              <p>• Each address can have multiple contacts</p>
              <p>• Organize addresses by workflow or region</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
