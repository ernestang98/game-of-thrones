from typing import Optional
from datetime import datetime
from pydantic import BaseModel


# Shared properties
class QuestBase(BaseModel):
    quest_name: str
    category_name: str


# Properties to receive on quest creation
class QuestCreate(QuestBase):
    pass


# Properties to receive on quest update
class QuestUpdate(BaseModel):
    """
    All update fields should be optional, as updates are done via HTTP PATCH,
    which must support partial updates
    """

    quest_name: Optional[str] = None
    category_name: Optional[str] = None


# Properties shared by models stored in DB
class QuestInDBBase(QuestBase):
    class Config:
        orm_mode = True


# Properties to return to client
class Quest(QuestInDBBase):
    pass


# Properties properties stored in DB
class QuestInDB(QuestInDBBase):
    pass


class QuestQuery(BaseModel):
    category_name: str
    quest_name: str
    student_email: str
    points_scored: int
    total_points: int
    time_to_complete_in_seconds: int
    completion_datetime: datetime


class BestAttempt(QuestQuery):
    pass
