"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VendorGeneralDetails } from "./vendor-general-details"
import { VendorAddressChains } from "./vendor-address-chains"

interface VendorDetailTabsProps {
  vendor: {
    id: string
    name: string
    code: string
    status: string
    type: string
    email: string
    phone: string
    website: string
    taxId: string
    paymentTerms: string
    currency: string
    creditLimit: number
    description: string
    createdAt: string
    updatedAt: string
  }
}

export function VendorDetailTabs({ vendor }: VendorDetailTabsProps) {
  const [activeTab, setActiveTab] = useState("general")

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="general">General Information</TabsTrigger>
        <TabsTrigger value="addresses">Address Chains</TabsTrigger>
      </TabsList>

      <TabsContent value="general" className="space-y-4">
        <VendorGeneralDetails vendor={vendor} />
      </TabsContent>

      <TabsContent value="addresses" className="space-y-4">
        <VendorAddressChains vendorId={vendor.id} />
      </TabsContent>
    </Tabs>
  )
}
