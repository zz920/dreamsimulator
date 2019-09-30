var buildingsJson = `{"\u6728\u5c4b": {"type": "\u4f4f\u5b85", "rare": 0, "offset": 1.0, "benefit": {"\u6728\u6750\u5382": 1.0}}, "\u5c45\u6c11\u697c": {"type": "\u4f4f\u5b85", "rare": 0, "offset": 1.0, "benefit": {"\u4fbf\u5229\u5e97": 1.0}}, "\u94a2\u7ed3\u6784\u623f": {"type": "\u4f4f\u5b85", "rare": 0, "offset": 1.0, "benefit": {"\u94a2\u94c1\u5382": 1.0}}, "\u5e73\u623f": {"type": "\u4f4f\u5b85", "rare": 0, "offset": 1.1, "benefit": {"\u4f4f\u5b85": 0.2}}, "\u5c0f\u578b\u516c\u5bd3": {"type": "\u4f4f\u5b85", "rare": 0, "offset": 1.18, "benefit": {"\u4f9b\u8d27": 0.1}}, "\u4eba\u624d\u516c\u5bd3": {"type": "\u4f4f\u5b85", "rare": 1, "offset": 1.0, "benefit": {"\u5168\u5c40": 0.2, "\u5de5\u4e1a": 0.15}}, "\u82b1\u56ed\u6d0b\u623f": {"type": "\u4f4f\u5b85", "rare": 1, "offset": 1.0, "benefit": {"\u5546\u8d38\u4e2d\u5fc3": 1.0, "\u4f9b\u8d27": 0.1}}, "\u4e2d\u5f0f\u5c0f\u697c": {"type": "\u4f4f\u5b85", "rare": 1, "offset": 1.4, "benefit": {"\u5728\u7ebf\u5168\u5c40": 0.2, "\u4f4f\u5b85": 0.15}}, "\u7a7a\u4e2d\u522b\u5885": {"type": "\u4f4f\u5b85", "rare": 2, "offset": 1.0, "benefit": {"\u6c11\u98df\u658b": 1.0, "\u5728\u7ebf\u5168\u5c40": 0.2}}, "\u590d\u5174\u516c\u9986": {"type": "\u4f4f\u5b85", "rare": 2, "offset": 1.0, "benefit": {"\u4f9b\u8d27": 0.1, "\u79bb\u7ebf\u5168\u5c40": 0.1}}, "\u4fbf\u5229\u5e97": {"type": "\u5546\u4e1a", "rare": 0, "offset": 1.0, "benefit": {"\u5c45\u6c11\u697c": 1.0}}, "\u4e94\u91d1\u5e97": {"type": "\u5546\u4e1a", "rare": 0, "offset": 1.0, "benefit": {"\u96f6\u4ef6\u5382": 1.0}}, "\u670d\u88c5\u5e97": {"type": "\u5546\u4e1a", "rare": 0, "offset": 1.0, "benefit": {"\u7eba\u7ec7\u5382": 1.0}}, "\u83dc\u5e02\u573a": {"type": "\u5546\u4e1a", "rare": 0, "offset": 1.0, "benefit": {"\u98df\u54c1\u5382": 1.0}}, "\u5b66\u6821": {"type": "\u5546\u4e1a", "rare": 0, "offset": 1.0, "benefit": {"\u56fe\u4e66\u57ce": 1.0}}, "\u56fe\u4e66\u57ce": {"type": "\u5546\u4e1a", "rare": 1, "offset": 1.0, "benefit": {"\u5b66\u6821": 1.0, "\u9020\u7eb8\u5382": 1.0}}, "\u5546\u8d38\u4e2d\u5fc3": {"type": "\u5546\u4e1a", "rare": 1, "offset": 1.0, "benefit": {"\u82b1\u56ed\u6d0b\u623f": 1.0, "\u4f9b\u8d27": 0.1}}, "\u52a0\u6cb9\u7ad9": {"type": "\u5546\u4e1a", "rare": 1, "offset": 1.0, "benefit": {"\u4eba\u6c11\u77f3\u6cb9": 1.0, "\u79bb\u7ebf\u5168\u5c40": 0.1}}, "\u6c11\u98df\u658b": {"type": "\u5546\u4e1a", "rare": 2, "offset": 1.52, "benefit": {"\u7a7a\u4e2d\u522b\u5885": 1.0, "\u5728\u7ebf\u5168\u5c40": 0.2}}, "\u5a92\u4f53\u4e4b\u58f0": {"type": "\u5546\u4e1a", "rare": 2, "offset": 1.61, "benefit": {"\u5168\u5c40": 0.05, "\u79bb\u7ebf\u5168\u5c40": 0.1}}, "\u6728\u6750\u5382": {"type": "\u5de5\u4e1a", "rare": 0, "offset": 1.0, "benefit": {"\u6728\u5c4b": 1.0}}, "\u98df\u54c1\u5382": {"type": "\u5de5\u4e1a", "rare": 0, "offset": 1.0, "benefit": {"\u83dc\u5e02\u573a": 1.0}}, "\u9020\u7eb8\u5382": {"type": "\u5de5\u4e1a", "rare": 0, "offset": 1.0, "benefit": {"\u56fe\u4e66\u57ce": 1.0}}, "\u6c34\u5382": {"type": "\u5de5\u4e1a", "rare": 0, "offset": 1.26, "benefit": {"\u79bb\u7ebf\u5168\u5c40": 0.1}}, "\u7535\u5382": {"type": "\u5de5\u4e1a", "rare": 0, "offset": 1.18, "benefit": {"\u5728\u7ebf\u5168\u5c40": 0.2}}, "\u94a2\u94c1\u5382": {"type": "\u5de5\u4e1a", "rare": 1, "offset": 1.0, "benefit": {"\u94a2\u7ed3\u6784\u623f": 1.0, "\u5de5\u4e1a": 0.15}}, "\u7eba\u7ec7\u5382": {"type": "\u5de5\u4e1a", "rare": 1, "offset": 1.0, "benefit": {"\u670d\u88c5\u5e97": 1.0, "\u5546\u4e1a": 0.15}}, "\u96f6\u4ef6\u5382": {"type": "\u5de5\u4e1a", "rare": 1, "offset": 1.0, "benefit": {"\u4e94\u91d1\u5e97": 1.0, "\u4f01\u9e45\u673a\u68b0": 0.5}}, "\u4f01\u9e45\u673a\u68b0": {"type": "\u5de5\u4e1a", "rare": 2, "offset": 1.32, "benefit": {"\u96f6\u4ef6\u5382": 1.0, "\u5168\u5c40": 0.1}}, "\u4eba\u6c11\u77f3\u6cb9": {"type": "\u5de5\u4e1a", "rare": 2, "offset": 1.0, "benefit": {"\u52a0\u6cb9\u7ad9": 1.0, "\u79bb\u7ebf\u5168\u5c40": 0.1}}}`;
var buildCfg = JSON.parse(buildingsJson);
var levelGain=[0, 10, 30, 60, 100, 150, 210, 280, 360, 450, 560, 700, 870, 1080, 1350, 1680, 2100, 2630, 3290, 4120, 5160, 6450, 8160, 10200, 12750, 16120, 20300, 25500, 32200, 40700, 51400, 65000, 82200, 104000, 132000, 166000, 210000, 265000, 337000, 425000, 540000, 681000, 858000, 1085000, 1373000, 1737000, 2197000, 2779000, 3515000, 4446000, 5624000, 7114000, 8999000, 11384000, 14401000, 18217000, 23045000, 29152000, 36877000, 46649000, 59011000, 74649000, 94431000, 0];
var starOffset=[0.0, 1.0, 2.0, 6.0, 24.0, 120.0];

var calculateBasic = function(name, gain, level, star){
	if(!buildCfg.hasOwnProperty(name)) {
		return 0;
	}
	var step = Math.round(level / 10);
	var offset = Math.round(level % 10);
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
			add(result['building'], key, b.benefit[key]);
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
    var resultValue = 0;
    building.forEach(function(b) {
    	
    	var basic = calculateBasic(b.name, b.offset, b.level, b.star);
    	resultValue += calculateValue(b.name, basic, b.type, buff, homelight, online);
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

		var name = tds.eq(0).find(":selected").text();
		var star = parseInt(tds.eq(1).find(":selected").text());
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
	var result;

	getCombinations(industryB, 3).forEach(function(ib){
		getCombinations(commerceB, 3).forEach(function(cb){
			getCombinations(residenceB, 3).forEach(function(rb){
				var b = [].concat(ib, cb, rb);
				var online = true;
				
				var value = calculateAllValue(b, avaiableMission, avaiablePolicy, avaiableCollection, homelight, online);
				if (maxValue < value) {
					maxValue = value;
					result = b;
				}
			});
		}); 
	});
	
	var row = 0, col = 0;
	var last_type;
	result.forEach(function(b){
		if (last_type != b.type) {
			row += 1;
			col = 1;
			last_type = b.type
		} else {
			col += 1;
		}

		var id = "r" + row + "c" + col;
		$("#" + id+" img").attr("src", "images/icon/" + unescape(b.name) + ".png");
	});
	$("#result").text("预计总收入为：" + maxValue);
	
});