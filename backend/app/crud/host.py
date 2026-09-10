from sqlalchemy.orm import Session

from app.models.host import Host
from app.schemas.host import HostCreate, HostUpdate


def create_host(
    db: Session,
    host_data: HostCreate,
) -> Host:
    host = Host(
        **host_data.model_dump()
    )

    db.add(host)
    db.commit()
    db.refresh(host)

    return host


def get_hosts(
    db: Session,
) -> list[Host]:
    return (
        db.query(Host)
        .order_by(Host.name)
        .all()
    )


def get_host_by_id(
    db: Session,
    host_id: int,
) -> Host | None:
    return (
        db.query(Host)
        .filter(Host.id == host_id)
        .first()
    )


def update_host(
    db: Session,
    host: Host,
    host_data: HostUpdate,
) -> Host:
    update_data = host_data.model_dump(
        exclude_unset=True
    )

    for field, value in update_data.items():
        setattr(host, field, value)

    db.commit()
    db.refresh(host)

    return host


def delete_host(
    db: Session,
    host: Host,
) -> None:
    db.delete(host)
    db.commit()