"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

interface Address {
  id: string
  type: string
  name: string
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  isPrimary: boolean
  contacts: any[]
}

interface AddressDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  address?: Address | null
  onSave: (data: Omit<Address, "id" | "contacts">) => void
}

const addressTypes = [
  { value: "headquarters", label: "Headquarters" },
  { value: "warehouse", label: "Warehouse" },
  { value: "office", label: "Regional Office" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "distribution", label: "Distribution Center" },
  { value: "retail", label: "Retail Location" },
]

const countries = [
  { value: "US", label: "United States" },
  { value: "CA", label: "Canada" },
  { value: "MX", label: "Mexico" },
  { value: "GB", label: "United Kingdom" },
  { value: "DE", label: "Germany" },
  { value: "FR", label: "France" },
]

export function AddressDialog({ open, onOpenChange, address, onSave }: AddressDialogProps) {
  const [formData, setFormData] = useState({
    type: "",
    name: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
    isPrimary: false,
  })

  useEffect(() => {
    if (address) {
      setFormData({
        type: address.type,
        name: address.name,
        street: address.street,
        city: address.city,
        state: address.state,
        zipCode: address.zipCode,
        country: address.country,
        isPrimary: address.isPrimary,
      })
    } else {
      setFormData({
        type: "",
        name: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "US",
        isPrimary: false,
      })
    }
  }, [address, open])

  const handleSave = () => {
    if (!formData.name.trim() || !formData.street.trim() || !formData.city.trim()) return

    onSave(formData)
    setFormData({
      type: "",
      name: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "US",
      isPrimary: false,
    })
  }

  const isFormValid = formData.name.trim() && formData.street.trim() && formData.city.trim() && formData.type

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{address ? "Edit Address" : "Add Address"}</DialogTitle>
          <DialogDescription>
            {address ? "Update the address information." : "Add a new address to this chain."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Address Type *</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {addressTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Address Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Enter address name"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="street">Street Address *</Label>
            <Input
              id="street"
              value={formData.street}
              onChange={(e) => setFormData((prev) => ({ ...prev, street: e.target.value }))}
              placeholder="Enter street address"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
                placeholder="Enter city"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">State/Province</Label>
              <Input
                id="state"
                value={formData.state}
                onChange={(e) => setFormData((prev) => ({ ...prev, state: e.target.value }))}
                placeholder="Enter state"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="zipCode">ZIP/Postal Code</Label>
              <Input
                id="zipCode"
                value={formData.zipCode}
                onChange={(e) => setFormData((prev) => ({ ...prev, zipCode: e.target.value }))}
                placeholder="Enter ZIP code"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Select
                value={formData.country}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, country: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.value} value={country.value}>
                      {country.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="isPrimary"
              checked={formData.isPrimary}
              onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isPrimary: checked }))}
            />
            <Label htmlFor="isPrimary">Primary Address</Label>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!isFormValid}>
            {address ? "Update" : "Add"} Address
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
