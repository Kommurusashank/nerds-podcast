from fastapi import APIRouter, HTTPException, status

from app.core.config import settings
from app.core.security import create_access_token

from app.schemas.admin import (
    LoginRequest,
    TokenResponse,
)


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.post(
    "/login",
    response_model=TokenResponse,
)
def login(
    login_data: LoginRequest,
):
    email = login_data.email.strip().lower()
    admin_email = settings.ADMIN_EMAIL.strip().lower()

    password = login_data.password
    admin_password = settings.ADMIN_PASSWORD

    if (
        email != admin_email
        or password != admin_password
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    access_token = create_access_token(
        subject=email,
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
    }