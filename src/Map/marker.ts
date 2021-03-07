import createInfoWindow from "src/Map/InfoWindow";

export const createMarker = (marker: any, map: any) => {
    //@ts-ignore
    const mapMarker = new window.google.maps.Marker({
        position: {lat: marker.lat, lng: marker.lng},
        map: map,
        title: marker.title
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
