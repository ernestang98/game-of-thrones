from typing import List, Optional

import crud
import schemas
from db.database import get_db
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List, Optional

router = APIRouter()


@router.get("/", response_model=List[schemas.Assignment])
def read(
    assigner: Optional[str] = None,
    assignee: Optional[str] = None,
    db: Session = Depends(get_db),
):
    """
    Read all assignments/assignments based on filters:

    - **assigner**: optional, teacher who's an existing assigner
    - **assignee**: optional, student who's an existing assignee
    """
    return crud.assignment.read(db, assigner, assignee)


@router.post("/")
def create(assignment: schemas.AssignmentCreate, db: Session = Depends(get_db)):
    """
    Create an assignment with all the information:

    - **assignment_name**: required, unique name for assignment
    - **assigner**: required, existing teacher's email
    - **assignee**: required, existing student's email
    - **description**: description length of choice
    - **points_scored**: points (integer) student scored in assignment
    - **time_to_complete_in_seconds**: time (integer) student used for assignment
    """
    return crud.assignment.create(db, assignment)


@router.patch("/")
def update(assignment: schemas.AssignmentUpdate, db: Session = Depends(get_db)):
    """
    Update an assignment with all the information:

    - **assignment_name**: existing assignment name
    - **assigner**: required, existing teacher's email
    - **assignee**: required, existing student's email
    - **description**: description length of choice
    - **points_scored**: points (integer) student scored in assignment
    - **time_to_complete_in_seconds**: time (integer) student used for assignment
    """
    return crud.assignment.update(db, assignment)


@router.delete("/", status_code=204)
def delete(assignment_name: str, db: Session = Depends(get_db)):
    """
    Delete an assignment:

    - **assignment_name**: required, existing assignment name
    - **NOTE**: all assignment questions under assignment deleted will be deleted
    """
    return crud.assignment.delete(db, assignment_name)
