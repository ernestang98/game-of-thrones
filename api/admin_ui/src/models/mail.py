import uuid

from db.database import Base
from sqlalchemy import Column, String, ForeignKey


class Mail(Base):
    __tablename__ = "mail"

    # TODO - ensure that foreign key constraints, if any, are enforced
    # TODO - https://docs.sqlalchemy.org/en/14/core/constraints.html
    id = Column(String, primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    sender = Column(String, ForeignKey("teacher.email"), nullable=False)
    recipient = Column(String, ForeignKey("student.email"), nullable=False)
    subject = Column(String, nullable=False)
    body_heading = Column(String, nullable=False)
    body_text = Column(String, nullable=False)
