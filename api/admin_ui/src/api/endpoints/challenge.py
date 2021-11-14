from typing import List, Optional

import crud
import schemas
from db.database import get_db
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

router = APIRouter()


@router.get("/", response_model=List[schemas.Challenge])
def read(
    challenger_email: Optional[str] = None,
    challengee_email: Optional[str] = None,
    quest_name: Optional[str] = None,
    category_name: Optional[str] = None,
    db: Session = Depends(get_db),
):
    """
    Read a list of challenges based on the following optional filters.
    If the field is not provided, it will not be used for filtering

    - **challenger_email**: optional, email address of the challenge's sender (must be a student)
    - **challengee_email**: optional, email address of the challenge's receiver (must be a student)
    - **quest_name**: optional, quest which this challenge is linked to (e.g. "CZ3001 Quest 1")
    - **category_name**: optional, category which which this challenge is linked to (e.g. "CZ3002 Advanced Software Engineering")
    """
    return crud.challenge.read(
        db, challenger_email, challengee_email, quest_name, category_name
    )


@router.post("/")
def create(challenge: schemas.ChallengeCreate, db: Session = Depends(get_db)):
    """
    Create a challenge with all the information:

    - **challenger_email**: required, email address of the challenge's sender (must be a student)
    - **challengee_email**: required, email address of the challenge's receiver (must be a student)
    - **difficulty**: required, difficulty of the challenge (1, 2, 3)
    - **quest_name**: required, quest which which this challenge is linked to (e.g. "CZ3001 Quest 1")
    - **category_name**: required, category which which this challenge is linked to (e.g. "CZ3002 Advanced Software Engineering")
    - **number_of_questions**: required, the number of questions in  this challenge
    - **challengee_accepted**: optional, whether the challenge has been accepted (defaults to False)
    - **challenger_completed**: optional, whether the challenger has completed the challenge (defaults to False)
    - **challengee_completed**: optional, whether the challengee has completed the challenge (defaults to False)
    """
    return crud.challenge.create(db, challenge)


@router.patch("/")
def update(challenge: schemas.ChallengeUpdate, db: Session = Depends(get_db)):
    """
    Update a challenge with all the information:

    - **challenger_email**: required, email address of the challenge's sender (must be a student)
    - **challengee_email**: required, email address of the challenge's receiver (must be a student)
    - **difficulty**: optional, difficulty of the challenge (1, 2, 3)
    - **quest_name**: optional, quest which which this challenge is linked to (e.g. "CZ3001 Quest 1")
    - **category_name**: optional, category which which this challenge is linked to (e.g. "CZ3002 Advanced Software Engineering")
    - **number_of_questions**: optional, the number of questions in  this challenge
    - **challengee_accepted**: optional, whether the challenge has been accepted (defaults to False)
    - **challenger_completed**: optional, whether the challenger has completed the challenge (defaults to False)
    - **challengee_completed**: optional, whether the challengee has completed the challenge (defaults to False)
    """
    return crud.challenge.update(db, challenge)


@router.delete("/", status_code=204)
def delete(challenger_email: str, challengee_email: str, db: Session = Depends(get_db)):
    """
    Delete a challenge:

    - **challenger_email**: required, email address of the challenge's sender (must be a student)
    - **challengee_email**: required, email address of the challenge's receiver (must be a student)
    """
    return crud.challenge.delete(db, challenger_email, challengee_email)
