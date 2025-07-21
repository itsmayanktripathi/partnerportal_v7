"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Eye, Edit, MapPin, Users, X } from "lucide-react"
import { AddressChainDialog } from "./address-chain-dialog"
import { AddressDialog } from "./address-dialog"
import { ContactDialog } from "./contact-dialog"

interface VendorAddressChainsProps {
  vendorId: string
}

// Mock data - in real app this would come from API
const mockAddressChains = [
  {
    id: "1",
    name: "Primary Operations",
    description: "Main operational addresses for headquarters and primary warehouse",
    status: "active",
    createdAt: "2024-01-15",
    addresses: [
      {
        id: "1",
        type: "Headquarters",
        name: "Corporate Headquarters",
        street: "123 Business Ave",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "USA",
        isPrimary: true,
        contacts: [
          {
            id: "1",
            name: "John Smith",
            role: "CEO",
            email: "john.smith@acme.com",
            phone: "+1 (555) 123-4567",
            isPrimary: true,
          },
          {
            id: "2",
            name: "Jane Doe",
            role: "Operations Manager",
            email: "jane.doe@acme.com",
            phone: "+1 (555) 123-4568",
            isPrimary: false,
          },
        ],
      },
      {
        id: "2",
        type: "Warehouse",
        name: "Main Distribution Center",
        street: "456 Industrial Blvd",
        city: "Newark",
        state: "NJ",
        zipCode: "07102",
        country: "USA",
        isPrimary: false,
        contacts: [
          {
            id: "3",
            name: "Mike Johnson",
            role: "Warehouse Manager",
            email: "mike.johnson@acme.com",
            phone: "+1 (555) 123-4569",
            isPrimary: true,
          },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Regional Offices",
    description: "Regional sales and support offices",
    status: "active",
    createdAt: "2024-01-20",
    addresses: [
      {
        id: "3",
        type: "Regional Office",
        name: "West Coast Office",
        street: "789 Tech Drive",
        city: "San Francisco",
        state: "CA",
        zipCode: "94105",
        country: "USA",
        isPrimary: false,
        contacts: [
          {
            id: "4",
            name: "Sarah Wilson",
            role: "Regional Manager",
            email: "sarah.wilson@acme.com",
            phone: "+1 (555) 123-4570",
            isPrimary: true,
          },
        ],
      },
    ],
  },
]

export function VendorAddressChains({ vendorId }: VendorAddressChainsProps) {
  const [selectedChain, setSelectedChain] = useState<(typeof mockAddressChains)[0] | null>(null)
  const [showAddChainDialog, setShowAddChainDialog] = useState(false)
  const [showAddAddressDialog, setShowAddAddressDialog] = useState(false)
  const [showAddContactDialog, setShowAddContactDialog] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState<any>(null)

  const getTotalContacts = (chain: (typeof mockAddressChains)[0]) => {
    return chain.addresses.reduce((total, address) => total + address.contacts.length, 0)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getAddressTypeColor = (type: string) => {
    const colors = {
      Headquarters: "bg-blue-100 text-blue-800",
      Warehouse: "bg-green-100 text-green-800",
      "Regional Office": "bg-purple-100 text-purple-800",
      Manufacturing: "bg-orange-100 text-orange-800",
    }
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  if (selectedChain) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={() => setSelectedChain(null)}>
              <X className="h-4 w-4 mr-2" />
              Back to Overview
            </Button>
            <div>
              <h2 className="text-xl font-semibold">{selectedChain.name}</h2>
              <p className="text-sm text-muted-foreground">{selectedChain.description}</p>
            </div>
          </div>
          <Button onClick={() => setShowAddAddressDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Address
          </Button>
        </div>

        <div className="grid gap-6">
          {selectedChain.addresses.map((address) => (
            <Card key={address.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <CardTitle className="text-lg">{address.name}</CardTitle>
                      <CardDescription>
                        {address.street}, {address.city}, {address.state} {address.zipCode}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getAddressTypeColor(address.type)}>{address.type}</Badge>
                    {address.isPrimary && <Badge variant="outline">Primary</Badge>}
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      Contacts ({address.contacts.length})
                    </h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedAddress(address)
                        setShowAddContactDialog(true)
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Contact
                    </Button>
                  </div>
                  <div className="grid gap-3">
                    {address.contacts.map((contact) => (
                      <div key={contact.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{contact.name}</span>
                            {contact.isPrimary && (
                              <Badge variant="outline" className="text-xs">
                                Primary
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{contact.role}</p>
                          <div className="flex space-x-4 text-xs text-muted-foreground mt-1">
                            <span>{contact.email}</span>
                            <span>{contact.phone}</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <AddressDialog
          open={showAddAddressDialog}
          onOpenChange={setShowAddAddressDialog}
          chainId={selectedChain.id}
          onSave={() => setShowAddAddressDialog(false)}
        />

        <ContactDialog
          open={showAddContactDialog}
          onOpenChange={setShowAddContactDialog}
          addressId={selectedAddress?.id}
          onSave={() => setShowAddContactDialog(false)}
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Address Chains</h2>
          <p className="text-sm text-muted-foreground">Manage vendor address chains and their associated addresses</p>
        </div>
        <Button onClick={() => setShowAddChainDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Address Chain
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Address Chains Overview</CardTitle>
          <CardDescription>Click on any address chain to view and manage its addresses</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Chain Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Addresses</TableHead>
                <TableHead>Contacts</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAddressChains.map((chain) => (
                <TableRow
                  key={chain.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => setSelectedChain(chain)}
                >
                  <TableCell className="font-medium">{chain.name}</TableCell>
                  <TableCell className="max-w-xs truncate">{chain.description}</TableCell>
                  <TableCell>
                    <Badge variant={chain.status === "active" ? "default" : "secondary"}>{chain.status}</Badge>
                  </TableCell>
                  <TableCell>{chain.addresses.length}</TableCell>
                  <TableCell>{getTotalContacts(chain)}</TableCell>
                  <TableCell>{formatDate(chain.createdAt)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedChain(chain)
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          // Handle edit
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AddressChainDialog
        open={showAddChainDialog}
        onOpenChange={setShowAddChainDialog}
        vendorId={vendorId}
        onSave={() => setShowAddChainDialog(false)}
      />
    </div>
  )
}
