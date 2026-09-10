from datetime import datetime

from sqlalchemy import Boolean, DateTime, ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base


class Question(Base):
    __tablename__ = "questions"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True,
    )

    visitor_name: Mapped[str | None] = mapped_column(
        String(150),
        nullable=True,
    )

    visitor_email: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
        index=True,
    )

    question: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    is_approved: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False,
        index=True,
    )

    guest_id: Mapped[int] = mapped_column(
        ForeignKey("guests.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    guest: Mapped["Guest"] = relationship(
        back_populates="questions"
    )