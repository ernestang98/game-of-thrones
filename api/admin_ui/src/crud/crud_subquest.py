from typing import List

import models
import schemas
from models.subquest import Subquest
from schemas.subquest import SubquestCreate, SubquestUpdate
from sqlalchemy.orm import Session

from crud.base import CRUDBase


class CRUDSubquest(CRUDBase[Subquest, SubquestCreate, SubquestUpdate]):
    def create(self, db: Session, subquest: schemas.SubquestCreate):
        db_subquest = models.Subquest(
            subquest_name=subquest.subquest_name,
            quest_name=subquest.quest_name,
        )
        db.add(db_subquest)
        db.commit()
        db.refresh(db_subquest)
        return db_subquest

    def read(self, db: Session, subquest_name: str) -> Subquest:
        return db.query(models.Subquest).filter(models.Subquest.subquest_name == subquest_name).first()

    def read_all(self, db: Session) -> List[Subquest]:
        return db.query(models.Subquest).all()

    def update(self, db: Session, new_subquest: schemas.SubquestUpdate):
        old_subquest = (
            db.query(models.Subquest)
            .filter(models.Subquest.subquest_name == new_subquest.subquest_name)
            .first()
        )
        return super().update(db, db_obj=old_subquest, obj_in=new_subquest)


subquest = CRUDSubquest(Subquest)
