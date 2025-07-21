from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import date, datetime

# Base schemas
class AddressTypeBase(BaseModel):
    type_code: str
    label: str

class AddressTypeCreate(AddressTypeBase):
    pass

class AddressType(AddressTypeBase):
    class Config:
        from_attributes = True

class VendorAddressContactBase(BaseModel):
    contact_name: str
    role: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    is_primary: bool = False

class VendorAddressContactCreate(VendorAddressContactBase):
    pass

class VendorAddressContact(VendorAddressContactBase):
    contact_id: int
    address_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class VendorAddressBase(BaseModel):
    type_code: str
    contact_name: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    address_line1: str
    address_line2: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    postal_code: Optional[str] = None
    country: Optional[str] = None
    is_default: bool = False

class VendorAddressCreate(VendorAddressBase):
    contacts: Optional[List[VendorAddressContactCreate]] = []

class VendorAddress(VendorAddressBase):
    address_id: int
    vendor_id: int
    created_at: datetime
    contacts: List[VendorAddressContact] = []
    
    class Config:
        from_attributes = True

class AddressChainBase(BaseModel):
    chain_label: Optional[str] = None
    order_to_id: Optional[int] = None
    ship_from_id: Optional[int] = None
    invoice_from_id: Optional[int] = None
    remit_to_id: Optional[int] = None
    return_to_id: Optional[int] = None
    is_active: bool = True

class AddressChainCreate(AddressChainBase):
    pass

class AddressChain(AddressChainBase):
    chain_id: int
    vendor_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class VendorBase(BaseModel):
    legal_name: str
    trade_name: Optional[str] = None
    tax_id: Optional[str] = None
    registration_number: Optional[str] = None
    business_type: Optional[str] = None
    country_of_incorp: Optional[str] = None
    date_established: Optional[date] = None

class VendorCreate(VendorBase):
    addresses: Optional[List[VendorAddressCreate]] = []
    address_chains: Optional[List[AddressChainCreate]] = []

class VendorUpdate(BaseModel):
    legal_name: Optional[str] = None
    trade_name: Optional[str] = None
    tax_id: Optional[str] = None
    registration_number: Optional[str] = None
    business_type: Optional[str] = None
    country_of_incorp: Optional[str] = None
    date_established: Optional[date] = None

class Vendor(VendorBase):
    vendor_id: int
    created_at: datetime
    addresses: List[VendorAddress] = []
    address_chains: List[AddressChain] = []
    
    class Config:
        from_attributes = True

# Response schemas for detailed views
class VendorDetail(Vendor):
    pass

class AddressChainDetail(AddressChain):
    order_to: Optional[VendorAddress] = None
    ship_from: Optional[VendorAddress] = None
    invoice_from: Optional[VendorAddress] = None
    remit_to: Optional[VendorAddress] = None
    return_to: Optional[VendorAddress] = None
    
    class Config:
        from_attributes = True 