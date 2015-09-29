var Map = function() {
	//this.data = data || null;
	this.gmap = null;
	this.markers = [];
	
	// this.getData = function(){
	// 	return this.data;
	// };
	
	// this.setData = function(data){
	// 	this.data = data;
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
	
	// var map;
	var centerPos = new google.maps.LatLng(52.374847, 4.897027);
	var zoomLevel = 14;

	var mapOptions = {
        center: centerPos,
        streetViewControl: false,
        panControl: false,
        zoom: zoomLevel,
        zoomControl: true
    };
	
	this.gmap = new google.maps.Map( document.getElementById("map-canvas"), mapOptions );

	


	var infoWindowContent = document.createElement("div");
	infoWindowContent.setAttribute("id", "content");
	var title = document.createElement("DIV");
	infoWindowContent.appendChild(title);

	var infowindow = new google.maps.InfoWindow({
		size: new google.maps.Size(150,50),
		content: infoWindowContent
	});

	google.maps.event.addListener(this.gmap, 'click', function() {
		infowindow.close();
	});

	// return map;

}//initMap


Map.prototype.addMarkers = function (geodata){
	//plotting markers
	// var that = this;
	for (i = 0; i < geodata.length; i++) {
		console.log(geodata[i]);
		var image = {
			url: 'http://www.larchfieldestate.co.uk/wp-content/themes/larchfield/style/images/larchfield_icon_mapmarker.gif',
			size: new google.maps.Size(65, 35),
			origin: new google.maps.Point(0, 0),
			anchor: new google.maps.Point(33, 33),
			scaledSize: new google.maps.Size(65, 35)
		};
		
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(geodata[i][3], geodata[i][4]),
			title: geodata[i][0],
			map: this.gmap,
			animation: google.maps.Animation.DROP,
			icon: image
		});

		this.markers.push(marker);

		var content = '<div id="content-wrapper">'+
					'<div class="item-title"><img src="http://www.clker.com/cliparts/b/o/w/i/Q/y/star-coffee-hi.png" width="50" height="50"><h2>'+geodata[i][0]+'</h2></div>'+
					'<div class="separator"></div>'+
					'<p><label><i class="fa fa-home"></i>Address: </label>'+geodata[i][1]+'</p>'+
					'<p><label><i class="fa fa-phone"></i>Phone: </label>'+geodata[i][2]+'</p>'+
					'<p><label><i class="fa fa-map-marker"></i>GPS: </label>'+geodata[i][4]+', '+geodata[i][3]+'</p>'+
					'</div>';
		marker.content = content;

		var clickedMarker = null;
		google.maps.event.addListener(marker, "click", function() {
			clickedMarker = marker;
		});
	}
}

// function initLineVis(){
//   	var lineCoordinates = [
// 		new google.maps.LatLng(52.37146,4.890633),
// 		new google.maps.LatLng(52.377943,4.900104)
//   	];
//   	var line = new google.maps.Polyline({
// 		path: lineCoordinates,
// 		geodesic: true,
// 		strokeColor: '#FF0000',
// 		strokeOpacity: 1.0,
// 		strokeWeight: 2
//   	});

//   	line.setMap(map);
// }
  
// function initHeatMaps(){
// 	var markers_heat = [];
// 	for(var index = 0; index < data.length; index++){
// 	  markers_heat.push(new google.maps.LatLng(data[index][3], data[index][4]));
// 	  console.log(data[index][3], data[index][4]);
// 	}
// 	heatmap = new google.maps.visualization.HeatmapLayer({
// 	  data: markers_heat,
// 	  map: map,
// 	  radius: 30
// 	});
// }