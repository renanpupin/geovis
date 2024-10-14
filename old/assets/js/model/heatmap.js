var Heatmap = function(map, features) {
	//this.radius = radius || 30;
	this.heatmap = null;
	this.initHeatmap(map, features);
};

Heatmap.prototype.initHeatmap = function(map, features){
	var markers = [];
	for(var index = 0; index < features.length; index++){
		if (features[index].visible === true){
	 		markers.push(new google.maps.LatLng(features[index].geodata.lat, features[index].geodata.lon));
	 	}
	}
	this.heatmap = new google.maps.visualization.HeatmapLayer({
		data: markers,
		map: map.gmap,
		radius: 30
	});
};

Heatmap.prototype.toggleHeatmap = function(map){
	this.heatmap.setMap(this.heatmap.getMap() ? null : map.gmap);
};

Heatmap.prototype.destroy = function(){
	this.heatmap.setMap(null);
};

Heatmap.prototype.updateHeatmapData = function(features){
	var markers = [];
	for(var index = 0; index < features.length; index++){
		if (features[index].visible == true){
	 		markers.push(new google.maps.LatLng(features[index].geodata.lat, features[index].geodata.lon));
	 	}
	}
	this.heatmap.setData(markers);
};