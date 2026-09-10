from datetime import datetime

from sqlalchemy import Boolean, DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base


class Episode(Base):
    __tablename__ = "episodes"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True,
    )

    episode_number: Mapped[int] = mapped_column(
        Integer,
        unique=True,
        nullable=False,
        index=True,
    )

    title: Mapped[str] = mapped_column(
        String(300),
        nullable=False,
        index=True,
    )

    description: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    youtube_url: Mapped[str] = mapped_column(
        String(500),
        unique=True,
        nullable=False,
    )

    youtube_video_id: Mapped[str | None] = mapped_column(
        String(100),
        unique=True,
        nullable=True,
    )

    thumbnail_url: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True,
    )

    duration_seconds: Mapped[int | None] = mapped_column(
        Integer,
        nullable=True,
    )

    is_published: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False,
        index=True,
    )

    published_at: Mapped[datetime | None] = mapped_column(
        DateTime,
        nullable=True,
    )

    guest_id: Mapped[int] = mapped_column(
        ForeignKey("guests.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    category_id: Mapped[int] = mapped_column(
        ForeignKey("categories.id", ondelete="RESTRICT"),
        nullable=False,
        index=True,
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

    guest: Mapped["Guest"] = relationship(
        back_populates="episodes"
    )

    category: Mapped["Category"] = relationship(
        back_populates="episodes"
    )

    hosts: Mapped[list["Host"]] = relationship(
        secondary="episode_hosts",
        back_populates="episodes",
    )