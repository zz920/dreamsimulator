var calculateBasic = function(name, gain, level, star){
	if(!buildCfg.hasOwnProperty(name)) {
		return 0;
	}
	
	var basic = levelGain[level];
	return Math.round(basic * gain * starOffset[star]);
};

var calculateValue = function(name, basic, type, buff, homelight, online){
	var statusbuffkey = online? "在线全局": "离线全局";
	var statusgain = online? 1.0: 0.5;
	var sumBuff = function(buffType){
		var namebuff = buff[buffType][name]? buff[buffType][name]: 0;
		var typebuff = buff[buffType][type]? buff[buffType][type]: 0;
        var globalbuff = buff[buffType]["全局"]? buff[buffType]["全局"]: 0;
        var statusbuff = buff[buffType][statusbuffkey]? buff[buffType][statusbuffkey]: 0;

		return 1.0 + namebuff + typebuff + globalbuff + statusbuff;
	};
	return basic * sumBuff('building') * (sumBuff('policy') + homelight) * sumBuff('collection') * sumBuff('mission');
};

var calculateBuff = function(building, mission, policy, collection){
	var result = {
		'building': {},
		'mission': {},
		'policy': {},
		'collection': {},
	};

	var add = function(obj, key, value) {
		if (!obj.hasOwnProperty(key)) {
			obj[key] = 0;
		}
		obj[key] += value;
	}

	building.forEach(function(b) {
		Object.keys(b.benefit).forEach(function(key){
			// hard code for 空中别墅 电厂
			var benefit = b.benefit[key] * b.star;
			if (key === "在线全局") {
				if (b.hasOwnProperty('enhance') && b.star > 1) {
					benefit += b.enhance * (b.star - 1);
				}
			}
			add(result['building'], key, benefit);
		});
	});

	mission.forEach(function(m) {
		add(result['mission'], m.name, m.value);
	});

	policy.forEach(function(p) {
		add(result['policy'], p.name, p.value);
	});

	collection.forEach(function(c) {
		add(result['collection'], c.name, c.value);
	});

	return result;
};

var calculateAllValue = function(building, mission, policy, collection, homelight, online){
	
	var buff = calculateBuff(building, mission, policy, collection);
    var resultValue = {
    	"value": 0,
    	"building": building,
    	"detail": [],
    };
    building.forEach(function(b) {	
    	var basic = calculateBasic(b.name, b.offset, b.level, b.star);
    	var totalvalue = calculateValue(b.name, basic, b.type, buff, homelight, online);
    	resultValue.detail.push({
    		"basevalue": basic,
			"totalvalue": totalvalue,
		});
    	resultValue.value += totalvalue;
    });
    return resultValue;
};


$("#calculation").on("click", function(){
	loadConfigFromPage();
	var industryB = new Array();
	var commerceB = new Array();
	var residenceB = new Array();
	var typeMapping = {
		"工业": industryB,
		"商业": commerceB,
		"住宅": residenceB,
	};

	var avaiablePolicy = new Array();
	var avaiableMission = new Array();
	var avaiableCollection = new Array();
	var homelight = configJson.homelight / 100;
	var online = configJson.online;

	configJson.building.forEach(function(b) {
		var name = b.name;
		var star = parseInt(b.star);
		var level = parseInt(b.level);

		var building = buildCfg[name];

		if (name && star && level && building) {
			typeMapping[building.type].push($.extend({
				"name": name,
				"star": star,
				"level": level,
			}, building));
		}
	});

	configJson.mission.forEach(function(m) {
		avaiableMission.push({
			"name": m.name,
			"value": m.value/100,
		});
	});

	configJson.policy.forEach(function(p) {
		avaiablePolicy.push({
			"name": p.name,
			"value": p.value/100,
		});
	});

	configJson.collection.forEach(function(c) {
		avaiableCollection.push({
			"name": c.name,
			"value": c.value/100,
		});
	})

	var maxValue = 0;
	var resltBuilding, resultDetail;
	var resultCnt = 0;

	getCombinations(industryB, 3).forEach(function(ib){
		getCombinations(commerceB, 3).forEach(function(cb){
			getCombinations(residenceB, 3).forEach(function(rb){
				var b = [].concat(ib, cb, rb);
				var result = calculateAllValue(b, avaiableMission, avaiablePolicy, avaiableCollection, homelight, online);
				if (maxValue < result.value) {
					maxValue = result.value;
					resultBuilding = result.building;
					resultDetail = result.detail;
				}
				resultCnt += 1;
			});
		}); 
	});

	var buff = calculateBuff(resultBuilding, avaiableMission, avaiablePolicy, avaiableCollection, homelight, online);

	
	var f = function(number) {
		if (number < 1e+3) {
			return number.toFixed(0);
		}
		if (number < 1e+6) {
			return (number/1e+3).toFixed(2) + "K";
		}
		if (number < 1e+9) {
			return (number/1e+6).toFixed(2) + "M";
		}
		if (number < 1e+12) {
			return (number/1e+9).toFixed(2) + "B";
		}
		if (number < 1e+15) {
			return (number/1e+12).toFixed(2) + "T";
		}
		return (number/1e+15).toFixed(2) + "aa";
	}

	var row = 0, col = 0;
	var last_type;
	resultBuilding.forEach(function(b, i){
		if (last_type != b.type) {
			row += 1;
			col = 1;
			last_type = b.type;
		} else {
			col += 1;
		}
		var id = "r" + row + "c" + col;
		$("#" + id +" p.title").text(b.name);
		$("#" + id +" p.detail").text("Lv." + parseInt(b.level) + "⭐" + parseInt(b.star));
		$("#" + id +" p.base").text("基础:" + f(resultDetail[i].basevalue));
		$("#" + id +" p.total").text("全部:" + f(resultDetail[i].totalvalue));
	});

	$("#result").text("预计总收入为：" + f(maxValue) + "(总遍历"+ resultCnt + "个结果)");

	var supply_rate = parseInt((buff['building']['供货']? buff['building']['供货']: 0 + 
		buff['mission']['供货']? buff['mission']['供货']: 0 +
		buff['policy']['供货']? buff['policy']['供货']: 0 + 
		buff['collection']['供货']? buff['collection']['供货']: 0) * 100);
	$("#supply").text("供货加成为：" + supply_rate + "%");
});