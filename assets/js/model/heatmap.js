var Heatmap = function(map, geodata) {
	//this.radius = radius || 30;
	this.initHeatmap(map, geodata);
};

Heatmap.prototype.initHeatmap = function(map, geodata){
	var markers = [];
	for(var index = 0; index < geodata.length; index++){
	 	markers.push(new google.maps.LatLng(geodata[index].geodata.lat, geodata[index].geodata.lon));
	}
	heatmap = new google.maps.visualization.HeatmapLayer({
		data: markers,
		map: map.gmap,
		radius: 30
	});

	//TODO: return heatmap instance to control on layers
}