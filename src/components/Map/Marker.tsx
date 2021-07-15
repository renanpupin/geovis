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
    // enableMarkerChart: boolean
    icon?: any
    highlight?: boolean
}

const Marker = (props: MarkerPropTypes) => {
    const {row, enableMarkerCluster, icon, cluster, attributes, highlight} = props
    const [didMount, setDidMount] = useState(false)
    // console.log('Marker ID', props.id)
    const [gmapMarker] = useState(createMarkerEmpty({
        id: props.id,
        lat: props.lat,
        lng: props.lon,
        icon: icon
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

        const markerClickEventListener = gmapMarker.addListener('click', (evt: any) => {
            if(!infoWindow){
                infoWindow = createInfoWindow(gmapMarker, null, props.id, [row], props.map, attributes, false, () => {
                    infoWindow = null;
                })
            }
        });

        return () => {
            // console.log('marker remove events')
            google.maps.event.removeListener(markerClickEventListener);
            infoWindow?.close();
        };
    }, [enableMarkerCluster, cluster, props.map]);

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

    useEffect(() => {
        console.log('marker onchange highlight', highlight);
        if(highlight === false){
            gmapMarker.setOpacity(0.5);
        }else{
            gmapMarker.setOpacity(1);
        }
    }, [highlight])

    return null;
}

export default Marker;
