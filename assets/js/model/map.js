var Map = function() {
	this.gmap = null;
	this.markers = [];
	//this.layers = [];
	
	// this.getLayers = function(){
	// 	return this.layers;
	// };
	
	// this.setLayers = function(layers){
	// 	this.layers = layers;
	// };

	this.getMarkers = function(){
		return this.markers;
	};
	
	this.setMarkers = function(markers){
		this.markers = markers;
	};

	this.getGMap = function(){
		return this.gmap;
	};

	this.initMap();
	
};

Map.prototype.initMap = function(){

	var centerPos = new google.maps.LatLng(-22.15, -51.425);
	var zoomLevel = 12;

	var mapOptions = {
		center: centerPos,
		streetViewControl: false,
		panControl: false,
		zoom: zoomLevel,
		zoomControl: true
	};

	this.gmap = new google.maps.Map( document.getElementById("map-canvas"), mapOptions );

}//initMap


Map.prototype.addMarkers = function (features){
	// var self = this;
	for (var i = 0; i < features.length; i++) {
		
		var image = {
			url: 'http://www.larchfieldestate.co.uk/wp-content/themes/larchfield/style/images/larchfield_icon_mapmarker.gif',
			size: new google.maps.Size(65, 35),
			origin: new google.maps.Point(0, 0),
			anchor: new google.maps.Point(33, 33),
			scaledSize: new google.maps.Size(65, 35)
		};

		var marker_attributes = "";
		for(var index = 0; index < features[i].infodata.length; index++){
			var attribute_name = features[i].infodata[index].name;
			var attribute_value = features[i].infodata[index].value;
		 	marker_attributes += '<p><label>'+attribute_name+':</label> '+attribute_value+'</p>';
		}

		var contentString = '<div id="content-wrapper">'+
								'<div class="item-title">Feature #'+features[i].id+'</div>'+
								'<div class="separator"></div>'+
								'<p><label>Lat:</label> '+features[i].geodata.lat+'</p>'+
								'<p><label>Lon:</label> '+features[i].geodata.lon+'</p>'+
								marker_attributes+
							'</div>';

		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(features[i].geodata.lat, features[i].geodata.lon),
			title: "#"+features[i].id.toString(),
			map: this.gmap,
			animation: google.maps.Animation.DROP,
			icon: image,
			content: contentString
		});

		this.addInfoWindow(this.gmap, marker);
		this.markers.push(marker);
	}
}

Map.prototype.addInfoWindow = function(map, marker){
	var infoWindow = new google.maps.InfoWindow({
		content: marker.content
	});

	google.maps.event.addListener(marker, 'click', function () {
		infoWindow.open(map, marker);
	});
}