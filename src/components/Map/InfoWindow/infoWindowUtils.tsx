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
    onClose: any,
    icon?: any
) => {
    const id: string = `info-window-${title}`

    const infoWindow = new window.google.maps.InfoWindow({
        content: `<div id="${id}" />`,
        // position: position,
        position: position ? {lat: position.lat(), lng: position.lng()} : undefined,
        pixelOffset: new google.maps.Size(0, isCluster ? -25 : icon ? icon?.sizes?.height / 2 : 0)
    })

    infoWindow.addListener('domready', (e: any) => {
        render(
            <InfoWindow title={title} rows={rows} attributes={attributes} />,
            document.getElementById(id)
        )
    })

    window.google.maps.event.addListener(infoWindow, 'closeclick', function () {
        onClose?.()
    })

    infoWindow.open(map, gmapMarker ? gmapMarker : undefined) //we can omit the marker and set the position internally

    return infoWindow
}
