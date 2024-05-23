from utils import find_district
from datetime import datetime
from fastapi import Form
from fastapi import HTTPException
from pydantic import BaseModel
from pydantic import validator
from pydantic.dataclasses import dataclass
import json


# underground_types: tuple = ('пешком', 'транспорт')
# renovation_types: tuple = (
#     'Без ремонта', 'None', 'Косметический',
#     'Дизайнерский', 'Евроремонт'
# )
# construction_types: tuple = (
#     'None', 'Кирпичный', 'Монолитный',
#     'Панельный', 'Блочный', 'Монолитно кирпичный',
#     'Сталинский', 'Пенобетонный блок', 'Деревянный'
# )
# wall_types: tuple = ('None', 'Железобетонные', 'Смешанные', 'Деревянные')


def fullfil(list_, path):
    with open(f'app/static/model_files/{path}') as file:
        data = json.load(file)
        first = True
        for k in data.keys():
            if first:
                first = False
                continue
            list_.append(k)


underground_types = list()
renovation_types = list()
construction_types = list()
wall_types = list()

fullfil(underground_types, 'metro_get_type_dict.json')
fullfil(renovation_types, 'fix_dict.json')
fullfil(construction_types, 'type_of_building_dict.json')
fullfil(wall_types, 'type_of_walls_dict.json')

METRO_TYPES_PATH = 'app/static/model_files/metro_name_dict.json'


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


class FlatForm(BaseModel):
    district: str
    underground_station: str
    underground_time: str  # int
    underground_get_type: str
    num_of_rooms: str  # int
    flat_size: str  # float
    kitchen_size: str  # float
    storey: str  # int
    storeys: str  # int
    renovation: str
    construction_date: str  # int
    construction_type: str
    wall: str

    class Config:
        orm_mode = True
