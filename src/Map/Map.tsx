import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import styles from './Map.module.css';
import {getMarkers} from "src/redux/map/selectors";
import {createMarker} from "./marker";

const mapNodeId = "map"

const mapOptions = {
    center: {lat: 41.0082, lng: 28.9784},
    zoom: 8
}

const MapComponent: React.FC = () => {
    const markers = useSelector(getMarkers)
    const [map, setMap] = useState(null)
    console.log("markers", markers)

    const onScriptLoad = () => {
        //@ts-ignore
        setMap(new window.google.maps.Map(document.getElementById(mapNodeId), mapOptions));
    }

    useEffect(() => {
        if(!map){
            return
        }

        for(let marker of markers){
            createMarker(marker, map)
        }
    }, [map])

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
            {/*{!map && <p>Loading map...</p>}*/}
        </div>
    );
}

export default MapComponent
