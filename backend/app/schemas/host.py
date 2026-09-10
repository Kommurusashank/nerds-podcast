from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class HostBase(BaseModel):
    name: str = Field(
        min_length=2,
        max_length=150,
    )

    bio: str | None = None

    profile_image_url: str | None = None

    linkedin_url: str | None = None

    twitter_url: str | None = None

    instagram_url: str | None = None


class HostCreate(HostBase):
    pass


class HostUpdate(BaseModel):
    name: str | None = Field(
        default=None,
        min_length=2,
        max_length=150,
    )

    bio: str | None = None

    profile_image_url: str | None = None

    linkedin_url: str | None = None

    twitter_url: str | None = None

    instagram_url: str | None = None

    is_active: bool | None = None


class HostResponse(HostBase):
    id: int

    is_active: bool

    created_at: datetime

    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )