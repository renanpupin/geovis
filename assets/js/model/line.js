var Line = function(map, features, attribute) {
    //this.radius = radius || 30;
    this.line = null;
    this.attribute = attribute;

    this.initLine(map, features);
};

Line.prototype.initLine = function(map, features){
    var lineCoordinates = [];

    this.line = new google.maps.Polyline({
        path: lineCoordinates,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
    });

    this.line.setMap(map.gmap);
}

Line.prototype.updateLineData = function(clicked_feature_id, features){
    var lineCoordinates = [];

    console.log("clicked_feature_id = "+clicked_feature_id);

    var clicked_feature = null;

    for(var index = 1; index < features.length; index++){
        if(features[index].id == clicked_feature_id){
            clicked_feature = features[index];
            break;
        }
    }

    var clicked_feature_attribute_value = clicked_feature.getAttributeValueByName(this.attribute);

    for(var index = 1; index < features.length; index++){
        if (features[index].visible == true){
            if(features[index].getAttributeValueByName(this.attribute) == clicked_feature_attribute_value){
                lineCoordinates.push(new google.maps.LatLng(clicked_feature.getFeatureLat(), clicked_feature.getFeatureLon()), 
                                     new google.maps.LatLng(features[index].geodata.lat, features[index].geodata.lon)
                );
            }
        }
    }

    console.log("LINE PATH = "+lineCoordinates);
    this.line.setPath(lineCoordinates);
}

Line.prototype.destroy = function(){
    this.line.setMap(null);
}

Line.prototype.toggleLine = function(map){
    this.line.setMap(this.line.getMap() ? null : map.gmap);
}