from sqlalchemy import Column, Integer, String, Boolean
from .database import Base

class Vendor(Base):
    __tablename__ = "vendors"
    id = Column(Integer, primary_key=True, index=True)
    companyName = Column(String(255), nullable=False)
    contactPerson = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    phone = Column(String(50), nullable=False)
    alternatePhone = Column(String(50))
    website = Column(String(255))
    taxId = Column(String(100))
    businessType = Column(String(100))
    address = Column(String(255))
    city = Column(String(100))
    state = Column(String(100))
    zipCode = Column(String(20))
    country = Column(String(100))
    businessDescription = Column(String(500))
    productsServices = Column(String(500))
    certifications = Column(String(255))
    paymentTerms = Column(String(100))
    creditLimit = Column(String(100))
    isActive = Column(Boolean, default=True)
    allowProposals = Column(Boolean, default=True)
    requireApproval = Column(Boolean, default=True) 