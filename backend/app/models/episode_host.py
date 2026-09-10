from sqlalchemy import Column, ForeignKey, Table

from app.database.base import Base


episode_hosts = Table(
    "episode_hosts",
    Base.metadata,

    Column(
        "episode_id",
        ForeignKey("episodes.id", ondelete="CASCADE"),
        primary_key=True,
    ),

    Column(
        "host_id",
        ForeignKey("hosts.id", ondelete="CASCADE"),
        primary_key=True,
    ),
)