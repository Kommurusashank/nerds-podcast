from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class GuestBase(BaseModel):
    name: str = Field(
        min_length=2,
        max_length=150,
    )

    designation: str | None = None
    company: str | None = None

    short_bio: str | None = Field(
        default=None,
        max_length=500,
    )

    bio: str | None = None

    expertise: str | None = Field(
        default=None,
        max_length=300,
    )

    profile_image_url: str | None = None

    linkedin_url: str | None = None
    twitter_url: str | None = None
    website_url: str | None = None


class GuestCreate(GuestBase):
    pass


class GuestUpdate(BaseModel):
    name: str | None = Field(
        default=None,
        min_length=2,
        max_length=150,
    )

    designation: str | None = None
    company: str | None = None
    short_bio: str | None = None
    bio: str | None = None
    expertise: str | None = None

    profile_image_url: str | None = None
    linkedin_url: str | None = None
    twitter_url: str | None = None
    website_url: str | None = None

    is_active: bool | None = None


class GuestResponse(GuestBase):
    id: int
    is_active: bool
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)