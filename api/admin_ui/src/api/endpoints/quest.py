import crud
import schemas
from db.database import get_db
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List, Optional

router = APIRouter()


@router.get("/{quest_name}", response_model=schemas.Quest)
def read(quest_name: str, db: Session = Depends(get_db)):
    """
    Reads a single Quest based on quest_name:

    - **quest_name**: required
    """
    return crud.quest.read(db, quest_name)

@router.get("/", response_model=List[schemas.Quest])
def read_all(db: Session = Depends(get_db)):
    """
    Reads a list of all Quest, no parameters required
    """
    return crud.quest.read_all(db)

@router.get("/category/")
def read(
    category_name: Optional[str] = None, 
    student_email: Optional[str] = None, 
    db: Session = Depends(get_db)):
    """
    Reads a list of attempts that includes the quest information:

    - **category_name**: an optional category name to filter by. If not provided, no filtering is done.
    - **student_email**: an optional student email to filter by. If not provided, no filtering is done.
    """
    return crud.quest.read_by_category(db, category_name, student_email)

@router.get("/best_attempt/{student_email}")
def get_best_attempt(
    student_email: str, 
    category_name: str, 
    quest_name: str,
    db: Session = Depends(get_db)):
    """
    Reads the best attempt by a student for a specific quest:

    - **student_email**: Required, existing student email
    - **category_name**: Required, existing category name
    - **quest_name**: Required, existing quest name
    """
    return crud.quest.best_quest_attempt(db, student_email, category_name, quest_name)

@router.post("/")
def create(quest: schemas.QuestCreate, db: Session = Depends(get_db)):
    """
    Create a quest with all the information:
    - **quest_name**: required, unique name for quest
    - **category_name**: required, existing category name
    """
    return crud.quest.create(db, quest)


@router.patch("/")
def update(quest: schemas.QuestUpdate, db: Session = Depends(get_db)):
    """
    Update a quest with all the information:
    - **quest_name**: required, existing quest name (for identification of quest to update)
    - **category_name**: required, existing category name (to change category for existing quest)
    """
    return crud.quest.update(db, quest)

