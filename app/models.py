from sqlalchemy import Boolean, Column, Integer, String, DateTime
from sqlalchemy.orm import relationship

from database import Base


class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, index=True)
    selectedCategory = Column(String, index=True)
    selectedSubcategory = Column(String, index=True)
    name = Column(String, index=True, primary_key=True)
    dimensions = Column(String)
    dateCreated = Column(DateTime)
    dateUpdated = Column(DateTime)
    readinessStatus = Column(String)
    sourceOfDevelopment = Column(String)
    developer = Column(String)
    remarks = Column(String)
    downloadLink = Column(String)
    photo = Column(String)
