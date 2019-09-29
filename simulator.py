from collections import defaultdict


_ = lambda fl : "{:0.2f}k".format(fl/1000)


GLOBAL = {
    # city_buff
    'city': (
        ('商贸中心', 1.5),
        ('服装店', 1.5),
        ('便利店', 1.0),
    ),
    # policy
    'policy': (
        ('global', 0.1),
        ('商业', 2.25),
        ('住宅', 1.5),
    ),
    # collection
    'collection': (
        ('工业', 0.3), #鞍钢
        ('global', 0.1), #首艘国产航母
        ('global', 0.1), #二人转（在线）
        ('global', 0.1), #沈阳故宫
        ('工业', 0.3), #大连港
        ('global', 0.1), #辽沈战役纪念馆
        ('商业', 0.3), #辽参
        ('商业', 0.3), #沈阳中街
        ('global', 0.1), #松花江雾凇 （在线）
        ('global', 0.1), #长白山（在线）
        ('工业', 0.3), #汽车城
        ('商业', 0.3), #长春电影制片
        ('global', 0.1), #高句丽古迹
        ('global', 0.1), #东北虎
        ('商业', 0.3), #东北三宝
        ('住宅', 0.3), #朝鲜冷面
        ('global', 0.1), #兴安岭
        ('global', 0.1), #冰雪节（在线）
        ('工业', 0.3), #大庆油田
        ('global', 0.1), #五大连池
        ('工业', 0.3), #重工业基地
        ('商业', 0.3), #中央大街
        ('商业', 0.3), #漠河北极村
    ),
}


def calculate_basic(name, level=100):
    level_step = [1,2,3,4,5,6,7,8,9,11,14,17,21,27,33,42,53,66,83,104,129]
    value = 0
    for i in range(level):
        value += level_step[i // 10]
    if name == '平房':
        return value * 1.1
    if name == '民食斋':
        return value * 1.52
    return value


def calculate_buff(items_list):
    result = {
        'building': defaultdict(int),
        'policy': defaultdict(int),
        'collection': defaultdict(int),
        'city': defaultdict(int),
    }

    for name, detail in items_list:
        for k, v in detail[-1].items():
            result['building'][k] += v

    for k, v in GLOBAL['policy']:
        result['policy'][k] += v

    for k, v in GLOBAL['collection']:
        result['collection'][k] += v

    for k, v in GLOBAL['city']:
        result['city'][k] += v

    return result

def calculate_combine(name, basic, star, type, buff):
    star_offset = [1.0, 2.0, 6.0]
    building_offset = 1.0 + buff['building'][name] + buff['building'][type] + buff['building']['global']
    policy_offset = 1.0 + buff['policy'][name] + buff['policy'][type] + buff['policy']['global'] + 0.1 + 0.15#家园之光
    collection_offset = 1.0 + buff['collection'][name] + buff['collection'][type] + buff['collection']['global']
    city_offset = 1.0 + buff['city'][name] + buff['city'][type] + buff['city']['global']
    return basic * star_offset[star - 1] * building_offset * policy_offset * collection_offset * city_offset

MAX_OFFSET = 0
MAX_NAME= ''

def calculate_total(items_list, level=100):
    buff = calculate_buff(items_list)
    value = []
    global MAX_OFFSET
    global MAX_NAME

    for name, detail in items_list:
        type, star, rare, level, benefit = detail
        basic = calculate_basic(name, level)
        total = calculate_combine(name, basic, star, type, buff)
        if MAX_OFFSET < total / basic:
            MAX_OFFSET = total / basic
            MAX_NAME = name

        value.append(total)
    """
    if sum(value) > 211830:
        import ipdb; ipdb.set_trace()
    buff = calculate_buff(items_list)
    value = []
    for name, detail in items_list:
        type, star, rare, level, benefit = detail
        basic = calculate_basic(name, level)
        total = calculate_combine(name, basic, star, type, buff)
        value.append(total)
    """
    return value

class Simulator():
    """
    data format:
    {
        "building":[
            {
                'name': '菜市场' 
                'star': 1
                'level': 100
            }
        ],
        "policy":[
            {
                ''
            }
        ],
        "mission": [
            
        ],
        "homelight": {}
    }
    """
    def __init__(self, data):
        for d in data:
            
def do_calculation():
    max_value = 0
    result = []
    result_value = []
    GONGYE = [(k, v) for k, v in ALL_BUILDING.items() if v[0] == '工业']
    SHANGYE = [(k, v) for k, v in ALL_BUILDING.items() if v[0] == '商业']
    ZHUZHAI = [(k, v) for k, v in ALL_BUILDING.items() if v[0] == '住宅']

    REQUIRED = []
    cnt = 0
    from itertools import combinations
    for g in combinations(GONGYE, 3):
        for s in combinations(SHANGYE, 3):
            for z in combinations(ZHUZHAI, 3):
                items_list = g + s + z

                mark = False
                name_set = set([i[0] for i in items_list])
                for r in REQUIRED:
                    if r not in name_set:
                        mark = True
                        break
                if mark:
                    continue
                value_list = calculate_total(items_list, 100)
                value = sum(value_list)
                if max_value < value:
                    max_value = value
                    result = items_list[:]
                    result_value = value_list[:]
                cnt += 1
    print("Total combinations: {}".format(cnt))
    return max_value, result, result_value

FORMAT = """
===================================================================================
===================================================================================
=={:^22s}=={:^22s}=={:^22s}==
===================================================================================
===================================================================================
=={:^22s}=={:^22s}=={:^22s}==
===================================================================================
===================================================================================
=={:^22s}=={:^22s}=={:^22s}==
===================================================================================
===================================================================================
"""

if __name__ == '__main__':

    value, result, value_list= do_calculation()
    print("Best value: {}".format(_(value)))

    output = []
    for r, v in zip(result, value_list):
        output.append("{}: {}".format(r[0], _(v)))
    print(FORMAT.format(*output))
    print('{} {}'.format(MAX_OFFSET, MAX_NAME))
