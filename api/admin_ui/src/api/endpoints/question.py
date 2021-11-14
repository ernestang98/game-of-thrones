import crud
import schemas
from db.database import get_db
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List, Optional

router = APIRouter()


@router.get("/{id}", response_model=schemas.Question)
def read(id: str, db: Session = Depends(get_db)):
    """
    Read specific question with following parameters:
    - **id**: required, get from dummy_data file for testing
    """
    return crud.question.read(db, id)

@router.get("/")
def read(
    category_name: Optional[str] = None, 
    quest_name: Optional[str] = None, 
    subquest_name: Optional[str] = None, 
    difficulty: Optional[int]= None, 
    limit: Optional[int] = None, 
    db: Session = Depends(get_db)):
    """
    Reads a list of all question:

    - **category_name**: an optional category name tto filter by. If not provided, no filtering is done.
    - **quest_name**: an optional quest name to filter by. If not provided, no filtering is done.
    - **subquest_name**: an optional subquest name to filter by. If not provided, no filtering is done.
    - **difficulty**: an optional difficulty to filter by. If not provided, no filtering is done.
    - **limit**: an optional filter parameter to limit number of questions read. If not provided, all questions are read.
    """

    # If no parameters are provided
    if not any([category_name, quest_name, subquest_name, difficulty]):
        return crud.question.read_all(db)
    
    # If there is at least 1 filter provided
    return crud.question.read_by_parameters(
        db, category_name, quest_name, subquest_name, difficulty, limit)

@router.post("/")
def create(question: schemas.QuestionCreate, db: Session = Depends(get_db)):
    """
    Create a question with all the information:
    - **subquest_name**: required, existing subquest name
    - **difficulty**: required, 1/2/3 (easy/medium/hard)
    - **points**: required, integer - points for question
    - **prompt**: required, question text (length of choice)
    - **answer**: required, 1/2/3/4
    - **choice1**: required, mcq choice 1
    - **choice2**: required, mcq choice 2
    - **choice3**: required, mcq choice 3
    - **choice4**: required, mcq choice 4
    """
    return crud.question.create(db, question)


@router.patch("/")
def update(question: schemas.QuestionUpdate, db: Session = Depends(get_db)):
    """
    Update a question with all the information:
    - **id**: required, get from dummy_data file for testing
    - **subquest_name**: optional, existing assignment name
    - **difficulty**: optional, 1/2/3 (easy/medium/hard)
    - **points**: optional, integer - points for question
    - **prompt**: optional, question text (length of choice)
    - **answer**: optional, 1/2/3/4
    - **choice1**: optional, mcq choice 1
    - **choice2**: optional, mcq choice 2
    - **choice3**: optional, mcq choice 3
    - **choice4**: optional, mcq choice 4
    """
    return crud.question.update(db, question)
    