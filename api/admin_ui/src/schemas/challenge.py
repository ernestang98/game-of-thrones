from typing import Optional

from pydantic import BaseModel
from schemas.question import DifficultyEnum


# Shared properties
class ChallengeBase(BaseModel):
    challenger_email: str
    challengee_email: str
    difficulty: DifficultyEnum
    quest_name: str
    category_name: str
    number_of_questions: int
    challengee_accepted: bool = False
    challenger_completed: bool = False
    challengee_completed: bool = False

# Properties to receive on challenge creation
class ChallengeCreate(ChallengeBase):
    pass


# Properties to receive on challenge update
class ChallengeUpdate(BaseModel):
    """
    All update fields should be optional, as updates are done via HTTP PATCH,
    which must support partial updates
    """

    challenger_email: Optional[str] = None
    challengee_email: Optional[str] = None
    difficulty: Optional[DifficultyEnum] = None
    quest_name: Optional[str] = None
    category_name: Optional[str] = None
    number_of_questions: Optional[int] = None
    challengee_accepted: Optional[bool] = False
    challenger_completed: Optional[bool] = False
    challengee_completed: Optional[bool] = False


# Properties shared by models stored in DB
class ChallengeInDBBase(ChallengeBase):
    class Config:
        orm_mode = True


# Properties to return to client
class Challenge(ChallengeInDBBase):
    pass


# Properties properties stored in DB
class ChallengeInDB(ChallengeInDBBase):
    pass
