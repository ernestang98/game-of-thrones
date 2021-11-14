from typing import List

from pydantic import BaseModel


class MailBase(BaseModel):
    subject: str
    body_heading: str
    body_text: str
    sender: str
    recipients: List[str]


class MailCreate(MailBase):
    pass


class MailUpdate(MailBase):
    pass


class MailInDBBase(BaseModel):
    id: str

    class Config:
        orm_mode = True


# Properties to return to client
class Mail(MailInDBBase):
    sender: str
    recipient: str
    subject: str
    body_heading: str
    body_text: str


# Properties properties stored in DB
class MailInDB(MailInDBBase):
    pass
