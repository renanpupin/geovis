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


Map.prototype.addMarkers = function (geodata){
	// var self = this;
	for (i = 0; i < geodata.length; i++) {
		console.log(geodata[i]);
		var image = {
			url: 'http://www.larchfieldestate.co.uk/wp-content/themes/larchfield/style/images/larchfield_icon_mapmarker.gif',
			size: new google.maps.Size(65, 35),
			origin: new google.maps.Point(0, 0),
			anchor: new google.maps.Point(33, 33),
			scaledSize: new google.maps.Size(65, 35)
		};

		

		var contentString = '<div id="content-wrapper">'+
					'<div class="item-title">Feature #'+geodata[i].id+'</h2></div>'+
					'<div class="separator"></div>'+
					'<p><label>Id: </label>'+geodata[i].id+'</p>'+
					'<p><label>Lat: </label>'+geodata[i].geodata.lat+'</p>'+
					'<p><label>Lon: </label>'+geodata[i].geodata.lon+'</p>'+
					'</div>';

		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(geodata[i].geodata.lat, geodata[i].geodata.lon),
			title: geodata[i].id.toString(),
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