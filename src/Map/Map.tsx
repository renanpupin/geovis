import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import MapLoader from './MapLoader';
import Marker from './Marker';
import Heatmap from 'src/Map/Heatmap/Heatmap';
import MarkerList from 'src/Map/MarkerList';
// import MarkerCluster from 'src/Map/MarkerCluster/MarkerCluster';
import {getVisibleData, getVisualizations} from "src/redux/data/selectors";
import {VisualizationTypes} from "src/redux/data/actions";

const Map: React.FC = () => {
    const visibleData = useSelector(getVisibleData)
    const visualizations = useSelector(getVisualizations)
    const [map, setMap] = useState(undefined)
    // console.log("redux visibleData", visibleData)
    // console.log("redux visualizations", visualizations)

    const onLoad = (map: any) => {
        setMap(map)
    };

    useEffect(() => {
        if(map && visibleData?.length > 0){
            let bounds = new window.google.maps.LatLngBounds();
            visibleData.map((markerData: any) => bounds.extend(new google.maps.LatLng(markerData.lat, markerData.lng)))
            // @ts-ignore
            map.fitBounds(bounds);
        }
    }, [visibleData, map]);

    const getHeatmap = useCallback(() => {
        if(!visualizations.includes(VisualizationTypes.Heatmap)){
            return;
        }

        return(
            <Heatmap
                map={map}
                data={visibleData.map((markerData: any) => ({lat: markerData.lat, lng: markerData.lng}))}
            />
        )
    }, [visualizations, visibleData, map]);

    const enableMarkerCluster = visualizations.includes(VisualizationTypes.MarkerCluster)

    const getMarkers = useCallback(() => {
        if(!map){
            return
        }

        return <MarkerList data={visibleData} map={map} enableMarkerCluster={enableMarkerCluster}/>
    }, [visibleData, map, enableMarkerCluster]);

    return (
        <MapLoader onLoad={onLoad}>
            {getMarkers()}
            {getHeatmap()}
        </MapLoader>
    );
}

export default Map
