from typing import List, Optional

import models
import schemas
import crud
import math
from models.attempt import Attempt
from models.student import Student
from schemas.attempt import AttemptCreate, AttemptUpdate, StudentReportStats
from sqlalchemy.orm import Session
from sqlalchemy.sql import func
from crud.base import CRUDBase

class CRUDAttempt(CRUDBase[Attempt, AttemptCreate, AttemptUpdate]):
    def create(self, db: Session, attempt: schemas.AttemptCreate):
        db_attempt = models.Attempt(
            quest_name=attempt.quest_name,
            student_email=attempt.student_email,
            points_scored=attempt.points_scored,
            total_points=attempt.total_points,
            time_to_complete_in_seconds=attempt.time_to_complete_in_seconds,
            completion_datetime=attempt.completion_datetime,
        )

        #update student's points and rank
        db_student = crud.student.read(db, attempt.student_email)
        db_student.points += attempt.points_scored
        db_student.rank = math.floor(db_student.points/100) + 1
        if db_student.rank > 11:
            db_student.rank = 11
        db.add(db_student)
        db.commit()
        db.refresh(db_student)
        #update all students position based on updated points and rank
        crud.student.updateLeaderboard(db)

        db.add(db_attempt)
        db.commit()
        db.refresh(db_attempt)

        return db_attempt

    def read(
        self, db: Session, quest_name: Optional[str], student_email: Optional[str]
    ) -> List[Attempt]:
        results = db.query(models.Attempt)

        if quest_name is not None:
            results = results.filter(models.Attempt.quest_name == quest_name)

        if student_email is not None:
            results = results.filter(models.Attempt.student_email == student_email)

        return results.all()

    def read_all(self, db: Session) -> List[Attempt]:
        return db.query(models.Attempt).all()

    def read_student_stats(self, db: Session, student_email: Optional[str]) -> List[StudentReportStats]:
        student_results = db.query(
            Attempt.student_email,
            func.sum(Attempt.points_scored).label("points_earned"),
            func.sum(Attempt.total_points).label("max_points_earnable"),
            Student.status,
            Student.name,
            Student.points,
            Student.rank,
            Student.position
        ).group_by(Attempt.student_email).join(
            Student, Attempt.student_email == Student.email
        )
        
        if student_email is not None:
            student_results = student_results.filter(Attempt.student_email == student_email)

        return student_results.all()

    def update(self, db: Session, new_attempt: schemas.AttemptUpdate):
        old_attempt = (
            db.query(models.Attempt)
            .filter(
                models.Attempt.quest_name == new_attempt.quest_name,
                models.Attempt.student_email == new_attempt.student_email,
            )
            .first()
        )
        return super().update(db, db_obj=old_attempt, obj_in=new_attempt)


attempt = CRUDAttempt(Attempt)
