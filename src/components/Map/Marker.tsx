import React, {useEffect, useState} from 'react';
import {removeMarker, createMarkerEmpty} from "./markerUtils";
import {createInfoWindow} from "src/components/Map/InfoWindow/infoWindowUtils";

const Marker = (props: any) => {
    const [didMount, setDidMount] = useState(false)
    const [gmapMarker] = useState(createMarkerEmpty({
        lat: props.lat,
        lng: props.lon,
        title: props.title
    }))
    let infoWindow: any = null;

    //TODO: fix info window
    // gmapMarker.addListener('click', (evt: any) => {
    //     infoWindow = createInfoWindow(gmapMarker, props.row, props.map)
    // })

    useEffect(() => {
        // console.log("mount", props.enableMarkerCluster)
        if (props.enableMarkerCluster) {
            props.cluster.addMarker(gmapMarker);
        } else {
            gmapMarker.setMap(props.map)
        }
        // return () => {
        //     console.log("unmount", props.enableMarkerCluster)
        //     if(props.enableMarkerCluster){
        //         props.cluster.removeMarker(gmapMarker);
        //     }else{
        //         gmapMarker.setMap(null)
        //     }
        // }
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
        };
    }, [props.cluster, props.enableMarkerCluster, infoWindow]);

    return null;
}

export default Marker;
