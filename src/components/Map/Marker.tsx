import React, {useEffect, useState} from 'react';
import MarkerClusterer from "@googlemaps/markerclustererplus";
import {removeMarker, createMarkerEmpty} from "./markerUtils";
import {createInfoWindow} from "src/components/Map/InfoWindow/infoWindowUtils";

export type MarkerPropTypes = {
    id: string
    lat: string
    lon: string
    row: any
    map: any
    attributes: any
    cluster: MarkerClusterer
    enableMarkerCluster: boolean
}

const Marker = (props: MarkerPropTypes) => {
    const [didMount, setDidMount] = useState(false)
    const [gmapMarker] = useState(createMarkerEmpty({
        id: props.id,
        lat: props.lat,
        lng: props.lon,
    }))
    let infoWindow: any = null;
    let clusterInfoWindow: any = null;

    useEffect(() => {
        // console.log("mount", props.enableMarkerCluster)
        if (props.enableMarkerCluster) {
            props.cluster.addMarker(gmapMarker);
        } else {
            gmapMarker.setMap(props.map);
        }

        gmapMarker.addListener('click', (evt: any) => {
            if(!infoWindow){
                infoWindow = createInfoWindow(gmapMarker, null, props.id, [props.row], props.map, props.attributes, () => {
                    infoWindow = null;
                })
            }
        });
    }, []);

    useEffect(() => {
        if (didMount) {
            // console.log("mount 2", props.enableMarkerCluster)
            if (props.enableMarkerCluster) {
                gmapMarker.setMap(null);
                props.cluster.addMarker(gmapMarker)
            } else {
                props.cluster.removeMarker(gmapMarker)
                gmapMarker.setMap(props.map);
            }
        }
        setDidMount(true)

        return () => {
            removeMarker(gmapMarker, props.enableMarkerCluster, props.cluster)
            // console.log("remove", infoWindow)
            infoWindow?.close()
            clusterInfoWindow?.close()
        };
    }, [props.cluster, props.enableMarkerCluster, infoWindow, clusterInfoWindow]);

    return null;
}

export default Marker;
