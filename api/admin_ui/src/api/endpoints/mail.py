from typing import List

import crud
import schemas
from db.database import get_db
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from mail.send_mail import send_mail_async

router = APIRouter()


@router.get("/{id}", response_model=schemas.Mail)
def read(id: str, db: Session = Depends(get_db)):
    """
    Read a single Mail based on its ID.

    - **id**: required, ID of the mail to be read
    """
    return crud.mail.read(db, id)


@router.get("/", response_model=List[schemas.Mail])
def read_all(db: Session = Depends(get_db)):
    """
    Reads a list of all mails that have been sent
    """
    return crud.mail.read_all(db)


@router.post("/")
async def send_async(email: schemas.MailCreate, db: Session = Depends(get_db)):
    """
    Read a list of challenges based on the following optional filters.
    If the field is not provided, it will not be used for filtering

    - **subject**: required, the email subject
    - **body_heading**: required, the heading of the email body (presented in a banner)
    - **body_text**: required, the content of the email body (presented below the heading)
    - **sender**: required, email address of the sender (must be a teacher)
    - **recipients**: required, list of email addresses of the recipients (must be students)
    """

    crud.mail.create(db, email)
    await send_mail_async(
        email.subject, email.recipients, email.body_heading, email.body_text
    )
