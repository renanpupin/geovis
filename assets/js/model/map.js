var Map = function() {
	this.gmap = null;
	this.markers = [];
	//this.filters = [];
	//this.layers = [];
	
	// this.getFilters = function(){
	// 	return this.filters;
	// };
	
	// this.setFilters = function(filters){
	// 	this.filters = filters;
	// };

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

// Map.prototype.checkFilters = function(filters){
// 	//foreach filter
// 	for (var i = 0; i < filters.length; i++) {
// 		this.executeFilter(filters[i]);
// 	}
// }

Map.prototype.executeFilter = function(features, filter){
	//foreach map marker, check the conditions for the filter
	for (var i = 0; i < features.length; i++) {
		var marker = this.findMarkerById(features[i].id);
		if(marker != null){	//marker found
			var feature_value = features[i].getAttributeValueByName(filter.attribute);
			if(feature_value != null){
				var filter_result = filter.queryFilter(feature_value);

				if(filter_result === false){
					marker.setVisible(false);
				}
			}
		}
	}
}

Map.prototype.findMarkerById = function(id){
	for (var i = 0; i < this.markers.length; i++) {
		if(this.markers[i].id == id){
			return this.markers[i];
		}
	}
	return null;	//if don't find marker return null
}

Map.prototype.resetMarkersVisibility = function(){
	for (var i = 0; i < this.markers.length; i++) {
		this.markers[i].setVisible(true);
	}
}


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
			//layer: "marcadores",
			id: features[i].id,
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