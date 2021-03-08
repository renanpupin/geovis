export const createMarker = (markerData: any, map: any) => {
    //@ts-ignore
    console.log("window.google", window.google)
    //@ts-ignore
    const mapMarker = new window.google.maps.Marker({
        position: {lat: markerData.lat, lng: markerData.lng},
        map: map,
        title: markerData.title
    });
    return mapMarker
}

export const removeMarker = (marker: any) => {
    //@ts-ignore
    window.google.maps.event.clearInstanceListeners(marker);
    marker.setMap(null)
}

export const toggleMarker = (marker: any, map: any) => {
    //@ts-ignore
    marker.setMap(marker.getMap() ? null : map)
}
