from datetime import datetime

from pydantic import BaseModel

from schemas.student import Status, Rank
from typing import List


class AttemptBase(BaseModel):
    quest_name: str
    student_email: str
    points_scored: int
    total_points: int
    time_to_complete_in_seconds: int
    completion_datetime: datetime = datetime.now().strftime("%Y-%m-%dT%H:%m:%S.%f")


class AttemptCreate(AttemptBase):
    pass


class AttemptUpdate(AttemptBase):
    pass


class AttemptInDBBase(AttemptBase):
    class Config:
        orm_mode = True


# Properties to return to client
class Attempt(AttemptInDBBase):
    pass


# Properties properties stored in DB
class AttemptInDB(AttemptInDBBase):
    pass


class StudentReportStats(BaseModel):
    student_email: str
    points_earned: int
    max_points_earnable: int 
    status: Status
    name: str
    points: int
    rank: Rank
    position: int