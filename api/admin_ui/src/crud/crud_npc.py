from typing import List

import models
import schemas
from models.npc import Npc
from schemas.npc import NpcCreate, NpcUpdate
from sqlalchemy.orm import Session

from crud.base import CRUDBase


class CRUDNpc(CRUDBase[Npc, NpcCreate, NpcUpdate]):
    def create(self, db: Session, npc: schemas.NpcCreate):
        db_npc = models.Npc(
            npc_name=npc.npc_name,
            subquest_name=npc.subquest_name,
        )
        db.add(db_npc)
        db.commit()
        db.refresh(db_npc)
        return db_npc

    def read(self, db: Session, npc_name: str) -> Npc:
        return db.query(models.Npc).filter(models.Npc.npc_name == npc_name).first()

    def read_all(self, db: Session) -> List[Npc]:
        return db.query(models.Npc).all()

    def update(self, db: Session, new_npc: schemas.NpcUpdate):
        old_npc = db.query(models.Npc).filter(models.Npc.npc_name == new_npc.npc_name).first()
        return super().update(db, db_obj=old_npc, obj_in=new_npc)


npc = CRUDNpc(Npc)
