from typing import List
import models
import schemas
from models.question import Question
from models.subquest import Subquest
from models.quest import Quest
from schemas.question import QuestionCreate, QuestionUpdate, QuestionQuery
from sqlalchemy.orm import Session
from crud.base import CRUDBase
from sqlalchemy import func


class CRUDQuestion(CRUDBase[Question, QuestionCreate, QuestionUpdate]):
    def create(self, db: Session, question: schemas.QuestionCreate):
        db_question = models.Question(
            subquest_name=question.subquest_name,
            difficulty=question.difficulty,
            points=question.points,
            prompt=question.prompt,
            answer=question.answer,
            choice1=question.choice1,
            choice2=question.choice2,
            choice3=question.choice3,
            choice4=question.choice4,
        )
        db.add(db_question)
        db.commit()
        db.refresh(db_question)
        return db_question

    def read(self, db: Session, id: str) -> Question:
        return db.query(models.Question).filter(models.Question.id == id).first()

    def read_all(self, db: Session) -> List[Question]:
        return db.query(models.Question).order_by(func.random()).all()

    def read_by_parameters(self, db: Session, category_name: str, quest_name:str, \
        subquest_name: str, difficulty: int, limit: int) -> List[QuestionQuery]:
        question = db.query(
            Question.difficulty,
            Question.points,
            Question.prompt,
            Question.answer,
            Question.choice1, 
            Question.choice2,
            Question.choice3,
            Question.choice4,
            Subquest.subquest_name, 
            Quest.quest_name,
            Quest.category_name)\
            .select_from(Question).join(Subquest).join(Quest)

        if category_name is not None:
            question = question.filter(
                Quest.category_name == category_name)

        if quest_name is not None:
            question = question.filter(
                Quest.quest_name == quest_name)

        if subquest_name is not None:
            question = question.filter(
                Subquest.subquest_name == subquest_name)

        if difficulty is not None:
            question = question.filter(
                Question.difficulty == difficulty
            )

        if limit is not None and limit > len(question.all()):
            limit = len(question.all())

        return question.order_by(func.random()).limit(limit).all()


    def update(self, db: Session, new_question: schemas.QuestionUpdate):
        old_question = (
            db.query(models.Question)
            .filter(models.Question.id == new_question.id)
            .first()
        )
        return super().update(db, db_obj=old_question, obj_in=new_question)

question = CRUDQuestion(Question)
