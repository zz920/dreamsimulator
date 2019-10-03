var resultBuilding, resultDetail;

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
	return basic * sumBuff('building') * (sumBuff('policy') + homelight) * sumBuff('collection') * sumBuff('mission') * statusgain;
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
			
			if (b.hasOwnProperty('enhance') && b.enhance.hasOwnProperty(key)) {
				benefit += b.enhance[key] * (b.star - 1);
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

// for global access
var avaiablePolicy, avaiableMission, avaiableCollection, homelight, online;

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

	avaiablePolicy = new Array();
	avaiableMission = new Array();
	avaiableCollection = new Array();
	homelight = configJson.homelight / 100;
	online = configJson.online;

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

	var maxValue = 0; resultCnt = 0;

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

	
	updateUI(buff, maxValue, resultCnt, resultBuilding, resultDetail);
});

var updateUI = function(buff, value, cnt, building, detail) {
	var f = function(number) {
		var unit = ["", "K", "M", "B", "T",
			"aa", "bb", "cc", "dd", "ee", 
			"ff", "gg"];
		var index = 0;
		while(Math.pow(10, index*3 + 3) < number && index < unit.length - 1) {
			index += 1;
		} 
		return (number/Math.pow(10, index*3)).toFixed(2) + unit[index];
	}

	var row = 0, col = 0;

	// clean the last output
	$(".itemblock").find("td p").each(function(){
		$(this).text("");
	});
	$(".itemblock").find("td benefit").each(function(){
		$(this).text("");
		$(this).css("display", "none");
		$(this).css('background-color', '')
	});

	var map = {"工业": 0, "商业": 0, "住宅": 0};
	var maxScore = 0;
	var maxId;

	building.forEach(function(b, i){
		var row = Object.keys(map).indexOf(b.type) + 1;
		var col = ++map[b.type];
		var id = "r" + row + "c" + col;

		$("#" + id +" p.title").text(b.name);
		$("#" + id +" p.detail").text("Lv." + parseInt(b.level) + "⭐" + parseInt(b.star));
		$("#" + id +" p.base").text("基础:" + f(detail[i].basevalue));
		$("#" + id +" p.total").text("全部:" + f(detail[i].totalvalue));
		
		var mult = detail[i].totalvalue/detail[i].basevalue;

		var benefitButton = $('#' + id +" button.benefit");
		if (b.level < levelLimit) {
			var incr = calculateBasic(b.name, b.offset, b.level + 1, b.star) - 
				calculateBasic(b.name, b.offset, b.level, b.star);
			var score = (Math.log(incr * mult / cost[b.rare][b.level], 10) / 
				Math.log(10) + 12).toFixed(2);
			if (maxScore < score) {
				maxScore = score;
				maxId = id;
			}
			benefitButton.text("升级收益:" + score);
		} else {
			benefitButton.text("已满级");
		}
		benefitButton.css("display", "inline-flex");
		benefitButton.css("background-color", "");
		benefitButton.off('click').on('click', function() {
			b.level++;
			// recalculate detail
			var result = calculateAllValue(building, avaiableMission, avaiablePolicy, avaiableCollection, homelight, online);
			var buff = calculateBuff(building, avaiableMission, avaiablePolicy, avaiableCollection, homelight, online);
			detail = result.detail;
			updateUI(buff, result.value, cnt, building, detail);
		});
	});

	$('#' + maxId +" button.benefit").css('background-color', 'red');

	$("#result").text("预计总收入为：" + f(value) + "(总遍历"+ cnt + "个结果)");
	
	var supply_rate = parseInt(((buff['building']['供货']? buff['building']['供货']: 0) + 
		(buff['mission']['供货']? buff['mission']['供货']: 0) +
		(buff['policy']['供货']? buff['policy']['供货']: 0) + 
		(buff['collection']['供货']? buff['collection']['供货']: 0)) * 100);
	$("#supply").text("供货加成为：" + supply_rate + "%");
};