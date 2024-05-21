from pydantic import BaseModel
from datetime import datetime


class Item(BaseModel):

    id: int
    selectedCategory: str
    selectedSubcategory: str
    name: str
    dimensions: str
    dateCreated: datetime
    dateUpdated: datetime
    readinessStatus: str
    sourceOfDevelopment: str
    developer: str
    remarks: str
    downloadLink: str
    photo: str

    class Config:
        orm_mode = True
