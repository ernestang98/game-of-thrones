from typing import Optional

from pydantic import BaseModel


# Shared properties
class TeacherBase(BaseModel):
    email: str
    name: str


# Properties to receive on teacher creation
class TeacherCreate(TeacherBase):
    pass


# Properties to receive on teacher update
class TeacherUpdate(BaseModel):
    """
    All update fields should be optional, as updates are done via HTTP PATCH,
    which must support partial updates
    """

    email: Optional[str] = None
    name: Optional[str] = None


# Properties shared by models stored in DB
class TeacherInDBBase(TeacherBase):
    email: str
    name: str

    class Config:
        orm_mode = True


# Properties to return to client
class Teacher(TeacherInDBBase):
    pass


# Properties properties stored in DB
class TeacherInDB(TeacherInDBBase):
    pass
