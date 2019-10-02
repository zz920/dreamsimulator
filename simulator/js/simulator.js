var buildingType = [
    { value: "木屋",text: "木屋"}, 
    { value: "居民楼",text: "居民楼"},
    { value: "钢结构房",text: "钢结构房"},
    { value: "平房",text: "平房"},
    { value: "小型公寓",text: "小型公寓"},
    { value: "人才公寓",text: "人才公寓"},
    { value: "花园洋房",text: "花园洋房"},
    { value: "中式小楼",text: "中式小楼"},
    { value: "空中别墅",text: "空中别墅"},
    { value: "复兴公馆", text: "复兴公馆"},
    { value: "便利店", text: "便利店"},
    { value: "五金店", text: "五金店"},
    { value: "服装店", text: "服装店"},
    { value: "菜市场", text: "菜市场"},
    { value: "学校"  , text: "学校"  },
    { value: "图书城", text: "图书城"},
    { value: "商贸中心", text: "商贸中心"},
    { value: "加油站", text: "加油站"},
    { value: "民食斋", text: "民食斋"},
    { value: "媒体之声", text: "媒体之声"},
    { value: "木材厂", text: "木材厂"},
    { value: "食品厂", text: "食品厂"},
    { value: "造纸厂", text: "造纸厂"},
    { value: "水厂", text: "水厂"},
    { value: "电厂", text: "电厂"},
    { value: "钢铁厂", text: "钢铁厂"},
    { value: "纺织厂", text: "纺织厂"},
    { value: "零件厂", text: "零件厂"},
    { value: "企鹅机械", text: "企鹅机械"},
    { value: "人民石油", text: "人民石油"},
];

var benefitType = [
    { value: "工业", text: "工业"},
    { value: "商业", text: "商业"},
    { value: "住宅", text: "住宅"},
    { value: "全局", text: "全局"},
    { value: "在线全局", text: "在线全局"},
    { value: "离线全局", text: "离线全局"},
    { value: "供货", text: "供货"}
];

var missionType = [].concat(buildingType, benefitType);


var addBuilding = function(name, star=1, level=1){

	$("#buildingblocks tr:last").before(`
		<tr>
			<td>
				<select class="type">
				</select>
			</td>
			<td>
				<select class="star"></select>
			</td>
			<td><input class="rank" type="number" min="1" value="1"/></td>
			<td><button class="removeButton"></button></td>
		</tr>
	`);

	var insertTr = $("#buildingblocks tr:last").prev()
	var insertTds = insertTr.find("td");
	var typeSelector = insertTds.eq(0).find("select");
	var starSelector = insertTds.eq(1).find("select");
	var rankInput = insertTds.eq(2).find("input");

	if (insertTr.prev().find("td").length  == 4) {
		var $options = insertTr.prev().find(".type").find("option").clone();
		typeSelector.append($options);
		typeSelector.prop('selected', true);
	} else {
		typeSelector.append("<option hidden disabled selected value> -- select an option -- </option>");
		$(buildingType).each(function(){
 			typeSelector.append($("<option></option>").attr("value", this.value).text(this.text));
		});
	}
	
	(function(){
		var lastvalue;
		typeSelector.on('focus', function(){
			lastvalue = $(this).val();
		}).change(function(){
			if ($(this).val() === "") {
				return;
			}
			if (lastvalue) {
				$("#buildingblocks option[value="+ lastvalue + "]").each(function(){
					$(this).show();
				});
			}
			$("#buildingblocks option[value=" + $(this).val() + "]").each(function(){
				$(this).hide();
		});
	});
	})();

	for (i=1; i<=5; i++){
		starSelector.append($("<option></option>").val(i).html(i));
	}

	rankInput.change(function(){
		if (parseInt($(this).val()) > levelLimit) {
			$(this).val(levelLimit);
		}
	});
	
	if (typeof name === 'string') {
		//console.log(name);
		typeSelector.trigger('focus');
		typeSelector.find('option[value=' + name + ']').prop('selected', true).trigger('change');
	}

	if (typeof star === 'number') {
		starSelector.find('option[value=' + star + ']').prop('selected', true).trigger('change');
	}

	if (typeof level === 'number') {
		rankInput.val(level).trigger("input");
	}

	insertTds.eq(3).find("button").on("click", function(){
		$("#buildingblocks option[value=" + typeSelector.val() + "]").each(function(){
			$(this).show();
		});
		insertTr.remove();
	});
};	

var addMission = function(name="工业", value=0){

	$("#missionblocks tr:last").before(`
		<tr>
			<td>
				<select class="type"></select>
			</td>
			<td>
				<input class="percent" type="number" min="1" value="25"/><b>%</b>
			</td>
			<td><button class="removeButton"></button></td>
		</tr>
	`);
	var insertTr = $("#missionblocks tr:last").prev();
	var insertTds = insertTr.find("td");

	var typeSelector = insertTds.eq(0).find("select");

	$(missionType).each(function(){
 		typeSelector.append($("<option></option>").attr("value", this.val).text(this.text));
	});
	
	typeSelector.val(name);
	insertTds.eq(1).find("input").val(value);

	insertTds.eq(2).find("button").on("click", function(){
		insertTr.remove();
	});
};

var addPolicy = function(name="工业", value=0){
	$("#policyblocks tr:last").before(`
		<tr>
			<td>
				<select class="type"></select>
			</td>
			<td>
				<input class="percent" type="number" min="1" value="25"/><b>%</b>
			</td>
			<td><button class="removeButton"></button></td>
		</tr>
	`);
	var insertTr = $("#policyblocks tr:last").prev()
	var insertTds = insertTr.find("td");

	var typeSelector = insertTds.eq(0).find("select");

	$(benefitType).each(function(){
 		typeSelector.append($("<option></option>").attr("value", this.val).text(this.text));
	});
	
	typeSelector.val(name);
	insertTds.eq(1).find("input").val(value);

	insertTds.eq(2).find("button").on("click", function(){
		insertTr.remove();
	});
};

var addCollection = function(name="工业", value=0){
	$("#collectionblocks tr:last").before(`
		<tr>
			<td>
				<select class="type"></select>
			</td>
			<td>
				<input class="percent" type="number" min="1" value="25"/><b>%</b>
			</td>
			<td><button class="removeButton"></button></td>
		</tr>
	`);
	var insertTr = $("#collectionblocks tr:last").prev()
	var insertTds = insertTr.find("td");
	var typeSelector = insertTds.eq(0).find("select");

	$(benefitType).each(function(){
 		typeSelector.append($("<option></option>").attr("value", this.val).text(this.text));
	});
	
	typeSelector.val(name);
	insertTds.eq(1).find("input").val(value);

	insertTds.eq(2).find("button").on("click", function(){
		insertTr.remove();
	});
};

$("#buildingAddButton").on("click", addBuilding);
$("#missionAddButton").on("click", addMission);
$("#policyAddButton").on("click", addPolicy);
$("#collectionAddButton").on("click", addCollection);

function loadConfigFromPage() {
	configJson = {
		'building': [],
		'policy': [],
		'mission': [],
		'collection': [],
		'homelight': 0,
		'online': true,
	}
	$("#buildingblocks").find("tr").each(function() {
		var tds = $(this).find("td");
		if (tds.length <= 1) {
			return null;
		}
		var name = tds.eq(0).find("select").val();
		var star = parseInt(tds.eq(1).find("select").val());
		var level = parseInt(tds.eq(2).find("input").val());

		if (name && star && level) {
			configJson.building.push({
				"name": name,
				"star": star,
				"level": level,
			});
		}
	});
	
	$("#missionblocks").find("tr").each(function() {
        var tds = $(this).find("td");
        if (tds.length <= 1) {
            return null;
        }
        var name = tds.eq(0).find(":selected").text();
        var value = parseInt(tds.eq(1).find("input").val());
		configJson.mission.push({
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
        var value = parseInt(tds.eq(1).find("input").val());

        configJson.policy.push({
            "name": name,
            "value": value,
        });
	});

	$("#collectionblocks").find("tr").each(function() {
    	var tds = $(this).find("td");
	    if (tds.length <= 1) {
	    	return null;
	    }
	    var name = tds.eq(0).find(":selected").text();
	    var value = parseInt(tds.eq(1).find("input").val());
	    configJson.collection.push({
	        "name": name,
	        "value": value,
	    });
    });
    configJson.homelight = parseInt($("#homelight input").val());
    configJson.online = $("#online").is(':checked');
};

$(function loadConfigFile() {
	var config = local_load("config");

	if (config) {
		// use cache to overwrite the configJson
		configJson = config;
	}

	$.each(configJson.building, function(i, obj){
		addBuilding(obj.name, obj.star, obj.level);
	});

	$.each(configJson.mission, function(i, obj){
		addMission(obj.name, obj.value);
	});

	$.each(configJson.policy, function(i, obj){
		addPolicy(obj.name, obj.value);
	});

	$.each(configJson.collection, function(i, obj){
		addCollection(obj.name, obj.value);
	});

	$("#homelight input").val(configJson.homelight);
});

var storage = window.localStorage;

// save configJson object to local storage
function local_save(name, value) {
	storage.setItem(name, JSON.stringify(value));
};

// read from local storage
function local_load(name) {
	return JSON.parse(storage.getItem(name));
};

$("#save").on("click", function(){
	loadConfigFromPage();
	local_save("config", configJson);
});