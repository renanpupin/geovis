var Map = function(app) {
	this.application = app;
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

//init google maps
Map.prototype.initMap = function(){

	var centerPos = new google.maps.LatLng(-14.15, -51.425);
	var zoomLevel = 4;

	var mapOptions = {
		center: centerPos,
		streetViewControl: false,
		panControl: false,
		zoom: zoomLevel,
		zoomControl: true
	};

	this.gmap = new google.maps.Map( document.getElementById("map-canvas"), mapOptions );

}//initMap


// Map.prototype.executeFilter = function(features, filter){
// 	for (var i = 0; i < features.length; i++) {
// 		var marker = this.findMarkerById(features[i].id);
// 		if(marker != null){	//marker found
// 			var feature_value = features[i].getAttributeValueByName(filter.attribute);
// 			if(feature_value != null){
// 				var filter_result = filter.queryFilter(feature_value);

// 				if(filter_result === false){
// 					marker.setVisible(false);
// 				}
// 			}
// 		}
// 	}
// }

//foreach feature, update map marker visibility
Map.prototype.runMapFilter = function(features){
	for (var i = 0; i < features.length; i++) {
		var marker = this.findMarkerById(features[i].id);
		if(marker != null){	//marker found
			if(features[i].visible == false){
				marker.setVisible(false);
			}
		}
	}
}

//find marker by id or null
Map.prototype.findMarkerById = function(id){
	for (var i = 0; i < this.markers.length; i++) {
		if(this.markers[i].id == id){
			return this.markers[i];
		}
	}
	return null;	//if don't find marker return null
}

//reset markers visibility
Map.prototype.resetMarkersVisibility = function(){
	for (var index = 0; index < this.markers.length; index++) {
		this.markers[index].setVisible(true);
	}
}

//reset markers visibility
Map.prototype.toggleMarkers = function(){
	for (var index = 0; index < this.markers.length; index++) {
		this.markers[index].setMap(this.markers[index].getMap() === null ? this.gmap : null);
	}
}

//add markers to map
Map.prototype.addMarkers = function (features){
	// var self = this;
	
	//var bounds = new google.maps.LatLngBounds();

	for (var i = 0; i < features.length; i++) {
		
		var image = {
			url: 'assets/img/marker.gif',
			size: new google.maps.Size(65, 35),
			origin: new google.maps.Point(0, 0),
			anchor: new google.maps.Point(33, 33),
			scaledSize: new google.maps.Size(65, 35)
		};

		var marker_attributes = "";
		for(var index = 0; index < features[i].infodata.length; index++){
			var attribute_name = features[i].infodata[index].name;
			var attribute_value = features[i].infodata[index].value;
		 	marker_attributes += '<p class="info-attribute"><label>'+attribute_name+':</label> '+attribute_value+'</p>';
		}

		var contentString = '<div id="content-wrapper">'+
								'<div class="item-title">Feature #'+features[i].id+'</div>'+
								'<div class="separator"></div>'+
								'<p class="info-attribute"><label>Lat:</label> '+features[i].geodata.lat+'</p>'+
								'<p class="info-attribute"><label>Lon:</label> '+features[i].geodata.lon+'</p>'+
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

		//bounds.extend(marker);
	}

	//this.gmap.fitBounds(bounds);

}

//click event window
Map.prototype.addInfoWindow = function(map, marker){
	var infoWindow = new google.maps.InfoWindow({
		content: marker.content
	});

	var self = this;

	google.maps.event.addListener(marker, 'click', function () {
		infoWindow.open(map, marker);

		self.application.updateLineVisualization(marker.id);
		self.application.updateEuclidianVisualization(marker.id);
	});
}

//CLUSTERING VIS
//CHECK IF THE MARKERS IS INSIDE BOUNDS
//http://jsfiddle.net/glafarge/mbuLw/
//https://developers.google.com/maps/articles/toomanymarkers#gridbasedclustering
/*Map.prototype.addInfoWindow = function(map, marker){
	for (var i=0; i < markers.length; i++) 
	{
	    if map.getBounds().contains(markers[i].getPosition())
	    {
	        // markers[i] in visible bounds
	    } 
	    else 
	    {
	        // markers[i] is not in visible bounds
	    }
	}
}*/