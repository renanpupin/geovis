var Euclidian = function(map, features, attribute) {
    //this.radius = radius || 30;
    this.line = null;
    this.attribute = attribute;
    this.limit = 10;    //10 mais próximos
    this.initEuclidian(map, features);
};

Euclidian.prototype.initEuclidian = function(map, features){
    var lineCoordinates = [];

    this.line = new google.maps.Polyline({
        path: lineCoordinates,
        geodesic: true,
        strokeColor: '#E76122',
        strokeOpacity: 1.0,
        strokeWeight: 2
    });

    this.line.setMap(map.gmap);
}

Euclidian.prototype.updateEuclidianData = function(clicked_feature_id, features){
    var lineCoordinates = [];

    console.log("clicked_feature_id = "+clicked_feature_id);

    if(clicked_feature_id == null){
        this.line.setPath([]);
    }else{

        var clicked_feature = null;

        for(var index = 0; index < features.length; index++){
            if(features[index].id == clicked_feature_id){
                clicked_feature = features[index];
                break;
            }
        }

        var euclidian_features = [];  //contém um vetor com o índice e a distância euclidiana

        //calcula as distâncias
        for(var index = 0; index < features.length; index++){
            if (features[index].visible == true){
                var distance = this.calculateEuclidianDistance(features[index], clicked_feature);
                euclidian_features.push([index, distance]);
            }
        }

        euclidian_features.sort(function(obj1, obj2) {
            return obj1[1] - obj2[1];
        });


        if(euclidian_features.length > this.limit){
            console.log("o número de features itens deve ser maior que o limite da  distância euclidiana");
        }

        //encontra os mais próximos
        for(var index = 0; ((index < this.limit) && (index < euclidian_features.length)); index++){

            var selected_feature = features[euclidian_features[index][0]];

            lineCoordinates.push(new google.maps.LatLng(clicked_feature.getFeatureLat(), clicked_feature.getFeatureLon()), 
                                 new google.maps.LatLng(selected_feature.geodata.lat, selected_feature.geodata.lon)
            );
        }

        console.log("LINE PATH = "+lineCoordinates);
        this.line.setPath(lineCoordinates);
    }
}

Euclidian.prototype.calculateEuclidianDistance = function(feature, clicked_feature){
    return Math.sqrt(Math.pow((feature.getAttributeValueByName(this.attribute) - clicked_feature.getAttributeValueByName(this.attribute)), 2));
}

Euclidian.prototype.destroy = function(){
    this.line.setMap(null);
}

Euclidian.prototype.toggleEuclidian = function(map){
    this.line.setMap(this.line.getMap() ? null : map.gmap);
}