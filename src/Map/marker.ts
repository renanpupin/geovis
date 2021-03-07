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
}
