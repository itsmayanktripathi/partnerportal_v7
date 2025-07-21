from sqlalchemy import Column, Integer, String, Boolean, Date, DateTime, ForeignKey, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from datetime import datetime

Base = declarative_base()

class Vendor(Base):
    __tablename__ = "vendors"
    
    vendor_id = Column(Integer, primary_key=True, autoincrement=True)
    legal_name = Column(String(255), nullable=False)
    trade_name = Column(String(255))
    tax_id = Column(String(100))
    registration_number = Column(String(100))
    business_type = Column(String(100))
    country_of_incorp = Column(String(100))
    date_established = Column(Date)
    created_at = Column(DateTime, default=func.now())
    
    # Relationships
    addresses = relationship("VendorAddress", back_populates="vendor", cascade="all, delete-orphan")
    address_chains = relationship("AddressChain", back_populates="vendor", cascade="all, delete-orphan")

class AddressType(Base):
    __tablename__ = "address_types"
    
    type_code = Column(String(50), primary_key=True)
    label = Column(String(100))

class VendorAddress(Base):
    __tablename__ = "vendor_addresses"
    
    address_id = Column(Integer, primary_key=True, autoincrement=True)
    vendor_id = Column(Integer, ForeignKey("vendors.vendor_id", ondelete="CASCADE"), nullable=False)
    type_code = Column(String(50), ForeignKey("address_types.type_code"), nullable=False)
    contact_name = Column(String(255))
    phone = Column(String(50))
    email = Column(String(255))
    address_line1 = Column(String(255), nullable=False)
    address_line2 = Column(String(255))
    city = Column(String(100))
    state = Column(String(100))
    postal_code = Column(String(20))
    country = Column(String(100))
    is_default = Column(Boolean, default=False)
    created_at = Column(DateTime, default=func.now())
    
    # Relationships
    vendor = relationship("Vendor", back_populates="addresses")
    address_type = relationship("AddressType")
    contacts = relationship("VendorAddressContact", back_populates="address", cascade="all, delete-orphan")

class VendorAddressContact(Base):
    __tablename__ = "vendor_address_contacts"
    
    contact_id = Column(Integer, primary_key=True, autoincrement=True)
    address_id = Column(Integer, ForeignKey("vendor_addresses.address_id", ondelete="CASCADE"), nullable=False)
    contact_name = Column(String(255), nullable=False)
    role = Column(String(100))
    email = Column(String(255))
    phone = Column(String(50))
    is_primary = Column(Boolean, default=False)
    created_at = Column(DateTime, default=func.now())
    
    # Relationships
    address = relationship("VendorAddress", back_populates="contacts")

class AddressChain(Base):
    __tablename__ = "address_chain"
    
    chain_id = Column(Integer, primary_key=True, autoincrement=True)
    vendor_id = Column(Integer, ForeignKey("vendors.vendor_id", ondelete="CASCADE"), nullable=False)
    chain_label = Column(String(255))
    order_to_id = Column(Integer, ForeignKey("vendor_addresses.address_id"))
    ship_from_id = Column(Integer, ForeignKey("vendor_addresses.address_id"))
    invoice_from_id = Column(Integer, ForeignKey("vendor_addresses.address_id"))
    remit_to_id = Column(Integer, ForeignKey("vendor_addresses.address_id"))
    return_to_id = Column(Integer, ForeignKey("vendor_addresses.address_id"))
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=func.now())
    
    # Relationships
    vendor = relationship("Vendor", back_populates="address_chains")
    order_to = relationship("VendorAddress", foreign_keys=[order_to_id])
    ship_from = relationship("VendorAddress", foreign_keys=[ship_from_id])
    invoice_from = relationship("VendorAddress", foreign_keys=[invoice_from_id])
    remit_to = relationship("VendorAddress", foreign_keys=[remit_to_id])
    return_to = relationship("VendorAddress", foreign_keys=[return_to_id]) 