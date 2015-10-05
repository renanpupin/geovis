var Line = function(map, data) {
    //this.radius = radius || 30;
    this.initLine(map, data);
};

Line.prototype.initLine = function(map, data){
    var lineCoordinates = [
            new google.maps.LatLng(52.37146,4.890633),
            new google.maps.LatLng(52.377943,4.900104)
        ];

        var line = new google.maps.Polyline({
            path: lineCoordinates,
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2
        });
        line.setMap(map.gmap);
}