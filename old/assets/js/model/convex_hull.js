var ConvexHull = function(map, features) {
    this.polyline = null;

    this.initConvexHull(map, features);
};

ConvexHull.prototype.initConvexHull = function(map, features){
    var marker_points = [];
    var hullPoints = [];
        
    for(var index = 0; index < features.length; index++){
        if (features[index].visible == true){
            marker_points.push(new google.maps.LatLng(features[index].geodata.lat, features[index].geodata.lon));
        }
    }

    function sortPointX(a,b) { return a.lng() - b.lng(); }
    function sortPointY(a,b) { return a.lat() - b.lat(); }
    
    marker_points.sort(sortPointY);
    marker_points.sort(sortPointX);

    chainHull_2D( marker_points, marker_points.length, hullPoints );

    console.log(map);
    this.polyline = new google.maps.Polygon({
        map: map.gmap,
        paths: hullPoints, 
        fillColor: "#FF0000",
        strokeWidth: 2, 
        fillOpacity: 0.5, 
        strokeColor: "#0000FF",
        strokeOpacity: 0.5
    });
}

ConvexHull.prototype.updateConvexHullData = function(features){
    var marker_points = [];
    var hullPoints = [];

    for(var index = 0; index < features.length; index++){
        if (features[index].visible == true){
            marker_points.push(new google.maps.LatLng(features[index].geodata.lat, features[index].geodata.lon));
        }
    }

    function sortPointX(a,b) { return a.lng() - b.lng(); }
    function sortPointY(a,b) { return a.lat() - b.lat(); }
    
    marker_points.sort(sortPointY);
    marker_points.sort(sortPointX);

    chainHull_2D( marker_points, marker_points.length, hullPoints );

    this.polyline.setPath(hullPoints);
}

ConvexHull.prototype.destroy = function(){
    this.polyline.setMap(null);
}

ConvexHull.prototype.toggleConvexHull = function(map){
    this.polyline.setMap(this.polyline.getMap() ? null : map.gmap);
}