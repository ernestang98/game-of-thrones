from typing import Optional
from enum import IntEnum
from pydantic import BaseModel

# Shared properties
class Rank(IntEnum):
    Herald = 0,
    Guardian = 1,
    Crusader = 2,
    Archon = 3,
    Legend = 4,
    Ancient = 5,
    Divine = 6,
    Immortal = 7,
    Genesis = 8,
    Challenger = 9,
    Platinum = 10,
    
class Status(IntEnum):
    online = 1
    offline = 2
    busy = 3

class StudentBase(BaseModel):
    email: str
    status: Status = 2
    name: str
    points: int = 0
    rank: Rank = None
    position: int = None

# Properties to receive on student creation
class StudentCreate(StudentBase):
    pass


# Properties to receive on student update
class StudentUpdate(BaseModel):
    """
    All update fields should be optional, as updates are done via HTTP PATCH,
    which must support partial updates
    """

    email: Optional[str] = None
    status: Optional[int] = None
    name: Optional[str] = None
    points: Optional[int] = None
    rank: Optional[int] = None
    position: Optional[int] = None

# Properties shared by models stored in DB
class StudentInDBBase(StudentBase):
    class Config:
        orm_mode = True


# Properties to return to client
class Student(StudentInDBBase):
    pass


# Properties properties stored in DB
class StudentInDB(StudentInDBBase):
    pass
