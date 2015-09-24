var Map = function(data) {
	this.data = data || null;
	this.map = this.initMap(data);
	
	this.getData = function(){
		return this.data;
	};
	
	this.setData = function(data){
		this.data = data;
	};
	
};

Map.prototype.initMap = function(data){
	
	var map;
	var centerPos = new google.maps.LatLng(52.374847, 4.897027);
	var zoomLevel = 14;

	var mapOptions = {
        center: centerPos,
        streetViewControl: false,
        panControl: false,
        zoom: zoomLevel,
        zoomControl: true
    };
	
	map = new google.maps.Map( document.getElementById("map-canvas"), mapOptions );

	var clickedMarker = null;


	var infoWindowContent = document.createElement("div");
	infoWindowContent.setAttribute("id", "content");
	var title = document.createElement("DIV");
	infoWindowContent.appendChild(title);

	var infowindow = new google.maps.InfoWindow({
		size: new google.maps.Size(150,50),
		content: infoWindowContent
	});

	google.maps.event.addListener(map, 'click', function() {
		infowindow.close();
	});

	return map;

}//initMap


Map.prototype.addMarkers = function (data){
	//plotting markers
	setTimeout(function() {
		for (i = 0; i < data.length; i++) {
			var image = {
				url: 'http://www.larchfieldestate.co.uk/wp-content/themes/larchfield/style/images/larchfield_icon_mapmarker.gif',
				size: new google.maps.Size(65, 35),
				origin: new google.maps.Point(0, 0),
				anchor: new google.maps.Point(33, 33),
				scaledSize: new google.maps.Size(65, 35)
			};
			  
			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(data[i][3], data[i][4]),
				title: data[i][0],
				map: this.map,
				animation: google.maps.Animation.DROP,
				icon: image
			});

			var content = '<div id="content-wrapper">'+
						'<div class="item-title"><img src="http://www.clker.com/cliparts/b/o/w/i/Q/y/star-coffee-hi.png" width="50" height="50"><h2>'+data[i][0]+'</h2></div>'+
						'<div class="separator"></div>'+
						'<p><label><i class="fa fa-home"></i>Address: </label>'+data[i][1]+'</p>'+
						'<p><label><i class="fa fa-phone"></i>Phone: </label>'+data[i][2]+'</p>'+
						'<p><label><i class="fa fa-map-marker"></i>GPS: </label>'+data[i][4]+', '+data[i][3]+'</p>'+
						'</div>';
			marker.content = content;

			google.maps.event.addListener(marker, "click", function() {
				clickedMarker = marker;
			});
		}
	}, 1500);
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