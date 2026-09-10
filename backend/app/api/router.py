from fastapi import APIRouter

from app.api.routes import auth
from app.api.routes import categories
from app.api.routes import episodes
from app.api.routes import guests
from app.api.routes import hosts
from app.api.routes import questions


api_router = APIRouter()


api_router.include_router(
    auth.router
)

api_router.include_router(
    categories.router
)

api_router.include_router(
    hosts.router
)

api_router.include_router(
    guests.router
)

api_router.include_router(
    episodes.router
)

api_router.include_router(
    questions.router
)