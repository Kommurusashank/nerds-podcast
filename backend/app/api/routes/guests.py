from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_admin, get_db
from app.crud import guest as guest_crud

from app.schemas.guest import (
    GuestCreate,
    GuestResponse,
    GuestUpdate,
)


router = APIRouter(
    prefix="/guests",
    tags=["Guests"],
)


# ------------------------------------
# ADMIN - CREATE GUEST
# ------------------------------------

@router.post(
    "",
    response_model=GuestResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_guest(
    guest_data: GuestCreate,
    db: Session = Depends(get_db),
    admin: str = Depends(get_current_admin),
):
    return guest_crud.create_guest(
        db,
        guest_data,
    )


# ------------------------------------
# PUBLIC - GET ALL GUESTS
# ------------------------------------

@router.get(
    "",
    response_model=list[GuestResponse],
)
def get_guests(
    db: Session = Depends(get_db),
):
    return guest_crud.get_guests(db)


# ------------------------------------
# PUBLIC - GET SINGLE GUEST
# ------------------------------------

@router.get(
    "/{guest_id}",
    response_model=GuestResponse,
)
def get_guest(
    guest_id: int,
    db: Session = Depends(get_db),
):
    guest = guest_crud.get_guest_by_id(
        db,
        guest_id,
    )

    if not guest:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Guest not found",
        )

    return guest


# ------------------------------------
# ADMIN - UPDATE GUEST
# ------------------------------------

@router.put(
    "/{guest_id}",
    response_model=GuestResponse,
)
def update_guest(
    guest_id: int,
    guest_data: GuestUpdate,
    db: Session = Depends(get_db),
    admin: str = Depends(get_current_admin),
):
    guest = guest_crud.get_guest_by_id(
        db,
        guest_id,
    )

    if not guest:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Guest not found",
        )

    return guest_crud.update_guest(
        db,
        guest,
        guest_data,
    )


# ------------------------------------
# ADMIN - DELETE GUEST
# ------------------------------------

@router.delete(
    "/{guest_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_guest(
    guest_id: int,
    db: Session = Depends(get_db),
    admin: str = Depends(get_current_admin),
):
    guest = guest_crud.get_guest_by_id(
        db,
        guest_id,
    )

    if not guest:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Guest not found",
        )

    guest_crud.delete_guest(
        db,
        guest,
    )