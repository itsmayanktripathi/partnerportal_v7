"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, MapPin, Users, Eye, Edit, Trash2, Building } from "lucide-react"
import { AddressChainDialog } from "../address-chain-dialog"
import { AddressDialog } from "../address-dialog"
import { ContactDialog } from "../contact-dialog"

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
  contacts: Contact[]
}

interface Contact {
  id: string
  name: string
  role: string
  email: string
  phone: string
  isPrimary: boolean
}

interface AddressChain {
  id: string
  name: string
  description: string
  isActive: boolean
  addresses: Address[]
}

interface VendorAddressChainFormProps {
  chains: AddressChain[]
  onUpdate: (chains: AddressChain[]) => void
  onSave: () => void
}

export function VendorAddressChainForm({ chains, onUpdate, onSave }: VendorAddressChainFormProps) {
  const [selectedChain, setSelectedChain] = useState<string | null>(null)
  const [showChainDialog, setShowChainDialog] = useState(false)
  const [showAddressDialog, setShowAddressDialog] = useState(false)
  const [showContactDialog, setShowContactDialog] = useState(false)
  const [editingChain, setEditingChain] = useState<AddressChain | null>(null)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)
  const [editingContact, setEditingContact] = useState<Contact | null>(null)
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null)

  const totalAddresses = chains.reduce((sum, chain) => sum + chain.addresses.length, 0)
  const totalContacts = chains.reduce(
    (sum, chain) => sum + chain.addresses.reduce((addressSum, address) => addressSum + address.contacts.length, 0),
    0,
  )

  const selectedChainData = chains.find((chain) => chain.id === selectedChain)

  const handleAddChain = () => {
    setEditingChain(null)
    setShowChainDialog(true)
  }

  const handleEditChain = (chain: AddressChain) => {
    setEditingChain(chain)
    setShowChainDialog(true)
  }

  const handleDeleteChain = (chainId: string) => {
    const updatedChains = chains.filter((chain) => chain.id !== chainId)
    onUpdate(updatedChains)
    if (selectedChain === chainId) {
      setSelectedChain(null)
    }
  }

  const handleSaveChain = (chainData: Omit<AddressChain, "id" | "addresses">) => {
    if (editingChain) {
      const updatedChains = chains.map((chain) => (chain.id === editingChain.id ? { ...chain, ...chainData } : chain))
      onUpdate(updatedChains)
    } else {
      const newChain: AddressChain = {
        id: Date.now().toString(),
        ...chainData,
        addresses: [],
      }
      onUpdate([...chains, newChain])
    }
    setShowChainDialog(false)
    setEditingChain(null)
  }

  const handleAddAddress = (chainId: string) => {
    setSelectedAddressId(null)
    setEditingAddress(null)
    setShowAddressDialog(true)
  }

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address)
    setShowAddressDialog(true)
  }

  const handleDeleteAddress = (chainId: string, addressId: string) => {
    const updatedChains = chains.map((chain) =>
      chain.id === chainId
        ? {
            ...chain,
            addresses: chain.addresses.filter((address) => address.id !== addressId),
          }
        : chain,
    )
    onUpdate(updatedChains)
  }

  const handleSaveAddress = (addressData: Omit<Address, "id" | "contacts">) => {
    if (!selectedChain) return

    const updatedChains = chains.map((chain) => {
      if (chain.id === selectedChain) {
        if (editingAddress) {
          return {
            ...chain,
            addresses: chain.addresses.map((address) =>
              address.id === editingAddress.id ? { ...address, ...addressData } : address,
            ),
          }
        } else {
          const newAddress: Address = {
            id: Date.now().toString(),
            ...addressData,
            contacts: [],
          }
          return {
            ...chain,
            addresses: [...chain.addresses, newAddress],
          }
        }
      }
      return chain
    })

    onUpdate(updatedChains)
    setShowAddressDialog(false)
    setEditingAddress(null)
  }

  const handleAddContact = (addressId: string) => {
    setSelectedAddressId(addressId)
    setEditingContact(null)
    setShowContactDialog(true)
  }

  const handleEditContact = (contact: Contact, addressId: string) => {
    setSelectedAddressId(addressId)
    setEditingContact(contact)
    setShowContactDialog(true)
  }

  const handleDeleteContact = (chainId: string, addressId: string, contactId: string) => {
    const updatedChains = chains.map((chain) =>
      chain.id === chainId
        ? {
            ...chain,
            addresses: chain.addresses.map((address) =>
              address.id === addressId
                ? {
                    ...address,
                    contacts: address.contacts.filter((contact) => contact.id !== contactId),
                  }
                : address,
            ),
          }
        : chain,
    )
    onUpdate(updatedChains)
  }

  const handleSaveContact = (contactData: Omit<Contact, "id">) => {
    if (!selectedChain || !selectedAddressId) return

    const updatedChains = chains.map((chain) => {
      if (chain.id === selectedChain) {
        return {
          ...chain,
          addresses: chain.addresses.map((address) => {
            if (address.id === selectedAddressId) {
              if (editingContact) {
                return {
                  ...address,
                  contacts: address.contacts.map((contact) =>
                    contact.id === editingContact.id ? { ...contact, ...contactData } : contact,
                  ),
                }
              } else {
                const newContact: Contact = {
                  id: Date.now().toString(),
                  ...contactData,
                }
                return {
                  ...address,
                  contacts: [...address.contacts, newContact],
                }
              }
            }
            return address
          }),
        }
      }
      return chain
    })

    onUpdate(updatedChains)
    setShowContactDialog(false)
    setEditingContact(null)
    setSelectedAddressId(null)
  }

  return (
    <div className="space-y-6">
      {/* Summary Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Building className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{chains.length}</p>
                <p className="text-sm text-muted-foreground">Address Chains</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{totalAddresses}</p>
                <p className="text-sm text-muted-foreground">Total Addresses</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{totalContacts}</p>
                <p className="text-sm text-muted-foreground">Total Contacts</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Address Chains Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Address Chains</CardTitle>
              <CardDescription>Manage address chains and their associated addresses and contacts.</CardDescription>
            </div>
            <Button onClick={handleAddChain}>
              <Plus className="h-4 w-4 mr-2" />
              Add Chain
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {chains.length === 0 ? (
            <div className="text-center py-8">
              <Building className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Address Chains</h3>
              <p className="text-muted-foreground mb-4">
                Create your first address chain to organize vendor locations.
              </p>
              <Button onClick={handleAddChain}>
                <Plus className="h-4 w-4 mr-2" />
                Add First Chain
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Chain Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Addresses</TableHead>
                  <TableHead>Contacts</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {chains.map((chain) => (
                  <TableRow
                    key={chain.id}
                    className={selectedChain === chain.id ? "bg-muted/50" : "cursor-pointer hover:bg-muted/30"}
                    onClick={() => setSelectedChain(selectedChain === chain.id ? null : chain.id)}
                  >
                    <TableCell className="font-medium">{chain.name}</TableCell>
                    <TableCell>{chain.description}</TableCell>
                    <TableCell>
                      <Badge variant={chain.isActive ? "default" : "secondary"}>
                        {chain.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>{chain.addresses.length}</TableCell>
                    <TableCell>{chain.addresses.reduce((sum, address) => sum + address.contacts.length, 0)}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedChain(chain.id)
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleEditChain(chain)
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteChain(chain.id)
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Selected Chain Details */}
      {selectedChainData && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  {selectedChainData.name}
                  <Badge variant={selectedChainData.isActive ? "default" : "secondary"}>
                    {selectedChainData.isActive ? "Active" : "Inactive"}
                  </Badge>
                </CardTitle>
                <CardDescription>{selectedChainData.description}</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  onClick={() => handleAddAddress(selectedChainData.id)}
                  disabled={selectedChainData.addresses.length >= 4}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Address ({selectedChainData.addresses.length}/4)
                </Button>
                <Button variant="outline" onClick={() => setSelectedChain(null)}>
                  Close
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {selectedChainData.addresses.length === 0 ? (
              <div className="text-center py-8">
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Addresses</h3>
                <p className="text-muted-foreground mb-4">Add addresses to this chain to organize vendor locations.</p>
                <Button onClick={() => handleAddAddress(selectedChainData.id)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Address
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {selectedChainData.addresses.map((address) => (
                  <Card key={address.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">{address.name}</h4>
                            <Badge variant="outline">{address.type}</Badge>
                            {address.isPrimary && <Badge>Primary</Badge>}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {address.street}, {address.city}, {address.state} {address.zipCode}, {address.country}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{address.contacts.length} contacts</span>
                            {address.contacts.some((c) => c.isPrimary) && (
                              <span>• Primary contact: {address.contacts.find((c) => c.isPrimary)?.name}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => handleAddContact(address.id)}>
                            <Users className="h-4 w-4 mr-1" />
                            Add Contact
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleEditAddress(address)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteAddress(selectedChainData.id, address.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {address.contacts.length > 0 && (
                        <div className="mt-4 pt-4 border-t">
                          <h5 className="font-medium mb-2">Contacts</h5>
                          <div className="space-y-2">
                            {address.contacts.map((contact) => (
                              <div
                                key={contact.id}
                                className="flex items-center justify-between p-2 bg-muted/50 rounded"
                              >
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium">{contact.name}</span>
                                    <Badge variant="outline" className="text-xs">
                                      {contact.role}
                                    </Badge>
                                    {contact.isPrimary && <Badge className="text-xs">Primary</Badge>}
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    {contact.email} • {contact.phone}
                                  </div>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleEditContact(contact, address.id)}
                                  >
                                    <Edit className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleDeleteContact(selectedChainData.id, address.id, contact.id)}
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={onSave} size="lg">
          Save Vendor
        </Button>
      </div>

      {/* Dialogs */}
      <AddressChainDialog
        open={showChainDialog}
        onOpenChange={setShowChainDialog}
        chain={editingChain}
        onSave={handleSaveChain}
      />

      <AddressDialog
        open={showAddressDialog}
        onOpenChange={setShowAddressDialog}
        address={editingAddress}
        onSave={handleSaveAddress}
      />

      <ContactDialog
        open={showContactDialog}
        onOpenChange={setShowContactDialog}
        contact={editingContact}
        onSave={handleSaveContact}
      />
    </div>
  )
}
