import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import MapLoader from './MapLoader';
import Marker from './Marker';
import Heatmap from 'src/Map/Heatmap/Heatmap';
import {getVisibleData, getVisualizations} from "src/redux/data/selectors";

const Map: React.FC = () => {
    const visibleData = useSelector(getVisibleData)
    const visualizations = useSelector(getVisualizations)
    const [map, setMap] = useState(undefined)
    // console.log("redux visibleData", visibleData)
    // console.log("redux visualizations", visualizations)

    const onLoad = (map: any) => {
        setMap(map)
    }

    const getHeatmap = useCallback(() => {
        if(!visualizations.includes('heatmap')){
            return;
        }

        return <Heatmap
            map={map}
            data={visibleData.map((markerData: any) => ({lat: markerData.lat, lng: markerData.lng}))}
        />
    }, [visualizations, visibleData, map])

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

    return (
        <MapLoader onLoad={onLoad}>
            {getMarkers()}
            {getHeatmap()}
        </MapLoader>
    );
}

export default Map
