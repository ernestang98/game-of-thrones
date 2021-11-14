from typing import List, Optional

import models
import schemas
from models.mail import Mail
from schemas.mail import MailCreate, MailUpdate
from sqlalchemy.orm import Session

import crud
from crud.base import CRUDBase


class CRUDMail(CRUDBase[Mail, MailCreate, MailUpdate]):
    def create(self, db: Session, mail: schemas.MailCreate):
        sender_in_db = crud.teacher.read(db, mail.sender)

        for recipient in mail.recipients:
            recipient_in_db = crud.student.read(db, recipient)
            db_mail = models.Mail(
                sender=sender_in_db.email,
                recipient=recipient_in_db.email,
                subject=mail.subject,
                body_heading=mail.body_heading,
                body_text=mail.body_text,
            )
            db.add(db_mail)

        db.commit()
        db.refresh(db_mail)
        return db_mail

    def read(self, db: Session, id: str) -> Optional[Mail]:
        return db.query(models.Mail).filter(models.Mail.id == id).first()

    def read_all(self, db: Session) -> List[Mail]:
        return db.query(models.Mail).all()


mail = CRUDMail(Mail)
