from sqlalchemy.orm import Session

import models
import schemas


def get_item(db: Session, name: str):
    return db.query(models.Item).filter(models.Item.name == name).first()


def get_items(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Item).offset(skip).limit(limit).all()


def get_items_by_category_and_subcategory(db: Session, category: str, subcategory: str):
    return db.query(models.Item)\
        .filter(models.Item.selectedCategory == category)\
        .filter(models.Item.selectedSubcategory == subcategory)\
        .all()


def merge_item(db: Session, item: schemas.Item):
    db_item = models.Item(**item.dict())
    db.merge(db_item)
    db.commit()
    # db.refresh(db_item)
    return db_item


def create_item(db: Session, item: schemas.Item):
    db_item = models.Item(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item
