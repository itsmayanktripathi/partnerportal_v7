"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ItemGeneralTab } from "./tabs/item-general-tab"
import { ItemPalletizationTab } from "./tabs/item-palletization-tab"
import { ItemCostDealTab } from "./tabs/item-cost-deal-tab"
import { ItemAssortmentTab } from "./tabs/item-assortment-tab"

interface ItemDetailTabsProps {
  itemId: string
}

export function ItemDetailTabs({ itemId }: ItemDetailTabsProps) {
  return (
    <Tabs defaultValue="general" className="space-y-6">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="general">General Data</TabsTrigger>
        <TabsTrigger value="palletization">Palletization</TabsTrigger>
        <TabsTrigger value="cost-deal">Cost & Deals</TabsTrigger>
        <TabsTrigger value="assortment">Assortment</TabsTrigger>
      </TabsList>

      <TabsContent value="general" className="space-y-6">
        <ItemGeneralTab itemId={itemId} />
      </TabsContent>

      <TabsContent value="palletization" className="space-y-6">
        <ItemPalletizationTab itemId={itemId} />
      </TabsContent>

      <TabsContent value="cost-deal" className="space-y-6">
        <ItemCostDealTab itemId={itemId} />
      </TabsContent>

      <TabsContent value="assortment" className="space-y-6">
        <ItemAssortmentTab itemId={itemId} />
      </TabsContent>
    </Tabs>
  )
}
