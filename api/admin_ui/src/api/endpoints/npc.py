import crud
import schemas
from db.database import get_db
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

router = APIRouter()


@router.get("/{npc_name}", response_model=schemas.Npc)
def read(npc_name: str, db: Session = Depends(get_db)):
    """
    Read specific npc with following parameters:

    - **npc_name**: required, existing npc name
    """
    return crud.npc.read(db, npc_name)

@router.get("/", response_model=List[schemas.Npc])
def read_all(db: Session = Depends(get_db)):
    """
    Read all npcs, no parameters required
    """
    return crud.npc.read_all(db)

@router.post("/")
def create(npc: schemas.NpcCreate, db: Session = Depends(get_db)):
    """
    Create a npc with all the information:

    - **npc_name**: required, unique name for npc
    - **subquest_name**: required, existing subquest name
    """
    return crud.npc.create(db, npc)


@router.patch("/")
def update(npc: schemas.NpcUpdate, db: Session = Depends(get_db)):
    """
    Update a npc with all the information:

    - **npc_name**: required, unique name for npc (can be same as before update)
    - **subquest_name**: required, existing subquest name (for identification of npc to update)
    """
    return crud.npc.update(db, npc)
