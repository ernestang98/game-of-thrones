from typing import List

import models
import schemas
from models.teacher import Teacher
from schemas.teacher import TeacherCreate, TeacherUpdate
from sqlalchemy.orm import Session

from crud.base import CRUDBase


class CRUDTeacher(CRUDBase[Teacher, TeacherCreate, TeacherUpdate]):
    def create(self, db: Session, teacher: schemas.TeacherCreate):
        db_teacher = models.Teacher(
            email=teacher.email,
            name=teacher.name,
        )
        db.add(db_teacher)
        db.commit()
        db.refresh(db_teacher)
        return db_teacher

    def read(self, db: Session, email: str) -> Teacher:
        return db.query(models.Teacher).filter(models.Teacher.email == email).first()

    def read_all(self, db: Session) -> List[Teacher]:
        return db.query(models.Teacher).all()

    def update(self, db: Session, new_teacher: schemas.TeacherUpdate):
        old_teacher = (
            db.query(models.Teacher)
            .filter(models.Teacher.email == new_teacher.email)
            .first()
        )
        return super().update(db, db_obj=old_teacher, obj_in=new_teacher)


teacher = CRUDTeacher(Teacher)
