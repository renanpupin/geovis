import React, {useEffect, useState, useCallback, useMemo} from 'react';
import {createMarker, removeMarker} from "./markerUtils";
import {createInfoWindow} from "src/Map/InfoWindow/infoWindowUtils";
import Marker from "src/Map/Marker";
import MarkerCluster from "src/Map/MarkerCluster/MarkerCluster";
import MarkerClusterer from "@googlemaps/markerclustererplus";

const MarkerList = (props: any) => {
    const [cluster] = useState(new MarkerClusterer(props.map, [], {
        imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
    }))

    useEffect(() => {
        return () => {
            cluster.clearMarkers();
            cluster.setMap(null);
        };
    }, []);

    const getMarkers = useCallback(() => {
        return props.data.map((data: any) => {
            return (
                <Marker
                    key={data.id}
                    data={data}
                    map={props.map}
                    cluster={cluster}
                    enableMarkerCluster={props.enableMarkerCluster}
                />
            )
        })
    }, [props.data, props.map, cluster, props.enableMarkerCluster]);

    return getMarkers()
}

export default MarkerList;
