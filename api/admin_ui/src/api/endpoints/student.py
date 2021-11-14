import crud
import schemas
from db.database import get_db
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

router = APIRouter()


@router.get("/{email}", response_model=schemas.Student)
def read(email: str, db: Session = Depends(get_db)):
    """
    Read specific assignment question with following parameters:
    - **email**: required, get from dummy_data file for testing
    """
    return crud.student.read(db, email)


@router.get("/", response_model=List[schemas.Student])
def read_all(db: Session = Depends(get_db)):
    """
    Read all a list of all students, no parameters required
    """
    return crud.student.read_all(db)

@router.post("/")
def create(student: schemas.StudentCreate, db: Session = Depends(get_db)):
    """
    Create a student with all the information:

    - **email**: required, student email
    - **name**: required, student name
    - **points**: optional, default value = 0
    - **status**: optional, default value = 2, which is "offline"
    - **rank**: do not input, default value = None, rank will be calculated from points
    - **position**: do not input, default value = None, position will be calculated based on number of current students
    """
    return crud.student.create(db, student)


@router.patch("/")
def update(student: schemas.StudentUpdate, db: Session = Depends(get_db)):
    """
    Update a student with all the information:

    - **email**: required, existing student email
    - **status**: optional
    - **name**: optional
    - **points**: optional
    - **rank**: do not input, rank will be updated based on points
    - **position**: do not input, leaderboard will be updated based on points
    """
    return crud.student.update(db, student)


@router.delete("/", status_code=204)
def delete(email: str, db: Session = Depends(get_db)):
    return crud.student.delete(db, email)
