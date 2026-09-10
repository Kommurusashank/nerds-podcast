from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_admin, get_db

from app.crud import guest as guest_crud
from app.crud import question as question_crud

from app.schemas.question import (
    QuestionCreate,
    QuestionResponse,
)


router = APIRouter(
    prefix="/questions",
    tags=["Questions"],
)


# ------------------------------------
# PUBLIC - SUBMIT QUESTION
# ------------------------------------

@router.post(
    "",
    response_model=QuestionResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_question(
    question_data: QuestionCreate,
    db: Session = Depends(get_db),
):
    guest = guest_crud.get_guest_by_id(
        db,
        question_data.guest_id,
    )

    if not guest:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Guest does not exist",
        )

    return question_crud.create_question(
        db,
        question_data,
    )


# ------------------------------------
# ADMIN - GET ALL QUESTIONS
# ------------------------------------

@router.get(
    "",
    response_model=list[QuestionResponse],
)
def get_questions(
    db: Session = Depends(get_db),
    admin: str = Depends(get_current_admin),
):
    return question_crud.get_questions(db)


# ------------------------------------
# ADMIN - APPROVE QUESTION
# ------------------------------------

@router.put(
    "/{question_id}/approve",
    response_model=QuestionResponse,
)
def approve_question(
    question_id: int,
    db: Session = Depends(get_db),
    admin: str = Depends(get_current_admin),
):
    question = question_crud.get_question_by_id(
        db,
        question_id,
    )

    if not question:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Question not found",
        )

    return question_crud.approve_question(
        db,
        question,
    )


# ------------------------------------
# ADMIN - DELETE QUESTION
# ------------------------------------

@router.delete(
    "/{question_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_question(
    question_id: int,
    db: Session = Depends(get_db),
    admin: str = Depends(get_current_admin),
):
    question = question_crud.get_question_by_id(
        db,
        question_id,
    )

    if not question:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Question not found",
        )

    question_crud.delete_question(
        db,
        question,
    )