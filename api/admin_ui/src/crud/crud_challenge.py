from typing import List

import models
import schemas
from fastapi import HTTPException, Response, status
from models.challenge import Challenge
from schemas.challenge import ChallengeCreate, ChallengeUpdate
from sqlalchemy.orm import Session

from crud.base import CRUDBase


class CRUDChallenge(CRUDBase[Challenge, ChallengeCreate, ChallengeUpdate]):
    def create(self, db: Session, challenge: schemas.ChallengeCreate):
        db_challenge = models.Challenge(
            challenger_email=challenge.challenger_email,
            challengee_email=challenge.challengee_email,
            difficulty=challenge.difficulty,
            quest_name=challenge.quest_name,
            category_name=challenge.category_name,
            number_of_questions=challenge.number_of_questions,
            challengee_accepted = challenge.challengee_accepted,
            challenger_completed = challenge.challenger_completed,
            challengee_completed = challenge.challengee_completed
        )
        db.add(db_challenge)
        db.commit()
        db.refresh(db_challenge)
        return db_challenge

    def read(
        self,
        db: Session,
        challenger_email: str,
        challengee_email: str,
        quest_name: str,
        category_name: str,
    ) -> List[Challenge]:
        results = db.query(models.Challenge)

        if challenger_email is not None:
            results = results.filter(
                models.Challenge.challenger_email == challenger_email
            )

        if challengee_email is not None:
            results = results.filter(
                models.Challenge.challengee_email == challengee_email
            )

        if quest_name is not None:
            results = results.filter(models.Challenge.quest_name == quest_name)

        if category_name is not None:
            results = results.filter(models.Challenge.category_name == category_name)

        return results.all()

    def update(self, db: Session, new_challenge: schemas.ChallengeUpdate):
        old_challenge = (
            db.query(models.Challenge)
            .filter(
                models.Challenge.challenger_email == new_challenge.challenger_email,
                models.Challenge.challengee_email == new_challenge.challengee_email,
                models.Challenge.quest_name == new_challenge.quest_name,
                models.Challenge.category_name == new_challenge.category_name,
            )
            .first()
        )
        return super().update(db, db_obj=old_challenge, obj_in=new_challenge)

    def delete(self, db: Session, challenger_email: str, challengee_email: str):
        challenge_to_delete = (
            db.query(models.Challenge)
            .filter(
                models.Challenge.challenger_email == challenger_email,
                models.Challenge.challengee_email == challengee_email,
            )
            .first()
        )

        if challenge_to_delete is not None:
            db.delete(challenge_to_delete)
            db.commit()
            return Response(status_code=status.HTTP_204_NO_CONTENT)

        raise HTTPException(status_code=404, detail="Item not found")


challenge = CRUDChallenge(Challenge)
