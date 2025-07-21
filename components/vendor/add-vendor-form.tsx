"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Plus, X, MapPin, Users, Building2, ArrowLeft } from "lucide-react"
import { toast } from "sonner"
import { getApiV1Url } from "@/lib/config"

interface AddressData {
  type_code: string
  contact_name: string
  phone: string
  email: string
  address_line1: string
  address_line2: string
  city: string
  state: string
  postal_code: string
  country: string
  is_default: boolean
  contacts: ContactData[]
}

interface ContactData {
  contact_name: string
  role: string
  email: string
  phone: string
  is_primary: boolean
}

interface AddressChainData {
  chain_label: string
  order_to_id?: number
  ship_from_id?: number
  invoice_from_id?: number
  remit_to_id?: number
  return_to_id?: number
  is_active: boolean
}

const addressTypes = [
  { type_code: "order_to", label: "Order To" },
  { type_code: "ship_from", label: "Ship From" },
  { type_code: "invoice_from", label: "Invoice From" },
  { type_code: "remit_to", label: "Remit To" },
  { type_code: "return_to", label: "Return To" },
]

const businessTypes = [
  "Manufacturer",
  "Distributor",
  "Wholesaler",
  "Retailer",
  "Service Provider",
  "Supplier",
  "Importer",
  "Exporter",
]

export function AddVendorForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("general")

  // Vendor basic info
  const [vendorData, setVendorData] = useState({
    legal_name: "",
    trade_name: "",
    tax_id: "",
    registration_number: "",
    business_type: "",
    country_of_incorp: "",
    date_established: "",
  })

  // Addresses
  const [addresses, setAddresses] = useState<AddressData[]>([])

  // Address chains
  const [addressChains, setAddressChains] = useState<AddressChainData[]>([])

  // Validation errors
  const [errors, setErrors] = useState<{
    vendor?: { [key: string]: string }
    addresses?: { [key: number]: { [key: string]: string } }
    contacts?: { [key: number]: { [key: number]: { [key: string]: string } } }
  }>({})

  const addAddress = () => {
    const newAddress: AddressData = {
      type_code: "order_to",
      contact_name: "",
      phone: "",
      email: "",
      address_line1: "",
      address_line2: "",
      city: "",
      state: "",
      postal_code: "",
      country: "",
      is_default: false,
      contacts: [],
    }
    setAddresses([...addresses, newAddress])
  }

  const removeAddress = (index: number) => {
    setAddresses(addresses.filter((_, i) => i !== index))
  }

  const updateAddress = (index: number, field: keyof AddressData, value: any) => {
    const updatedAddresses = [...addresses]
    updatedAddresses[index] = { ...updatedAddresses[index], [field]: value }
    setAddresses(updatedAddresses)
  }

  const addContact = (addressIndex: number) => {
    const newContact: ContactData = {
      contact_name: "",
      role: "",
      email: "",
      phone: "",
      is_primary: false,
    }
    const updatedAddresses = [...addresses]
    updatedAddresses[addressIndex].contacts.push(newContact)
    setAddresses(updatedAddresses)
  }

  const removeContact = (addressIndex: number, contactIndex: number) => {
    const updatedAddresses = [...addresses]
    updatedAddresses[addressIndex].contacts.splice(contactIndex, 1)
    setAddresses(updatedAddresses)
  }

  const updateContact = (addressIndex: number, contactIndex: number, field: keyof ContactData, value: any) => {
    const updatedAddresses = [...addresses]
    updatedAddresses[addressIndex].contacts[contactIndex] = {
      ...updatedAddresses[addressIndex].contacts[contactIndex],
      [field]: value,
    }
    setAddresses(updatedAddresses)
  }

  const addAddressChain = () => {
    const newChain: AddressChainData = {
      chain_label: "",
      is_active: true,
    }
    setAddressChains([...addressChains, newChain])
  }

  const removeAddressChain = (index: number) => {
    setAddressChains(addressChains.filter((_, i) => i !== index))
  }

  const updateAddressChain = (index: number, field: keyof AddressChainData, value: any) => {
    const updatedChains = [...addressChains]
    updatedChains[index] = { ...updatedChains[index], [field]: value }
    setAddressChains(updatedChains)
  }

  // Validation functions
  const validateVendorData = () => {
    const vendorErrors: { [key: string]: string } = {}
    
    if (!vendorData.legal_name.trim()) {
      vendorErrors.legal_name = "Legal name is required"
    }
    
    if (vendorData.legal_name.trim().length < 2) {
      vendorErrors.legal_name = "Legal name must be at least 2 characters"
    }

    return vendorErrors
  }

  const validateAddresses = () => {
    const addressErrors: { [key: number]: { [key: string]: string } } = {}
    const contactErrors: { [key: number]: { [key: number]: { [key: string]: string } } } = {}

    addresses.forEach((address, addressIndex) => {
      const errors: { [key: string]: string } = {}
      
      if (!address.type_code) {
        errors.type_code = "Address type is required"
      }
      
      if (!address.address_line1.trim()) {
        errors.address_line1 = "Address line 1 is required"
      }
      
      if (address.address_line1.trim().length < 5) {
        errors.address_line1 = "Address line 1 must be at least 5 characters"
      }

      // Validate contacts for this address (only if contacts exist)
      if (address.contacts && address.contacts.length > 0) {
        address.contacts.forEach((contact, contactIndex) => {
          const contactError: { [key: string]: string } = {}
          
          if (!contact.contact_name.trim()) {
            contactError.contact_name = "Contact name is required"
          }
          
          if (contact.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
            contactError.email = "Invalid email format"
          }
          
          if (contact.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(contact.phone.replace(/[\s\-\(\)]/g, ''))) {
            contactError.phone = "Invalid phone number format"
          }

          if (Object.keys(contactError).length > 0) {
            if (!contactErrors[addressIndex]) contactErrors[addressIndex] = {}
            contactErrors[addressIndex][contactIndex] = contactError
          }
        })
      }

      if (Object.keys(errors).length > 0) {
        addressErrors[addressIndex] = errors
      }
    })

    return { addressErrors, contactErrors }
  }

  const clearErrors = () => {
    setErrors({})
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearErrors()
    setIsLoading(true)

    try {
      // Validate all data
      const vendorErrors = validateVendorData()
      const { addressErrors, contactErrors } = validateAddresses()
      
      const hasErrors = Object.keys(vendorErrors).length > 0 || 
                       Object.keys(addressErrors).length > 0 ||
                       Object.keys(contactErrors).length > 0

      if (hasErrors) {
        setErrors({
          vendor: vendorErrors,
          addresses: addressErrors,
          contacts: contactErrors
        })
        toast.error("Please fix the validation errors before submitting")
        setIsLoading(false)
        return
      }

      // Filter out empty addresses and clean up the data
      const validAddresses = addresses
        .filter(addr => addr.address_line1 && addr.address_line1.trim() && addr.type_code)
        .map(addr => ({
          type_code: addr.type_code,
          address_line1: addr.address_line1.trim(),
          address_line2: addr.address_line2?.trim() || null,
          city: addr.city?.trim() || null,
          state: addr.state?.trim() || null,
          postal_code: addr.postal_code?.trim() || null,
          country: addr.country?.trim() || null,
          contact_name: addr.contact_name?.trim() || null,
          phone: addr.phone?.trim() || null,
          email: addr.email?.trim() || null,
          is_default: addr.is_default,
          contacts: addr.contacts?.filter(contact => contact.contact_name?.trim()) || []
        }))

      // Clean up vendor data
      const cleanVendorData = {
        legal_name: vendorData.legal_name.trim(),
        trade_name: vendorData.trade_name?.trim() || null,
        tax_id: vendorData.tax_id?.trim() || null,
        registration_number: vendorData.registration_number?.trim() || null,
        business_type: vendorData.business_type || null,
        country_of_incorp: vendorData.country_of_incorp?.trim() || null,
        date_established: vendorData.date_established || null,
      }

      // Clean up address chains
      const validAddressChains = addressChains
        .filter(chain => chain.chain_label?.trim())
        .map(chain => ({
          chain_label: chain.chain_label.trim(),
          order_to_id: chain.order_to_id || null,
          ship_from_id: chain.ship_from_id || null,
          invoice_from_id: chain.invoice_from_id || null,
          remit_to_id: chain.remit_to_id || null,
          return_to_id: chain.return_to_id || null,
          is_active: chain.is_active
        }))

      const payload = {
        ...cleanVendorData,
        addresses: validAddresses,
        address_chains: validAddressChains,
      }

      console.log("Sending payload:", JSON.stringify(payload, null, 2))

      const response = await fetch(getApiV1Url("vendors"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error("API Error:", errorData)
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      toast.success("Vendor created successfully!")
      router.push("/dashboard/vendors")
    } catch (error) {
      console.error("Error creating vendor:", error)
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
      toast.error(`Failed to create vendor: ${errorMessage}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.push("/dashboard/vendors")}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Vendors
        </Button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">General Information</TabsTrigger>
          <TabsTrigger value="addresses">Addresses & Contacts</TabsTrigger>
          <TabsTrigger value="chains">Address Chains</TabsTrigger>
        </TabsList>

        {/* General Information Tab */}
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Basic Information
              </CardTitle>
              <CardDescription>Enter the vendor's basic business information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="legal_name">Legal Name *</Label>
                  <Input
                    id="legal_name"
                    value={vendorData.legal_name}
                    onChange={(e) => {
                      setVendorData({ ...vendorData, legal_name: e.target.value })
                      if (errors.vendor?.legal_name) {
                        const newVendorErrors = { ...errors.vendor }
                        delete newVendorErrors.legal_name
                        setErrors(prev => ({
                          ...prev,
                          vendor: Object.keys(newVendorErrors).length > 0 ? newVendorErrors : undefined
                        }))
                      }
                    }}
                    className={errors.vendor?.legal_name ? "border-red-500" : ""}
                  />
                  {errors.vendor?.legal_name && (
                    <p className="text-sm text-red-500">{errors.vendor.legal_name}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="trade_name">Trade Name</Label>
                  <Input
                    id="trade_name"
                    value={vendorData.trade_name}
                    onChange={(e) => setVendorData({ ...vendorData, trade_name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tax_id">Tax ID</Label>
                  <Input
                    id="tax_id"
                    value={vendorData.tax_id}
                    onChange={(e) => setVendorData({ ...vendorData, tax_id: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registration_number">Registration Number</Label>
                  <Input
                    id="registration_number"
                    value={vendorData.registration_number}
                    onChange={(e) => setVendorData({ ...vendorData, registration_number: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="business_type">Business Type</Label>
                  <Select value={vendorData.business_type} onValueChange={(value) => setVendorData({ ...vendorData, business_type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      {businessTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country_of_incorp">Country of Incorporation</Label>
                  <Input
                    id="country_of_incorp"
                    value={vendorData.country_of_incorp}
                    onChange={(e) => setVendorData({ ...vendorData, country_of_incorp: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date_established">Date Established</Label>
                  <Input
                    id="date_established"
                    type="date"
                    value={vendorData.date_established}
                    onChange={(e) => setVendorData({ ...vendorData, date_established: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Addresses Tab */}
        <TabsContent value="addresses" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Addresses & Contacts
                  </CardTitle>
                  <CardDescription>Add addresses and contacts for the vendor</CardDescription>
                </div>
                <Button type="button" onClick={addAddress}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Address
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {addresses.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <MapPin className="h-12 w-12 mx-auto mb-4" />
                  <p>No addresses added yet. Click "Add Address" to get started.</p>
                </div>
              ) : (
                addresses.map((address, addressIndex) => (
                  <Card key={addressIndex} className="border-dashed">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{address.type_code.replace("_", " ").toUpperCase()}</Badge>
                          {address.is_default && <Badge>Default</Badge>}
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAddress(addressIndex)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Address Type *</Label>
                          <Select
                            value={address.type_code}
                            onValueChange={(value) => {
                              updateAddress(addressIndex, "type_code", value)
                              // Clear error when user makes a selection
                              if (errors.addresses?.[addressIndex]?.type_code) {
                                clearErrors()
                              }
                            }}
                          >
                            <SelectTrigger className={errors.addresses?.[addressIndex]?.type_code ? "border-red-500" : ""}>
                              <SelectValue placeholder="Select address type" />
                            </SelectTrigger>
                            <SelectContent>
                              {addressTypes.map((type) => (
                                <SelectItem key={type.type_code} value={type.type_code}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {errors.addresses?.[addressIndex]?.type_code && (
                            <p className="text-sm text-red-500">{errors.addresses[addressIndex].type_code}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label>Contact Name</Label>
                          <Input
                            value={address.contact_name}
                            onChange={(e) => updateAddress(addressIndex, "contact_name", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Phone</Label>
                          <Input
                            value={address.phone}
                            onChange={(e) => updateAddress(addressIndex, "phone", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Email</Label>
                          <Input
                            type="email"
                            value={address.email}
                            onChange={(e) => updateAddress(addressIndex, "email", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label>Address Line 1 *</Label>
                          <Input
                            value={address.address_line1}
                            onChange={(e) => {
                              updateAddress(addressIndex, "address_line1", e.target.value)
                              if (errors.addresses?.[addressIndex]?.address_line1) {
                                clearErrors()
                              }
                            }}
                            className={errors.addresses?.[addressIndex]?.address_line1 ? "border-red-500" : ""}
                          />
                          {errors.addresses?.[addressIndex]?.address_line1 && (
                            <p className="text-sm text-red-500">{errors.addresses[addressIndex].address_line1}</p>
                          )}
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label>Address Line 2</Label>
                          <Input
                            value={address.address_line2}
                            onChange={(e) => updateAddress(addressIndex, "address_line2", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>City</Label>
                          <Input
                            value={address.city}
                            onChange={(e) => updateAddress(addressIndex, "city", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>State/Province</Label>
                          <Input
                            value={address.state}
                            onChange={(e) => updateAddress(addressIndex, "state", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Postal Code</Label>
                          <Input
                            value={address.postal_code}
                            onChange={(e) => updateAddress(addressIndex, "postal_code", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Country</Label>
                          <Input
                            value={address.country}
                            onChange={(e) => updateAddress(addressIndex, "country", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={`default-${addressIndex}`}
                              checked={address.is_default}
                              onChange={(e) => updateAddress(addressIndex, "is_default", e.target.checked)}
                            />
                            <Label htmlFor={`default-${addressIndex}`}>Set as default address</Label>
                          </div>
                        </div>
                      </div>

                      {/* Contacts Section */}
                      <div className="border-t pt-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            <Label>Contacts</Label>
                          </div>
                          <Button type="button" variant="outline" size="sm" onClick={() => addContact(addressIndex)}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Contact
                          </Button>
                        </div>
                        <div className="space-y-3">
                          {address.contacts.map((contact, contactIndex) => (
                            <Card key={contactIndex} className="p-4">
                              <div className="flex items-center justify-between mb-3">
                                <Badge variant="secondary">Contact {contactIndex + 1}</Badge>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeContact(addressIndex, contactIndex)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="space-y-2">
                                  <Label>Contact Name *</Label>
                                  <Input
                                    value={contact.contact_name}
                                    onChange={(e) => {
                                      updateContact(addressIndex, contactIndex, "contact_name", e.target.value)
                                      if (errors.contacts?.[addressIndex]?.[contactIndex]?.contact_name) {
                                        clearErrors()
                                      }
                                    }}
                                    className={errors.contacts?.[addressIndex]?.[contactIndex]?.contact_name ? "border-red-500" : ""}
                                  />
                                  {errors.contacts?.[addressIndex]?.[contactIndex]?.contact_name && (
                                    <p className="text-sm text-red-500">{errors.contacts[addressIndex][contactIndex].contact_name}</p>
                                  )}
                                </div>
                                <div className="space-y-2">
                                  <Label>Role</Label>
                                  <Input
                                    value={contact.role}
                                    onChange={(e) => updateContact(addressIndex, contactIndex, "role", e.target.value)}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Email</Label>
                                  <Input
                                    type="email"
                                    value={contact.email}
                                    onChange={(e) => {
                                      updateContact(addressIndex, contactIndex, "email", e.target.value)
                                      if (errors.contacts?.[addressIndex]?.[contactIndex]?.email) {
                                        clearErrors()
                                      }
                                    }}
                                    className={errors.contacts?.[addressIndex]?.[contactIndex]?.email ? "border-red-500" : ""}
                                  />
                                  {errors.contacts?.[addressIndex]?.[contactIndex]?.email && (
                                    <p className="text-sm text-red-500">{errors.contacts[addressIndex][contactIndex].email}</p>
                                  )}
                                </div>
                                <div className="space-y-2">
                                  <Label>Phone</Label>
                                  <Input
                                    value={contact.phone}
                                    onChange={(e) => {
                                      updateContact(addressIndex, contactIndex, "phone", e.target.value)
                                      if (errors.contacts?.[addressIndex]?.[contactIndex]?.phone) {
                                        clearErrors()
                                      }
                                    }}
                                    className={errors.contacts?.[addressIndex]?.[contactIndex]?.phone ? "border-red-500" : ""}
                                  />
                                  {errors.contacts?.[addressIndex]?.[contactIndex]?.phone && (
                                    <p className="text-sm text-red-500">{errors.contacts[addressIndex][contactIndex].phone}</p>
                                  )}
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                  <div className="flex items-center space-x-2">
                                    <input
                                      type="checkbox"
                                      id={`primary-${addressIndex}-${contactIndex}`}
                                      checked={contact.is_primary}
                                      onChange={(e) => updateContact(addressIndex, contactIndex, "is_primary", e.target.checked)}
                                    />
                                    <Label htmlFor={`primary-${addressIndex}-${contactIndex}`}>Primary contact</Label>
                                  </div>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Address Chains Tab */}
        <TabsContent value="chains" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Address Chains
                  </CardTitle>
                  <CardDescription>Configure address chains for transactional flow</CardDescription>
                </div>
                <Button type="button" onClick={addAddressChain}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Chain
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {addressChains.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <MapPin className="h-12 w-12 mx-auto mb-4" />
                  <p>No address chains configured yet. Click "Add Chain" to get started.</p>
                </div>
              ) : (
                addressChains.map((chain, chainIndex) => (
                  <Card key={chainIndex} className="border-dashed">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Input
                          placeholder="Chain Label (e.g., Default US Chain)"
                          value={chain.chain_label}
                          onChange={(e) => updateAddressChain(chainIndex, "chain_label", e.target.value)}
                          className="max-w-xs"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAddressChain(chainIndex)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {addressTypes.map((type) => (
                          <div key={type.type_code} className="space-y-2">
                            <Label>{type.label}</Label>
                            <Select
                              value={chain[`${type.type_code}_id` as keyof AddressChainData]?.toString() || ""}
                              onValueChange={(value) => updateAddressChain(chainIndex, `${type.type_code}_id` as keyof AddressChainData, value ? parseInt(value) : null)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select address" />
                              </SelectTrigger>
                              <SelectContent>
                                {addresses
                                  .filter((addr) => addr.type_code === type.type_code)
                                  .map((addr, idx) => (
                                    <SelectItem key={idx} value={idx.toString()}>
                                      {addr.address_line1} - {addr.city}
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={`active-${chainIndex}`}
                            checked={chain.is_active}
                            onChange={(e) => updateAddressChain(chainIndex, "is_active", e.target.checked)}
                          />
                          <Label htmlFor={`active-${chainIndex}`}>Active chain</Label>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Vendor"}
        </Button>
      </div>
    </form>
    </div>
  )
}
