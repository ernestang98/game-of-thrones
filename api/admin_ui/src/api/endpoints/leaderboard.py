import crud
import schemas
from db.database import get_db
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter()

@router.get("/", response_model=List[schemas.Student])
def read(db: Session = Depends(get_db), limit: Optional[int] = 10 ):
    return crud.student.getLeaderboard(db, limit)