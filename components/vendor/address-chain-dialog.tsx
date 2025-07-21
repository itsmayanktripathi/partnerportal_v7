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
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

interface AddressChain {
  id: string
  name: string
  description: string
  isActive: boolean
  addresses: any[]
}

interface AddressChainDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  chain?: AddressChain | null
  onSave: (data: Omit<AddressChain, "id" | "addresses">) => void
}

export function AddressChainDialog({ open, onOpenChange, chain, onSave }: AddressChainDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    isActive: true,
  })

  useEffect(() => {
    if (chain) {
      setFormData({
        name: chain.name,
        description: chain.description,
        isActive: chain.isActive,
      })
    } else {
      setFormData({
        name: "",
        description: "",
        isActive: true,
      })
    }
  }, [chain, open])

  const handleSave = () => {
    if (!formData.name.trim()) return

    onSave(formData)
    setFormData({
      name: "",
      description: "",
      isActive: true,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{chain ? "Edit Address Chain" : "Add Address Chain"}</DialogTitle>
          <DialogDescription>
            {chain
              ? "Update the address chain information."
              : "Create a new address chain to organize vendor locations."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Chain Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="Enter chain name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Enter chain description"
              rows={3}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isActive: checked }))}
            />
            <Label htmlFor="isActive">Active</Label>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!formData.name.trim()}>
            {chain ? "Update" : "Create"} Chain
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
