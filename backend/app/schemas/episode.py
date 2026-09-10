from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


# -------------------------
# Nested response schemas
# -------------------------

class EpisodeGuestResponse(BaseModel):
    id: int
    name: str
    designation: str | None
    company: str | None
    short_bio: str | None
    expertise: str | None
    profile_image_url: str | None

    model_config = ConfigDict(
        from_attributes=True
    )


class EpisodeCategoryResponse(BaseModel):
    id: int
    name: str
    description: str | None

    model_config = ConfigDict(
        from_attributes=True
    )


class EpisodeHostResponse(BaseModel):
    id: int
    name: str
    bio: str | None
    profile_image_url: str | None

    model_config = ConfigDict(
        from_attributes=True
    )


# -------------------------
# Base schema
# -------------------------

class EpisodeBase(BaseModel):
    episode_number: int = Field(
        gt=0
    )

    title: str = Field(
        min_length=3,
        max_length=300
    )

    description: str | None = None

    youtube_url: str = Field(
        min_length=5,
        max_length=500
    )

    youtube_video_id: str | None = Field(
        default=None,
        max_length=100
    )

    thumbnail_url: str | None = None

    duration_seconds: int | None = Field(
        default=None,
        ge=0
    )

    guest_id: int = Field(
        gt=0
    )

    category_id: int = Field(
        gt=0
    )

    host_ids: list[int] = Field(
        min_length=1
    )


# -------------------------
# Create
# -------------------------

class EpisodeCreate(EpisodeBase):
    pass


# -------------------------
# Update
# -------------------------

class EpisodeUpdate(BaseModel):
    episode_number: int | None = Field(
        default=None,
        gt=0
    )

    title: str | None = Field(
        default=None,
        min_length=3,
        max_length=300
    )

    description: str | None = None

    youtube_url: str | None = None

    youtube_video_id: str | None = None

    thumbnail_url: str | None = None

    duration_seconds: int | None = Field(
        default=None,
        ge=0
    )

    is_published: bool | None = None

    published_at: datetime | None = None

    guest_id: int | None = Field(
        default=None,
        gt=0
    )

    category_id: int | None = Field(
        default=None,
        gt=0
    )

    host_ids: list[int] | None = None


# -------------------------
# Full response
# -------------------------

class EpisodeResponse(BaseModel):
    id: int

    episode_number: int
    title: str
    description: str | None

    youtube_url: str
    youtube_video_id: str | None

    thumbnail_url: str | None
    duration_seconds: int | None

    is_published: bool
    published_at: datetime | None

    created_at: datetime
    updated_at: datetime

    guest: EpisodeGuestResponse
    category: EpisodeCategoryResponse
    hosts: list[EpisodeHostResponse]

    model_config = ConfigDict(
        from_attributes=True
    )