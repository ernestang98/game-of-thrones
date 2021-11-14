from typing import Optional
from enum import Enum

from pydantic import BaseModel


class DifficultyEnum(int, Enum):
    easy = 1
    medium = 2
    hard = 3


# Shared properties
class AssignmentQuestionBase(BaseModel):
    assignment_name: str
    difficulty: DifficultyEnum
    points: int
    prompt: str
    answer: int
    choice1: str
    choice2: str
    choice3: str
    choice4: str


# Properties to receive on question creation
class AssignmentQuestionCreate(AssignmentQuestionBase):
    pass


# Properties to receive on question update
class AssignmentQuestionUpdate(BaseModel):
    """
    All update fields should be optional, as updates are done via HTTP PATCH,
    which must support partial updates
    """

    id: str
    assignment_name: Optional[str] = None
    difficulty: Optional[DifficultyEnum] = None
    points: Optional[int] = None
    prompt: Optional[str] = None
    answer: Optional[int] = None
    choice1: Optional[str] = None
    choice2: Optional[str] = None
    choice3: Optional[str] = None
    choice4: Optional[str] = None


# Properties shared by models stored in DB
class AssignmentQuestionInDBBase(AssignmentQuestionBase):
    id: str

    class Config:
        orm_mode = True


# Properties to return to client
class AssignmentQuestion(AssignmentQuestionInDBBase):
    pass


# Properties properties stored in DB
class AssignmentQuestionInDB(AssignmentQuestionInDBBase):
    pass
