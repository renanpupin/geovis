import {createInfoWindow} from "src/Map/InfoWindow/infoWindowUtils";
export const createMarker = (markerData: any, map: any, cluster: any) => {
    if(cluster){
        const mapMarker = new window.google.maps.Marker({
            position: {lat: markerData.lat, lng: markerData.lng},
            // map: map,
            title: markerData.title
        });
        cluster.addMarker(mapMarker)
        // cluster.addMarkers([])
        return mapMarker
    }else{
        const mapMarker = new window.google.maps.Marker({
            position: {lat: markerData.lat, lng: markerData.lng},
            map: map,
            title: markerData.title
        });
        return mapMarker
    }
}

export const createMarkerEmpty = (markerData: any) => {
    const marker = new window.google.maps.Marker({
        position: {lat: markerData.lat, lng: markerData.lng},
        title: markerData.title
    });

    return marker;
}

export const removeMarker = (marker: any, enableMarkerCluster: any, cluster: any) => {
    // console.log("removeMarker", marker, enableMarkerCluster, cluster)
    window.google.maps.event.clearInstanceListeners(marker);
    if(enableMarkerCluster){
        cluster.removeMarker(marker)
    }else{
        marker.setMap(null)
    }
}

export const toggleMarker = (marker: any, map: any) => {
    marker.setMap(marker.getMap() ? null : map)
}
