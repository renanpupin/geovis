import React from 'react';
import {render} from "react-dom";

const InfoWindow = (props: any) => {
    return (
        <div>
            <h1>dasdasdasdasdsadsad</h1>
            <p>{JSON.stringify(props)}</p>
        </div>
    );
}

const createInfoWindow = (e: any, map: any) => {
    //@ts-ignore
    const infoWindow = new window.google.maps.InfoWindow({
        content: '<div id="infoWindow" />',
        position: {lat: e.latLng.lat(), lng: e.latLng.lng()}
    })
    infoWindow.addListener('domready', (e: any) => {
        render(<InfoWindow/>, document.getElementById('infoWindow'))
    })
    infoWindow.open(map)
}


export default createInfoWindow;
