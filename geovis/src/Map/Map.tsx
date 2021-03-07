import React, {Component} from 'react';
import {render} from 'react-dom';
import styles from './Map.module.css';
import InfoWindow from "./InfoWindow";

const mapNodeId = "map"

const mapOptions = {
    center: {lat: 41.0082, lng: 28.9784},
    zoom: 8
}

class Map extends Component {
    constructor(props: any) {
        super(props);
        this.onScriptLoad = this.onScriptLoad.bind(this)
    }

    createInfoWindow(e: any, map: any) {
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

    onMapLoad(map: any) {
        //@ts-ignore
        const marker = new window.google.maps.Marker({
            position: {lat: 41.0082, lng: 28.9784},
            map: map,
            title: 'Hello Istanbul!'
        });
        marker.addListener('click', (e: any) => {
            this.createInfoWindow(e, map)
        })
    }

    onScriptLoad() {
        //@ts-ignore
        const map = new window.google.maps.Map(
            document.getElementById(mapNodeId),
            mapOptions);
        this.onMapLoad(map)
    }

    componentDidMount() {
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
                this.onScriptLoad()
            })
        } else {
            this.onScriptLoad()
        }
    }

    render() {
        return (
            <div
                className={styles.map}
                id={mapNodeId}
            />
        );
    }
}

export default Map
