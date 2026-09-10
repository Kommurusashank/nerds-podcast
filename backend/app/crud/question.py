from sqlalchemy.orm import Session

from app.models.question import Question

from app.schemas.question import QuestionCreate


def create_question(
    db: Session,
    question_data: QuestionCreate,
) -> Question:
    question = Question(
        **question_data.model_dump()
    )

    db.add(question)
    db.commit()
    db.refresh(question)

    return question


def get_questions(
    db: Session,
) -> list[Question]:
    return (
        db.query(Question)
        .order_by(
            Question.created_at.desc()
        )
        .all()
    )


def get_question_by_id(
    db: Session,
    question_id: int,
) -> Question | None:
    return (
        db.query(Question)
        .filter(Question.id == question_id)
        .first()
    )


def approve_question(
    db: Session,
    question: Question,
) -> Question:
    question.is_approved = True

    db.commit()
    db.refresh(question)

    return question


def delete_question(
    db: Session,
    question: Question,
) -> None:
    db.delete(question)
    db.commit()