var calculateBasic = function(name, gain, level, star){
	if(!buildCfg.hasOwnProperty(name)) {
		return 0;
	}
	var step = Math.floor(level / 10);
	var offset = parseInt(level - step * 10);
	var basic = levelGain[step] + offset * (levelGain[step + 1] - levelGain[step]) / 10;
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
	var industryB = new Array();
	var commerceB = new Array();
	var residenceB = new Array();

	var avaiablePolicy = new Array();
	var avaiableMission = new Array();
	var avaiableCollection = new Array();
	var homelight = $("#homelight input").val() * 1.0 / 100;

    
	$("#buildingblocks").find("tr").each(function() {	
	    	
		var tds = $(this).find("td");
		if (tds.length <= 1) {
			return null;
		}

		var name = tds.eq(0).find("select").val();
		var star = parseInt(tds.eq(1).find("select").val());
		var level = parseInt(tds.eq(2).find("input").val());

		var building = buildCfg[name];

		if (name && star && level) {
			var b;
			if (building.type === "工业") {
				b = industryB;
			} else if (building.type === "商业") {
				b = commerceB;
			} else {
				b = residenceB;
			}
			b.push($.extend({
				"name": name,
				"star": star,
				"level": level,
			}, building));
		}
	});

	$("#missionblocks").find("tr").each(function() {
		var tds = $(this).find("td");
		if (tds.length <= 1) {
			return null;
		}
		var name = tds.eq(0).find(":selected").text();
		var value = parseInt(tds.eq(1).find("input").val())/100;
		avaiableMission.push({
			"name": name,
			"value": value
		});
	});

	$("#policyblocks").find("tr").each(function() {
		var tds = $(this).find("td");
		if (tds.length <= 1) {
			return null;
		}
		var name = tds.eq(0).find(":selected").text();
		var value = parseInt(tds.eq(1).find("input").val())/100;
		avaiablePolicy.push({
			"name": name,
			"value": value
		});
	});

	$("#collectionblocks").find("tr").each(function() {
		var tds = $(this).find("td");
		if (tds.length <= 1) {
			return null;
		}
		var name = tds.eq(0).find(":selected").text();
		var value = parseInt(tds.eq(1).find("input").val())/100;
		avaiableCollection.push({
			"name": name,
			"value": value
		});
	});

	var maxValue = 0;
	var resltBuilding, resultDetail;
	var resultCnt = 0;

	getCombinations(industryB, 3).forEach(function(ib){
		getCombinations(commerceB, 3).forEach(function(cb){
			getCombinations(residenceB, 3).forEach(function(rb){
				var b = [].concat(ib, cb, rb);
				var online = true;
				
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
	
	var f = function(number) {
		if (number < 1000) {
			return number.toFixed(0);
		}
		if (number < 1000000) {
			return (number/1000).toFixed(2) + "K";
		}
		if (number < 1000000000) {
			return (number/1000000).toFixed(2) + "M";
		}
		if (number < 1000000000000) {
			return (number/1000000000).toFixed(2) + "B";
		}
		
		return (number/1000000000000).toFixed(2) + "T";
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
		$("#" + id +" p.base").text("基础:" + f(resultDetail[i].basevalue));
		$("#" + id +" p.total").text("全部:" + f(resultDetail[i].totalvalue));
	});

	$("#result").text("预计总收入为：" + f(maxValue) + "(总遍历"+ resultCnt + "个结果)");
	
});