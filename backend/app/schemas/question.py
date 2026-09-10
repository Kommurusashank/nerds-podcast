from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class QuestionCreate(BaseModel):
    visitor_name: str | None = Field(
        default=None,
        max_length=150,
    )

    visitor_email: EmailStr | None = None

    question: str = Field(
        min_length=5,
        max_length=5000,
    )

    guest_id: int = Field(
        gt=0,
    )


class QuestionResponse(BaseModel):
    id: int

    visitor_name: str | None
    visitor_email: EmailStr | None

    question: str
    is_approved: bool

    guest_id: int

    created_at: datetime

    model_config = ConfigDict(from_attributes=True)