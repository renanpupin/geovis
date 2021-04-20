import {createInfoWindow} from "src/components/Map/InfoWindow/infoWindowUtils";

export const createMarkerEmpty = (markerData: any) => {
    const marker = new window.google.maps.Marker({
        title: markerData.id,
        position: {lat: markerData.lat, lng: markerData.lng},
        icon: markerData.icon
        // map: map,
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
