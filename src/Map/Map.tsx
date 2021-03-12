import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import MapLoader from './MapLoader';
import Heatmap from 'src/Map/Heatmap/Heatmap';
import MarkerList from 'src/Map/MarkerList';
import FilterList from 'src/components/FilterList/FilterList';
import LayersList from 'src/components/LayersList/LayersList';
import {getVisibleData, getVisualizations} from "src/redux/data/selectors";
import {VisualizationTypeValues} from "src/redux/data/types";

const Map: React.FC = () => {
    const visibleData = useSelector(getVisibleData)
    const visualizations = useSelector(getVisualizations)
    const [map, setMap] = useState(undefined)

    const onLoad = (map: any) => {
        setMap(map)
    };

    useEffect(() => {
        if(map && visibleData?.length > 0){
            let bounds = new google.maps.LatLngBounds();
            visibleData.map((markerData: any) => bounds.extend(new google.maps.LatLng(markerData.lat, markerData.lng)))
            // @ts-ignore
            map.fitBounds(bounds);
        }
    }, [visibleData, map]);

    const getHeatmap = useCallback(() => {
        const hideHeatmap = visualizations.filter(visualization => {
            console.log("visualization", visualization)
            return(
                visualization.visible &&
                visualization.type === VisualizationTypeValues.Heatmap
            )
        }).length === 0;
        if(hideHeatmap){
            return;
        }

        //TODO: maybe refactor heatmap and move inside markers (inside cluster to use marker.getLocation())
        return(
            <Heatmap
                map={map}
                data={visibleData.map((markerData: any) => ({lat: markerData.lat, lng: markerData.lng}))}
            />
        )
    }, [visualizations, visibleData, map]);

    const enableMarkerCluster = visualizations.filter(visualization => visualization.visible && visualization.type === VisualizationTypeValues.MarkerCluster).length > 0;

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
            <FilterList/>
            <LayersList/>
        </MapLoader>
    );
}

export default Map

// Fired when the map becomes idle after panning or zooming.
// google.maps.event.addListener(map, 'idle', function() {
//     var bounds = map.getBounds();
//     for (var i = 0; i < markers.length; i++) {
//         bounds.contains(marker.getPosition())
//     }
// });
