from collections import defaultdict
from config import BUILDING, STAR_OFFSET, LEVEL_OFFSET


KILO = 10 ** 3
MILLION = 10 ** 6
BILLION = 10 ** 9
TRILLION = 10 ** 12


def calculate_basic(name, level, star):
    details = BUILDING.get(name)
    if not details:
        return 0
    if level > 300 or star > 5:
        raise Exception("Need data more than 300.")

    building_offset = details[2]
    star_offset = STAR_OFFSET[star-1]
   
    if level == 300:
        basic = LEVEL_OFFSET[-1]
    else:
        step = level // 10
        offset = level % 10
        basic = LEVEL_OFFSET[step] + offset * (LEVEL_OFFSET[step + 1] - LEVEL_OFFSET[step]) / 10
    return basic * building_offset * star_offset


def calculate_building_buff(buildings):
    result = defaultdict(int)
    for b in buildings:
        for k, v in b['benefit'].items:
            result[k] += v

    return result


def calculate_policy_buff(policies):
    result = defaultdict(int)
    for k, v in policies:
        result[k] += v
    return result


def calculate_collection_buff(collections):
    result = defaultdict(int) 
    for k, v in collections:
        result[k] += v
    return result


def calculate_mission_buff(missions):
    result = defaultdict(int)
    for k, v in missions:
        result[k] += v
    return result


def calculate_value(name, basic, type, buff, homelight, online=False):
    status_buff_key = "在线全局" if online else "离线全局"
    status_offset = 1.0 if online else 0.5
    building_offset = 1.0 + buff['building'][name] + buff['building'][type] + buff['building']['全局'] + buff['building'][status_buff_key]
    policy_offset = 1.0 + buff['policy'][name] + buff['policy'][type] + buff['policy']['全局'] + buff['policy'][status_buff_key] + homelight#家园之光
    collection_offset = 1.0 + buff['collection'][name] + buff['collection'][type] + buff['collection']['全局'] + buff['collection'][status_buff_key] 
    city_offset = 1.0 + buff['city'][name] + buff['city'][type] + buff['city']['全局'] + buff['city'][status_buff_key]
    return basic * building_offset * policy_offset * collection_offset * city_offset * status_offset


def _(number):
    if number < KILO:
        return "{}".format(number)
    elif number < MILLION:
        return "{}K".format(number * 1.0 / KILO)
    elif number < BILLION:
        return "{}M".format(number * 1.0 / MILLION)
    elif number < TRILLION:
        return "{}B".format(number * 1.0 / BILLION)
    else:
        return "{}T".format(number * 1.0 / TRILLION)
