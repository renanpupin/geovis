import React, {useEffect, useState} from 'react';
import MarkerClusterer from "@googlemaps/markerclustererplus";
import {removeMarker, createMarkerEmpty} from "./markerUtils";
import {createInfoWindow} from "src/components/Map/InfoWindow/infoWindowUtils";
import MarkerChart from "./MarkerChart/MarkerChart";

export type MarkerPropTypes = {
    id: string
    lat: string
    lon: string
    row: any
    map: any
    attributes: any
    cluster: MarkerClusterer
    enableMarkerCluster: boolean
    icon?: any
}

const Marker = (props: MarkerPropTypes) => {
    const {row, enableMarkerCluster, icon, cluster, attributes} = props
    const [didMount, setDidMount] = useState(false)
    const [gmapMarker] = useState(createMarkerEmpty({
        id: props.id,
        lat: props.lat,
        lng: props.lon,
        // icon: icon
    }))
    let infoWindow: any = null;
    let clusterInfoWindow: any = null;

    useEffect(() => {
        // console.log("mount", props.enableMarkerCluster)
        if (enableMarkerCluster) {
            cluster.addMarker(gmapMarker);
        } else {
            gmapMarker.setMap(props.map);
        }

        gmapMarker.addListener('click', (evt: any) => {
            if(!infoWindow){
                infoWindow = createInfoWindow(gmapMarker, null, props.id, [props.row], props.map, attributes, () => {
                    infoWindow = null;
                })
            }
        });
    }, []);

    useEffect(() => {
        if (didMount) {
            gmapMarker.setIcon(icon);
            if (enableMarkerCluster) {
                gmapMarker.setMap(null);
                cluster.addMarker(gmapMarker)
            } else {
                cluster.removeMarker(gmapMarker)
                gmapMarker.setMap(props.map);
            }
        }
        setDidMount(true)

        return () => {
            removeMarker(gmapMarker, enableMarkerCluster, cluster)
            // console.log("remove", infoWindow)
            infoWindow?.close()
            clusterInfoWindow?.close()
        };
    }, [cluster, enableMarkerCluster, infoWindow, clusterInfoWindow, icon]);

    return null;
}

export default Marker;
