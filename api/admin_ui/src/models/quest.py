import uuid

from db.database import Base
from sqlalchemy import Column, String, Integer, ForeignKey


class Quest(Base):
    __tablename__ = "quest"

    # TODO - ensure that foreign key constraints, if any, are enforced
    # TODO - https://docs.sqlalchemy.org/en/14/core/constraints.html
    quest_name = Column(String, primary_key=True, index=True, unique=True)
    category_name = Column(String, ForeignKey("category.category_name"), nullable=False)
