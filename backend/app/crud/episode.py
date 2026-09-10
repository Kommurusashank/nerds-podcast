from sqlalchemy.orm import Session, joinedload

from app.models.episode import Episode
from app.models.host import Host

from app.schemas.episode import (
    EpisodeCreate,
    EpisodeUpdate,
)


def create_episode(
    db: Session,
    episode_data: EpisodeCreate,
) -> Episode:

    episode_dict = episode_data.model_dump(
        exclude={"host_ids"}
    )

    episode = Episode(
        **episode_dict
    )

    hosts = (
        db.query(Host)
        .filter(
            Host.id.in_(
                episode_data.host_ids
            )
        )
        .all()
    )

    episode.hosts = hosts

    db.add(episode)
    db.commit()
    db.refresh(episode)

    return get_episode_by_id(
        db,
        episode.id
    )


def get_episodes(
    db: Session,
) -> list[Episode]:

    return (
        db.query(Episode)
        .options(
            joinedload(Episode.guest),
            joinedload(Episode.category),
            joinedload(Episode.hosts),
        )
        .order_by(
            Episode.episode_number.desc()
        )
        .all()
    )


def get_episode_by_id(
    db: Session,
    episode_id: int,
) -> Episode | None:

    return (
        db.query(Episode)
        .options(
            joinedload(Episode.guest),
            joinedload(Episode.category),
            joinedload(Episode.hosts),
        )
        .filter(
            Episode.id == episode_id
        )
        .first()
    )


def update_episode(
    db: Session,
    episode: Episode,
    episode_data: EpisodeUpdate,
) -> Episode:

    update_data = episode_data.model_dump(
        exclude_unset=True
    )

    host_ids = update_data.pop(
        "host_ids",
        None
    )

    for field, value in update_data.items():
        setattr(
            episode,
            field,
            value
        )

    if host_ids is not None:

        hosts = (
            db.query(Host)
            .filter(
                Host.id.in_(host_ids)
            )
            .all()
        )

        episode.hosts = hosts

    db.commit()

    return get_episode_by_id(
        db,
        episode.id
    )


def delete_episode(
    db: Session,
    episode: Episode,
) -> None:

    db.delete(episode)

    db.commit()