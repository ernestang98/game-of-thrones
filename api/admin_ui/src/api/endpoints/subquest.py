import crud
import schemas
from db.database import get_db
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

router = APIRouter()


@router.get("/{subquest_name}", response_model=schemas.Subquest)
def read(subquest_name: str, db: Session = Depends(get_db)):
    """
    Read specific subquest with following parameters:

    - **subquest_name**: required, existing subquest name
    """
    return crud.subquest.read(db, subquest_name)

@router.get("/", response_model=List[schemas.Subquest])
def read_all(db: Session = Depends(get_db)):
    """
    Read all subquest, no parameters required
    """
    return crud.subquest.read_all(db)

@router.post("/")
def create(subquest: schemas.SubquestCreate, db: Session = Depends(get_db)):
    """
    Create a subquest with all the information:

    - **subquest_name**: required, unique name for subquest
    - **quest_name**: required, existing quest name
    """
    return crud.subquest.create(db, subquest)


@router.patch("/")
def update(subquest: schemas.SubquestUpdate, db: Session = Depends(get_db)):
    """
    Update a subquest with all the information:

    - **subquest_name**: required, unique name for subquest (can be same as before update)
    - **quest_name**: required, existing quest name (for identification of subquest to update)
    """
    return crud.subquest.update(db, subquest)
