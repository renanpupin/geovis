export const createMarker = (markerData: any, map: any) => {
    const mapMarker = new window.google.maps.Marker({
        position: {lat: markerData.lat, lng: markerData.lng},
        map: map,
        title: markerData.title
    });
    return mapMarker
}

export const removeMarker = (marker: any) => {
    window.google.maps.event.clearInstanceListeners(marker);
    marker.setMap(null)
}

export const toggleMarker = (marker: any, map: any) => {
    marker.setMap(marker.getMap() ? null : map)
}
