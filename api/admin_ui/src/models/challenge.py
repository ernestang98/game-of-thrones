import uuid
from db.database import Base
from sqlalchemy import Column, String, ForeignKey, Integer, Boolean


class Challenge(Base):
    __tablename__ = "challenge"

    # TODO - ensure that foreign key constraints, if any, are enforced
    # TODO - https://docs.sqlalchemy.org/en/14/core/constraints.html
    id = Column(String, primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    challenger_email = Column(String, ForeignKey("student.email"), nullable=False)
    challengee_email = Column(String, ForeignKey("student.email"), nullable=False)
    difficulty = Column(Integer, nullable=False)
    quest_name = Column(String, ForeignKey("quest.quest_name"), nullable=False)
    category_name = Column(String, ForeignKey("category.category_name"), nullable=False)
    number_of_questions = Column(Integer, nullable=False)
    challengee_accepted = Column(Boolean, nullable=True)
    challenger_completed = Column(Boolean, nullable=True)
    challengee_completed = Column(Boolean, nullable=True)