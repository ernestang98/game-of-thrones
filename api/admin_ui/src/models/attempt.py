from db.database import Base
from sqlalchemy import Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.sql import func


class Attempt(Base):
    __tablename__ = "attempt"

    # TODO - ensure that foreign key constraints, if any, are enforced
    # TODO - https://docs.sqlalchemy.org/en/14/core/constraints.html
    quest_name = Column(
        String, ForeignKey("quest.quest_name"), primary_key=True, index=True
    )
    student_email = Column(
        String, ForeignKey("student.email"), primary_key=True, index=True
    )
    points_scored = Column(Integer, nullable=False)
    total_points = Column(Integer, nullable=False)
    time_to_complete_in_seconds = Column(Integer, nullable=False)
    completion_datetime = Column(
        DateTime(timezone=True), nullable=False, server_default=func.now()
    )
