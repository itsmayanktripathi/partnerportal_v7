CREATE DATABASE IF NOT EXISTS partner_portal;
USE partner_portal;

CREATE TABLE IF NOT EXISTS vendors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    companyName VARCHAR(255) NOT NULL,
    contactPerson VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    alternatePhone VARCHAR(50),
    website VARCHAR(255),
    taxId VARCHAR(100),
    businessType VARCHAR(100),
    address VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    zipCode VARCHAR(20),
    country VARCHAR(100),
    businessDescription VARCHAR(500),
    productsServices VARCHAR(500),
    certifications VARCHAR(255),
    paymentTerms VARCHAR(100),
    creditLimit VARCHAR(100),
    isActive BOOLEAN DEFAULT TRUE,
    allowProposals BOOLEAN DEFAULT TRUE,
    requireApproval BOOLEAN DEFAULT TRUE
); 