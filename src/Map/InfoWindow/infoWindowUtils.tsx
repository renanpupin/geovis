import React from 'react';
import {render} from "react-dom";
import InfoWindow from './InfoWindow'

export const createInfoWindow = (gmapMarker: any, markerData: any, map: any) => {
    //@ts-ignore
    const infoWindow = new window.google.maps.InfoWindow({
        content: `<div id="infoWindow-${markerData.id}" />`,
    })
    infoWindow.addListener('domready', (e: any) => {
        //@ts-ignore
        render(<InfoWindow content={markerData}/>, document.getElementById(`infoWindow-${markerData.id}`))
    })
    infoWindow.open(map, gmapMarker)

    return infoWindow;
}
