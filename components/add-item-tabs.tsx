"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ItemGeneralForm } from "./forms/item-general-form"
import { ItemPalletizationForm } from "./forms/item-palletization-form"
import { ItemCostDealForm } from "./forms/item-cost-deal-form"
import { ItemAssortmentForm } from "./forms/item-assortment-form"
import { useRouter } from "next/navigation"

export function AddItemTabs() {
  const [activeTab, setActiveTab] = useState("general")
  const [formData, setFormData] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleNext = () => {
    const tabs = ["general", "palletization", "cost-deal", "assortment"]
    const currentIndex = tabs.indexOf(activeTab)
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1])
    }
  }

  const handlePrevious = () => {
    const tabs = ["general", "palletization", "cost-deal", "assortment"]
    const currentIndex = tabs.indexOf(activeTab)
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1])
    }
  }

  const handleSave = async () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard/items")
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">Tab 1: General Data</TabsTrigger>
          <TabsTrigger value="palletization">Tab 2: Palletization</TabsTrigger>
          <TabsTrigger value="cost-deal">Tab 3: Cost & Deals</TabsTrigger>
          <TabsTrigger value="assortment">Tab 4: Assortment</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <ItemGeneralForm />
        </TabsContent>

        <TabsContent value="palletization" className="space-y-6">
          <ItemPalletizationForm />
        </TabsContent>

        <TabsContent value="cost-deal" className="space-y-6">
          <ItemCostDealForm />
        </TabsContent>

        <TabsContent value="assortment" className="space-y-6">
          <ItemAssortmentForm />
        </TabsContent>
      </Tabs>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6 border-t">
        <Button variant="outline" onClick={handlePrevious} disabled={activeTab === "general"}>
          Previous
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          {activeTab === "assortment" ? (
            <Button onClick={handleSave} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Item"}
            </Button>
          ) : (
            <Button onClick={handleNext}>Next</Button>
          )}
        </div>
      </div>
    </div>
  )
}
