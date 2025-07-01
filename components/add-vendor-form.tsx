"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface VendorFormData {
  companyName: string
  contactPerson: string
  email: string
  phone: string
  alternatePhone: string
  website: string
  taxId: string
  businessType: string

  // Address Information
  address: string
  city: string
  state: string
  zipCode: string
  country: string

  // Business Details
  businessDescription: string
  productsServices: string
  certifications: string
  paymentTerms: string
  creditLimit: string

  // Settings
  isActive: boolean
  allowProposals: boolean
  requireApproval: boolean
}

export function AddVendorForm() {
  const [formData, setFormData] = useState<VendorFormData>({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    alternatePhone: "",
    website: "",
    taxId: "",
    businessType: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    businessDescription: "",
    productsServices: "",
    certifications: "",
    paymentTerms: "",
    creditLimit: "",
    isActive: true,
    allowProposals: true,
    requireApproval: true,
  })

  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleInputChange = (field: keyof VendorFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard/vendors")
    }, 1500)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Basic Information</CardTitle>
          <CardDescription>Essential vendor details and contact information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name *</Label>
              <Input
                id="companyName"
                placeholder="ABC Supply Co."
                value={formData.companyName}
                onChange={(e) => handleInputChange("companyName", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactPerson">Primary Contact *</Label>
              <Input
                id="contactPerson"
                placeholder="John Smith"
                value={formData.contactPerson}
                onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="contact@abcsupply.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="alternatePhone">Alternate Phone</Label>
              <Input
                id="alternatePhone"
                type="tel"
                placeholder="+1 (555) 987-6543"
                value={formData.alternatePhone}
                onChange={(e) => handleInputChange("alternatePhone", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                type="url"
                placeholder="https://www.abcsupply.com"
                value={formData.website}
                onChange={(e) => handleInputChange("website", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="taxId">Tax ID / EIN</Label>
              <Input
                id="taxId"
                placeholder="12-3456789"
                value={formData.taxId}
                onChange={(e) => handleInputChange("taxId", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessType">Business Type</Label>
              <Select value={formData.businessType} onValueChange={(value) => handleInputChange("businessType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select business type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manufacturer">Manufacturer</SelectItem>
                  <SelectItem value="distributor">Distributor</SelectItem>
                  <SelectItem value="wholesaler">Wholesaler</SelectItem>
                  <SelectItem value="supplier">Supplier</SelectItem>
                  <SelectItem value="service-provider">Service Provider</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Address Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Address Information</CardTitle>
          <CardDescription>Business address and location details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="address">Street Address</Label>
            <Input
              id="address"
              placeholder="123 Business Street"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                placeholder="New York"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State/Province</Label>
              <Input
                id="state"
                placeholder="NY"
                value={formData.state}
                onChange={(e) => handleInputChange("state", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zipCode">ZIP/Postal Code</Label>
              <Input
                id="zipCode"
                placeholder="10001"
                value={formData.zipCode}
                onChange={(e) => handleInputChange("zipCode", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="mx">Mexico</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Business Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Business Details</CardTitle>
          <CardDescription>Additional business information and terms</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="businessDescription">Business Description</Label>
            <Textarea
              id="businessDescription"
              placeholder="Describe the vendor's business and specialties..."
              value={formData.businessDescription}
              onChange={(e) => handleInputChange("businessDescription", e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="productsServices">Products & Services</Label>
            <Textarea
              id="productsServices"
              placeholder="List main products and services offered..."
              value={formData.productsServices}
              onChange={(e) => handleInputChange("productsServices", e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="certifications">Certifications & Licenses</Label>
            <Textarea
              id="certifications"
              placeholder="List relevant certifications, licenses, or compliance standards..."
              value={formData.certifications}
              onChange={(e) => handleInputChange("certifications", e.target.value)}
              rows={2}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="paymentTerms">Payment Terms</Label>
              <Select value={formData.paymentTerms} onValueChange={(value) => handleInputChange("paymentTerms", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment terms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="net-15">Net 15</SelectItem>
                  <SelectItem value="net-30">Net 30</SelectItem>
                  <SelectItem value="net-45">Net 45</SelectItem>
                  <SelectItem value="net-60">Net 60</SelectItem>
                  <SelectItem value="cod">Cash on Delivery</SelectItem>
                  <SelectItem value="prepaid">Prepaid</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="creditLimit">Credit Limit ($)</Label>
              <Input
                id="creditLimit"
                type="number"
                placeholder="50000"
                value={formData.creditLimit}
                onChange={(e) => handleInputChange("creditLimit", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Vendor Settings</CardTitle>
          <CardDescription>Configure vendor permissions and workflow settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) => handleInputChange("isActive", checked as boolean)}
            />
            <Label htmlFor="isActive">Active Vendor</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="allowProposals"
              checked={formData.allowProposals}
              onCheckedChange={(checked) => handleInputChange("allowProposals", checked as boolean)}
            />
            <Label htmlFor="allowProposals">Allow Proposals</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="requireApproval"
              checked={formData.requireApproval}
              onCheckedChange={(checked) => handleInputChange("requireApproval", checked as boolean)}
            />
            <Label htmlFor="requireApproval">Require Approval for Changes</Label>
          </div>
        </CardContent>
      </Card>

      <Separator />

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Adding Vendor..." : "Add Vendor"}
        </Button>
      </div>
    </form>
  )
}
