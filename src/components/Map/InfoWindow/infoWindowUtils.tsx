import React from 'react'
import {render} from 'react-dom'
import InfoWindow from './InfoWindow'

export const createInfoWindow = (
    gmapMarker: any,
    position: any,
    title: any,
    rows: any,
    map: any,
    attributes: any,
    isCluster: boolean,
    onClose: any
) => {
    const id: string = `info-window-${title}`
    // console.log('createInfoWindow', title, id);

    const infoWindow = new window.google.maps.InfoWindow({
        content: `<div id="${id}" />`,
        // position: position,
        position: position ? {lat: position.lat(), lng: position.lng()} : undefined,
        pixelOffset: new google.maps.Size(0, isCluster ? -25 : 0)
    })

    infoWindow.addListener('domready', (e: any) => {
        render(
            <InfoWindow title={title} rows={rows} attributes={attributes} />,
            document.getElementById(id)
        )
    })

    google.maps.event.addListener(infoWindow, 'closeclick', function () {
        onClose?.()
    })

    infoWindow.open(map, gmapMarker ? gmapMarker : undefined) //we can omit the marker and set the position internally

    return infoWindow
}

// export const createClusterInfoWindow = (gmapMarkers: any, rows: any, map: any, attributes: any, onClose: any) => {
//     const id: string = `info-window-${gmapMarker.title}`
//
//     const infoWindow = new window.google.maps.InfoWindow({
//         content: `<div id="${id}" />`
//     });
//
//     infoWindow.addListener('domready', (e: any) => {
//         render(<InfoWindow title={gmapMarker.title} rows={rows} attributes={attributes}/>, document.getElementById(id))
//     });
//
//     google.maps.event.addListener(infoWindow,'closeclick',function(){
//         onClose?.()
//     });
//
//     infoWindow.open(map, gmapMarker)    //we can omit the marker and set the position internally
//
//     return infoWindow;
// }
