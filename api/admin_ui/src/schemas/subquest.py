from typing import Optional

from pydantic import BaseModel


# Shared properties
class SubquestBase(BaseModel):
    subquest_name: str
    quest_name: str


# Properties to receive on subquest creation
class SubquestCreate(SubquestBase):
    pass


# Properties to receive on subquest update
class SubquestUpdate(BaseModel):
    """
    All update fields should be optional, as updates are done via HTTP PATCH,
    which must support partial updates
    """

    subquest_name: Optional[str] = None
    quest_name: Optional[str] = None


# Properties shared by models stored in DB
class SubquestInDBBase(SubquestBase):
    class Config:
        orm_mode = True


# Properties to return to client
class Subquest(SubquestInDBBase):
    pass


# Properties properties stored in DB
class SubquestInDB(SubquestInDBBase):
    pass
