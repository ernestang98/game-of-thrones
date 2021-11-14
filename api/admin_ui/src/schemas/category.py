from typing import Optional

from pydantic import BaseModel


# Shared properties
class CategoryBase(BaseModel):
    category_name: str


# Properties to receive on category creation
class CategoryCreate(CategoryBase):
    pass


# Properties to receive on category update
class CategoryUpdate(BaseModel):
    """
    All update fields should be optional, as updates are done via HTTP PATCH,
    which must support partial updates
    """

    category_name: Optional[str] = None


# Properties shared by models stored in DB
class CategoryInDBBase(CategoryBase):
    class Config:
        orm_mode = True


# Properties to return to client
class Category(CategoryInDBBase):
    pass


# Properties properties stored in DB
class CategoryInDB(CategoryInDBBase):
    pass
