var buildingsJson = `{"\u6728\u5c4b": {"type": "\u4f4f\u5b85", "rare": 0, "offset": 1.0, "benefit": {"\u6728\u6750\u5382": 1.0}}, "\u5c45\u6c11\u697c": {"type": "\u4f4f\u5b85", "rare": 0, "offset": 1.0, "benefit": {"\u4fbf\u5229\u5e97": 1.0}}, "\u94a2\u7ed3\u6784\u623f": {"type": "\u4f4f\u5b85", "rare": 0, "offset": 1.0, "benefit": {"\u94a2\u94c1\u5382": 1.0}}, "\u5e73\u623f": {"type": "\u4f4f\u5b85", "rare": 0, "offset": 1.1, "benefit": {"\u4f4f\u5b85": 0.2}}, "\u5c0f\u578b\u516c\u5bd3": {"type": "\u4f4f\u5b85", "rare": 0, "offset": 1.18, "benefit": {"\u4f9b\u8d27": 0.1}}, "\u4eba\u624d\u516c\u5bd3": {"type": "\u4f4f\u5b85", "rare": 1, "offset": 1.0, "benefit": {"\u5168\u5c40": 0.2, "\u5de5\u4e1a": 0.15}}, "\u82b1\u56ed\u6d0b\u623f": {"type": "\u4f4f\u5b85", "rare": 1, "offset": 1.0, "benefit": {"\u5546\u8d38\u4e2d\u5fc3": 1.0, "\u4f9b\u8d27": 0.1}}, "\u4e2d\u5f0f\u5c0f\u697c": {"type": "\u4f4f\u5b85", "rare": 1, "offset": 1.4, "benefit": {"\u5728\u7ebf\u5168\u5c40": 0.2, "\u4f4f\u5b85": 0.15}}, "\u7a7a\u4e2d\u522b\u5885": {"type": "\u4f4f\u5b85", "rare": 2, "offset": 1.0, "benefit": {"\u6c11\u98df\u658b": 1.0, "\u5728\u7ebf\u5168\u5c40": 0.2}}, "\u590d\u5174\u516c\u9986": {"type": "\u4f4f\u5b85", "rare": 2, "offset": 1.0, "benefit": {"\u4f9b\u8d27": 0.1, "\u79bb\u7ebf\u5168\u5c40": 0.1}}, "\u4fbf\u5229\u5e97": {"type": "\u5546\u4e1a", "rare": 0, "offset": 1.0, "benefit": {"\u5c45\u6c11\u697c": 1.0}}, "\u4e94\u91d1\u5e97": {"type": "\u5546\u4e1a", "rare": 0, "offset": 1.0, "benefit": {"\u96f6\u4ef6\u5382": 1.0}}, "\u670d\u88c5\u5e97": {"type": "\u5546\u4e1a", "rare": 0, "offset": 1.0, "benefit": {"\u7eba\u7ec7\u5382": 1.0}}, "\u83dc\u5e02\u573a": {"type": "\u5546\u4e1a", "rare": 0, "offset": 1.0, "benefit": {"\u98df\u54c1\u5382": 1.0}}, "\u5b66\u6821": {"type": "\u5546\u4e1a", "rare": 0, "offset": 1.0, "benefit": {"\u56fe\u4e66\u57ce": 1.0}}, "\u56fe\u4e66\u57ce": {"type": "\u5546\u4e1a", "rare": 1, "offset": 1.0, "benefit": {"\u5b66\u6821": 1.0, "\u9020\u7eb8\u5382": 1.0}}, "\u5546\u8d38\u4e2d\u5fc3": {"type": "\u5546\u4e1a", "rare": 1, "offset": 1.0, "benefit": {"\u82b1\u56ed\u6d0b\u623f": 1.0, "\u4f9b\u8d27": 0.1}}, "\u52a0\u6cb9\u7ad9": {"type": "\u5546\u4e1a", "rare": 1, "offset": 1.0, "benefit": {"\u4eba\u6c11\u77f3\u6cb9": 1.0, "\u79bb\u7ebf\u5168\u5c40": 0.1}}, "\u6c11\u98df\u658b": {"type": "\u5546\u4e1a", "rare": 2, "offset": 1.52, "benefit": {"\u7a7a\u4e2d\u522b\u5885": 1.0, "\u5728\u7ebf\u5168\u5c40": 0.2}}, "\u5a92\u4f53\u4e4b\u58f0": {"type": "\u5546\u4e1a", "rare": 2, "offset": 1.61, "benefit": {"\u5168\u5c40": 0.05, "\u79bb\u7ebf\u5168\u5c40": 0.1}}, "\u6728\u6750\u5382": {"type": "\u5de5\u4e1a", "rare": 0, "offset": 1.0, "benefit": {"\u6728\u5c4b": 1.0}}, "\u98df\u54c1\u5382": {"type": "\u5de5\u4e1a", "rare": 0, "offset": 1.0, "benefit": {"\u83dc\u5e02\u573a": 1.0}}, "\u9020\u7eb8\u5382": {"type": "\u5de5\u4e1a", "rare": 0, "offset": 1.0, "benefit": {"\u56fe\u4e66\u57ce": 1.0}}, "\u6c34\u5382": {"type": "\u5de5\u4e1a", "rare": 0, "offset": 1.26, "benefit": {"\u79bb\u7ebf\u5168\u5c40": 0.1}}, "\u7535\u5382": {"type": "\u5de5\u4e1a", "rare": 0, "offset": 1.18, "benefit": {"\u5728\u7ebf\u5168\u5c40": 0.2}}, "\u94a2\u94c1\u5382": {"type": "\u5de5\u4e1a", "rare": 1, "offset": 1.0, "benefit": {"\u94a2\u7ed3\u6784\u623f": 1.0, "\u5de5\u4e1a": 0.15}}, "\u7eba\u7ec7\u5382": {"type": "\u5de5\u4e1a", "rare": 1, "offset": 1.0, "benefit": {"\u670d\u88c5\u5e97": 1.0, "\u5546\u4e1a": 0.15}}, "\u96f6\u4ef6\u5382": {"type": "\u5de5\u4e1a", "rare": 1, "offset": 1.0, "benefit": {"\u4e94\u91d1\u5e97": 1.0, "\u4f01\u9e45\u673a\u68b0": 0.5}}, "\u4f01\u9e45\u673a\u68b0": {"type": "\u5de5\u4e1a", "rare": 2, "offset": 1.32, "benefit": {"\u96f6\u4ef6\u5382": 1.0, "\u5168\u5c40": 0.1}}, "\u4eba\u6c11\u77f3\u6cb9": {"type": "\u5de5\u4e1a", "rare": 2, "offset": 1.0, "benefit": {"\u52a0\u6cb9\u7ad9": 1.0, "\u79bb\u7ebf\u5168\u5c40": 0.1}}}`;
var levelGain=[10, 30, 60, 100, 150, 210, 280, 360, 450, 560, 700, 870, 1080, 1350, 1680, 2100, 2630, 3290, 4120, 5160, 6450, 8160, 10200, 12750, 16120, 20300, 25500, 32200, 40700, 51400, 65000, 82200, 104000, 132000, 166000, 210000, 265000, 337000, 425000, 540000, 681000, 858000, 1085000, 1373000, 1737000, 2197000, 2779000, 3515000, 4446000, 5624000, 7114000, 8999000, 11384000, 14401000, 18217000, 23045000, 29152000, 36877000, 46649000, 59011000, 74649000, 94431000];
var starOffset=[1.0, 2.0, 6.0, 24.0, 120.0];

var calculateBasic=function(){

};

$("#calculation").on("click", function(){
	var buildCfg = JSON.parse(buildingsJson);
	var avaiableBuilding = new Array();
	var avaiablePolicy = new Array();
	var avaiableMission = new Array();
	var homelight = $("#homelight input").val() * 1.0 / 100;

	$("#buildingblocks").find("tr").each(function() {		
		var tds = $(this).find("td");
		if (tds.length <= 1) {
			return null;
		}
		var name = tds.eq(0).find(":selected").text();
		var star = tds.eq(1).find(":selected").text();
		var level = tds.eq(2).val();
		avaiableBuilding.push({
			"name": name,
			"star": star,
			"level": level
		});
	});

	$("#missionblocks").find("tr").each(function() {
		var tds = $(this).find("td");
		if (tds.length <= 1) {
			return null;
		}
		var name = tds.eq(0).find(":selected").text();
		var value = tds.eq(1).val();
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
		var value = tds.eq(1).val();
		avaiableMission.push({
			"name": name,
			"value": value
		});
	});
	
});