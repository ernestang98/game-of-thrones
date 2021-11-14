import crud
import schemas
from db.database import get_db
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List, Optional

router = APIRouter()


@router.get("/", response_model=List[schemas.Attempt])
def read(
    quest_name: Optional[str] = None,
    student_email: Optional[str] = None,
    db: Session = Depends(get_db),
):
    """
    Reads a list of all attempts:

    - **quest_name**: an optional quest name to filter by. If not provided, no filtering is done.
    - **student_email**: an optional student email to filter by. If not provided, no filtering is done.
    """
    return crud.attempt.read(db, quest_name, student_email)

@router.get("/cohortresults/")
def student_stats(
    student_email: Optional[str] = None, 
    db: Session = Depends(get_db)):
    """
    Reads a list of students with total points earned and max points earnable:

    - **student_email**: an optional student email to filter by. If not provided, no filtering is done.
    """
    return crud.attempt.read_student_stats(db, student_email)


@router.post("/")
def create(attempt: schemas.AttemptCreate, db: Session = Depends(get_db)):
    """
    Create an attempt with all the information:
    - **quest_name**: required, quest which which this challenge is linked to (e.g. "CZ3001 Quest 1")
    - **student_email**: required, email address of student which the attempt belongs to
    - **points_scored**: required, points earned in the attempt
    - **total_points**: required, maximum points earnable in the attempt
    - **time_to_complete_in_seconds**: required, time taken for the attempt in seconds
    - **completion_datetime**: required, datetime of attempt completion in the format, "%Y-%m-%dT%H:%m:%S.%f"
    """
    return crud.attempt.create(db, attempt)


@router.patch("/")
def update(attempt: schemas.AttemptUpdate, db: Session = Depends(get_db)):
    """
    (Not Used)
    """
    return crud.attempt.update(db, attempt)
