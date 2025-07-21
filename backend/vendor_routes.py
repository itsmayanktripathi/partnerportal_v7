from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from . import schemas, vendor_service
from .database import get_db

router = APIRouter(prefix="/vendors", tags=["vendors"])

@router.post("/", response_model=schemas.Vendor, status_code=status.HTTP_201_CREATED)
def create_vendor(vendor: schemas.VendorCreate, db: Session = Depends(get_db)):
    """Create a new vendor with addresses and address chains"""
    service = vendor_service.VendorService(db)
    try:
        return service.create_vendor(vendor)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Failed to create vendor: {str(e)}"
        )

@router.get("", response_model=List[schemas.Vendor])
def get_vendors_no_slash(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Get all vendors with pagination (no trailing slash)"""
    service = vendor_service.VendorService(db)
    return service.get_vendors(skip=skip, limit=limit)

@router.get("/{vendor_id}", response_model=schemas.VendorDetail)
def get_vendor(vendor_id: int, db: Session = Depends(get_db)):
    """Get vendor by ID with all related data"""
    service = vendor_service.VendorService(db)
    vendor = service.get_vendor(vendor_id)
    if not vendor:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Vendor not found"
        )
    return vendor

@router.put("/{vendor_id}", response_model=schemas.Vendor)
def update_vendor(vendor_id: int, vendor: schemas.VendorUpdate, db: Session = Depends(get_db)):
    """Update vendor basic information"""
    service = vendor_service.VendorService(db)
    updated_vendor = service.update_vendor(vendor_id, vendor)
    if not updated_vendor:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Vendor not found"
        )
    return updated_vendor

@router.delete("/{vendor_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_vendor(vendor_id: int, db: Session = Depends(get_db)):
    """Delete vendor and all related data"""
    service = vendor_service.VendorService(db)
    if not service.delete_vendor(vendor_id):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Vendor not found"
        )

# Address management endpoints
@router.post("/{vendor_id}/addresses", response_model=schemas.VendorAddress)
def add_vendor_address(vendor_id: int, address: schemas.VendorAddressCreate, db: Session = Depends(get_db)):
    """Add a new address to a vendor"""
    service = vendor_service.VendorService(db)
    new_address = service.add_vendor_address(vendor_id, address)
    if not new_address:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Vendor not found"
        )
    return new_address

@router.put("/addresses/{address_id}", response_model=schemas.VendorAddress)
def update_vendor_address(address_id: int, address: schemas.VendorAddressCreate, db: Session = Depends(get_db)):
    """Update a vendor address"""
    service = vendor_service.VendorService(db)
    updated_address = service.update_vendor_address(address_id, address)
    if not updated_address:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Address not found"
        )
    return updated_address

@router.delete("/addresses/{address_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_vendor_address(address_id: int, db: Session = Depends(get_db)):
    """Delete a vendor address"""
    service = vendor_service.VendorService(db)
    if not service.delete_vendor_address(address_id):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Address not found"
        )

# Address chain management endpoints
@router.post("/{vendor_id}/address-chains", response_model=schemas.AddressChain)
def create_address_chain(vendor_id: int, chain: schemas.AddressChainCreate, db: Session = Depends(get_db)):
    """Create a new address chain for a vendor"""
    service = vendor_service.VendorService(db)
    new_chain = service.create_address_chain(vendor_id, chain)
    if not new_chain:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Vendor not found"
        )
    return new_chain

@router.put("/address-chains/{chain_id}", response_model=schemas.AddressChain)
def update_address_chain(chain_id: int, chain: schemas.AddressChainCreate, db: Session = Depends(get_db)):
    """Update an address chain"""
    service = vendor_service.VendorService(db)
    updated_chain = service.update_address_chain(chain_id, chain)
    if not updated_chain:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Address chain not found"
        )
    return updated_chain

@router.delete("/address-chains/{chain_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_address_chain(chain_id: int, db: Session = Depends(get_db)):
    """Delete an address chain"""
    service = vendor_service.VendorService(db)
    if not service.delete_address_chain(chain_id):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Address chain not found"
        )

# Utility endpoints
@router.get("/address-types", response_model=List[schemas.AddressType])
def get_address_types(db: Session = Depends(get_db)):
    """Get all available address types"""
    service = vendor_service.VendorService(db)
    return service.get_address_types()

@router.get("/{vendor_id}/addresses", response_model=List[schemas.VendorAddress])
def get_vendor_addresses(vendor_id: int, db: Session = Depends(get_db)):
    """Get all addresses for a vendor"""
    service = vendor_service.VendorService(db)
    return service.get_vendor_addresses(vendor_id)

@router.get("/{vendor_id}/address-chains", response_model=List[schemas.AddressChain])
def get_vendor_address_chains(vendor_id: int, db: Session = Depends(get_db)):
    """Get all address chains for a vendor"""
    service = vendor_service.VendorService(db)
    return service.get_vendor_address_chains(vendor_id) 