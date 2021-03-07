import React, {useEffect, useState} from 'react';
import {createMarker, removeMarker} from "./markerUtils";
import {createInfoWindow} from "src/Map/InfoWindow/infoWindowUtils";

const Marker = (props: any) => {
    useEffect(() => {
        const gmapMarker = createMarker(props.marker, props.map)

        let infoWindow: any = null;
        gmapMarker.addListener('click', (evt: any) => {
            infoWindow = createInfoWindow(gmapMarker, props.marker, props.map)
        })

        return () => {
            //@ts-ignore
            removeMarker(gmapMarker)
            infoWindow?.close()
        };
    }, []);
    return null;
}

export default Marker;
