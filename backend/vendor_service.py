from sqlalchemy.orm import Session
from sqlalchemy import and_
from typing import List, Optional
from . import models, schemas
from datetime import date

class VendorService:
    def __init__(self, db: Session):
        self.db = db

    def create_vendor(self, vendor_data: schemas.VendorCreate) -> models.Vendor:
        """Create a new vendor with addresses and address chains"""
        # Create vendor
        vendor = models.Vendor(
            legal_name=vendor_data.legal_name,
            trade_name=vendor_data.trade_name,
            tax_id=vendor_data.tax_id,
            registration_number=vendor_data.registration_number,
            business_type=vendor_data.business_type,
            country_of_incorp=vendor_data.country_of_incorp,
            date_established=vendor_data.date_established
        )
        self.db.add(vendor)
        self.db.flush()  # Get the vendor_id

        # Create addresses
        address_map = {}  # To map type_code to address_id for chains
        for address_data in vendor_data.addresses:
            address = models.VendorAddress(
                vendor_id=vendor.vendor_id,
                type_code=address_data.type_code,
                contact_name=address_data.contact_name,
                phone=address_data.phone,
                email=address_data.email,
                address_line1=address_data.address_line1,
                address_line2=address_data.address_line2,
                city=address_data.city,
                state=address_data.state,
                postal_code=address_data.postal_code,
                country=address_data.country,
                is_default=address_data.is_default
            )
            self.db.add(address)
            self.db.flush()  # Get the address_id
            
            # Create contacts for this address
            for contact_data in address_data.contacts:
                contact = models.VendorAddressContact(
                    address_id=address.address_id,
                    contact_name=contact_data.contact_name,
                    role=contact_data.role,
                    email=contact_data.email,
                    phone=contact_data.phone,
                    is_primary=contact_data.is_primary
                )
                self.db.add(contact)
            
            # Store address mapping for chains
            address_map[address_data.type_code] = address.address_id

        # Create address chains
        for chain_data in vendor_data.address_chains:
            chain = models.AddressChain(
                vendor_id=vendor.vendor_id,
                chain_label=chain_data.chain_label,
                order_to_id=address_map.get('order_to') if chain_data.order_to_id is None else chain_data.order_to_id,
                ship_from_id=address_map.get('ship_from') if chain_data.ship_from_id is None else chain_data.ship_from_id,
                invoice_from_id=address_map.get('invoice_from') if chain_data.invoice_from_id is None else chain_data.invoice_from_id,
                remit_to_id=address_map.get('remit_to') if chain_data.remit_to_id is None else chain_data.remit_to_id,
                return_to_id=address_map.get('return_to') if chain_data.return_to_id is None else chain_data.return_to_id,
                is_active=chain_data.is_active
            )
            self.db.add(chain)

        self.db.commit()
        self.db.refresh(vendor)
        return vendor

    def get_vendor(self, vendor_id: int) -> Optional[models.Vendor]:
        """Get vendor by ID with all related data"""
        return self.db.query(models.Vendor).filter(models.Vendor.vendor_id == vendor_id).first()

    def get_vendors(self, skip: int = 0, limit: int = 100) -> List[models.Vendor]:
        """Get all vendors with pagination"""
        return self.db.query(models.Vendor).offset(skip).limit(limit).all()

    def update_vendor(self, vendor_id: int, vendor_data: schemas.VendorUpdate) -> Optional[models.Vendor]:
        """Update vendor basic information"""
        vendor = self.get_vendor(vendor_id)
        if not vendor:
            return None

        update_data = vendor_data.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(vendor, field, value)

        self.db.commit()
        self.db.refresh(vendor)
        return vendor

    def delete_vendor(self, vendor_id: int) -> bool:
        """Delete vendor and all related data"""
        vendor = self.get_vendor(vendor_id)
        if not vendor:
            return False

        self.db.delete(vendor)
        self.db.commit()
        return True

    def add_vendor_address(self, vendor_id: int, address_data: schemas.VendorAddressCreate) -> Optional[models.VendorAddress]:
        """Add a new address to a vendor"""
        vendor = self.get_vendor(vendor_id)
        if not vendor:
            return None

        address = models.VendorAddress(
            vendor_id=vendor_id,
            type_code=address_data.type_code,
            contact_name=address_data.contact_name,
            phone=address_data.phone,
            email=address_data.email,
            address_line1=address_data.address_line1,
            address_line2=address_data.address_line2,
            city=address_data.city,
            state=address_data.state,
            postal_code=address_data.postal_code,
            country=address_data.country,
            is_default=address_data.is_default
        )
        self.db.add(address)
        self.db.flush()

        # Add contacts
        for contact_data in address_data.contacts:
            contact = models.VendorAddressContact(
                address_id=address.address_id,
                contact_name=contact_data.contact_name,
                role=contact_data.role,
                email=contact_data.email,
                phone=contact_data.phone,
                is_primary=contact_data.is_primary
            )
            self.db.add(contact)

        self.db.commit()
        self.db.refresh(address)
        return address

    def update_vendor_address(self, address_id: int, address_data: schemas.VendorAddressCreate) -> Optional[models.VendorAddress]:
        """Update a vendor address"""
        address = self.db.query(models.VendorAddress).filter(models.VendorAddress.address_id == address_id).first()
        if not address:
            return None

        # Update address fields
        update_data = address_data.dict(exclude={'contacts'}, exclude_unset=True)
        for field, value in update_data.items():
            setattr(address, field, value)

        # Update contacts (delete existing and create new)
        self.db.query(models.VendorAddressContact).filter(
            models.VendorAddressContact.address_id == address_id
        ).delete()

        for contact_data in address_data.contacts:
            contact = models.VendorAddressContact(
                address_id=address_id,
                contact_name=contact_data.contact_name,
                role=contact_data.role,
                email=contact_data.email,
                phone=contact_data.phone,
                is_primary=contact_data.is_primary
            )
            self.db.add(contact)

        self.db.commit()
        self.db.refresh(address)
        return address

    def delete_vendor_address(self, address_id: int) -> bool:
        """Delete a vendor address"""
        address = self.db.query(models.VendorAddress).filter(models.VendorAddress.address_id == address_id).first()
        if not address:
            return False

        self.db.delete(address)
        self.db.commit()
        return True

    def create_address_chain(self, vendor_id: int, chain_data: schemas.AddressChainCreate) -> Optional[models.AddressChain]:
        """Create a new address chain for a vendor"""
        vendor = self.get_vendor(vendor_id)
        if not vendor:
            return None

        chain = models.AddressChain(
            vendor_id=vendor_id,
            chain_label=chain_data.chain_label,
            order_to_id=chain_data.order_to_id,
            ship_from_id=chain_data.ship_from_id,
            invoice_from_id=chain_data.invoice_from_id,
            remit_to_id=chain_data.remit_to_id,
            return_to_id=chain_data.return_to_id,
            is_active=chain_data.is_active
        )
        self.db.add(chain)
        self.db.commit()
        self.db.refresh(chain)
        return chain

    def update_address_chain(self, chain_id: int, chain_data: schemas.AddressChainCreate) -> Optional[models.AddressChain]:
        """Update an address chain"""
        chain = self.db.query(models.AddressChain).filter(models.AddressChain.chain_id == chain_id).first()
        if not chain:
            return None

        update_data = chain_data.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(chain, field, value)

        self.db.commit()
        self.db.refresh(chain)
        return chain

    def delete_address_chain(self, chain_id: int) -> bool:
        """Delete an address chain"""
        chain = self.db.query(models.AddressChain).filter(models.AddressChain.chain_id == chain_id).first()
        if not chain:
            return False

        self.db.delete(chain)
        self.db.commit()
        return True

    def get_address_types(self) -> List[models.AddressType]:
        """Get all address types"""
        return self.db.query(models.AddressType).all()

    def get_vendor_addresses(self, vendor_id: int) -> List[models.VendorAddress]:
        """Get all addresses for a vendor"""
        return self.db.query(models.VendorAddress).filter(models.VendorAddress.vendor_id == vendor_id).all()

    def get_vendor_address_chains(self, vendor_id: int) -> List[models.AddressChain]:
        """Get all address chains for a vendor"""
        return self.db.query(models.AddressChain).filter(models.AddressChain.vendor_id == vendor_id).all() 