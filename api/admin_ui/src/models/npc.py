import uuid

from db.database import Base
from sqlalchemy import Column, String, ForeignKey


class Npc(Base):
    __tablename__ = "npc"

    # TODO - ensure that foreign key constraints, if any, are enforced
    # TODO - https://docs.sqlalchemy.org/en/14/core/constraints.html
    npc_name = Column(String, primary_key=True, index=True, unique=True)
    subquest_name = Column(String, ForeignKey("subquest.subquest_name"), nullable=False)