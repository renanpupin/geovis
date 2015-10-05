var Heatmap = function(map, data) {
	//this.radius = radius || 30;
	this.initHeatmap(map, data);
};

Heatmap.prototype.initHeatmap = function(map, data){

 	var markers = [];
	for(var index = 0; index < data.length; index++){
	 	markers.push(new google.maps.LatLng(data[index][3], data[index][4]));
		//console.log(data[index][3], data[index][4]);
	}
	heatmap = new google.maps.visualization.HeatmapLayer({
		data: markers,
		map: map.gmap,
		radius: 30
	});
}