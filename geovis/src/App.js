import React from 'react';
//import classes from './app.module.css';
import Map from './Map/Map.jsx'
import InfoWindow from './InfoWindow'
import { render } from 'react-dom';

class App extends React.PureComponent {

    createInfoWindow(e, map) {
        const infoWindow = new window.google.maps.InfoWindow({
            content: '<div id="infoWindow" />',
            position: { lat: e.latLng.lat(), lng: e.latLng.lng() }
        })
        infoWindow.addListener('domready', e => {
            render(<InfoWindow />, document.getElementById('infoWindow'))
        })
        infoWindow.open(map)
    }


  render() {
    return (
        <Map
            id="myMap"
            options={{
                center: { lat: 41.0082, lng: 28.9784 },
                zoom: 8
            }}
            onMapLoad={map => {
                const marker = new window.google.maps.Marker({
                    position: { lat: 41.0082, lng: 28.9784 },
                    map: map,
                    title: 'Hello Istanbul!'
                });
                marker.addListener('click', e => {
                    this.createInfoWindow(e, map)
                })
            }}
        />
    );
  }
}

export default App;
