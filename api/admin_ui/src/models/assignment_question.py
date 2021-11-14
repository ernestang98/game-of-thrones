import uuid

from db.database import Base
from sqlalchemy import Column, String, Integer, ForeignKey


class AssignmentQuestion(Base):
    __tablename__ = "assignmentQuestion"

    # TODO - ensure that foreign key constraints, if any, are enforced
    # TODO - https://docs.sqlalchemy.org/en/14/core/constraints.html
    id = Column(String, primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    assignment_name = Column(
        String, ForeignKey("assignment.assignment_name"), nullable=False
    )
    difficulty = Column(Integer, nullable=False)
    points = Column(Integer, nullable=False)
    prompt = Column(String, nullable=False)
    answer = Column(Integer, nullable=False)
    choice1 = Column(String, nullable=False)
    choice2 = Column(String, nullable=False)
    choice3 = Column(String, nullable=False)
    choice4 = Column(String, nullable=False)
