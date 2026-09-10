from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_admin, get_db
from app.crud import host as host_crud

from app.schemas.host import (
    HostCreate,
    HostResponse,
    HostUpdate,
)


router = APIRouter(
    prefix="/hosts",
    tags=["Hosts"],
)


# ------------------------------------
# ADMIN - CREATE HOST
# ------------------------------------

@router.post(
    "",
    response_model=HostResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_host(
    host_data: HostCreate,
    db: Session = Depends(get_db),
    admin: str = Depends(get_current_admin),
):
    return host_crud.create_host(
        db,
        host_data,
    )


# ------------------------------------
# PUBLIC - GET ALL HOSTS
# ------------------------------------

@router.get(
    "",
    response_model=list[HostResponse],
)
def get_hosts(
    db: Session = Depends(get_db),
):
    return host_crud.get_hosts(db)


# ------------------------------------
# PUBLIC - GET SINGLE HOST
# ------------------------------------

@router.get(
    "/{host_id}",
    response_model=HostResponse,
)
def get_host(
    host_id: int,
    db: Session = Depends(get_db),
):
    host = host_crud.get_host_by_id(
        db,
        host_id,
    )

    if not host:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Host not found",
        )

    return host


# ------------------------------------
# ADMIN - UPDATE HOST
# ------------------------------------

@router.put(
    "/{host_id}",
    response_model=HostResponse,
)
def update_host(
    host_id: int,
    host_data: HostUpdate,
    db: Session = Depends(get_db),
    admin: str = Depends(get_current_admin),
):
    host = host_crud.get_host_by_id(
        db,
        host_id,
    )

    if not host:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Host not found",
        )

    return host_crud.update_host(
        db,
        host,
        host_data,
    )


# ------------------------------------
# ADMIN - DELETE HOST
# ------------------------------------

@router.delete(
    "/{host_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_host(
    host_id: int,
    db: Session = Depends(get_db),
    admin: str = Depends(get_current_admin),
):
    host = host_crud.get_host_by_id(
        db,
        host_id,
    )

    if not host:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Host not found",
        )

    host_crud.delete_host(
        db,
        host,
    )