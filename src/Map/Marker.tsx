import React, {useEffect, useState} from 'react';
import {createMarker, removeMarker} from "./markerUtils";

const Marker = (props: any) => {
    useEffect(() => {
    console.log("render Marker id", props.marker.id)
        const gmapMarker = createMarker(props.marker, props.map)
        return () => {
            removeMarker(gmapMarker)
        };
    }, []);
    return null;
}

export default Marker;
