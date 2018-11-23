var Map = function(app) {
	this.application = app;
	this.gmap = null;
	this.markers = [];
	//this.layers = [];
	this.defaultIcon = {
        url: 'assets/img/marker.gif',
        size: new google.maps.Size(65, 35),
        // size: new google.maps.Size(this.relativePixelSize, this.relativePixelSize), //changes the scale
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(33, 33),
        scaledSize: new google.maps.Size(65, 35)
    };

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

    this.getDefaultIcon = function(){
        return this.defaultIcon;
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

    // map.gmap.addListener('zoom_changed', function() {
    //     console.log("zoom_changed = ", this.map.getZoom());
    // });

};//initMap


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
};

//find marker by id or null
Map.prototype.findMarkerById = function(id){
	for (var i = 0; i < this.markers.length; i++) {
		if(this.markers[i].id == id){
			return this.markers[i];
		}
	}
	return null;	//if don't find marker return null
};

//reset markers visibility
Map.prototype.resetMarkersVisibility = function(){
	for (var index = 0; index < this.markers.length; index++) {
		this.markers[index].setVisible(true);
	}
};

//reset markers visibility
Map.prototype.toggleMarkers = function(){
	for (var index = 0; index < this.markers.length; index++) {
		this.markers[index].setMap(this.markers[index].getMap() === null ? this.gmap : null);
	}
};

//add markers to map
Map.prototype.addMarkers = function (features){
	// var self = this;
	
	//var bounds = new google.maps.LatLngBounds();

	for (var i = 0; i < features.length; i++) {

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
			icon: this.defaultIcon,
			//layer: "marcadores",
			id: features[i].id,
			content: contentString
		});

		this.addInfoWindow(this.gmap, marker);
		this.markers.push(marker);

		// console.log(marker);

		//bounds.extend(marker);
	}

	//this.gmap.fitBounds(bounds);
};

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
};

//when the map zoom changes, resize the icon based on the zoom level so the marker covers the same geographic area
// google.maps.event.addListener(this.gmap, 'zoom_changed', function() {
//
//     var pixelSizeAtZoom0 = 8; //the size of the icon at zoom level 0
//     var maxPixelSize = 350; //restricts the maximum size of the icon, otherwise the browser will choke at higher zoom levels trying to scale an image to millions of pixels
//
//     var zoom = this.gmap.getZoom();
//     var relativePixelSize = Math.round(pixelSizeAtZoom0*Math.pow(2,zoom)); // use 2 to the power of current zoom to calculate relative pixel size.  Base of exponent is 2 because relative size should double every time you zoom in
//
//     if(relativePixelSize > maxPixelSize) //restrict the maximum size of the icon
//         relativePixelSize = maxPixelSize;
//
//     this.relativePixelSize = relativePixelSize;
//     //change the size of the icon
//     // marker.setIcon(
//     //     new google.maps.MarkerImage(this.defaultIcon)
//     // );
// });

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