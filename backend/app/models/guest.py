from datetime import datetime

from sqlalchemy import Boolean, DateTime, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base


class Guest(Base):
    __tablename__ = "guests"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True,
    )

    name: Mapped[str] = mapped_column(
        String(150),
        nullable=False,
        index=True,
    )

    designation: Mapped[str | None] = mapped_column(
        String(200),
        nullable=True,
    )

    company: Mapped[str | None] = mapped_column(
        String(200),
        nullable=True,
    )

    short_bio: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True,
    )

    bio: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    expertise: Mapped[str | None] = mapped_column(
        String(300),
        nullable=True,
    )

    profile_image_url: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True,
    )

    linkedin_url: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True,
    )

    twitter_url: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True,
    )

    website_url: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True,
    )

    is_active: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
        nullable=False,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False,
    )

    episodes: Mapped[list["Episode"]] = relationship(
        back_populates="guest"
    )

    questions: Mapped[list["Question"]] = relationship(
        back_populates="guest"
    )