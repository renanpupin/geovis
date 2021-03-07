import createInfoWindow from "src/Map/InfoWindow";

export const createMarker = (markerData: any, map: any) => {
    //@ts-ignore
    const mapMarker = new window.google.maps.Marker({
        position: {lat: markerData.lat, lng: markerData.lng},
        map: map,
        title: markerData.title
    });
    mapMarker.addListener('click', (e: any) => {
        createInfoWindow(e, map)
    })
    return mapMarker
}

export const removeMarker = (marker: any) => {
    //@ts-ignore
    marker.setMap(null)
}

export const toggleMarker = (marker: any, map: any) => {
    //@ts-ignore
    marker.setMap(marker.getMap() ? null : map)
}
