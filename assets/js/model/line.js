var Line = function(map, features) {
    //this.radius = radius || 30;
    this.line = null;
    this.initLine(map, features);
};

Line.prototype.initLine = function(map, features){
    var lineCoordinates = [
        new google.maps.LatLng(52.37146,4.890633),
        new google.maps.LatLng(52.377943,4.900104)
    ];

    this.line = new google.maps.Polyline({
        path: lineCoordinates,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
    });
    this.line.setMap(map.gmap);
}

Line.prototype.updateLineData = function(features){
    var lineCoordinates = [];

    for(var index = 1; index < features.length; index++){
        if (features[index].visible == true){
            lineCoordinates.push(new google.maps.LatLng(features[index-1].geodata.lat, features[index-1].geodata.lon), 
                                 new google.maps.LatLng(features[index].geodata.lat, features[index].geodata.lon)
            );
        }
    }
    this.line.setPath(lineCoordinates);
}

Line.prototype.destroy = function(){
    this.line.setMap(null);
}