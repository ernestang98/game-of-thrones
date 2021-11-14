import uuid

from db.database import Base
from sqlalchemy import Column, String, ForeignKey


class Category(Base):
    __tablename__ = "category"

    category_name = Column(String, primary_key=True, index=True, unique=True)
