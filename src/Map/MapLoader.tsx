import React, {useEffect, useState} from 'react';

import styles from './Map.module.css';

const mapNodeId = "map"

const mapOptions = {
    center: {lat: 41.0082, lng: 28.9784},
    zoom: 4,
    streetViewControl: false,
    panControl: false,
    zoomControl: true
}

const MapLoader = (props: any) => {
    const {onLoad} = props
    const onScriptLoad = () => {
        //@ts-ignore
        onLoad(new window.google.maps.Map(document.getElementById(mapNodeId) as HTMLElement, mapOptions))
    }

    useEffect(() => {
        //@ts-ignore
        if (!window.google) {
            let s = document.createElement('script');
            s.type = 'text/javascript';
            s.src = `http://maps.googleapis.com/maps/api/js?v=3.44&key=AIzaSyB3B202UDbbPzCUO9UGp9-rlBQ8glIQ0uQ&libraries=visualization`;
            let x = document.getElementsByTagName('script')[0];
            //@ts-ignore
            x.parentNode.insertBefore(s, x);
            // Below is important.
            //We cannot access google.maps until it's finished loading
            s.addEventListener('load', e => {
                onScriptLoad()
            })
        } else {
            onScriptLoad()
        }
    }, [])

    return (
        <div id={mapNodeId} className={styles.map}>
            {props.children}
        </div>
    );
}

export default MapLoader
