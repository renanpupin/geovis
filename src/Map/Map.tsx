import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import MapLoader from './MapLoader';
import Marker from './Marker';
import {getVisibleData} from "src/redux/map/selectors";
// import {createMarker, removeMarker, toggleMarker} from "./marker";

const Map: React.FC = () => {
    const visibleData = useSelector(getVisibleData)
    const [map, setMap] = useState(null)
    // const [mapMarkers, setMapMarkers] = useState([])
    console.log("redux visibleData", visibleData)

    const onLoad = (map: any) => {
        setMap(map)
    }

    // useEffect(() => {
    //     addMarkers()
    // }, [visibleData])
    //
    // const addMarkers = () => {
    //     let mapMarkersArr = []
    //     for(const visibleMarker of visibleData){
    //         // @ts-ignore
    //         mapMarkersArr.push(createMarker(visibleMarker, map))
    //     }
    //     // @ts-ignore
    //     setMapMarkers(mapMarkersArr)
    //
    //     // addHeatMap(mapMarkersArr)
    // }

    const getMarkers = useCallback(() => {
        return visibleData.map((data: any) => {
            return(
                <Marker
                    key={data.id}
                    marker={data}
                    map={map}
                />
            )
        })
    }, [visibleData])

    //for weight (cluster points), we can add weight
    //https://developers.google.com/maps/documentation/javascript/heatmaplayer#add_weighted_data_points
    // const addHeatMap = (mapMarkersArr: any) => {
    //     // @ts-ignore
    //     new window.google.maps.visualization.HeatmapLayer({
    //         // @ts-ignore
    //         data: mapMarkersArr.map(mapMarker => new window.google.maps.LatLng(mapMarker.position.lat(), mapMarker.position.lng())),
    //         map: map,
    //         radius: 30
    //     });
    // }

    // const removeMarkers = () => {
    //     for(const marker of mapMarkers){
    //         removeMarker(marker)
    //     }
    //     setMapMarkers([])
    //     // console.log("after mapMarkers", mapMarkers)
    // }
    //
    // const toggleMarkers = () => {
    //     for(const marker of mapMarkers){
    //         toggleMarker(marker, map)
    //     }
    // }

    return (
        <MapLoader onLoad={onLoad}>
            {getMarkers()}
        </MapLoader>
    );
}

export default Map
