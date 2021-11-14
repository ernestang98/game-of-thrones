from typing import List, Optional

import models
import schemas
from models.quest import Quest
from models.attempt import Attempt
from models.student import Student
from schemas.quest import QuestCreate, QuestUpdate, QuestQuery, BestAttempt
from sqlalchemy.orm import Session

from crud.base import CRUDBase


class CRUDQuest(CRUDBase[Quest, QuestCreate, QuestUpdate]):
    def create(self, db: Session, quest: schemas.QuestCreate):
        db_quest = models.Quest(
            quest_name=quest.quest_name,
            category_name=quest.category_name,
        )
        db.add(db_quest)
        db.commit()
        db.refresh(db_quest)
        return db_quest

    def read(self, db: Session, quest_name: str) -> Quest:
        return db.query(models.Quest).filter(models.Quest.quest_name == quest_name).first()

    def read_all(self, db: Session) -> List[Quest]:
        return db.query(models.Quest).all()

    def read_by_category(self, db: Session, category_name: Optional[str], student_email: Optional[str]) -> List[QuestQuery]:
        quest = db.query(
            Attempt.student_email,
            Attempt.points_scored,
            Attempt.total_points,
            Attempt.time_to_complete_in_seconds,
            Attempt.completion_datetime,
            Quest.quest_name, 
            Quest.category_name)\
            .join(Quest, Attempt.quest_name == Quest.quest_name)

        if category_name is not None:
            quest = quest.filter(
                Quest.category_name == category_name)

        if student_email is not None:
            quest = quest.filter(
                Attempt.student_email == student_email)

        return quest.order_by(models.Attempt.time_to_complete_in_seconds.asc()).all()

    def best_quest_attempt(self, db: Session, student_email: str, category_name: str, quest_name: str) -> List[BestAttempt]:
        best_attempt = db.query(
            Attempt.student_email,
            Attempt.points_scored,
            Attempt.total_points,
            Attempt.time_to_complete_in_seconds,
            Attempt.completion_datetime,
            Quest.quest_name, 
            Quest.category_name, 
        ).join(Quest, Attempt.quest_name == Quest.quest_name)
        
        return best_attempt.filter(
            Attempt.student_email == student_email,
            Quest.category_name == category_name,
            Quest.quest_name == quest_name
        ).order_by(
            Attempt.points_scored.asc(),
            Attempt.time_to_complete_in_seconds.desc()
        ).limit(1).all()

    def update(self, db: Session, new_quest: schemas.QuestUpdate):
        old_quest = (
            db.query(models.Quest).filter(models.Quest.quest_name == new_quest.quest_name).first()
        )
        return super().update(db, db_obj=old_quest, obj_in=new_quest)


quest = CRUDQuest(Quest)
