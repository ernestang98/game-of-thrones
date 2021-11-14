from enum import IntEnum
from schemas.question import DifficultyEnum
import crud
import schemas
from db.database import get_db
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

router = APIRouter()


@router.get("/{category_name}", response_model=schemas.Category)
def read(category_name: str, db: Session = Depends(get_db)):
    """
    Read specific category with following parameters:
    - **category_name**: required
    """
    return crud.category.read(db, category_name)

@router.get("/", response_model=List[schemas.Category])
def read_all(db: Session = Depends(get_db)):
    """
    Read all category, no parameters required
    """
    return crud.category.read_all(db)

@router.post("/")
def create(category: schemas.CategoryCreate, db: Session = Depends(get_db)):
    """
    Create a category with the following information:
    
    - **category_name**: required
    """
    return crud.category.create(db, category)


@router.patch("/")
def update(category: schemas.CategoryUpdate, db: Session = Depends(get_db)):
    return crud.category.update(db, category)