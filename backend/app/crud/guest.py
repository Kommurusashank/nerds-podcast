from sqlalchemy.orm import Session

from app.models.guest import Guest
from app.schemas.guest import GuestCreate, GuestUpdate


def create_guest(
    db: Session,
    guest_data: GuestCreate,
) -> Guest:
    guest = Guest(
        **guest_data.model_dump()
    )

    db.add(guest)
    db.commit()
    db.refresh(guest)

    return guest


def get_guests(
    db: Session,
) -> list[Guest]:
    return (
        db.query(Guest)
        .order_by(Guest.name)
        .all()
    )


def get_guest_by_id(
    db: Session,
    guest_id: int,
) -> Guest | None:
    return (
        db.query(Guest)
        .filter(Guest.id == guest_id)
        .first()
    )


def update_guest(
    db: Session,
    guest: Guest,
    guest_data: GuestUpdate,
) -> Guest:
    update_data = guest_data.model_dump(
        exclude_unset=True
    )

    for field, value in update_data.items():
        setattr(guest, field, value)

    db.commit()
    db.refresh(guest)

    return guest


def delete_guest(
    db: Session,
    guest: Guest,
) -> None:
    db.delete(guest)
    db.commit()