from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .config import settings
from .vendor_routes import router as vendor_router

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description=settings.DESCRIPTION,
    debug=settings.DEBUG
)

# CORS setup using configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include vendor routes
app.include_router(vendor_router, prefix="/api/v1")

@app.get("/")
def read_root():
    return {"message": "PartnerPortal API", "version": settings.VERSION}

@app.get("/health")
def health_check():
    return {"status": "healthy"} 