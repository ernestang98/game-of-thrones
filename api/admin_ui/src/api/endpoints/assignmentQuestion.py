from typing import List

import crud
import schemas
from db.database import get_db
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

router = APIRouter()


@router.get("/{id}", response_model=schemas.AssignmentQuestion)
def read(id: str, db: Session = Depends(get_db)):
    """
    Read specific assignment question with following parameters:

    - **id**: required, get from dummy_data file for testing
    """
    return crud.assignmentQuestion.read(db, id)


@router.get("/", response_model=List[schemas.AssignmentQuestion])
def read_all(db: Session = Depends(get_db)):
    """
    Read all assignment questions, no parameters required
    """
    return crud.assignmentQuestion.read_all(db)


@router.post("/")
def create(
    assignmentQuestion: schemas.AssignmentQuestionCreate, db: Session = Depends(get_db)
):
    """
    Create a assignment question with all the information:

    - **assignment_name**: required, existing assignment name
    - **difficulty**: required, 1/2/3 (easy/medium/hard)
    - **points**: required, integer - points for question
    - **prompt**: required, question text (length of choice)
    - **answer**: required, 1/2/3/4
    - **choice1**: required, mcq choice 1
    - **choice2**: required, mcq choice 2
    - **choice3**: required, mcq choice 3
    - **choice4**: required, mcq choice 4
    """
    return crud.assignmentQuestion.create(db, assignmentQuestion)


@router.patch("/")
def update(
    assignmentQuestion: schemas.AssignmentQuestionUpdate, db: Session = Depends(get_db)
):
    """
    Update a assignment question with all the information:

    - **id**: required, get from dummy_data file for testing
    - **assignment_name**: required, existing assignment name
    - **difficulty**: required, 1/2/3 (easy/medium/hard)
    - **points**: required, integer - points for question
    - **prompt**: required, question text (length of choice)
    - **answer**: required, 1/2/3/4
    - **choice1**: required, mcq choice 1
    - **choice2**: required, mcq choice 2
    - **choice3**: required, mcq choice 3
    - **choice4**: required, mcq choice 4
    """
    return crud.assignmentQuestion.update(db, assignmentQuestion)


@router.delete("/", status_code=204)
def delete(id: str, db: Session = Depends(get_db)):
    """
    Delete a assignment question with following parameters:

    - **id**: required, get from dummy_data file for testing
    """  
    return crud.assignmentQuestion.delete(db, id)
