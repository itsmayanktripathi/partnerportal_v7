import os
from typing import List
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    # API Configuration
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "PartnerPortal API"
    VERSION: str = "1.0.0"
    DESCRIPTION: str = "PartnerPortal Vendor Management System API"
    
    # Server Configuration
    HOST: str = os.getenv("HOST", "0.0.0.0")
    PORT: int = int(os.getenv("PORT", "8000"))
    DEBUG: bool = os.getenv("DEBUG", "True").lower() == "true"
    
    # Database Configuration
    DB_USER: str = os.getenv("MYSQL_USER", "root")
    DB_PASSWORD: str = os.getenv("MYSQL_PASSWORD", "rootpwd01")
    DB_HOST: str = os.getenv("MYSQL_HOST", "localhost")
    DB_PORT: str = os.getenv("MYSQL_PORT", "3306")
    DB_NAME: str = os.getenv("MYSQL_DB", "partner_portal")
    
    # CORS Configuration
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",  # Next.js dev server
        "http://127.0.0.1:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3001",
    ]
    
    # Add production origins when deploying
    if os.getenv("ENVIRONMENT") == "production":
        CORS_ORIGINS.extend([
            os.getenv("FRONTEND_URL", ""),
            os.getenv("ADMIN_URL", ""),
        ])
    
    # Security Configuration
    SECRET_KEY: str = os.getenv("SECRET_KEY", "your-secret-key-here")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))
    
    # File Upload Configuration
    MAX_FILE_SIZE: int = int(os.getenv("MAX_FILE_SIZE", "10485760"))  # 10MB
    UPLOAD_DIR: str = os.getenv("UPLOAD_DIR", "uploads")
    
    # Email Configuration
    SMTP_SERVER: str = os.getenv("SMTP_SERVER", "smtp.gmail.com")
    SMTP_PORT: int = int(os.getenv("SMTP_PORT", "587"))
    SMTP_USERNAME: str = os.getenv("SMTP_USERNAME", "")
    SMTP_PASSWORD: str = os.getenv("SMTP_PASSWORD", "")
    FROM_EMAIL: str = os.getenv("FROM_EMAIL", "noreply@partnerportal.com")
    
    # Logging Configuration
    LOG_LEVEL: str = os.getenv("LOG_LEVEL", "INFO")
    LOG_FILE: str = os.getenv("LOG_FILE", "logs/app.log")
    
    @property
    def DATABASE_URL(self) -> str:
        return f"mysql+mysqlconnector://{self.DB_USER}:{self.DB_PASSWORD}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"
    
    @property
    def API_BASE_URL(self) -> str:
        """Get the base URL for the API"""
        protocol = "https" if os.getenv("ENVIRONMENT") == "production" else "http"
        return f"{protocol}://{self.HOST}:{self.PORT}"
    
    @property
    def FRONTEND_URL(self) -> str:
        """Get the frontend URL"""
        if os.getenv("ENVIRONMENT") == "production":
            return os.getenv("FRONTEND_URL", "https://partnerportal.com")
        return "http://localhost:3000"
    
    class Config:
        env_file = ".env"
        case_sensitive = True

# Create a global settings instance
settings = Settings()

# Export commonly used configurations
API_BASE_URL = settings.API_BASE_URL
FRONTEND_URL = settings.FRONTEND_URL
DATABASE_URL = settings.DATABASE_URL
CORS_ORIGINS = settings.CORS_ORIGINS 