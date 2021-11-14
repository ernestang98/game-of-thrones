import crud
import schemas
from db.database import get_db
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

router = APIRouter()


@router.get("/{email}", response_model=schemas.Teacher)
def read(email: str, db: Session = Depends(get_db)):
    """
    Read a teacher with parameter:
    
    - **email**: required
    """
    return crud.teacher.read(db, email)

@router.get("/", response_model=List[schemas.Teacher])
def read_all(db: Session = Depends(get_db)):
    """
    Read all teachers (No parameters required)
    """
    return crud.teacher.read_all(db)


@router.post("/")
def create(teacher: schemas.TeacherCreate, db: Session = Depends(get_db)):
    """
    Create a teacher with all the information:

    - **name**: required
    - **email**: required, teacher's unique email
    """
    return crud.teacher.create(db, teacher)


@router.patch("/")
def update(teacher: schemas.TeacherUpdate, db: Session = Depends(get_db)):
    """
    Update a teacher with all the information:

    - **name**: required, anything
    - **email**: required, to identify the teacher whose details to change
    """   
    return crud.teacher.update(db, teacher)
