var Euclidian = function(map, features, euclidian_number) {
    //this.radius = radius || 30;
    this.line = null;
    this.euclidian_number = euclidian_number;
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
            if ((features[index].visible == true) && (features[index].id !== clicked_feature.id)){
                var all_distances = 0;
                for(var index_attribute = 0; index_attribute < features[index].infodata.length; index_attribute++){
                    if(features[index].infodata[index_attribute].type === "number"){
                        console.log("atributos utilizado distância euclidiana = "+features[index].infodata[index_attribute].name);
                        var selected_attribute = features[index].infodata[index_attribute].name;
                        var distance = this.calculateEuclidianDistance(features[index], clicked_feature, selected_attribute);
                        all_distances += distance;
                    }
                }
                euclidian_features.push([index, all_distances]);
            }
        }

        euclidian_features.sort(function(obj1, obj2) {
            return obj1[1] - obj2[1];
        });
        console.log(euclidian_features);


        if(euclidian_features.length < this.euclidian_number){
            console.log("o número de features deve ser maior que o limite da  distância euclidiana = "+this.euclidian_number);
        }

        //encontra os mais próximos
        for(var index = 0; ((index < this.euclidian_number) && (index < euclidian_features.length)); index++){

            var selected_feature = features[euclidian_features[index][0]];

            lineCoordinates.push(new google.maps.LatLng(clicked_feature.getFeatureLat(), clicked_feature.getFeatureLon()), 
                                 new google.maps.LatLng(selected_feature.geodata.lat, selected_feature.geodata.lon)
            );
        }

        console.log("LINE PATH = "+lineCoordinates);
        this.line.setPath(lineCoordinates);
    }
}

Euclidian.prototype.calculateEuclidianDistance = function(feature, clicked_feature, attribute){
    return Math.sqrt(Math.pow((feature.getAttributeValueByName(attribute) - clicked_feature.getAttributeValueByName(attribute)), 2));
}

Euclidian.prototype.destroy = function(){
    this.line.setMap(null);
}

Euclidian.prototype.toggleEuclidian = function(map){
    this.line.setMap(this.line.getMap() ? null : map.gmap);
}