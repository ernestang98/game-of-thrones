import uuid

from db.database import Base
from sqlalchemy import Column, String, ForeignKey


class Subquest(Base):
    __tablename__ = "subquest"

    # TODO - ensure that foreign key constraints, if any, are enforced
    # TODO - https://docs.sqlalchemy.org/en/14/core/constraints.html
    subquest_name = Column(String, primary_key=True, index=True, unique=True)
    quest_name = Column(String, ForeignKey("quest.quest_name"), nullable=False)
