import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import MapLoader from './MapLoader';
import Marker from './Marker';
import {getVisibleData} from "src/redux/data/selectors";

const Map: React.FC = () => {
    const visibleData = useSelector(getVisibleData)
    const [map, setMap] = useState(null)
    console.log("redux visibleData", visibleData)

    const onLoad = (map: any) => {
        setMap(map)
    }

    const getMarkers = useCallback(() => {
        if(!map){
            return
        }
        return visibleData.map((data: any) => {
            return(
                <Marker
                    key={data.id}
                    marker={data}
                    map={map}
                />
            )
        })
    }, [visibleData, map])

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

    return (
        <MapLoader onLoad={onLoad}>
            {getMarkers()}
        </MapLoader>
    );
}

export default Map
