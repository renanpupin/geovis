var ClusterVis = function(map) {
    this.markerCluster = null;

    this.initCluster(map);
};

ClusterVis.prototype.initCluster = function(map){
    this.markerCluster = new MarkerClusterer(
        map.gmap, 
        map.getMarkers(),
        {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'}
    );
}

ClusterVis.prototype.destroy = function(){
    this.markerCluster.setMap(null);
}

ClusterVis.prototype.updateClusterData = function(map){
    this.initCluster(map);
}

ClusterVis.prototype.toggleCluster = function(map){
    this.markerCluster.setMap(this.markerCluster.getMap() ? null : map.gmap);
}