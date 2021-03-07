import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import MapLoader from './MapLoader';
import {getMarkers} from "src/redux/map/selectors";
import {createMarker, removeMarker, toggleMarker} from "./marker";

const Map: React.FC = () => {
    const visibleMarkers = useSelector(getMarkers)
    const [map, setMap] = useState(null)
    const [mapMarkers, setMapMarkers] = useState([])
    console.log("redux markers", visibleMarkers)

    const onLoad = (map: any) => {
        setMap(map)
    }

    useEffect(() => {
        addMarkers()
    }, [map])

    const addMarkers = () => {
        let mapMarkersArr = []
        for(const visibleMarker of visibleMarkers){
            // @ts-ignore
            mapMarkersArr.push(createMarker(visibleMarker, map))
        }
        // @ts-ignore
        setMapMarkers(mapMarkersArr)

        // addHeatMap(mapMarkersArr)
    }

    // const addHeatMap = (mapMarkersArr: any) => {
    //     // @ts-ignore
    //     new window.google.maps.visualization.HeatmapLayer({
    //         // @ts-ignore
    //         data: mapMarkersArr.map(mapMarker => new window.google.maps.LatLng(mapMarker.position.lat(), mapMarker.position.lng())),
    //         map: map,
    //         radius: 30
    //     });
    // }

    const removeMarkers = () => {
        for(const marker of mapMarkers){
            removeMarker(marker)
        }
        setMapMarkers([])
        // console.log("after mapMarkers", mapMarkers)
    }

    const toggleMarkers = () => {
        for(const marker of mapMarkers){
            toggleMarker(marker, map)
        }
    }

    return (
        <MapLoader onLoad={onLoad}/>
    );
}

export default Map
