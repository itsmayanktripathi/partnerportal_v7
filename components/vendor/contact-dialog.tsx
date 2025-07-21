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

interface Contact {
  id: string
  name: string
  role: string
  email: string
  phone: string
  isPrimary: boolean
}

interface ContactDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  contact?: Contact | null
  onSave: (data: Omit<Contact, "id">) => void
}

const contactRoles = [
  { value: "manager", label: "Manager" },
  { value: "coordinator", label: "Coordinator" },
  { value: "supervisor", label: "Supervisor" },
  { value: "representative", label: "Sales Representative" },
  { value: "accountant", label: "Accountant" },
  { value: "assistant", label: "Assistant" },
  { value: "director", label: "Director" },
  { value: "executive", label: "Executive" },
]

export function ContactDialog({ open, onOpenChange, contact, onSave }: ContactDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    email: "",
    phone: "",
    isPrimary: false,
  })

  useEffect(() => {
    if (contact) {
      setFormData({
        name: contact.name,
        role: contact.role,
        email: contact.email,
        phone: contact.phone,
        isPrimary: contact.isPrimary,
      })
    } else {
      setFormData({
        name: "",
        role: "",
        email: "",
        phone: "",
        isPrimary: false,
      })
    }
  }, [contact, open])

  const handleSave = () => {
    if (!formData.name.trim() || !formData.role) return

    onSave(formData)
    setFormData({
      name: "",
      role: "",
      email: "",
      phone: "",
      isPrimary: false,
    })
  }

  const isFormValid = formData.name.trim() && formData.role

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{contact ? "Edit Contact" : "Add Contact"}</DialogTitle>
          <DialogDescription>
            {contact ? "Update the contact information." : "Add a new contact to this address."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Contact Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="Enter contact name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role *</Label>
            <Select value={formData.role} onValueChange={(value) => setFormData((prev) => ({ ...prev, role: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                {contactRoles.map((role) => (
                  <SelectItem key={role.value} value={role.value}>
                    {role.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              placeholder="Enter email address"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
              placeholder="Enter phone number"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="isPrimary"
              checked={formData.isPrimary}
              onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isPrimary: checked }))}
            />
            <Label htmlFor="isPrimary">Primary Contact</Label>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!isFormValid}>
            {contact ? "Update" : "Add"} Contact
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
