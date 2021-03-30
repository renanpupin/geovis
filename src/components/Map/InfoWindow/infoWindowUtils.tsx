import React from 'react';
import {render} from "react-dom";
import InfoWindow from './InfoWindow'

export const createInfoWindow = (gmapMarker: any, markerData: any, map: any) => {
    const infoWindow = new window.google.maps.InfoWindow({
        content: `<div id="infoWindow-${gmapMarker.id}" />`,
        // position: {lat: markerData.lat, lng: markerData.lng}
    })
    infoWindow.addListener('domready', (e: any) => {
        render(<InfoWindow content={markerData}/>, document.getElementById(`infoWindow-${gmapMarker.id}`))
    })
    infoWindow.open(map, gmapMarker)    //we can omit the marker and set the position internally

    return infoWindow;
}
