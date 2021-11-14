from db.database import Base
from sqlalchemy import Column, String


class Teacher(Base):
    __tablename__ = "teacher"

    # TODO - ensure that foreign key constraints, if any, are enforced
    # TODO - https://docs.sqlalchemy.org/en/14/core/constraints.html
    email = Column(String, primary_key=True, unique=True, index=True)
    name = Column(String)
