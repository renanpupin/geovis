import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import MapLoader from 'src/components/Map/MapLoader';
import Heatmap from 'src/components/Map/Heatmap/Heatmap';
import MarkerList from 'src/components/Map/MarkerList';
import {getLatAttributeIndex, getLonAttributeIndex, getVisibleRows, getVisualizations} from "src/redux/data/selectors";
import {VisualizationTypeValues} from "src/redux/data/types";

const Map: React.FC = () => {
    const latAttributeIndex = useSelector(getLatAttributeIndex)
    const lonAttributeIndex = useSelector(getLonAttributeIndex)
    const visibleRows = useSelector(getVisibleRows)
    const visualizations = useSelector(getVisualizations)
    const [map, setMap] = useState(undefined)

    const onLoad = (map: any) => {
        setMap(map)
    };

    useEffect(() => {
        if(map && visibleRows?.length > 0){
            let bounds = new google.maps.LatLngBounds();
            visibleRows.map((row: any) => bounds.extend(new google.maps.LatLng(row[latAttributeIndex], row[lonAttributeIndex])))
            // @ts-ignore
            map.fitBounds(bounds);
        }
    }, [visibleRows, map]);

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
                data={visibleRows.map((row: any) => ({lat: row[latAttributeIndex], lng: row[lonAttributeIndex]}))}
            />
        )
    }, [visualizations, visibleRows, map]);

    const getMarkers = useCallback(() => {
        if(!map){
            return
        }

        return <MarkerList rows={visibleRows} map={map}/>
    }, [visibleRows, map]);

    return (
        <MapLoader onLoad={onLoad}>
            {getMarkers()}
            {getHeatmap()}
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
