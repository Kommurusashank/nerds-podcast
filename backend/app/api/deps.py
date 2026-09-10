from collections.abc import Generator

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials
from fastapi.security import HTTPBearer

from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.security import decode_access_token

from app.database.session import SessionLocal


security_scheme = HTTPBearer()


def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


def get_current_admin(
    credentials: HTTPAuthorizationCredentials = Depends(
        security_scheme
    ),
) -> str:
    token = credentials.credentials

    email = decode_access_token(
        token
    )

    if not email:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        )

    if email != settings.ADMIN_EMAIL:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Unauthorized",
        )

    return email