from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_admin, get_db

from app.crud import category as category_crud

from app.schemas.category import (
    CategoryCreate,
    CategoryResponse,
    CategoryUpdate,
)


router = APIRouter(
    prefix="/categories",
    tags=["Categories"],
)


# ------------------------------------
# ADMIN - CREATE CATEGORY
# ------------------------------------

@router.post(
    "",
    response_model=CategoryResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_category(
    category_data: CategoryCreate,
    db: Session = Depends(get_db),
    admin: str = Depends(get_current_admin),
):
    existing_category = (
        category_crud.get_category_by_name(
            db,
            category_data.name,
        )
    )

    if existing_category:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Category already exists",
        )

    return category_crud.create_category(
        db,
        category_data,
    )


# ------------------------------------
# PUBLIC - GET ALL CATEGORIES
# ------------------------------------

@router.get(
    "",
    response_model=list[CategoryResponse],
)
def get_categories(
    db: Session = Depends(get_db),
):
    return category_crud.get_categories(db)


# ------------------------------------
# PUBLIC - GET SINGLE CATEGORY
# ------------------------------------

@router.get(
    "/{category_id}",
    response_model=CategoryResponse,
)
def get_category(
    category_id: int,
    db: Session = Depends(get_db),
):
    category = (
        category_crud.get_category_by_id(
            db,
            category_id,
        )
    )

    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found",
        )

    return category


# ------------------------------------
# ADMIN - UPDATE CATEGORY
# ------------------------------------

@router.put(
    "/{category_id}",
    response_model=CategoryResponse,
)
def update_category(
    category_id: int,
    category_data: CategoryUpdate,
    db: Session = Depends(get_db),
    admin: str = Depends(get_current_admin),
):
    category = (
        category_crud.get_category_by_id(
            db,
            category_id,
        )
    )

    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found",
        )

    return category_crud.update_category(
        db,
        category,
        category_data,
    )


# ------------------------------------
# ADMIN - DELETE CATEGORY
# ------------------------------------

@router.delete(
    "/{category_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_category(
    category_id: int,
    db: Session = Depends(get_db),
    admin: str = Depends(get_current_admin),
):
    category = (
        category_crud.get_category_by_id(
            db,
            category_id,
        )
    )

    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found",
        )

    category_crud.delete_category(
        db,
        category,
    )