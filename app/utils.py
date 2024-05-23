from fuzzywuzzy import process
from keras.models import load_model
import decimal
import difflib
import json
import numpy as np

model = load_model('app/static/model.keras')


district_dict: dict
fix_dict: dict
metro_get_type_dict: dict
metro_name_dict: dict
type_of_building_dict: dict
type_of_walls_dict: dict
with open('app/static/model_files/distrcit_dict.json', encoding='utf-8') as file:
    district_dict = json.load(file)

with open('app/static/model_files/fix_dict.json', encoding='utf-8') as file:
    fix_dict = json.load(file)

with open('app/static/model_files/metro_get_type_dict.json', encoding='utf-8') as file:
    metro_get_type_dict = json.load(file)

with open('app/static/model_files/metro_name_dict.json', encoding='utf-8') as file:
    metro_name_dict = json.load(file)

with open('app/static/model_files/type_of_building_dict.json', encoding='utf-8') as file:
    type_of_building_dict = json.load(file)

with open('app/static/model_files/type_of_walls_dict.json', encoding='utf-8') as file:
    type_of_walls_dict = json.load(file)

mean_and_std = []
with open("app/static/model_files/mean_and_std.txt") as file:
    mean_and_std = file.readlines()


def find_district(district: str) -> str:
    with open('app/static/model_files/distrcit_dict.json', 'r', encoding='utf-8') as json_file:
        districts = json.load(json_file)
        choices = set(list(districts.keys()))
        keys = ['микрорайон', 'район', 'деревня', 'поселок', 'поселение']
        for word in district.split(','):
            for key in keys:
                if key in word:
                    ans = process.extract(word, choices)[0][0]
                    return ans
        return 'мкр. 3-й'


def normal_int(num: int | float):
    num = int(num * 1000000)
    num = decimal.Decimal(int(num))
    return "{0:,}".format(num).replace(",", " ")


def run_preditcion_on_model(
    district: str,
    metro_name: str,
    metro_time: int,
    metro_get_type: str,
    size: float,
    kitchen: float,
    floor: int,
    floors: int,
    constructed: int,
    fix: str,
    type_of_building: str,
    type_of_walls: str,
) -> float:
    """
    Gets a 'list' of parameters of a flat and
    then makes a predictions based on the trained weights.
    """

    district = difflib.get_close_matches(
        district, list(district_dict.keys()), len(list(district_dict.keys())), 0)[0]
    print(district)
    district = district_dict[district]
    fix = fix_dict[fix]
    metro_name = difflib.get_close_matches(
        metro_name, list(metro_name_dict.keys()), len(list(metro_name_dict.keys())), 0)[0]
    metro_name = metro_name_dict[metro_name]
    metro_get_type = metro_get_type_dict[metro_get_type]
    type_of_building = type_of_building_dict[type_of_building]
    type_of_walls = type_of_walls_dict[type_of_walls]

    for i in range(len(mean_and_std)):
        mean_and_std[i] = mean_and_std[i].strip()
        mean_and_std[i] = mean_and_std[i].replace('[', '')
        mean_and_std[i] = mean_and_std[i].replace(']', '')
        mean_and_std[i] = mean_and_std[i].replace(' ', '')

    mean = mean_and_std[0].split(',')
    std = mean_and_std[1].split(',')

    mean = np.array(mean, dtype=float)
    std = np.array(std, dtype=float)

    flat = [
        [
            district,
            metro_name,
            metro_time,
            metro_get_type,
            size,
            kitchen,
            floor,
            floors,
            constructed,
            fix,
            type_of_building,
            type_of_walls,
        ]
    ]

    flat = np.array(flat, dtype=float)
    flat -= mean
    flat /= std

    predictions = model.predict(flat)
    return normal_int(predictions[0][0])
