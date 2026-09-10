from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

from app.api.router import api_router
from app.database.base import Base
from app.database.session import engine

# Import all models before create_all()
from app.models.category import Category
from app.models.episode import Episode
from app.models.episode_host import episode_hosts
from app.models.guest import Guest
from app.models.host import Host
from app.models.question import Question


app = FastAPI(
    title="Nerds Podcast API",
    description="Backend API for the Nerds Podcast platform",
    version="1.0.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://nerds-podcast-frontend.onrender.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Development only.
# Alembic migrations will replace this before production.
Base.metadata.create_all(bind=engine)


app.include_router(
    api_router,
    prefix="/api",
)


@app.get("/", tags=["Health"])
def root():
    return {
        "message": "Welcome to Nerds Podcast API"
    }


@app.get("/health", tags=["Health"])
def health_check():
    return {
        "status": "healthy"
    }


@app.get("/database-health", tags=["Health"])
def database_health_check():
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))

        return {
            "database": "connected"
        }

    except Exception as error:
        return {
            "database": "disconnected",
            "error": str(error)
        }