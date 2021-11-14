import models

from db.database import Base
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship


class Student(Base):
    __tablename__ = "student"

    # TODO - ensure that foreign key constraints, if any, are enforced
    # TODO - https://docs.sqlalchemy.org/en/14/core/constraints.html
    email = Column(String, unique=True, primary_key=True, index=True)
    name = Column(String, nullable=False)
    points = Column(Integer, nullable=True)
    status = Column(Integer, nullable=True)
    rank = Column(Integer, nullable=True)
    position = Column(Integer, nullable=True)

    mail = relationship(models.Mail, cascade="all,delete", backref="student")
    assignment = relationship(
        models.Assignment, cascade="all,delete", backref="student"
    )
    attempt = relationship(models.Attempt, cascade="all,delete", backref="student")
