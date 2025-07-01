from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from . import models
from pydantic import BaseModel
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware
from .database import SessionLocal, engine, Base

app = FastAPI()

# CORS setup for development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class VendorCreate(BaseModel):
    companyName: str
    contactPerson: str
    email: str
    phone: str
    alternatePhone: Optional[str] = None
    website: Optional[str] = None
    taxId: Optional[str] = None
    businessType: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    zipCode: Optional[str] = None
    country: Optional[str] = None
    businessDescription: Optional[str] = None
    productsServices: Optional[str] = None
    certifications: Optional[str] = None
    paymentTerms: Optional[str] = None
    creditLimit: Optional[str] = None
    isActive: Optional[bool] = True
    allowProposals: Optional[bool] = True
    requireApproval: Optional[bool] = True

@app.post("/vendors")
def create_vendor(vendor: VendorCreate, db: Session = Depends(get_db)):
    db_vendor = models.Vendor(**vendor.dict())
    db.add(db_vendor)
    db.commit()
    db.refresh(db_vendor)
    return db_vendor 