from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_admin, get_db

from app.crud import category as category_crud
from app.crud import episode as episode_crud
from app.crud import guest as guest_crud

from app.models.host import Host

from app.schemas.episode import (
    EpisodeCreate,
    EpisodeResponse,
    EpisodeUpdate,
)


router = APIRouter(
    prefix="/episodes",
    tags=["Episodes"],
)


def validate_episode_relationships(
    db: Session,
    guest_id: int,
    category_id: int,
    host_ids: list[int],
):
    # Check Guest
    guest = guest_crud.get_guest_by_id(
        db,
        guest_id,
    )

    if not guest:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Guest does not exist",
        )

    # Check Category
    category = category_crud.get_category_by_id(
        db,
        category_id,
    )

    if not category:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Category does not exist",
        )

    # Prevent duplicate host IDs
    unique_host_ids = list(set(host_ids))

    # Check Hosts
    hosts = (
        db.query(Host)
        .filter(
            Host.id.in_(unique_host_ids)
        )
        .all()
    )

    if len(hosts) != len(unique_host_ids):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="One or more hosts do not exist",
        )


# ------------------------------------
# ADMIN - CREATE EPISODE
# ------------------------------------

@router.post(
    "",
    response_model=EpisodeResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_episode(
    episode_data: EpisodeCreate,
    db: Session = Depends(get_db),
    admin: str = Depends(get_current_admin),
):
    validate_episode_relationships(
        db=db,
        guest_id=episode_data.guest_id,
        category_id=episode_data.category_id,
        host_ids=episode_data.host_ids,
    )

    return episode_crud.create_episode(
        db,
        episode_data,
    )


# ------------------------------------
# PUBLIC - GET ALL EPISODES
# ------------------------------------

@router.get(
    "",
    response_model=list[EpisodeResponse],
)
def get_episodes(
    db: Session = Depends(get_db),
):
    return episode_crud.get_episodes(db)


# ------------------------------------
# PUBLIC - GET SINGLE EPISODE
# ------------------------------------

@router.get(
    "/{episode_id}",
    response_model=EpisodeResponse,
)
def get_episode(
    episode_id: int,
    db: Session = Depends(get_db),
):
    episode = episode_crud.get_episode_by_id(
        db,
        episode_id,
    )

    if not episode:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Episode not found",
        )

    return episode


# ------------------------------------
# ADMIN - UPDATE EPISODE
# ------------------------------------

@router.put(
    "/{episode_id}",
    response_model=EpisodeResponse,
)
def update_episode(
    episode_id: int,
    episode_data: EpisodeUpdate,
    db: Session = Depends(get_db),
    admin: str = Depends(get_current_admin),
):
    episode = episode_crud.get_episode_by_id(
        db,
        episode_id,
    )

    if not episode:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Episode not found",
        )

    # Use new guest ID if provided.
    # Otherwise keep existing guest.
    new_guest_id = (
        episode_data.guest_id
        if episode_data.guest_id is not None
        else episode.guest_id
    )

    # Use new category ID if provided.
    # Otherwise keep existing category.
    new_category_id = (
        episode_data.category_id
        if episode_data.category_id is not None
        else episode.category_id
    )

    # Use new host IDs if provided.
    # Otherwise keep existing hosts.
    new_host_ids = (
        episode_data.host_ids
        if episode_data.host_ids is not None
        else [
            host.id
            for host in episode.hosts
        ]
    )

    # Validate all relationships
    validate_episode_relationships(
        db=db,
        guest_id=new_guest_id,
        category_id=new_category_id,
        host_ids=new_host_ids,
    )

    return episode_crud.update_episode(
        db,
        episode,
        episode_data,
    )


# ------------------------------------
# ADMIN - DELETE EPISODE
# ------------------------------------

@router.delete(
    "/{episode_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_episode(
    episode_id: int,
    db: Session = Depends(get_db),
    admin: str = Depends(get_current_admin),
):
    episode = episode_crud.get_episode_by_id(
        db,
        episode_id,
    )

    if not episode:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Episode not found",
        )

    episode_crud.delete_episode(
        db,
        episode,
    )